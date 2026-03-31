// ── Mock Data for Pro/Institutional Features ─────────────────

// ── Trust Change History ──────────────────────────────────────
export interface TrustChangeEvent {
  id: string;
  date: string;
  token: 'PAXG' | 'XAUT';
  dimension: string;
  previousScore: number;
  newScore: number;
  delta: number;
  reason: string;
  category: 'attestation' | 'custody' | 'regulatory' | 'liquidity' | 'smart_contract';
}

export const TRUST_CHANGE_HISTORY: TrustChangeEvent[] = [
  {
    id: 'tce-001',
    date: 'Mar 2026',
    token: 'PAXG',
    dimension: 'Reserve Attestation',
    previousScore: 88,
    newScore: 92,
    delta: 4,
    reason:
      'KPMG completed Q1 2026 reserve attestation with full on-chain reconciliation. Attestation published ahead of schedule with expanded custodian disclosure.',
    category: 'attestation',
  },
  {
    id: 'tce-002',
    date: 'Mar 2026',
    token: 'XAUT',
    dimension: 'Regulatory Clarity',
    previousScore: 54,
    newScore: 58,
    delta: 4,
    reason:
      'Tether published updated El Salvador regulatory compliance documentation referencing expanded VASP licensing. Partial improvement pending further disclosure.',
    category: 'regulatory',
  },
  {
    id: 'tce-003',
    date: 'Feb 2026',
    token: 'PAXG',
    dimension: 'Market Integrity',
    previousScore: 79,
    newScore: 75,
    delta: -4,
    reason:
      'Elevated premium/discount volatility observed in February. PAXG traded at a persistent +0.4% premium for 12 consecutive days, indicating potential liquidity friction.',
    category: 'liquidity',
  },
  {
    id: 'tce-004',
    date: 'Feb 2026',
    token: 'XAUT',
    dimension: 'Custody Transparency',
    previousScore: 60,
    newScore: 56,
    delta: -4,
    reason:
      'Quarterly custodian report was delayed by 18 days. BDO confirmed receipt of materials but publication lag reduces score on timely disclosure dimension.',
    category: 'custody',
  },
  {
    id: 'tce-005',
    date: 'Feb 2026',
    token: 'PAXG',
    dimension: 'Smart Contract Security',
    previousScore: 85,
    newScore: 87,
    delta: 2,
    reason:
      'Paxos completed supplemental security review by Trail of Bits covering the upgraded ERC-20 wrapper. No critical findings. Report published on-chain.',
    category: 'smart_contract',
  },
  {
    id: 'tce-006',
    date: 'Jan 2026',
    token: 'XAUT',
    dimension: 'Reserve Attestation',
    previousScore: 68,
    newScore: 72,
    delta: 4,
    reason:
      'BDO completed Q4 2025 attestation. Coverage now includes breakdown by bar serial number for a majority of reserves, improving granularity of verification.',
    category: 'attestation',
  },
  {
    id: 'tce-007',
    date: 'Jan 2026',
    token: 'PAXG',
    dimension: 'Legal Structure',
    previousScore: 90,
    newScore: 90,
    delta: 0,
    reason:
      'NYDFS annual review completed with no material changes to trust structure. Operating charter renewed through December 2026.',
    category: 'regulatory',
  },
  {
    id: 'tce-008',
    date: 'Jan 2026',
    token: 'XAUT',
    dimension: 'Market Integrity',
    previousScore: 62,
    newScore: 58,
    delta: -4,
    reason:
      'On-chain transfer volume declined 23% in January relative to 90-day average. Concentration in top 5 wallet addresses increased to 41%, signaling reduced distribution.',
    category: 'liquidity',
  },
  {
    id: 'tce-009',
    date: 'Jan 2026',
    token: 'PAXG',
    dimension: 'Custody Transparency',
    previousScore: 88,
    newScore: 91,
    delta: 3,
    reason:
      'Brinks custodian report for Q4 2025 includes bar-level serial disclosure for 100% of reserves. First full-coverage bar-level attestation in PAXG history.',
    category: 'custody',
  },
  {
    id: 'tce-010',
    date: 'Mar 2026',
    token: 'XAUT',
    dimension: 'Smart Contract Security',
    previousScore: 71,
    newScore: 68,
    delta: -3,
    reason:
      'Community security researcher disclosed a medium-severity edge case in the redemption flow. Tether acknowledged and patched within 72 hours, but public disclosure window reduced confidence.',
    category: 'smart_contract',
  },
];

// ── Risk Flags ────────────────────────────────────────────────
export interface RiskFlag {
  id: string;
  severity: 'high' | 'medium' | 'low';
  token: 'PAXG' | 'XAUT' | 'BOTH';
  title: string;
  description: string;
  dimension: string;
  detectedAt: string;
  status: 'active' | 'monitoring' | 'resolved';
}

