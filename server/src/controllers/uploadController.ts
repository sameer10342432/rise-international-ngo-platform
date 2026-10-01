import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { processAndSaveImage } from '../middleware/upload.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

export const uploadController = {
  async uploadImage(req: AuthenticatedRequest, res: Response) {
    if (!req.file) {
      return sendError(res, 'No image file uploaded. Supported formats: JPG, PNG, WebP.', [], 400);
    }

    try {
      const maxWidth = req.body.maxWidth ? parseInt(req.body.maxWidth) : 1920;
      const result = await processAndSaveImage(req.file.buffer, req.file.originalname, maxWidth);

      if (req.admin) {
        await logAdminAction(
          req.admin,
          'UPLOAD_IMAGE',
          'Upload',
          result.filename,
          {
            originalName: req.file.originalname,
            filename: result.filename,
            size: result.size,
          },
          req.ip
        );
      }

      return sendSuccess(res, 'Image uploaded and processed successfully.', result, 201);
    } catch (err: any) {
      return sendError(res, err.message || 'Image processing failed.', [], 500);
    }
  },
};
