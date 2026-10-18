import React from 'react';
import { motion } from 'framer-motion';
import { skills, BRAND_COLORS } from '../data/mock';

const SkillsSection = () => (
  <section className="relative z-10 w-full py-24 scroll-mt-24" id="stack" data-testid="skills-section">
    <div className="mx-auto max-w-[1300px] px-8">
      <motion.h2 initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }} className="mb-10 font-['Manrope'] text-[44px] font-extrabold leading-[1] text-black md:text-[64px]">Tech stack</motion.h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <motion.div
            key={s.group}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0.9, 0.2, 1] }}
            className="rounded-[28px] border-2 border-black p-6 shadow-[6px_6px_0_#000]"
            style={{ backgroundColor: BRAND_COLORS[i % BRAND_COLORS.length] }}
          >
            <h3 className="font-['Alfa_Slab_One'] text-[20px] text-black">{s.group}</h3>
            <p className="mt-3 font-['Manrope'] text-[15px] font-extrabold leading-[1.4] text-black">{s.items}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
