import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VersionGate.css';

export const VERSION_KEY = 'portfolio-version';

/* First-visit chooser. Two halves, one per design — pick a side and
   that choice is remembered, so this only ever shows once. The pill
   switcher handles changing your mind later. */

const VersionGate = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(() => !localStorage.getItem(VERSION_KEY));
  const [leaving, setLeaving] = useState(null);
  // the keydown listener is bound once, so read "already chosen" from a ref
  const pickedRef = useRef(false);

  const pick = useCallback(
    (which) => {
      if (pickedRef.current) return;
      pickedRef.current = true;
      localStorage.setItem(VERSION_KEY, which);
      setLeaving(which);
      const go = () => {
        navigate(which === 'new' ? '/v2' : '/');
        setOpen(false);
      };
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) go();
      else setTimeout(go, 420);
    },
    [navigate]
  );

  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('vgate-open');
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') pick('old');
      else if (e.key === 'ArrowRight' || e.key === 'Escape') pick('new');
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.documentElement.classList.remove('vgate-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [open, pick]);

  if (!open) return null;

  return (
    <div className={`vgate${leaving ? ` vgate--leaving vgate--picked-${leaving}` : ''}`} role="dialog" aria-modal="true" aria-label="Choose a portfolio version">
      <div className="vgate-ask">
        <span className="vgate-ask-k">Before you start</span>
        <h2 className="vgate-ask-h">Which Ankit do you want?</h2>
      </div>

      <button type="button" className="vgate-half vgate-half--old" onClick={() => pick('old')}>
        <span className="vgate-swatches" aria-hidden="true">
          <i style={{ background: '#84BFFF' }} />
          <i style={{ background: '#EF724F' }} />
          <i style={{ background: '#E7DB4C' }} />
          <i style={{ background: '#981082' }} />
        </span>
        <span className="vgate-title">The older Ankit</span>
        <span className="vgate-sub">Loud, playful, colour everywhere. Big type and things that spin.</span>
        <span className="vgate-cta">Take me there</span>
      </button>

      <button type="button" className="vgate-half vgate-half--new" onClick={() => pick('new')}>
        <span className="vgate-rules" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span className="vgate-title">The newer Ankit</span>
        <span className="vgate-sub">Quiet, editorial, dithered. Built like a spec sheet.</span>
        <span className="vgate-cta">Take me there</span>
      </button>

      <span className="vgate-hint" aria-hidden="true">← / → to choose</span>
    </div>
  );
};

export default VersionGate;
