// ── Subscription / Entitlement System ────────────────────────

export type Plan = 'free' | 'pro' | 'institutional';

export interface PlanConfig {
  id: Plan;
  name: string;
  tagline: string;
  monthlyPrice: number | null; // null = contact sales
  annualPrice: number | null;
  cta: string;
  ctaHref: string;
  popular: boolean;
  features: string[];
  audience: string;
}

export const PLANS: Record<Plan, PlanConfig> = {
  free: {
    id: 'free',
    name: 'Free',
    tagline: 'Core market visibility',
    monthlyPrice: 0,
    annualPrice: 0,
    cta: 'Start free',
    ctaHref: '#',
    popular: false,
    audience:
      'For investors and market followers who want clear trust signals on tokenized gold.',
    features: [
      'Live PAXG and XAUT market prices',
      'Trust Score headline (aggregate)',
      '30-day price and premium charts',
      'Premium/discount chart',
      'ETF comparison preview',
      'Basic risk signals (3 signals)',
      'Reserve attestation status',
      'Regulatory status indicator',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    tagline: 'Deep trust intelligence',
    monthlyPrice: 49,
    annualPrice: 39,
    cta: 'Upgrade to Pro',
    ctaHref: '#',
    popular: true,
    audience:
      'For serious investors and analysts who need deeper trust intelligence, historical context, and actionable monitoring.',
    features: [
      'Everything in Free',
      'Full 7-dimension trust score breakdown',
      'Complete price history',
      'Full ETF comparison table',
      'All risk signals with detail',
      'Trust change feed',
      '"What changed" intelligence panel',
      'Driver decomposition analysis',
      'Custom watchlists',
      'Custom alerts (email and webhook)',
      'Chart and data exports',
      'Downloadable research reports',
    ],
  },
  institutional: {
    id: 'institutional',
    name: 'Institutional',
    tagline: 'Embedded decision infrastructure',
    monthlyPrice: null,
    annualPrice: null,
    cta: 'Book a demo',
    ctaHref: '#',
    popular: false,
    audience:
      'For wealth platforms, allocators, and fintechs that need trust analytics embedded into due diligence, reporting, and client workflows.',
    features: [
      'Everything in Pro',
      'API access (REST and webhooks)',
      'Whitelabel widgets and embeds',
      'Due diligence suite and DD memos',
      'Audit trail and compliance exports',
      'Dedicated analyst support',
      'Team seats and workspace management',
      'Custom data integrations',
      'SLA and uptime guarantees',
    ],
  },
};

export type Feature =
  | 'dashboard_basic'
  | 'trust_score_headline'
  | 'trust_score_breakdown'
  | 'price_history_30d'
  | 'price_history_full'
  | 'premium_discount_chart'
  | 'etf_compare_preview'
  | 'etf_compare_full'
  | 'risk_signals_basic'
  | 'risk_signals_full'
  | 'trust_change_feed'
  | 'what_changed_panel'
  | 'driver_decomposition'
  | 'watchlist'
  | 'alerts'
  | 'exports'
  | 'reports'
  | 'api_access'
  | 'whitelabel'
  | 'due_diligence'
  | 'audit_trail'
  | 'analyst_support';

export const ENTITLEMENTS: Record<Plan, Set<Feature>> = {
  free: new Set([
    'dashboard_basic',
    'trust_score_headline',
    'price_history_30d',
    'premium_discount_chart',
    'etf_compare_preview',
    'risk_signals_basic',
  ]),
  pro: new Set([
    'dashboard_basic',
    'trust_score_headline',
    'price_history_30d',
    'premium_discount_chart',
    'etf_compare_preview',
    'risk_signals_basic',
    'trust_score_breakdown',
    'price_history_full',
    'etf_compare_full',
    'risk_signals_full',
    'trust_change_feed',
    'what_changed_panel',
    'driver_decomposition',
    'watchlist',
    'alerts',
    'exports',
    'reports',
  ]),
  institutional: new Set([
    'dashboard_basic',
    'trust_score_headline',
    'price_history_30d',
    'premium_discount_chart',
    'etf_compare_preview',
    'risk_signals_basic',
    'trust_score_breakdown',
    'price_history_full',
    'etf_compare_full',
    'risk_signals_full',
    'trust_change_feed',
    'what_changed_panel',
    'driver_decomposition',
    'watchlist',
    'alerts',
    'exports',
    'reports',
    'api_access',
    'whitelabel',
    'due_diligence',
    'audit_trail',
    'analyst_support',
  ]),
};

export function hasFeature(plan: Plan, feature: Feature): boolean {
  if (plan === 'institutional') return true;
  if (plan === 'pro') return ENTITLEMENTS.pro.has(feature);
  return ENTITLEMENTS.free.has(feature);
}

export function minPlanForFeature(feature: Feature): Plan {
  if (ENTITLEMENTS.free.has(feature)) return 'free';
  if (ENTITLEMENTS.pro.has(feature)) return 'pro';
  return 'institutional';
}

export const PLAN_DISPLAY_NAMES: Record<Plan, string> = {
  free: 'Free',
  pro: 'Pro',
  institutional: 'Institutional',
};
