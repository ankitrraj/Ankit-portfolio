import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { VERSION_KEY } from './VersionGate';
import './VersionSwitch.css';

/* A segmented control pinned bottom-left that swaps between the two
   portfolio designs. It wears whichever skin matches the page it is on. */

const VersionSwitch = () => {
  const { pathname } = useLocation();
  const onNew = pathname.startsWith('/v2');

  return (
    <div className={`vswitch ${onNew ? 'vswitch--new' : 'vswitch--old'}`} role="group" aria-label="Portfolio version">
      <span className="vswitch-k">Version</span>
      <div className="vswitch-track">
        <span className="vswitch-thumb" aria-hidden="true" />
        <Link
          to="/"
          className="vswitch-opt"
          aria-current={!onNew || undefined}
          onClick={() => localStorage.setItem(VERSION_KEY, 'old')}
        >
          Old
        </Link>
        <Link
          to="/v2"
          className="vswitch-opt"
          aria-current={onNew || undefined}
          onClick={() => localStorage.setItem(VERSION_KEY, 'new')}
        >
          New
        </Link>
      </div>
    </div>
  );
};

export default VersionSwitch;
