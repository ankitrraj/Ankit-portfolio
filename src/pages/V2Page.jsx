import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Moon, Sun, ArrowUpRight, ArrowRight, Copy, Check } from 'lucide-react';
import '../v2/v2.css';
import { DitherField, Land } from '../v2/Dither';
import { identity, intro, products, writing, awards, career, LAYERS } from '../v2/data';

/* ---------------- theme + iris wipe ---------------- */

const useTheme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('v2-theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('v2-theme', theme);
    document.documentElement.dataset.v2Theme = theme;
  }, [theme]);

  const toggle = (event) => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduced) {
      setTheme(next);
      return;
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty('--vt-r', `${r}px`);
    root.classList.add('v2-iris');

    document.startViewTransition(() => setTheme(next))
      .finished.finally(() => root.classList.remove('v2-iris'));
  };

  return [theme, toggle];
};

/* ---------------- scroll progress ---------------- */

const Progress = () => {
  const ref = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const pct = max > 0 ? scrollY / max : 0;
      if (ref.current) ref.current.style.scale = `${pct} 1`;
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);
  return <span className="ruler-prog" ref={ref} aria-hidden="true" />;
};

/* ---------------- copy-to-clipboard chip ---------------- */

const MailChip = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(identity.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${identity.email}`;
    }
  };
  return (
    <button type="button" className="chip" onClick={copy} data-copied={copied || undefined}>
      {copied ? <Check size={13} strokeWidth={2.2} /> : <Copy size={13} strokeWidth={2.2} />}
      {identity.email}
      <span className="sr-only">{copied ? 'Copied' : 'Copy email address'}</span>
    </button>
  );
};

/* ---------------- work: tabs with sliding hoverbar ---------------- */

const Work = ({ items, withLinks }) => {
  const [active, setActive] = useState(0);
  const [facet, setFacet] = useState(null);
  const listRef = useRef(null);
  const barRef = useRef(null);

  const moveBar = useCallback((index) => {
    const list = listRef.current;
    const bar = barRef.current;
    if (!list || !bar) return;
    const cell = list.children[index + 1]; // child 0 is the bar itself
    if (!cell) return;
    const base = list.getBoundingClientRect();
    const rect = cell.getBoundingClientRect();
    bar.style.width = `${rect.width}px`;
    bar.style.transform = `translateX(${rect.left - base.left}px)`;
    bar.style.opacity = '1';
  }, []);

  const hideBar = () => {
    if (barRef.current) barRef.current.style.opacity = '0';
  };

  const product = items[active];

  return (
    <div className="work">
      <div className="work-list" ref={listRef} role="tablist" onMouseLeave={hideBar}>
        <span className="hoverbar" ref={barRef} aria-hidden="true" />
        {items.map((item, i) => (
          <div className="work-cell" key={item.id} data-active={active === i || undefined}>
            <button
              type="button"
              role="tab"
              aria-selected={active === i}
              className="work-item"
              onClick={() => {
                setActive(i);
                setFacet(null);
              }}
              onMouseEnter={() => moveBar(i)}
              onFocus={() => moveBar(i)}
            >
              <span className="work-words">
                <span className="work-title">{item.name}</span>
                <span className="work-meta">{item.status}</span>
              </span>
            </button>
            {withLinks && item.live && (
              <a className="work-out" href={item.url} target="_blank" rel="noreferrer" aria-label={`Open ${item.name}`}>
                <ArrowUpRight size={18} strokeWidth={1.8} />
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="work-panels">
        <div className="work-panel" key={product.id}>
          <div className="work-body">
            <div className="plate" aria-hidden="true">
              {LAYERS.map((layer) => {
                const lit = facet ? product.facets.find((f) => f.id === facet)?.layers ?? [] : [];
                return (
                  <div className="plate-layer" key={layer.id} data-on={lit.includes(layer.id) || undefined}>
                    <div className="plate-nm">{layer.name}</div>
                    <div className="plate-tx">{layer.desc}</div>
                  </div>
                );
              })}
            </div>

            <div className="facets">
              {product.facets.map((f) => (
                <button
                  type="button"
                  className="facet"
                  key={f.id}
                  data-on={facet === f.id || undefined}
                  onMouseEnter={() => setFacet(f.id)}
                  onMouseLeave={() => setFacet(null)}
                  onFocus={() => setFacet(f.id)}
                  onBlur={() => setFacet(null)}
                >
                  <span className="facet-nm">{f.name}</span>
                  <span className="facet-tx">{f.text}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="work-text">
            <p className="mech-body">{product.summary}</p>
            <p className="mech-stack">{product.tech}</p>
            {product.live && (
              <a className="work-site" href={product.url} target="_blank" rel="noreferrer">
                {product.url.replace('https://', '')}
                <ArrowUpRight size={13} strokeWidth={2} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- hero figure: the stack plate ----------------
   Introduces the Client / API / Data / Edge vocabulary that the
   work section then reuses for every product. */

const StackPlate = () => {
  const w = 330;
  const plateW = 190;
  const plateH = 34;
  const gap = 20;
  const x0 = 10;

  return (
    <figure className="fig">
      <svg viewBox={`0 0 ${w} ${(plateH + gap) * LAYERS.length + 16}`} role="img" aria-label="The four layers I build across">
        {LAYERS.map((layer, i) => {
          const y = i * (plateH + gap) + 8;
          const nextY = y + plateH + gap;
          return (
            <g className="deck" key={layer.id}>
              {i < LAYERS.length - 1 && (
                <path className="run-d" d={`M${x0 + 24} ${y + plateH} V${nextY}`} />
              )}
              <rect className="plate-face" x={x0} y={y} width={plateW} height={plateH} rx="2" />
              <circle className="pin" cx={x0 + 14} cy={y + plateH / 2} r="2.5" />
              <text className="plate-k" x={x0 + 26} y={y + plateH / 2 + 4}>
                {layer.name.toUpperCase()}
              </text>
              <text className="plate-v" x={x0 + plateW + 12} y={y + plateH / 2 + 3.5}>
                {layer.desc}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption className="fig-cap">Every product below is built across all four.</figcaption>
    </figure>
  );
};

/* ---------------- career: svg timeline with stations ---------------- */

const W = 1000;
const ROW = 54;
const PAD = 8;

const Career = () => {
  const [active, setActive] = useState(0);
  const { years, stations } = career;
  const height = PAD + stations.length * ROW + 24;
  const x = (t) => PAD + t * (W - PAD * 2);
  const item = stations[active];

  return (
    <div className="career">
      <div className="career-fig">
        <svg viewBox={`0 0 ${W} ${height}`} role="img" aria-label="Career timeline">
          {/* year axis */}
          <path className="axis" d={`M${PAD} 18 H${W - PAD}`} />
          {years.map((y, i) => {
            const t = i / (years.length - 1);
            return (
              <g key={y.label}>
                <text x={x(t)} y={12} textAnchor={i === years.length - 1 ? 'end' : 'start'}>
                  {y.label}
                </text>
                <path className="guide" d={`M${x(t)} 18 V${height - 12}`} />
              </g>
            );
          })}

          {stations.map((s, i) => {
            const y = PAD + 34 + i * ROW;
            return (
              <g
                className="station"
                key={s.org}
                data-active={active === i || undefined}
                tabIndex={0}
                role="button"
                aria-label={`${s.org} — ${s.period}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <rect x={x(s.from)} y={y - 22} width={x(s.to) - x(s.from)} height={30} fill="transparent" />
                <text className="org" x={x(s.from)} y={y - 8}>
                  {s.org}
                </text>
                <path className="bar" d={`M${x(s.from)} ${y + 6} H${x(s.to)}`} />
                <circle className="pt" cx={x(s.from)} cy={y + 6} r={4} />
                {s.to < 1 && <circle className="pt" cx={x(s.to)} cy={y + 6} r={4} />}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="tl-cap">
        <div className="cap-in" key={item.org}>
          <div className="cap-head">
            <b>{item.title}</b>
            <span className="cap-period">{item.period}</span>
          </div>
          <ul>
            {item.points.map((p) => (
              <li key={p.slice(0, 28)}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* ---------------- rows ---------------- */

const Rows = ({ items }) => (
  <div className="rows">
    {items.map((it) => (
      <div className="row" key={it.title}>
        <span className="row-lead">{it.date}</span>
        <span className="row-main">
          {it.url ? (
            <a href={it.url} target="_blank" rel="noreferrer">
              {it.title}
            </a>
          ) : (
            it.title
          )}
          <span className="row-sub">{it.sub}</span>
        </span>
        <span className="row-trail">{it.meta}</span>
      </div>
    ))}
  </div>
);

/* ---------------- page ---------------- */

const V2Page = () => {
  const [theme, toggleTheme] = useTheme();
  const [section, setSection] = useState('Home');

  useLayoutEffect(() => {
    document.documentElement.classList.add('v2-active');
    return () => document.documentElement.classList.remove('v2-active');
  }, []);

  // header rule shows the section you are currently in
  useEffect(() => {
    const folds = Array.from(document.querySelectorAll('[data-sec]'));
    if (!folds.length) return undefined;
    const onScroll = () => {
      const current = folds.filter((f) => f.getBoundingClientRect().top < 120).pop();
      setSection(current ? current.dataset.sec : 'Home');
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  const live = products.filter((p) => p.live).length;

  return (
    <div className="v2" data-theme={theme}>
      <DitherField />
      <Progress />

      <Land>
        <div className="sheet">
          <div className="wrap">
            <header className="hd">
              <div className="hd-strip">
                <div className="hd-row">
                  <a className="hd-brand" href="#top">
                    <span className="hd-name">
                      Ankit <em>Rajoria</em>
                    </span>
                  </a>
                  <nav className="hd-nav">
                    <a href="#work">Work</a>
                    <a href="#writing">Writing</a>
                    <a href="#awards">Awards</a>
                  </nav>
                  <div className="hd-ctls">
                    <button
                      type="button"
                      className="ctl"
                      onClick={toggleTheme}
                      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    >
                      {theme === 'dark' ? <Sun size={15} strokeWidth={2} /> : <Moon size={15} strokeWidth={2} />}
                    </button>
                  </div>
                </div>
                <div className="hd-rule" aria-hidden="true">
                  <span className="hd-hair hd-cap" />
                  <span className="hd-title">{section}</span>
                  <span className="hd-hair" />
                  <span className="hd-year">2026</span>
                  <span className="hd-hair hd-cap" />
                </div>
              </div>
            </header>

            <main>
              <section className="subject" id="top">
                <div className="subject-grid">
                <div className="intro">
                  <h1>{intro.headline}</h1>
                  <p className="intro-lede">{intro.lede}</p>
                  {intro.paras.map((p) => (
                    <p key={p.slice(0, 24)} dangerouslySetInnerHTML={{ __html: p }} />
                  ))}
                  <p className="intro-ask">{intro.ask}</p>

                  <div className="intro-actions">
                    <MailChip />
                    <div className="socials">
                      <a href={identity.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                        <Github strokeWidth={1.8} />
                      </a>
                      <a href={identity.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                        <Linkedin strokeWidth={1.8} />
                      </a>
                      <a href={`mailto:${identity.email}`} aria-label="Email">
                        <Mail strokeWidth={1.8} />
                      </a>
                    </div>
                  </div>
                </div>
                <StackPlate />
                </div>
              </section>

              <section className="fold" data-sec="Growth" data-count="3 yrs" data-note="measured in shipped things">
                <h2 className="sr-only">Career</h2>
                <Career />
                <a className="more" href="#work">
                  See what I built <ArrowRight size={13} strokeWidth={2} />
                </a>
              </section>

              <section
                className="fold"
                id="work"
                data-sec="In production"
                data-count={String(live)}
                data-note="built and run by me"
              >
                <h2 className="sr-only">Products</h2>
                <Work items={products} withLinks />
              </section>

              <section
                className="fold"
                id="writing"
                data-sec="Writing"
                data-count={String(writing.length)}
                data-note="working out loud"
              >
                <h2 className="sr-only">Writing</h2>
                <Rows items={writing} />
              </section>

              <section
                className="fold"
                id="awards"
                data-sec="Awards"
                data-count={String(awards.length)}
                data-note="won on weekends"
              >
                <h2 className="sr-only">Awards</h2>
                <Rows items={awards} />
              </section>
            </main>

            <footer className="v2-ft">
              <p>
                {identity.role}
                <br />
                Open to full-stack, product and AI engineering roles.
              </p>
              <p>
                <a className="work-site" href={`mailto:${identity.email}`}>
                  {identity.email}
                </a>
              </p>
            </footer>
          </div>
        </div>
      </Land>
    </div>
  );
};

export default V2Page;
