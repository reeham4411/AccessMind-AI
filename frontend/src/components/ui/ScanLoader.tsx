'use client';

import { useEffect, useState } from 'react';
import { Scan, Wifi, Shield, Eye, Code2, CheckCircle2 } from 'lucide-react';

const SCAN_STEPS = [
  { icon: Wifi, label: 'Connecting to target URL...' },
  { icon: Code2, label: 'Parsing HTML structure...' },
  { icon: Eye, label: 'Checking color contrast...' },
  { icon: Shield, label: 'Validating ARIA attributes...' },
  { icon: Scan, label: 'Auditing form elements...' },
  { icon: CheckCircle2, label: 'Generating AI insights...' },
];

/** Animated loading state shown during the accessibility scan */
export default function ScanLoader({ url }: { url: string }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through step labels
    const stepInterval = setInterval(() => {
      setStep((s) => (s + 1) % SCAN_STEPS.length);
    }, 1800);

    // Animate progress bar up to ~90% (backend controls completion)
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 8, 88));
    }, 600);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const CurrentIcon = SCAN_STEPS[step].icon;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-10">
      {/* Animated scan rings */}
      <div className="relative w-40 h-40 flex items-center justify-center" aria-hidden="true">
        {/* Outer pulse ring */}
        <div className="absolute inset-0 rounded-full border-2 border-brand-500/20 animate-ping" />
        {/* Mid ring */}
        <div className="absolute inset-4 rounded-full border border-brand-500/30 animate-spin-slow" />
        {/* Inner ring */}
        <div className="absolute inset-8 rounded-full border border-brand-500/50 animate-pulse-slow" />
        {/* Center icon */}
        <div className="relative z-10 w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/30
                        flex items-center justify-center animate-float">
          <CurrentIcon className="w-7 h-7 text-brand-400" />
        </div>
        {/* Scan line effect */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
          style={{ maskImage: 'radial-gradient(circle, white, transparent)' }}
        >
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-400 to-transparent
                          animate-scan-line opacity-80" />
        </div>
      </div>

      {/* Status text */}
      <div className="space-y-3">
        <h2 className="font-display font-bold text-white text-2xl">
          Scanning Website
        </h2>
        <p
          className="font-mono text-brand-400 text-sm truncate max-w-sm mx-auto
                     bg-brand-500/10 px-4 py-2 rounded-lg border border-brand-500/20"
        >
          {url}
        </p>
        <p className="text-slate-400 font-body text-sm animate-pulse">
          {SCAN_STEPS[step].label}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm space-y-2" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        <div className="flex justify-between text-xs font-mono text-slate-500">
          <span>Analyzing…</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-white/05 rounded-full overflow-hidden">
          <div
            className="h-full loading-bar rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2" aria-hidden="true">
        {SCAN_STEPS.map((s, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === step
                ? 'bg-brand-400 scale-125'
                : i < step
                ? 'bg-brand-700'
                : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      <p className="text-slate-600 text-xs font-body">
        This may take 15–30 seconds depending on the site
      </p>
    </div>
  );
}
