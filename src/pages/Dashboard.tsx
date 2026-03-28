import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown, Layers, Share2, Download } from 'lucide-react';
import {
  getTokenDetails,
  getPriceHistory,
  type TokenDetails,
} from '../api/coingecko';
import { TOKEN_METADATA, TRUST_SCORES } from '../data/staticData';
import ScoreBadge from '../components/ui/ScoreBadge';
import ErrorState, { RateLimitBanner } from '../components/ui/ErrorState';
import { SkeletonTokenCard } from '../components/ui/SkeletonCard';
import PremiumDiscountChart from '../components/charts/PremiumDiscountChart';
import PriceHistoryChart from '../components/charts/PriceHistoryChart';
import InsightBanner from '../components/ui/InsightBanner';
import InterpretationNote from '../components/ui/InterpretationNote';
import ActionRow from '../components/ui/ActionRow';

// ── Formatters ────────────────────────────────────────────────
const fmtUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const fmtUsdShort = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 2,
});

const fmtNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

// ── Token Overview Card ───────────────────────────────────────
interface TokenCardProps {
  id: 'pax-gold' | 'tether-gold';
  tokenKey: 'paxg' | 'xaut';
}

function TokenCard({ id, tokenKey }: TokenCardProps) {
  const meta = TOKEN_METADATA[tokenKey];
  const score = TRUST_SCORES[tokenKey];

  const { data, isLoading, error, refetch } = useQuery<TokenDetails>({
    queryKey: ['tokenDetails', id],
    queryFn: () => getTokenDetails(id),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const isRateLimit = (error as any)?.isRateLimit;

  if (isLoading) return <SkeletonTokenCard />;

  if (error && !data) {
    return <ErrorState error={error as Error} onRetry={() => refetch()} />;
  }

  const priceChange = data?.price_change_percentage_24h ?? 0;
  const isUp = priceChange >= 0;

  return (
    <div className="bg-[#132237] border border-[#1E3350] hover:border-[#C9A84C]/30 transition-colors">
      {isRateLimit && <RateLimitBanner />}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#E8EDF2] font-bold text-lg">{meta.ticker}</span>
              <span className="text-[10px] px-1.5 py-0.5 bg-[#1E3350] text-[#6B7E94] border border-[#1E3350] font-semibold tracking-wider uppercase flex items-center gap-1">
                <Layers size={9} />
                {meta.chain}
              </span>
            </div>
            <p className="text-[#6B7E94] text-xs">{meta.name}</p>
          </div>
          <ScoreBadge variant={tokenKey === 'paxg' ? 'gold' : 'amber'}>
            {score} / 100
          </ScoreBadge>
        </div>

        {/* Price */}
        <div className="flex items-end gap-3 mb-5">
          <span className="text-3xl font-bold text-[#E8EDF2] font-mono">
            {data ? fmtUsd.format(data.current_price) : '—'}
          </span>
          <span className={`flex items-center gap-1 text-sm font-semibold pb-0.5 ${isUp ? 'text-[#2ECC71]' : 'text-[#E74C3C]'}`}>
            {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {isUp ? '+' : ''}{priceChange.toFixed(2)}%
          </span>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-0 border border-[#1E3350]">
          {[
            { label: 'Market Cap', value: data ? fmtUsdShort.format(data.market_cap) : '—' },
            { label: '24h Volume', value: data ? fmtUsdShort.format(data.total_volume) : '—' },
            { label: 'Circulating Supply', value: data ? `${fmtNumber.format(data.circulating_supply)} oz` : '—' },
            { label: 'Total Supply', value: data ? `${fmtNumber.format(data.total_supply)} oz` : '—' },
          ].map(({ label, value }, i) => (
            <div
              key={label}
              className={`px-3 py-2.5 bg-[#0D1B2A] ${i % 2 === 0 ? 'border-r border-[#1E3350]' : ''} ${i < 2 ? 'border-b border-[#1E3350]' : ''}`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7E94] mb-1">{label}</p>
              <p className="text-[#E8EDF2] text-sm font-semibold font-mono">{value}</p>
            </div>
          ))}
        </div>

        {/* Metadata footer */}
        <div className="mt-4 pt-4 border-t border-[#1E3350] flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[#6B7E94] text-xs">Last Attestation</span>
            <ScoreBadge variant={meta.attestationBadge} size="sm">
              {meta.lastAttestation}{' '}
              {meta.lastAttestationStatus === 'ok' ? '✓' : '⚠'}
            </ScoreBadge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6B7E94] text-xs">Audit Frequency</span>
            <span className="text-[#E8EDF2] text-xs font-medium">
              {meta.auditFrequency} ({meta.auditor})
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6B7E94] text-xs">Custodian</span>
            <span className={`text-xs font-medium ${meta.custodian === 'Undisclosed' ? 'text-[#F39C12]' : 'text-[#E8EDF2]'}`}>
              {meta.custodian}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6B7E94] text-xs">Regulatory Status</span>
            <ScoreBadge variant={meta.regulatoryBadge} size="sm">
              {meta.regulatoryStatus}
            </ScoreBadge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#6B7E94] text-xs">Redemption Min.</span>
            <ScoreBadge variant={meta.redemptionBadge} size="sm">
              {meta.redemptionMinOz} oz ({meta.redemptionMinUsd})
            </ScoreBadge>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────
function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-[#E8EDF2] font-bold text-base uppercase tracking-widest">{title}</h2>
        {subtitle && <p className="text-[#6B7E94] text-xs mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

// ── Risk Signal Column ────────────────────────────────────────
interface RiskColProps {
  title: string;
  items: { label: string; badge: 'green' | 'amber' | 'red'; text: string }[];
}

function RiskColumn({ title, items }: RiskColProps) {
  return (
    <div className="bg-[#132237] border border-[#1E3350] p-5">
      <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6B7E94] mb-4 border-b border-[#1E3350] pb-3">
        {title}
      </h3>
      <div className="flex flex-col gap-3">
        {items.map(({ label, badge, text }) => (
          <div key={label} className="flex items-start justify-between gap-3">
            <span className="text-[#E8EDF2] text-sm font-medium shrink-0">{label}</span>
            <ScoreBadge variant={badge} size="sm">{text}</ScoreBadge>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Hero / Positioning Block ──────────────────────────────────
// The product framing layer. Should feel like a Bloomberg terminal
// splash — not a marketing landing page. Concise. Authoritative.
function HeroBlock({ lastUpdated }: { lastUpdated: string }) {
  return (
    <div className="border-b border-[#1E3350] pb-8">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-4 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
              Trust Intelligence Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[28px] font-bold text-[#E8EDF2] tracking-tight leading-tight mb-2">
            AuChain — The Trust Index<br className="hidden sm:block" /> for Tokenized Gold
          </h1>

          {/* Subheadline */}
          <p className="text-[#6B7E94] text-sm leading-relaxed mb-4">
            AuChain benchmarks tokenized gold products across transparency, custody,
            audit quality, legal structure, and market integrity.
          </p>

          {/* Why this matters */}
          <div className="flex items-start gap-2.5">
            <div className="w-0.5 self-stretch bg-[#C9A84C]/40 shrink-0" />
            <p className="text-[#6B7E94] text-xs leading-relaxed italic">
              Assets can track the same gold price while carrying very different trust and risk profiles.
            </p>
          </div>
        </div>

        {/* Live indicator — top-right */}
        <div className="flex items-center gap-2 shrink-0 sm:mt-1">
          <span className="w-1.5 h-1.5 bg-[#2ECC71] animate-pulse" />
          <span className="text-[#6B7E94] text-xs font-mono">Updated {lastUpdated}</span>
        </div>
      </div>

      {/* Microcopy badges */}
      <div className="flex items-center gap-2 mt-5 flex-wrap">
        {[
          'Public-input benchmark',
          'Version 1 methodology',
          'Based on public filings & issuer disclosures',
          'Updated monthly',
          'Coverage expanding',
        ].map((label) => (
          <span
            key={label}
            className="text-[10px] text-[#6B7E94] border border-[#1E3350] px-2.5 py-1 uppercase tracking-wider"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Dashboard Page ────────────────────────────────────────────
export default function Dashboard() {
  const paxgHistory = useQuery({
    queryKey: ['priceHistory', 'pax-gold'],
    queryFn: () => getPriceHistory('pax-gold', 30),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const xautHistory = useQuery({
    queryKey: ['priceHistory', 'tether-gold'],
    queryFn: () => getPriceHistory('tether-gold', 30),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const lastUpdated = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const chartsLoading = paxgHistory.isLoading || xautHistory.isLoading;
  const chartsError = paxgHistory.error || xautHistory.error;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">

      {/* Hero / Product Positioning */}
      <HeroBlock lastUpdated={lastUpdated} />

      {/* Key Insight */}
      <InsightBanner>
        PAXG and XAUT track gold similarly in price, but diverge materially in trust
        profile — due to differences in audit regularity, custody disclosure, and
        regulatory clarity. Price convergence masks structural divergence.
      </InsightBanner>

      {/* Section A — Token Overview */}
      <Section
        title="A — Token Overview"
        subtitle="Live market data via CoinGecko. Refreshed every 5 minutes via edge cache."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TokenCard id="pax-gold" tokenKey="paxg" />
          <TokenCard id="tether-gold" tokenKey="xaut" />
        </div>
        <InterpretationNote>
          These products offer similar gold exposure, but differ meaningfully in reserve
          transparency, legal structure, and redemption design. The Trust Score captures
          this divergence across 7 independently assessed dimensions.
        </InterpretationNote>
      </Section>

      {/* Section B — Spot Premium / Discount */}
      <Section
        title="B — Spot Premium / Discount (30 Days)"
        subtitle="Deviation of token price from gold spot reference. Positive = trading at a premium to spot."
      >
        <div className="bg-[#132237] border border-[#1E3350] p-5">
          {chartsError && !paxgHistory.data && !xautHistory.data ? (
            <ErrorState
              error={chartsError as Error}
              onRetry={() => { paxgHistory.refetch(); xautHistory.refetch(); }}
            />
          ) : (
            <>
              <PremiumDiscountChart
                paxgHistory={paxgHistory.data}
                xautHistory={xautHistory.data}
                isLoading={chartsLoading}
              />
              <InterpretationNote className="pt-4 border-t border-[#1E3350]">
                Persistent premiums or discounts can signal structural frictions, liquidity
                constraints, or weaker market efficiency. A well-functioning market keeps
                deviations close to zero.
              </InterpretationNote>
            </>
          )}
        </div>
      </Section>

      {/* Section C — 30-Day Price Performance */}
      <Section
        title="C — 30-Day Price Performance (USD)"
        subtitle="PAXG vs XAUT absolute price in USD over the past 30 days."
      >
        <div className="bg-[#132237] border border-[#1E3350] p-5">
          {chartsError && !paxgHistory.data && !xautHistory.data ? (
            <ErrorState
              error={chartsError as Error}
              onRetry={() => { paxgHistory.refetch(); xautHistory.refetch(); }}
            />
          ) : (
            <>
              <PriceHistoryChart
                paxgHistory={paxgHistory.data}
                xautHistory={xautHistory.data}
                isLoading={chartsLoading}
              />
              <InterpretationNote className="pt-4 border-t border-[#1E3350]">
                Price convergence between PAXG and XAUT is expected — both track spot gold.
                Divergences reflect market structure or liquidity differences, not changes
                in the underlying asset.
              </InterpretationNote>
            </>
          )}
        </div>
      </Section>

      {/* Section D — Key Risk Signals */}
      <Section
        title="D — Key Risk Signals"
        subtitle="Trust inputs based on public filings, reserve attestations, and observable market data as of Q1 2026."
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <RiskColumn
            title="Reserve Attestation"
            items={[
              { label: 'PAXG', badge: 'green', text: 'Monthly (Withum)' },
              { label: 'XAUT', badge: 'amber', text: 'Quarterly (MHA Cayman)' },
            ]}
          />
          <RiskColumn
            title="Redemption Minimum"
            items={[
              { label: 'PAXG', badge: 'red', text: '430 oz (~$1.3M)' },
              { label: 'XAUT', badge: 'amber', text: '50 oz (~$155K)' },
            ]}
          />
          <RiskColumn
            title="Regulatory Status"
            items={[
              { label: 'PAXG', badge: 'green', text: 'NYDFS Regulated' },
              { label: 'XAUT', badge: 'amber', text: 'Cayman Islands' },
            ]}
          />
        </div>

        {/* Footer row: link to full breakdown + action row */}
        <div className="mt-5 pt-4 border-t border-[#1E3350] flex items-center justify-between flex-wrap gap-4">
          <p className="text-[#6B7E94] text-xs">
            Full 7-dimension breakdown on the{' '}
            <a href="/trust-score" className="text-[#C9A84C] hover:underline">Trust Score</a> page.
          </p>
          <ActionRow
            actions={[
              {
                label: 'Share Dashboard',
                icon: <Share2 size={10} />,
                onClick: () => { navigator.clipboard?.writeText(window.location.href); },
                activatedLabel: 'Link Copied',
              },
              {
                label: 'Download Snapshot',
                icon: <Download size={10} />,
                comingSoon: true,
              },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}
