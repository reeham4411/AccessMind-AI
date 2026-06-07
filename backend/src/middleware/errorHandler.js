/**
 * src/middleware/errorHandler.js
 *
 * Global Express error handler — the last middleware in app.js.
 *
 * Express calls this whenever next(error) is called anywhere in the app.
 * It converts technical errors into clean, user-friendly JSON responses.
 */

function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  // Always log the full error internally for debugging
  console.error(`[errorHandler] ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // ── Map known error patterns to appropriate HTTP status codes ────────────

  // Page load timeout
  if (err.message.toLowerCase().includes('too long to load') ||
      err.message.toLowerCase().includes('timeout')) {
    return res.status(408).json({
      success: false,
      error: err.message,
      hint: 'Try increasing PLAYWRIGHT_TIMEOUT in your .env file, or check the site is online.',
    });
  }

  // DNS / unreachable host
  if (err.message.includes('ERR_NAME_NOT_RESOLVED') ||
      err.message.includes('net::ERR') ||
      err.message.includes('Could not reach')) {
    return res.status(400).json({
      success: false,
      error: err.message,
      hint: 'Double-check the URL and make sure the website is publicly accessible.',
    });
  }

  // Playwright browser crash or unexpected close
  if (err.message.includes('browser') || err.message.includes('Target closed')) {
    return res.status(500).json({
      success: false,
      error: 'The browser crashed while scanning the page. Please try again.',
    });
  }

  // Fallback — something unexpected happened
  res.status(500).json({
    success: false,
    error: err.message || 'An unexpected error occurred.',
    hint:  'If this keeps happening, check the server logs for details.',
  });
}

module.exports = errorHandler;
