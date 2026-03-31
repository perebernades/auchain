import { useState } from 'react';
import { Plus, Trash2, Star, Lock, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../lib/subscriptionContext';
import { TRUST_SCORES } from '../data/staticData';
import { MOCK_WATCHLIST, type WatchlistItem } from '../lib/mockData';
import ScoreBadge from '../components/ui/ScoreBadge';
import FeatureGate from '../components/subscription/FeatureGate';

// ── Watchlist ─────────────────────────────────────────────────

const TOKEN_INFO = {
  PAXG: {
    name: 'PAX Gold',
    issuer: 'Paxos',
    score: TRUST_SCORES.paxg,
    scoreColor: 'text-[#C9A84C]' as const,
    delta7d: +2,
    lastAttestation: 'Mar 2026',
    keyFlag: 'Q1 2026 KPMG attestation complete',
    flagBadge: 'green' as const,
    chain: 'Ethereum',
  },
  XAUT: {
    name: 'Tether Gold',
    issuer: 'Tether',
    score: TRUST_SCORES.xaut,
    scoreColor: 'text-[#F39C12]' as const,
    delta7d: -1,
    lastAttestation: 'Feb 2026',
    keyFlag: 'High wallet concentration (41%)',
    flagBadge: 'red' as const,
    chain: 'Ethereum',
  },
};

// ── Watchlist Card ────────────────────────────────────────────
interface WatchlistCardProps {
  item: WatchlistItem;
  onRemove: (id: string) => void;
}

function WatchlistCard({ item, onRemove }: WatchlistCardProps) {
  const info = TOKEN_INFO[item.token];
  const isUp = info.delta7d >= 0;

  return (
    <div className="bg-[#132237] border border-[#1E3350] hover:border-[#C9A84C]/30 transition-colors p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#E8EDF2] font-bold text-lg">{item.token}</span>
            <span className="text-[10px] px-1.5 py-0.5 bg-[#1E3350] text-[#6B7E94] border border-[#1E3350] font-semibold tracking-wider uppercase">
              {info.chain}
            </span>
          </div>
          <p className="text-[#6B7E94] text-xs">{info.name} · {info.issuer}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`text-2xl font-bold font-mono ${info.scoreColor}`}>
            {info.score}
            <span className="text-sm text-[#6B7E94] font-normal">/100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0 border border-[#1E3350] mb-4">
        <div className="px-3 py-2.5 border-r border-[#1E3350]">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7E94] mb-1">7-day change</p>
          <p className={`text-sm font-semibold flex items-center gap-1 ${isUp ? 'text-[#2ECC71]' : 'text-[#E74C3C]'}`}>
            {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {isUp ? '+' : ''}{info.delta7d} pts
          </p>
        </div>
        <div className="px-3 py-2.5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7E94] mb-1">Last attestation</p>
          <p className="text-[#E8EDF2] text-sm font-semibold">{info.lastAttestation}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <ScoreBadge variant={info.flagBadge} size="sm">{info.keyFlag}</ScoreBadge>
      </div>

      {item.notes && (
        <p className="text-[#6B7E94] text-xs mb-4 italic leading-relaxed">
          Note: {item.notes}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-[#1E3350]">
        <span className="text-[#6B7E94] text-[11px]">Added {item.addedAt}</span>
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-1.5 text-[#6B7E94] hover:text-[#E74C3C] text-xs transition-colors"
        >
          <Trash2 size={12} />
          Remove
        </button>
      </div>
    </div>
  );
}

// ── Add Token Modal ───────────────────────────────────────────
interface AddTokenModalProps {
  existing: string[];
  onAdd: (token: 'PAXG' | 'XAUT', notes: string) => void;
  onClose: () => void;
}

function AddTokenModal({ existing, onAdd, onClose }: AddTokenModalProps) {
  const [selected, setSelected] = useState<'PAXG' | 'XAUT'>('PAXG');
  const [notes, setNotes] = useState('');

  const available = (['PAXG', 'XAUT'] as const).filter((t) => !existing.includes(t));

  if (available.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[#0D1B2A]/80 backdrop-blur-sm" onClick={onClose} />
        <div className="relative bg-[#132237] border border-[#1E3350] p-6 max-w-sm w-full text-center">
          <p className="text-[#E8EDF2] mb-4">All available tokens are already in your watchlist.</p>
          <button onClick={onClose} className="text-[#C9A84C] text-sm hover:underline">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0D1B2A]/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#132237] border border-[#1E3350] p-6 max-w-sm w-full">
        <h3 className="text-[#E8EDF2] font-bold text-base mb-4">Add token to watchlist</h3>

        <div className="mb-4">
          <label className="text-[#6B7E94] text-xs uppercase tracking-widest font-semibold mb-2 block">
            Token
          </label>
          <div className="flex gap-2">
            {available.map((t) => (
              <button
                key={t}
                onClick={() => setSelected(t)}
                className={`flex-1 py-2 text-sm font-semibold border transition-colors ${
                  selected === t
                    ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                    : 'border-[#1E3350] text-[#6B7E94] hover:border-[#C9A84C]/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="text-[#6B7E94] text-xs uppercase tracking-widest font-semibold mb-2 block">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Why you're watching this token..."
            rows={3}
            className="w-full bg-[#0D1B2A] border border-[#1E3350] text-[#E8EDF2] text-sm p-3 focus:border-[#C9A84C]/50 focus:outline-none placeholder:text-[#6B7E94]/50 resize-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { onAdd(selected, notes); }}
            className="flex-1 py-2.5 bg-[#C9A84C] text-[#0D1B2A] text-sm font-bold hover:bg-[#E8C97A] transition-colors"
          >
            Add to watchlist
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 border border-[#1E3350] text-[#6B7E94] text-sm hover:text-[#E8EDF2] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Teaser (Free) ─────────────────────────────────────────────
function WatchlistTeaser() {
  return (
    <div className="flex flex-col gap-6">
      {/* Blurred preview cards */}
      <div className="relative">
        <div className="blur-sm pointer-events-none select-none grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_WATCHLIST.map((item) => (
            <div key={item.id} className="bg-[#132237] border border-[#1E3350] p-5 h-52" />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 bg-[#132237] border border-[#1E3350] px-8 py-6 text-center max-w-sm">
            <div className="w-10 h-10 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
              <Lock size={18} className="text-[#C9A84C]" />
            </div>
            <div>
              <p className="text-[#E8EDF2] font-semibold text-base mb-1">
                Watchlists are a Pro feature
              </p>
              <p className="text-[#6B7E94] text-sm leading-relaxed">
                Track PAXG and XAUT side by side with score deltas, attestation status, and key flags.
              </p>
            </div>
            <Link
              to="/pricing"
              className="px-6 py-2.5 bg-[#C9A84C] text-[#0D1B2A] text-sm font-bold hover:bg-[#E8C97A] transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function Watchlist() {
  const { currentPlan } = useSubscription();
  const [items, setItems] = useState<WatchlistItem[]>(MOCK_WATCHLIST);
  const [showAddModal, setShowAddModal] = useState(false);

  function handleRemove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function handleAdd(token: 'PAXG' | 'XAUT', notes: string) {
    const newItem: WatchlistItem = {
      id: `wl-${Date.now()}`,
      token,
      addedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes,
    };
    setItems((prev) => [...prev, newItem]);
    setShowAddModal(false);
  }

  const isPro = currentPlan === 'pro' || currentPlan === 'institutional';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">

      {/* Header */}
      <div className="border-b border-[#1E3350] pb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-4 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
                Portfolio Tools
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#E8EDF2] tracking-tight mb-1">Watchlist</h1>
            <p className="text-[#6B7E94] text-sm max-w-xl leading-relaxed">
              Track tokenized gold tokens with live trust scores, attestation status, and key risk flags.
            </p>
          </div>
          {isPro && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-semibold hover:bg-[#C9A84C]/20 transition-colors"
            >
              <Plus size={14} />
              Add token
            </button>
          )}
        </div>
      </div>

      {/* Plan gate: show teaser for free, full UI for pro/institutional */}
      <FeatureGate feature="watchlist" mode="block" fallback={<WatchlistTeaser />}>
        <div className="flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="bg-[#132237] border border-[#1E3350] p-12 text-center flex flex-col items-center gap-4">
              <Star size={24} className="text-[#1E3350]" />
              <p className="text-[#E8EDF2] font-semibold">Your watchlist is empty</p>
              <p className="text-[#6B7E94] text-sm">Add PAXG or XAUT to start monitoring their trust scores.</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-semibold hover:bg-[#C9A84C]/20 transition-colors"
              >
                <Plus size={14} />
                Add your first token
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <WatchlistCard key={item.id} item={item} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </div>
      </FeatureGate>

      {/* Add modal */}
      {showAddModal && (
        <AddTokenModal
          existing={items.map((i) => i.token)}
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
