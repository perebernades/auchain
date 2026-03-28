// ── InsightBanner ────────────────────────────────────────────
// Prominent callout at the top of each page.
// States the key takeaway before the user reads any chart or table.
// Tone: analytical, direct, opinionated — not marketing.

interface InsightBannerProps {
  children: React.ReactNode;
}

export default function InsightBanner({ children }: InsightBannerProps) {
  return (
    <div className="flex items-start gap-4 border border-[#C9A84C]/20 bg-[#C9A84C]/5 px-5 py-4">
      <div className="shrink-0 pt-0.5">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C] whitespace-nowrap">
          Key Insight
        </span>
      </div>
      <div className="w-px self-stretch bg-[#C9A84C]/25 shrink-0" />
      <p className="text-[#E8EDF2] text-sm leading-relaxed">{children}</p>
    </div>
  );
}
