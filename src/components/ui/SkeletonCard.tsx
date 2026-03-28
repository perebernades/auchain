// ── SkeletonCard ──────────────────────────────────────────────
// Animated loading placeholder matching the TokenOverviewCard layout.

interface SkeletonCardProps {
  lines?: number;
  className?: string;
}

function SkeletonLine({ width = 'w-full', height = 'h-4' }: { width?: string; height?: string }) {
  return (
    <div className={`${width} ${height} bg-[#1E3350] animate-pulse`} />
  );
}

export function SkeletonTokenCard() {
  return (
    <div className="bg-[#132237] border border-[#1E3350] p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SkeletonLine width="w-28" height="h-6" />
          <SkeletonLine width="w-16" height="h-5" />
        </div>
        <SkeletonLine width="w-20" height="h-6" />
      </div>
      {/* Price */}
      <div className="flex items-end gap-3">
        <SkeletonLine width="w-32" height="h-9" />
        <SkeletonLine width="w-16" height="h-5" />
      </div>
      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <SkeletonLine width="w-20" height="h-3" />
            <SkeletonLine width="w-28" height="h-4" />
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#1E3350]">
        <SkeletonLine width="w-32" height="h-3" />
        <SkeletonLine width="w-24" height="h-3" />
      </div>
    </div>
  );
}

export function SkeletonChart({ height = 'h-64' }: { height?: string }) {
  return (
    <div className={`${height} bg-[#132237] border border-[#1E3350] animate-pulse flex items-center justify-center`}>
      <span className="text-[#1E3350] text-xs font-mono">Loading chart data...</span>
    </div>
  );
}

export default function SkeletonCard({ lines = 3, className = '' }: SkeletonCardProps) {
  return (
    <div className={`bg-[#132237] border border-[#1E3350] p-5 flex flex-col gap-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine
          key={i}
          width={i === 0 ? 'w-2/3' : i % 3 === 0 ? 'w-1/2' : 'w-full'}
          height={i === 0 ? 'h-5' : 'h-4'}
        />
      ))}
    </div>
  );
}
