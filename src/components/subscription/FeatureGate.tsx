import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Feature, minPlanForFeature, PLAN_DISPLAY_NAMES } from '../../lib/subscription';
import { useSubscription } from '../../lib/subscriptionContext';

// ── FeatureGate ───────────────────────────────────────────────
// Wraps children. If the current plan lacks the feature,
// renders a locked overlay (blur mode) or replaces content (block mode).

interface FeatureGateProps {
  feature: Feature;
  children: React.ReactNode;
  mode?: 'blur' | 'block';
  fallback?: React.ReactNode;
  label?: string; // override the "Unlock X with Y" label
}

export default function FeatureGate({
  feature,
  children,
  mode = 'blur',
  fallback,
  label,
}: FeatureGateProps) {
  const { hasFeature } = useSubscription();

  if (hasFeature(feature)) {
    return <>{children}</>;
  }

  const requiredPlan = minPlanForFeature(feature);
  const planName = PLAN_DISPLAY_NAMES[requiredPlan];
  const defaultLabel = `Available on ${planName}`;
  const displayLabel = label ?? defaultLabel;

  const lockUI = fallback ?? (
    <LockedOverlayContent label={displayLabel} planName={planName} />
  );

  if (mode === 'block') {
    return <>{lockUI}</>;
  }

  // blur mode: render children blurred with overlay on top
  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-[#0D1B2A]/60 backdrop-blur-[2px]">
        <LockedOverlayContent label={displayLabel} planName={planName} />
      </div>
    </div>
  );
}

// ── Locked Overlay Content ────────────────────────────────────
interface LockedOverlayContentProps {
  label: string;
  planName: string;
}

function LockedOverlayContent({ label, planName }: LockedOverlayContentProps) {
  const isPro = planName === 'Pro';

  return (
    <div className="flex flex-col items-center gap-3 px-6 py-5 bg-[#132237] border border-[#1E3350] text-center max-w-xs mx-auto">
      <div className="w-9 h-9 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
        <Lock size={16} className="text-[#C9A84C]" />
      </div>
      <div>
        <p className="text-[#E8EDF2] text-sm font-semibold mb-1">{label}</p>
        <p className="text-[#6B7E94] text-xs leading-relaxed">
          {isPro
            ? 'Upgrade to Pro for full access to this feature.'
            : 'Contact us for Institutional access.'}
        </p>
      </div>
      <Link
        to="/pricing"
        className="px-4 py-1.5 text-xs font-semibold tracking-wide bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C]/20 hover:text-[#E8C97A] transition-colors"
      >
        {isPro ? 'Upgrade to Pro' : 'View plans'}
      </Link>
    </div>
  );
}
