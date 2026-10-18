import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import StarBurst from './StarBurst';
import SunburstRays from './SunburstRays';

const QuestionWidget = () => {
  const [hover, setHover] = useState(false);
  return (
    <section className="relative z-10 w-full overflow-hidden py-24 scroll-mt-24" id="contact" data-testid="contact-widget">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-8 text-center">
        <div className="relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className="pointer-events-none absolute left-1/2 top-1/2"><SunburstRays size={1400} active={hover} spinDuration={14} /></div>
          <div className="relative h-[480px] w-[480px] sm:h-[560px] sm:w-[560px]" style={{ transform: hover ? 'rotate(25deg) scale(1.06)' : 'none', transition: 'transform 700ms cubic-bezier(.2,.9,.2,1)' }}>
            <StarBurst color={hover ? '#981082' : '#EF724F'} stroke="#000" strokeWidth={2} className="absolute inset-0 h-full w-full" style={{ transition: 'fill 500ms ease' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center" style={{ transform: hover ? 'rotate(-25deg)' : 'none', transition: 'transform 700ms cubic-bezier(.2,.9,.2,1)' }}>
              <h3 className="font-['Manrope'] text-[36px] font-extrabold leading-[1.05] text-black sm:text-[46px]">Let’s build<br />something great</h3>
              <a href="mailto:ai.ankitrajoria@gmail.com" className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-black bg-white px-7 py-3 text-[15px] font-extrabold text-black transition-all duration-300 hover:bg-[#ACE2DF] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2" data-testid="contact-email-btn">
                <Mail className="h-5 w-5 text-[#EF724F]" strokeWidth={2.5} />ai.ankitrajoria@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionWidget;
