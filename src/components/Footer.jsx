import React from 'react';
import { Facebook, Instagram, Youtube, Music } from 'lucide-react';
import { footerLinks } from '../data/mock';

const socialIcon = { Facebook, Instagram, YouTube: Youtube, Spotify: Music };

const Footer = () => (
  <footer className="relative z-10 w-full border-t-2 border-black bg-[#84BFFF] py-16" data-testid="site-footer">
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-8 md:grid-cols-3">
      <div>
        <div className="font-['Alfa_Slab_One'] text-[34px] leading-[0.95] text-black">La Puce<br />&agrave; l&rsquo;oreille</div>
        <p className="mt-6 max-w-xs font-['Manrope'] text-[15px] font-extrabold leading-[1.3] text-black">Balados d&eacute;cal&eacute;s pour des enfants et ados allum&eacute;s !</p>
      </div>
      <div>
        <h4 className="font-['Alfa_Slab_One'] text-[18px] text-black">Navigation</h4>
        <ul className="mt-4 space-y-2">
          {footerLinks.navigation.map((l) => (
            <li key={l}><a href="#" className="font-['Manrope'] text-[15px] font-extrabold text-black transition-colors duration-200 hover:text-[#981082]">{l}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-['Alfa_Slab_One'] text-[18px] text-black">Suivez-nous</h4>
        <ul className="mt-4 flex flex-wrap gap-3">
          {footerLinks.social.map((s) => {
            const Icon = socialIcon[s.label] || Music;
            return (
              <li key={s.label}><a href={s.href} aria-label={s.label} className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E7DB4C]" data-testid={`social-${s.label.toLowerCase()}`}><Icon className="h-5 w-5 text-black" strokeWidth={2} /></a></li>
            );
          })}
        </ul>
        <p className="mt-8 font-['Manrope'] text-[12px] font-bold text-black/70">&copy; {new Date().getFullYear()} La puce à l&rsquo;oreille — Clone d&eacute;monstratif.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
