import { Link } from 'react-router-dom';
import {
  Shield,
  BarChart2,
  AlertTriangle,
  TrendingUp,
  FileText,
  User,
  Search,
  Building2,
  Briefcase,
  ArrowRight,
  Check,
} from 'lucide-react';

// ─── HERO SECTION ────────────────────────────────────────────────────────────

function DashboardMockup() {
  return (
    <div className="relative">
      {/* Gold glow behind mockup */}
      <div className="absolute inset-0 -z-10 rounded-2xl"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.13) 0%, transparent 70%)' }}
      />
      <div className="bg-[#132237] border border-[#1E3350] rounded-xl p-5 shadow-2xl"
        style={{ boxShadow: '0 0 40px 0 rgba(201,168,76,0.08), 0 8px 32px rgba(0,0,0,0.5)' }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7E94]">Live Overview</span>
          <span className="text-[10px] text-[#2ECC71] font-semibold">Live</span>
        </div>

        {/* Token Cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* PAXG */}
          <div className="bg-[#0D1B2A] border border-[#1E3350] rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-[#C9A84C] tracking-wide">PAXG</span>
              <span className="text-[10px] text-[#2ECC71] font-semibold">+0.4%</span>
            </div>
            <div className="text-lg font-bold text-[#E8EDF2] leading-none">$3,127</div>
            <div className="text-[10px] text-[#6B7E94] mt-1">Paxos Gold</div>
          </div>
          {/* XAUT */}
          <div className="bg-[#0D1B2A] border border-[#1E3350] rounded-lg p-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-[#F39C12] tracking-wide">XAUT</span>
              <span className="text-[10px] text-[#2ECC71] font-semibold">+0.2%</span>
            </div>
            <div className="text-lg font-bold text-[#E8EDF2] leading-none">$3,119</div>
            <div className="text-[10px] text-[#6B7E94] mt-1">Tether Gold</div>
          </div>
        </div>

        {/* Trust Score Row */}
        <div className="bg-[#0D1B2A] border border-[#1E3350] rounded-lg p-3 mb-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7E94] mb-3">Trust Score</div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[12px] font-semibold text-[#E8EDF2]">PAXG</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 bg-[#1E3350] rounded-full overflow-hidden">
                <div className="h-full bg-[#C9A84C] rounded-full" style={{ width: '76%' }} />
              </div>
              <span className="text-[11px] font-bold text-[#C9A84C]">76/100</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#E8EDF2]">XAUT</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-24 bg-[#1E3350] rounded-full overflow-hidden">
                <div className="h-full bg-[#F39C12] rounded-full" style={{ width: '54%' }} />
              </div>
              <span className="text-[11px] font-bold text-[#F39C12]">54/100</span>
            </div>
          </div>
        </div>

        {/* Mini Line Chart */}
        <div className="bg-[#0D1B2A] border border-[#1E3350] rounded-lg p-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7E94] mb-3">30-day price performance</div>
          <svg viewBox="0 0 200 60" className="w-full h-14" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="30" x2="200" y2="30" stroke="#1E3350" strokeWidth="0.5" />
            {/* PAXG line */}
            <polyline
              points="0,50 30,42 60,36 90,28 120,22 150,18 170,14 200,12"
              fill="none"
              stroke="#C9A84C"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* XAUT line */}
            <polyline
              points="0,52 30,46 60,44 90,38 120,34 150,28 170,24 200,20"
              fill="none"
              stroke="#F39C12"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-[#C9A84C] rounded" />
              <span className="text-[10px] text-[#6B7E94]">PAXG</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-[#F39C12] rounded" />
              <span className="text-[10px] text-[#6B7E94]">XAUT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center border-b border-[#1E3350] bg-[#0D1B2A] overflow-hidden"
    >
      {/* Subtle radial gold glow behind headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 30% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
                Trust Intelligence Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.2rem] font-bold text-[#E8EDF2] tracking-tight leading-[1.1] mb-6">
              The Trust Benchmark for Tokenized Gold
            </h1>

            {/* Subheadline */}
            <p className="text-[#6B7E94] text-lg leading-relaxed mb-8 max-w-lg">
              AuChain helps investors and institutions evaluate tokenized gold through trust scoring, live market intelligence, and ETF-grade benchmarking.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0D1B2A] text-sm font-bold rounded hover:bg-[#E8C97A] transition-colors"
              >
                Start Free
                <ArrowRight size={15} />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#1E3350] text-[#E8EDF2] text-sm font-semibold rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
              >
                View Pricing
              </Link>
            </div>

            {/* Supporting text */}
            <p className="text-[#6B7E94] text-xs mb-6">Free tier available. No credit card required.</p>

            {/* Trust pills */}
            <div className="flex flex-wrap items-center gap-2">
              {['PAXG', 'XAUT', 'vs GLD & IAU'].map((label) => (
                <span
                  key={label}
                  className="px-3 py-1 bg-[#132237] border border-[#1E3350] rounded-full text-[11px] font-semibold text-[#C9A84C] tracking-wide"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="hidden lg:block">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── POSITIONING BAR ──────────────────────────────────────────────────────────

function PositioningBar() {
  const items = [
    'Trust Score Methodology',
    'ETF Benchmarking',
    'Live Risk Signals',
    'Research-Grade Analysis',
    '7-Dimension Framework',
  ];
  return (
    <section className="border-b border-[#1E3350] bg-[#0A1520] py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {items.map((item, i) => (
            <span key={item} className="flex items-center gap-5">
              <span className="text-[#6B7E94] text-xs font-semibold tracking-wide">{item}</span>
              {i < items.length - 1 && (
                <span className="hidden sm:inline text-[#1E3350] text-xs">|</span>
              )}
            </span>
          ))}
        </div>
        <p className="text-[#6B7E94] text-xs text-center sm:text-right shrink-0 max-w-xs">
          Built for analysts, allocators, wealth platforms, and serious investors.
        </p>
      </div>
    </section>
  );
}

// ─── PROBLEM SECTION ──────────────────────────────────────────────────────────

const problems = [
  {
    icon: <Shield size={18} className="text-[#C9A84C]" />,
    title: 'Uneven Reserve Quality',
    body: 'Attestation frequency ranges from monthly to never. Auditor quality varies. The backing ratio is not always verifiable in real time.',
  },
  {
    icon: <Building2 size={18} className="text-[#C9A84C]" />,
    title: 'Opaque Custody Structures',
    body: 'Custodian identity, vault locations, and insurance coverage are often partially or not disclosed.',
  },
  {
    icon: <Briefcase size={18} className="text-[#C9A84C]" />,
    title: 'Inaccessible Redemption',
    body: 'Physical redemption minimums can exceed $1M. Rights vary by issuer, jurisdiction, and token class.',
  },
  {
    icon: <FileText size={18} className="text-[#C9A84C]" />,
    title: 'Legal and Regulatory Gaps',
    body: 'Domicile, licensing, and investor recourse differ materially across products. Regulatory clarity is not uniform.',
  },
  {
    icon: <BarChart2 size={18} className="text-[#C9A84C]" />,
    title: 'No Common Benchmark',
    body: 'No standardized framework exists to evaluate tokenized gold alongside traditional ETFs. Comparison requires manual, fragmented research.',
  },
];

function ProblemSection() {
  return (
    <section className="py-20 border-b border-[#1E3350] bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">The Problem</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E8EDF2] tracking-tight mb-3">
          Tokenized gold promises transparency. Verifying it is another matter.
        </h2>
        <p className="text-[#6B7E94] text-base mb-12 max-w-2xl">
          On-chain visibility is not the same as trust transparency.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <div
              key={p.title}
              className="bg-[#132237] border border-[#1E3350] border-l-2 border-l-[#C9A84C] rounded-lg p-5 flex flex-col gap-3"
            >
              <div>{p.icon}</div>
              <h3 className="text-[#E8EDF2] text-sm font-bold">{p.title}</h3>
              <p className="text-[#6B7E94] text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SOLUTION SECTION ─────────────────────────────────────────────────────────

const solutions = [
  {
    icon: <Shield size={20} className="text-[#C9A84C]" />,
    title: 'Trust Score',
    body: 'A 7-dimension composite score built from publicly verifiable inputs: reserve quality, custody, audit frequency, legal clarity, and more.',
  },
  {
    icon: <BarChart2 size={20} className="text-[#C9A84C]" />,
    title: 'ETF Comparison Layer',
    body: 'Compare tokenized gold directly against GLD and IAU across the same trust dimensions and market metrics.',
  },
  {
    icon: <AlertTriangle size={20} className="text-[#C9A84C]" />,
    title: 'Live Risk Signals',
    body: 'Monitor attestation delays, premium/discount anomalies, liquidity shifts, and custody changes in real time.',
  },
  {
    icon: <TrendingUp size={20} className="text-[#C9A84C]" />,
    title: 'Historical Benchmarking',
    body: 'Track how trust scores evolve over time. Identify structural improvements or deterioration before they manifest in price.',
  },
  {
    icon: <FileText size={20} className="text-[#C9A84C]" />,
    title: 'Research Reports',
    body: 'Downloadable trust snapshots, due diligence memos, and methodology documentation for professional workflows.',
  },
];

function SolutionSection() {
  return (
    <section className="py-20 border-b border-[#1E3350] bg-[#0A1520]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">The Solution</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E8EDF2] tracking-tight mb-12">
          AuChain turns fragmented trust signals into decision-ready intelligence.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s) => (
            <div
              key={s.title}
              className="group bg-[#132237] border border-[#1E3350] rounded-lg p-6 flex flex-col gap-4 hover:border-[#C9A84C]/50 transition-colors"
            >
              <div className="w-9 h-9 bg-[#C9A84C]/10 rounded-lg flex items-center justify-center">
                {s.icon}
              </div>
              <h3 className="text-[#E8EDF2] text-sm font-bold">{s.title}</h3>
              <p className="text-[#6B7E94] text-sm leading-relaxed">{p(s.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper to avoid lint warning on unused variable
function p(text: string) { return text; }

// ─── TRUST SCORE SECTION ──────────────────────────────────────────────────────

const dimensions = [
  { label: 'Reserve Quality', paxg: 90, xaut: 60 },
  { label: 'Legal Clarity', paxg: 80, xaut: 50 },
  { label: 'Custody Strength', paxg: 80, xaut: 60 },
  { label: 'Audit Regularity', paxg: 90, xaut: 65 },
  { label: 'Redemption Access', paxg: 55, xaut: 45 },
  { label: 'Smart Contract', paxg: 70, xaut: 60 },
  { label: 'Liquidity', paxg: 65, xaut: 35 },
];

function TrustScoreSection() {
  return (
    <section className="py-20 border-b border-[#1E3350] bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">The AuChain Trust Score</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E8EDF2] tracking-tight mb-3">
          Seven dimensions. One benchmark.
        </h2>
        <p className="text-[#6B7E94] text-base mb-12 max-w-2xl">
          Each dimension is independently assessed using publicly verifiable inputs only.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: dimension bars */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Legend */}
            <div className="flex items-center gap-6 mb-1">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-2 bg-[#C9A84C] rounded-sm" />
                <span className="text-[11px] text-[#6B7E94] font-semibold">PAXG</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-2 bg-[#F39C12] rounded-sm" />
                <span className="text-[11px] text-[#6B7E94] font-semibold">XAUT</span>
              </div>
            </div>
            {dimensions.map((d) => (
              <div key={d.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-[#E8EDF2]">{d.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-[#C9A84C]">{d.paxg}</span>
                    <span className="text-[10px] text-[#6B7E94]">/</span>
                    <span className="text-[11px] font-bold text-[#F39C12]">{d.xaut}</span>
                  </div>
                </div>
                {/* PAXG bar */}
                <div className="h-1.5 bg-[#1E3350] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C9A84C] rounded-full transition-all duration-700"
                    style={{ width: `${d.paxg}%` }}
                  />
                </div>
                {/* XAUT bar */}
                <div className="h-1.5 bg-[#1E3350] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F39C12] rounded-full transition-all duration-700"
                    style={{ width: `${d.xaut}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right: score summary cards */}
          <div className="flex flex-col gap-4 justify-start">
            {/* PAXG card */}
            <div className="bg-[#132237] border border-[#C9A84C]/40 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-[#C9A84C] mb-1">76</div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#C9A84C] mb-3">Strong</div>
              <div className="text-[11px] font-bold text-[#E8EDF2] tracking-wide">PAXG</div>
              <div className="text-[10px] text-[#6B7E94] mt-1">Paxos Gold</div>
            </div>
            {/* XAUT card */}
            <div className="bg-[#132237] border border-[#F39C12]/40 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-[#F39C12] mb-1">54</div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#F39C12] mb-3">Moderate</div>
              <div className="text-[11px] font-bold text-[#E8EDF2] tracking-wide">XAUT</div>
              <div className="text-[10px] text-[#6B7E94] mt-1">Tether Gold</div>
            </div>
            {/* Note */}
            <p className="text-[#6B7E94] text-[11px] leading-relaxed mt-1">
              Scores derived from public filings, reserve attestations, and observable market data. Methodology published openly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRODUCT PREVIEW SECTION ──────────────────────────────────────────────────

function ProductPreviewSection() {
  return (
    <section className="py-20 border-b border-[#1E3350] bg-[#0A1520]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">The Platform</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E8EDF2] tracking-tight mb-10">
          Built for serious analysis.
        </h2>

        <div className="border border-[#1E3350] bg-[#132237] rounded-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Top-left: Token Overview */}
            <div className="bg-[#0D1B2A] border border-[#1E3350] rounded-lg p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7E94] mb-3">Token Overview</div>
              <div className="flex flex-col gap-2">
                {[
                  { token: 'PAXG', price: '$3,127', mcap: '$540M', color: '#C9A84C' },
                  { token: 'XAUT', price: '$3,119', mcap: '$490M', color: '#F39C12' },
                ].map((row) => (
                  <div key={row.token} className="flex items-center justify-between py-1.5 border-b border-[#1E3350] last:border-0">
                    <span className="text-[11px] font-bold" style={{ color: row.color }}>{row.token}</span>
                    <span className="text-[11px] text-[#E8EDF2] font-semibold">{row.price}</span>
                    <span className="text-[10px] text-[#6B7E94]">{row.mcap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top-right: Spot Premium/Discount */}
            <div className="bg-[#0D1B2A] border border-[#1E3350] rounded-lg p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7E94] mb-3">Spot Premium / Discount</div>
              <svg viewBox="0 0 180 55" className="w-full h-12" preserveAspectRatio="none">
                <line x1="0" y1="27" x2="180" y2="27" stroke="#1E3350" strokeWidth="0.5" strokeDasharray="3,3" />
                <polyline points="0,27 20,24 40,29 60,25 80,28 100,23 120,26 150,24 180,26" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinejoin="round" />
                <polyline points="0,29 20,33 40,27 60,31 80,26 100,30 120,28 150,31 180,29" fill="none" stroke="#F39C12" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              <p className="text-[10px] text-[#6B7E94] mt-2">30D vs gold parity</p>
            </div>

            {/* Bottom-left: Trust Score Trend */}
            <div className="bg-[#0D1B2A] border border-[#1E3350] rounded-lg p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7E94] mb-3">Trust Score Trend</div>
              <div className="flex items-end gap-2 h-12">
                {[
                  { label: 'Q2', paxg: 72, xaut: 50 },
                  { label: 'Q3', paxg: 74, xaut: 52 },
                  { label: 'Q4', paxg: 76, xaut: 54 },
                ].map((q) => (
                  <div key={q.label} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5 items-end" style={{ height: '36px' }}>
                      <div
                        className="flex-1 bg-[#C9A84C] rounded-t-sm"
                        style={{ height: `${(q.paxg / 100) * 36}px` }}
                      />
                      <div
                        className="flex-1 bg-[#F39C12] rounded-t-sm"
                        style={{ height: `${(q.xaut / 100) * 36}px` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#6B7E94]">{q.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom-right: ETF Comparison */}
            <div className="bg-[#0D1B2A] border border-[#1E3350] rounded-lg p-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#6B7E94] mb-3">ETF Comparison</div>
              <table className="w-full text-[10px]">
                <thead>
                  <tr>
                    <th className="text-left text-[#6B7E94] font-semibold pb-1.5"></th>
                    {['PAXG', 'XAUT', 'GLD', 'IAU'].map((h) => (
                      <th key={h} className="text-center font-bold pb-1.5" style={{ color: h === 'PAXG' ? '#C9A84C' : h === 'XAUT' ? '#F39C12' : '#6B7E94' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'Annual Fee', vals: ['0%', '0%', '0.40%', '0.25%'] },
                    { metric: 'Daily Volume', vals: ['$8M', '$4M', '$1.2B', '$400M'] },
                    { metric: 'Audit Freq.', vals: ['Daily', 'Monthly', 'Quarterly', 'Quarterly'] },
                    { metric: 'Regulatory', vals: ['Trust', 'BVI', 'SEC', 'SEC'] },
                  ].map((row) => (
                    <tr key={row.metric} className="border-t border-[#1E3350]">
                      <td className="py-1 text-[#6B7E94] pr-2">{row.metric}</td>
                      {row.vals.map((v, i) => (
                        <td key={i} className="py-1 text-center text-[#E8EDF2]">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHY IT MATTERS ───────────────────────────────────────────────────────────

function WhyItMattersSection() {
  return (
    <section className="py-20 border-b border-[#1E3350] bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          {/* Gold left accent */}
          <div className="hidden md:block w-1 bg-[#C9A84C] rounded-full shrink-0 self-stretch" />
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#E8EDF2] tracking-tight mb-6">
              Price convergence can hide structural divergence.
            </h2>
            <div className="space-y-4 text-[#6B7E94] text-base leading-relaxed max-w-3xl mb-10">
              <p>
                PAXG and XAUT have tracked gold similarly in price over the past 12 months. Both trade near spot. Both offer 24/7 liquidity. By price alone, they appear equivalent.
              </p>
              <p>
                But audit regularity, custody disclosure, redemption mechanics, and regulatory oversight differ materially between them. AuChain makes that divergence visible, structured, and comparable. Before it matters.
              </p>
            </div>

            {/* Stat row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { stat: '20pt trust gap', desc: 'Between PAXG (76) and XAUT (54) on the AuChain benchmark' },
                { stat: '7 dimensions', desc: 'Independently assessed from public inputs' },
                { stat: 'Monthly updates', desc: 'Scores reviewed after material disclosure events' },
              ].map((item) => (
                <div key={item.stat} className="border-l-2 border-[#C9A84C] pl-4">
                  <div className="text-lg font-bold text-[#C9A84C] mb-1">{item.stat}</div>
                  <div className="text-[#6B7E94] text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── WHO IT'S FOR ─────────────────────────────────────────────────────────────

const audiences = [
  {
    icon: <User size={20} className="text-[#C9A84C]" />,
    title: 'Serious Investors',
    body: 'Understand the trust profile behind the price. Make allocation decisions with clarity on reserve quality, custody, and redemption structure.',
  },
  {
    icon: <Search size={20} className="text-[#C9A84C]" />,
    title: 'Analysts and Researchers',
    body: 'Access structured benchmark data, downloadable methodology, and reproducible trust analysis grounded in public filings.',
  },
  {
    icon: <Building2 size={20} className="text-[#C9A84C]" />,
    title: 'Wealth Platforms',
    body: 'Embed trust scores and due diligence infrastructure into client-facing workflows and product selection processes.',
  },
  {
    icon: <Briefcase size={20} className="text-[#C9A84C]" />,
    title: 'Institutional Allocators',
    body: 'Integrate API access, whitelabel widgets, and compliance-oriented reporting into existing investment infrastructure.',
  },
];

function WhoSection() {
  return (
    <section className="py-20 border-b border-[#1E3350] bg-[#0A1520]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">Who Uses AuChain</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E8EDF2] tracking-tight mb-10">
          Structured intelligence for every stakeholder.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((a) => (
            <div key={a.title} className="bg-[#132237] border border-[#1E3350] rounded-lg p-6 flex flex-col gap-4">
              <div className="w-9 h-9 bg-[#C9A84C]/10 rounded-lg flex items-center justify-center">{a.icon}</div>
              <h3 className="text-[#E8EDF2] text-sm font-bold">{a.title}</h3>
              <p className="text-[#6B7E94] text-sm leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PRICING PREVIEW ──────────────────────────────────────────────────────────

const tiers = [
  {
    name: 'Free',
    price: '$0/mo',
    tagline: 'Core market visibility',
    features: 'Live prices, headline trust scores, basic risk signals',
    cta: 'Start Free',
    href: '/dashboard',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$49/mo',
    tagline: 'Deep trust intelligence',
    features: 'Full 7-dimension breakdown, historical data, alerts, exports',
    cta: 'Upgrade to Pro',
    href: '/pricing',
    popular: true,
  },
  {
    name: 'Institutional',
    price: 'Custom',
    tagline: 'Embedded decision infrastructure',
    features: 'API access, whitelabel widgets, due diligence suite, analyst support',
    cta: 'Book a Demo',
    href: '/institutional',
    popular: false,
  },
];

function PricingSection() {
  return (
    <section className="py-20 border-b border-[#1E3350] bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">Pricing</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E8EDF2] tracking-tight mb-10">
          Intelligence at every scale.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-[#132237] rounded-xl p-6 flex flex-col gap-4 border ${
                tier.popular
                  ? 'border-[#C9A84C]'
                  : 'border-[#1E3350]'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-[#C9A84C] text-[#0D1B2A] text-[10px] font-bold uppercase tracking-widest rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div>
                <div className="text-[#E8EDF2] text-base font-bold mb-1">{tier.name}</div>
                <div className="text-2xl font-bold text-[#C9A84C]">{tier.price}</div>
              </div>
              <div className="text-[#6B7E94] text-xs font-semibold uppercase tracking-wide">{tier.tagline}</div>
              <p className="text-[#6B7E94] text-sm leading-relaxed flex-1">{tier.features}</p>
              <Link
                to={tier.href}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded text-sm font-bold transition-colors ${
                  tier.popular
                    ? 'bg-[#C9A84C] text-[#0D1B2A] hover:bg-[#E8C97A]'
                    : 'border border-[#1E3350] text-[#E8EDF2] hover:border-[#C9A84C] hover:text-[#C9A84C]'
                }`}
              >
                {tier.cta}
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/pricing" className="text-[#C9A84C] text-sm font-semibold hover:text-[#E8C97A] transition-colors inline-flex items-center gap-1">
            See full feature comparison
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── METHODOLOGY ──────────────────────────────────────────────────────────────

const principles = [
  {
    icon: <Check size={18} className="text-[#C9A84C]" />,
    title: 'Transparent',
    body: 'All scoring inputs are drawn from public sources. The full methodology is published and can be independently verified.',
  },
  {
    icon: <Check size={18} className="text-[#C9A84C]" />,
    title: 'Repeatable',
    body: 'Scores can be reproduced against the same public inputs by any researcher. No proprietary or non-public data is used.',
  },
  {
    icon: <Check size={18} className="text-[#C9A84C]" />,
    title: 'Structured',
    body: 'Version 1 applies equal weighting across 7 dimensions to maximize comparability and minimize subjective adjustment.',
  },
];

function MethodologySection() {
  return (
    <section className="py-20 border-b border-[#1E3350] bg-[#0A1520]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gold accent treatment */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-px bg-[#C9A84C]" />
          <div className="w-2 h-2 bg-[#C9A84C] rounded-full" />
          <div className="w-4 h-px bg-[#C9A84C]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#E8EDF2] tracking-tight mb-3">
          A benchmark built on verifiable inputs.
        </h2>
        <p className="text-[#6B7E94] text-base mb-10 max-w-xl">
          The AuChain methodology prioritizes reproducibility and transparency above all else.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {principles.map((pr) => (
            <div key={pr.title} className="bg-[#132237] border border-[#1E3350] border-t-2 border-t-[#C9A84C] rounded-lg p-6 flex flex-col gap-3">
              <div className="w-8 h-8 bg-[#C9A84C]/10 rounded-lg flex items-center justify-center">{pr.icon}</div>
              <h3 className="text-[#E8EDF2] text-sm font-bold">{pr.title}</h3>
              <p className="text-[#6B7E94] text-sm leading-relaxed">{pr.body}</p>
            </div>
          ))}
        </div>

        <Link
          to="/trust-score"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#C9A84C]/40 text-[#C9A84C] text-sm font-semibold rounded hover:bg-[#C9A84C]/10 transition-colors"
        >
          View Full Methodology
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

// ─── FINAL CTA ────────────────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section className="py-24 border-b border-[#1E3350] bg-[#0D1B2A] relative overflow-hidden">
      {/* Gold accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C9A84C]/0 via-[#C9A84C] to-[#C9A84C]/0" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#E8EDF2] tracking-tight mb-4">
          Make trust visible.
        </h2>
        <p className="text-[#6B7E94] text-lg mb-8">
          The first methodology-driven trust benchmark for tokenized gold.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#C9A84C] text-[#0D1B2A] text-sm font-bold rounded hover:bg-[#E8C97A] transition-colors"
          >
            Start Free
            <ArrowRight size={15} />
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-7 py-3 border border-[#1E3350] text-[#E8EDF2] text-sm font-semibold rounded hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors"
          >
            View Pricing
          </Link>
        </div>

        <p className="text-[#6B7E94] text-[11px]">
          AuChain Trust Scores are structured benchmarks, not investment advice.
        </p>
      </div>
    </section>
  );
}

// ─── ROOT LANDING COMPONENT ───────────────────────────────────────────────────

export default function Landing() {
  return (
    <div className="w-full">
      <HeroSection />
      <PositioningBar />
      <ProblemSection />
      <SolutionSection />
      <TrustScoreSection />
      <ProductPreviewSection />
      <WhyItMattersSection />
      <WhoSection />
      <PricingSection />
      <MethodologySection />
      <FinalCTASection />
    </div>
  );
}
