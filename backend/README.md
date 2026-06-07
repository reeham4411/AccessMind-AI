# AI Accessibility Auditor — Backend

A Node.js + Express backend that scans any public website for accessibility issues and returns a clean, structured JSON report with plain-English explanations, severity levels, and suggested fixes.

Built with **Playwright** (real browser rendering) + **axe-core** (WCAG testing engine) + optional **Groq AI** (intelligent explanations).

---

## Features

- **Real browser scanning** — Playwright loads JavaScript-heavy SPAs before scanning, catching issues that simple HTML parsers miss
- **WCAG 2.0 / 2.1 / 2.2 coverage** — powered by axe-core, the industry-standard accessibility engine
- **0–100 accessibility score** — weighted by severity, with per-category caps so a flood of minor issues doesn't wipe out the score
- **Plain-English explanations** — built-in static descriptions for 40+ common rule types; no API key needed
- **AI-enhanced suggestions** (optional) — connect a free Groq API key to get context-aware explanations and code-level fix suggestions
- **Graceful fallback** — the server works identically with or without a Groq key
- **Beginner-friendly code** — every file is thoroughly commented

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Node.js 18+ | Runtime |
| Express.js | HTTP server & routing |
| Playwright | Headless Chromium browser (loads real pages) |
| axe-core | WCAG accessibility rules engine |
| @axe-core/playwright | Playwright adapter for axe-core |
| dotenv | Environment variable management |
| cors | Cross-Origin Resource Sharing headers |
| Groq API *(optional)* | AI-generated explanations via llama-3.3-70b |
| nodemon *(dev only)* | Auto-restart on file changes |

---

## Project Structure

```
ai-accessibility-auditor-backend/
│
├── server.js                      # Entry point — starts the HTTP server
├── app.js                         # Express app setup (middleware + routes)
├── package.json
├── .env.example                   # Copy this to .env and fill in values
├── .gitignore
├── README.md
│
└── src/
    ├── config/
    │   └── index.js               # Centralised config loaded from .env
    │
    ├── routes/
    │   ├── index.js               # Combines all routes under /api
    │   ├── health.js              # GET /api/health
    │   └── audit.js               # POST /api/audit/url
    │
    ├── controllers/
    │   └── auditController.js     # Orchestrates the full audit pipeline
    │
    ├── services/
    │   ├── browserService.js      # Playwright: launch → navigate → close
    │   ├── scanService.js         # axe-core: run scan on loaded page
    │   ├── reportService.js       # Build + score the structured report
    │   └── aiService.js           # Groq AI: enhance explanations + summary
    │
    ├── middleware/
    │   ├── requestLogger.js       # Logs method, path, status, duration
    │   └── errorHandler.js        # Global error → JSON response mapper
    │
    └── utils/
        ├── urlValidator.js        # Validates & sanitises incoming URLs
        └── issueMapper.js         # Maps axe rule IDs → plain-English text
```

---

## Prerequisites

- **Node.js 18 or higher** — download from https://nodejs.org
- **npm** (comes with Node.js)
- A **Groq API key** (optional, free) — https://console.groq.com

---

## Setup & Installation

### 1. Clone or download the project

```bash
git clone <your-repo-url>
cd ai-accessibility-auditor-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Install Playwright's Chromium browser

Playwright needs a real browser binary. Install it with:

```bash
npx playwright install chromium
```

> **Tip:** You can also run `npm run install:browsers` which does the same thing.

### 4. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and set your values:

```env
PORT=3000
NODE_ENV=development
PLAYWRIGHT_TIMEOUT=30000

# Optional — get a free key at https://console.groq.com
GROQ_API_KEY=your_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

### 5. Start the server

**Development** (auto-restarts on file changes):
```bash
npm run dev
```

**Production:**
```bash
npm start
```

You should see:
```
╔══════════════════════════════════════════════════╗
║       AI Accessibility Auditor — Backend         ║
╠══════════════════════════════════════════════════╣
║  Server  : http://localhost:3000                 ║
║  Health  : http://localhost:3000/api/health      ║
║  Audit   : POST /api/audit/url                   ║
║  AI Mode : ✅ Groq enabled (llama-3.3-70b...)   ║
╚══════════════════════════════════════════════════╝
```

---

## API Reference

### `GET /api/health`

Check whether the server is running.

**Response:**
```json
{
  "success": true,
  "status": "ok",
  "message": "AI Accessibility Auditor is running 🚀",
  "version": "1.0.0",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "environment": "development",
  "aiEnabled": true
}
```

---

### `POST /api/audit/url`

