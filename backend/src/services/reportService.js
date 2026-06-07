/**
 * src/services/reportService.js
 *
 * Transforms the raw axe-core results object into the clean, structured
 * JSON report that the API returns to the client.
 *
 * Responsibilities:
 *   - Flatten each violation's "nodes" into individual issue objects
 *   - Enrich every issue with plain-English explanation and suggested fix
 *   - Count issues by severity
 *   - Calculate an accessibility score (0–100)
 *   - Sort issues: most severe first
 */

const { getIssueInfo } = require('../utils/issueMapper');

// axe-core uses these four impact levels — order matters for sorting
const IMPACT_ORDER = ['critical', 'serious', 'moderate', 'minor'];

/**
 * Scoring: deduct points per affected element, capped per severity band.
 * This prevents a single flood of minor issues from zeroing out the score.
 */
const DEDUCTION_PER_NODE = { critical: 12, serious: 7, moderate: 4, minor: 2 };
const DEDUCTION_CAP      = { critical: 40, serious: 30, moderate: 20, minor: 10 };

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the complete audit report.
 *
 * @param {string}     url        - The URL that was scanned
 * @param {AxeResults} axeResults - Raw output from axe-core
 * @returns {object}              - Structured report
 */
function generateReport(url, axeResults) {
  const { violations, passes, incomplete, inapplicable } = axeResults;

  // Turn each violation's node list into flat issue objects
  const issues = flattenViolations(violations);

  // Count how many issues exist at each severity level
  const severityCounts = countBySeverity(issues);

  // Calculate overall score
  const score = calculateScore(violations);

  return {
    url,
    scannedAt:   new Date().toISOString(),
    score,
    totalIssues: issues.length,

    // Individual severity counts (convenient for a dashboard)
    critical: severityCounts.critical,
    serious:  severityCounts.serious,
    moderate: severityCounts.moderate,
    minor:    severityCounts.minor,

    // Summary of what axe-core found overall
    summary: {
      passed:        passes.length,      // Rules the page passed
      failed:        violations.length,  // Distinct rules that were violated
      needsReview:   incomplete.length,  // Rules axe could not fully evaluate
      notApplicable: inapplicable.length,
    },

    // The full issue list, most severe first
    issues,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Private helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert axe violations into a flat array of issue objects.
 * One violation can affect multiple page elements (nodes), so we create
 * one issue entry per affected element for maximum actionability.
 */
function flattenViolations(violations) {
  const issues = [];

  for (const violation of violations) {
    const { id, description, helpUrl, tags, nodes, impact } = violation;
    const issueInfo = getIssueInfo(id);

    for (const node of nodes) {
      issues.push({
        // Rule metadata
        id,
        title:            formatRuleTitle(id),
        description:      description || '',
        impact:           impact || 'minor',
        wcagCriteria:     extractWcagTags(tags),

        // Where on the page the problem was found
        element:          formatTarget(node.target),
        html:             truncate(node.html || '', 500),

        // Reference link to Deque's explanation of this rule
        helpUrl:          helpUrl || '',

        // Human-friendly content (populated from issueMapper; may be
        // overwritten later by aiService if a Groq key is present)
        simpleExplanation: issueInfo.simpleExplanation,
        suggestedFix:      issueInfo.suggestedFix,

        // Will be set to true by aiService if AI enhancement ran
        aiEnhanced: false,
      });
    }
  }

  // Sort: critical → serious → moderate → minor
  return issues.sort(
    (a, b) => IMPACT_ORDER.indexOf(a.impact) - IMPACT_ORDER.indexOf(b.impact)
  );
}

/**
 * Count issues at each severity level.
 */
function countBySeverity(issues) {
  return {
    critical: issues.filter(i => i.impact === 'critical').length,
    serious:  issues.filter(i => i.impact === 'serious').length,
    moderate: issues.filter(i => i.impact === 'moderate').length,
    minor:    issues.filter(i => i.impact === 'minor').length,
  };
}

/**
 * Compute a 0–100 accessibility score.
 *
 * Algorithm:
 *   For each severity band, deduct (count × weight) but never more than the cap.
 *   This prevents a single wave of minor issues from wiping out the score.
 */
function calculateScore(violations) {
  // Bucket violations by severity
  const nodeCounts = { critical: 0, serious: 0, moderate: 0, minor: 0 };

  for (const violation of violations) {
    const impact = violation.impact || 'minor';
    if (nodeCounts[impact] !== undefined) {
      nodeCounts[impact] += violation.nodes.length;
    }
  }

  // Sum deductions, respecting per-band caps
  let totalDeduction = 0;
  for (const impact of IMPACT_ORDER) {
    const raw     = nodeCounts[impact] * DEDUCTION_PER_NODE[impact];
    const capped  = Math.min(raw, DEDUCTION_CAP[impact]);
    totalDeduction += capped;
  }

  return Math.max(0, Math.round(100 - totalDeduction));
}

/**
 * Convert a kebab-case axe rule ID to Title Case for display.
 * Example: "image-alt" → "Image Alt"
 */
function formatRuleTitle(id) {
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Extract WCAG criteria tags from the axe tags array.
 * Example: ["wcag2a", "wcag412", "best-practice"] → "WCAG 4.1.2"
 */
function extractWcagTags(tags = []) {
  return tags
    .filter(t => /^wcag\d/.test(t))          // keep "wcag412", "wcag2a", etc.
    .map(t => t.replace('wcag', 'WCAG ').toUpperCase())
    .join(', ');
}

/**
 * Turn a Playwright selector target (which may be an array) into a readable string.
 */
function formatTarget(target) {
  if (!target) return 'Unknown element';
  if (Array.isArray(target)) return target.join(' > ');
  return String(target);
}

/**
 * Truncate a string to maxLen characters, appending "…" if cut.
 */
function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + '…';
}

module.exports = { generateReport };
