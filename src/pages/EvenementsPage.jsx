import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import RelatedEvents from '../components/RelatedEvents';
import Marquee from '../components/Marquee';

const EvenementsPage = () => (
  <PageTransition>
    <section className="relative w-full px-8 pb-12 pt-20" data-testid="events-hero">
      <div className="mx-auto max-w-[1400px]">
        <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }} className="font-['Manrope'] text-[60px] font-extrabold leading-[0.95] text-black md:text-[120px]" style={{ letterSpacing: '-0.02em' }}>
          Événements<br /><span className="text-[#981082]">vivants.</span>
        </motion.h1>
      </div>
    </section>
    <Marquee color="#EF724F" textColor="#fff" words={['Festival', 'Atelier', 'Spectacle', 'Concert', 'Rencontre']} />
    <RelatedEvents />
  </PageTransition>
);

export default EvenementsPage;
