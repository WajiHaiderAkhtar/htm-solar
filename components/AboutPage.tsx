
import React, { useEffect, useState } from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import CursorSpotlight from './CursorSpotlight';
import { SectionId } from '../types';
import { Shield, Zap, Phone, ArrowRight, CheckCircle, Target, Briefcase, Mail, HardHat, Ruler, Cpu, Activity, Award, UserCheck, Settings } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (view: 'main', targetId: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-htm-gold selection:text-htm-dark">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100]">
        <div className="h-full bg-htm-gold transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* HERO SECTION - COLLECTIVE MASTERY */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-htm-dark">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ 
          backgroundImage: `radial-gradient(#333 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }}></div>

        <div className="absolute inset-0 z-0 opacity-20 flex items-center justify-center">
            <div className="w-[80vw] h-[80vw] rounded-full border border-white/5 overflow-hidden blur-[2px]">
                <img 
                    src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop" 
                    alt="Solar Precision" 
                    className="w-full h-full object-cover grayscale mix-blend-overlay scale-125"
                />
            </div>
        </div>
        
        <CursorSpotlight color="radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, transparent 70%)" size={1200} />

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-screen">
          <RevealOnScroll width="100%">
            <div className="flex flex-col items-center text-center w-full max-w-6xl">
                <span className="text-htm-gold font-mono text-xs tracking-[0.8em] uppercase mb-8 block drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                    Engineering Excellence • Grounded Expertise
                </span>
                <h1 className="text-6xl md:text-[8rem] font-display text-white mb-10 leading-[0.85] tracking-tighter w-full">
                    Grown from <br/>
                    <span className="italic font-normal text-htm-gold drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">Mastery.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl font-light leading-relaxed mx-auto">
                    HTM Solar was established by a team of industry veterans to redefine technical standards in Indian solar. We bring a collective history of utility-scale precision to every rooftop we commission.
                </p>
                <div className="mt-16 flex flex-wrap justify-center items-center gap-12 md:gap-20">
                     <div className="flex flex-col items-center">
                        <span className="text-white text-4xl md:text-6xl font-display mb-1">15+ Yrs</span>
                        <span className="text-[10px] font-mono text-htm-gold uppercase tracking-widest">Collective Experience</span>
                     </div>
                     <div className="w-px h-16 bg-white/10 hidden md:block"></div>
                     <div className="flex flex-col items-center">
                        <span className="text-white text-4xl md:text-6xl font-display mb-1 text-center">20 MW</span>
                        <span className="text-[10px] font-mono text-htm-gold uppercase tracking-widest text-center">Industry Track Record</span>
                     </div>
                </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* THE MISSION - WHY WE STARTED */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <RevealOnScroll>
                    <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px w-12 bg-htm-gold"></div>
                            <span className="text-xs font-mono text-htm-gold uppercase tracking-widest">The Narrative</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display text-htm-dark mb-10 leading-tight">
                            Engineering <br/><span className="text-htm-green">Without</span> <br/>Compromise.
                        </h2>
                        <div className="space-y-8 text-lg text-gray-600 font-light leading-relaxed">
                            <p className="text-htm-dark font-medium italic text-xl border-l-4 border-htm-gold pl-6 py-2 bg-htm-gold/5 rounded-r-xl">
                                "The professionals behind HTM Solar have oversaw the commissioning of over 20,000 kW of solar capacity across the nation. We saw a gap where sales took priority over real engineering."
                            </p>
                            
                            <p>
                                In an industry often dominated by middlemen and outsourced labour, HTM Solar stands apart. While our brand is new, our foundations are built on 15 years of technical leadership in the energy sector. We don't believe in generic sales pitches; we believe in manual precision and on-ground accountability.
                            </p>
                            <p>
                                <strong>Our approach is hands-on.</strong> The leadership that oversaw utility-scale power plants is the same team that supervises your installation today. We ensure every cable route is optimized and every structure is tested for durability, serving our home state of Uttar Pradesh with world-class standards.
                            </p>
                        </div>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={200}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { icon: HardHat, title: "Zero Outsourcing", desc: "Our core technical team handles every installation. Integrity is never contracted out." },
                            { icon: Ruler, title: "Industrial Specs", desc: "We implement the same hot-dip galvanized mounting standards used in utility-grade parks." },
                            { icon: UserCheck, title: "Expert Surveys", desc: "Every roof is manually surveyed by senior technicians to identify optimal placement." },
                            { icon: Award, title: "Component Audit", desc: "We only install Tier-1 modules that have been physically inspected by our team." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-htm-gold/30 transition-all group">
                                <item.icon className="w-10 h-10 text-htm-gold mb-4 group-hover:scale-110 transition-transform" />
                                <h4 className="text-xl font-bold text-htm-dark mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </div>
      </section>

      {/* TECHNICAL STANDARDS */}
      <section className="py-32 bg-htm-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=2072&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-htm-dark via-htm-dark/80 to-htm-dark"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
            <RevealOnScroll width="100%">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-5xl md:text-8xl font-display mb-10 leading-tight">Mastery in <br/><span className="text-htm-gold">Every Detail.</span></h2>
                    <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed mb-16 max-w-3xl mx-auto">
                        We don't rely on automated guesses. We rely on 15 years of technical experience to ensure your system performs through the toughest Indian monsoons and heatwaves.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left border-t border-white/10 pt-16">
                        <div className="group">
                            <span className="text-htm-gold font-mono text-[10px] uppercase tracking-widest block mb-4 group-hover:translate-x-2 transition-transform">Standard 01</span>
                            <h4 className="text-xl font-bold mb-3">High-Gauge DC Cabling</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">We strictly use high-gauge, UV-protected copper DC cables to eliminate transmission loss, a standard often skipped in domestic installs.</p>
                        </div>
                        <div className="group">
                            <span className="text-htm-gold font-mono text-[10px] uppercase tracking-widest block mb-4 group-hover:translate-x-2 transition-transform">Standard 02</span>
                            <h4 className="text-xl font-bold mb-3">Seismic-Grade Mounting</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">Our mounting structures are manually engineered to withstand wind speeds of 150km/h, ensuring stability for 25+ years.</p>
                        </div>
                        <div className="group">
                            <span className="text-htm-gold font-mono text-[10px] uppercase tracking-widest block mb-4 group-hover:translate-x-2 transition-transform">Standard 03</span>
                            <h4 className="text-xl font-bold mb-3">Reliable Earthing</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">Dual-chemical earthing and professional lighting arrestors are mandatory for every project we undertake.</p>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-40 bg-white">
        <div className="container mx-auto px-6 text-center">
          <RevealOnScroll width="100%">
            <div className="max-w-4xl mx-auto">
                <div className="w-20 h-px bg-htm-gold mx-auto mb-10"></div>
                <h2 className="text-6xl md:text-8xl font-display text-htm-dark mb-10">Experience Clarity.</h2>
                <p className="text-2xl text-gray-500 font-light mb-16 max-w-2xl mx-auto">
                    Stop gambling with your energy. Partner with the team that has successfully commissioned over 20,000 kW of solar across the Indian grid.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-8">
                    <button 
                        onClick={() => onNavigate('main', `#${SectionId.CALCULATOR}`)}
                        className="group flex items-center justify-center gap-4 bg-htm-dark text-white px-12 py-6 rounded-none skew-x-[-12deg] font-bold uppercase tracking-[0.2em] hover:bg-htm-gold hover:text-htm-dark transition-all duration-500 shadow-xl"
                    >
                        <span className="skew-x-[12deg]">Analyze Savings</span> <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform skew-x-[12deg]" />
                    </button>
                    <button 
                        onClick={() => onNavigate('main', `#${SectionId.CONTACT}`)}
                        className="group flex items-center justify-center gap-4 border-2 border-htm-dark text-htm-dark px-12 py-6 rounded-none skew-x-[-12deg] font-bold uppercase tracking-[0.2em] hover:bg-htm-dark hover:text-white transition-all duration-500"
                    >
                        <span className="skew-x-[12deg]">Technical Survey</span>
                    </button>
                </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
