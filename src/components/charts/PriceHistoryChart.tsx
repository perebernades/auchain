import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { PricePoint } from '../../api/coingecko';
import { SkeletonChart } from '../ui/SkeletonCard';

interface PriceHistoryChartProps {
  paxgHistory: PricePoint[] | undefined;
  xautHistory: PricePoint[] | undefined;
  paxgXauHistory?: PricePoint[] | undefined;
  xautXauHistory?: PricePoint[] | undefined;
  isLoading: boolean;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

const fmtUsd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

interface ChartPoint {
  date: string;
  ts: number;
  paxg?: number;
  xaut?: number;
  gold?: number;
  // Intermediate accumulators for gold derivation
  _paxgUsd?: number;
  _paxgXau?: number;
  _xautUsd?: number;
  _xautXau?: number;
}

function buildChartData(
  paxgHistory: PricePoint[],
  xautHistory: PricePoint[],
  paxgXauHistory: PricePoint[],
  xautXauHistory: PricePoint[]
): ChartPoint[] {
  const map = new Map<string, ChartPoint>();

  for (const [ts, price] of paxgHistory) {
    const date = formatDate(ts);
    const entry = map.get(date) ?? { date, ts };
    entry.paxg = price;
    entry._paxgUsd = price;
    map.set(date, entry);
  }

  for (const [ts, price] of xautHistory) {
    const date = formatDate(ts);
    const entry = map.get(date) ?? { date, ts };
    entry.xaut = price;
    entry._xautUsd = price;
    map.set(date, entry);
  }

  for (const [ts, xauPrice] of paxgXauHistory) {
    const date = formatDate(ts);
    const entry = map.get(date) ?? { date, ts };
    entry._paxgXau = xauPrice;
    map.set(date, entry);
  }

  for (const [ts, xauPrice] of xautXauHistory) {
    const date = formatDate(ts);
    const entry = map.get(date) ?? { date, ts };
    entry._xautXau = xauPrice;
    map.set(date, entry);
  }

  // Derive gold spot price per date: token_usd / token_xau = 1 oz gold in USD
  // Average PAXG and XAUT estimates where both are available; fall back to one if only one exists.
  for (const entry of map.values()) {
    const estimates: number[] = [];
    if (entry._paxgUsd && entry._paxgXau && entry._paxgXau > 0) {
      estimates.push(entry._paxgUsd / entry._paxgXau);
    }
    if (entry._xautUsd && entry._xautXau && entry._xautXau > 0) {
      estimates.push(entry._xautUsd / entry._xautXau);
    }
    if (estimates.length > 0) {
      entry.gold = parseFloat(
        (estimates.reduce((a, b) => a + b, 0) / estimates.length).toFixed(2)
      );
    }
    // Clean up accumulators
    delete entry._paxgUsd;
    delete entry._paxgXau;
    delete entry._xautUsd;
    delete entry._xautXau;
  }

  return Array.from(map.values()).sort((a, b) => a.ts - b.ts);
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0D1B2A] border border-[#1E3350] px-3 py-2 text-xs shadow-lg">
      <p className="text-[#6B7E94] mb-1.5 font-medium">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 py-0.5">
          <span className="w-2 h-2 shrink-0" style={{ backgroundColor: p.color }} />
          <span className="text-[#E8EDF2]">
            {p.name}:{' '}
            <span className="font-mono font-semibold">{fmtUsd.format(p.value)}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PriceHistoryChart({
  paxgHistory,
  xautHistory,
  paxgXauHistory,
  xautXauHistory,
  isLoading,
}: PriceHistoryChartProps) {
  if (isLoading) return <SkeletonChart height="h-72" />;

  const data = buildChartData(
    paxgHistory ?? [],
    xautHistory ?? [],
    paxgXauHistory ?? [],
    xautXauHistory ?? []
  );

  const showGold = (paxgXauHistory?.length ?? 0) > 0 || (xautXauHistory?.length ?? 0) > 0;

  // Compute Y domain across all series with 5% padding
  const allPrices = data.flatMap((d) =>
    [d.paxg, d.xaut, showGold ? d.gold : undefined].filter((v): v is number => v != null)
  );
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const padding = (maxPrice - minPrice) * 0.05;
  const yDomain: [number, number] = [
    Math.floor(minPrice - padding),
    Math.ceil(maxPrice + padding),
  ];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="paxgGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="xautGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E8C97A" stopOpacity={0.12} />
            <stop offset="95%" stopColor="#E8C97A" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E3350" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: '#6B7E94', fontSize: 11 }}
          axisLine={{ stroke: '#1E3350' }}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          domain={yDomain}
          tick={{ fill: '#6B7E94', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => fmtUsd.format(v)}
          width={68}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => (
            <span className="text-[11px] text-[#6B7E94] uppercase tracking-widest">
              {value}
            </span>
          )}
        />
        <Area
          type="monotone"
          dataKey="paxg"
          name="PAXG"
          stroke="#C9A84C"
          strokeWidth={2}
          fill="url(#paxgGrad)"
          dot={false}
          activeDot={{ r: 4, fill: '#C9A84C', stroke: '#0D1B2A', strokeWidth: 2 }}
          connectNulls
        />
        <Area
          type="monotone"
          dataKey="xaut"
          name="XAUT"
          stroke="#E8C97A"
          strokeWidth={1.5}
          strokeDasharray="4 2"
          fill="url(#xautGrad)"
          dot={false}
          activeDot={{ r: 4, fill: '#E8C97A', stroke: '#0D1B2A', strokeWidth: 2 }}
          connectNulls
        />
        {showGold && (
          <Line
            type="monotone"
            dataKey="gold"
            name="Gold Spot"
            stroke="#94A3B8"
            strokeWidth={1.5}
            strokeDasharray="6 3"
            dot={false}
            activeDot={{ r: 4, fill: '#94A3B8', stroke: '#0D1B2A', strokeWidth: 2 }}
            connectNulls
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}
