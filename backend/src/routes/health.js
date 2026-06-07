/**
 * src/routes/health.js
 *
 * GET /api/health
 * Quick endpoint to check whether the server is running.
 * Useful for monitoring tools, Docker health checks, and deployment pipelines.
 */

const router = require('express').Router();
const config = require('../config');

router.get('/', (req, res) => {
  res.status(200).json({
    success:    true,
    status:     'ok',
    message:    'AI Accessibility Auditor is running 🚀',
    version:    '1.0.0',
    timestamp:  new Date().toISOString(),
    environment: config.nodeEnv,
    // Let clients know whether AI-enhanced explanations are available
    aiEnabled:  !!config.groq.apiKey,
  });
});

module.exports = router;
