
import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import { TESTIMONIALS } from '../constants';
import CursorSpotlight from './CursorSpotlight';

const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="bg-htm-cream py-24 relative overflow-hidden border-t border-gray-200">
      <CursorSpotlight color="radial-gradient(circle, rgba(234, 179, 8, 0.08) 0%, transparent 70%)" size={600} />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <RevealOnScroll width="100%">
            <div className="bg-white border border-gray-200 p-8 md:p-16 relative shadow-sm group" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Quote className="w-48 h-48 text-htm-gold" /></div>
              <div className="max-w-4xl mx-auto relative z-10">
                <div className="flex justify-between items-end mb-12">
                   <div>
                       <span className="text-xs font-mono text-htm-gold uppercase tracking-widest flex items-center gap-2 mb-2">04 // Reviews<div className="h-px w-12 bg-htm-gold"></div></span>
                        <h3 className="text-2xl font-bold text-htm-dark">What Customers Say</h3>
                   </div>
                   <div className="flex gap-2">
                     <button onClick={prev} className="p-2 border border-htm-dark hover:bg-htm-dark hover:text-white transition-colors rounded-full"><ChevronLeft className="w-4 h-4" /></button>
                     <button onClick={next} className="p-2 border border-htm-dark hover:bg-htm-dark hover:text-white transition-colors rounded-full"><ChevronRight className="w-4 h-4" /></button>
                   </div>
                </div>
                <div className="relative min-h-[250px]">
                  {TESTIMONIALS.map((item, index) => (
                    <div key={item.id} className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
                       <p className="text-3xl md:text-4xl font-display text-htm-dark leading-tight mb-8">"{item.quote}"</p>
                       <div className="flex items-center gap-4">
                         <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full object-cover border border-gray-300"/>
                         <div><p className="font-bold text-htm-dark">{item.name}</p><p className="text-sm text-gray-500 font-mono">{item.role}</p></div>
                       </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-8">
                  {TESTIMONIALS.map((_, idx) => (
                    <button key={idx} onClick={() => setCurrent(idx)} className={`h-1 transition-all duration-300 ${current === idx ? 'w-8 bg-htm-dark' : 'w-2 bg-gray-300'}`} />
                  ))}
                </div>
              </div>
            </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default Testimonials;
