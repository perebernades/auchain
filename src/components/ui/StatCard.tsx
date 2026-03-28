// ── StatCard ──────────────────────────────────────────────────
// Reusable card for displaying a single labeled metric.

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export default function StatCard({
  label,
  value,
  subValue,
  accent = false,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`
        p-4 bg-[#0D1B2A] border border-[#1E3350]
        ${accent ? 'border-l-2 border-l-[#C9A84C]' : ''}
        ${className}
      `}
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7E94] mb-1.5">
        {label}
      </p>
      <div className="text-[#E8EDF2] font-semibold text-base leading-tight">
        {value}
      </div>
      {subValue && (
        <div className="mt-1 text-xs text-[#6B7E94]">{subValue}</div>
      )}
    </div>
  );
}
