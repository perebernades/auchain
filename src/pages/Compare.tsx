import { CheckCircle2, AlertTriangle, XCircle, Check } from 'lucide-react';
import { COMPARE_ROWS, type CellStatus } from '../data/staticData';

// ── Status icon ───────────────────────────────────────────────
function StatusIcon({ status }: { status: CellStatus }) {
  switch (status) {
    case 'green':
      return <CheckCircle2 size={13} className="text-[#2ECC71] shrink-0" />;
    case 'amber':
      return <AlertTriangle size={13} className="text-[#F39C12] shrink-0" />;
    case 'red':
      return <XCircle size={13} className="text-[#E74C3C] shrink-0" />;
    default:
      return null;
  }
}

function cellTextColor(status: CellStatus): string {
  switch (status) {
    case 'green':  return 'text-[#2ECC71]';
    case 'amber':  return 'text-[#F39C12]';
    case 'red':    return 'text-[#E74C3C]';
    default:       return 'text-[#E8EDF2]';
  }
}

// ── Verdict Card ──────────────────────────────────────────────
interface VerdictCardProps {
  title: string;
  items?: string[];
  body?: string;
  variant?: 'green' | 'gold' | 'amber' | 'muted';
}

function VerdictCard({ title, items, body, variant = 'muted' }: VerdictCardProps) {
  const accentColors: Record<string, string> = {
    green: 'border-[#2ECC71]/25 bg-[#2ECC71]/5',
    gold: 'border-[#C9A84C]/25 bg-[#C9A84C]/5',
    amber: 'border-[#F39C12]/25 bg-[#F39C12]/5',
    muted: 'border-[#1E3350] bg-[#132237]',
  };

  const titleColors: Record<string, string> = {
    green: 'text-[#2ECC71]',
    gold: 'text-[#C9A84C]',
    amber: 'text-[#F39C12]',
    muted: 'text-[#E8EDF2]',
  };

  return (
    <div className={`border p-5 ${accentColors[variant]}`}>
      <h3 className={`font-bold text-sm mb-3 ${titleColors[variant]}`}>{title}</h3>
      {items && (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#E8EDF2]">
              <Check size={13} className={`mt-0.5 shrink-0 ${titleColors[variant]}`} />
              {item}
            </li>
          ))}
        </ul>
      )}
      {body && <p className="text-sm text-[#E8EDF2] leading-relaxed">{body}</p>}
    </div>
  );
}

