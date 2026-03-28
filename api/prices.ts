// ============================================================
// AuChain — Edge Proxy: /api/prices
// Fetches USD prices for PAXG + XAUT and the XAUT/XAU ratio.
// Cached at Vercel's edge for 5 minutes (s-maxage=300).
// All visitors share one upstream CoinGecko call per window.
// ============================================================

import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE = 'https://api.coingecko.com/api/v3';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Fetch USD prices and XAU ratio in parallel
    const [usdRes, xauRes] = await Promise.all([
      fetch(`${BASE}/simple/price?ids=tether-gold%2Cpax-gold&vs_currencies=usd&precision=2`),
      fetch(`${BASE}/simple/price?ids=tether-gold&vs_currencies=xau&precision=6`),
    ]);

    if (usdRes.status === 429 || xauRes.status === 429) {
      return res.status(429).json({ error: 'CoinGecko rate limit reached' });
    }

    if (!usdRes.ok) {
      return res.status(usdRes.status).json({ error: `CoinGecko error: ${usdRes.statusText}` });
    }

    const [usdData, xauData] = await Promise.all([
      usdRes.json() as Promise<{ 'tether-gold': { usd: number }; 'pax-gold': { usd: number } }>,
      xauRes.ok
        ? (xauRes.json() as Promise<{ 'tether-gold': { xau: number } }>)
        : Promise.resolve({ 'tether-gold': { xau: 1.0 } }),
    ]);

    const xautInXau = xauData['tether-gold']?.xau ?? 1.0;

    // Cache at Vercel edge for 5 min; serve stale for 60s while revalidating
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return res.status(200).json({
      xaut: usdData['tether-gold']?.usd ?? 0,
      paxg: usdData['pax-gold']?.usd ?? 0,
      xautInXau,
      premiumDiscountPct: parseFloat(((xautInXau - 1.0) * 100).toFixed(4)),
    });
  } catch (err) {
    return res.status(500).json({ error: 'Proxy fetch failed', detail: String(err) });
  }
}
