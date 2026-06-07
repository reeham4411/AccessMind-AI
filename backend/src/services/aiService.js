/**
 * src/services/aiService.js
 *
 * Optional AI enhancement layer powered by the Groq API.
 * If no GROQ_API_KEY is set this module safely does nothing —
 * the report just uses the built-in static explanations from issueMapper.js.
 *
 * Groq is used because it is free (generous tier), extremely fast
 * (tokens per second), and accepts the same request format as OpenAI.
 * Get a key at: https://console.groq.com
 */

const config = require('../config');

// Groq's chat completions endpoint (OpenAI-compatible)
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Enhance issue objects with AI-generated plain-English explanations and fixes.
 * Processes up to config.groq.maxIssuesEnhanced issues in a single API call.
 *
 * @param   {Array}  issues - Issue objects from reportService
 * @returns {Array}  The same issues, with improved simpleExplanation & suggestedFix
 */
async function enhanceIssues(issues) {
  if (!config.groq.apiKey || issues.length === 0) return issues;

  // Only send the first N issues to the AI to keep latency low
  const toEnhance    = issues.slice(0, config.groq.maxIssuesEnhanced);
  const untouched    = issues.slice(config.groq.maxIssuesEnhanced);

  try {
    const prompt    = buildIssuePrompt(toEnhance);
    const aiText    = await callGroq(prompt);
    const enhanced  = mergeEnhancements(toEnhance, aiText);
    return [...enhanced, ...untouched];

  } catch (err) {
    // AI is optional — log and fall back silently
    console.warn('[aiService] Issue enhancement failed, using static text:', err.message);
    return issues;
  }
}

/**
 * Generate a short plain-English AI summary of the overall audit.
 *
 * @param   {object} report - The report object from reportService
 * @returns {string|null}   A 3–4 sentence summary, or null on failure
 */
async function generateSummary(report) {
  if (!config.groq.apiKey) return null;

  const prompt = `You are a friendly accessibility consultant explaining a website audit to a small business owner with no technical background.

Audit data:
- URL: ${report.url}
- Score: ${report.score}/100
- Total issues found: ${report.totalIssues}
  • Critical: ${report.critical}
  • Serious:  ${report.serious}
  • Moderate: ${report.moderate}
  • Minor:    ${report.minor}
- Top violated rules: ${report.issues.slice(0, 5).map(i => i.id).join(', ')}

Write a 3–4 sentence plain-English summary covering:
1. Overall accessibility health of the site
2. The most important issues to fix first
3. One encouraging word of advice

Do NOT use bullet points. Do NOT use technical jargon. Reply with only the summary text.`;

  try {
    return await callGroq(prompt);
  } catch (err) {
    console.warn('[aiService] Summary generation failed:', err.message);
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Private helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a single batch prompt asking the AI to explain all issues at once.
 * Using one call is faster and cheaper than one call per issue.
 */
function buildIssuePrompt(issues) {
  const issueList = issues
    .map((issue, idx) =>
      `${idx + 1}. Rule: "${issue.id}" | Severity: ${issue.impact} | Element: ${issue.element}`
    )
    .join('\n');

  return `You are an accessibility expert helping a beginner developer fix website accessibility issues.

For each issue below, write:
1. simpleExplanation — 1–2 sentences a non-technical person can understand. Explain WHY it is a problem for real users.
2. suggestedFix — 1–2 actionable sentences. Include a short code example where helpful.

Issues:
${issueList}

Reply ONLY with a valid JSON array. No markdown, no code fences, no extra text. Use this exact shape:
[
  { "index": 1, "simpleExplanation": "...", "suggestedFix": "..." },
  { "index": 2, "simpleExplanation": "...", "suggestedFix": "..." }
]`;
}

/**
 * Parse the AI response and merge the enhanced text back into the issue objects.
 * If parsing fails, the original static text is kept.
 */
function mergeEnhancements(issues, aiResponseText) {
  try {
    // Strip possible markdown code fences the model might add despite instructions
    const cleaned     = aiResponseText.trim().replace(/```json|```/g, '').trim();
    const enhancements = JSON.parse(cleaned);

    return issues.map((issue, idx) => {
      const match = enhancements.find(e => e.index === idx + 1);
      if (!match) return issue;

      return {
        ...issue,
        simpleExplanation: match.simpleExplanation || issue.simpleExplanation,
        suggestedFix:      match.suggestedFix      || issue.suggestedFix,
        aiEnhanced:        true,
      };
    });

  } catch (parseErr) {
    console.warn('[aiService] Could not parse AI response JSON, keeping static text.');
    return issues;
  }
}

/**
 * Make a single request to the Groq chat completions endpoint.
 *
 * @param  {string} prompt
 * @returns {string} The model's reply text
 * @throws  on non-200 HTTP status
 */
async function callGroq(prompt) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${config.groq.apiKey}`,
    },
    body: JSON.stringify({
      model:       config.groq.model,
      max_tokens:  2048,
      temperature: 0.3,   // Lower = more consistent, factual output
      messages: [
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Groq API returned ${response.status}: ${errText.slice(0, 200)}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

module.exports = { enhanceIssues, generateSummary };
