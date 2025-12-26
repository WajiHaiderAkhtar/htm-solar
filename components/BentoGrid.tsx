
import React, { useState, useEffect } from 'react';
import { SectionId } from '../types';
import { Home, Building2, Battery, ArrowUpRight, Zap, ShieldCheck, Smartphone, X, Check, Globe, Info, Search } from 'lucide-react';
import { SERVICE_IMAGES, smoothScroll } from '../constants';
import { RevealOnScroll } from './RevealOnScroll';
import CursorSpotlight from './CursorSpotlight';

interface ProjectDetails {
  title: string;
  category: string;
  image: string;
  specs: string[];
  description: string;
}

const ProjectModal: React.FC<{ project: ProjectDetails; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-htm-dark border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-2 bg-white/5 hover:bg-htm-gold hover:text-black rounded-full text-white transition-all border border-white/10 group"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          <div className="relative h-64 md:h-auto overflow-hidden bg-zinc-900">
            <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-80" 
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-htm-dark via-transparent to-transparent"></div>
          </div>
          
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-htm-dark">
            <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-htm-gold"></span>
                <span className="text-htm-gold font-mono text-xs tracking-widest uppercase">{project.category}</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-display text-white mb-6 leading-tight">{project.title}</h3>
            
            <p className="text-gray-400 mb-8 text-lg leading-relaxed font-light">
              {project.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {project.specs.map((spec, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-htm-gold/30 transition-colors">
                    <Check className="w-4 h-4 text-htm-lightGreen group-hover:text-htm-gold transition-colors" />
                    <span className="text-sm text-gray-300 font-mono">{spec}</span>
                  </div>
                ))}
            </div>

            <button 
              onClick={onClose}
              className="bg-white text-htm-dark px-10 py-4 font-bold uppercase tracking-widest hover:bg-htm-gold transition-all rounded-full self-start hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] active:scale-95"
            >
              Consult an Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BentoGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  const handleViewDetails = (type: 'residential' | 'commercial' | 'audit' | 'support' | 'subsidy') => {
    const detailsMap: Record<string, ProjectDetails> = {
      residential: {
        title: "Home Solar",
        category: "Residential",
        image: SERVICE_IMAGES.residential,
        description: "Be your own power station. Our systems are designed for a 25-year performance life with manufacturer-backed warranties, providing professional engineering for your home.",
        specs: ["System: 3-10kW", "Est. ROI: 4.5 Years", "Subsidy Ready", "Manual Inspection"]
      },
      commercial: {
        title: "Industries",
        category: "Industrial",
        image: SERVICE_IMAGES.commercial,
        description: "Scale your savings. Our solar systems for industries and commercial hubs pay for themselves rapidly through collective team expertise in utility-scale commissions.",
        specs: ["System: 10-500kW+", "Tax Benefits", "Industrial Grade", "On-site Oversight"]
      },
      audit: {
        title: "Technical Audit",
        category: "Engineering",
        image: SERVICE_IMAGES.monitoring,
        description: "We physically inspect your roof and system performance. Our team identifies bottlenecks and cleaning requirements based on 15 years of technical data.",
        specs: ["Physical Verification", "Generation Reports", "Manual Diagnostics", "Efficiency Check"]
      },
      support: {
        title: "Total Care",
        category: "Support",
        image: SERVICE_IMAGES.maintenance,
        description: "Reliability is our promise. From professional cleaning to technical structural checks, we ensure your asset remains performant for decades.",
        specs: ["Scheduled Cleaning", "Technical Reviews", "Mfg-Backed Warranty", "Direct Response"]
      },
      subsidy: {
        title: "Subsidy Help",
        category: "Assistance",
        image: SERVICE_IMAGES.subsidy,
        description: "Professional assistance with government coordination. We provide full support for your subsidy application process under the PM Surya Ghar Yojana.",
        specs: ["Portal Coordination", "Site Inspection", "Manual Auditing", "End-to-end Filing"]
      }
    };
    setSelectedProject(detailsMap[type]);
  };

  return (
    <section id={SectionId.SERVICES} className="py-32 bg-htm-cream relative overflow-hidden">
      <CursorSpotlight color="radial-gradient(circle, rgba(4, 120, 87, 0.05) 0%, transparent 70%)" size={800} />

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      
      <div className="container mx-auto px-6 relative z-10">
        
        <RevealOnScroll width="100%">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="max-w-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="h-[2px] w-12 bg-htm-gold"></span>
                        <span className="text-xs font-mono text-htm-gold uppercase tracking-[0.3em]">02 // Our Services</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display text-htm-dark leading-[1.1]">
                        Solar <span className="italic font-normal text-gray-400">Solutions</span> <br/> 
                        For All.
                    </h2>
                </div>
                <div className="max-w-md pb-4">
                    <p className="text-gray-500 text-lg font-light leading-relaxed mb-6">
                        Professional solar assistance for homes and industries. Click any card to explore our expert-led services.
                    </p>
                    <button 
                        onClick={(e) => smoothScroll(e, `#${SectionId.CALCULATOR}`)}
                        className="group flex items-center gap-3 text-htm-dark font-bold text-sm tracking-widest uppercase transition-all hover:tracking-[0.2em]"
                    >
                        See more <div className="w-10 h-10 rounded-full border border-htm-dark flex items-center justify-center group-hover:bg-htm-dark group-hover:text-white transition-all"><ArrowUpRight className="w-4 h-4" /></div>
                    </button>
                </div>
            </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-6 h-auto md:h-[900px]">
            
            {/* 1. Residential */}
            <div 
              className="md:col-span-7 md:row-span-4 h-[400px] md:h-auto relative group cursor-pointer overflow-hidden rounded-[2rem] bg-zinc-900 border border-transparent hover:border-htm-gold/30 transition-all duration-700"
              onClick={() => handleViewDetails('residential')}
            >
                <img src={SERVICE_IMAGES.residential} alt="Residential" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-40" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-htm-gold group-hover:text-black transition-all duration-500 shadow-xl">
                            <Home className="w-6 h-6" />
                        </div>
                        <div className="px-4 py-2 rounded-full border border-white/20 backdrop-blur-md text-[10px] font-mono text-white tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 flex items-center gap-2">
                            Residential <Info className="w-3 h-3" />
                        </div>
                    </div>
                    
                    <div className="max-w-sm">
                        <h3 className="text-3xl md:text-4xl font-display text-white mb-4 group-hover:text-htm-gold transition-colors">Solar for <br/> Your Home</h3>
                        <p className="text-gray-300 font-light mb-0 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                            Professional engineering with manufacturer-backed reliability.
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Audit */}
            <div 
                className="md:col-span-5 md:row-span-2 relative group overflow-hidden rounded-[2rem] bg-white border border-gray-100 p-8 md:p-10 flex flex-col justify-between hover:border-htm-gold/30 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-xl"
                onClick={() => handleViewDetails('audit')}
            >
                <div className="flex justify-between items-start">
                    <Search className="w-8 h-8 text-htm-green group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-gray-400 tracking-widest uppercase flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">Technical Audit <Info className="w-2.5 h-2.5" /></span>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-htm-dark mb-2 group-hover:text-htm-green transition-colors">Generation Review</h3>
                    <p className="text-gray-500 text-sm font-light">Physical inspection and manual generation analysis.</p>
                </div>
                <div className="w-full h-1 bg-gray-100 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-htm-green w-2/3 group-hover:w-full transition-all duration-1000"></div>
                </div>
            </div>

            {/* 3. Commercial */}
            <div 
              className="md:col-span-5 md:row-span-4 h-[350px] md:h-auto relative group cursor-pointer overflow-hidden rounded-[2rem] bg-zinc-900 border border-transparent hover:border-htm-gold/30 transition-all duration-700"
              onClick={() => handleViewDetails('commercial')}
            >
                <img src={SERVICE_IMAGES.commercial} alt="Commercial" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-40" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-htm-gold group-hover:text-black transition-all duration-500 shadow-xl">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div className="px-4 py-2 rounded-full border border-white/20 backdrop-blur-md text-[10px] font-mono text-white tracking-widest uppercase opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 flex items-center gap-2">
                            Industrial <Info className="w-3 h-3" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-display text-white mb-2 group-hover:text-htm-gold transition-colors">Industries</h3>
                        <p className="text-gray-400 text-sm font-mono tracking-wider uppercase">Lower Costs • Team Track Record</p>
                    </div>
                </div>
            </div>

            {/* 4. Support */}
            <div 
                className="md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-[2rem] bg-htm-green p-8 md:p-10 flex flex-col justify-between text-white cursor-pointer hover:bg-htm-green/90 transition-all shadow-lg"
                onClick={() => handleViewDetails('support')}
            >
                <div className="flex justify-between items-start">
                    <ShieldCheck className="w-8 h-8 text-htm-gold group-hover:rotate-12 transition-transform" />
                    <Info className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Technical Care</h3>
                    <p className="text-emerald-100/70 text-sm font-light leading-relaxed">We provide expert maintenance based on utility-scale experience.</p>
                </div>
            </div>

            {/* 5. Subsidy Help */}
            <div 
                className="md:col-span-3 md:row-span-2 relative group overflow-hidden rounded-[2rem] bg-white border border-gray-100 p-8 flex flex-col justify-center items-center text-center hover:bg-htm-gold/5 transition-all cursor-pointer shadow-sm"
                onClick={() => handleViewDetails('subsidy')}
            >
                <div className="bg-htm-gold/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-htm-gold group-hover:text-white transition-all">
                    <Battery className="w-6 h-6 text-htm-gold group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold text-htm-dark flex items-center gap-2">Govt. Support <Info className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" /></h3>
                <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-mono">Full Subsidy Assistance</p>
            </div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
