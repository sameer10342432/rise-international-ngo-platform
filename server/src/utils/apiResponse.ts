import { Response } from 'express';

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function sendSuccess<T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200,
  pagination?: PaginationMeta
) {
  return res.status(statusCode).json({
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
    ...(pagination ? { pagination } : {}),
  });
}

export function sendError(
  res: Response,
  message: string,
  errors: unknown[] = [],
  statusCode: number = 400
) {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
}
