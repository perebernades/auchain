import {
  ResponsiveContainer,
  AreaChart,
  Area,
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
}

function buildChartData(
  paxgHistory: PricePoint[],
  xautHistory: PricePoint[]
): ChartPoint[] {
  const map = new Map<string, ChartPoint>();

  for (const [ts, price] of paxgHistory) {
    const date = formatDate(ts);
    const entry = map.get(date) ?? { date, ts };
    entry.paxg = price;
    map.set(date, entry);
  }

  for (const [ts, price] of xautHistory) {
    const date = formatDate(ts);
    const entry = map.get(date) ?? { date, ts };
    entry.xaut = price;
    map.set(date, entry);
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
  isLoading,
}: PriceHistoryChartProps) {
  if (isLoading) return <SkeletonChart height="h-72" />;

  const data = buildChartData(paxgHistory ?? [], xautHistory ?? []);

  // Compute Y domain with 1% padding
  const allPrices = data.flatMap((d) => [d.paxg, d.xaut].filter(Boolean) as number[]);
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
      </AreaChart>
    </ResponsiveContainer>
  );
}
