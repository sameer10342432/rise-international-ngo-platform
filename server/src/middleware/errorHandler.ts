import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { ENV } from '../config/env.js';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('[Error Handler]', err);

  // Handle Zod Validation Error
  if (err instanceof ZodError) {
    const errorDetails = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please verify submitted fields.',
      errors: errorDetails,
    });
  }

  // Handle Mongoose duplicate key error (code 11000)
  if (err && err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `A record with this ${field} already exists.`,
      errors: [{ field, message: `${field} must be unique.` }],
    });
  }

  // Handle CastError (invalid ObjectId)
  if (err && err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid resource ID format.',
      errors: [{ field: err.path, message: 'Invalid ID' }],
    });
  }

  // Handle Multer upload limits
  if (err && err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error.',
      errors: [err],
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success: false,
    message,
    ...(ENV.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
}
