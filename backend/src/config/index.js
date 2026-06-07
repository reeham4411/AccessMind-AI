/**
 * src/config/index.js
 *
 * Central configuration file.
 * All environment variables are read here so the rest of the app never
 * has to call process.env directly — makes testing and refactoring easier.
 */

const config = {
  // ── Server ──────────────────────────────────────────────────────────────
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: (process.env.NODE_ENV || 'development') === 'development',

  // ── Playwright browser settings ─────────────────────────────────────────
  playwright: {
    headless: true,                                           // Always headless on a server
    timeout: parseInt(process.env.PLAYWRIGHT_TIMEOUT, 10) || 30_000, // ms
  },

  // ── axe-core WCAG tag selection ──────────────────────────────────────────
  // wcag2a / wcag2aa  — WCAG 2.0 Level A & AA
  // wcag21aa          — WCAG 2.1 Level AA additions
  // best-practice     — non-WCAG but strongly recommended rules
  axe: {
    tags: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
  },

  // ── Groq AI (optional) ──────────────────────────────────────────────────
  groq: {
    apiKey: process.env.GROQ_API_KEY || null,
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    // How many issues to send to the AI per audit (keeps costs/latency low)
    maxIssuesEnhanced: 20,
  },
};

module.exports = config;
