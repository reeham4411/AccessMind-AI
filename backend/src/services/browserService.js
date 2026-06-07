/**
 * src/services/browserService.js
 *
 * Handles everything related to Playwright: launching the browser,
 * navigating to a URL, and cleaning up afterwards.
 *
 * We use Playwright instead of a simple HTTP request because many modern
 * websites render content with JavaScript, and axe-core needs the fully
 * rendered DOM to find accessibility issues accurately.
 */

const { chromium } = require('playwright');
const config = require('../config');

/**
 * Launch a headless Chromium browser and create a new page.
 *
 * @returns {{ browser: Browser, context: BrowserContext, page: Page }}
 */
async function launchBrowser() {
  const browser = await chromium.launch({
    headless: config.playwright.headless,
    // Reduce memory usage by disabling some Chrome features we don't need
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',      // Avoids /dev/shm issues in Docker
      '--disable-gpu',
    ],
  });

  // Create an isolated browser context (like a fresh incognito window)
  const context = await browser.newContext({
    ignoreHTTPSErrors: true, // Allow scanning sites with SSL issues
    viewport: { width: 1280, height: 900 },
    // Realistic user-agent so sites do not block automated browsers
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/124.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  return { browser, context, page };
}

/**
 * Navigate to the given URL and wait for the page to be fully loaded.
 * Throws a user-friendly error if the page fails to load.
 *
 * @param {Page}   page - Playwright Page object
 * @param {string} url  - The URL to navigate to
 */
async function loadPage(page, url) {
  try {
    // "networkidle" waits until there are no network requests for 500ms.
    // This ensures JavaScript-rendered content is present before we scan.
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: config.playwright.timeout,
    });

    // Extra settle time for slow client-side hydration (React, Vue, etc.)
    await page.waitForTimeout(1500);

  } catch (error) {
    // Convert cryptic Playwright errors into friendly messages
    if (error.message.toLowerCase().includes('timeout')) {
      throw new Error(
        `The page at "${url}" took too long to load (>${config.playwright.timeout / 1000}s). ` +
        `Try increasing PLAYWRIGHT_TIMEOUT, or check that the site is online.`
      );
    }

    if (
      error.message.includes('ERR_NAME_NOT_RESOLVED') ||
      error.message.includes('net::ERR')
    ) {
      throw new Error(
        `Could not reach "${url}". ` +
        `Please check the URL is correct and the website is online.`
      );
    }

    // Re-throw anything else
    throw new Error(`Failed to load "${url}": ${error.message}`);
  }
}

/**
 * Close the browser. Always call this in a finally block to avoid memory leaks.
 *
 * @param {Browser} browser - Playwright Browser object
 */
async function closeBrowser(browser) {
  if (!browser) return;
  try {
    await browser.close();
  } catch (err) {
    // Log but do not crash — the response has already been sent
    console.error('[browserService] Warning: could not close browser —', err.message);
  }
}

module.exports = { launchBrowser, loadPage, closeBrowser };
