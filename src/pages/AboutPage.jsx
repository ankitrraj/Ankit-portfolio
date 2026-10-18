import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Marquee from '../components/Marquee';
import StarBurst from '../components/StarBurst';

const paras = [
  'I’m Ankit Rajoria, a Full Stack Software Engineer who ships production web and mobile apps end to end — from React Native (Expo) frontends to Node.js APIs, PostgreSQL, and cloud infra on DigitalOcean and Cloudflare.',
  'As Founder & CTO of EnglishpersonAI, I built a production AI English coaching platform as the sole engineer: LLM failover, subscription billing, gamification, edge push notifications and an internal admin dashboard.',
  'I’ve won HackUEM 2025, placed runner-up at LNMIIT Unstoppable Hackathon, led tech at AceHack 5.0, and competed in 12+ hackathons — usually building the whole thing myself.',
];

const AboutPage = () => (
  <PageTransition>
    <section className="relative w-full overflow-hidden px-8 pb-24 pt-20" data-testid="about-hero">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
        <div>
          <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.2, 0.9, 0.2, 1] }} className="font-['Manrope'] text-[60px] font-extrabold leading-[0.95] text-black md:text-[110px]" style={{ letterSpacing: '-0.02em' }}>
            About<br />me
          </motion.h1>
          <div className="mt-8 max-w-xl space-y-5">
            {paras.map((p, i) => (
              <motion.p key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }} className="font-['Manrope'] text-[17px] font-extrabold leading-[1.4] text-black">
                {p}
              </motion.p>
            ))}
          </div>
        </div>
        <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1, ease: [0.2, 0.9, 0.2, 1], delay: 0.3 }} className="relative mx-auto h-[420px] w-[420px]">
          <div className="absolute inset-0" style={{ animation: 'iconSpin 30s linear infinite' }}><StarBurst color="#E7DB4C" className="h-full w-full" /></div>
          <div className="absolute inset-0 flex items-center justify-center text-center font-['Alfa_Slab_One'] text-[42px] leading-[1] text-black">Ship it<br />end to end</div>
        </motion.div>
      </div>
    </section>
    <Marquee color="#ACE2DF" textColor="#000" words={['React', 'Node.js', 'Next.js', 'PostgreSQL', 'Cloudflare']} />
  </PageTransition>
);

export default AboutPage;
