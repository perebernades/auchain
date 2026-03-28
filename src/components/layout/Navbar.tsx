import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/trust-score', label: 'Trust Score' },
  { to: '/compare', label: 'ETF Compare' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1E3350] bg-[#0D1B2A]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
            <div className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-tight text-[#E8EDF2]">
                Au<span className="text-[#C9A84C]">Chain</span>
              </span>
              <div className="h-[2px] w-full bg-[#C9A84C] mt-0.5" />
            </div>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-semibold tracking-widest uppercase bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30 ml-1">
              Free Beta
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]'
                      : 'text-[#6B7E94] hover:text-[#E8EDF2]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#6B7E94] hover:text-[#E8EDF2] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <nav className="md:hidden border-t border-[#1E3350] py-2">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#C9A84C] bg-[#C9A84C]/5 border-l-2 border-[#C9A84C]'
                      : 'text-[#6B7E94] hover:text-[#E8EDF2] hover:bg-[#132237]'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
