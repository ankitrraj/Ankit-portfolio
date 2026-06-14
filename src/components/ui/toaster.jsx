import React from 'react';
import { useToast } from '../../hooks/use-toast';

export function Toaster() {
  const { toasts } = useToast();
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="rounded-[16px] border-2 border-black bg-white px-6 py-4 shadow-[4px_4px_0_#000] transition-all duration-300"
          style={{ opacity: t.open ? 1 : 0, transform: t.open ? 'translateY(0)' : 'translateY(12px)' }}
        >
          {t.title && <p className="font-['Manrope'] text-[15px] font-extrabold text-black">{t.title}</p>}
          {t.description && <p className="mt-1 font-['Manrope'] text-[13px] font-medium text-black/70">{t.description}</p>}
        </div>
      ))}
    </div>
  );
}
