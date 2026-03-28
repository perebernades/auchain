import { CheckCircle2, AlertTriangle, XCircle, Check, Share2, BookOpen, MessageSquare } from 'lucide-react';
import { COMPARE_ROWS, type CellStatus } from '../data/staticData';
import InsightBanner from '../components/ui/InsightBanner';
import InterpretationNote from '../components/ui/InterpretationNote';
import ActionRow from '../components/ui/ActionRow';

// ── Status icon ───────────────────────────────────────────────
function StatusIcon({ status }: { status: CellStatus }) {
  switch (status) {
    case 'green': return <CheckCircle2 size={13} className="text-[#2ECC71] shrink-0" />;
    case 'amber': return <AlertTriangle size={13} className="text-[#F39C12] shrink-0" />;
    case 'red':   return <XCircle size={13} className="text-[#E74C3C] shrink-0" />;
    default:      return null;
  }
}

function cellTextColor(status: CellStatus): string {
  switch (status) {
    case 'green':   return 'text-[#2ECC71]';
    case 'amber':   return 'text-[#F39C12]';
    case 'red':     return 'text-[#E74C3C]';
    default:        return 'text-[#E8EDF2]';
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
    gold:  'border-[#C9A84C]/25 bg-[#C9A84C]/5',
    amber: 'border-[#F39C12]/25 bg-[#F39C12]/5',
    muted: 'border-[#1E3350] bg-[#132237]',
  };

  const titleColors: Record<string, string> = {
    green: 'text-[#2ECC71]',
    gold:  'text-[#C9A84C]',
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
                  <td key={key} className={`py-3 px-4 ${isBest ? 'bg-[#C9A84C]/8' : ''}`}>
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
          * Gas fees apply for PAXG/XAUT on-chain transfers. ·
          Trust inputs based on public filings and issuer disclosures as of Q1 2026. ·
          AUM and volume figures are approximate. ETF data reflects public SEC filings.
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
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
            Benchmark Analysis
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#E8EDF2] tracking-tight">
          Tokenized Gold vs ETFs
        </h1>
        <p className="text-[#6B7E94] text-sm mt-1 max-w-3xl leading-relaxed">
          The first methodology-driven comparison of tokenized gold and traditional gold ETFs
          across liquidity, transparency, custody, cost structure, and trust profile.
        </p>
      </div>

      {/* Key Insight */}
      <InsightBanner>
        Tokenized gold improves transparency and enables 24/7 transferability, but ETFs
        still dominate on liquidity, institutional infrastructure, and accessibility. The
        comparison is not about replacement — it shows where trust infrastructure is
        improving fastest.
      </InsightBanner>

      {/* Section A — Full Comparison Matrix */}
      <section>
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">
            A — Full Comparison Matrix
          </h2>
          <span className="text-[10px] bg-[#F39C12]/10 text-[#F39C12] border border-[#F39C12]/25 px-2 py-0.5 font-semibold tracking-wider uppercase">
            As of Q1 2026
          </span>
          <span className="text-[10px] bg-[#1E3350] text-[#6B7E94] border border-[#1E3350] px-2 py-0.5 font-semibold tracking-wider uppercase">
            Public-input benchmark
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-3 flex-wrap">
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
        <InterpretationNote>
          The AuChain Trust Score row is the only metric in this table that is not directly
          available elsewhere. It synthesizes 7 trust dimensions into a single comparable
          benchmark — a signal ETFs are not yet evaluated against.
        </InterpretationNote>
      </section>

      {/* Section B — Verdict */}
      <section>
        <div className="mb-4">
          <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">
            B — Verdict
          </h2>
          <p className="text-[#6B7E94] text-xs mt-1">
            Where each structure wins — and why the gap still matters.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <VerdictCard
            title="Where Tokenized Gold Leads"
            variant="green"
            items={[
              'On-chain supply verifiable in real time — no disclosure lag',
              '24/7 global trading across any timezone or jurisdiction',
              'Zero annual management fee (gas fees apply on-chain)',
              'Faster attestation cycle: PAXG monthly vs ETF annual',
            ]}
          />
          <VerdictCard
            title="Where ETFs Maintain the Advantage"
            variant="amber"
            items={[
              'Liquidity: 200–500× higher daily volume than tokenized peers',
              'Institutional infrastructure: clearing, prime brokerage, lending',
              'Redemption: no minimum for retail investors (via open market)',
              'Regulatory certainty: SEC framework vs Cayman or NYDFS',
            ]}
          />
          <VerdictCard
            title="The Bottom Line"
            variant="gold"
            body="Tokenized gold improves transparency at the token layer. ETFs win on liquidity and adoption infrastructure. The technology gap is closing; the trust infrastructure gap is what AuChain measures — and what will determine long-term institutional adoption."
          />
          <VerdictCard
            title="Why This Comparison Matters"
            variant="muted"
            body="No standardized framework existed to evaluate tokenized gold against traditional products across the same trust dimensions. AuChain publishes the first methodology-driven benchmark. The comparison is designed to be repeatable and to evolve as the market matures."
          />
        </div>
        <InterpretationNote>
          This comparison is not a verdict on whether tokenized gold should replace ETFs.
          It maps where trust infrastructure is strongest today — and where it has the
          most room to develop.
        </InterpretationNote>
      </section>

      {/* Section C — Quick Reference */}
      <section>
        <div className="mb-4">
          <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">
            C — Market Context
          </h2>
          <p className="text-[#6B7E94] text-xs mt-1">
            Scale of the tokenized gold market relative to traditional paper gold.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[#1E3350]">
          {[
            { label: 'Combined Tokenized AUM', value: '~$1.1B', sub: 'PAXG + XAUT combined' },
            { label: 'vs. GLD + IAU', value: '~$110B', sub: 'Traditional gold ETFs' },
            { label: 'Tokenized Market Share', value: '~1%', sub: 'Of total paper gold market' },
            { label: 'AuChain Coverage', value: '2 tokens', sub: 'Expanding in next version' },
          ].map(({ label, value, sub }, i) => (
            <div
              key={label}
              className={`px-5 py-4 bg-[#132237] ${i < 3 ? 'border-r border-[#1E3350]' : ''}`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7E94] mb-1.5">{label}</p>
              <p className="text-[#C9A84C] font-bold text-xl font-mono">{value}</p>
              <p className="text-[#6B7E94] text-xs mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Distribution / Sharing */}
      <div className="pt-4 border-t border-[#1E3350] flex items-center justify-between flex-wrap gap-4">
        <p className="text-[#6B7E94] text-xs">
          AuChain · First methodology-driven benchmark for tokenized gold
        </p>
        <ActionRow
          actions={[
            {
              label: 'Share Comparison',
              icon: <Share2 size={10} />,
              onClick: () => { navigator.clipboard?.writeText(window.location.href); },
              activatedLabel: 'Link Copied',
            },
            {
              label: 'Cite Methodology',
              icon: <BookOpen size={10} />,
              onClick: () => {
                navigator.clipboard?.writeText(
                  'AuChain (2026). Tokenized Gold vs ETFs — Methodology-Driven Benchmark. auchain.vercel.app/compare'
                );
              },
              activatedLabel: 'Citation Copied',
            },
            {
              label: 'Request Coverage',
              icon: <MessageSquare size={10} />,
              comingSoon: true,
            },
          ]}
        />
      </div>
    </div>
  );
}
