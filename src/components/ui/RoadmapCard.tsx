// ── RoadmapCard ──────────────────────────────────────────────
// Signals that the product is alive, growing, and opinionated
// about where it's heading. Creates a reason to return.
// Placed near methodology or footer — never interrupts data flow.

import { ArrowRight } from 'lucide-react';

const ROADMAP_ITEMS = [
  'Trust score history and trend tracking',
  'Issuer event alerts and monitoring',
  'Coverage expansion — additional tokenized gold products',
  'Methodology whitepaper (PDF download)',
  'Downloadable trust snapshots and audit reports',
];

export default function RoadmapCard() {
  return (
    <div className="border border-[#1E3350] bg-[#132237] p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <h3 className="text-[#E8EDF2] text-[10px] font-bold uppercase tracking-widest">
            Platform Roadmap
          </h3>
          <span className="text-[10px] bg-[#2ECC71]/8 text-[#2ECC71] border border-[#2ECC71]/20 px-2 py-0.5 font-semibold tracking-wider uppercase">
            In Progress
          </span>
        </div>
        <span className="text-[10px] text-[#6B7E94] uppercase tracking-wider">
          Coverage Expanding
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-8">
        {ROADMAP_ITEMS.map((item) => (
          <div key={item} className="flex items-start gap-2 text-xs text-[#6B7E94]">
            <ArrowRight size={10} className="text-[#C9A84C] mt-0.5 shrink-0" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