export const RISK_FLAGS: RiskFlag[] = [
  {
    id: 'rf-001',
    severity: 'medium',
    token: 'XAUT',
    title: 'Attestation publication delay',
    description:
      'Q4 2025 BDO attestation was published 18 days after the scheduled window. Two of the last four quarterly reports have been delayed, indicating a pattern that may affect reliability of real-time verification.',
    dimension: 'Reserve Attestation',
    detectedAt: 'Feb 14, 2026',
    status: 'monitoring',
  },
  {
    id: 'rf-002',
    severity: 'medium',
    token: 'PAXG',
    title: 'Elevated premium over spot (12-day streak)',
    description:
      'PAXG traded at a consistent +0.35% to +0.50% premium to gold spot for 12 consecutive trading days in February. Sustained premiums above 0.30% may indicate reduced arbitrage efficiency or liquidity constraints.',
    dimension: 'Market Integrity',
    detectedAt: 'Feb 8, 2026',
    status: 'resolved',
  },
  {
    id: 'rf-003',
    severity: 'high',
    token: 'XAUT',
    title: 'On-chain wallet concentration increase',
    description:
      'The top 5 XAUT wallet addresses now hold 41% of total circulating supply, up from 34% in October 2025. High concentration reduces effective circulating supply and can amplify price impact during redemptions.',
    dimension: 'Market Integrity',
    detectedAt: 'Jan 28, 2026',
    status: 'active',
  },
  {
    id: 'rf-004',
    severity: 'low',
    token: 'XAUT',
    title: 'Smart contract edge case patched',
    description:
      'A medium-severity edge case in the redemption flow was identified and patched. The vulnerability did not affect balances or redemptions during its exposure window. Patch confirmed by Tether security team on March 3, 2026.',
    dimension: 'Smart Contract Security',
    detectedAt: 'Mar 1, 2026',
    status: 'resolved',
  },
  {
    id: 'rf-005',
    severity: 'low',
    token: 'BOTH',
    title: 'Redemption minimum at institutional scale only',
    description:
      'Both PAXG and XAUT require a minimum of 430 fine troy ounces (~$1.3M at current spot) for physical redemption. Retail holders have no direct redemption path, introducing counterparty dependency.',
    dimension: 'Legal Structure',
    detectedAt: 'Jan 1, 2026',
    status: 'active',
  },
  {
    id: 'rf-006',
    severity: 'medium',
    token: 'XAUT',
    title: 'Regulatory jurisdiction limited',
    description:
      'XAUT operates under El Salvador VASP licensing without equivalent oversight to major financial regulators such as NYDFS, FCA, or MAS. This reduces the enforceability of investor protections in cross-border disputes.',
    dimension: 'Regulatory Clarity',
    detectedAt: 'Jan 1, 2026',
    status: 'active',
  },
  {
    id: 'rf-007',
    severity: 'low',
    token: 'PAXG',
    title: 'Secondary market liquidity thinner on non-ETH chains',
    description:
      'PAXG liquidity on non-Ethereum venues (Solana wrapped, centralized exchange IOUs) is materially thinner than the native ERC-20 market. Slippage exceeds 0.5% for orders above $500K on secondary venues.',
    dimension: 'Market Integrity',
    detectedAt: 'Feb 20, 2026',
    status: 'monitoring',
  },
  {
    id: 'rf-008',
    severity: 'high',
    token: 'XAUT',
    title: 'Custodian report granularity below peer standard',
    description:
      'XAUT custodian reports provide aggregate bar count but do not publish individual bar serial numbers for all reserves. This limits independent verification to aggregate weight rather than specific bar identity.',
    dimension: 'Custody Transparency',
    detectedAt: 'Jan 15, 2026',
    status: 'active',
  },
];

// ── What Changed Items ────────────────────────────────────────
export interface WhatChangedItem {
  id: string;
  week: string;
  token: 'PAXG' | 'XAUT' | 'MARKET';
  headline: string;
  whyItMatters: string;
  bullCase: string;
  bearCase: string;
  category: 'attestation' | 'market' | 'regulatory' | 'custody';
}

