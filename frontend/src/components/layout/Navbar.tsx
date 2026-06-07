'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Scan, Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/audit', label: 'Audit' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add shadow/blur when scrolled past 20px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#080c10]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center
                            group-hover:bg-brand-500/30 group-hover:border-brand-400/50 transition-all duration-300">
              <Scan className="w-4 h-4 text-brand-400" />
            </div>
            {/* Pulse effect on logo */}
            <span className="absolute inset-0 rounded-lg bg-brand-500/20 animate-ping opacity-0 group-hover:opacity-50" />
          </div>
          <span className="font-display font-bold text-white text-lg tracking-tight">
            Access<span className="gradient-text-brand">Mind</span>
          </span>
          <span className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono
                           bg-brand-500/10 border border-brand-500/20 text-brand-400">
            <Zap className="w-2.5 h-2.5" />AI
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200',
                pathname === link.href
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              {/* Active indicator */}
              {pathname === link.href && (
                <span className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.08]" />
              )}
              <span className="relative">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/audit" className="btn-primary text-sm px-4 py-2">
            <Scan className="w-3.5 h-3.5" />
            Start Audit
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/05 transition-all"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#080c10]/95 backdrop-blur-xl border-b border-white/[0.06] px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-body font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-white bg-white/[0.06]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/audit"
              onClick={() => setMenuOpen(false)}
              className="btn-primary mt-2 justify-center"
            >
              <Scan className="w-4 h-4" />
              Start Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
