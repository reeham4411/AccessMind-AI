import Link from 'next/link';
import { ArrowLeft, Scan } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import BackgroundBlobs from '@/components/ui/BackgroundBlobs';

export default function NotFound() {
  return (
    <>
      <BackgroundBlobs variant="default" />
      <Navbar />
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-6">
          <div className="font-display font-extrabold text-[120px] leading-none gradient-text opacity-30">
            404
          </div>
          <h1 className="font-display font-extrabold text-3xl text-white">Page not found</h1>
          <p className="font-body text-slate-400 max-w-sm mx-auto">
            This page doesn&apos;t exist or has been moved.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link href="/" className="btn-ghost">
              <ArrowLeft className="w-4 h-4" />
              Go Home
            </Link>
            <Link href="/audit" className="btn-primary">
              <Scan className="w-4 h-4" />
              Start Audit
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
