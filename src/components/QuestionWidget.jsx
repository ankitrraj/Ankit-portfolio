import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';
import StarBurst from './StarBurst';
import SunburstRays from './SunburstRays';
import { useToast } from '../hooks/use-toast';

const QuestionWidget = () => {
  const [hover, setHover] = useState(false);
  const { toast } = useToast();
  return (
    <section className="relative z-10 w-full overflow-hidden py-24" id="allo" data-testid="question-widget">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-8 text-center">
        <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className="pointer-events-none absolute left-1/2 top-1/2"><SunburstRays size={1400} active={hover} spinDuration={14} /></div>
          <motion.div className="relative h-[480px] w-[480px] sm:h-[560px] sm:w-[560px]" animate={{ rotate: hover ? 25 : 0, scale: hover ? 1.06 : 1 }} transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}>
            <StarBurst color={hover ? '#981082' : '#EF724F'} stroke="#000" strokeWidth={2} className="absolute inset-0 h-full w-full" style={{ transition: 'fill 500ms ease' }} />
            <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center" animate={{ rotate: hover ? -25 : 0 }} transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}>
              <h3 className="font-['Manrope'] text-[36px] font-extrabold leading-[1.05] text-black sm:text-[44px]">Pose une question pour Allo la puce</h3>
              <button onClick={() => toast({ title: 'Enregistrement (démo)', description: 'Cette fonction est mockée pour le moment.' })} className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-black bg-white px-7 py-3 text-[15px] font-extrabold text-black transition-all duration-300 hover:bg-[#ACE2DF] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2" data-testid="allo-record-btn">
                <Mic className="h-5 w-5 text-[#EF724F]" strokeWidth={2.5} />Enregistrer un message
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default QuestionWidget;
