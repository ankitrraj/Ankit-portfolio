import React, { useEffect, useRef } from 'react';

/* ============================================================
   Ordered-dither canvases.

   Everything is drawn on a 4px cell grid. Each cell gets an
   "ink" value in 0..1 and the dot is painted when the ink beats
   the Bayer threshold for that cell. No alpha, no blur — a dot
   or no dot. That is the whole trick.

   The draw loops are deliberately flat: no closures and no
   Math.exp per cell, and every dot goes into one batched path.
   A gutter is ~47k cells and repaints while you scroll, so the
   per-cell cost is the only thing that matters here.
   ============================================================ */

const CELL = 4;
const DOT = 2;
const TILE = CELL * 8; // one Bayer tile
const PARALLAX = 0.35;

// Bayer 8x8, normalised to 0..1
const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].map((row) => Float32Array.from(row, (v) => v / 64));

/* ---------- the landscape ----------
   Three ridges, back to front. The first harmonic is triangle-folded
   so it makes peaks rather than humps; the other two roughen it. */

const RIDGES = [
  { base: 0.46, amp: 0.13, f: [9, 17, 37], p: [0.4, 1.9, 0.7], ink: 0.4 },
  { base: 0.62, amp: 0.11, f: [6, 13, 29], p: [2.2, 0.3, 1.4], ink: 0.62 },
  { base: 0.8, amp: 0.08, f: [4, 9, 19], p: [4.1, 2.6, 0.2], ink: 0.88 },
];

const ridgeAt = (r, t) => {
  const n =
    (1 - 2 * Math.abs(Math.sin(t * r.f[0] + r.p[0]))) * 0.6 +
    0.3 * Math.sin(t * r.f[1] + r.p[1]) +
    0.1 * Math.sin(t * r.f[2] + r.p[2]);
  return r.base - r.amp * n;
};

// Ink decays with depth below a crest, which is what shades the hills.
// Tabulated once so the hot loop never calls Math.exp.
const FALLOFF_MAX = 320;
const FALLOFF = Float32Array.from(
  { length: FALLOFF_MAX + 1 },
  (_, d) => 0.15 + 0.85 * Math.exp(-d / 36)
);
const falloff = (d) => FALLOFF[d >= FALLOFF_MAX ? FALLOFF_MAX : d | 0];

/* ---------- painters ---------- */

// In the gutters the landscape is turned on its side: x is the height axis,
// so each row needs its three ridge positions resolved just once.
const paintGutter = (ctx, w, h, scrolled, side) => {
  const cols = Math.ceil(w / CELL);
  const rows = Math.ceil(h / CELL);
  const left = side === 'left';
  const i0 = RIDGES[0].ink;
  const i1 = RIDGES[1].ink;
  const i2 = RIDGES[2].ink;

  ctx.beginPath();
  for (let cy = 0; cy < rows; cy++) {
    const t = (CELL * cy - scrolled) / (2.5 * w);
    const r0 = ridgeAt(RIDGES[0], t);
    const r1 = ridgeAt(RIDGES[1], t);
    const r2 = ridgeAt(RIDGES[2], t);
    const brow = BAYER[cy & 7];
    const y = CELL * cy;

    for (let cx = 0; cx < cols; cx++) {
      const u = left ? 1 - (CELL * cx) / w : (CELL * cx) / w;
      let ink = 0;
      let d = (u - r2) * w;
      if (d >= 0) ink = i2 * falloff(d);
      else {
        d = (u - r1) * w;
        if (d >= 0) ink = i1 * falloff(d);
        else {
          d = (u - r0) * w;
          if (d >= 0) ink = i0 * falloff(d);
        }
      }
      if (ink > brow[cx & 7]) ctx.rect(CELL * cx, y, DOT, DOT);
    }
  }
  ctx.fill();
};

// The horizon band runs the landscape the normal way up, with a sun disc.
const paintHorizon = (ctx, w, h, light) => {
  const cols = Math.ceil(w / CELL);
  const rows = Math.ceil(h / CELL);
  const i0 = RIDGES[0].ink;
  const i1 = RIDGES[1].ink;
  const i2 = RIDGES[2].ink;

  // each ridge's y per column — depends only on size, not on scroll
  const y0 = new Float32Array(cols);
  const y1 = new Float32Array(cols);
  const y2 = new Float32Array(cols);
  for (let cx = 0; cx < cols; cx++) {
    const t = (CELL * cx) / w;
    y0[cx] = ridgeAt(RIDGES[0], t) * h;
    y1[cx] = ridgeAt(RIDGES[1], t) * h;
    y2[cx] = ridgeAt(RIDGES[2], t) * h;
  }

  const sunR = 0.08 * Math.min(w, h);
  const sunX = 0.8 * w;
  const sunY = 0.2 * h;
  const sunR2 = sunR * sunR;

  ctx.beginPath();
  for (let cy = 0; cy < rows; cy++) {
    const py = CELL * cy;
    const brow = BAYER[cy & 7];
    for (let cx = 0; cx < cols; cx++) {
      const px = CELL * cx;
      let ink;

      const dx = px - sunX;
      const dy = py - sunY;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < sunR2) {
        const q = dist2 / sunR2;
        ink = light ? 0.5 : 0.42 * (1 - q * 0.5);
      } else {
        let d = py - y2[cx];
        if (d >= 0) ink = i2 * falloff(d);
        else {
          d = py - y1[cx];
          if (d >= 0) ink = i1 * falloff(d);
          else {
            d = py - y0[cx];
            ink = d >= 0 ? i0 * falloff(d) : 0;
          }
        }
      }
      if (ink > brow[cx & 7]) ctx.rect(px, py, DOT, DOT);
    }
  }
  ctx.fill();
};

