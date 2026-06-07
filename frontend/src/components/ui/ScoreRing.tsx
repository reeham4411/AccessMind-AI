'use client';

import { useEffect, useState } from 'react';
import { getScoreInfo } from '@/lib/utils';

interface ScoreRingProps {
  score: number;
  size?: number;
}

/**
 * Animated circular progress ring for the accessibility score.
 * Uses SVG stroke-dashoffset animation for smooth reveal.
 */
export default function ScoreRing({ score, size = 180 }: ScoreRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - 24) / 2;
  const circumference = 2 * Math.PI * radius;
  const scoreInfo = getScoreInfo(score);

  // Animate score number on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-xl"
        style={{ background: scoreInfo.color }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label={`Accessibility score: ${score} out of 100 — ${scoreInfo.label}`}
        role="img"
      >
        {/* Track ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={12}
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={scoreInfo.color}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="score-ring"
          style={{
            filter: `drop-shadow(0 0 8px ${scoreInfo.color}80)`,
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-display font-extrabold text-4xl leading-none"
          style={{ color: scoreInfo.color }}
        >
          {score}
        </span>
        <span className="font-body text-slate-400 text-xs mt-1">/100</span>
        <span
          className="font-display font-semibold text-sm mt-1"
          style={{ color: scoreInfo.color }}
        >
          {scoreInfo.label}
        </span>
      </div>
    </div>
  );
}
