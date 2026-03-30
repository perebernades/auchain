// ============================================================
// AuChain — CoinGecko API Module
// All requests go through Vercel edge proxy functions (/api/*)
// which cache responses for 5 min server-side (s-maxage=300).
// CoinGecko only receives ONE real call per 5-min window
// regardless of how many concurrent users are on the site.
// ============================================================

// Same-origin proxy — works in both prod and `vercel dev`
const PROXY = '/api';

// ── Shared fetch helper ──────────────────────────────────────
async function cgFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (res.status === 429) {
    const err = new Error('Rate limited by CoinGecko API (429). Showing cached data.');
    (err as any).isRateLimit = true;
    throw err;
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// ── Types ────────────────────────────────────────────────────
export interface GoldPrices {
  xaut: number;
  paxg: number;
  xautInXau: number;
  premiumDiscountPct: number;
}

export interface XautXauPrice {
  xautInXau: number;
  premiumDiscountPct: number;
}

export interface TokenDetails {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
  price_change_percentage_24h: number;
}

export type PricePoint = [number, number]; // [timestamp_ms, price_usd]

export interface GoldSpotPrice {
  gold: number;
  source: 'live' | 'fallback';
  updatedAt?: string;
}

// ── 1. getGoldSpotPrice ─────────────────────────────────────
// Hits /api/prices — edge-cached 5 min on Vercel
export async function getGoldSpotPrice(): Promise<GoldPrices> {
  return cgFetch<GoldPrices>(`${PROXY}/prices`);
}

// ── XAUT/XAU price for premium/discount calc ─────────────────
// Derived from the same /api/prices response — no extra upstream call
export async function getXautXauPrice(): Promise<XautXauPrice> {
  const data = await cgFetch<GoldPrices>(`${PROXY}/prices`);
  return {
    xautInXau: data.xautInXau,
    premiumDiscountPct: data.premiumDiscountPct,
  };
}

// ── 2. getTokenDetails ───────────────────────────────────────
// Hits /api/token/[id] — edge-cached 5 min on Vercel
export async function getTokenDetails(
  id: 'pax-gold' | 'tether-gold'
): Promise<TokenDetails> {
  return cgFetch<TokenDetails>(`${PROXY}/token/${id}`);
}

// ── Live gold spot price ─────────────────────────────────────
// Hits /api/gold-spot — edge-cached 12 h on Vercel (≤2 upstream calls/day)
export async function getLiveGoldSpot(): Promise<GoldSpotPrice> {
  return cgFetch<GoldSpotPrice>(`${PROXY}/gold-spot`);
}

// ── 3. getPriceHistory ───────────────────────────────────────
// Hits /api/history/[id] — edge-cached 5 min on Vercel
export async function getPriceHistory(
  id: 'pax-gold' | 'tether-gold',
  days: number = 30
): Promise<PricePoint[]> {
  const data = await cgFetch<{ prices: PricePoint[] }>(
    `${PROXY}/history/${id}?days=${days}`
  );
  return data.prices ?? [];
}
