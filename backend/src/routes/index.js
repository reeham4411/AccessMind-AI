/**
 * src/routes/index.js
 *
 * Root router — mounts all feature routes under /api (set in app.js).
 *
 * Final endpoint paths:
 *   GET  /api/health
 *   POST /api/audit/url
 */

const router       = require('express').Router();
const healthRoutes = require('./health');
const auditRoutes  = require('./audit');

router.use('/health', healthRoutes);
router.use('/audit',  auditRoutes);

// Catch unknown /api/* routes and return a helpful 404
router.use((req, res) => {
  res.status(404).json({
    success: false,
    error:   `Route not found: ${req.method} ${req.originalUrl}`,
    hint:    'Available routes: GET /api/health · POST /api/audit/url',
  });
});

module.exports = router;
