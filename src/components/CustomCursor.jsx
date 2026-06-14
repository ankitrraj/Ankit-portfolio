import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (hidden) setHidden(false);
    };
    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const onOver = (e) => {
      const t = e.target;
      const interactive = t.closest('a, button, [data-cursor="hover"], input, textarea, select');
      setHovering(!!interactive);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    let raf;
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${hovering ? 1.8 : 1})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, [hovering, hidden]);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 rounded-full border-2 border-black md:block"
        style={{
          mixBlendMode: 'difference',
          backgroundColor: hovering ? '#EF724F' : 'transparent',
          transition: 'background-color 240ms ease, border-color 240ms ease, opacity 200ms ease',
          opacity: hidden ? 0 : 1,
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 rounded-full bg-black md:block"
        style={{ opacity: hidden ? 0 : 1, transition: 'opacity 200ms ease' }}
      />
    </>
  );
};

export default CustomCursor;
