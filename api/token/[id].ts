// ============================================================
// AuChain — Edge Proxy: /api/token/[id]
// Fetches on-chain market data for pax-gold or tether-gold.
// Cached at Vercel's edge for 5 minutes (s-maxage=300).
// ============================================================

import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE = 'https://api.coingecko.com/api/v3';
const VALID_IDS = new Set(['pax-gold', 'tether-gold']);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;
  const tokenId = Array.isArray(id) ? id[0] : id;

  if (!tokenId || !VALID_IDS.has(tokenId)) {
    return res.status(400).json({ error: 'Invalid token id. Use pax-gold or tether-gold.' });
  }

  try {
    const upstream = await fetch(
      `${BASE}/coins/${tokenId}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
    );

    if (upstream.status === 429) {
      return res.status(429).json({ error: 'CoinGecko rate limit reached' });
    }

    if (!upstream.ok) {
      return res.status(upstream.status).json({ error: `CoinGecko error: ${upstream.statusText}` });
    }

    const data = await upstream.json() as {
      id: string;
      name: string;
      symbol: string;
      market_data: {
        current_price: { usd: number };
        market_cap: { usd: number };
        total_volume: { usd: number };
        circulating_supply: number;
        total_supply: number;
        price_change_percentage_24h: number;
      };
    };

    const md = data.market_data;

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return res.status(200).json({
      id: data.id,
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      current_price: md.current_price.usd,
      market_cap: md.market_cap.usd,
      total_volume: md.total_volume.usd,
      circulating_supply: md.circulating_supply,
      total_supply: md.total_supply,
      price_change_percentage_24h: md.price_change_percentage_24h,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Proxy fetch failed', detail: String(err) });
  }
}
