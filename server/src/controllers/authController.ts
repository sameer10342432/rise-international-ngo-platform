import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { ENV } from '../config/env.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

function generateToken(id: string, email: string, role: string): string {
  return jwt.sign({ id, email, role }, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN as any,
  });
}


export const authController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return sendError(res, 'Invalid email or password.', [], 401);
    }

    if (!admin.isActive) {
      return sendError(res, 'This admin account is currently deactivated.', [], 403);
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return sendError(res, 'Invalid email or password.', [], 401);
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id.toString(), admin.email, admin.role);

    // Set secure HTTP-only cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: ENV.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    await logAdminAction(admin, 'LOGIN', 'Admin', admin._id.toString(), { ip: req.ip }, req.ip);

    return sendSuccess(res, 'Login successful.', {
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie('admin_token');
    return sendSuccess(res, 'Logged out successfully.');
  },

  async getMe(req: AuthenticatedRequest, res: Response) {
    if (!req.admin) {
      return sendError(res, 'Unauthorized', [], 401);
    }

    return sendSuccess(res, 'Current admin retrieved.', {
      id: req.admin._id,
      name: req.admin.name,
      email: req.admin.email,
      role: req.admin.role,
      lastLogin: req.admin.lastLogin,
      createdAt: req.admin.createdAt,
    });
  },

  async changePassword(req: AuthenticatedRequest, res: Response) {
    const { currentPassword, newPassword } = req.body;
    const admin = req.admin!;

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return sendError(res, 'Current password is incorrect.', [], 400);
    }

    const salt = await bcrypt.genSalt(10);
    admin.passwordHash = await bcrypt.hash(newPassword, salt);
    await admin.save();

    await logAdminAction(admin, 'CHANGE_PASSWORD', 'Admin', admin._id.toString(), {}, req.ip);

    return sendSuccess(res, 'Password changed successfully.');
  },

  // Super Admin: List all admins
  async listAdmins(req: AuthenticatedRequest, res: Response) {
    const admins = await Admin.find().select('-passwordHash').sort({ createdAt: -1 });
    return sendSuccess(res, 'Admins retrieved.', admins);
  },

  // Super Admin: Create new admin
  async createAdmin(req: AuthenticatedRequest, res: Response) {
    const { name, email, password, role } = req.body;

    const existing = await Admin.findOne({ email: email.toLowerCase() });
    if (existing) {
      return sendError(res, 'An admin with this email already exists.', [], 409);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: role || 'admin',
    });

    await logAdminAction(req.admin!, 'CREATE_ADMIN', 'Admin', newAdmin._id.toString(), { email: newAdmin.email, role: newAdmin.role }, req.ip);

    return sendSuccess(res, 'Admin user created successfully.', newAdmin, 201);
  },

  // Super Admin: Update admin
  async updateAdmin(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const { name, email, role, isActive } = req.body;

    const targetAdmin = await Admin.findById(id);
    if (!targetAdmin) {
      return sendError(res, 'Admin not found.', [], 404);
    }

    // Safety: Cannot deactivate the last active super_admin
    if (isActive === false && targetAdmin.role === 'super_admin') {
      const activeSuperAdmins = await Admin.countDocuments({ role: 'super_admin', isActive: true });
      if (activeSuperAdmins <= 1) {
        return sendError(res, 'Cannot deactivate the last active super admin.', [], 400);
      }
    }

    if (name) targetAdmin.name = name;
    if (email) targetAdmin.email = email.toLowerCase();
    if (role) targetAdmin.role = role;
    if (typeof isActive === 'boolean') targetAdmin.isActive = isActive;

    await targetAdmin.save();

    await logAdminAction(req.admin!, 'UPDATE_ADMIN', 'Admin', targetAdmin._id.toString(), { email: targetAdmin.email }, req.ip);

    return sendSuccess(res, 'Admin updated successfully.', targetAdmin);
  },

  // Super Admin: Delete admin
  async deleteAdmin(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;

    const targetAdmin = await Admin.findById(id);
    if (!targetAdmin) {
      return sendError(res, 'Admin not found.', [], 404);
    }

    if (targetAdmin._id.toString() === req.admin!._id.toString()) {
      return sendError(res, 'You cannot delete your own account.', [], 400);
    }

    if (targetAdmin.role === 'super_admin') {
      const superAdminCount = await Admin.countDocuments({ role: 'super_admin' });
      if (superAdminCount <= 1) {
        return sendError(res, 'Cannot delete the only super admin.', [], 400);
      }
    }

    await Admin.findByIdAndDelete(id);

    await logAdminAction(req.admin!, 'DELETE_ADMIN', 'Admin', id, { email: targetAdmin.email }, req.ip);

    return sendSuccess(res, 'Admin deleted successfully.');
  },
};
