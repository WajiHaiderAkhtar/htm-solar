
import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { ArrowDown, Sun, Phone } from 'lucide-react';
import { HERO_IMAGES, smoothScroll } from '../constants';
import CursorSpotlight from './CursorSpotlight';

const Hero: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000); // 4 Seconds per slide
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        // Normalize mouse position from -1 to 1
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id={SectionId.HOME} className="relative h-screen w-full overflow-hidden bg-htm-dark font-sans flex flex-col">
      
      {/* Background Slideshow Layer with Parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none bg-black overflow-hidden">
        {HERO_IMAGES.map((img, index) => (
            <div 
                key={img}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentImage ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
            >
                {/* Image with Ken Burns Effect + Mouse Parallax */}
                <div 
                    className="w-full h-full overflow-hidden"
                    style={{
                        transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0) scale(1.1)` // Subtle parallax movement
                    }}
                >
                    <img 
                        src={img} 
                        alt={`Hero Background ${index + 1}`}
                        className={`w-full h-full object-cover origin-center ${index === currentImage ? 'animate-ken-burns' : ''}`}
                    />
                </div>
                
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-htm-dark via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-htm-dark/80 via-transparent to-transparent"></div>
            </div>
        ))}

        {/* Grain Texture */}
        <div className="absolute inset-0 bg-grain opacity-20 z-20 mix-blend-overlay pointer-events-none"></div>
        
        {/* Cursor Spotlight - Gold Glow */}
        <CursorSpotlight color="radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, transparent 70%)" size={800} />
      </div>

      {/* Decorative Technical Elements */}
      <div className="absolute top-28 right-8 md:right-12 z-30 hidden lg:block">
        <div className="flex flex-col gap-3 items-end">
            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 transition-colors cursor-default">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[10px] font-mono text-white/80 uppercase tracking-tighter">System: Online</span>
            </div>
            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/40 transition-colors cursor-default">
                <Sun className="w-3 h-3 text-htm-gold" />
                <span className="text-[10px] font-mono text-white/80 uppercase tracking-tighter">Savings: 40-70%</span>
            </div>
        </div>
      </div>

      {/* Main Content - Strict height containment and centered layout */}
      <div className="relative z-30 container mx-auto px-6 h-full flex flex-col justify-center">
        <div 
          className="max-w-4xl pt-12" 
          style={{ transform: `translate3d(${mousePos.x * 5}px, ${mousePos.y * 5}px, 0)` }}
        >
            {/* Animated Badge */}
            <div className="opacity-0 animate-fade-in-up mb-4 md:mb-6" style={{ animationDelay: '0.2s' }}>
                <div className="inline-flex items-center gap-2 border-l-2 border-htm-gold pl-4">
                    <span className="text-htm-gold font-mono text-xs md:text-sm tracking-widest uppercase">
                        Serving Pan India • Uttar Pradesh Focused
                    </span>
                </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-medium text-white leading-[0.85] opacity-0 animate-fade-in-up tracking-tighter mb-6 md:mb-8" style={{ animationDelay: '0.4s' }}>
                Switch <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">Solar.</span>
            </h1>

            <div className="flex flex-col md:flex-row md:items-start gap-12 md:gap-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <p className="text-sm md:text-lg text-gray-300 max-w-sm leading-relaxed font-light border-l border-white/20 pl-6">
                    Professional solar solutions for homes and industries. Backed by 15+ years of engineering mastery with commissions across the nation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                        href={`#${SectionId.CALCULATOR}`}
                        onClick={(e) => smoothScroll(e, `#${SectionId.CALCULATOR}`)}
                        className="group relative px-8 py-6 bg-htm-gold text-htm-dark rounded-none skew-x-[-10deg] overflow-hidden transition-all hover:bg-white hover:scale-105 hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]"
                    >
                        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[10deg] animate-shine"></div>
                        <div className="skew-x-[10deg] font-bold tracking-wider flex items-center gap-3 relative z-10 whitespace-nowrap text-xs md:text-sm">
                            CALCULATE SAVINGS <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                        </div>
                    </a>
                    
                    <a 
                        href={`#${SectionId.CONTACT}`}
                        onClick={(e) => smoothScroll(e, `#${SectionId.CONTACT}`)}
                        className="relative group skew-x-[-10deg] shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_40px_rgba(234,179,8,0.7)] transition-shadow duration-500"
                    >
                         <div className="absolute inset-0 z-0" style={{
                             padding: '2px',
                             background: 'rgba(255,255,255,0.1)',
                             WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                             WebkitMaskComposite: 'xor',
                             maskComposite: 'exclude'
                         }}>
                             <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#eab308_50%,transparent_100%)]" />
                         </div>
                         
                         <div className="relative z-10 px-8 py-6 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors duration-300 w-full h-full">
                             <div className="skew-x-[10deg] font-medium tracking-wider flex items-center gap-2 text-white group-hover:text-htm-gold transition-colors whitespace-nowrap text-xs md:text-sm">
                                REQUEST CALL <Phone className="w-4 h-4" />
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        {/* Bottom indicator for context */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white">Scroll to explore</span>
            <div className="w-px h-8 bg-gradient-to-b from-htm-gold to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
