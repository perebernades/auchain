import { useState } from 'react';
import { Bell, Plus, X, Lock, ToggleLeft, ToggleRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubscription } from '../lib/subscriptionContext';
import { MOCK_ALERTS, type AlertConfig } from '../lib/mockData';
import ScoreBadge from '../components/ui/ScoreBadge';
import FeatureGate from '../components/subscription/FeatureGate';

// ── Alerts Page ───────────────────────────────────────────────

type TabId = 'active' | 'triggered' | 'settings';

const TABS: { id: TabId; label: string }[] = [
  { id: 'active', label: 'Active Alerts' },
  { id: 'triggered', label: 'Triggered' },
  { id: 'settings', label: 'Settings' },
];

// ── Alert Card ────────────────────────────────────────────────
interface AlertCardProps {
  alert: AlertConfig;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function AlertCard({ alert, onToggle, onDelete }: AlertCardProps) {
  const tokenBadge =
    alert.token === 'PAXG'
      ? ('gold' as const)
      : alert.token === 'XAUT'
      ? ('amber' as const)
      : ('neutral' as const);

  return (
    <div
      className={`bg-[#132237] border transition-colors p-5 ${
        alert.active ? 'border-[#1E3350]' : 'border-[#1E3350]/50 opacity-60'
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[#E8EDF2] font-semibold text-sm">{alert.name}</span>
            <ScoreBadge variant={tokenBadge} size="sm">{alert.token}</ScoreBadge>
            <ScoreBadge variant={alert.delivery === 'email' ? 'neutral' : 'gold'} size="sm">
              {alert.delivery}
            </ScoreBadge>
          </div>
          <p className="text-[#6B7E94] text-xs">{alert.condition}</p>
          <p className="text-[#E8EDF2] text-xs mt-1 font-medium">Threshold: {alert.threshold}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onToggle(alert.id)}
            className="text-[#6B7E94] hover:text-[#C9A84C] transition-colors"
            title={alert.active ? 'Disable alert' : 'Enable alert'}
          >
            {alert.active ? (
              <ToggleRight size={20} className="text-[#2ECC71]" />
            ) : (
              <ToggleLeft size={20} />
            )}
          </button>
          <button
            onClick={() => onDelete(alert.id)}
            className="text-[#6B7E94] hover:text-[#E74C3C] transition-colors"
            title="Delete alert"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="pt-3 border-t border-[#1E3350] flex items-center justify-between">
        <span className="text-[#6B7E94] text-[11px]">
          {alert.lastTriggered
            ? `Last triggered: ${alert.lastTriggered}`
            : 'Not yet triggered'}
        </span>
        <span className={`text-[11px] font-semibold ${alert.active ? 'text-[#2ECC71]' : 'text-[#6B7E94]'}`}>
          {alert.active ? 'Active' : 'Paused'}
        </span>
      </div>
    </div>
  );
}

// ── Create Alert Form ─────────────────────────────────────────
interface CreateAlertFormProps {
  onSave: (alert: AlertConfig) => void;
  onCancel: () => void;
}

const SIGNAL_TYPES = [
  'Trust score change',
  'Attestation delay',
  'Premium/discount threshold',
  'Wallet concentration change',
  'Risk flag status change',
];

function CreateAlertForm({ onSave, onCancel }: CreateAlertFormProps) {
  const [name, setName] = useState('');
  const [token, setToken] = useState<'PAXG' | 'XAUT' | 'BOTH'>('PAXG');
  const [signalType, setSignalType] = useState(SIGNAL_TYPES[0]);
  const [threshold, setThreshold] = useState('');
  const [delivery, setDelivery] = useState<'email' | 'webhook'>('email');

  function handleSave() {
    if (!name.trim() || !threshold.trim()) return;
    onSave({
      id: `alert-${Date.now()}`,
      name: name.trim(),
      token,
      condition: signalType,
      threshold: threshold.trim(),
      delivery,
      active: true,
      lastTriggered: null,
    });
  }

  return (
    <div className="bg-[#132237] border border-[#C9A84C]/30 p-6">
      <h3 className="text-[#E8EDF2] font-bold text-sm mb-5 flex items-center gap-2">
        <Plus size={14} className="text-[#C9A84C]" />
        Create alert
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Name */}
        <div className="sm:col-span-2">
          <label className="text-[#6B7E94] text-xs uppercase tracking-widest font-semibold mb-1.5 block">
            Alert name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. PAXG trust drop monitor"
            className="w-full bg-[#0D1B2A] border border-[#1E3350] text-[#E8EDF2] text-sm px-3 py-2.5 focus:border-[#C9A84C]/50 focus:outline-none placeholder:text-[#6B7E94]/50"
          />
        </div>

        {/* Token */}
        <div>
          <label className="text-[#6B7E94] text-xs uppercase tracking-widest font-semibold mb-1.5 block">
            Token
          </label>
          <div className="flex gap-2">
            {(['PAXG', 'XAUT', 'BOTH'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setToken(t)}
                className={`flex-1 py-2 text-xs font-semibold border transition-colors ${
                  token === t
                    ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                    : 'border-[#1E3350] text-[#6B7E94] hover:border-[#C9A84C]/30'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Signal type */}
        <div>
          <label className="text-[#6B7E94] text-xs uppercase tracking-widest font-semibold mb-1.5 block">
            Signal type
          </label>
          <select
            value={signalType}
            onChange={(e) => setSignalType(e.target.value)}
            className="w-full bg-[#0D1B2A] border border-[#1E3350] text-[#E8EDF2] text-sm px-3 py-2.5 focus:border-[#C9A84C]/50 focus:outline-none"
          >
            {SIGNAL_TYPES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Threshold */}
        <div>
          <label className="text-[#6B7E94] text-xs uppercase tracking-widest font-semibold mb-1.5 block">
            Threshold
          </label>
          <input
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="e.g. Drop of 3+ points"
            className="w-full bg-[#0D1B2A] border border-[#1E3350] text-[#E8EDF2] text-sm px-3 py-2.5 focus:border-[#C9A84C]/50 focus:outline-none placeholder:text-[#6B7E94]/50"
          />
        </div>

        {/* Delivery */}
        <div>
          <label className="text-[#6B7E94] text-xs uppercase tracking-widest font-semibold mb-1.5 block">
            Delivery
          </label>
          <div className="flex gap-2">
            {(['email', 'webhook'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDelivery(d)}
                className={`flex-1 py-2 text-xs font-semibold border transition-colors capitalize ${
                  delivery === d
                    ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                    : 'border-[#1E3350] text-[#6B7E94] hover:border-[#C9A84C]/30'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSave}
          disabled={!name.trim() || !threshold.trim()}
          className="px-5 py-2 bg-[#C9A84C] text-[#0D1B2A] text-sm font-bold hover:bg-[#E8C97A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save alert
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-[#1E3350] text-[#6B7E94] text-sm hover:text-[#E8EDF2] transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Free Locked State ─────────────────────────────────────────
function AlertsLockedState() {
  return (
    <div className="bg-[#132237] border border-[#1E3350] p-12 text-center flex flex-col items-center gap-5">
      <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
        <Lock size={20} className="text-[#C9A84C]" />
      </div>
      <div>
        <p className="text-[#E8EDF2] font-bold text-lg mb-2">Custom alerts require Pro</p>
        <p className="text-[#6B7E94] text-sm leading-relaxed max-w-md mx-auto">
          Set up real-time alerts for trust score changes, attestation delays, premium thresholds, and more.
          Delivered by email or webhook.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/pricing"
          className="px-6 py-2.5 bg-[#C9A84C] text-[#0D1B2A] text-sm font-bold hover:bg-[#E8C97A] transition-colors"
        >
          Upgrade to Pro
        </Link>
        <Link
          to="/pricing"
          className="px-6 py-2.5 border border-[#1E3350] text-[#E8EDF2] text-sm font-semibold hover:border-[#C9A84C]/30 transition-colors"
        >
          View all plans
        </Link>
      </div>
    </div>
  );
}

// ── Settings Tab ──────────────────────────────────────────────
function AlertSettings() {
  return (
    <div className="bg-[#132237] border border-[#1E3350] p-6">
      <h3 className="text-[#E8EDF2] font-bold text-sm mb-4">Notification settings</h3>
      <div className="flex flex-col gap-4">
        {[
          { label: 'Email notifications', desc: 'Receive alert triggers via email', enabled: true },
          { label: 'Webhook delivery', desc: 'POST to a custom endpoint on trigger', enabled: false },
          { label: 'Daily digest', desc: 'Summary of all triggered alerts in the past 24 hours', enabled: true },
        ].map((setting) => (
          <div key={setting.label} className="flex items-center justify-between gap-4 py-3 border-b border-[#1E3350] last:border-0">
            <div>
              <p className="text-[#E8EDF2] text-sm font-medium">{setting.label}</p>
              <p className="text-[#6B7E94] text-xs">{setting.desc}</p>
            </div>
            <div className={`text-sm font-semibold ${setting.enabled ? 'text-[#2ECC71]' : 'text-[#6B7E94]'}`}>
              {setting.enabled ? 'On' : 'Off'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function Alerts() {
  const { currentPlan } = useSubscription();
  const [activeTab, setActiveTab] = useState<TabId>('active');
  const [alerts, setAlerts] = useState<AlertConfig[]>(MOCK_ALERTS);
  const [showCreate, setShowCreate] = useState(false);

  const isPro = currentPlan === 'pro' || currentPlan === 'institutional';

  function handleToggle(id: string) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  }

  function handleDelete(id: string) {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }

  function handleCreate(alert: AlertConfig) {
    setAlerts((prev) => [alert, ...prev]);
    setShowCreate(false);
  }

  const activeAlerts = alerts.filter((a) => a.active);
  const triggeredAlerts = alerts.filter((a) => a.lastTriggered !== null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">

      {/* Header */}
      <div className="border-b border-[#1E3350] pb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-4 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
                Monitoring
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#E8EDF2] tracking-tight mb-1">Alert Center</h1>
            <p className="text-[#6B7E94] text-sm max-w-xl leading-relaxed">
              Configure real-time alerts for trust score changes, attestation delays, and market anomalies.
            </p>
          </div>
          {isPro && (
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-semibold hover:bg-[#C9A84C]/20 transition-colors"
            >
              <Plus size={14} />
              Create alert
            </button>
          )}
        </div>
      </div>

      {/* Gate */}
      <FeatureGate feature="alerts" mode="block" fallback={<AlertsLockedState />}>
        <div className="flex flex-col gap-6">
          {/* Tabs */}
          <div className="flex border-b border-[#1E3350]">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]'
                    : 'text-[#6B7E94] hover:text-[#E8EDF2]'
                }`}
              >
                {tab.label}
                {tab.id === 'active' && activeAlerts.length > 0 && (
                  <span className="ml-1.5 text-[10px] px-1.5 py-0.5 bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/25">
                    {activeAlerts.length}
                  </span>
                )}
                {tab.id === 'triggered' && triggeredAlerts.length > 0 && (
                  <span className="ml-1.5 text-[10px] px-1.5 py-0.5 bg-[#F39C12]/10 text-[#F39C12] border border-[#F39C12]/25">
                    {triggeredAlerts.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Create form */}
          {showCreate && (
            <CreateAlertForm onSave={handleCreate} onCancel={() => setShowCreate(false)} />
          )}

          {/* Tab content */}
          {activeTab === 'active' && (
            <div className="flex flex-col gap-3">
              {activeAlerts.length === 0 ? (
                <div className="bg-[#132237] border border-[#1E3350] p-10 text-center">
                  <Bell size={20} className="text-[#1E3350] mx-auto mb-3" />
                  <p className="text-[#E8EDF2] font-semibold mb-1">No active alerts</p>
                  <p className="text-[#6B7E94] text-sm">
                    Create your first alert to start monitoring trust signals.
                  </p>
                </div>
              ) : (
                activeAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'triggered' && (
            <div className="flex flex-col gap-3">
              {triggeredAlerts.length === 0 ? (
                <div className="bg-[#132237] border border-[#1E3350] p-10 text-center">
                  <Bell size={20} className="text-[#1E3350] mx-auto mb-3" />
                  <p className="text-[#E8EDF2] font-semibold mb-1">No triggered alerts</p>
                  <p className="text-[#6B7E94] text-sm">Alerts will appear here when they fire.</p>
                </div>
              ) : (
                triggeredAlerts.map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          )}

          {activeTab === 'settings' && <AlertSettings />}
        </div>
      </FeatureGate>

    </div>
  );
}