Scan a website and receive a full accessibility report.

**Request body:**
```json
{
  "url": "https://example.com"
}
```

**Successful response:**
```json
{
  "success": true,
  "aiEnabled": false,
  "url": "https://example.com",
  "scannedAt": "2025-01-15T10:30:00.000Z",
  "score": 74,
  "totalIssues": 12,
  "critical": 1,
  "serious": 3,
  "moderate": 5,
  "minor": 3,
  "summary": {
    "passed": 48,
    "failed": 8,
    "needsReview": 3,
    "notApplicable": 21
  },
  "aiSummary": "This website has several accessibility barriers...",
  "issues": [
    {
      "id": "image-alt",
      "title": "Image Alt",
      "description": "Ensures <img> elements have alternate text or a role of none or presentation",
      "impact": "critical",
      "wcagCriteria": "WCAG 1.1.1",
      "element": "img.hero-image",
      "html": "<img class=\"hero-image\" src=\"banner.jpg\">",
      "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/image-alt",
      "simpleExplanation": "This image has no alternative text. People who are blind and use screen readers will hear nothing when they reach this image.",
      "suggestedFix": "Add an alt attribute that describes what the image communicates. Example: <img src=\"banner.jpg\" alt=\"A team of five engineers working together\">",
      "aiEnhanced": false
    }
  ]
}
```

**Error responses:**

| Status | Situation |
|---|---|
| `400` | Missing or invalid URL |
| `408` | Page took too long to load |
| `500` | Server or browser crash |

---

## Scoring System

The accessibility score (0–100) is calculated per severity band:

| Severity | Points per element | Max deduction |
|---|---|---|
| Critical | −12 | −40 |
| Serious | −7 | −30 |
| Moderate | −4 | −20 |
| Minor | −2 | −10 |

The caps prevent a single flood of minor issues from dropping the score to zero. The maximum possible total deduction is 100 (resulting in a score of 0).

---

## Testing the API

### Using cURL

```bash
# Health check
curl http://localhost:3000/api/health

# Audit a website
curl -X POST http://localhost:3000/api/audit/url \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Using Postman / Insomnia

1. Create a new `POST` request to `http://localhost:3000/api/audit/url`
2. Set the body type to **JSON**
3. Enter `{"url": "https://example.com"}`
4. Click Send

---

## Optional: Groq AI Integration

If you add a `GROQ_API_KEY` to your `.env`, each audit will:

1. **Enhance issue explanations** — the AI rewrites `simpleExplanation` and `suggestedFix` with richer context and code examples tailored to the actual element found
2. **Generate an `aiSummary`** — a short paragraph describing the site's overall accessibility health in plain English

The backend works **identically without a Groq key** — it just uses the built-in static explanations from `issueMapper.js`. No features are broken.

Get a **free** Groq API key at https://console.groq.com (no credit card required).

---

## Common Issues & Troubleshooting

### `Error: browserType.launch: Executable doesn't exist`
You haven't installed the Chromium browser yet. Run:
```bash
npx playwright install chromium
```

### `The page took too long to load`
The target site is slow or unreachable. Try:
- Increasing `PLAYWRIGHT_TIMEOUT` in `.env` (e.g. `60000` for 60 seconds)
- Checking that the URL is correct and the site is online

### `Cannot find module '@axe-core/playwright'`
Dependencies are not installed. Run:
```bash
npm install
```

### Groq AI returns no enhancements
Check that `GROQ_API_KEY` is set in your `.env` and not the `.env.example`. You can verify with:
```bash
curl http://localhost:3000/api/health
# look for "aiEnabled": true
```

---

## Environment Variables Reference

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `3000` | Port the server listens on |
| `NODE_ENV` | No | `development` | `development` or `production` |
| `PLAYWRIGHT_TIMEOUT` | No | `30000` | Max ms to wait for page load |
| `GROQ_API_KEY` | No | *(empty)* | Groq API key for AI features |
| `GROQ_MODEL` | No | `llama-3.3-70b-versatile` | Groq model name |

---

## npm Scripts

| Command | Description |
|---|---|
| `npm start` | Start server in production mode |
| `npm run dev` | Start with nodemon (auto-restart on save) |
| `npm run install:browsers` | Install Playwright's Chromium browser |
| `npm run setup` | Install npm packages + Chromium in one step |

---

## What's Next (Frontend)

The backend is fully self-contained. When you build the frontend, it will:
1. Send a `POST /api/audit/url` request with a URL
2. Receive the JSON report
3. Display the score, issue counts, and per-issue cards

---

## License

MIT
