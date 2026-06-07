/**
 * server.js
 *
 * Application entry point.
 * Loads environment variables, then starts the Express HTTP server.
 *
 * Run with:
 *   node server.js        (production)
 *   npm run dev           (development — auto-restarts on file changes via nodemon)
 */

// Load .env variables into process.env BEFORE importing any other module
// so that src/config/index.js picks them up correctly.
require('dotenv').config();

const app    = require('./app');
const config = require('./src/config');

// ── Start server ──────────────────────────────────────────────────────────────

const server = app.listen(config.port, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║       AI Accessibility Auditor — Backend         ║');
  console.log('╠══════════════════════════════════════════════════╣');
  console.log(`║  Server  : http://localhost:${config.port}                 ║`);
  console.log(`║  Health  : http://localhost:${config.port}/api/health      ║`);
  console.log(`║  Audit   : POST /api/audit/url                   ║`);
  console.log(`║  AI Mode : ${config.groq.apiKey ? '✅ Groq enabled (' + config.groq.model + ')' : '⚠️  No Groq key — using static text '}  ║`);
  console.log(`║  Env     : ${config.nodeEnv}                          ║`);
  console.log('╚══════════════════════════════════════════════════╝');
  console.log('');
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
// When the process is stopped (Ctrl+C or a signal from a process manager like PM2),
// close the HTTP server cleanly before exiting.

function shutdown(signal) {
  console.log(`\n[server] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('[server] HTTP server closed. Goodbye! 👋');
    process.exit(0);
  });

  // Force exit if it takes too long
  setTimeout(() => {
    console.error('[server] Forced exit after timeout.');
    process.exit(1);
  }, 10_000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

// Catch unhandled promise rejections so the server doesn't silently crash
process.on('unhandledRejection', (reason) => {
  console.error('[server] Unhandled Promise Rejection:', reason);
});
