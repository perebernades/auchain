import { useSubscription } from '../../lib/subscriptionContext';
import { type Plan } from '../../lib/subscription';

// ── PlanBadge ─────────────────────────────────────────────────
// Displays current plan in the navbar.
// Clicking cycles through free -> pro -> institutional for demo purposes.

const PLAN_ORDER: Plan[] = ['free', 'pro', 'institutional'];

const PLAN_STYLES: Record<Plan, string> = {
  free:
    'bg-[#6B7E94]/10 text-[#6B7E94] border-[#6B7E94]/25 hover:bg-[#6B7E94]/20',
  pro:
    'bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/30 hover:bg-[#C9A84C]/20',
  institutional:
    'bg-[#2ECC71]/10 text-[#2ECC71] border-[#2ECC71]/25 hover:bg-[#2ECC71]/20',
};

const PLAN_LABELS: Record<Plan, string> = {
  free: 'Free',
  pro: 'Pro',
  institutional: 'Institutional',
};

export default function PlanBadge() {
  const { currentPlan, setPlan } = useSubscription();

  function cycleNext() {
    const idx = PLAN_ORDER.indexOf(currentPlan);
    const next = PLAN_ORDER[(idx + 1) % PLAN_ORDER.length];
    setPlan(next);
  }

  return (
    <button
      onClick={cycleNext}
      title="Demo: click to cycle plans"
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1
        text-[10px] font-semibold tracking-widest uppercase
        border transition-colors cursor-pointer
        ${PLAN_STYLES[currentPlan]}
      `}
    >
      {PLAN_LABELS[currentPlan]}
      <span className="text-[9px] opacity-60 normal-case tracking-normal font-normal">demo</span>
    </button>
  );
}