/* ---------- shared canvas driver ---------- */

const useDitherCanvas = (canvasRef, paint, { scrolls = false } = {}) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;

    let w = 0;
    let h = 0;
    let frame = 0;
    let colour = '';
    let lastScroll = NaN;

    const readColour = () => {
      colour = getComputedStyle(document.documentElement).getPropertyValue('--art-dot').trim() || '#8884';
    };

    const draw = () => {
      frame = 0;
      if (!w || !h) return;
      // The terrain drifts at a fraction of the page and is snapped to a whole
      // Bayer tile, so the dot pattern stays registered and most scroll frames
      // resolve to the same offset and skip the repaint entirely.
      const scrolled = scrolls
        ? Math.round((window.scrollY * PARALLAX) / TILE) * TILE
        : 0;
      if (scrolls && scrolled === lastScroll) return;
      lastScroll = scrolled;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = colour;
      paint(ctx, w, h, scrolled);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const invalidate = () => {
      lastScroll = NaN;
      schedule();
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const nw = Math.max(1, Math.round(rect.width));
      const nh = Math.max(1, Math.round(rect.height));
      if (nw === w && nh === h) return;
      w = canvas.width = nw;
      h = canvas.height = nh;
      invalidate();
    };

    readColour();
    resize();

    const themeWatcher = new MutationObserver(() => {
      readColour();
      invalidate();
    });
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ['data-v2-theme'] });

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    if (scrolls) window.addEventListener('scroll', schedule, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      themeWatcher.disconnect();
      observer.disconnect();
      if (scrolls) window.removeEventListener('scroll', schedule);
    };
  }, [canvasRef, paint, scrolls]);
};

/* ---------- the cursor halo ---------- */

const HALO = 190;

export const DitherField = () => {
  const ref = useRef(null);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || reduced) return undefined;

    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return undefined;

    let w = 0;
    let h = 0;
    let px = -9999;
    let py = -9999;
    let frame = 0;
    let colour = '';

    const readColour = () => {
      colour = getComputedStyle(document.documentElement).getPropertyValue('--dither-dot').trim() || '#8886';
    };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      canvas.style.height = `${h}px`;
    };

    const draw = () => {
      frame = 0;
      ctx.clearRect(0, 0, w, h);
      if (px < 0) return;
      ctx.fillStyle = colour;

      const cx0 = Math.max(0, Math.floor((px - HALO) / CELL));
      const cx1 = Math.min(Math.ceil(w / CELL), Math.ceil((px + HALO) / CELL));
      const cy0 = Math.max(0, Math.floor((py - HALO) / CELL));
      const cy1 = Math.min(Math.ceil(h / CELL), Math.ceil((py + HALO) / CELL));

      ctx.beginPath();
      for (let cy = cy0; cy < cy1; cy++) {
        const y = cy * CELL;
        const dy = y - py;
        const brow = BAYER[cy & 7];
        for (let cx = cx0; cx < cx1; cx++) {
          const x = cx * CELL;
          const dx = x - px;
          const dist2 = dx * dx + dy * dy;
          if (dist2 > HALO * HALO) continue;
          // compare squared falloff against the threshold, so no sqrt
          const f = 1 - Math.sqrt(dist2) / HALO;
          if (f * f > brow[cx & 7]) ctx.rect(x, y, DOT, DOT);
        }
      }
      ctx.fill();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      schedule();
    };
    const onLeave = () => {
      px = -9999;
      py = -9999;
      schedule();
    };

    readColour();
    resize();

    const themeWatcher = new MutationObserver(readColour);
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ['data-v2-theme'] });

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      themeWatcher.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} className="dither" aria-hidden="true" />;
};

/* ---------- gutters + horizon band ---------- */

const paintLeft = (ctx, w, h, scrolled) => paintGutter(ctx, w, h, scrolled, 'left');
const paintRight = (ctx, w, h, scrolled) => paintGutter(ctx, w, h, scrolled, 'right');
const paintBand = (ctx, w, h) =>
  paintHorizon(ctx, w, h, document.documentElement.dataset.v2Theme === 'light');

export const Land = ({ children }) => {
  const leftCv = useRef(null);
  const rightCv = useRef(null);
  const bandCv = useRef(null);

  useDitherCanvas(leftCv, paintLeft, { scrolls: true });
  useDitherCanvas(rightCv, paintRight, { scrolls: true });
  useDitherCanvas(bandCv, paintBand);

  return (
    <>
      <div className="land">
        <div className="gutter" data-side="left" aria-hidden="true">
          <canvas ref={leftCv} />
        </div>
        <div className="gutter" data-side="right" aria-hidden="true">
          <canvas ref={rightCv} />
        </div>
        {children}
      </div>
      <div className="horizon" aria-hidden="true">
        <canvas ref={bandCv} />
      </div>
    </>
  );
};
