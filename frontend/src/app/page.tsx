import Link from 'next/link';
import {
  ArrowRight, Scan, Zap, Eye, Shield, Code2, Lightbulb,
  BarChart3, CheckCircle2, AlertTriangle, Users, Globe2,
  ChevronRight, Sparkles,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackgroundBlobs from '@/components/ui/BackgroundBlobs';

/* ─── Data ──────────────────────────────────────────────────────────────────── */

const features = [
  {
    icon: Eye,
    title: 'Visual Contrast Analysis',
    description: 'Detect poor color contrast ratios that make text unreadable for low-vision users, with exact WCAG-compliant recommendations.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
  },
  {
    icon: Code2,
    title: 'ARIA & Semantic HTML',
    description: 'Validate ARIA attributes, roles, and landmark usage. Catch missing labels, bad heading structure, and semantic errors.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Lightbulb,
    title: 'AI-Powered Explanations',
    description: 'Every issue comes with a plain-English explanation and a concrete fix suggestion — no accessibility expertise required.',
    color: 'text-brand-400',
    bg: 'bg-brand-500/10',
    border: 'border-brand-500/20',
  },
  {
    icon: Shield,
    title: 'WCAG 2.1 Compliance',
    description: 'Aligned with WCAG 2.1 A and AA criteria. Get precise guideline references for every detected issue.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
  {
    icon: BarChart3,
    title: 'Accessibility Score',
    description: 'An overall score from 0–100 gives you a quick, intuitive picture of your site\'s accessibility health at a glance.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Sparkles,
    title: 'Downloadable Reports',
    description: 'Export full accessibility reports in JSON or TXT format — perfect for sharing with your team or tracking progress over time.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
];

const steps = [
  {
    number: '01',
    title: 'Enter a URL',
    description: 'Paste any website URL into the audit tool. AccessMind AI handles the rest.',
    icon: Globe2,
  },
  {
    number: '02',
    title: 'AI Scans the Site',
    description: 'Our backend runs a deep axe-powered audit, then AI enhances each issue with human-readable context.',
    icon: Scan,
  },
  {
    number: '03',
    title: 'Review Your Report',
    description: 'Get a full breakdown of issues by severity, WCAG criteria, and actionable fix suggestions.',
    icon: BarChart3,
  },
  {
    number: '04',
    title: 'Fix & Export',
    description: 'Apply the suggested fixes, download the report, and build a more accessible web.',
    icon: CheckCircle2,
  },
];

const stats = [
  { value: '1 in 4', label: 'Adults have a disability' },
  { value: '96.8%', label: 'Of top websites fail WCAG' },
  { value: '$13B+', label: 'Lost annually from inaccessible UX' },
  { value: '2.2B', label: 'People with visual impairments' },
];

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      <BackgroundBlobs variant="default" />
      <Navbar />

      <main className="relative z-10">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="min-h-screen flex flex-col items-center justify-center
                     text-center px-4 sm:px-6 lg:px-8 pt-24 pb-16"
          aria-label="Hero"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                          bg-brand-500/10 border border-brand-500/20 text-brand-400
                          text-xs font-mono mb-8 animate-fade-in">
            <Zap className="w-3 h-3" />
            AI-Powered Accessibility Auditing
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl
                       leading-[1.05] tracking-tight text-white max-w-4xl mx-auto
                       animate-slide-up text-balance"
          >
            Make the Web{' '}
            <span className="gradient-text">Accessible</span>{' '}
            for Everyone
          </h1>

          {/* Subheading */}
          <p
            className="mt-6 text-slate-400 text-lg sm:text-xl font-body
                       max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-200"
          >
            AccessMind AI scans any website for accessibility barriers, explains
            each issue in plain English, and provides smart, actionable fixes —
            powered by AI.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 animate-slide-up animation-delay-400">
            <Link href="/audit" className="btn-primary text-base px-8 py-4 animate-glow">
              <Scan className="w-5 h-5" />
              Start Free Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="btn-ghost text-base px-8 py-4">
              Learn More
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Social proof mini stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto
                          animate-slide-up animation-delay-600">
            {[
              { icon: CheckCircle2, text: 'WCAG 2.1 Compliant' },
              { icon: Zap, text: 'AI-Enhanced Fixes' },
              { icon: Shield, text: 'Zero Data Stored' },
              { icon: Globe2, text: 'Any Public Website' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-slate-500 text-sm font-body">
                <Icon className="w-4 h-4 text-brand-500 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 animate-bounce opacity-40">
            <span className="text-slate-600 text-xs font-body">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
          </div>
        </section>

        {/* ── Stats banner ──────────────────────────────────────────────────── */}
        <section className="py-16 px-4 border-y border-white/[0.04] bg-white/[0.015]" aria-label="Accessibility statistics">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-extrabold text-3xl gradient-text-brand mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ──────────────────────────────────────────────────────── */}
        <section className="section max-w-7xl mx-auto" aria-labelledby="features-heading">
          <div className="text-center mb-16">
            <span className="font-mono text-brand-500 text-sm tracking-widest uppercase">
              Capabilities
            </span>
            <h2
              id="features-heading"
              className="mt-3 font-display font-extrabold text-4xl text-white"
            >
              Everything You Need to{' '}
              <span className="gradient-text">Audit Accessibility</span>
            </h2>
            <p className="mt-4 text-slate-400 font-body max-w-xl mx-auto">
              AccessMind AI goes far beyond traditional scanners — delivering
              context, clarity, and actionable intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className={`glass glass-hover rounded-2xl p-6 border ${f.border} group`}
              >
                <div className={`w-10 h-10 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{f.title}</h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── How it works ──────────────────────────────────────────────────── */}
        <section
          className="section max-w-7xl mx-auto"
          aria-labelledby="how-it-works-heading"
        >
          <div className="text-center mb-16">
            <span className="font-mono text-brand-500 text-sm tracking-widest uppercase">
              Process
            </span>
            <h2
              id="how-it-works-heading"
              className="mt-3 font-display font-extrabold text-4xl text-white"
            >
              How AccessMind AI Works
            </h2>
            <p className="mt-4 text-slate-400 font-body max-w-xl mx-auto">
              From URL to full accessibility report in under 30 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-10 left-full w-full h-px
                                bg-gradient-to-r from-brand-500/30 to-transparent z-10"
                    style={{ width: 'calc(100% - 80px)', left: '80px' }}
                    aria-hidden="true"
                  />
                )}

                <div className="glass rounded-2xl p-6 border border-white/[0.06] h-full group hover:border-brand-500/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-brand-500/60 text-xs font-bold tracking-widest">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20
                                    flex items-center justify-center group-hover:bg-brand-500/20 transition-all duration-300">
                      <step.icon className="w-5 h-5 text-brand-400" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-2">{step.title}</h3>
                  <p className="font-body text-slate-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why accessibility matters ──────────────────────────────────── */}
        <section
          className="section max-w-7xl mx-auto"
          aria-labelledby="a11y-heading"
        >
          <div className="glass rounded-3xl border border-white/[0.08] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left: content */}
              <div className="p-10 lg:p-14 space-y-6">
                <span className="font-mono text-brand-500 text-sm tracking-widest uppercase">
                  Why It Matters
                </span>
                <h2
                  id="a11y-heading"
                  className="font-display font-extrabold text-3xl lg:text-4xl text-white leading-tight"
                >
                  Accessibility is not optional — it&apos;s a{' '}
                  <span className="gradient-text">fundamental right</span>
                </h2>
                <p className="font-body text-slate-400 leading-relaxed">
                  Over 1 billion people live with some form of disability. Inaccessible
                  websites exclude them from information, services, and opportunities
                  that most of us take for granted.
                </p>
                <p className="font-body text-slate-400 leading-relaxed">
                  Beyond ethics, accessibility drives business value: better SEO, wider
                  reach, reduced legal risk, and improved UX for all users — including
                  those with temporary or situational limitations.
                </p>
                <div className="flex flex-col gap-3 pt-2">
                  {[
                    'WCAG 2.1 compliance reduces legal liability',
                    'Accessible sites rank better in search results',
                    'Improved usability for all users, not just those with disabilities',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                      <span className="font-body text-slate-300 text-sm">{point}</span>
                    </div>
                  ))}
                </div>
                <Link href="/audit" className="btn-primary inline-flex mt-4">
                  <Scan className="w-4 h-4" />
                  Audit Your Site Now
                </Link>
              </div>

              {/* Right: visual card stack */}
              <div className="relative p-10 lg:p-14 flex items-center justify-center bg-gradient-to-br from-brand-950/20 to-transparent border-l border-white/[0.05]">
                <div className="relative w-full max-w-xs space-y-3">
                  {[
                    { label: 'Color Contrast', score: 98, color: 'bg-brand-500' },
                    { label: 'Alt Text Coverage', score: 72, color: 'bg-yellow-500' },
                    { label: 'Keyboard Navigation', score: 55, color: 'bg-orange-500' },
                    { label: 'Form Accessibility', score: 40, color: 'bg-red-500' },
                  ].map((item) => (
                    <div key={item.label} className="glass rounded-xl p-4 border border-white/[0.06]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-body text-slate-300 text-sm">{item.label}</span>
                        <span className="font-mono text-slate-400 text-xs">{item.score}%</span>
                      </div>
                      <div className="h-1.5 bg-white/05 rounded-full">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="section max-w-4xl mx-auto text-center" aria-label="Call to action">
          <div className="glass rounded-3xl border border-brand-500/20 p-12 lg:p-16 relative overflow-hidden">
            {/* Glow */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(13,179,106,0.3) 0%, transparent 70%)',
              }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <h2 className="font-display font-extrabold text-4xl lg:text-5xl text-white mb-4">
                Ready to make your site{' '}
                <span className="gradient-text">accessible?</span>
              </h2>
              <p className="text-slate-400 font-body text-lg mb-8 max-w-xl mx-auto">
                Run a free accessibility audit in seconds. No sign-up required.
              </p>
              <Link href="/audit" className="btn-primary text-base px-10 py-4">
                <Scan className="w-5 h-5" />
                Start Your Free Audit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
