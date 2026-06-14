import React from 'react';
import { motion } from 'framer-motion';
import FloatingIcons from './FloatingIcons';
import { heroIntro } from '../data/mock';

const titleLines = ['Balados', 'décalés pour', 'enfants allumés'];

const Hero = () => (
  <section className="relative w-full overflow-hidden" style={{ minHeight: 'calc(100vh - 96px)' }} data-testid="hero-section">
    <FloatingIcons />
    <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-32 pt-16 text-center">
      <h1 className="font-['Manrope'] text-black" style={{ fontWeight: 800, fontSize: 'clamp(64px, 12vw, 180px)', lineHeight: 0.92, letterSpacing: '-0.02em' }}>
        {titleLines.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.2, 0.9, 0.2, 1] }}>{line}</motion.span>
          </span>
        ))}
      </h1>
    </div>
    <motion.div className="absolute bottom-10 right-10 z-20 hidden max-w-md md:block" initial={{ opacity: 0, y: 30, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: -3 }} transition={{ duration: 0.8, delay: 0.8, ease: [0.2, 0.9, 0.2, 1] }}>
      <div className="rounded-[10px] border-2 border-black bg-[#ACE2DF] p-6 shadow-[8px_8px_0_#000]">
        <p className="font-['Manrope'] text-[18px] font-extrabold leading-[1.3] text-black">{heroIntro}</p>
      </div>
    </motion.div>
  </section>
);

export default Hero;
