import { createPortal } from 'react-dom';
import { X, Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../../lib/subscriptionContext';
import { PLANS, type Plan } from '../../lib/subscription';

// ── UpgradeModal ──────────────────────────────────────────────
// Shows the next tier with key unlocked features.

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  targetPlan?: Plan; // if not provided, shows next tier up
}

const UPGRADE_FEATURES: Record<Plan, string[]> = {
  free: [],
  pro: [
    'Full 7-dimension trust score breakdown',
    'Trust change feed and history',
    '"What changed" weekly intelligence',
    'Custom watchlists and alerts',
    'Chart exports and research reports',
  ],
  institutional: [
    'REST API and webhook access',
    'Due diligence suite with DD memos',
    'Whitelabel widget embeds',
    'Audit trail and compliance exports',
    'Dedicated analyst support',
  ],
};

export default function UpgradeModal({ open, onClose, targetPlan }: UpgradeModalProps) {
  const { currentPlan } = useSubscription();

  if (!open) return null;

  // Determine which plan to highlight
  const PLAN_ORDER: Plan[] = ['free', 'pro', 'institutional'];
  const currentIdx = PLAN_ORDER.indexOf(currentPlan);
  const nextPlan: Plan =
    targetPlan ?? (currentIdx < 2 ? PLAN_ORDER[currentIdx + 1] : 'institutional');

  const config = PLANS[nextPlan];
  const features = UPGRADE_FEATURES[nextPlan];
  const isInstitutional = nextPlan === 'institutional';

  const priceDisplay = isInstitutional
    ? 'Custom pricing'
    : `$${config.monthlyPrice} / month`;

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0D1B2A]/80 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-[#132237] border border-[#1E3350] shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#6B7E94] hover:text-[#E8EDF2] transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="p-6 pb-4 border-b border-[#1E3350]">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={14} className="text-[#C9A84C]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]">
              Upgrade
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#E8EDF2] mb-1">
            {config.name}
          </h2>
          <p className="text-[#6B7E94] text-sm">{config.tagline}</p>
          <p className="text-[#C9A84C] font-bold text-lg mt-3 font-mono">{priceDisplay}</p>
        </div>

        {/* Features */}
        <div className="p-6">
          <p className="text-[#6B7E94] text-xs uppercase tracking-widest font-semibold mb-3">
            What you unlock
          </p>
          <ul className="flex flex-col gap-2.5">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check size={13} className="text-[#2ECC71] mt-0.5 shrink-0" />
                <span className="text-[#E8EDF2] text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="px-6 pb-6 flex flex-col gap-2">
          <Link
            to="/pricing"
            onClick={onClose}
            className="w-full text-center py-2.5 bg-[#C9A84C] text-[#0D1B2A] text-sm font-bold tracking-wide hover:bg-[#E8C97A] transition-colors"
          >
            {config.cta}
          </Link>
          <button
            onClick={onClose}
            className="w-full text-center py-2 text-[#6B7E94] text-xs hover:text-[#E8EDF2] transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
