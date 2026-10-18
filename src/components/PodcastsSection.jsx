import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Smartphone, Globe, Code2 } from 'lucide-react';
import StarBurst from './StarBurst';
import { products } from '../data/mock';

const ProductCard = ({ p, index }) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.2, 0.9, 0.2, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[40px] border-2 border-black p-9"
      style={{ backgroundColor: hover ? p.color : '#fff', transition: 'background-color 300ms ease', minHeight: 480 }}
      data-testid={`product-card-${p.id}`}
    >
      {p.featured && (
        <div className="absolute right-6 top-6">
          <div className="relative h-16 w-16" style={{ animation: 'iconSpin 16s linear infinite' }}>
            <StarBurst color="#EF724F" className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'iconSpinReverse 16s linear infinite' }}>
              <Code2 className="h-6 w-6 text-black" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="mb-4 inline-block rounded-full border-2 border-black bg-[#E7DB4C] px-3 py-1 text-[12px] font-extrabold uppercase tracking-wide text-black">{p.category}</div>
        <h3 className="font-['Alfa_Slab_One'] text-[38px] leading-[1] text-black">{p.name}</h3>
        <p className="mt-2 font-['Manrope'] text-[16px] font-extrabold text-black/70">{p.tagline}</p>
        <p className="mt-5 max-w-xl font-['Manrope'] text-[15px] font-medium leading-[1.45] text-black">{p.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {p.stats.map((s) => (
            <span key={s} className="rounded-full border-2 border-black bg-white px-3 py-1 text-[12px] font-extrabold text-black">{s}</span>
          ))}
        </div>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href={p.web} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-[#EF724F] px-5 py-3 text-[14px] font-extrabold text-black transition-transform duration-300 hover:scale-105" data-testid={`web-${p.id}`}>
          <Globe className="h-4 w-4" strokeWidth={2.5} />Visit website<ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
        </a>
        <a href={p.app} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-3 text-[14px] font-extrabold text-black transition-transform duration-300 hover:scale-105" data-testid={`app-${p.id}`}>
          <Smartphone className="h-4 w-4" strokeWidth={2.5} />Get the app
        </a>
      </div>
    </motion.article>
  );
};

const PodcastsSection = () => (
  <section className="relative z-10 w-full py-24 scroll-mt-24" id="products" data-testid="products-section">
    <div className="mx-auto max-w-[1300px] px-8">
      <motion.h2 initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }} className="mb-10 font-['Manrope'] text-[44px] font-extrabold leading-[1] text-black md:text-[64px]">Products I’ve shipped</motion.h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {products.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}
      </div>
    </div>
  </section>
);

export default PodcastsSection;
