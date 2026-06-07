# AccessMind AI — Frontend

> AI-powered accessibility auditing platform. Scan any website and get a beautiful, actionable accessibility report.

---

## ✨ Features

- 🎨 Premium SaaS-style dark UI with glassmorphism and smooth animations
- 🔍 URL-based accessibility scanning (powered by your backend)
- 📊 Animated accessibility score ring (0–100)
- 🤖 AI summary section for each audit
- 🃏 Issue cards with expandable details (explanation + fix + WCAG criteria)
- 📥 Download reports in JSON or TXT format
- 🌐 Fully responsive for mobile, tablet, and desktop
- ♿ Accessible UI — semantic HTML, ARIA attributes, strong color contrast

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Your backend server running at `http://localhost:3000`

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Then open .env.local and confirm the backend URL is correct

# 3. Start the development server (runs on port 3001 to avoid conflict with backend)
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── globals.css         # Global styles, animations, utilities
│   ├── page.tsx            # Landing page
│   ├── audit/
│   │   └── page.tsx        # Audit page (URL input + results)
│   ├── about/
│   │   └── page.tsx        # About page
│   └── not-found.tsx       # 404 page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Top navigation bar
│   │   └── Footer.tsx      # Site footer
│   └── ui/
│       ├── BackgroundBlobs.tsx  # Animated ambient blobs
│       ├── ScoreRing.tsx        # Animated SVG score ring
│       ├── IssueCard.tsx        # Expandable issue card
│       ├── ScanLoader.tsx       # Loading animation during scan
│       └── StatCard.tsx         # Issue count stat card
│
├── lib/
│   ├── api.ts              # Backend API client
│   ├── download.ts         # Report download utilities (JSON/TXT)
│   └── utils.ts            # cn(), getImpactColors(), formatDate(), etc.
│
└── types/
    └── audit.ts            # TypeScript types for API responses
```

---

## ⚙️ Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Fonts | Syne (display), DM Sans (body), JetBrains Mono |
| Exports | JSON + TXT download |

---

## 🔌 Backend API

The frontend communicates with your pre-built backend:

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | GET | Health check |
| `/api/audit/url` | POST | Run accessibility audit |

Set `NEXT_PUBLIC_API_URL` to point to your backend.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 📄 Report Download

After a scan, users can download:

- **JSON** — Full structured report (best for programmatic use)
- **TXT** — Human-readable plain text report

Both include: URL, score, scan timestamp, AI summary, issue breakdown, and full issue list with explanations and fixes.

---

## ♿ Accessibility

This frontend itself follows WCAG 2.1 AA guidelines:

- Semantic HTML throughout
- ARIA labels and roles on interactive elements
- Strong color contrast ratios (4.5:1+)
- Keyboard navigable
- Screen reader friendly
- Focus visible indicators
- No motion without prefers-reduced-motion respect
