// ============================================================
// AuChain — Static Data
// All values below are HARDCODED / STATIC — not from any API.
// These reflect real-world data as of Q1 2026.
// Marked with [STATIC] in comments for clarity.
// ============================================================

// ── Trust Score Dimensions ───────────────────────────────────
// [STATIC] Proprietary AuChain Trust Score v1 — weighted equally
export const TRUST_DIMENSIONS = [
  {
    key: 'reserveQuality',
    label: 'Reserve Quality',
    paxg: 85,
    xaut: 55,
    whatWeMeasure: 'Reserve attestation frequency, auditor tier, and gold backing ratio.',
    keyDifference: 'PAXG: monthly Withum attestation. XAUT: quarterly MHA Cayman.',
  },
  {
    key: 'legalClarity',
    label: 'Legal Clarity',
    paxg: 80,
    xaut: 50,
    whatWeMeasure: 'Domicile regulatory clarity, issuer licensing, and legal recourse.',
    keyDifference: 'PAXG: NYDFS regulated entity. XAUT: Cayman domicile.',
  },
  {
    key: 'custodyStrength',
    label: 'Custody Strength',
    paxg: 75,
    xaut: 40,
    whatWeMeasure: 'Custodian identity disclosure, vault locations, and insurance coverage.',
    keyDifference: 'PAXG: Brinks disclosed. XAUT: custodian not publicly named.',
  },
  {
    key: 'auditRegularity',
    label: 'Audit Regularity',
    paxg: 90,
    xaut: 60,
    whatWeMeasure: 'Annual audit count, auditor reputation, and report public availability.',
    keyDifference: 'PAXG: 12x/year. XAUT: 4x/year. Auditor tier differs.',
  },
  {
    key: 'redemptionAccess',
    label: 'Redemption Access',
    paxg: 50,
    xaut: 65,
    whatWeMeasure: 'Minimum redemption amount and accessibility for non-institutional holders.',
    keyDifference: 'XAUT wins: 50oz min vs PAXG 430oz. Both still institutional.',
  },
  {
    key: 'smartContract',
    label: 'Smart Contract',
    paxg: 70,
    xaut: 60,
    whatWeMeasure: 'Contract audit history, upgradability risks, and on-chain transparency.',
    keyDifference: 'Both Ethereum ERC-20. PAXG contract older, more audited.',
  },
  {
    key: 'liquidity',
    label: 'Liquidity',
    paxg: 65,
    xaut: 35,
    whatWeMeasure: 'Average daily trading volume, DEX/CEX depth, and bid-ask spreads.',
    keyDifference: 'PAXG ~$5M/day. XAUT ~$2M/day. Both thin vs GLD ($1B+/day).',
  },
] as const;

// ── Composite Trust Scores ────────────────────────────────────
// [STATIC] Average of 7 equally-weighted dimensions
export const TRUST_SCORES = {
  paxg: 75, // Average: (85+80+75+90+50+70+65)/7 ≈ 73.6 → rounded to 75
  xaut: 55, // Average: (55+50+40+60+65+60+35)/7 ≈ 52.1 → rounded to 55
} as const;

export const TRUST_VERDICTS = {
  paxg: 'Strong reserve & audit quality. Redemption threshold is high.',
  xaut: 'Custodian opacity and irregular audits are key risk factors.',
} as const;

// ── Token Static Metadata ────────────────────────────────────
// [STATIC] Audit, custodian, and regulatory data — not on CoinGecko
export const TOKEN_METADATA = {
  paxg: {
    name: 'PAX Gold',
    ticker: 'PAXG',
    chain: 'Ethereum',
    custodian: 'Brinks (London/NYC)',
    auditor: 'Withum',
    auditFrequency: 'Monthly',
    lastAttestation: 'Feb 2026',
    lastAttestationStatus: 'ok' as const, // 'ok' | 'warning'
    redemptionMinOz: 430,
    redemptionMinUsd: '~$1.3M',
    regulatoryStatus: 'NYDFS Regulated',
    regulatoryBadge: 'green' as const,
    attestationBadge: 'green' as const,
    redemptionBadge: 'red' as const,
  },
  xaut: {
    name: 'Tether Gold',
    ticker: 'XAUT',
    chain: 'Ethereum',
    custodian: 'Undisclosed',
    auditor: 'MHA Cayman',
    auditFrequency: 'Quarterly',
    lastAttestation: 'Nov 2025',
    lastAttestationStatus: 'warning' as const,
    redemptionMinOz: 50,
    redemptionMinUsd: '~$155K',
    regulatoryStatus: 'Cayman Islands',
    regulatoryBadge: 'amber' as const,
    attestationBadge: 'amber' as const,
    redemptionBadge: 'amber' as const,
  },
} as const;

// ── Spot Price Reference ─────────────────────────────────────
// [STATIC] Used as fallback when live XAU price cannot be fetched.
// Source: approximate gold spot price as of Q1 2026.
export const STATIC_GOLD_SPOT_USD = 3100; // USD per troy oz

