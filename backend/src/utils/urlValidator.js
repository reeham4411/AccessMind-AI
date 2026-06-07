/**
 * src/utils/urlValidator.js
 *
 * Validates that a URL is safe, reachable, and in the correct format
 * before we spin up a browser to visit it.
 */

/**
 * Private IP / localhost ranges we block for security.
 * We do not allow scanning internal network resources.
 */
const BLOCKED_HOSTNAMES = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
const BLOCKED_PREFIXES  = ['192.168.', '10.', '172.16.', '172.17.', '172.18.',
                            '172.19.', '172.20.', '172.21.', '172.22.', '172.23.',
                            '172.24.', '172.25.', '172.26.', '172.27.', '172.28.',
                            '172.29.', '172.30.', '172.31.'];

/**
 * @param {string} url - Raw URL string from the request body
 * @returns {{ valid: boolean, message?: string, normalizedUrl?: string }}
 */
function validateUrl(url) {
  // 1. Must be a non-empty string
  if (!url || typeof url !== 'string') {
    return { valid: false, message: 'A URL is required and must be a string.' };
  }

  const trimmed = url.trim();

  // 2. Must start with http:// or https://
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return {
      valid: false,
      message: 'URL must start with "http://" or "https://". Example: https://example.com',
    };
  }

  // 3. Must parse as a valid URL
  let parsed;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      valid: false,
      message: `"${trimmed}" is not a valid URL. Please use the format: https://example.com`,
    };
  }

  // 4. Block private/local network addresses
  const hostname = parsed.hostname.toLowerCase();

  if (BLOCKED_HOSTNAMES.includes(hostname)) {
    return { valid: false, message: 'Scanning localhost or loopback addresses is not allowed.' };
  }

  for (const prefix of BLOCKED_PREFIXES) {
    if (hostname.startsWith(prefix)) {
      return { valid: false, message: 'Scanning private network addresses is not allowed.' };
    }
  }

  // 5. Must have a real hostname (not just "http://")
  if (!parsed.hostname || parsed.hostname.length < 2) {
    return { valid: false, message: 'URL must include a valid domain name.' };
  }

  return { valid: true, normalizedUrl: trimmed };
}

module.exports = { validateUrl };
