// Types for the AccessMind AI accessibility audit API responses

export type ImpactLevel = 'critical' | 'serious' | 'moderate' | 'minor';

/** A single accessibility issue returned by the backend */
export interface AuditIssue {
  id: string;
  title: string;
  description: string;
  impact: ImpactLevel;
  wcagCriteria: string;
  element: string;
  html: string;
  helpUrl: string;
  simpleExplanation: string;
  suggestedFix: string;
  aiEnhanced: boolean;
}

/** Summary counts for passed/failed/etc. */
export interface AuditSummary {
  passed: number;
  failed: number;
  needsReview: number;
  notApplicable: number;
}

/** Full audit report returned by POST /api/audit/url */
export interface AuditReport {
  success: boolean;
  aiEnabled: boolean;
  url: string;
  scannedAt: string;
  score: number;
  totalIssues: number;
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
  summary: AuditSummary;
  aiSummary: string;
  issues: AuditIssue[];
}

/** Health check response */
export interface HealthResponse {
  success: boolean;
  status: string;
  message: string;
}
