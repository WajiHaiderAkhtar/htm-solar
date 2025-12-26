
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, ArrowRight, FileText, IndianRupee, Home, Calendar, UserCheck, FileCheck, Landmark } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import CursorSpotlight from './CursorSpotlight';

interface SubsidyPageProps {
  onBackToCalc: () => void;
}

const SubsidyPage: React.FC<SubsidyPageProps> = ({ onBackToCalc }) => {
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
          
          // Start animating when the section enters the bottom 75% of screen
          // Finish when it reaches the top 25%
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

  const documents = [
    {
      icon: <FileText className="w-8 h-8 text-htm-gold" />,
      title: "Electricity Bill",
      desc: "Latest bill for your home."
    },
    {
      icon: <UserCheck className="w-8 h-8 text-htm-gold" />,
      title: "Aadhar Card",
      desc: "Identity proof of owner."
    },
    {
      icon: <FileCheck className="w-8 h-8 text-htm-gold" />,
      title: "Property Papers",
      desc: "Ownership proof or tax receipt."
    },
    {
      icon: <Landmark className="w-8 h-8 text-htm-gold" />,
      title: "Bank Details",
      desc: "Where you get the subsidy money."
    }
  ];

  const steps = [
    {
      Icon: FileText,
      title: "Apply Online",
      desc: "Register on National Portal"
    },
    {
      Icon: Home,
      title: "Visit & Check",
      desc: "Site Check & Approval"
    },
    {
      Icon: CheckCircle,
      title: "Install Meter",
      desc: "Net-Meter Installation"
    },
    {
      Icon: IndianRupee,
      title: "Get Paid",
      desc: "Direct Bank Transfer"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 overflow-x-hidden relative">
      <CursorSpotlight color="radial-gradient(circle, rgba(4, 120, 87, 0.05) 0%, transparent 70%)" size={800} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <RevealOnScroll width="100%">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="text-xs font-mono text-htm-green uppercase tracking-widest bg-htm-green/10 px-3 py-1 rounded-full mb-6 inline-block">
              PM Surya Ghar Yojana
            </span>
            <h1 className="text-5xl md:text-6xl font-display text-htm-dark mb-6 leading-tight">
              Government Support for <br/>
              <span className="text-htm-gold">Your Solar Power.</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed font-light max-w-2xl mx-auto">
              The Indian government provides financial support for home solar. 
              Get up to <span className="font-bold text-htm-dark">₹78,000</span> back in your bank account.
            </p>
          </div>
        </RevealOnScroll>

        {/* Subsidy Structure Card */}
        <RevealOnScroll width="100%" delay={100}>
          <div className="bg-htm-dark text-white rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden max-w-5xl mx-auto shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-htm-green opacity-20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <h3 className="text-3xl font-display mb-4">How Much You Get</h3>
                <p className="text-gray-400 mb-6">For homes and residential buildings only.</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="font-mono text-gray-300">Up to 2 kW</span>
                    <span className="text-2xl font-bold text-htm-gold">₹30,000 / kW</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="font-mono text-gray-300">Next 1 kW</span>
                    <span className="text-2xl font-bold text-htm-gold">₹18,000 / kW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-gray-300">Total Max Money</span>
                    <span className="text-3xl font-bold text-htm-lightGreen">₹78,000</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                 <div className="flex items-start gap-4 mb-6">
                    <div className="bg-htm-gold p-2 rounded-full text-black"><Calendar className="w-5 h-5" /></div>
                    <div>
                        <h4 className="font-bold text-lg">Time</h4>
                        <p className="text-sm text-gray-400">Funds are typically released 30 days after project completion.</p>
                    </div>
                 </div>
                 <p className="text-gray-300 italic border-l-2 border-htm-gold pl-4 text-sm leading-relaxed">
                   "HTM Solar provides full assistance for your subsidy application process. We guide you through the paperwork to ensure smooth coordination with government portals."
                 </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Documents Required Section */}
        <RevealOnScroll width="100%">
            <div className="max-w-5xl mx-auto mb-24">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-display text-htm-dark mb-4">Needed Documents</h3>
                    <p className="text-gray-500">Please have these ready to assist your application.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {documents.map((doc, idx) => (
                        <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-htm-gold/30 transition-all group text-center">
                            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                                {doc.icon}
                            </div>
                            <h4 className="font-bold text-htm-dark mb-2">{doc.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">{doc.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </RevealOnScroll>

        {/* Scroll-Driven Process Roadmap */}
        <RevealOnScroll width="100%">
            <div className="max-w-5xl mx-auto mb-20 relative">
               <h3 className="text-3xl font-display text-htm-dark mb-16 text-center">How to Apply</h3>
               
               {/* Desktop Path Animation */}
               <div ref={roadmapRef} className="hidden md:block relative h-48">
                   <svg className="absolute top-0 left-0 w-full h-full overflow-visible z-0 pointer-events-none" viewBox="0 0 1000 192" preserveAspectRatio="none">
                       <path 
                          d="M 125 40 Q 250 -20 375 40 T 625 40 T 875 40" 
                          stroke="#e5e7eb" 
                          strokeWidth="2" 
                          fill="none" 
                          strokeDasharray="8 8" 
                       />
                       <path 
                          d="M 125 40 Q 250 -20 375 40 T 625 40 T 875 40" 
                          stroke="#eab308" 
                          strokeWidth="3" 
                          fill="none" 
                          pathLength="1"
                          strokeDasharray="1" 
                          strokeDashoffset={1 - scrollProgress} 
                          className="transition-all duration-75 ease-linear"
                       />
                   </svg>

                   <div className="grid grid-cols-4 relative z-10 pt-4">
                       {steps.map((step, idx) => {
                           const stepThreshold = idx / (steps.length - 1);
                           const isActive = scrollProgress >= stepThreshold - 0.1;
                           
                           return (
                               <div key={idx} className="flex flex-col items-center text-center group px-2">
                                   <div className={`w-12 h-12 rounded-full border-4 shadow-xl flex items-center justify-center mb-6 relative z-20 transition-all duration-500
                                       ${isActive 
                                           ? 'bg-htm-gold border-htm-gold text-black scale-110 shadow-[0_0_20px_rgba(234,179,8,0.5)]' 
                                           : 'bg-htm-dark border-white text-white scale-100'
                                       }`}
                                   >
                                       <step.Icon className="w-5 h-5 text-current transition-colors" />
                                       <div className="absolute -top-8 text-xs font-mono font-bold text-gray-400">Step {idx + 1}</div>
                                   </div>
                                   <h4 className={`font-bold text-lg transition-colors duration-300 ${isActive ? 'text-htm-dark' : 'text-gray-400'}`}>
                                       {step.title}
                                   </h4>
                                   <p className="text-sm text-gray-500 mt-1 max-w-[200px]">{step.desc}</p>
                               </div>
                           );
                       })}
                   </div>
               </div>

               {/* Mobile Vertical Timeline */}
               <div className="md:hidden space-y-8 relative pl-8 border-l-2 border-dashed border-gray-200 ml-4">
                    <div className="absolute left-[-2px] top-0 w-[4px] bg-htm-gold transition-all duration-300 ease-out" style={{ height: `${scrollProgress * 100}%` }}></div>
                    
                    {steps.map((step, idx) => {
                         const stepThreshold = idx / (steps.length - 1);
                         const isActive = scrollProgress >= stepThreshold;
                         return (
                            <div key={idx} className="relative">
                                 <div className={`absolute -left-[41px] top-0 w-8 h-8 rounded-full border-4 shadow-md flex items-center justify-center transition-all duration-500
                                     ${isActive 
                                         ? 'bg-htm-gold border-htm-gold text-black scale-110' 
                                         : 'bg-htm-dark border-white text-white'
                                     }`}>
                                     <span className="text-[10px] font-bold">{idx + 1}</span>
                                 </div>
                                 <h4 className={`font-bold text-lg transition-colors duration-300 ${isActive ? 'text-htm-dark' : 'text-gray-400'}`}>
                                    {step.title}
                                 </h4>
                                 <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
                            </div>
                        );
                    })}
               </div>
            </div>
        </RevealOnScroll>

        {/* CTA */}
        <RevealOnScroll width="100%">
          <div className="bg-htm-green rounded-2xl p-12 text-center text-white max-w-4xl mx-auto relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-display mb-6">Explore Your Benefits</h3>
                <p className="mb-8 max-w-xl mx-auto opacity-90">Use our calculator to estimate your government support amount based on your average bill.</p>
                <button 
                  onClick={onBackToCalc}
                  className="bg-white text-htm-dark px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-htm-gold transition-colors inline-flex items-center gap-2"
                >
                  Check Your Estimate <ArrowRight className="w-5 h-5" />
                </button>
             </div>
             <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-10 rounded-full"></div>
             <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-htm-gold opacity-10 rounded-full"></div>
          </div>
        </RevealOnScroll>

      </div>
    </div>
  );
};

export default SubsidyPage;
