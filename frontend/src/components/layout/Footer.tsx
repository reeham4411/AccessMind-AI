import Link from 'next/link';
import { Scan, Github, Heart, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050810]">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                <Scan className="w-4 h-4 text-brand-400" />
              </div>
              <span className="font-display font-bold text-white text-lg tracking-tight">
                Access<span className="gradient-text-brand">Mind</span>
              </span>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono
                               bg-brand-500/10 border border-brand-500/20 text-brand-400">
                <Zap className="w-2.5 h-2.5" />AI
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm font-body">
              AI-powered accessibility auditing platform. Helping developers build
              more inclusive web experiences for everyone.
            </p>
            <p className="flex items-center gap-1.5 text-slate-600 text-xs font-body">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for a more accessible web
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-slate-300 text-sm">Navigate</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/audit', label: 'Start Audit' },
                { href: '/about', label: 'About' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-slate-300 text-sm font-body transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-slate-300 text-sm">Resources</h3>
            <ul className="space-y-2.5">
              {[
                { href: 'https://www.w3.org/WAI/standards-guidelines/wcag/', label: 'WCAG Guidelines' },
                { href: 'https://dequeuniversity.com/', label: 'Deque University' },
                { href: 'https://webaim.org/', label: 'WebAIM' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-300 text-sm font-body transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs font-body">
            © {new Date().getFullYear()} AccessMind AI. Built for a more inclusive web.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-slate-600 text-xs font-body">Backend operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
