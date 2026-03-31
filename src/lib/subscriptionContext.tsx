import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type Plan, type Feature, hasFeature as checkFeature } from './subscription';

// ── Subscription Context ──────────────────────────────────────

const STORAGE_KEY = 'auchain_plan';

function getStoredPlan(): Plan {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'free' || stored === 'pro' || stored === 'institutional') {
      return stored;
    }
  } catch {
    // localStorage may not be available in some environments
  }
  return 'free';
}

interface SubscriptionContextValue {
  currentPlan: Plan;
  setPlan: (plan: Plan) => void;
  hasFeature: (feature: Feature) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContextValue | null>(null);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlanState] = useState<Plan>(getStoredPlan);

  const setPlan = useCallback((plan: Plan) => {
    setCurrentPlanState(plan);
    try {
      localStorage.setItem(STORAGE_KEY, plan);
    } catch {
      // ignore
    }
  }, []);

  const hasFeatureForPlan = useCallback(
    (feature: Feature) => checkFeature(currentPlan, feature),
    [currentPlan]
  );

  return (
    <SubscriptionContext.Provider
      value={{ currentPlan, setPlan, hasFeature: hasFeatureForPlan }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription(): SubscriptionContextValue {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error('useSubscription must be used inside SubscriptionProvider');
  }
  return ctx;
}
