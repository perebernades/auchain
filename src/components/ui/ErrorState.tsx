import { AlertTriangle, RefreshCw, Wifi } from 'lucide-react';

interface ErrorStateProps {
  error: Error | null;
  onRetry?: () => void;
  compact?: boolean;
}

export default function ErrorState({ error, onRetry, compact = false }: ErrorStateProps) {
  const isRateLimit = (error as any)?.isRateLimit === true;

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-[#E74C3C]/10 border border-[#E74C3C]/25 text-[#E74C3C] text-xs">
        <AlertTriangle size={13} />
        <span>{isRateLimit ? 'Rate limited — showing last known data' : 'Failed to load data'}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto flex items-center gap-1 hover:text-[#E8EDF2] transition-colors"
          >
            <RefreshCw size={11} />
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10 bg-[#132237] border border-[#1E3350] text-center">
      <div className="p-3 bg-[#E74C3C]/10 border border-[#E74C3C]/20">
        {isRateLimit ? (
          <Wifi size={24} className="text-[#F39C12]" />
        ) : (
          <AlertTriangle size={24} className="text-[#E74C3C]" />
        )}
      </div>

      <div>
        <p className={`font-semibold text-sm mb-1 ${isRateLimit ? 'text-[#F39C12]' : 'text-[#E74C3C]'}`}>
          {isRateLimit ? 'CoinGecko Rate Limit Reached' : 'Data Fetch Failed'}
        </p>
        <p className="text-[#6B7E94] text-xs max-w-xs">
          {isRateLimit
            ? 'The free CoinGecko API rate limit was hit. Showing last known data. Please wait a moment before retrying.'
            : error?.message ?? 'An unexpected error occurred while fetching live data.'}
        </p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 border border-[#C9A84C]/30 text-[#C9A84C] text-xs font-semibold uppercase tracking-wide transition-colors"
        >
          <RefreshCw size={13} />
          Retry
        </button>
      )}
    </div>
  );
}

// ── RateLimitBanner ───────────────────────────────────────────
// Thin banner shown at page top when rate limited but cached data exists
export function RateLimitBanner() {
  return (
    <div className="w-full bg-[#F39C12]/10 border-b border-[#F39C12]/25 px-4 py-2 flex items-center justify-center gap-2">
      <Wifi size={13} className="text-[#F39C12] shrink-0" />
      <span className="text-[#F39C12] text-xs font-medium">
        Rate limited — showing last known data. Live prices may be delayed.
      </span>
    </div>
  );
}
