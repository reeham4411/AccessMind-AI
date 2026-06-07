/**
 * src/routes/audit.js
 *
 * POST /api/audit/url
 * Accepts a website URL and returns a full accessibility report.
 */

const router          = require('express').Router();
const auditController = require('../controllers/auditController');

router.post('/url', auditController.auditUrl);

module.exports = router;
