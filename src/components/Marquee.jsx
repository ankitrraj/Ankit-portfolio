import React from 'react';
import { marqueeWords } from '../data/mock';

const Marquee = ({ words = marqueeWords, color = '#981082', textColor = '#fff', speed = 30, reverse = false }) => {
  const items = [...words, ...words, ...words];
  return (
    <div className="w-full overflow-hidden border-y-2 border-black py-4" style={{ backgroundColor: color }} data-testid="marquee-band">
      <div className="flex whitespace-nowrap" style={{ animation: `${reverse ? 'marqueeReverse' : 'marquee'} ${speed}s linear infinite` }}>
        {items.map((w, i) => (
          <span key={i} className="mx-8 inline-flex items-center font-['Alfa_Slab_One'] text-[48px] leading-none" style={{ color: textColor }}>
            {w}
            <span className="ml-8 inline-block h-3 w-3 rounded-full" style={{ backgroundColor: textColor === '#fff' ? '#E7DB4C' : '#981082' }} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
