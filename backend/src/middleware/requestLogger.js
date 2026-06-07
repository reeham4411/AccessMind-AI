/**
 * src/middleware/requestLogger.js
 *
 * Simple request/response logger.
 * Prints METHOD, path, status code, and how long the request took.
 * This is enough for development; swap in Winston or Morgan for production.
 */

function requestLogger(req, res, next) {
  const start     = Date.now();
  const timestamp = new Date().toISOString();

  // Log the incoming request immediately
  console.log(`→ [${timestamp}] ${req.method} ${req.path}`);

  // Once the response is fully sent, log the outcome
  res.on('finish', () => {
    const ms         = Date.now() - start;
    const statusIcon = res.statusCode < 400 ? '✓' : '✗';
    console.log(
      `${statusIcon} [${timestamp}] ${req.method} ${req.path} ` +
      `${res.statusCode} (${ms}ms)`
    );
  });

  next();
}

module.exports = requestLogger;
