import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ImpactLevel } from '@/types/audit';

/** Merges Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Returns color classes for each impact level */
export function getImpactColors(impact: ImpactLevel) {
  const map: Record<ImpactLevel, {
    bg: string;
    text: string;
    border: string;
    badge: string;
    dot: string;
  }> = {
    critical: {
      bg: 'bg-red-950/40',
      text: 'text-red-300',
      border: 'border-red-800/50',
      badge: 'bg-red-900/60 text-red-300 border-red-700/50',
      dot: 'bg-red-400',
    },
    serious: {
      bg: 'bg-orange-950/40',
      text: 'text-orange-300',
      border: 'border-orange-800/50',
      badge: 'bg-orange-900/60 text-orange-300 border-orange-700/50',
      dot: 'bg-orange-400',
    },
    moderate: {
      bg: 'bg-yellow-950/40',
      text: 'text-yellow-300',
      border: 'border-yellow-800/50',
      badge: 'bg-yellow-900/60 text-yellow-300 border-yellow-700/50',
      dot: 'bg-yellow-400',
    },
    minor: {
      bg: 'bg-blue-950/40',
      text: 'text-blue-300',
      border: 'border-blue-800/50',
      badge: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
      dot: 'bg-blue-400',
    },
  };
  return map[impact] ?? map.minor;
}

/** Returns a score label and color based on accessibility score */
export function getScoreInfo(score: number): {
  label: string;
  color: string;
  textColor: string;
  description: string;
} {
  if (score >= 90) return {
    label: 'Excellent',
    color: '#0db36a',
    textColor: 'text-brand-400',
    description: 'This site is highly accessible.',
  };
  if (score >= 70) return {
    label: 'Good',
    color: '#86efac',
    textColor: 'text-green-300',
    description: 'This site is mostly accessible with minor issues.',
  };
  if (score >= 50) return {
    label: 'Fair',
    color: '#facc15',
    textColor: 'text-yellow-300',
    description: 'Significant improvements are needed.',
  };
  if (score >= 30) return {
    label: 'Poor',
    color: '#fb923c',
    textColor: 'text-orange-300',
    description: 'This site has serious accessibility barriers.',
  };
  return {
    label: 'Critical',
    color: '#f87171',
    textColor: 'text-red-300',
    description: 'This site is largely inaccessible.',
  };
}

/** Formats an ISO date string into a human-readable format */
export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch {
    return iso;
  }
}

/** Validates a URL string */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
