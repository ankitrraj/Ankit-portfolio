import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import FloatingIcons from './FloatingIcons';
import StarBurst from './StarBurst';
import { heroIntro } from '../data/mock';

const headline = [
  [
    { text: 'Ankit', label: 'Curious', shape: 'banner', color: '#84BFFF' },
    { text: 'builds', label: 'Creative', shape: 'burst', color: '#D87AF0' },
  ],
  [
    { text: 'AI', label: 'AI-native', shape: 'pill', color: '#EF724F' },
    { text: 'products', label: 'Useful', shape: 'bubble', color: '#D87AF0' },
  ],
  [
    { text: 'end to end', label: 'Full stack', shape: 'slant', color: '#79E900' },
  ],
];

const HoverLabel = ({ label, shape, color }) => {
  const labelText = <span className="relative z-10 block whitespace-nowrap px-5 py-3 font-['Manrope'] text-[clamp(19px,2.7vw,48px)] font-extrabold leading-none tracking-[-0.04em] text-black">{label}</span>;

  if (shape === 'burst') {
    return (
      <motion.span initial={{ opacity: 0, scale: 0.35, rotate: -18 }} animate={{ opacity: 1, scale: 1, rotate: -5 }} exit={{ opacity: 0, scale: 0.6, rotate: 8 }} transition={{ type: 'spring', stiffness: 360, damping: 22 }} className="absolute left-1/2 top-1/2 z-30 flex h-[2.25em] w-[3.7em] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <StarBurst color={color} className="absolute inset-0 h-full w-full" />
        {labelText}
      </motion.span>
    );
  }

  if (shape === 'bubble') {
    return (
      <motion.span initial={{ opacity: 0, scaleX: 0.25, scaleY: 0.7, y: 22 }} animate={{ opacity: 1, scaleX: 1, scaleY: 1, y: 0 }} exit={{ opacity: 0, scaleX: 0.4, scaleY: 0.75, y: -12 }} transition={{ type: 'spring', stiffness: 330, damping: 24 }} className="absolute left-1/2 top-1/2 z-30 flex min-w-max -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[50%] border-2 border-black" style={{ backgroundColor: color }}>
        <span className="absolute -z-10 h-[155%] w-[125%] -rotate-12"><StarBurst color="#E7DB4C" className="h-full w-full" /></span>
        {labelText}
      </motion.span>
    );
  }

  const slanted = shape === 'slant';
  return (
    <motion.span initial={{ opacity: 0, scale: 0.45, y: 38, rotate: slanted ? -8 : -3 }} animate={{ opacity: 1, scale: 1, y: 0, rotate: slanted ? -5 : -3 }} exit={{ opacity: 0, scale: 0.6, y: -18, rotate: 3 }} transition={{ type: 'spring', stiffness: 340, damping: 23 }} className={`absolute left-1/2 top-1/2 z-30 flex min-w-max -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-black shadow-[5px_5px_0_#000] ${slanted ? '-skew-y-3 px-5 py-3' : 'rounded-full'}`} style={{ backgroundColor: color }}>
      <span className={slanted ? 'skew-y-3' : ''}>{labelText}</span>
    </motion.span>
  );
};

const HeadlineWord = ({ word }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button type="button" className="relative mr-[0.16em] inline-block cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit outline-none last:mr-0" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onFocus={() => setIsHovered(true)} onBlur={() => setIsHovered(false)} aria-label={`Show ${word.label}`}>
      <span className={`transition-opacity duration-200 ${isHovered ? 'opacity-70' : ''}`}>{word.text}</span>
      <AnimatePresence>{isHovered && <HoverLabel label={word.label} shape={word.shape} color={word.color} />}</AnimatePresence>
    </button>
  );
};

const Hero = () => (
  <section className="relative w-full overflow-hidden" style={{ minHeight: 'calc(100vh - 96px)' }} data-testid="hero-section">
    <FloatingIcons />
    <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-32 pt-16 text-center">
      <div className="mb-6 inline-block rounded-full border-2 border-black bg-white px-5 py-2 text-[13px] font-extrabold uppercase tracking-wide text-black">Full Stack Software Engineer</div>
      <h1 className="font-['Manrope'] text-black" style={{ fontWeight: 800, fontSize: 'clamp(56px, 11vw, 168px)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>
        {headline.map((line, lineIndex) => (
          <span key={lineIndex} className="block overflow-visible">
            <motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + lineIndex * 0.12, ease: [0.2, 0.9, 0.2, 1] }} className="inline-block">
              {line.map((word) => <HeadlineWord key={word.text} word={word} />)}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.78, ease: [0.2, 0.9, 0.2, 1] }} className="mt-10">
        <Link to="/genai" className="inline-flex items-center gap-3 rounded-full border-2 border-black bg-[#E7DB4C] px-6 py-3 text-[15px] font-extrabold text-black shadow-[5px_5px_0_#000] transition-all duration-300 hover:-translate-y-1 hover:bg-[#84BFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4" data-testid="hero-genai-link">
          Explore GenAI roadmap <ArrowRight className="h-5 w-5" strokeWidth={3} />
        </Link>
      </motion.div>
    </div>
    <motion.div className="absolute bottom-10 right-10 z-20 hidden max-w-md md:block" initial={{ opacity: 0, y: 30, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: -3 }} transition={{ duration: 0.8, delay: 0.8, ease: [0.2, 0.9, 0.2, 1] }}>
      <div className="rounded-[10px] border-2 border-black bg-[#ACE2DF] p-6 shadow-[8px_8px_0_#000]">
        <p className="font-['Manrope'] text-[18px] font-extrabold leading-[1.3] text-black">{heroIntro}</p>
      </div>
    </motion.div>
  </section>
);

export default Hero;
