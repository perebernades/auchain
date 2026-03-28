import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  Tooltip,
} from 'recharts';
import { TRUST_DIMENSIONS } from '../../data/staticData';

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
            {p.name}: <span className="font-mono font-semibold">{p.value} / 100</span>
          </span>
        </div>
      ))}
    </div>
  );
}

const radarData = TRUST_DIMENSIONS.map((d) => ({
  dimension: d.label,
  PAXG: d.paxg,
  XAUT: d.xaut,
}));

export default function TrustRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
        <PolarGrid stroke="#1E3350" />
        <PolarAngleAxis
          dataKey="dimension"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tick={(props: any) => {
            const { x, y, payload, cx, cy } = props as {
              x: number; y: number;
              payload: { value: string };
              cx: number; cy: number;
            };
            const dx = x - cx;
            const dy = y - cy;
            const textAnchor = dx > 5 ? 'start' : dx < -5 ? 'end' : 'middle';
            const dominantBaseline = dy > 5 ? 'hanging' : dy < -5 ? 'auto' : 'middle';
            return (
              <text
                x={x}
                y={y}
                textAnchor={textAnchor}
                dominantBaseline={dominantBaseline}
                fill="#6B7E94"
                fontSize={11}
                fontFamily="Inter, sans-serif"
              >
                {payload.value}
              </text>
            );
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => (
            <span className="text-[11px] text-[#6B7E94] uppercase tracking-widest">
              {value}
            </span>
          )}
        />
        <Radar
          name="PAXG"
          dataKey="PAXG"
          stroke="#C9A84C"
          strokeWidth={2}
          fill="#C9A84C"
          fillOpacity={0.2}
          dot={false}
        />
        <Radar
          name="XAUT"
          dataKey="XAUT"
          stroke="#F39C12"
          strokeWidth={1.5}
          strokeDasharray="4 2"
          fill="#F39C12"
          fillOpacity={0.15}
          dot={false}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
