import Link from 'next/link';
import {
  Scan, Zap, Shield, Eye, Code2, Users, CheckCircle2,
  AlertTriangle, Brain, Globe2, ArrowRight, Lightbulb,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackgroundBlobs from '@/components/ui/BackgroundBlobs';

const traditionalVsAI = [
  {
    traditional: 'Raw technical error codes (e.g. "WCAG 1.1.1 failure")',
    ai: 'Plain-English explanations anyone can understand',
  },
  {
    traditional: 'No guidance on how to fix issues',
    ai: 'Concrete, copy-paste-ready suggested fixes',
  },
  {
    traditional: 'Severity labels with no context',
    ai: 'Severity + real-world impact on users with disabilities',
  },
  {
    traditional: 'Developer-only output',
    ai: 'Beginner-friendly reports for developers and designers alike',
  },
  {
    traditional: 'No AI or contextual intelligence',
    ai: 'AI-enhanced analysis for nuanced issue detection',
  },
];

const teamValues = [
  {
    icon: Globe2,
    title: 'Universal Access',
    description: 'We believe every person deserves equal access to information and services on the web, regardless of ability.',
  },
  {
    icon: Brain,
    title: 'AI for Good',
    description: 'AI should lower barriers, not create them. We use AI to make accessibility expertise available to everyone.',
  },
  {
    icon: Users,
    title: 'Developer First',
    description: 'Built for the developers building the web. Fast, accurate, and actionable insights that fit into real workflows.',
  },
  {
    icon: Shield,
    title: 'Privacy & Trust',
    description: 'We never store your data. Audits are processed and discarded immediately. Your URLs stay yours.',
  },
];

export default function AboutPage() {
  return (
    <>
      <BackgroundBlobs variant="default" />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-24 pb-16">
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="section max-w-4xl mx-auto text-center" aria-label="About hero">
          <span className="font-mono text-brand-500 text-sm tracking-widest uppercase">
            About AccessMind AI
          </span>
          <h1 className="mt-4 font-display font-extrabold text-5xl sm:text-6xl text-white leading-tight">
            Built to make{' '}
            <span className="gradient-text">accessibility</span>{' '}
            simple
          </h1>
          <p className="mt-6 text-slate-400 font-body text-xl leading-relaxed max-w-2xl mx-auto">
            AccessMind AI is an AI-powered accessibility auditing platform that
            helps developers understand and fix accessibility barriers — without
            needing to be an accessibility expert.
          </p>
        </section>

        {/* ── What it does ──────────────────────────────────────────────────── */}
        <section className="section max-w-6xl mx-auto" aria-labelledby="what-heading">
          <div className="glass rounded-3xl border border-white/[0.08] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-14">
                <h2 id="what-heading" className="font-display font-extrabold text-3xl text-white mb-6">
                  What AccessMind AI Does
                </h2>
                <div className="space-y-5">
                  {[
                    { icon: Scan, title: 'Deep Website Scanning', desc: 'Powered by axe-core, the industry standard for accessibility testing used by Google, Microsoft, and Deque.' },
                    { icon: Brain, title: 'AI Issue Analysis', desc: 'Every detected issue is enhanced with AI-generated plain-English explanations and specific fix suggestions.' },
                    { icon: Eye, title: 'Contrast & Visual Checks', desc: 'Detect poor color contrast, missing focus indicators, and other visual barriers that affect low-vision users.' },
                    { icon: Code2, title: 'ARIA & Semantic Validation', desc: 'Catches missing ARIA labels, incorrect roles, broken keyboard navigation, and semantic HTML errors.' },
                    { icon: Shield, title: 'WCAG 2.1 Mapping', desc: 'Every issue is mapped to its WCAG 2.1 criterion with a direct link to the full specification.' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mt-0.5">
                        <Icon className="w-5 h-5 text-brand-400" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-white text-sm mb-1">{title}</h3>
                        <p className="font-body text-slate-400 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 lg:p-14 bg-gradient-to-br from-brand-950/20 to-transparent border-l border-white/[0.05]">
                <h2 className="font-display font-extrabold text-3xl text-white mb-6">
                  Why Accessibility Matters
                </h2>
                <div className="space-y-5">
                  {[
                    { stat: '1.3B+', label: 'People with some form of disability worldwide' },
                    { stat: '96.8%', label: 'Of top 1 million websites fail basic WCAG criteria (WebAIM 2024)' },
                    { stat: '71%', label: 'Of users with disabilities will leave an inaccessible website immediately' },
                    { stat: '$13B+', label: 'In revenue lost annually by businesses with inaccessible websites' },
                  ].map(({ stat, label }) => (
                    <div key={stat} className="glass rounded-xl p-4 border border-white/[0.06]">
                      <div className="font-display font-extrabold text-2xl gradient-text-brand mb-1">{stat}</div>
                      <div className="font-body text-slate-400 text-sm">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── AccessMind vs Traditional ─────────────────────────────────────── */}
        <section className="section max-w-6xl mx-auto" aria-labelledby="comparison-heading">
          <div className="text-center mb-12">
            <h2
              id="comparison-heading"
              className="font-display font-extrabold text-3xl text-white"
            >
              AccessMind AI vs Traditional Scanners
            </h2>
            <p className="mt-3 text-slate-400 font-body">
              Traditional tools tell you <em>what</em> is wrong. We tell you <em>why</em> it matters and <em>how</em> to fix it.
            </p>
          </div>

          <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-2 bg-white/[0.03] border-b border-white/[0.06]">
              <div className="p-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-slate-500" />
                <span className="font-display font-semibold text-slate-400 text-sm">Traditional Scanners</span>
              </div>
              <div className="p-4 flex items-center gap-2 border-l border-white/[0.06]">
                <Zap className="w-4 h-4 text-brand-400" />
                <span className="font-display font-semibold text-brand-300 text-sm">AccessMind AI</span>
              </div>
            </div>

            {/* Rows */}
            {traditionalVsAI.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 ${i < traditionalVsAI.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
              >
                <div className="p-5 flex items-start gap-2.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500/60 mt-0.5 flex-shrink-0" />
                  <span className="font-body text-slate-500 text-sm">{row.traditional}</span>
                </div>
                <div className="p-5 flex items-start gap-2.5 border-l border-white/[0.04] bg-brand-950/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 mt-0.5 flex-shrink-0" />
                  <span className="font-body text-slate-300 text-sm">{row.ai}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Core Values ───────────────────────────────────────────────────── */}
        <section className="section max-w-6xl mx-auto" aria-labelledby="values-heading">
          <div className="text-center mb-12">
            <h2
              id="values-heading"
              className="font-display font-extrabold text-3xl text-white"
            >
              Our Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamValues.map((val) => (
              <div
                key={val.title}
                className="glass glass-hover rounded-2xl border border-white/[0.06] p-6 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20
                                flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <val.icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2">{val.title}</h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tech stack ────────────────────────────────────────────────────── */}
        <section className="section max-w-4xl mx-auto" aria-labelledby="tech-heading">
          <div className="glass rounded-2xl border border-white/[0.08] p-8 lg:p-10">
            <h2
              id="tech-heading"
              className="font-display font-extrabold text-2xl text-white mb-6"
            >
              How It&apos;s Built
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display font-semibold text-slate-300 text-sm mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-brand-400" />
                  Frontend
                </h3>
                <ul className="space-y-2">
                  {['Next.js 14 (App Router)', 'React + TypeScript', 'Tailwind CSS', 'shadcn/ui', 'lucide-react'].map((t) => (
                    <li key={t} className="flex items-center gap-2 font-mono text-slate-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display font-semibold text-slate-300 text-sm mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent-400" />
                  Backend (Pre-built)
                </h3>
                <ul className="space-y-2">
                  {['Node.js + Express', 'axe-core Engine', 'AI Enhancement Layer', 'WCAG 2.1 Mapping', 'REST API'].map((t) => (
                    <li key={t} className="flex items-center gap-2 font-mono text-slate-400 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="section max-w-3xl mx-auto text-center" aria-label="Call to action">
          <div className="glass rounded-3xl border border-brand-500/20 p-10 lg:p-14 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(13,179,106,0.4) 0%, transparent 70%)' }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <Lightbulb className="w-10 h-10 text-brand-400 mx-auto mb-4" />
              <h2 className="font-display font-extrabold text-3xl text-white mb-3">
                Try it for yourself
              </h2>
              <p className="text-slate-400 font-body mb-8">
                Run a free, instant accessibility audit on any public website.
              </p>
              <Link href="/audit" className="btn-primary text-base px-8 py-4">
                <Scan className="w-5 h-5" />
                Start Free Audit
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
