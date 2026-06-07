import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number;
  color: string; // Tailwind color class e.g. 'text-red-400'
  bg: string;    // e.g. 'bg-red-950/40'
  border: string; // e.g. 'border-red-800/40'
  icon?: React.ReactNode;
}

/** A small stat card for issue count breakdown */
export default function StatCard({ label, value, color, bg, border, icon }: StatCardProps) {
  return (
    <div className={cn('glass rounded-xl border p-4 flex flex-col items-center gap-1.5 text-center', bg, border)}>
      {icon && <span className={cn('mb-1', color)}>{icon}</span>}
      <span className={cn('font-display font-extrabold text-3xl', color)}>{value}</span>
      <span className="font-body text-slate-400 text-xs">{label}</span>
    </div>
  );
}
