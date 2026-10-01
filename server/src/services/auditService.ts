import { AuditLog } from '../models/AuditLog.js';
import { IAdmin } from '../models/Admin.js';

export async function logAdminAction(
  admin: IAdmin,
  action: string,
  resource: string,
  resourceId?: string,
  details?: Record<string, unknown>,
  ipAddress?: string
) {
  try {
    await AuditLog.create({
      adminId: admin._id,
      adminEmail: admin.email,
      action,
      resource,
      resourceId,
      details,
      ipAddress,
    });
  } catch (err) {
    console.error('[Audit Log] Failed to record audit log:', err);
  }
}
