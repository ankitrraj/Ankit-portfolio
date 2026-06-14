import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { navLinks, exploreItems } from '../data/mock';

const PillButton = ({ children, onClick, active, hasArrow, to, className = '', testId }) => {
  const inner = (
    <span className="inline-flex items-center gap-2">
      {children}
      {hasArrow && (
        <ChevronDown className={`h-3.5 w-3.5 text-[#EF724F] transition-transform duration-300 ${active ? 'rotate-180' : ''}`} strokeWidth={3} />
      )}
    </span>
  );
  const classes = `group relative rounded-full border-2 border-black bg-white px-7 py-3 text-[15px] font-extrabold text-black transition-all duration-300 hover:bg-[#ACE2DF] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${className}`;
  if (to) return <Link to={to} className={classes} data-testid={testId}>{inner}</Link>;
  return <button onClick={onClick} className={classes} aria-expanded={hasArrow ? !!active : undefined} data-testid={testId}>{inner}</button>;
};

const Logo = () => (
  <Link to="/" className="block select-none" aria-label="La puce à l'oreille" data-testid="header-logo">
    <motion.div initial={{ rotate: -8, scale: 0.9 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 14 }} className="font-['Alfa_Slab_One'] text-[18px] leading-[1.05] tracking-tight text-black">
      La Puce<br />&agrave; l&rsquo;oreille
    </motion.div>
  </Link>
);

const Header = () => {
  const [openExplore, setOpenExplore] = useState(false);
  const location = useLocation();
  return (
    <header className="relative z-50 w-full" data-testid="site-header">
      <div className="flex items-center justify-between gap-4 px-8 py-6">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-3 md:flex">
            <div className="relative">
              <PillButton hasArrow active={openExplore} onClick={() => setOpenExplore((v) => !v)} testId="nav-explorer">Explorer</PillButton>
              <AnimatePresence>
                {openExplore && (
                  <motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.96 }} transition={{ duration: 0.22, ease: [0.2, 0.9, 0.2, 1] }} className="absolute left-0 top-[calc(100%+10px)] z-50 w-64 rounded-[20px] border-2 border-black bg-white p-3 shadow-[6px_6px_0_#000]" data-testid="explore-dropdown">
                    <ul className="space-y-1">
                      {exploreItems.map((it) => (
                        <li key={it.label}><Link to={it.href} className="block rounded-full px-4 py-2 text-[14px] font-extrabold text-black transition-colors duration-200 hover:bg-[#ACE2DF]" onClick={() => setOpenExplore(false)}>{it.label}</Link></li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {navLinks.primary.slice(1).map((l) => (
              <PillButton key={l.label} to={l.path} testId={`nav-${l.label.toLowerCase().replace(/\s+/g, '-')}`}>{l.label}</PillButton>
            ))}
          </nav>
        </div>
        <nav className="hidden items-center gap-3 lg:flex">
          {navLinks.secondary.map((l) => (
            <Link key={l.label} to={l.href} className={`rounded-full border-2 border-black bg-white px-5 py-2 text-[13px] font-extrabold text-black transition-all duration-300 hover:bg-[#ACE2DF] hover:-translate-y-0.5 ${location.pathname === l.href ? 'bg-[#E7DB4C]' : ''}`} data-testid={`nav-sec-${l.label.toLowerCase()}`}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
