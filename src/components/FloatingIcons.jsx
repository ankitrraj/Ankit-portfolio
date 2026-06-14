import React, { useEffect, useState } from 'react';
import StarBurst from './StarBurst';
import SunburstRays from './SunburstRays';

const Robot = () => (
  <svg viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path d="M28.81 30.74L16.08 18.02c-1.33-1.32-1.33-3.62 0-4.94 1.33-1.32 3.65-1.32 4.98 0L34.56 26.46l-5.75 4.28z" fill="#84BFFF"/>
    <path d="M71.08 30.74L83.81 18.02c1.33-1.32 1.33-3.62 0-4.94-1.33-1.32-3.65-1.32-4.98 0L65.33 26.46l5.75 4.28z" fill="#84BFFF"/>
    <path d="M41.42 64.41h17.05c3.76 0 6.75 3.07 6.86 6.8v6.69H34.67v-6.8c0-3.62 2.99-6.69 6.75-6.69z" fill="#84BFFF"/>
    <circle cx="40.1" cy="50.37" r="3" fill="#000"/><circle cx="59.8" cy="50.37" r="3" fill="#000"/>
    <path d="M42.86 72.1h14.17v-2H42.86v2z" fill="#000"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M34.75 25.24L21.77 12.37c-1.72-1.7-4.67-1.7-6.39 0-1.72 1.71-1.72 4.65 0 6.36L27.45 30.8c-1.18 1.2-2.27 2.5-3.26 3.88h-2.69c-4.1 0-7.31 3.3-7.31 7.25v4.71a4.4 4.4 0 0 0-1.55-.34c-1.98 0-3.54 1.54-3.54 3.52v13.6c0 1.99 1.56 3.53 3.54 3.53.54 0 1.07-.13 1.55-.36v5.07c0 4.08 3.34 7.25 7.31 7.25h56.88c4.1 0 7.29-3.3 7.42-7.22V66.6c.47.22.99.34 1.54.34 1.84 0 3.55-1.51 3.55-3.52v-13.6c0-1.99-1.56-3.53-3.55-3.53-.55 0-1.07.12-1.54.34v-4.71c0-4.08-3.34-7.25-7.31-7.25h-2.6c-1-1.43-2.11-2.77-3.33-4l11.95-11.95c1.72-1.71 1.72-4.65 0-6.36-1.72-1.7-4.67-1.7-6.39 0L65.24 25.15a36.4 36.4 0 0 0-15.18-3.85c-5.6 0-10.8 1.44-15.31 3.94z" fill="#000"/>
  </svg>
);

const Headphones = () => (
  <svg viewBox="0 0 93 67" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path d="M19.06 65.28h-4.02c-1.95 0-3.67-1.6-3.67-3.66V39.74c0-1.95 1.6-3.67 3.67-3.67h4.02c1.95 0 3.67 1.6 3.67 3.67v21.88c0 2.06-1.6 3.66-3.67 3.66z" fill="#EF724F"/>
    <path d="M73.94 65.28h4.02c1.95 0 3.67-1.6 3.67-3.66V39.74c0-1.95-1.61-3.67-3.67-3.67h-4.02c-1.95 0-3.67 1.6-3.67 3.67v21.88c0 2.06 1.61 3.66 3.67 3.66z" fill="#EF724F"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M46.5 2.72c-15.87 0-28.74 12.95-28.74 28.66v3.7h1.3c2.48 0 4.67 2.03 4.67 4.66v21.88c0 2.62-2.06 4.66-4.67 4.66h-4.02c-2.12 0-4.03-1.48-4.54-3.55H8.04C6.22 62.73 4.74 61.26 4.74 59.44v-1.35c-2.36-1.59-4.02-4.24-4.02-7.35 0-3.08 1.53-5.85 4.02-7.4v-1.42c0-1.82 1.48-3.3 3.3-3.3h2.46c.5-1.99 2.3-3.55 4.54-3.55h.72v-3.7C15.76 14.57 29.53.72 46.5.72c16.85 0 30.74 13.73 30.74 30.66v3.7h.72c2.23 0 4.04 1.56 4.54 3.55h2.46c1.81 0 3.3 1.48 3.3 3.3v1.43c2.49 1.54 4.02 4.32 4.02 7.4 0 3.11-1.66 5.76-4.02 7.35v1.35c0 1.81-1.48 3.3-3.3 3.3H82.5c-.5 2.07-2.41 3.55-4.54 3.55h-4.02c-2.62 0-4.67-2.05-4.67-4.66V39.74c0-2.63 2.2-4.66 4.67-4.66h1.3v-3.7c0-15.82-12.98-28.66-28.74-28.66z" fill="#000"/>
  </svg>
);

const Microscope = () => (
  <svg viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <rect x="30" y="15" width="22" height="35" rx="4" fill="#84BFFF" stroke="#000" strokeWidth="2"/>
    <rect x="36" y="50" width="10" height="15" fill="#fff" stroke="#000" strokeWidth="2"/>
    <circle cx="41" cy="75" r="10" fill="#E7DB4C" stroke="#000" strokeWidth="2"/>
    <path d="M20 88h60" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
    <path d="M25 88c0-8 5-15 16-15M65 88c0-8-5-15-16-15" stroke="#000" strokeWidth="2"/>
  </svg>
);

