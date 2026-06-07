# ♿ AccessMind AI

> AI-powered accessibility auditing platform that helps developers build more inclusive and accessible web experiences.

AccessMind AI scans websites for accessibility issues such as missing alt text, poor contrast, inaccessible forms, ARIA problems, and bad semantic structure. Unlike traditional accessibility scanners that only show technical errors, AccessMind AI provides beginner-friendly explanations, AI-powered insights, severity analysis, and actionable fix suggestions.

---

# ✨ Features

## 🔍 Accessibility Website Auditing
Scan any public website URL and receive a structured accessibility report.

## 🤖 AI-Powered Explanations
Get simple, human-readable explanations for accessibility issues instead of raw technical output.

## 📊 Accessibility Scoring
View a clear accessibility score with issue severity breakdown:
- Critical
- Serious
- Moderate
- Minor

## 🃏 Expandable Issue Cards
Each issue includes:
- Issue title
- Severity level
- WCAG criteria
- Affected element
- HTML snippet
- Plain-English explanation
- Suggested fix
- Official help resource

## 📥 Smart Report Downloads
Download beautifully structured accessibility reports in JSON or TXT format containing:
- Accessibility score
- AI-generated summary
- Severity breakdown
- Full issue analysis
- Suggested fixes
- WCAG references
- Scan timestamps and website details

## 🎨 Premium Modern UI
- Glassmorphism
- Gradient glow effects
- Animated blobs
- Smooth transitions
- Accessible color palette
- Responsive SaaS-style dashboard

## ♿ Accessibility First
The platform itself follows accessibility best practices:
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Strong color contrast
- Focus indicators
- Reduced motion support

---

# 🧠 Why AccessMind AI?

Most accessibility tools are:
- overly technical
- difficult for beginners
- hard to understand
- not visually intuitive

AccessMind AI focuses on:
- developer education
- accessibility awareness
- beginner-friendly explanations
- visually understandable reports
- modern UX and design

The goal is not only to detect problems, but also to help developers understand and fix them effectively.

---

# 🏗️ Project Architecture

```txt
Frontend (Next.js)
        ↓
Backend API (Express.js)
        ↓
Playwright Browser Automation
        ↓
axe-core Accessibility Engine
        ↓
AI Enhancements (Optional Groq API)

---

# 🧱 Tech Stack

## Frontend

| Technology | Purpose |
|---|---|
| Next.js 14 | Frontend framework |
| React | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| lucide-react | Icons |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Backend framework |
| Playwright | Browser automation |
| axe-core | Accessibility testing |
| @axe-core/playwright | Playwright integration |
| Groq API, optional | AI-powered explanations |

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd AccessMind-AI
```

---

# ⚙️ Backend Setup

The backend is a Node.js + Express API that uses Playwright and axe-core to scan websites for accessibility issues.

## Go to Backend Folder

```bash
cd backend
```

## Install Backend Dependencies

```bash
npm install
```

## Install Playwright Browser

```bash
npx playwright install chromium
```

## Create Backend Environment File

Create a `.env` file inside the `backend` folder:

```txt
backend/.env
```

Add this:

```env
PORT=3000
NODE_ENV=development
PLAYWRIGHT_TIMEOUT=30000

# Optional: Only needed if you want AI-enhanced explanations
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

## Run Backend

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:3000
```

---

# 🎨 Frontend Setup

The frontend is a Next.js app that connects to the backend and displays the accessibility audit report.

## Open a New Terminal

Go back to the root project folder, then enter the frontend folder:

```bash
cd frontend
```

## Install Frontend Dependencies

```bash
npm install
```

## Create Frontend Environment File

Create a `.env.local` file inside the `frontend` folder:

```txt
frontend/.env.local
```

Add this:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Run Frontend

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:3001
```

Open:

```txt
http://localhost:3001
```

---

# 🌐 Environment Variables

## Backend Environment Variables

File location:

```txt
backend/.env
```

```env
PORT=3000
NODE_ENV=development
PLAYWRIGHT_TIMEOUT=30000
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Backend server port |
| `NODE_ENV` | No | App environment |
| `PLAYWRIGHT_TIMEOUT` | No | Max time for page loading |
| `GROQ_API_KEY` | No | Optional Groq API key for AI explanations |
| `GROQ_MODEL` | No | Optional Groq model name |

---

## Frontend Environment Variables

File location:

