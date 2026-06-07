"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Scan,
  ArrowRight,
  AlertCircle,
  ExternalLink,
  Download,
  RotateCcw,
  CheckCircle2,
  Globe2,
  Clock,
  ChevronLeft,
  Filter,
  SortAsc,
  Sparkles,
  FileText,
  FileJson,
  Volume2,
  Square,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundBlobs from "@/components/ui/BackgroundBlobs";
import ScanLoader from "@/components/ui/ScanLoader";
import ScoreRing from "@/components/ui/ScoreRing";
import StatCard from "@/components/ui/StatCard";
import IssueCard from "@/components/ui/IssueCard";
import { runAudit } from "@/lib/api";
import { downloadReportJSON, downloadReportTXT } from "@/lib/download";
import { isValidUrl, formatDate, getScoreInfo, cn } from "@/lib/utils";
import type { AuditReport, ImpactLevel } from "@/types/audit";

type PageState = "idle" | "scanning" | "results" | "error";

const FILTER_OPTIONS: { label: string; value: ImpactLevel | "all" }[] = [
  { label: "All Issues", value: "all" },
  { label: "Critical", value: "critical" },
  { label: "Serious", value: "serious" },
  { label: "Moderate", value: "moderate" },
  { label: "Minor", value: "minor" },
];

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [pageState, setPageState] = useState<PageState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [report, setReport] = useState<AuditReport | null>(null);
  const [activeFilter, setActiveFilter] = useState<ImpactLevel | "all">("all");
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  /* ── Handlers ────────────────────────────────────────────────────────────── */
  function stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }

  function handleSpeakSummary() {
    if (!report?.aiSummary) return;

    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      stopSpeaking();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(report.aiSummary);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }
  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
    if (urlError) setUrlError("");
  }

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    stopSpeaking();

    // Validate URL
    const trimmed = url.trim();
    if (!trimmed) {
      setUrlError("Please enter a URL to scan.");
      inputRef.current?.focus();
      return;
    }

    // Auto-prepend https if missing
    const fullUrl = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    if (!isValidUrl(fullUrl)) {
      setUrlError("Please enter a valid URL (e.g. https://example.com).");
      return;
    }

    setUrl(fullUrl);
    setPageState("scanning");
    setReport(null);
    setErrorMessage("");
    setActiveFilter("all");

    try {
      const data = await runAudit(fullUrl);
      setReport(data);
      setPageState("results");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
      setPageState("error");
    }
  }

  function handleReset() {
    setPageState("idle");
    setReport(null);
    setUrl("");
    setUrlError("");
    setErrorMessage("");
    setTimeout(() => inputRef.current?.focus(), 100);
    stopSpeaking();
  }

  /* ── Derived state ───────────────────────────────────────────────────────── */

  const filteredIssues =
    report?.issues.filter(
      (i) => activeFilter === "all" || i.impact === activeFilter,
    ) ?? [];

  const scoreInfo = report ? getScoreInfo(report.score) : null;
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);
  /* ── Render ──────────────────────────────────────────────────────────────── */

  return (
    <>
      <BackgroundBlobs variant="audit" />
      <Navbar />

      <main className="relative z-10 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* ── URL Input Form (always visible unless scanning) ─────────────── */}
          {pageState !== "scanning" && (
            <div className="mb-10">
              <div className="text-center mb-8">
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-3">
                  {pageState === "results"
                    ? "Audit Results"
                    : "Accessibility Audit"}
                </h1>
                <p className="font-body text-slate-400 text-lg">
                  {pageState === "results"
                    ? "Here's your full accessibility report."
                    : "Enter any website URL to get an instant AI-powered accessibility report."}
                </p>
              </div>

              {/* URL form */}
              <form onSubmit={handleScan} noValidate>
                <div
                  className={cn(
                    "glass rounded-2xl border transition-all duration-300 overflow-hidden",
                    urlError
                      ? "border-red-500/50"
                      : "border-white/[0.08] focus-within:border-brand-500/50",
                  )}
                  style={urlError ? {} : { boxShadow: "none" }}
                >
                  <div className="flex items-center gap-3 px-5 py-4">
                    <Globe2 className="w-5 h-5 text-slate-500 flex-shrink-0" />
                    <input
                      ref={inputRef}
                      type="url"
                      value={url}
                      onChange={handleUrlChange}
                      placeholder="https://example.com"
                      className="url-input flex-1 text-base"
                      aria-label="Website URL to audit"
                      aria-describedby={urlError ? "url-error" : undefined}
                      aria-invalid={!!urlError}
                      autoComplete="url"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="btn-primary flex-shrink-0 px-5 py-2.5"
                      disabled={false}
                    >
                      <Scan className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {pageState === "results" ? "Re-scan" : "Scan"}
                      </span>
                    </button>
                  </div>
                </div>
                {urlError && (
                  <p
                    id="url-error"
                    role="alert"
                    className="mt-2 text-red-400 text-sm font-body flex items-center gap-1.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    {urlError}
                  </p>
                )}
              </form>
            </div>
          )}

          {/* ── Error State ─────────────────────────────────────────────────── */}
          {pageState === "error" && (
            <div
              className="glass rounded-2xl border border-red-800/40 bg-red-950/20 p-10 text-center space-y-5"
              role="alert"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-900/30 border border-red-700/40 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h2 className="font-display font-bold text-white text-xl mb-2">
                  Audit Failed
                </h2>
                <p className="text-slate-400 font-body text-sm max-w-md mx-auto">
                  {errorMessage}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleScan as unknown as React.MouseEventHandler}
                  className="btn-primary"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
                <button onClick={handleReset} className="btn-ghost">
                  <ChevronLeft className="w-4 h-4" />
                  New Scan
                </button>
              </div>
              <p className="text-slate-600 text-xs font-body">
                Make sure the backend is running at{" "}
                <code className="font-mono text-slate-500">
                  {process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}
                </code>
              </p>
            </div>
          )}

          {/* ── Scanning State ──────────────────────────────────────────────── */}
          {pageState === "scanning" && (
            <div className="glass rounded-2xl border border-white/[0.08]">
              <ScanLoader url={url} />
            </div>
          )}

          {/* ── Results ─────────────────────────────────────────────────────── */}
          {pageState === "results" && report && (
            <div className="space-y-8 animate-fade-in">
              {/* Score overview card */}
              <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Score ring */}
                  <div className="flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/[0.06]">
                    <ScoreRing score={report.score} size={180} />
                    <p className="mt-3 font-body text-slate-400 text-sm text-center max-w-[160px]">
                      {scoreInfo?.description}
                    </p>
                  </div>

                  {/* Meta info */}
                  <div className="md:col-span-2 p-8 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Globe2 className="w-4 h-4 text-slate-500" />
                        <span className="font-body text-slate-400 text-xs uppercase tracking-wider">
                          Audited URL
                        </span>
                      </div>
                      <a
                        href={report.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-brand-400 hover:text-brand-300 text-sm flex items-center gap-1.5 break-all group transition-colors"
                      >
                        {report.url}
                        <ExternalLink className="w-3 h-3 flex-shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 text-sm font-body">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Scanned {formatDate(report.scannedAt)}</span>
                    </div>

                    {/* Issue count breakdown */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      <StatCard
                        label="Critical"
                        value={report.critical}
                        color="text-red-300"
                        bg="bg-red-950/40"
                        border="border-red-800/40"
                      />
                      <StatCard
                        label="Serious"
                        value={report.serious}
                        color="text-orange-300"
                        bg="bg-orange-950/40"
                        border="border-orange-800/40"
                      />
                      <StatCard
                        label="Moderate"
                        value={report.moderate}
                        color="text-yellow-300"
                        bg="bg-yellow-950/40"
                        border="border-yellow-800/40"
                      />
                      <StatCard
                        label="Minor"
                        value={report.minor}
                        color="text-blue-300"
                        bg="bg-blue-950/40"
                        border="border-blue-800/40"
                      />
                    </div>

                    {/* Audit summary */}
                    {report.summary && (
                      <div className="flex flex-wrap gap-3 pt-1 text-xs font-mono">
                        {[
                          {
                            label: "Passed",
                            value: report.summary.passed,
                            color: "text-brand-400",
                          },
                          {
                            label: "Failed",
                            value: report.summary.failed,
                            color: "text-red-400",
                          },
                          {
                            label: "Review",
                            value: report.summary.needsReview,
                            color: "text-yellow-400",
                          },
                          {
                            label: "N/A",
                            value: report.summary.notApplicable,
                            color: "text-slate-500",
                          },
                        ].map((s) => (
                          <span
                            key={s.label}
                            className="flex items-center gap-1"
                          >
                            <span className={s.color}>{s.value}</span>
                            <span className="text-slate-600">{s.label}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* AI Summary */}
              {report.aiSummary && (
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-brand-400" />
                    </div>
                    <h2 className="font-display font-bold text-brand-300 text-base">
                      AI Summary
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleSpeakSummary}
                    disabled={!report.aiSummary}
                    className="btn-ghost text-xs px-3 py-2"
                    aria-label={
                      isSpeaking
                        ? "Stop reading AI summary"
                        : "Read AI summary aloud"
                    }
                  >
                    {isSpeaking ? (
                      <>
                        <Square className="w-3.5 h-3.5" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5" />
                        Listen
                      </>
                    )}
                  </button>
                  <p className="font-body text-slate-300 leading-relaxed">
                    {report.aiSummary}
                  </p>
                </div>
              )}

              {/* Issues section */}
              <div>
                {/* Issues header + filter + download */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <h2 className="font-display font-bold text-white text-xl">
                    Issues{" "}
                    <span className="text-slate-500 font-normal text-base">
                      ({report.totalIssues})
                    </span>
                  </h2>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Filter chips */}
                    <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1">
                      {FILTER_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setActiveFilter(opt.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200",
                            activeFilter === opt.value
                              ? "bg-brand-500/20 text-brand-300 border border-brand-500/30"
                              : "text-slate-500 hover:text-slate-300",
                          )}
                        >
                          {opt.label}
                          {opt.value !== "all" && (
                            <span className="ml-1 opacity-60">
                              ({report[opt.value as ImpactLevel]})
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Download button */}
                    <div className="relative">
                      <button
                        onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                        className="btn-ghost text-xs px-3 py-2"
                        aria-haspopup="true"
                        aria-expanded={showDownloadMenu}
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                      {showDownloadMenu && (
                        <div className="absolute right-0 top-full mt-2 glass rounded-xl border border-white/[0.08] shadow-card overflow-hidden z-20 w-44">
                          <button
                            onClick={() => {
                              downloadReportJSON(report);
                              setShowDownloadMenu(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/05 text-xs font-body transition-colors"
                          >
                            <FileJson className="w-3.5 h-3.5 text-brand-400" />
                            Download JSON
                          </button>
                          <button
                            onClick={() => {
                              downloadReportTXT(report);
                              setShowDownloadMenu(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/05 text-xs font-body transition-colors border-t border-white/[0.05]"
                          >
                            <FileText className="w-3.5 h-3.5 text-brand-400" />
                            Download TXT
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Success state (no/few issues) */}
                {report.totalIssues === 0 && (
                  <div className="glass rounded-2xl border border-brand-800/30 p-10 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-brand-400 mx-auto" />
                    <h3 className="font-display font-bold text-white text-lg">
                      Outstanding Accessibility!
                    </h3>
                    <p className="font-body text-slate-400">
                      No issues detected. This website is highly accessible.
                    </p>
                  </div>
                )}

                {/* No results after filter */}
                {report.totalIssues > 0 && filteredIssues.length === 0 && (
                  <div className="glass rounded-2xl border border-white/[0.06] p-8 text-center">
                    <p className="text-slate-400 font-body">
                      No {activeFilter} issues found.
                    </p>
                  </div>
                )}

                {/* Issue cards grid */}
                {filteredIssues.length > 0 && (
                  <div className="space-y-3">
                    {filteredIssues.map((issue, i) => (
                      <IssueCard
                        key={`${issue.id}-${i}`}
                        issue={issue}
                        index={i}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom action bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.05]">
                <button onClick={handleReset} className="btn-ghost text-sm">
                  <ChevronLeft className="w-4 h-4" />
                  New Scan
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => downloadReportJSON(report)}
                    className="btn-ghost text-sm"
                  >
                    <FileJson className="w-4 h-4" />
                    Export JSON
                  </button>
                  <button
                    onClick={() => downloadReportTXT(report)}
                    className="btn-primary text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
