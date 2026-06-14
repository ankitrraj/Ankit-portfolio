import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, PenTool } from 'lucide-react';
import StarBurst from './StarBurst';
import { podcasts } from '../data/mock';

const PodcastCard = ({ p, index }) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} initial={{ opacity: 0, y: 60, rotate: index % 2 ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} whileHover={{ y: -10, rotate: index % 2 ? 2 : -2 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: index * 0.06, ease: [0.2, 0.9, 0.2, 1] }} className="group relative flex h-[440px] w-[340px] shrink-0 flex-col justify-between rounded-[40px] border-2 border-black p-7" style={{ backgroundColor: hover ? '#ACE2DF' : '#fff', transition: 'background-color 300ms ease' }} data-testid={`podcast-card-${p.id}`}>
      {p.featured && (
        <div className="absolute right-5 top-5">
          <div className="relative h-20 w-20" style={{ animation: 'iconSpin 14s linear infinite' }}>
            <StarBurst color="#EF724F" className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'iconSpinReverse 14s linear infinite' }}>
              <PenTool className="h-7 w-7 text-black" strokeWidth={2} />
            </div>
          </div>
        </div>
      )}
      <div />
      <div>
        <div className="mb-3 inline-block rounded-full border-2 border-black bg-[#84BFFF] px-3 py-1 text-[13px] font-extrabold uppercase tracking-wide text-black">{p.category}</div>
        <h2 className="font-['Alfa_Slab_One'] text-[26px] leading-[1.05] text-black">{p.title}</h2>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-[13px] font-extrabold text-black underline-offset-4 group-hover:underline">En savoir plus</span>
        <button aria-label="Écouter" className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-[#EF724F] transition-transform duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2" data-testid={`play-${p.id}`}>
          <Play className="h-5 w-5 translate-x-0.5 fill-[#E7DB4C] text-black" strokeWidth={2} />
        </button>
      </div>
    </motion.article>
  );
};

const PodcastsSection = () => {
  const scrollerRef = useRef(null);
  const scroll = (dir) => { if (scrollerRef.current) scrollerRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' }); };
  return (
    <section className="relative z-10 w-full py-24" id="balados" data-testid="podcasts-section">
      <div className="mx-auto max-w-[1500px] px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <motion.h2 initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }} className="font-['Manrope'] text-[44px] font-extrabold leading-[1] text-black md:text-[64px]">Tous les balados</motion.h2>
          <div className="flex items-center gap-3">
            <button onClick={() => scroll(-1)} aria-label="Précédent" className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-white transition-all duration-300 hover:bg-[#ACE2DF] hover:-translate-x-0.5" data-testid="podcasts-prev"><ChevronLeft className="h-5 w-5" strokeWidth={2.5} /></button>
            <button onClick={() => scroll(1)} aria-label="Suivant" className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-black bg-white transition-all duration-300 hover:bg-[#ACE2DF] hover:translate-x-0.5" data-testid="podcasts-next"><ChevronRight className="h-5 w-5" strokeWidth={2.5} /></button>
          </div>
        </div>
        <div ref={scrollerRef} className="flex gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {podcasts.map((p, i) => <PodcastCard key={p.id} p={p} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default PodcastsSection;
