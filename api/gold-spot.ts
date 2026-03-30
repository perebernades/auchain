// ============================================================
// AuChain — Edge Proxy: /api/gold-spot
// Fetches live gold spot price (USD/toz) from metals.dev.
//
// Cache strategy: s-maxage=43200 (12 hours)
// = 2 upstream calls per day = ~60 per month
// Well within the 100-request/month plan limit.
//
// API key stored as METALS_DEV_API_KEY Vercel env var.
// Falls back to $3,100/oz static price if key is missing or
// the upstream call fails — chart still renders correctly.
// ============================================================

import type { VercelRequest, VercelResponse } from '@vercel/node';

const FALLBACK_SPOT_USD = 3100;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiKey = process.env.METALS_DEV_API_KEY;

  if (!apiKey) {
    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).json({ gold: FALLBACK_SPOT_USD, source: 'fallback' });
  }

  try {
    const upstream = await fetch(
      `https://api.metals.dev/v1/latest?api_key=${apiKey}&currency=USD&unit=toz`
    );

    if (!upstream.ok) {
      throw new Error(`metals.dev returned ${upstream.status}`);
    }

    const data = await upstream.json() as {
      status: string;
      metals: { gold: number };
    };

    if (data.status !== 'success' || typeof data.metals?.gold !== 'number') {
      throw new Error('Unexpected response shape from metals.dev');
    }

    // 12-hour edge cache — 2 real upstream calls per day maximum
    res.setHeader('Cache-Control', 's-maxage=43200, stale-while-revalidate=3600');
    return res.status(200).json({
      gold: data.metals.gold,
      source: 'live',
      updatedAt: new Date().toISOString(),
    });
  } catch {
    // Degrade gracefully — chart still renders with static fallback
    res.setHeader('Cache-Control', 's-maxage=3600');
    return res.status(200).json({ gold: FALLBACK_SPOT_USD, source: 'fallback' });
  }
}
