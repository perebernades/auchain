// ── ScoreBadge ────────────────────────────────────────────────
// Reusable colored badge for statuses, scores, and ratings.

interface ScoreBadgeProps {
  variant: 'green' | 'amber' | 'red' | 'gold' | 'neutral';
  children: React.ReactNode;
  size?: 'sm' | 'md';
  icon?: string;
}

const VARIANT_STYLES = {
  green: 'bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/25',
  amber: 'bg-[#F39C12]/10 text-[#F39C12] border border-[#F39C12]/25',
  red:   'bg-[#E74C3C]/10 text-[#E74C3C] border border-[#E74C3C]/25',
  gold:  'bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/25',
  neutral: 'bg-[#6B7E94]/10 text-[#6B7E94] border border-[#6B7E94]/25',
};

const SIZE_STYLES = {
  sm: 'text-[10px] px-1.5 py-0.5 font-semibold tracking-wide',
  md: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
};

export default function ScoreBadge({
  variant,
  children,
  size = 'md',
  icon,
}: ScoreBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 uppercase ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}
