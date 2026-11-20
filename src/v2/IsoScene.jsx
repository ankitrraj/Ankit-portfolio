import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { g } from './scenes';
import { r1, pts } from './iso';

/* Renders one architecture scene: the machine, its labels, the packets
   travelling its routes, and the panel that reads out whichever part
   you are pointing at. Hover on a pointer, tap to pin on touch. */

const VIEWBOX = '0 0 900 520';

const along = (route, segs, total, t) => {
  let d = t * total;
  const p = route.p;
  for (let k = 0; k < segs.length; k++) {
    if (d <= segs[k] || k === segs.length - 1) {
      const f = Math.min(1, d / segs[k]);
      const a = p[k];
      const b = p[k + 1];
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
    }
    d -= segs[k];
  }
  return p[p.length - 1];
};

const IsoScene = ({ scene }) => {
  const svgRef = useRef(null);
  const pktLayer = useRef(null);
  const [active, setActive] = useState(null);
  const [pinned, setPinned] = useState(null);

  const shown = pinned ?? active;
  const part = scene.parts.find((p) => p.id === shown) ?? null;

  // ---- the drawing itself, rebuilt only when the scene changes
  const markup = React.useMemo(() => {
    const cube = g
      .box(-0.22, -0.22, 0, 0.44, 0.44, 0.44)
      .replace('class="fl "', 'class="pkt-l"')
      .replace('class="fr "', 'class="pkt-r"')
      .replace('class="ft "', 'class="pkt-t"');

    let out = `<defs><g id="pkt-${scene.id}">${cube}</g></defs>`;
    out += scene.scenery();
    out += scene.routes
      .map((r) => `<polyline class="route" points="${pts(r.p.map((q) => g.P(...q)))}"/>`)
      .join('');
    out += scene.parts
      .map(
        (p) =>
          `<g class="part${p.ch ? ` ch-${p.ch}` : ''}" data-id="${p.id}" tabindex="0" role="button" ` +
          `aria-label="${p.label}: ${p.desc.replace(/"/g, '&quot;')}">${p.draw()}</g>`
      )
      .join('');
    out += `<g class="pkts"></g>`;
    out += scene.parts
      .map((p) => {
        const [ax, ay] = g.P(...p.at);
        const lx = ax + p.dx;
        const ly = ay + p.dy;
        const tx = p.dx >= 0 ? lx + 5 : lx - 5;
        return (
          `<g class="lbl${p.ch ? ` ch-${p.ch}` : ''}" data-id="${p.id}">` +
          `<circle cx="${r1(ax)}" cy="${r1(ay)}" r="2"/>` +
          `<polyline points="${r1(ax)},${r1(ay)} ${r1(ax)},${r1(ly)} ${r1(lx)},${r1(ly)}"/>` +
          `<text x="${r1(tx)}" y="${r1(ly + 4)}" text-anchor="${p.dx >= 0 ? 'start' : 'end'}">${p.label}</text></g>`
        );
      })
      .join('');
    return out;
  }, [scene]);

  // ---- packets riding the routes
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;
    const layer = svg.querySelector('.pkts');
    pktLayer.current = layer;
    if (!layer) return undefined;
    layer.innerHTML = '';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const base = g.P(0, 0, 0);
    const packets = [];

    scene.routes.forEach((r) => {
      const segs = [];
      let total = 0;
      for (let k = 1; k < r.p.length; k++) {
        const a = r.p[k - 1];
        const b = r.p[k];
        const l = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
        segs.push(l);
        total += l;
      }
      for (let k = 0; k < r.n; k++) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        el.setAttribute('href', `#pkt-${scene.id}`);
        if (r.ch) el.setAttribute('class', `ch-${r.ch}`);
        layer.appendChild(el);
        packets.push({ el, r, segs, total, off: k / r.n });
      }
    });

    const place = (now) => {
      for (const pk of packets) {
        const t = reduced ? (pk.off + 0.5) % 1 : (now / 1000 / pk.r.t + pk.off) % 1;
        const [x, y] = g.P(...along(pk.r, pk.segs, pk.total, t));
        pk.el.setAttribute('transform', `translate(${r1(x - base[0])},${r1(y - base[1])})`);
        pk.el.setAttribute('opacity', reduced ? '1' : String(Math.min(1, t / 0.08, (1 - t) / 0.12)));
      }
    };

    place(performance.now());
    if (reduced) return () => { layer.innerHTML = ''; };

    let frame = 0;
    const loop = (now) => {
      place(now);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      layer.innerHTML = '';
    };
  }, [scene]);

  // ---- rotating check-in code, where a scene asks for one
  useLayoutEffect(() => {
    const holder = scene.parts.find((p) => p.code);
    const svg = svgRef.current;
    if (!holder || !svg) return undefined;
    const [x, y, z] = holder.code;
    const [px, py] = g.P(x, y, z);
    const node = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    node.setAttribute('class', 'code-text');
    node.setAttribute('transform', `matrix(0.866,0.5,0,1,${r1(px)},${r1(py)})`);
    node.textContent = '4729';
    svg.querySelector(`.part[data-id="${holder.id}"]`)?.appendChild(node);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(() => {
      node.textContent = String(1000 + Math.floor(Math.random() * 9000));
    }, 2600);
    return () => clearInterval(timer);
  }, [scene, markup]);

  // ---- pointer wiring
  const idOf = (e) => e.target.closest?.('[data-id]')?.dataset.id ?? null;

  const onOver = useCallback((e) => {
    const id = idOf(e);
    if (id) setActive(id);
  }, []);
  const onOut = useCallback((e) => {
    const id = idOf(e);
    if (id && !e.relatedTarget?.closest?.(`[data-id="${id}"]`)) setActive(null);
  }, []);
  const onClick = useCallback((e) => {
    const id = idOf(e);
    setPinned((prev) => (id && prev !== id ? id : null));
  }, []);
  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setPinned(idOf(e));
    }
    if (e.key === 'Escape') setPinned(null);
  }, []);

  useEffect(() => {
    setActive(null);
    setPinned(null);
  }, [scene]);

  // reflect the highlight onto the drawing
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.classList.toggle('has-active', Boolean(shown));
    svg.querySelectorAll('.part, .lbl').forEach((el) => {
      el.classList.toggle('on', el.dataset.id === shown);
    });
  }, [shown, markup]);

  return (
    <div className="iso">
      <div className="iso-stage">
        <svg
          ref={svgRef}
          viewBox={VIEWBOX}
          role="img"
          aria-label={`${scene.name}: ${scene.parts.map((p) => p.label).join(', ')}`}
          dangerouslySetInnerHTML={{ __html: markup }}
          onPointerOver={onOver}
          onPointerOut={onOut}
          onClick={onClick}
          onFocusCapture={onOver}
          onBlurCapture={() => !pinned && setActive(null)}
          onKeyDown={onKeyDown}
        />
      </div>

      <div className="iso-read" aria-live="polite">
        {part ? (
          <>
            <strong>{part.label}</strong>
            <p>{part.desc}</p>
            <span className="iso-num">{part.num}</span>
          </>
        ) : (
          <span className="iso-hint">Hover or tap any part of the machine.</span>
        )}
      </div>

      <ul className="iso-parts">
        {scene.parts.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              className={shown === p.id ? 'on' : undefined}
              onClick={() => setPinned((prev) => (prev === p.id ? null : p.id))}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
            >
              {p.label}
            </button>
          </li>
        ))}
      </ul>

      <p className="iso-prose">{scene.prose}</p>

      {scene.stats && (
        <div className="iso-stats">
          {scene.stats.map(([v, k]) => (
            <div className="iso-stat" key={k}>
              <b>{v}</b>
              <span>{k}</span>
            </div>
          ))}
        </div>
      )}

      <p className="mech-stack">Built with {scene.stack.join(' · ')}</p>
    </div>
  );
};

export default IsoScene;
