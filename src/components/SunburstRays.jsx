import React from 'react';
import { BRAND_COLORS } from '../data/mock';

const SunburstRays = ({ size = 1800, active = false, spinDuration = 22 }) => {
  const rays = 24;
  const step = 360 / rays;
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 z-0"
      style={{
        width: size,
        height: size,
        transform: `translate(-50%, -50%) scale(${active ? 1 : 0})`,
        opacity: active ? 1 : 0,
        transition: 'transform 700ms cubic-bezier(.2,.9,.2,1), opacity 500ms ease',
      }}
      aria-hidden="true"
    >
      <div
        className="relative h-full w-full"
        style={{ animation: active ? `sunspin ${spinDuration}s linear infinite` : 'none' }}
      >
        {Array.from({ length: rays }).map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              width: 0,
              height: '50%',
              borderLeft: `${(size * Math.PI) / rays / 2}px solid transparent`,
              borderRight: `${(size * Math.PI) / rays / 2}px solid transparent`,
              borderBottom: `${size / 2}px solid ${BRAND_COLORS[i % BRAND_COLORS.length]}`,
              transform: `translate(-50%, -100%) rotate(${i * step}deg)`,
              transformOrigin: '50% 100%',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SunburstRays;
