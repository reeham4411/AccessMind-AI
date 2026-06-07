import type { AuditReport, HealthResponse } from '@/types/audit';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/** Check if the backend is running */
export async function checkHealth(): Promise<HealthResponse> {
  const res = await fetch(`${BASE_URL}/api/health`);
  if (!res.ok) throw new Error('Backend health check failed');
  return res.json();
}

/** Run an accessibility audit for a given URL */
export async function runAudit(url: string): Promise<AuditReport> {
  const res = await fetch(`${BASE_URL}/api/audit/url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || data.error || 'Audit failed. Please try again.');
  }

  return data as AuditReport;
}
