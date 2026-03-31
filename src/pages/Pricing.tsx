import { useState } from 'react';
import { Check, Minus, Circle } from 'lucide-react';
import { PLANS } from '../lib/subscription';
import { useSubscription } from '../lib/subscriptionContext';

// ── Pricing Page ──────────────────────────────────────────────

// ── Annual/Monthly Toggle ─────────────────────────────────────
interface BillingToggleProps {
  isAnnual: boolean;
  onChange: (val: boolean) => void;
}

function BillingToggle({ isAnnual, onChange }: BillingToggleProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(false)}
        className={`text-sm font-medium transition-colors ${
          !isAnnual ? 'text-[#E8EDF2]' : 'text-[#6B7E94]'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange(!isAnnual)}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          isAnnual ? 'bg-[#C9A84C]' : 'bg-[#1E3350]'
        }`}
        aria-label="Toggle billing period"
      >
        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
            isAnnual ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
      <button
        onClick={() => onChange(true)}
        className={`text-sm font-medium transition-colors flex items-center gap-2 ${
          isAnnual ? 'text-[#E8EDF2]' : 'text-[#6B7E94]'
        }`}
      >
        Annual
        <span className="text-[10px] px-1.5 py-0.5 bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/25 font-bold tracking-wider uppercase">
          Save 20%
        </span>
      </button>
    </div>
  );
}

// ── Plan Card ─────────────────────────────────────────────────
interface PlanCardProps {
  planId: 'free' | 'pro' | 'institutional';
  isAnnual: boolean;
  isCurrentPlan: boolean;
  onSelect: () => void;
}

