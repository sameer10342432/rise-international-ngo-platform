import dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config();

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rise_international_db',
  JWT_SECRET: process.env.JWT_SECRET || 'rise_intl_default_jwt_secret_must_change_in_production_32chars',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.mailtrap.io',
  SMTP_PORT: parseInt(process.env.SMTP_PORT || '2525', 10),
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || '',
  SMTP_FROM: process.env.SMTP_FROM || 'RISE International <info@riseintl.org>',
  UPLOAD_DIR: process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads'),
  DONATION_PAYMENT_PROVIDER: process.env.DONATION_PAYMENT_PROVIDER || 'mock',
  DONATION_WEBHOOK_SECRET: process.env.DONATION_WEBHOOK_SECRET || 'whsec_test_secret',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
};
