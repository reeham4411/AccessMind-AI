'use client';

import { cn } from '@/lib/utils';

interface BackgroundBlobsProps {
  variant?: 'default' | 'audit' | 'report';
  className?: string;
}

/**
 * Renders soft animated background blobs for ambient visual depth.
 * These are purely decorative and hidden from screen readers.
 */
export default function BackgroundBlobs({
  variant = 'default',
  className,
}: BackgroundBlobsProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('fixed inset-0 overflow-hidden pointer-events-none', className)}
      style={{ zIndex: 0 }}
    >
      {variant === 'default' && (
        <>
          {/* Top-left green blob */}
          <div
            className="blob absolute -top-48 -left-48 w-[600px] h-[600px]
                        bg-brand-500/[0.07] animate-blob"
          />
          {/* Top-right accent blob */}
          <div
            className="blob absolute -top-32 -right-48 w-[500px] h-[500px]
                        bg-accent-500/[0.06] animate-blob animation-delay-2000"
          />
          {/* Bottom-center blob */}
          <div
            className="blob absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]
                        bg-brand-500/[0.04] animate-blob animation-delay-4000"
          />
        </>
      )}

      {variant === 'audit' && (
        <>
          <div
            className="blob absolute top-1/4 -left-32 w-[500px] h-[500px]
                        bg-brand-500/[0.08] animate-blob"
          />
          <div
            className="blob absolute bottom-1/4 -right-32 w-[400px] h-[400px]
                        bg-accent-500/[0.07] animate-blob animation-delay-2000"
          />
        </>
      )}

      {variant === 'report' && (
        <>
          <div
            className="blob absolute -top-32 right-1/4 w-[400px] h-[400px]
                        bg-brand-500/[0.06] animate-blob animation-delay-400"
          />
          <div
            className="blob absolute bottom-1/3 -left-24 w-[300px] h-[300px]
                        bg-accent-500/[0.05] animate-blob animation-delay-2000"
          />
        </>
      )}

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial vignette to keep edges dark */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, transparent 40%, #080c10 100%)',
        }}
      />
    </div>
  );
}
