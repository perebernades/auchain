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
import { STATIC_GOLD_SPOT_USD } from '../../data/staticData';
import { SkeletonChart } from '../ui/SkeletonCard';

interface PremiumDiscountChartProps {
  paxgHistory: PricePoint[] | undefined;
  xautHistory: PricePoint[] | undefined;
  isLoading: boolean;
  goldSpot?: number;
  goldSpotSource?: 'live' | 'fallback';
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function calcPremiumPct(price: number, spot: number) {
  return parseFloat((((price - spot) / spot) * 100).toFixed(2));
}

interface ChartPoint {
  date: string;
  ts: number;
  paxg?: number;
  xaut?: number;
}

function buildChartData(
  paxgHistory: PricePoint[],
  xautHistory: PricePoint[],
  spot: number
): ChartPoint[] {
  // Build a map by date string so we can merge both series
  const map = new Map<string, ChartPoint>();

  for (const [ts, price] of paxgHistory) {
    const date = formatDate(ts);
    const entry = map.get(date) ?? { date, ts };
    entry.paxg = calcPremiumPct(price, spot);
    map.set(date, entry);
  }

  for (const [ts, price] of xautHistory) {
    const date = formatDate(ts);
    const entry = map.get(date) ?? { date, ts };
    entry.xaut = calcPremiumPct(price, spot);
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
  paxgHistory,
  xautHistory,
  isLoading,
  goldSpot,
  goldSpotSource,
}: PremiumDiscountChartProps) {
  if (isLoading) return <SkeletonChart height="h-72" />;

  const spot = goldSpot ?? STATIC_GOLD_SPOT_USD;
  const isLive = goldSpotSource === 'live';
  const data = buildChartData(paxgHistory ?? [], xautHistory ?? [], spot);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] text-[#6B7E94] uppercase tracking-widest">
          Spot reference: ${spot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/oz
        </span>
        {isLive ? (
          <span className="text-[10px] bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/25 px-1.5 py-0.5 font-semibold tracking-wide">
            LIVE
          </span>
        ) : (
          <span className="text-[10px] bg-[#F39C12]/10 text-[#F39C12] border border-[#F39C12]/25 px-1.5 py-0.5 font-semibold tracking-wide">
            STATIC
          </span>
        )}
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
            label={{ value: 'Spot parity', position: 'insideTopRight', fill: '#6B7E94', fontSize: 10 }}
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
