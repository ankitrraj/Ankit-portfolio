import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarBurst from './StarBurst';
import SunburstRays from './SunburstRays';

const Loader = () => {
  const [stage, setStage] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 700);
    const t2 = setTimeout(() => setStage(2), 1600);
    const t3 = setTimeout(() => setDone(true), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#F6E0DB]"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          data-testid="intro-loader"
        >
          <div className="relative flex items-center justify-center">
            <SunburstRays size={2400} active={stage >= 1} spinDuration={6} />
            <motion.div
              className="relative z-10 h-[260px] w-[260px]"
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: stage === 0 ? 1 : stage === 1 ? 1.15 : 0.8,
                rotate: stage === 0 ? 0 : stage === 1 ? 25 : 60,
              }}
              transition={{ duration: 0.7, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <StarBurst color="#EF724F" stroke="#000" strokeWidth={2} className="h-full w-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-['Alfa_Slab_One'] text-center text-[28px] leading-[0.95] text-black">
                  La Puce
                  <br />
                  à l'oreille
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
