/**
 * src/controllers/auditController.js
 *
 * The main request handler for POST /api/audit/url.
 *
 * Orchestrates the full audit pipeline:
 *   1. Validate the incoming URL
 *   2. Launch a real browser (Playwright)
 *   3. Load the target website
 *   4. Run the axe-core accessibility scan
 *   5. Build the structured report
 *   6. Optionally enhance with Groq AI explanations
 *   7. Return the JSON response
 *
 * The browser is always closed in the `finally` block — even if an error occurs —
 * to prevent memory leaks on the server.
 */

const { validateUrl }     = require('../utils/urlValidator');
const browserService      = require('../services/browserService');
const scanService         = require('../services/scanService');
const reportService       = require('../services/reportService');
const aiService           = require('../services/aiService');
const config              = require('../config');

/**
 * POST /api/audit/url
 *
 * Request body:  { "url": "https://example.com" }
 * Response body: structured accessibility report (see README for full shape)
 */
async function auditUrl(req, res, next) {
  let browser = null; // keep a reference so we can always close it

  try {
    const { url } = req.body;

    // ── Step 1: Validate URL ───────────────────────────────────────────────
    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'Request body must include a "url" field.',
        example: { url: 'https://example.com' },
      });
    }

    const validation = validateUrl(url);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.message,
      });
    }

    const targetUrl = validation.normalizedUrl;
    console.log(`\n🔍 Audit started for: ${targetUrl}`);

    // ── Step 2 & 3: Launch browser and navigate to the page ───────────────
    console.log('🌐 Launching browser...');
    const { browser: b, page } = await browserService.launchBrowser();
    browser = b; // store reference for finally block

    console.log('📄 Loading page...');
    await browserService.loadPage(page, targetUrl);

    // ── Step 4: Run axe-core accessibility scan ───────────────────────────
    console.log('⚡ Running axe-core scan...');
    const rawResults = await scanService.runScan(page);

    // ── Step 5: Build the structured report ───────────────────────────────
    console.log('📊 Building report...');
    const report = reportService.generateReport(targetUrl, rawResults);

    // ── Step 6: AI enhancement (optional, requires GROQ_API_KEY) ──────────
    if (config.groq.apiKey) {
      console.log('🤖 Enhancing with AI suggestions (Groq)...');
      report.issues    = await aiService.enhanceIssues(report.issues);
      report.aiSummary = await aiService.generateSummary(report);
    } else {
      // Let the client know AI was not active
      report.aiSummary = null;
    }

    // ── Step 7: Send response ──────────────────────────────────────────────
    console.log(`✅ Audit complete — score: ${report.score}/100, issues: ${report.totalIssues}\n`);

    return res.status(200).json({
      success: true,
      aiEnabled: !!config.groq.apiKey,
      ...report,
    });

  } catch (error) {
    // Pass to the global error handler in errorHandler.js
    next(error);

  } finally {
    // Always close the browser, regardless of success or failure
    if (browser) {
      await browserService.closeBrowser(browser);
    }
  }
}

module.exports = { auditUrl };
