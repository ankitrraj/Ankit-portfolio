import React from 'react';
import { motion } from 'framer-motion';
import SunburstRays from './SunburstRays';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
      className="relative"
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden="true"
      >
        <motion.div
          initial={{ scale: 8 }}
          animate={{ scale: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="relative flex h-full w-full items-center justify-center"
        >
          <SunburstRays size={2400} active spinDuration={4} />
        </motion.div>
      </motion.div>
      {children}
    </motion.div>
  );
};

export default PageTransition;