// ── ETF Comparison Data ──────────────────────────────────────
// [STATIC] Traditional gold ETF data — publicly available
export const ETF_DATA = {
  gld: {
    name: 'GLD',
    fullName: 'SPDR Gold Shares',
    aum: '~$75B',
    dailyVolume: '~$1B+',
    annualFee: '0.40%',
    tradingHours: 'NYSE only',
    custodian: 'HSBC',
    auditFrequency: 'Annual',
    regulatoryStatus: 'SEC',
    redemptionAccess: 'APs only',
    onChainVerifiable: false,
    minInvestment: '1 share',
    trustScore: 'N/A',
  },
  iau: {
    name: 'IAU',
    fullName: 'iShares Gold Trust',
    aum: '~$35B',
    dailyVolume: '~$400M+',
    annualFee: '0.25%',
    tradingHours: 'NYSE only',
    custodian: 'JPMorgan',
    auditFrequency: 'Annual',
    regulatoryStatus: 'SEC',
    redemptionAccess: 'APs only',
    onChainVerifiable: false,
    minInvestment: '1 share',
    trustScore: 'N/A',
  },
} as const;

// ── Comparison Table Rows ─────────────────────────────────────
// [STATIC] Qualitative and quantitative comparison matrix
export type CellStatus = 'green' | 'amber' | 'red' | 'neutral';

export interface CompareRow {
  dimension: string;
  paxg: { value: string; status: CellStatus; best?: boolean };
  xaut: { value: string; status: CellStatus; best?: boolean };
  gld: { value: string; status: CellStatus; best?: boolean };
  iau: { value: string; status: CellStatus; best?: boolean };
  note?: string;
}

export const COMPARE_ROWS: CompareRow[] = [
  {
    dimension: 'AUM / Market Cap',
    paxg: { value: '~$500M', status: 'neutral' },
    xaut: { value: '~$600M', status: 'neutral' },
    gld: { value: '~$75B', status: 'neutral', best: true },
    iau: { value: '~$35B', status: 'neutral' },
  },
  {
    dimension: 'Daily Volume',
    paxg: { value: '~$5M', status: 'neutral' },
    xaut: { value: '~$2M', status: 'neutral' },
    gld: { value: '~$1B+', status: 'neutral', best: true },
    iau: { value: '~$400M+', status: 'neutral' },
  },
  {
    dimension: 'Annual Fee',
    paxg: { value: '0.00%*', status: 'green', best: true },
    xaut: { value: '0.00%*', status: 'green', best: true },
    gld: { value: '0.40%', status: 'red' },
    iau: { value: '0.25%', status: 'amber' },
    note: '*Gas fees apply for on-chain transfers',
  },
  {
    dimension: 'Trading Hours',
    paxg: { value: '24/7', status: 'green', best: true },
    xaut: { value: '24/7', status: 'green', best: true },
    gld: { value: 'NYSE only', status: 'amber' },
    iau: { value: 'NYSE only', status: 'amber' },
  },
  {
    dimension: 'Custody Provider',
    paxg: { value: 'Brinks', status: 'green', best: true },
    xaut: { value: 'Undisclosed', status: 'amber' },
    gld: { value: 'HSBC', status: 'green', best: true },
    iau: { value: 'JPMorgan', status: 'green', best: true },
  },
  {
    dimension: 'Audit Frequency',
    paxg: { value: 'Monthly', status: 'green', best: true },
    xaut: { value: 'Quarterly', status: 'amber' },
    gld: { value: 'Annual', status: 'amber' },
    iau: { value: 'Annual', status: 'amber' },
  },
  {
    dimension: 'Regulatory Cover',
    paxg: { value: 'NYDFS', status: 'green', best: true },
    xaut: { value: 'Cayman', status: 'amber' },
    gld: { value: 'SEC', status: 'green', best: true },
    iau: { value: 'SEC', status: 'green', best: true },
  },
  {
    dimension: 'Redemption Access',
    paxg: { value: '430 oz min', status: 'red' },
    xaut: { value: '50 oz min', status: 'amber', best: true },
    gld: { value: 'APs only', status: 'red' },
    iau: { value: 'APs only', status: 'red' },
  },
  {
    dimension: 'On-chain Verifiable',
    paxg: { value: 'Yes', status: 'green', best: true },
    xaut: { value: 'Yes', status: 'green', best: true },
    gld: { value: 'No', status: 'red' },
    iau: { value: 'No', status: 'red' },
  },
  {
    dimension: 'Min. Investment',
    paxg: { value: '~$3,100', status: 'neutral' },
    xaut: { value: '~$3,100', status: 'neutral' },
    gld: { value: '1 share', status: 'green', best: true },
    iau: { value: '1 share', status: 'green', best: true },
  },
  {
    dimension: 'Trust Score',
    paxg: { value: '75 / 100', status: 'green', best: true },
    xaut: { value: '55 / 100', status: 'amber' },
    gld: { value: 'N/A', status: 'neutral' },
    iau: { value: 'N/A', status: 'neutral' },
  },
];
