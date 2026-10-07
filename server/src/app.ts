import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';
import { ENV } from './config/env.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';
import { sendSuccess } from './utils/apiResponse.js';

const app = express();

// Security Headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigins = [
  ENV.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:4173',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || ENV.NODE_ENV === 'development') {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'stripe-signature'],
  })
);

// Body parsers & cookies
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads and public images serving
app.use('/uploads', express.static(path.resolve(ENV.UPLOAD_DIR)));
app.use('/images', express.static(path.resolve(process.cwd(), '../public/images')));

// 301 Permanent Redirects for WordPress Legacy URLs (SEO & URL Preservation)
const LEGACY_URL_REDIRECTS: Record<string, string> = {
  '/index.php': '/',
  '/home': '/',
  '/about-us': '/about',
  '/founderpresident-message': '/founder-message',
  '/our-mission': '/about',
  '/mission-vision': '/about',
  '/our-story': '/story',
  '/board-of-directors': '/team',
  '/leadership': '/team',
  '/our-team': '/team',
  '/programs': '/programmes',
  '/projects': '/programmes',
  '/what-we-do': '/programmes',
  '/our-impact': '/impact',
  '/field-stories': '/stories',
  '/articles': '/news',
  '/blog': '/news',
  '/what-does-god-say-about-supporting-each-other': '/news/what-does-god-say-about-supporting-each-other',
  '/contact-us': '/contact',
  '/support-us': '/donate',
  '/get-involved': '/volunteer',
  '/annual-reports': '/impact',
  '/privacy-policy': '/privacy',
  '/terms-and-conditions': '/terms',
  '/wp-admin': '/admin',
  '/wp-login.php': '/admin',
};

app.use((req, res, next) => {
  // Strip trailing slash unless root
  const cleanPath = req.path.length > 1 && req.path.endsWith('/') ? req.path.slice(0, -1) : req.path;
  const target = LEGACY_URL_REDIRECTS[cleanPath.toLowerCase()];
  if (target) {
    return res.redirect(301, target);
  }
  next();
});

// Rate Limiter for API endpoints
app.use('/api', generalLimiter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  return sendSuccess(res, 'RISE International API server is operational.', {
    status: 'ok',
    environment: ENV.NODE_ENV,
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// Mount Routes (supporting both /api and /api/v1 for forward version compatibility)
app.use('/api/v1', apiRouter);
app.use('/api', apiRouter);

// 404 for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route ${req.method} ${req.originalUrl} not found.`,
  });
});

// Centralized Error Handling
app.use(errorHandler);

export default app;
