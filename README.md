# AuChain – Gold Trust Index

> The first methodology-driven benchmark for tokenized gold products.
> Compare PAXG and XAUT across reserve quality, custody, regulatory clarity, and liquidity — side-by-side with traditional gold ETFs.

---

## Quick Start

```bash
cd auchain
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin) |
| Routing | React Router v6 |
| Data fetching | TanStack Query (React Query) v5 |
| Charts | Recharts |
| Icons | Lucide React |
| Fonts | Inter (Google Fonts) |

---

## Routes

| Path | Page |
|---|---|
| `/` | Transparency Dashboard |
| `/trust-score` | Trust Score |
| `/compare` | ETF Comparison Layer |

---

## Data: Live vs Static

### ✅ Live Data — CoinGecko Free API (no key required)

All live data is fetched client-side from the [CoinGecko public API](https://www.coingecko.com/en/api/documentation) (free tier, no API key needed).

| Data | Endpoint | Used on |
|---|---|---|
| PAXG & XAUT USD price | `/simple/price` | Dashboard |
| XAUT/XAU ratio (premium/discount) | `/simple/price?vs_currencies=xau` | Dashboard charts |
| Token details (market cap, volume, supply, 24h change) | `/coins/{id}` | Dashboard cards |
| 30-day price history | `/coins/{id}/market_chart?days=30` | Premium/Discount & Price History charts |

**Rate limits:** The free CoinGecko tier allows ~30 calls/minute. The app:
- Caches all responses for **5 minutes** (`staleTime`) via React Query
- Shows a **"Rate limited — showing last known data"** banner on HTTP 429
- Does **not retry** on rate limit errors (only retries on network/server errors)

### 🔒 Static Data — Hardcoded in `src/data/staticData.ts`

The following data is **not available from CoinGecko** and is hardcoded as realistic constants based on public issuer disclosures and filings as of Q1 2026:

| Data | Value | Source |
|---|---|---|
| Trust Score — PAXG | 75 / 100 | AuChain composite (7 dimensions) |
| Trust Score — XAUT | 55 / 100 | AuChain composite (7 dimensions) |
| PAXG auditor | Withum (monthly) | Paxos public disclosures |
| XAUT auditor | MHA Cayman (quarterly) | Tether public disclosures |
| PAXG custodian | Brinks (London/NYC) | Paxos T&Cs |
| XAUT custodian | Undisclosed | Tether T&Cs |
| PAXG redemption min | 430 oz (~$1.3M) | Paxos T&Cs |
| XAUT redemption min | 50 oz (~$155K) | Tether T&Cs |
| PAXG regulatory status | NYDFS regulated | NY DFS trust company |
| XAUT regulatory status | Cayman Islands | Tether entity |
| Gold spot reference | ~$3,100/oz | Static fallback (Q1 2026) |
| ETF data (GLD, IAU) | As shown | Public SEC filings |

All static values are clearly commented with `[STATIC]` markers in `src/data/staticData.ts`.

---

## File Structure

```
src/
├── api/
│   └── coingecko.ts          # All CoinGecko API functions
├── data/
│   └── staticData.ts         # Hardcoded audit/custody/trust data [STATIC]
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Sticky top nav with mobile hamburger
│   │   └── Footer.tsx         # Persistent footer
│   ├── ui/
│   │   ├── ScoreBadge.tsx     # Reusable colored badge (green/amber/red/gold)
│   │   ├── StatCard.tsx       # Single-metric labeled card
│   │   ├── SkeletonCard.tsx   # Animated loading placeholder
│   │   └── ErrorState.tsx     # Fetch error display + retry button
│   └── charts/
│       ├── PremiumDiscountChart.tsx  # 30-day spot premium/discount line chart
│       ├── PriceHistoryChart.tsx     # 30-day price area chart (PAXG vs XAUT)
│       └── TrustRadarChart.tsx       # 7-axis trust dimension radar chart
├── pages/
│   ├── Dashboard.tsx          # / — Transparency Dashboard
│   ├── TrustScore.tsx         # /trust-score — Trust Score + methodology
│   └── Compare.tsx            # /compare — ETF Comparison Layer
├── App.tsx                    # Router + layout wrapper
└── main.tsx                   # React Query + BrowserRouter setup
```

---

## Design System

```
--navy:       #0D1B2A   Background
--navy-card:  #132237   Card surfaces
--gold:       #C9A84C   Primary accent
--gold-light: #E8C97A   Hover / highlight
--text:       #E8EDF2   Primary text
--muted:      #6B7E94   Secondary text
--green:      #2ECC71   Positive / safe
--amber:      #F39C12   Warning
--red:        #E74C3C   Danger
```

Typography: **Inter** (Google Fonts) — weights 300–700.

---

## Build for Production

```bash
npm run build       # TypeScript check + Vite build → dist/
npm run preview     # Preview the production build locally
```

---

## Disclaimer

**Not investment advice.** AuChain is a data transparency and benchmarking tool. Trust Scores are a proprietary composite index based on publicly available data. They do not constitute financial, legal, or investment advice. Always do your own research.

Market data provided by [CoinGecko](https://www.coingecko.com). Static data reflects public issuer disclosures as of Q1 2026 and may not reflect current conditions.
