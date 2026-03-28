// ── ActionRow ────────────────────────────────────────────────
// Distribution and sharing hooks — makes the product feel
// citation-worthy and shareable. Non-functional actions are
// clearly marked "soon" and styled as disabled.

import { useState } from 'react';

export interface Action {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  comingSoon?: boolean;
  // Label shown briefly after a successful click (e.g. "Link Copied")
  activatedLabel?: string;
}

function ActionButton({ label, icon, onClick, comingSoon, activatedLabel }: Action) {
  const [activated, setActivated] = useState(false);

  const handleClick = () => {
    if (comingSoon || !onClick) return;
    onClick();
    setActivated(true);
    setTimeout(() => setActivated(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      title={comingSoon ? 'Coming soon' : undefined}
      className={`flex items-center gap-1.5 text-[10px] uppercase tracking-wider border px-3 py-1.5 transition-all ${
        comingSoon
          ? 'border-[#1E3350] text-[#6B7E94]/40 cursor-not-allowed'
          : activated
          ? 'border-[#2ECC71]/30 text-[#2ECC71]'
          : 'border-[#1E3350] text-[#6B7E94] hover:border-[#C9A84C]/40 hover:text-[#C9A84C] cursor-pointer'
      }`}
    >
      {icon}
      {activated && activatedLabel ? activatedLabel : label}
      {comingSoon && (
        <span className="text-[9px] normal-case tracking-normal opacity-50 ml-0.5">
          soon
        </span>
      )}
    </button>
  );
}

interface ActionRowProps {
  actions: Action[];
  label?: string;
}

export default function ActionRow({ actions, label }: ActionRowProps) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      {label && (
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6B7E94]/50 mr-1">
          {label}
        </span>
      )}
      {actions.map((action) => (
        <ActionButton key={action.label} {...action} />
      ))}
    </div>
  );
}
