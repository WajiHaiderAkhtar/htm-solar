
import React, { useEffect, useRef, useState } from 'react';
import { SectionId, PageView } from '../types';
import { RevealOnScroll } from './RevealOnScroll';
import { HERO_IMAGE_URL, smoothScroll } from '../constants';
import { MapPin, PenTool, Hammer, Zap, PhoneCall, CheckCircle2, ArrowRight, ShieldCheck, Settings } from 'lucide-react';
import CursorSpotlight from './CursorSpotlight';

interface AboutProps {
  onNavigate: (view: PageView) => void;
}

const stats = [
  { label: 'Technical Mastery', value: '15+ Yrs', desc: 'Team Industry Exp' },
  { label: 'Track Record', value: '20k kW', desc: 'Team Installation History' },
  { label: 'Bill Savings', value: '70%', desc: 'Max Reduction' },
  { label: 'Payback', value: '5-7 Yrs', desc: 'Fast ROI' },
];

const installationSteps = [
    {
      Icon: MapPin,
      title: "Site Survey",
      desc: "Detailed shade & structural analysis."
    },
    {
      Icon: PenTool,
      title: "Design",
      desc: "Manual industrial-grade engineering."
    },
    {
      Icon: Hammer,
      title: "Install",
      desc: "Master-class wiring & mounting."
    },
    {
      Icon: Settings,
      title: "Support",
      desc: "Long-term technical maintenance."
    }
];

const AnimatedCounter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    const match = value.match(/([\d.]+)(.*)/);
    if (!match) return;

    const endValue = parseFloat(match[1]);
    const duration = 2000;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(endValue * easeProgress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasAnimated, value]);

  const match = value.match(/([\d.]+)(.*)/);
  if (!match) return <span>{value}</span>;
  const suffix = match[2];
  const decimals = match[1].includes('.') ? match[1].split('.')[1].length : 0;

  return (
    <span ref={ref}>
      {hasAnimated ? displayValue.toFixed(decimals) : 0}{suffix}
    </span>
  );
};

const ParallaxImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;

      rafId = window.requestAnimationFrame(() => {
        if (containerRef.current && imgRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          if (rect.top < windowHeight && rect.bottom > 0) {
            const speed = 0.08;
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            const offset = (elementCenter - viewportCenter) * speed;
            imgRef.current.style.transform = `translate3d(0, ${offset}px, 0) scale(1.2)`;
          }
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[500px] overflow-hidden group">
      <img 
        ref={imgRef}
        src={HERO_IMAGE_URL} 
        alt="Solar Engineering Excellence" 
        className="absolute left-0 -top-[10%] w-full h-[120%] object-cover filter grayscale group-hover:grayscale-0 transition-[filter] duration-700 will-change-transform"
      />
      <div className="absolute inset-0 bg-htm-dark/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
      <div className="absolute bottom-8 left-8 bg-white p-6 max-w-sm shadow-2xl z-10">
          <p className="font-display italic text-xl text-htm-dark">
              "Solar is a technical asset, not a retail product. We build for performance."
          </p>
      </div>
    </div>
  );
};

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const roadmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
        if (rafId) return;

        rafId = window.requestAnimationFrame(() => {
          if (roadmapRef.current) {
            const rect = roadmapRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const startOffset = windowHeight * 0.75;
            const endOffset = windowHeight * 0.25;
            const current = rect.top;
            
            let progress = (startOffset - current) / (startOffset - endOffset);
            progress = Math.max(0, Math.min(1, progress));
            
            setScrollProgress(progress);
          }
          rafId = null;
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id={SectionId.ABOUT} className="py-32 bg-white relative">
      <CursorSpotlight color="radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)" size={600} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-5 relative">
                <RevealOnScroll>
                    <div className="flex flex-col gap-4">
                        <span className="text-xs font-mono text-htm-gold uppercase tracking-widest flex items-center gap-2">
                            01 // Our Story
                            <div className="h-px w-12 bg-htm-gold"></div>
                        </span>
                        <h2 className="text-5xl md:text-6xl font-display text-htm-dark leading-none">
                            Technical <br/>
                            <span className="text-htm-green">Integrity.</span> <br/>
                            Mastery <br/>
                            <span className="text-htm-gold">Grounded.</span>
                        </h2>
                    </div>
                </RevealOnScroll>
            </div>
            <div className="lg:col-span-7 flex items-end">
                <RevealOnScroll delay={200}>
                    <div className="space-y-6">
                        <p className="text-xl text-gray-500 leading-relaxed font-light border-l-4 border-htm-gold pl-6">
                            HTM Solar was founded to bring professional engineering back to the center of solar installation. We are veteran-led and expertise-driven.
                        </p>
                        <p className="text-lg text-gray-500 font-light">
                            With a combined team history of commissioning over 20,000 kW of solar across India, we have seen where typical systems fail. We founded HTM to ensure every roof we touch meets industrial utility-scale standards.
                        </p>
                        <div className="pt-4">
                            <button 
                                onClick={() => onNavigate('about')}
                                className="group flex items-center gap-2 text-htm-dark font-bold uppercase tracking-widest text-sm hover:text-htm-gold transition-colors cursor-pointer"
                            >
                                Read Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-gray-100 py-12">
            {stats.map((stat, idx) => (
                <RevealOnScroll key={idx} delay={idx * 100} width="100%">
                    <div className="text-center md:text-left">
                        <p className="text-4xl md:text-5xl font-bold text-htm-dark mb-2 font-display tabular-nums">
                            <AnimatedCounter value={stat.value} />
                        </p>
                        <p className="font-bold text-sm uppercase tracking-wider text-gray-900 mb-1">{stat.label}</p>
                        <p className="text-xs font-mono text-gray-500">{stat.desc}</p>
                    </div>
                </RevealOnScroll>
            ))}
        </div>

        <RevealOnScroll width="100%">
            <div className="mb-24 relative bg-zinc-900 text-white rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden border border-white/5 group">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-htm-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-htm-green/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                 <div className="text-center mb-16 relative z-10">
                    <span className="text-htm-gold font-mono text-xs tracking-widest uppercase mb-3 block">Execution Cycle</span>
                    <h3 className="text-3xl md:text-5xl font-display text-white mb-4">Precision Workflow</h3>
                    <p className="text-gray-400 max-w-lg mx-auto text-lg font-light">From initial on-site analysis to grid-syncing, we manage the technical complexity for you.</p>
                </div>

                <div ref={roadmapRef} className="hidden md:block relative h-48 z-10">
                    <svg className="absolute top-0 left-0 w-full h-full overflow-visible z-0 pointer-events-none">
                        <line x1="12.5%" y1="28" x2="87.5%" y2="28" stroke="#3f3f46" strokeWidth="2" strokeDasharray="8 8" />
                        <line x1="12.5%" y1="28" x2="87.5%" y2="28" stroke="#eab308" strokeWidth="3" strokeDasharray="100" pathLength="100" strokeDashoffset={100 - (scrollProgress * 100)} className="transition-all duration-75 ease-linear" />
                    </svg>
                    <div className="grid grid-cols-4 relative z-10 h-full items-start">
                        {installationSteps.map((step, idx) => {
                            const stepThreshold = idx / (installationSteps.length - 1);
                            const isActive = scrollProgress >= stepThreshold - 0.05; 
                            return (
                                <div key={idx} className="flex flex-col items-center text-center px-4">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 relative z-10 transition-all duration-500 ${isActive ? 'bg-htm-gold text-black scale-110 shadow-[0_0_20px_rgba(234,179,8,0.5)] border-transparent' : 'bg-zinc-800 border border-zinc-700 text-gray-500 scale-100'}`}>
                                        <step.Icon className="w-6 h-6" />
                                        {isActive && <div className="absolute -right-1 -top-1 bg-white rounded-full p-0.5 animate-in fade-in zoom-in duration-300"><CheckCircle2 className="w-3 h-3 text-htm-green fill-current" /></div>}
                                    </div>
                                    <h4 className={`font-bold text-xl mb-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-500'}`}>{step.title}</h4>
                                    <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                 <div className="md:hidden space-y-10 relative pl-8 border-l border-dashed border-zinc-700 ml-4 z-10">
                    <div className="absolute left-[-1.5px] top-0 w-[3px] bg-htm-gold transition-all duration-300 ease-out" style={{ height: `${scrollProgress * 100}%` }}></div>
                    {installationSteps.map((step, idx) => (
                        <div key={idx} className="relative">
                             <div className={`absolute -left-[41px] top-0 w-8 h-8 rounded-full border flex items-center justify-center shadow-sm z-10 transition-all duration-500 ${idx / (installationSteps.length - 1) <= scrollProgress ? 'bg-htm-gold border-htm-gold text-black scale-110 shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'bg-zinc-800 border-zinc-600 text-gray-500 scale-100'}`}><span className="text-[10px] font-bold">{idx + 1}</span></div>
                             <h4 className={`font-bold text-lg transition-colors duration-300 ${idx / (installationSteps.length - 1) <= scrollProgress ? 'text-white' : 'text-gray-400'}`}>{step.title}</h4>
                             <p className="text-sm text-gray-400 mt-1">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-14 text-center relative z-10">
                    <a href={`#${SectionId.CONTACT}`} onClick={(e) => smoothScroll(e, `#${SectionId.CONTACT}`)} className="inline-flex items-center gap-3 bg-htm-gold text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] group-hover:translate-y-0">
                        <PhoneCall className="w-5 h-5" />
                        Consult with Experts
                    </a>
                </div>
            </div>
        </RevealOnScroll>

        <RevealOnScroll width="100%">
            <ParallaxImage />
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default About;
