'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Code2,
  Lightbulb,
  AlertTriangle,
  Info,
  Wrench,
} from 'lucide-react';
import type { AuditIssue } from '@/types/audit';
import { getImpactColors, cn } from '@/lib/utils';

interface IssueCardProps {
  issue: AuditIssue;
  index: number;
}

/** Renders a single accessibility issue with expandable details */
export default function IssueCard({ issue, index }: IssueCardProps) {
  const [expanded, setExpanded] = useState(false);
  const colors = getImpactColors(issue.impact);

  const impactLabel = issue.impact.charAt(0).toUpperCase() + issue.impact.slice(1);

  return (
    <article
      className={cn(
        'group glass rounded-2xl border overflow-hidden transition-all duration-300',
        colors.border,
        'hover:shadow-card-hover',
        expanded ? 'shadow-card-hover' : 'shadow-card'
      )}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Card header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors duration-200"
        aria-expanded={expanded}
        aria-controls={`issue-details-${issue.id}-${index}`}
      >
        {/* Impact dot */}
        <div className="mt-1 flex-shrink-0">
          <span className={cn('w-3 h-3 rounded-full inline-block', colors.dot)} />
        </div>

        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h3 className="font-display font-semibold text-white text-sm">{issue.title}</h3>
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-[11px] font-mono font-medium border',
                colors.badge
              )}
            >
              {impactLabel}
            </span>
            {issue.wcagCriteria && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-white/05 border border-white/10 text-slate-400">
                {issue.wcagCriteria}
              </span>
            )}
          </div>

          {/* Simple explanation preview */}
          <p className="text-slate-400 text-sm font-body leading-relaxed line-clamp-2">
            {issue.simpleExplanation}
          </p>

          {/* Element selector */}
          {issue.element && (
            <div className="mt-2 flex items-center gap-1.5">
              <Code2 className="w-3 h-3 text-slate-500" />
              <code className="font-mono text-[11px] text-slate-500 truncate max-w-[300px]">
                {issue.element}
              </code>
            </div>
          )}
        </div>

        {/* Expand icon */}
        <div className="flex-shrink-0 ml-2 mt-1">
          {expanded
            ? <ChevronUp className="w-4 h-4 text-slate-500" />
            : <ChevronDown className="w-4 h-4 text-slate-500" />
          }
        </div>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div
          id={`issue-details-${issue.id}-${index}`}
          className="px-5 pb-5 space-y-4 border-t border-white/[0.05]"
        >
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plain explanation */}
            <div className={cn('rounded-xl p-4 border', colors.bg, colors.border)}>
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-slate-400" />
                <span className="font-display font-semibold text-slate-300 text-xs uppercase tracking-wider">
                  What this means
                </span>
              </div>
              <p className="text-slate-300 text-sm font-body leading-relaxed">
                {issue.simpleExplanation}
              </p>
            </div>

            {/* Suggested fix */}
            <div className="rounded-xl p-4 bg-brand-950/30 border border-brand-800/40">
              <div className="flex items-center gap-2 mb-2">
                <Wrench className="w-4 h-4 text-brand-400" />
                <span className="font-display font-semibold text-brand-300 text-xs uppercase tracking-wider">
                  How to fix it
                </span>
              </div>
              <p className="text-slate-300 text-sm font-body leading-relaxed">
                {issue.suggestedFix}
              </p>
            </div>
          </div>

          {/* HTML snippet */}
          {issue.html && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Code2 className="w-4 h-4 text-slate-500" />
                <span className="font-display font-semibold text-slate-400 text-xs uppercase tracking-wider">
                  Affected HTML
                </span>
              </div>
              <pre className="code-block text-slate-300 overflow-x-auto">
                <code>{issue.html}</code>
              </pre>
            </div>
          )}

          {/* Learn more link */}
          {issue.helpUrl && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
                <span className="text-slate-500 text-xs font-body">
                  {issue.aiEnhanced ? 'AI-enhanced explanation' : 'Standard explanation'}
                </span>
              </div>
              <a
                href={issue.helpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 text-xs font-body
                           font-medium transition-colors duration-200 group/link"
              >
                Learn more
                <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