function PlanCard({ planId, isAnnual, isCurrentPlan, onSelect }: PlanCardProps) {
  const plan = PLANS[planId];
  const isPopular = plan.popular;
  const isInstitutional = planId === 'institutional';

  const displayPrice = isInstitutional
    ? null
    : isAnnual && plan.annualPrice !== null
    ? plan.annualPrice
    : plan.monthlyPrice;

  return (
    <div
      className={`relative flex flex-col bg-[#132237] border transition-colors ${
        isPopular
          ? 'border-[#C9A84C] shadow-[0_0_30px_rgba(201,168,76,0.08)]'
          : 'border-[#1E3350] hover:border-[#C9A84C]/30'
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-px left-0 right-0 flex justify-center">
          <span className="bg-[#C9A84C] text-[#0D1B2A] text-[10px] font-bold uppercase tracking-widest px-4 py-0.5">
            Most Popular
          </span>
        </div>
      )}

      <div className={`p-6 flex flex-col flex-1 ${isPopular ? 'pt-7' : ''}`}>
        {/* Header */}
        <div className="mb-5 pb-5 border-b border-[#1E3350]">
          <h3 className="text-[#E8EDF2] font-bold text-lg mb-0.5">{plan.name}</h3>
          <p className="text-[#6B7E94] text-xs mb-4">{plan.tagline}</p>

          {/* Price */}
          <div className="mb-3">
            {isInstitutional ? (
              <div>
                <span className="text-3xl font-bold text-[#E8EDF2] font-mono">Custom</span>
                <p className="text-[#6B7E94] text-xs mt-1">Contact our sales team</p>
              </div>
            ) : (
              <div>
                <span className="text-3xl font-bold text-[#E8EDF2] font-mono">
                  ${displayPrice}
                </span>
                <span className="text-[#6B7E94] text-sm ml-1">/ month</span>
                {isAnnual && planId !== 'free' && (
                  <p className="text-[#6B7E94] text-xs mt-1">
                    Billed annually (${(displayPrice as number) * 12}/yr)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Audience */}
          <p className="text-[#6B7E94] text-xs leading-relaxed">{plan.audience}</p>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2.5 flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                size={13}
                className={`mt-0.5 shrink-0 ${
                  isPopular ? 'text-[#C9A84C]' : 'text-[#2ECC71]'
                }`}
              />
              <span
                className={`text-xs leading-relaxed ${
                  feature === 'Everything in Free' || feature === 'Everything in Pro'
                    ? 'text-[#C9A84C] font-semibold'
                    : 'text-[#E8EDF2]'
                }`}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-6">
          {isCurrentPlan ? (
            <div className="w-full py-2.5 text-center text-xs font-semibold tracking-wide bg-[#1E3350] text-[#6B7E94] border border-[#1E3350]">
              Current plan
            </div>
          ) : (
            <button
              onClick={onSelect}
              className={`w-full py-2.5 text-sm font-bold tracking-wide transition-colors ${
                isPopular
                  ? 'bg-[#C9A84C] text-[#0D1B2A] hover:bg-[#E8C97A]'
                  : isInstitutional
                  ? 'bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10'
                  : 'bg-transparent border border-[#1E3350] text-[#E8EDF2] hover:border-[#C9A84C]/40 hover:text-[#E8EDF2]'
              }`}
            >
              {plan.cta}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Comparison Matrix ─────────────────────────────────────────
type CellValue = 'yes' | 'partial' | 'no';

interface CompareRow {
  label: string;
  note?: string;
  free: CellValue;
  pro: CellValue;
  institutional: CellValue;
  freeNote?: string;
  proNote?: string;
}

const COMPARE_ROWS: CompareRow[] = [
  {
    label: 'Dashboard and live prices',
    free: 'yes', pro: 'yes', institutional: 'yes',
  },
  {
    label: 'Trust score (headline)',
    free: 'yes', pro: 'yes', institutional: 'yes',
  },
  {
    label: 'Trust score (7-dimension breakdown)',
    free: 'no', pro: 'yes', institutional: 'yes',
  },
  {
    label: '30-day price and premium charts',
    free: 'yes', pro: 'yes', institutional: 'yes',
  },
  {
    label: 'Full historical data',
    free: 'no', pro: 'yes', institutional: 'yes',
  },
  {
    label: 'Trust change feed',
    free: 'no', pro: 'yes', institutional: 'yes',
  },
  {
    label: '"What changed" intelligence',
    free: 'no', pro: 'yes', institutional: 'yes',
  },
  {
    label: 'Risk signals',
    free: 'partial', pro: 'yes', institutional: 'yes',
    freeNote: '3 basic signals', proNote: 'All signals with detail',
  },
  {
    label: 'ETF comparison',
    free: 'partial', pro: 'yes', institutional: 'yes',
    freeNote: 'Preview only',
  },
  {
    label: 'Watchlists',
    free: 'no', pro: 'yes', institutional: 'yes',
  },
  {
    label: 'Custom alerts',
    free: 'no', pro: 'yes', institutional: 'yes',
  },
  {
    label: 'Chart and data exports',
    free: 'no', pro: 'yes', institutional: 'yes',
  },
  {
    label: 'Downloadable reports',
    free: 'no', pro: 'yes', institutional: 'yes',
  },
  {
    label: 'API access',
    free: 'no', pro: 'no', institutional: 'yes',
  },
  {
    label: 'Whitelabel widgets',
    free: 'no', pro: 'no', institutional: 'yes',
  },
  {
    label: 'Due diligence suite',
    free: 'no', pro: 'no', institutional: 'yes',
  },
  {
    label: 'Analyst support',
    free: 'no', pro: 'no', institutional: 'yes',
  },
];

function CellIcon({ value, note }: { value: CellValue; note?: string }) {
  if (value === 'yes') {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <Check size={14} className="text-[#2ECC71]" />
        {note && <span className="text-[10px] text-[#6B7E94]">{note}</span>}
      </div>
    );
  }
  if (value === 'partial') {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <Circle size={12} className="text-[#F39C12] fill-[#F39C12]/20" />
        {note && <span className="text-[10px] text-[#6B7E94]">{note}</span>}
      </div>
    );
  }
  return <Minus size={14} className="text-[#1E3350]" />;
}

function CompareMatrix() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-[#1E3350]">
            <th className="text-left py-3 px-4 text-[10px] font-bold uppercase tracking-widest text-[#6B7E94] w-1/2">
              Feature
            </th>
            {(['Free', 'Pro', 'Institutional'] as const).map((name) => (
              <th
                key={name}
                className={`text-center py-3 px-4 text-[10px] font-bold uppercase tracking-widest ${
                  name === 'Pro' ? 'text-[#C9A84C]' : 'text-[#6B7E94]'
                }`}
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-[#1E3350] transition-colors hover:bg-[#1E3350]/20 ${
                i % 2 === 0 ? 'bg-[#0D1B2A]/30' : ''
              }`}
            >
              <td className="py-3 px-4 text-[#E8EDF2] text-sm">{row.label}</td>
              <td className="py-3 px-4 text-center">
                <CellIcon value={row.free} note={row.freeNote} />
              </td>
              <td className="py-3 px-4 text-center bg-[#C9A84C]/3">
                <CellIcon value={row.pro} note={row.proNote} />
              </td>
              <td className="py-3 px-4 text-center">
                <CellIcon value={row.institutional} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── FAQ ───────────────────────────────────────────────────────
interface FaqItem {
  q: string;
  a: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'What is included in the Free tier?',
    a: 'The Free tier gives you live PAXG and XAUT market prices, the aggregate Trust Score headline for each token, 30-day price and premium/discount charts, a preview of the ETF comparison, and basic risk signals. No account required.',
  },
  {
    q: 'How is Pro different from Free?',
    a: 'Pro unlocks the full 7-dimension trust score breakdown, complete price history, all risk signals with detailed context, the trust change feed, and the "What changed" weekly intelligence panel. You also get custom watchlists, configurable alerts, chart exports, and downloadable research reports.',
  },
  {
    q: 'Who is the Institutional plan for?',
    a: 'Institutional is designed for wealth platforms, asset managers, allocators, and fintechs that need trust analytics embedded directly into client workflows. It adds REST API access, whitelabel widgets, a full due diligence suite with downloadable DD memos, audit trail exports, and dedicated analyst support.',
  },
  {
    q: 'Do you offer API access?',
    a: 'API access is available on the Institutional plan. It includes REST endpoints for trust scores, price history, risk signals, and attestation data, along with webhook delivery for real-time alerts. Documentation and integration support are included.',
  },
  {
    q: 'Can I export reports and charts?',
    a: 'Chart and data exports are available on Pro and above. Downloadable research reports (PDF) are also included in Pro and Institutional. Institutional clients can additionally access audit trail exports formatted for compliance workflows.',
  },
  {
    q: 'Can I change plans later?',
    a: 'Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately. Downgrades take effect at the end of the current billing period.',
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col divide-y divide-[#1E3350]">
      {FAQ_ITEMS.map((item, i) => (
        <div key={i}>
          <button
            className="w-full text-left py-4 flex items-center justify-between gap-4"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="text-[#E8EDF2] text-sm font-medium">{item.q}</span>
            <span
              className={`text-[#C9A84C] text-lg font-light shrink-0 transition-transform ${
                open === i ? 'rotate-45' : ''
              }`}
            >
              +
            </span>
          </button>
          {open === i && (
            <div className="pb-4">
              <p className="text-[#6B7E94] text-sm leading-relaxed">{item.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Pricing Page ──────────────────────────────────────────────
export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { currentPlan, setPlan } = useSubscription();

  function handleSelect(plan: 'free' | 'pro' | 'institutional') {
    if (plan !== 'institutional') {
      setPlan(plan);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-16">

      {/* Hero */}
      <div className="text-center flex flex-col items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
            Pricing
          </span>
          <div className="w-4 h-px bg-[#C9A84C]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#E8EDF2] tracking-tight">
          Trust intelligence at every scale
        </h1>
        <p className="text-[#6B7E94] text-base max-w-xl leading-relaxed">
          From market visibility to embedded due diligence infrastructure.
        </p>
        <BillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {(['free', 'pro', 'institutional'] as const).map((planId) => (
          <PlanCard
            key={planId}
            planId={planId}
            isAnnual={isAnnual}
            isCurrentPlan={currentPlan === planId}
            onSelect={() => handleSelect(planId)}
          />
        ))}
      </div>

      {/* Demo note */}
      <div className="bg-[#132237] border border-[#C9A84C]/20 p-4 flex items-start gap-3">
        <span className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest shrink-0 pt-0.5">
          Demo
        </span>
        <p className="text-[#6B7E94] text-xs leading-relaxed">
          This is a demo environment. Clicking a plan card selects it for your session
          and unlocks the corresponding features across the platform. Use the plan badge
          in the navigation bar to cycle through plans at any time.
        </p>
      </div>

      {/* Feature Comparison */}
      <section>
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-4 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
              Feature comparison
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#E8EDF2] tracking-tight">
            Full plan comparison
          </h2>
        </div>
        <div className="bg-[#132237] border border-[#1E3350]">
          <CompareMatrix />
        </div>
        <p className="text-[#6B7E94] text-[11px] mt-3 leading-relaxed">
          Partial circle indicates limited access with restrictions. See individual plan descriptions for details.
        </p>
      </section>

      {/* FAQ */}
      <section>
        <div className="mb-6">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-4 h-px bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
              FAQ
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#E8EDF2] tracking-tight">
            Common questions
          </h2>
        </div>
        <div className="bg-[#132237] border border-[#1E3350] px-6">
          <FaqAccordion />
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="border border-[#1E3350] bg-[#132237] p-10 text-center flex flex-col items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-[#E8EDF2] tracking-tight mb-2">
            Start building trust intelligence into your workflow
          </h2>
          <p className="text-[#6B7E94] text-sm">
            Free to start. No credit card required.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setPlan('free')}
            className="px-6 py-2.5 bg-[#C9A84C] text-[#0D1B2A] text-sm font-bold tracking-wide hover:bg-[#E8C97A] transition-colors"
          >
            Start free
          </button>
          <a
            href="#"
            className="px-6 py-2.5 border border-[#1E3350] text-[#E8EDF2] text-sm font-semibold hover:border-[#C9A84C]/40 transition-colors"
          >
            Talk to us
          </a>
        </div>
      </section>
    </div>
  );
}
