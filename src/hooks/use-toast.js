import { useState, useCallback } from 'react';

let toastCount = 0;
const listeners = new Set();
let toasts = [];

function dispatch(action) {
  toasts = action.type === 'ADD' ? [...toasts, action.toast] : action.type === 'DISMISS' ? toasts.map(t => t.id === action.id ? { ...t, open: false } : t) : toasts.filter(t => t.id !== action.id);
  listeners.forEach(l => l(toasts));
}

export function useToast() {
  const [state, setState] = useState(toasts);
  useState(() => { listeners.add(setState); return () => listeners.delete(setState); });

  const toast = useCallback(({ title, description, variant }) => {
    const id = ++toastCount;
    dispatch({ type: 'ADD', toast: { id, title, description, variant, open: true } });
    setTimeout(() => dispatch({ type: 'DISMISS', id }), 3000);
    setTimeout(() => dispatch({ type: 'REMOVE', id }), 3600);
  }, []);

  const dismiss = useCallback((id) => dispatch({ type: 'DISMISS', id }), []);

  return { toasts: state, toast, dismiss };
}
