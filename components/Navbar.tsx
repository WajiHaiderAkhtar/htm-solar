
import React, { useState, useEffect } from 'react';
import { NAV_LINKS, smoothScroll } from '../constants';
import { SectionId, PageView } from '../types';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: PageView;
  onNavigate: (view: PageView, targetId?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, link: { href: string; isPage: boolean; label: string }) => {
    try {
      e.preventDefault();
      setMobileMenuOpen(false);

      if (link.label === 'Govt Subsidy') {
        onNavigate('subsidy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (link.label === 'Our Story') {
        onNavigate('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Section on main page
        if (currentView !== 'main') {
          onNavigate('main', link.href);
        } else {
          smoothScroll(e, link.href);
        }
      }
    } catch (err) {
      console.error("Navigation Error:", err);
    }
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLElement>) => {
    try {
      e.preventDefault();
      setMobileMenuOpen(false);
      if (currentView !== 'main') {
        onNavigate('main', `#${SectionId.CALCULATOR}`);
      } else {
        smoothScroll(e, `#${SectionId.CALCULATOR}`);
      }
    } catch (err) {
      console.error("CTA Error:", err);
    }
  };

  return (
    <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4`}>
      <div className={`w-full max-w-5xl transition-all duration-500 ${
          isScrolled || currentView !== 'main'
            ? 'bg-black/90 backdrop-blur-xl shadow-2xl border border-white/10 rounded-full py-3 px-6'
            : 'bg-transparent py-4 px-6'
        }`}>
        <div className="flex items-center justify-between">
          <a href={`#${SectionId.HOME}`} 
            onClick={(e) => handleLinkClick(e, { href: `#${SectionId.HOME}`, isPage: false, label: 'Home' })}
            className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-white/20 p-1 shadow-lg transition-transform duration-500 ease-in-out group-hover:scale-110">
                <img src="logo.png" alt="HTM Solar Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`text-xl font-bold tracking-tight text-white`}>
              HTM<span className="font-light text-htm-gold">Solar</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            <div className={`flex items-center gap-2 px-2 py-1 rounded-full ${isScrolled || currentView !== 'main' ? 'bg-white/5 border border-white/5' : ''}`}>
                {NAV_LINKS.map((link) => (
                <a key={link.label} href={link.href} onClick={(e) => handleLinkClick(e, link)}
                    className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer group
                       ${(link.label === 'Govt Subsidy' && currentView === 'subsidy') || (link.label === 'Our Story' && currentView === 'about')
                          ? 'bg-htm-green text-white shadow-[0_0_15px_rgba(52,211,153,0.3)]' 
                          : 'text-white hover:text-htm-gold'
                       }
                    `}>
                    {link.label}
                    {!(link.label === 'Govt Subsidy' && currentView === 'subsidy') && !(link.label === 'Our Story' && currentView === 'about') && (
                      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-htm-gold transition-all duration-300 ease-out group-hover:w-1/2 opacity-0 group-hover:opacity-100"></span>
                    )}
                </a>
                ))}
            </div>
          </div>

          <div className="hidden md:block">
            <a href={`#${SectionId.CALCULATOR}`} onClick={handleCtaClick}
              className={`relative overflow-hidden px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer transform hover:-translate-y-1 active:translate-y-0 active:scale-95
                ${isScrolled || currentView !== 'main' ? 'bg-white text-black hover:bg-htm-gold hover:shadow-[0_0_20_rgba(234,179,8,0.4)]' : 'bg-white text-black hover:shadow-[0_0_20_rgba(255,255,255,0.3)]'}
              `}>
              Get Quote
            </a>
          </div>

          <button className="md:hidden p-2 text-white cursor-pointer hover:bg-white/10 rounded-full transition-colors active:scale-90" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-24 left-4 right-4 bg-htm-dark border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:hidden flex flex-col gap-4 animate-fade-in-up origin-top shadow-2xl z-50">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={`text-xl font-display transition-all duration-300 text-center py-2 cursor-pointer hover:tracking-widest ${
                  (link.label === 'Govt Subsidy' && currentView === 'subsidy') || (link.label === 'Our Story' && currentView === 'about')
                  ? 'text-htm-gold font-bold' : 'text-white hover:text-htm-gold'
              }`} onClick={(e) => handleLinkClick(e, link)}>
              {link.label}
            </a>
          ))}
          <div className="h-px bg-white/10 w-full my-2"></div>
          <a href={`#${SectionId.CALCULATOR}`} className="w-full bg-htm-gold text-htm-dark py-4 rounded-xl text-center font-bold uppercase tracking-widest shadow-lg cursor-pointer hover:bg-white transition-colors active:scale-95" onClick={handleCtaClick}>
            Get a Quote
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
