import {
  TRUST_DIMENSIONS,
  TRUST_SCORES,
  TRUST_VERDICTS,
} from '../data/staticData';
import TrustRadarChart from '../components/charts/TrustRadarChart';

// ── Score color helpers ───────────────────────────────────────
function scoreBg(score: number): string {
  if (score >= 75) return 'bg-[#2ECC71]/10 border-[#2ECC71]/25 text-[#2ECC71]';
  if (score >= 50) return 'bg-[#F39C12]/10 border-[#F39C12]/25 text-[#F39C12]';
  return 'bg-[#E74C3C]/10 border-[#E74C3C]/25 text-[#E74C3C]';
}

// ── Circular Progress Ring ────────────────────────────────────
interface RingProps {
  score: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}

function CircularRing({ score, color, size = 140, strokeWidth = 7 }: RingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="#1E3350"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeDasharray={`${progress} ${circumference}`}
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
    </svg>
  );
}

// ── Score Summary Card ────────────────────────────────────────
interface ScoreCardProps {
  ticker: string;
  fullName: string;
  score: number;
  verdict: string;
  ringColor: string;
  textColor: string;
}

function ScoreCard({ ticker, fullName, score, verdict, ringColor, textColor }: ScoreCardProps) {
  return (
    <div className="bg-[#132237] border border-[#1E3350] p-6 flex flex-col items-center text-center">
      {/* Ring with score */}
      <div className="relative mb-4">
        <CircularRing score={score} color={ringColor} />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <span className={`text-3xl font-bold font-mono ${textColor}`}>{score}</span>
          <span className="text-[#6B7E94] text-xs font-medium">/ 100</span>
        </div>
      </div>

      {/* Label */}
      <div className="mb-3">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-xl font-bold text-[#E8EDF2]">{ticker}</span>
        </div>
        <span className="text-[#6B7E94] text-xs">{fullName}</span>
      </div>

      {/* Verdict */}
      <div className={`w-full px-3 py-2 text-xs border ${
        score >= 75
          ? 'bg-[#2ECC71]/5 border-[#2ECC71]/15 text-[#2ECC71]'
          : 'bg-[#F39C12]/5 border-[#F39C12]/15 text-[#F39C12]'
      }`}>
        {verdict}
      </div>

      {/* Score breakdown bar */}
      <div className="w-full mt-4">
        <div className="h-1.5 bg-[#1E3350] w-full">
          <div
            className="h-full transition-all duration-700"
            style={{ width: `${score}%`, backgroundColor: ringColor }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[#6B7E94]">0</span>
          <span className="text-[10px] text-[#6B7E94]">100</span>
        </div>
      </div>
    </div>
  );
}

// ── Breakdown Table ───────────────────────────────────────────
function BreakdownTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b-2 border-[#1E3350]">
            {['Dimension', 'PAXG Score', 'XAUT Score', 'What We Measure', 'Key Difference'].map((col) => (
              <th
                key={col}
                className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-[#6B7E94] whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TRUST_DIMENSIONS.map((dim, i) => (
            <tr
              key={dim.key}
              className={`border-b border-[#1E3350] transition-colors hover:bg-[#1E3350]/30 ${
                i % 2 === 0 ? 'bg-[#0D1B2A]/40' : ''
              }`}
            >
              <td className="py-3 px-4 font-semibold text-[#E8EDF2] whitespace-nowrap">
                {dim.label}
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold font-mono border ${scoreBg(dim.paxg)}`}>
                  {dim.paxg}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center px-2.5 py-1 text-xs font-bold font-mono border ${scoreBg(dim.xaut)}`}>
                  {dim.xaut}
                </span>
              </td>
              <td className="py-3 px-4 text-[#6B7E94] text-xs max-w-[200px]">
                {dim.whatWeMeasure}
              </td>
              <td className="py-3 px-4 text-[#E8EDF2] text-xs max-w-[240px]">
                {dim.keyDifference}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function TrustScore() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#E8EDF2] tracking-tight">Trust Score</h1>
        <p className="text-[#6B7E94] text-sm mt-1 max-w-2xl">
          Proprietary composite score across 7 trust dimensions. Methodology published openly. Updated monthly.
        </p>
      </div>

      {/* Section A — Score Cards */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">
            A — Score Summary
          </h2>
          <span className="text-[10px] bg-[#F39C12]/10 text-[#F39C12] border border-[#F39C12]/25 px-2 py-0.5 font-semibold tracking-wider uppercase">
            Static · Updated Monthly
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScoreCard
            ticker="PAXG"
            fullName="PAX Gold · Paxos"
            score={TRUST_SCORES.paxg}
            verdict={TRUST_VERDICTS.paxg}
            ringColor="#C9A84C"
            textColor="text-[#C9A84C]"
          />
          <ScoreCard
            ticker="XAUT"
            fullName="Tether Gold · Tether"
            score={TRUST_SCORES.xaut}
            verdict={TRUST_VERDICTS.xaut}
            ringColor="#F39C12"
            textColor="text-[#F39C12]"
          />
        </div>
      </section>

      {/* Section B — Radar Chart */}
      <section>
        <div className="mb-4">
          <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">
            B — Trust Dimension Radar
          </h2>
          <p className="text-[#6B7E94] text-xs mt-1">
            7-axis comparison across all trust dimensions. Larger area = stronger trust profile.
          </p>
        </div>
        <div className="bg-[#132237] border border-[#1E3350] p-6">
          <TrustRadarChart />
        </div>
      </section>

      {/* Section C — Dimension Breakdown */}
      <section>
        <div className="mb-4">
          <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">
            C — Dimension Breakdown
          </h2>
          <p className="text-[#6B7E94] text-xs mt-1">
            Score key: <span className="text-[#2ECC71]">≥ 75 Strong</span>
            {' · '}
            <span className="text-[#F39C12]">50–74 Moderate</span>
            {' · '}
            <span className="text-[#E74C3C]">&lt; 50 Weak</span>
          </p>
        </div>
        <div className="bg-[#132237] border border-[#1E3350]">
          <BreakdownTable />
        </div>
      </section>

      {/* Section D — Methodology Note */}
      <section>
        <div className="mb-4">
          <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">
            D — Methodology
          </h2>
        </div>
        <div className="border border-[#C9A84C]/20 bg-[#C9A84C]/5 p-6">
          <div className="flex items-start gap-3">
            <div className="w-0.5 h-full bg-[#C9A84C] self-stretch shrink-0" />
            <div>
              <p className="text-[#E8EDF2] text-sm leading-relaxed">
                The Trust Score is a composite index across 7 dimensions weighted equally in v1.
                Scores reflect publicly available data: on-chain supply, reserve attestation
                documents, issuer legal filings, and observable market data. Full methodology
                whitepaper forthcoming.
              </p>
              <p className="text-[#F39C12] text-xs mt-3 font-semibold">
                Scores are not investment advice.
              </p>
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Dimensions', value: '7' },
                  { label: 'Weighting', value: 'Equal (v1)' },
                  { label: 'Data Sources', value: 'Public' },
                  { label: 'Updated', value: 'Monthly' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#0D1B2A] border border-[#1E3350] px-3 py-2">
                    <p className="text-[10px] uppercase tracking-widest text-[#6B7E94]">{label}</p>
                    <p className="text-[#C9A84C] font-bold text-sm mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