export const WHAT_CHANGED_ITEMS: WhatChangedItem[] = [
  {
    id: 'wc-001',
    week: 'Week of Mar 24, 2026',
    token: 'PAXG',
    headline: 'KPMG Q1 2026 attestation published ahead of schedule with full bar-level disclosure',
    whyItMatters:
      'Early, complete attestation reduces the information gap between issuer claims and independently verified reserve status. Bar-level serial disclosure allows on-chain reconciliation by any third party.',
    bullCase:
      'Strengthens Reserve Attestation score toward 95+. Sets a benchmark for the broader tokenized gold sector. Likely to attract institutional allocators requiring verified reserves.',
    bearCase:
      'Attestation is point-in-time. It confirms reserves at the date of publication but does not provide real-time monitoring between reports.',
    category: 'attestation',
  },
  {
    id: 'wc-002',
    week: 'Week of Mar 17, 2026',
    token: 'XAUT',
    headline: 'Wallet concentration in XAUT reaches 41%, highest since October 2024',
    whyItMatters:
      'Concentration increases the potential for large individual redemptions to disrupt on-chain supply and secondary market prices. It also signals that retail distribution has not expanded at the same pace as total supply.',
    bullCase:
      'High concentration may reflect institutional holders with long-term conviction, not speculative positioning. Large holders often reduce turnover volatility.',
    bearCase:
      'A single large redemption by a top-5 holder could reduce circulating supply by 5-8%, compressing liquidity for remaining holders.',
    category: 'market',
  },
  {
    id: 'wc-003',
    week: 'Week of Mar 10, 2026',
    token: 'MARKET',
    headline: 'Gold spot crosses $3,100 per troy ounce for the first time, lifting both token prices',
    whyItMatters:
      'New all-time highs in spot gold increase absolute NAV for both PAXG and XAUT holders. However, they also attract attention to the efficiency and reliability of the tokens as gold exposure vehicles.',
    bullCase:
      'Higher gold prices validate the thesis for tokenized gold as an alternative to ETFs and physical storage. Volumes on both tokens increased 18% week-over-week.',
    bearCase:
      'Premium/discount dynamics can be amplified during rapid spot moves. If arbitrage desks are slow to respond, tokens may deviate from spot more than usual during high-volatility periods.',
    category: 'market',
  },
  {
    id: 'wc-004',
    week: 'Week of Mar 3, 2026',
    token: 'XAUT',
    headline: 'Smart contract edge case patched following responsible disclosure',
    whyItMatters:
      'The vulnerability affected the redemption flow under a specific edge case involving split redemption requests. While no funds were at risk during the exposure window, any unpatched smart contract risk is a material factor in the Smart Contract Security dimension.',
    bullCase:
      'Rapid response (72-hour patch and disclosure) demonstrates a mature security operations posture. Community-driven disclosure suggests active bug bounty engagement.',
    bearCase:
      'The vulnerability was not internally detected. Reliance on external researchers for critical security discovery signals a gap in pre-deployment testing coverage.',
    category: 'custody',
  },
];

// ── Mock Alerts ───────────────────────────────────────────────
export interface AlertConfig {
  id: string;
  name: string;
  token: 'PAXG' | 'XAUT' | 'BOTH';
  condition: string;
  threshold: string;
  delivery: 'email' | 'webhook';
  active: boolean;
  lastTriggered: string | null;
}

export const MOCK_ALERTS: AlertConfig[] = [
  {
    id: 'alert-001',
    name: 'PAXG trust score drop',
    token: 'PAXG',
    condition: 'Trust score change',
    threshold: 'Drop of 3+ points in any 30-day window',
    delivery: 'email',
    active: true,
    lastTriggered: null,
  },
  {
    id: 'alert-002',
    name: 'XAUT attestation delay',
    token: 'XAUT',
    condition: 'Attestation delay',
    threshold: 'Report published more than 7 days late',
    delivery: 'email',
    active: true,
    lastTriggered: 'Feb 14, 2026',
  },
  {
    id: 'alert-003',
    name: 'Premium/discount threshold',
    token: 'BOTH',
    condition: 'Premium or discount exceeds threshold',
    threshold: 'Deviation > 0.5% for 3+ consecutive days',
    delivery: 'webhook',
    active: false,
    lastTriggered: 'Feb 10, 2026',
  },
  {
    id: 'alert-004',
    name: 'XAUT concentration monitor',
    token: 'XAUT',
    condition: 'Wallet concentration change',
    threshold: 'Top 5 wallets exceed 45% of supply',
    delivery: 'email',
    active: true,
    lastTriggered: null,
  },
];

// ── Mock Watchlist ────────────────────────────────────────────
export interface WatchlistItem {
  id: string;
  token: 'PAXG' | 'XAUT';
  addedAt: string;
  notes: string;
}

export const MOCK_WATCHLIST: WatchlistItem[] = [
  {
    id: 'wl-001',
    token: 'PAXG',
    addedAt: 'Jan 15, 2026',
    notes: 'Primary gold token holding. Monitor attestation cycle.',
  },
  {
    id: 'wl-002',
    token: 'XAUT',
    addedAt: 'Feb 3, 2026',
    notes: 'Tracking custody score improvement trajectory.',
  },
];
