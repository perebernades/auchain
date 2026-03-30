import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
} from 'recharts';
import type { PricePoint } from '../../api/coingecko';
import { SkeletonChart } from '../ui/SkeletonCard';

// Each PricePoint here is [timestamp_ms, price_in_xau].
// A value of 1.0 = token trades at exact gold parity.
// Premium % = (xau_price - 1.0) × 100

interface PremiumDiscountChartProps {
  paxgXauHistory: PricePoint[] | undefined;
  xautXauHistory: PricePoint[] | undefined;
  isLoading: boolean;
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

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

  for (const [ts, xauPrice] of paxgHistory) {
    const date = formatDate(ts);
    const entry = map.get(date) ?? { date, ts };
    entry.paxg = parseFloat(((xauPrice - 1.0) * 100).toFixed(2));
    map.set(date, entry);
  }

  for (const [ts, xauPrice] of xautHistory) {
    const date = formatDate(ts);
    const entry = map.get(date) ?? { date, ts };
    entry.xaut = parseFloat(((xauPrice - 1.0) * 100).toFixed(2));
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
          <span className="text-[#E8EDF2] font-mono">
            {p.name}:{' '}
            <span className={p.value >= 0 ? 'text-[#2ECC71]' : 'text-[#E74C3C]'}>
              {p.value >= 0 ? '+' : ''}{p.value.toFixed(2)}%
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

export default function PremiumDiscountChart({
  paxgXauHistory,
  xautXauHistory,
  isLoading,
}: PremiumDiscountChartProps) {
  if (isLoading) return <SkeletonChart height="h-72" />;

  const data = buildChartData(paxgXauHistory ?? [], xautXauHistory ?? []);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] text-[#6B7E94] uppercase tracking-widest">
          Premium / discount vs gold parity (XAU) — historically accurate per date
        </span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E3350" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fill: '#6B7E94', fontSize: 11 }}
            axisLine={{ stroke: '#1E3350' }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: '#6B7E94', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`}
            width={52}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span className="text-[11px] text-[#6B7E94] uppercase tracking-widest">
                {value}
              </span>
            )}
          />
          {/* 0% parity line */}
          <ReferenceLine
            y={0}
            stroke="#E8EDF2"
            strokeDasharray="5 4"
            strokeOpacity={0.3}
            label={{ value: 'Gold parity', position: 'insideTopRight', fill: '#6B7E94', fontSize: 10 }}
          />
          <Line
            type="monotone"
            dataKey="paxg"
            name="PAXG"
            stroke="#C9A84C"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: '#C9A84C', stroke: '#0D1B2A', strokeWidth: 2 }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="xaut"
            name="XAUT"
            stroke="#E8C97A"
            strokeWidth={1.5}
            strokeDasharray="4 2"
            dot={false}
            activeDot={{ r: 4, fill: '#E8C97A', stroke: '#0D1B2A', strokeWidth: 2 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