```txt
frontend/.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL |

---

# 🔌 API Endpoints

## 1. Health Check

```http
GET /api/health
```

Full local URL:

```txt
http://localhost:3000/api/health
```

### Example Response

```json
{
  "success": true,
  "status": "ok",
  "message": "AI Accessibility Auditor is running",
  "version": "1.0.0",
  "timestamp": "2025-01-15T10:30:00.000Z",
  "environment": "development",
  "aiEnabled": true
}
```

---

## 2. Accessibility Audit

```http
POST /api/audit/url
```

Full local URL:

```txt
http://localhost:3000/api/audit/url
```

### Request Body

```json
{
  "url": "https://example.com"
}
```

### Example Response

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
  "aiSummary": "This website has several accessibility barriers that should be reviewed.",
  "issues": [
    {
      "id": "image-alt",
      "title": "Image Alt",
      "description": "Ensures images have alternate text",
      "impact": "critical",
      "wcagCriteria": "WCAG 1.1.1",
      "element": "img.hero-image",
      "html": "<img class='hero-image' src='banner.jpg'>",
      "helpUrl": "https://dequeuniversity.com/rules/axe/4.10/image-alt",
      "simpleExplanation": "This image has no alternative text. People using screen readers may not understand what the image represents.",
      "suggestedFix": "Add a descriptive alt attribute to the image.",
      "aiEnhanced": false
    }
  ]
}
```

---

# 🧪 Testing the Backend

## Test Health Route

```bash
curl http://localhost:3000/api/health
```

## Test Audit Route

```bash
curl -X POST http://localhost:3000/api/audit/url \
  -H "Content-Type: application/json" \
  -d "{\"url\":\"https://example.com\"}"
```

---

# 🧪 Testing with Postman

## Health Check

Method:

```txt
GET
```

URL:

```txt
http://localhost:3000/api/health
```

Click **Send**.

---

## Audit Website

Method:

```txt
POST
```

URL:

```txt
http://localhost:3000/api/audit/url
```

Go to:

```txt
Body → raw → JSON
```

Paste:

```json
{
  "url": "https://example.com"
}
```

Click **Send**.

---

# 📥 Report Download

After a scan is completed on the frontend, users can download the accessibility report.

Supported formats:

```txt
JSON
TXT
```

The downloaded report includes:

- Website URL
- Accessibility score
- Scan date and time
- AI summary
- Total issue count
- Critical issue count
- Serious issue count
- Moderate issue count
- Minor issue count
- Full issue list
- Plain-English explanations
- Suggested fixes
- WCAG references
- Help URLs

---

# 🎨 Frontend Pages

## Landing Page

Includes:

- Hero section
- Project description
- Features section
- How it works section
- Accessibility importance section
- Navbar
- Footer

---

## Audit Page

Includes:

- URL input
- Scan button
- Loading state
- Error state
- Audit results
- Download report button

---

## About Page

Includes:

- Project explanation
- Why accessibility matters
- How AccessMind AI improves on traditional scanners
- AI-powered explanation approach

---

# 🏗️ Project Structure

```txt
AccessMind-AI/
│
├── backend/
│   ├── server.js
│   ├── app.js
│   ├── package.json
│   ├── .env.example
│   ├── README.md
│   │
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       └── utils/
│
├── frontend/
│   ├── package.json
│   ├── .env.local.example
│   ├── README.md
│   │
│   └── src/
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── types/
│
└── README.md
```

---

# 📦 Deployment

## Recommended Deployment Setup

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render or Railway |

---

## Frontend Deployment

Deploy the `frontend` folder to Vercel.

Set this environment variable in Vercel:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

---

## Backend Deployment

Deploy the `backend` folder to Render or Railway.

Set these environment variables:

```env
PORT=3000
NODE_ENV=production
PLAYWRIGHT_TIMEOUT=30000
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

After backend deployment, copy the backend live URL and paste it into the frontend environment variable:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

---

# 🛠️ Common Issues

## Backend not connecting to frontend

Check:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Make sure backend is running on port `3000`.

---

## Playwright browser error

Run:

```bash
npx playwright install chromium
```

---

## Frontend port conflict

The frontend should run on:

```txt
http://localhost:3001
```

If needed, run:

```bash
next dev -p 3001
```

---

## CORS Error

Make sure backend has `cors` enabled and frontend is calling the correct backend URL.

---

# 🧪 Local Development Commands

## Run Backend

```bash
cd backend
npm run dev
```

## Run Frontend

```bash
cd frontend
npm run dev
```

---

# 📜 License

MIT License

