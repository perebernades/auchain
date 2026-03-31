import { useState } from 'react';
import {
  Code2,
  FileText,
  Plug,
  Users,
  Copy,
  Check,
  Building2,
  Shield,
  Layers,
  BarChart3,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { useSubscription } from '../lib/subscriptionContext';

// ── Institutional Hub ─────────────────────────────────────────

type TabId = 'api' | 'due_diligence' | 'integrations' | 'organization';

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'api', label: 'API Access', icon: <Code2 size={14} /> },
  { id: 'due_diligence', label: 'Due Diligence', icon: <FileText size={14} /> },
  { id: 'integrations', label: 'Integrations', icon: <Plug size={14} /> },
  { id: 'organization', label: 'Organization', icon: <Users size={14} /> },
];

// ── API Tab ───────────────────────────────────────────────────
function ApiTab() {
  const [copied, setCopied] = useState(false);

  const DEMO_KEY = 'sk-auchain-demo-xxxxxxxxxxxxxxxxxxxx';
  const SAMPLE_ENDPOINT = 'GET /v1/trust-score?token=PAXG&dimensions=all';

  const ENDPOINTS = [
    {
      method: 'GET',
      path: '/v1/trust-score',
      desc: 'Retrieve trust score for a token, with optional dimension breakdown.',
    },
    {
      method: 'GET',
      path: '/v1/trust-history',
      desc: 'Historical trust score time series, with change events.',
    },
    {
      method: 'GET',
      path: '/v1/risk-flags',
      desc: 'Active and resolved risk flags, filterable by token and severity.',
    },
    {
      method: 'GET',
      path: '/v1/attestations',
      desc: 'Attestation schedule, publication dates, and coverage details.',
    },
    {
      method: 'POST',
      path: '/v1/webhooks',
      desc: 'Register a webhook endpoint to receive real-time alert events.',
    },
  ];

  const USAGE_STATS = [
    { label: 'Requests this month', value: '14,832' },
    { label: 'Requests remaining', value: '85,168' },
    { label: 'Plan limit', value: '100,000 / mo' },
    { label: 'Avg response time', value: '42ms' },
  ];

  function copyKey() {
    navigator.clipboard?.writeText(DEMO_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* API Key */}
      <div className="bg-[#132237] border border-[#1E3350] p-6">
        <h3 className="text-[#E8EDF2] font-bold text-sm mb-4">API Key</h3>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-[#0D1B2A] border border-[#1E3350] text-[#C9A84C] text-xs font-mono px-4 py-3 truncate">
            {DEMO_KEY}
          </code>
          <button
            onClick={copyKey}
            className="flex items-center gap-1.5 px-3 py-3 border border-[#1E3350] text-[#6B7E94] hover:text-[#E8EDF2] hover:border-[#C9A84C]/30 transition-colors text-xs"
          >
            {copied ? <Check size={13} className="text-[#2ECC71]" /> : <Copy size={13} />}
          </button>
        </div>
        <p className="text-[#6B7E94] text-xs mt-2">
          Include as header: <code className="text-[#C9A84C]">Authorization: Bearer {'<your-key>'}</code>
        </p>
      </div>

      {/* Usage */}
      <div className="bg-[#132237] border border-[#1E3350] p-6">
        <h3 className="text-[#E8EDF2] font-bold text-sm mb-4">Usage this month</h3>
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#6B7E94]">14,832 of 100,000 requests</span>
            <span className="text-[#C9A84C] font-semibold">14.8%</span>
          </div>
          <div className="h-2 bg-[#1E3350] w-full">
            <div className="h-full bg-[#C9A84C] transition-all duration-700" style={{ width: '14.8%' }} />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-[#1E3350]">
          {USAGE_STATS.map(({ label, value }, i) => (
            <div
              key={label}
              className={`px-3 py-2.5 bg-[#0D1B2A] ${i % 2 === 0 ? 'border-r border-[#1E3350] sm:border-r' : 'sm:border-r'} ${i < 2 ? 'border-b border-[#1E3350] sm:border-b' : ''}`}
            >
              <p className="text-[10px] uppercase tracking-widest text-[#6B7E94] mb-1">{label}</p>
              <p className="text-[#E8EDF2] text-sm font-bold font-mono">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Endpoints */}
      <div className="bg-[#132237] border border-[#1E3350] p-6">
        <h3 className="text-[#E8EDF2] font-bold text-sm mb-4">Endpoints</h3>
        <div className="mb-4 bg-[#0D1B2A] border border-[#1E3350] p-3">
          <code className="text-xs text-[#C9A84C] font-mono">
            https://api.auchain.io{SAMPLE_ENDPOINT}
          </code>
        </div>
        <div className="flex flex-col divide-y divide-[#1E3350]">
          {ENDPOINTS.map((ep) => (
            <div key={ep.path} className="py-3 flex items-start gap-3">
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 border shrink-0 ${
                  ep.method === 'GET'
                    ? 'text-[#2ECC71] border-[#2ECC71]/25 bg-[#2ECC71]/5'
                    : 'text-[#C9A84C] border-[#C9A84C]/25 bg-[#C9A84C]/5'
                }`}
              >
                {ep.method}
              </span>
              <div>
                <code className="text-[#E8EDF2] text-xs font-mono">{ep.path}</code>
                <p className="text-[#6B7E94] text-xs mt-0.5">{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Due Diligence Tab ─────────────────────────────────────────
function DueDiligenceTab() {
  const DD_MEMOS = [
    {
      title: 'PAXG Full Due Diligence Memo',
      token: 'PAXG',
      date: 'March 2026',
      pages: 24,
      type: 'Comprehensive',
    },
    {
      title: 'XAUT Full Due Diligence Memo',
      token: 'XAUT',
      date: 'March 2026',
      pages: 22,
      type: 'Comprehensive',
    },
    {
      title: 'Tokenized Gold Sector Overview',
      token: 'BOTH',
      date: 'Q1 2026',
      pages: 18,
      type: 'Sector Report',
    },
    {
      title: 'Reserve Attestation Comparison',
      token: 'BOTH',
      date: 'February 2026',
      pages: 11,
      type: 'Comparative Analysis',
    },
  ];

  const AUDIT_EVENTS = [
    { date: 'Mar 28, 2026', action: 'Due diligence memo downloaded', file: 'PAXG_DD_Mar2026.pdf' },
    { date: 'Mar 21, 2026', action: 'API request batch', file: '1,240 requests via /v1/trust-score' },
    { date: 'Mar 14, 2026', action: 'Alert configuration exported', file: 'alerts_config_export.json' },
    { date: 'Mar 7, 2026', action: 'Risk flags report downloaded', file: 'risk_flags_Q1_2026.pdf' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* DD Memos */}
      <div className="bg-[#132237] border border-[#1E3350] p-6">
        <h3 className="text-[#E8EDF2] font-bold text-sm mb-4">Downloadable DD Memos</h3>
        <div className="flex flex-col divide-y divide-[#1E3350]">
          {DD_MEMOS.map((memo) => (
            <div key={memo.title} className="py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[#E8EDF2] text-sm font-medium">{memo.title}</p>
                <p className="text-[#6B7E94] text-xs mt-0.5">
                  {memo.type} · {memo.date} · {memo.pages} pages
                </p>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 border border-[#1E3350] text-[#C9A84C] text-xs font-semibold hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/5 transition-colors shrink-0">
                <FileText size={12} />
                PDF
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Trail */}
      <div className="bg-[#132237] border border-[#1E3350] p-6">
        <h3 className="text-[#E8EDF2] font-bold text-sm mb-4">Audit Trail</h3>
        <div className="flex flex-col divide-y divide-[#1E3350]">
          {AUDIT_EVENTS.map((event, i) => (
            <div key={i} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-[#E8EDF2] text-xs font-medium">{event.action}</p>
                <p className="text-[#6B7E94] text-[11px] mt-0.5">{event.file}</p>
              </div>
              <span className="text-[#6B7E94] text-[11px] shrink-0">{event.date}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 text-[#C9A84C] text-xs hover:underline">
          Export full audit trail (CSV)
        </button>
      </div>
    </div>
  );
}

// ── Integrations Tab ──────────────────────────────────────────
function IntegrationsTab() {
  const INTEGRATIONS = [
    {
      name: 'Slack',
      desc: 'Send alert notifications and weekly trust digests to a Slack channel.',
      status: 'Available',
      statusColor: 'text-[#2ECC71]',
    },
    {
      name: 'Webhook',
      desc: 'POST real-time events to any HTTP endpoint for custom workflow integration.',
      status: 'Available',
      statusColor: 'text-[#2ECC71]',
    },
    {
      name: 'Whitelabel Widget',
      desc: 'Embed AuChain trust scores and charts in your own platform with a branded iframe.',
      status: 'Available',
      statusColor: 'text-[#2ECC71]',
    },
    {
      name: 'Bloomberg Terminal',
      desc: 'Surface AuChain trust scores via Bloomberg Data License or Terminal API.',
      status: 'In development',
      statusColor: 'text-[#F39C12]',
    },
  ];

  const EMBED_CODE = `<iframe
  src="https://auchain.io/embed/trust-score?token=PAXG&theme=dark"
  width="400" height="280"
  frameborder="0"
  allow="clipboard-write">
</iframe>`;

  return (
    <div className="flex flex-col gap-6">
      {/* Integration list */}
      <div className="bg-[#132237] border border-[#1E3350] p-6">
        <h3 className="text-[#E8EDF2] font-bold text-sm mb-4">Available integrations</h3>
        <div className="flex flex-col divide-y divide-[#1E3350]">
          {INTEGRATIONS.map((intg) => (
            <div key={intg.name} className="py-4 flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[#E8EDF2] text-sm font-semibold">{intg.name}</p>
                  <span className={`text-[10px] font-semibold ${intg.statusColor}`}>
                    {intg.status}
                  </span>
                </div>
                <p className="text-[#6B7E94] text-xs leading-relaxed">{intg.desc}</p>
              </div>
              <button className="px-3 py-1.5 border border-[#1E3350] text-[#C9A84C] text-xs font-semibold hover:border-[#C9A84C]/40 transition-colors shrink-0">
                Configure
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Widget embed code */}
      <div className="bg-[#132237] border border-[#1E3350] p-6">
        <h3 className="text-[#E8EDF2] font-bold text-sm mb-2">Whitelabel embed code</h3>
        <p className="text-[#6B7E94] text-xs mb-4">
          Embed the AuChain trust score widget on your platform. Customize token, theme, and dimensions via URL params.
        </p>
        <pre className="bg-[#0D1B2A] border border-[#1E3350] p-4 text-[#C9A84C] text-xs font-mono overflow-x-auto leading-relaxed">
          {EMBED_CODE}
        </pre>
      </div>
    </div>
  );
}

// ── Organization Tab ──────────────────────────────────────────
function OrganizationTab() {
  const SEATS = [
    { name: 'Alex Chen', email: 'alex@example.com', role: 'Admin', lastActive: 'Today' },
    { name: 'Maria Santos', email: 'maria@example.com', role: 'Analyst', lastActive: 'Yesterday' },
    { name: 'James Park', email: 'james@example.com', role: 'Viewer', lastActive: 'Mar 27, 2026' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Team seats */}
      <div className="bg-[#132237] border border-[#1E3350] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[#E8EDF2] font-bold text-sm">Team seats</h3>
          <span className="text-[#6B7E94] text-xs">3 of 10 seats used</span>
        </div>
        <div className="flex flex-col divide-y divide-[#1E3350]">
          {SEATS.map((seat) => (
            <div key={seat.email} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-[#E8EDF2] text-sm font-medium">{seat.name}</p>
                <p className="text-[#6B7E94] text-xs">{seat.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-semibold text-[#6B7E94] uppercase tracking-wide">
                  {seat.role}
                </span>
                <span className="text-[11px] text-[#6B7E94]">{seat.lastActive}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 flex items-center gap-2 px-3 py-1.5 border border-[#1E3350] text-[#C9A84C] text-xs font-semibold hover:border-[#C9A84C]/40 transition-colors">
          <Plus size={12} />
          Invite member
        </button>
      </div>

      {/* Workspace settings */}
      <div className="bg-[#132237] border border-[#1E3350] p-6">
        <h3 className="text-[#E8EDF2] font-bold text-sm mb-4">Workspace settings</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[#6B7E94] text-xs uppercase tracking-widest font-semibold mb-1.5 block">
              Organization name
            </label>
            <div className="bg-[#0D1B2A] border border-[#1E3350] text-[#E8EDF2] text-sm px-3 py-2.5">
              Acme Capital
            </div>
          </div>
          <div>
            <label className="text-[#6B7E94] text-xs uppercase tracking-widest font-semibold mb-1.5 block">
              Billing email
            </label>
            <div className="bg-[#0D1B2A] border border-[#1E3350] text-[#E8EDF2] text-sm px-3 py-2.5">
              finance@acmecapital.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ── Contact Sales Page ────────────────────────────────────────
function ContactSalesPage() {
  const VALUE_PROPS = [
    {
      icon: <Shield size={20} className="text-[#C9A84C]" />,
      title: 'Due diligence infrastructure',
      desc: 'Downloadable DD memos, audit-ready exports, and structured trust data for every tokenized gold product in coverage.',
    },
    {
      icon: <Code2 size={20} className="text-[#C9A84C]" />,
      title: 'API-first data delivery',
      desc: 'REST and webhook access to trust scores, risk flags, and attestation data. Integrates with any data pipeline or client reporting system.',
    },
    {
      icon: <Layers size={20} className="text-[#C9A84C]" />,
      title: 'Whitelabel embedding',
      desc: 'Surface AuChain trust scores inside your own platform with branded iframes. No data re-licensing friction.',
    },
    {
      icon: <BarChart3 size={20} className="text-[#C9A84C]" />,
      title: 'Team workspace',
      desc: 'Multi-seat access with role-based permissions, shared watchlists, and centralized alert management.',
    },
  ];

  const ENTERPRISE_FEATURES = [
    'REST API with 100,000+ monthly requests',
    'Webhook delivery for real-time events',
    'Full due diligence suite with PDF memos',
    'Audit trail and compliance exports',
    'Whitelabel widget embedding',
    'Slack and custom integrations',
    'Multi-seat team workspace',
    'Dedicated analyst support and SLA',
    'Custom coverage requests',
    'Priority onboarding and training',
  ];

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <div className="border-b border-[#1E3350] pb-12">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
            Institutional
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#E8EDF2] tracking-tight mb-4 max-w-2xl leading-tight">
          Trust analytics embedded into your workflow
        </h1>
        <p className="text-[#6B7E94] text-base max-w-2xl leading-relaxed mb-8">
          AuChain Institutional provides wealth platforms, allocators, and fintechs with
          API access, embedded due diligence infrastructure, and analyst-grade trust
          intelligence for tokenized gold.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0D1B2A] text-sm font-bold hover:bg-[#E8C97A] transition-colors"
          >
            Book a demo
            <ArrowRight size={14} />
          </a>
          <a
            href="mailto:institutional@auchain.io"
            className="flex items-center gap-2 px-6 py-3 border border-[#1E3350] text-[#E8EDF2] text-sm font-semibold hover:border-[#C9A84C]/40 transition-colors"
          >
            <Building2 size={14} />
            Contact sales
          </a>
        </div>
      </div>

      {/* Value props */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {VALUE_PROPS.map((vp) => (
          <div key={vp.title} className="bg-[#132237] border border-[#1E3350] p-6">
            <div className="mb-3">{vp.icon}</div>
            <h3 className="text-[#E8EDF2] font-bold text-sm mb-2">{vp.title}</h3>
            <p className="text-[#6B7E94] text-xs leading-relaxed">{vp.desc}</p>
          </div>
        ))}
      </div>

      {/* Features list */}
      <div className="bg-[#132237] border border-[#1E3350] p-8">
        <h2 className="text-[#E8EDF2] font-bold text-base mb-6">What is included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ENTERPRISE_FEATURES.map((f) => (
            <div key={f} className="flex items-start gap-2.5">
              <Check size={13} className="text-[#C9A84C] mt-0.5 shrink-0" />
              <span className="text-[#E8EDF2] text-sm">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Demo CTA */}
      <div className="border border-[#C9A84C]/20 bg-[#C9A84C]/5 p-8 text-center flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold text-[#E8EDF2]">
          Ready to embed trust intelligence?
        </h2>
        <p className="text-[#6B7E94] text-sm max-w-md leading-relaxed">
          Our team will walk you through the API, DD suite, and integration options.
          Typically a 30-minute technical walkthrough.
        </p>
        <a
          href="#"
          className="px-8 py-3 bg-[#C9A84C] text-[#0D1B2A] text-sm font-bold hover:bg-[#E8C97A] transition-colors"
        >
          Book a demo
        </a>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function Institutional() {
  const { currentPlan } = useSubscription();
  const [activeTab, setActiveTab] = useState<TabId>('api');

  const isInstitutional = currentPlan === 'institutional';

  if (!isInstitutional) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ContactSalesPage />
      </div>
    );
  }

  const TAB_CONTENT: Record<TabId, React.ReactNode> = {
    api: <ApiTab />,
    due_diligence: <DueDiligenceTab />,
    integrations: <IntegrationsTab />,
    organization: <OrganizationTab />,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

      {/* Header */}
      <div className="border-b border-[#1E3350] pb-6">
        <div className="flex items-center gap-2.5 mb-2">
          <div className="w-4 h-px bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest">
            Institutional Hub
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#E8EDF2] tracking-tight mb-1">
          Institutional Access
        </h1>
        <p className="text-[#6B7E94] text-sm max-w-xl leading-relaxed">
          API management, due diligence resources, integrations, and team settings.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#1E3350] overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]'
                : 'text-[#6B7E94] hover:text-[#E8EDF2]'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>{TAB_CONTENT[activeTab]}</div>
    </div>
  );
}

