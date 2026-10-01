import { Request, Response } from 'express';
import { WebsiteSetting } from '../models/WebsiteSetting.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

export const settingsController = {
  // Public: Get public website settings
  async getPublicSettings(_req: Request, res: Response) {
    let settings = await WebsiteSetting.findOne();
    if (!settings) {
      settings = await WebsiteSetting.create({});
    }
    return sendSuccess(res, 'Website settings retrieved.', settings);
  },


  // Admin: Get all settings
  async getAdminSettings(_req: AuthenticatedRequest, res: Response) {
    let settings = await WebsiteSetting.findOne();
    if (!settings) {
      settings = await WebsiteSetting.create({});
    }
    return sendSuccess(res, 'Settings retrieved.', settings);
  },

  // Admin: Update settings
  async updateSettings(req: AuthenticatedRequest, res: Response) {
    let settings = await WebsiteSetting.findOne();
    if (!settings) {
      settings = new WebsiteSetting();
    }

    Object.assign(settings, req.body);
    await settings.save();

    if (req.admin) {
      await logAdminAction(
        req.admin,
        'UPDATE_SETTINGS',
        'WebsiteSetting',
        settings._id.toString(),
        { updatedFields: Object.keys(req.body) },
        req.ip
      );
    }

    return sendSuccess(res, 'Website settings updated successfully.', settings);
  },
};
