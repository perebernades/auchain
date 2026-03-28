// ============================================================
// AuChain — Edge Proxy: /api/history/[id]
// Fetches 30-day price history for pax-gold or tether-gold.
// Cached at Vercel's edge for 5 minutes (s-maxage=300).
// Historical data changes slowly — safe to cache aggressively.
// ============================================================

import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE = 'https://api.coingecko.com/api/v3';
const VALID_IDS = new Set(['pax-gold', 'tether-gold']);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id, days } = req.query;
  const tokenId = Array.isArray(id) ? id[0] : id;
  const numDays = Array.isArray(days) ? days[0] : (days ?? '30');

  if (!tokenId || !VALID_IDS.has(tokenId)) {
    return res.status(400).json({ error: 'Invalid token id. Use pax-gold or tether-gold.' });
  }

  // Clamp days to a safe range
  const safeDays = Math.min(Math.max(parseInt(numDays, 10) || 30, 1), 365);

  try {
    const upstream = await fetch(
      `${BASE}/coins/${tokenId}/market_chart?vs_currency=usd&days=${safeDays}&interval=daily`
    );

    if (upstream.status === 429) {
      return res.status(429).json({ error: 'CoinGecko rate limit reached' });
    }

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `CoinGecko error: ${upstream.statusText}` });
    }

    const data = await upstream.json() as { prices: [number, number][] };

    // Historical data changes slowly — cache for 5 min, stale-while-revalidate 2 min
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=120');
    return res.status(200).json({ prices: data.prices ?? [] });
  } catch (err) {
    return res.status(500).json({ error: 'Proxy fetch failed', detail: String(err) });
  }
}
