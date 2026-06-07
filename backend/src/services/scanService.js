/**
 * src/services/scanService.js
 *
 * Runs the axe-core accessibility engine against a Playwright page.
 *
 * axe-core is the industry-standard open-source accessibility testing library
 * used by teams at Google, Microsoft, Deque, and many others.
 * It checks for WCAG 2.0, 2.1, and best-practice violations.
 */

const { AxeBuilder } = require('@axe-core/playwright');
const config = require('../config');

/**
 * Inject and run axe-core on a fully-loaded Playwright page.
 *
 * @param  {Page} page - Playwright Page (must already be navigated to the target URL)
 * @returns {Promise<AxeResults>} Raw axe-core results object
 */
async function runScan(page) {
  try {
    const results = await new AxeBuilder({ page })
      // Scan for WCAG 2.0 A/AA, WCAG 2.1 AA, and best-practice rules
      .withTags(config.axe.tags)
      // Exclude third-party iframes that we cannot control
      .exclude('iframe[src*="youtube.com"]')
      .exclude('iframe[src*="twitter.com"]')
      .exclude('iframe[src*="facebook.com"]')
      .analyze();

    return results;

  } catch (error) {
    throw new Error(`Accessibility scan failed: ${error.message}`);
  }
}

module.exports = { runScan };
