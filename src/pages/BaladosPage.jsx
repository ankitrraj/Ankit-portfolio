import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import PodcastsSection from '../components/PodcastsSection';
import Marquee from '../components/Marquee';

const BaladosPage = () => (
  <PageTransition>
    <section className="relative w-full px-8 pb-12 pt-20" data-testid="balados-hero">
      <div className="mx-auto max-w-[1400px]">
        <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }} className="font-['Manrope'] text-[60px] font-extrabold leading-[0.95] text-black md:text-[120px]" style={{ letterSpacing: '-0.02em' }}>
          Tous les<br />balados.
        </motion.h1>
        <motion.p initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 max-w-2xl font-['Manrope'] text-[18px] font-extrabold leading-[1.3] text-black">
          Plonge dans nos univers sonores. Sciences, contes, émotions… il y a forcément un balado pour toi.
        </motion.p>
      </div>
    </section>
    <Marquee color="#84BFFF" textColor="#000" speed={26} />
    <PodcastsSection />
  </PageTransition>
);

export default BaladosPage;
