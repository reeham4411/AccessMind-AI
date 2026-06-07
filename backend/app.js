/**
 * app.js
 *
 * Express application factory.
 * Sets up all middleware and routes, but does NOT call app.listen() here.
 * The actual server startup lives in server.js so this file can be
 * imported cleanly in tests without starting a live server.
 */

const express       = require('express');
const cors          = require('cors');
const routes        = require('./src/routes');
const requestLogger = require('./src/middleware/requestLogger');
const errorHandler  = require('./src/middleware/errorHandler');

const app = express();

// ── Middleware (applied in order) ─────────────────────────────────────────────

// Allow requests from any origin (adjust in production to your frontend URL)
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Log every request (method, path, status, duration)
app.use(requestLogger);

// ── Routes ────────────────────────────────────────────────────────────────────

// Mount all API routes under /api
// Final paths: GET /api/health · POST /api/audit/url
app.use('/api', routes);

// Root path — friendly message for anyone visiting "/" in a browser
app.get('/', (req, res) => {
  res.json({
    name:    'AI Accessibility Auditor API',
    version: '1.0.0',
    docs:    'POST /api/audit/url with { "url": "https://example.com" }',
    health:  'GET /api/health',
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
// Must be last — Express identifies error handlers by their 4-argument signature
app.use(errorHandler);

module.exports = app;
