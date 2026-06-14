import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { relatedEvents } from '../data/mock';

const EventCard = ({ ev, index }) => {
  const [hover, setHover] = useState(false);
  const rotation = (index % 2 === 0 ? -1 : 1) * 2;
  return (
    <motion.article onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7, delay: index * 0.1, ease: [0.2, 0.9, 0.2, 1] }} className="flex flex-col justify-between rounded-[40px] border-2 border-black p-8" style={{ backgroundColor: hover ? '#981082' : '#ACE2DF', color: hover ? '#fff' : '#000', transform: `rotate(${hover ? 0 : rotation}deg) translateY(${hover ? -8 : 0}px)`, transition: 'transform 380ms cubic-bezier(.2,.9,.2,1), background-color 380ms ease, color 380ms ease', minHeight: 320 }} data-testid={`event-card-${ev.id}`}>
      <div>
        <h3 className="font-['Alfa_Slab_One'] text-[28px] leading-[1.05]">{ev.title}</h3>
        <p className="mt-4 font-['Manrope'] text-[15px] font-medium leading-[1.4]">{ev.description}</p>
      </div>
      <button className="mt-6 inline-flex items-center gap-3 self-start rounded-full border-2 border-black bg-white px-5 py-3 text-[13px] font-extrabold text-black transition-all duration-300 hover:bg-[#E7DB4C]">
        {ev.cta}<ArrowRight className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </motion.article>
  );
};

const RelatedEvents = () => (
  <section className="relative z-10 w-full py-24" data-testid="related-events">
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-8 md:grid-cols-3">
      {relatedEvents.map((ev, i) => <EventCard key={ev.id} ev={ev} index={i} />)}
    </div>
  </section>
);

export default RelatedEvents;