// ── Comparison Table ──────────────────────────────────────────
function ComparisonTable() {
  const columns = ['PAXG', 'XAUT', 'GLD (SPDR)', 'IAU (iShares)'] as const;
  const colKeys = ['paxg', 'xaut', 'gld', 'iau'] as const;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse min-w-[640px]">
        <thead>
          <tr className="border-b-2 border-[#1E3350]">
            <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-[#6B7E94] w-40">
              Dimension
            </th>
            {columns.map((col, i) => (
              <th
                key={col}
                className={`text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest ${
                  i < 2 ? 'text-[#C9A84C]' : 'text-[#6B7E94]'
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row, rowIdx) => (
            <tr
              key={row.dimension}
              className={`border-b border-[#1E3350] transition-colors hover:bg-[#1E3350]/20 ${
                rowIdx % 2 === 0 ? 'bg-[#0D1B2A]/30' : ''
              }`}
            >
              <td className="py-3 px-4 text-[#6B7E94] text-xs font-medium whitespace-nowrap">
                {row.dimension}
                {row.note && (
                  <span className="block text-[10px] text-[#6B7E94]/60 mt-0.5">{row.note}</span>
                )}
              </td>
              {colKeys.map((key) => {
                const cell = row[key];
                const isBest = cell.best;
                return (
                  <td
                    key={key}
                    className={`py-3 px-4 ${isBest ? 'bg-[#C9A84C]/8' : ''}`}
                  >
                    <span className={`flex items-center gap-1.5 font-medium text-xs ${cellTextColor(cell.status)}`}>
                      <StatusIcon status={cell.status} />
                      {cell.value}
                      {isBest && (
                        <span className="text-[9px] bg-[#C9A84C]/15 text-[#C9A84C] border border-[#C9A84C]/25 px-1 py-0.5 font-bold tracking-wider uppercase">
                          Best
                        </span>
                      )}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 border-t border-[#1E3350] bg-[#0D1B2A]/30">
        <p className="text-[10px] text-[#6B7E94]">
          * Gas fees apply for PAXG/XAUT on-chain transfers. · All data static as of Q1 2026.
          AUM/volume figures are approximate. ETF data reflects public filings.
        </p>
      </div>
    </div>
  );
}

// ── Compare Page ──────────────────────────────────────────────
export default function Compare() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#E8EDF2] tracking-tight">
          Tokenized Gold vs ETFs
        </h1>
        <p className="text-[#6B7E94] text-sm mt-1 max-w-3xl">
          The only side-by-side comparison of tokenized gold and traditional gold ETFs
          across liquidity, transparency, custody, and cost.
        </p>
      </div>

      {/* Section A — Comparison Table */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">
            A — Full Comparison Matrix
          </h2>
          <span className="text-[10px] bg-[#F39C12]/10 text-[#F39C12] border border-[#F39C12]/25 px-2 py-0.5 font-semibold tracking-wider uppercase">
            Static Data
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-3">
          {[
            { color: 'text-[#2ECC71]', icon: <CheckCircle2 size={12} />, label: 'Positive / Best' },
            { color: 'text-[#F39C12]', icon: <AlertTriangle size={12} />, label: 'Caution' },
            { color: 'text-[#E74C3C]', icon: <XCircle size={12} />, label: 'Risk / Worst' },
          ].map(({ color, icon, label }) => (
            <div key={label} className={`flex items-center gap-1.5 text-xs ${color}`}>
              {icon}
              <span className="text-[#6B7E94]">{label}</span>
            </div>
          ))}
        </div>

        <div className="bg-[#132237] border border-[#1E3350]">
          <ComparisonTable />
        </div>
      </section>

      {/* Section B — Verdict Cards */}
      <section>
        <div className="mb-4">
          <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">
            B — Verdict
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <VerdictCard
            title="Where Tokenized Gold Wins"
            variant="green"
            items={[
              'On-chain supply verifiable in real time',
              '24/7 global trading on any timezone',
              'Zero annual management fee',
              'Faster audit cycle (PAXG: monthly)',
            ]}
          />
          <VerdictCard
            title="Where ETFs Still Win"
            variant="amber"
            items={[
              'Liquidity: 200–500× higher daily volume',
              'Institutional infrastructure: clearing, prime brokerage',
              'Redemption: no minimum for retail (via market)',
              'Regulatory clarity: SEC oversight vs Cayman',
            ]}
          />
          <VerdictCard
            title="The Bottom Line"
            variant="gold"
            body="Tokenized gold improves transparency at the token layer. ETFs win on liquidity and adoption infrastructure. The technology gap is closing; the trust gap is what AuChain measures."
          />
          <VerdictCard
            title="Why This Comparison Matters"
            variant="muted"
            body="No standardized framework exists to evaluate tokenized gold against traditional products. AuChain is the first platform to publish a methodology-driven benchmark. Cite us."
          />
        </div>
      </section>

      {/* Tokenized gold metrics summary */}
      <section>
        <div className="mb-4">
          <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">
            C — Quick Reference
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[#1E3350]">
          {[
            { label: 'Combined Tokenized AUM', value: '~$1.1B', sub: 'PAXG + XAUT' },
            { label: 'vs. GLD + IAU', value: '~$110B', sub: 'Traditional ETFs' },
            { label: 'Tokenized Market Share', value: '~1%', sub: 'Of paper gold market' },
            { label: 'AuChain Coverage', value: '2 tokens', sub: 'Expanding in v2' },
          ].map(({ label, value, sub }, i) => (
            <div
              key={label}
              className={`px-5 py-4 bg-[#132237] ${i < 3 ? 'border-r border-[#1E3350]' : ''}`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7E94] mb-1.5">
                {label}
              </p>
              <p className="text-[#C9A84C] font-bold text-xl font-mono">{value}</p>
              <p className="text-[#6B7E94] text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
