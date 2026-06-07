import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AccessMind AI — Accessibility Auditing Platform',
  description:
    'AI-powered accessibility auditing. Scan websites for accessibility issues and get smart fix suggestions powered by AI.',
  keywords: ['accessibility', 'WCAG', 'a11y', 'audit', 'AI', 'web accessibility'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Fonts loaded via link tag so they resolve at runtime in the browser */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="font-body bg-[#080c10] text-slate-100 antialiased overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
