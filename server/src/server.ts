import app from './app.js';
import { ENV } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';

async function startServer() {
  await connectDatabase();

  const server = app.listen(ENV.PORT, () => {
    console.log(`
=====================================================
  RISE INTERNATIONAL - BACKEND REST API & CMS
  Empowering Communities. Transforming Lives.
=====================================================
  Environment: ${ENV.NODE_ENV}
  Server URL:  http://localhost:${ENV.PORT}
  Health Check: http://localhost:${ENV.PORT}/api/health
  API Base:     http://localhost:${ENV.PORT}/api/v1
  Uploads:      http://localhost:${ENV.PORT}/uploads
=====================================================
    `);
  });

  const shutdown = async (signal: string) => {
    console.log(`\n[Server] Received ${signal}. Gracefully shutting down...`);
    server.close(async () => {
      await disconnectDatabase();
      console.log('[Server] All services shut down successfully.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

startServer().catch((err) => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});