const Brush = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <rect x="55" y="10" width="10" height="45" transform="rotate(25 60 32)" fill="#fff" stroke="#000" strokeWidth="2"/>
    <path d="M40 60l15 8 6-14-12-6-9 12z" fill="#6ED311" stroke="#000" strokeWidth="2"/>
    <path d="M30 80c4 4 12 6 16 2l-8-8c-4 0-8 2-8 6z" fill="#000"/>
  </svg>
);

const Planet = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <circle cx="50" cy="50" r="20" fill="#981082" stroke="#000" strokeWidth="2"/>
    <ellipse cx="50" cy="50" rx="38" ry="10" stroke="#000" strokeWidth="2" fill="none" transform="rotate(-20 50 50)"/>
    <circle cx="45" cy="45" r="2.5" fill="#E7DB4C"/><circle cx="58" cy="52" r="2" fill="#E7DB4C"/><circle cx="48" cy="58" r="1.5" fill="#E7DB4C"/>
  </svg>
);

const Palette = () => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
    <path d="M50 20c-17 0-30 12-30 28 0 9 7 14 14 14 5 0 6-3 6-6 0-2-1-3-1-5 0-3 2-5 5-5h12c11 0 19-7 19-16 0-11-11-20-25-20z" fill="#fff" stroke="#000" strokeWidth="2"/>
    <circle cx="35" cy="40" r="3" fill="#EF724F"/><circle cx="50" cy="32" r="3" fill="#E7DB4C"/>
    <circle cx="65" cy="40" r="3" fill="#6ED311"/><circle cx="40" cy="55" r="3" fill="#84BFFF"/>
    <path d="M58 65l8 18-3 2-9-17 4-3z" fill="#fff" stroke="#000" strokeWidth="2"/>
    <path d="M64 80l5 12" stroke="#6ED311" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

const AnimatedBurstIcon = ({ top, left, right, burstColor, hoverColor = '#981082', rotation = 0, parallaxSpeed = 0.1, size = 180, idleSpinDuration = 18, reverseSpin = false, children }) => {
  const [offset, setOffset] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * parallaxSpeed);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [parallaxSpeed]);
  return (
    <div className="absolute" style={{ top, left, right, width: size, height: size, transform: `translateY(${-offset}px)`, zIndex: hover ? 60 : 5 }} data-cursor="hover">
      <div className="pointer-events-none absolute left-1/2 top-1/2"><SunburstRays size={1600} active={hover} /></div>
      <button type="button" aria-label="Decoration" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)} className="group absolute inset-0 cursor-pointer focus:outline-none" style={{ transform: `scale(${hover ? 7 : 1})`, transition: 'transform 700ms cubic-bezier(.2,.9,.2,1)', transformOrigin: 'center' }} data-testid={`burst-icon-${burstColor}`}>
        <div className="relative h-full w-full" style={{ animation: `${reverseSpin ? 'iconSpinReverse' : 'iconSpin'} ${idleSpinDuration}s linear infinite`, transformOrigin: 'center' }}>
          <div className="absolute inset-0" style={{ transform: `rotate(${rotation}deg)` }}>
            <StarBurst color={hover ? hoverColor : burstColor} stroke="#000" strokeWidth={2} className="h-full w-full" style={{ transition: 'fill 280ms ease' }} />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ transform: `scale(${hover ? 1 / 7 : 1})`, transition: 'transform 700ms cubic-bezier(.2,.9,.2,1)', transformOrigin: 'center' }}>
          <div style={{ width: '55%', height: '55%', animation: hover ? 'wiggle 600ms ease infinite' : 'none' }}>{children}</div>
        </div>
      </button>
    </div>
  );
};

const FloatingIcons = () => (
  <div className="absolute inset-0 z-0 overflow-visible" aria-hidden="true">
    <AnimatedBurstIcon top={110} left="14%" burstColor="#ACE2DF" hoverColor="#981082" rotation={-20} parallaxSpeed={0.08} idleSpinDuration={22}><Robot /></AnimatedBurstIcon>
    <AnimatedBurstIcon top={80} left="42%" burstColor="#E7DB4C" hoverColor="#EF724F" rotation={15} parallaxSpeed={0.18} idleSpinDuration={28} reverseSpin><Headphones /></AnimatedBurstIcon>
    <AnimatedBurstIcon top={360} left="6%" burstColor="#84BFFF" hoverColor="#EF724F" rotation={10} parallaxSpeed={0.14} idleSpinDuration={20}><Microscope /></AnimatedBurstIcon>
    <AnimatedBurstIcon top={170} right="6%" burstColor="#EF724F" hoverColor="#981082" rotation={-12} parallaxSpeed={0.1} idleSpinDuration={25} reverseSpin><Brush /></AnimatedBurstIcon>
    <AnimatedBurstIcon top={420} right="14%" burstColor="#981082" hoverColor="#84BFFF" rotation={10} parallaxSpeed={0.16} idleSpinDuration={26}><Planet /></AnimatedBurstIcon>
    <AnimatedBurstIcon top={700} left="20%" burstColor="#F0A8DD" hoverColor="#981082" rotation={-8} parallaxSpeed={0.2} idleSpinDuration={24} reverseSpin><Palette /></AnimatedBurstIcon>
    <AnimatedBurstIcon top={720} right="22%" burstColor="#ACE2DF" hoverColor="#EF724F" rotation={18} parallaxSpeed={0.22} idleSpinDuration={30}><Headphones /></AnimatedBurstIcon>
  </div>
);

export default FloatingIcons;
