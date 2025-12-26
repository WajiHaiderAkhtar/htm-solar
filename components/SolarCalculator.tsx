
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { SectionId, CalculatorState } from '../types';
import { getSolarEstimate } from '../services/solarCalculatorService';
import { STATES_INDIA, smoothScroll } from '../constants';
import { Loader2, IndianRupee, MapPin, CheckCircle, Zap, RefreshCw, TrendingUp, AlertCircle } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import CursorSpotlight from './CursorSpotlight';

interface ChartProps {
  cost: number;
  annualSavings: number;
}

const ROIChart: React.FC<ChartProps> = ({ cost, annualSavings }) => {
  const [hoverData, setHoverData] = useState<{ year: number; value: number; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [chartWidth, setChartWidth] = useState(600);

  useEffect(() => {
    const updateWidth = () => {
      if (svgRef.current) {
        setChartWidth(svgRef.current.clientWidth || 600);
      }
    };
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const years = 25;
  const data = useMemo(() => {
    const points = [];
    for (let i = 0; i <= years; i++) {
      points.push({ year: i, value: -cost + (annualSavings * i) });
    }
    return points;
  }, [cost, annualSavings]);

  const width = 600; // Reference coordinate system
  const height = 300;
  const padding = { top: 40, right: 30, bottom: 40, left: 70 };
  
  const minValue = -cost;
  const maxValue = Math.max(annualSavings * years - cost, 100000); 
  const range = Math.max(maxValue - minValue, 1);
  
  const getX = (year: number) => padding.left + (year / years) * (width - padding.left - padding.right);
  const getY = (value: number) => height - padding.bottom - ((value - minValue) / range) * (height - padding.top - padding.bottom);
  
  const pathD = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(d.year)} ${getY(d.value)}`).join(' ');
  const zeroY = getY(0);
  
  const roiYearRaw = annualSavings > 0 ? cost / annualSavings : 0;
  const roiYear = isFinite(roiYearRaw) ? roiYearRaw : 0;
  const roiX = getX(Math.min(roiYear, years));

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const scale = width / rect.width;
    const scaledX = x * scale;
    
    const graphWidth = width - padding.left - padding.right;
    const relativeX = Math.max(0, Math.min(scaledX - padding.left, graphWidth));
    const yearIndex = Math.round((relativeX / graphWidth) * years);
    const point = data[yearIndex];
    if (point) {
      setHoverData({ year: point.year, value: point.value, x: getX(point.year), y: getY(point.value) });
    }
  };

  return (
    <div className="w-full relative bg-zinc-900/50 rounded-2xl border border-white/5 p-6 mt-8 shadow-inner overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-htm-lightGreen" />
            Money Saved Over Time
        </h4>
        <div className="flex gap-4 text-[10px] font-mono uppercase tracking-tighter">
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500/30 border border-red-500/50"></div>Paying Back</div>
            <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-htm-lightGreen"></div>Total Profit</div>
        </div>
      </div>
      <div className="relative aspect-[2/1] w-full">
        <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible cursor-crosshair" onMouseMove={handleMouseMove} onMouseLeave={() => setHoverData(null)}>
            <line x1={padding.left} y1={zeroY} x2={width - padding.right} y2={zeroY} stroke="white" strokeOpacity="0.1" strokeDasharray="4 4" />
            
            <text x={padding.left - 15} y={getY(0)} fill="gray" fontSize="10" fontFamily="monospace" textAnchor="end" alignmentBaseline="middle">₹0</text>
            <text x={padding.left - 15} y={getY(maxValue)} fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="end" alignmentBaseline="middle">+₹{(maxValue/100000).toFixed(1)}L</text>
            <text x={padding.left - 15} y={getY(minValue)} fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="end" alignmentBaseline="middle">-₹{(Math.abs(minValue)/100000).toFixed(1)}L</text>
            
            <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                </linearGradient>
            </defs>
            
            <path d={`${pathD} L ${width - padding.right} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`} fill="url(#chartGradient)" />
            <path d={pathD} fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" />
            
            {roiYear > 0 && roiYear <= years && (
                <g>
                    <line x1={roiX} y1={zeroY} x2={roiX} y2={height - padding.bottom} stroke="white" strokeOpacity="0.2" strokeDasharray="2 2" />
                    <circle cx={roiX} cy={zeroY} r="5" fill="#eab308" stroke="#050505" strokeWidth="2" />
                    <text x={roiX} y={zeroY - 15} fill="#eab308" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="1">FREE POWER STARTS</text>
                </g>
            )}
            
            {hoverData && (
                <g>
                    <line x1={hoverData.x} y1={padding.top} x2={hoverData.x} y2={height - padding.bottom} stroke="white" strokeOpacity="0.2" strokeDasharray="1 1" />
                    <circle cx={hoverData.x} cy={hoverData.y} r="6" fill="#047857" stroke="white" strokeWidth="2" />
                </g>
            )}
        </svg>
        
        {hoverData && (
             <div className="absolute bg-htm-dark border border-white/10 p-3 rounded-lg shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-full z-20 backdrop-blur-md" style={{ left: `${(hoverData.x / width) * 100}%`, top: `${(hoverData.y / height) * 100}%`, marginTop: '-20px' }}>
                <p className="text-[10px] text-gray-500 font-mono mb-1 uppercase tracking-widest">Year {hoverData.year}</p>
                <p className={`text-sm font-bold ${hoverData.value >= 0 ? 'text-htm-lightGreen' : 'text-red-400'}`}>
                    {hoverData.value >= 0 ? '+' : '-'}₹{Math.abs(Math.round(hoverData.value)).toLocaleString()}
                </p>
             </div>
        )}
      </div>
      <div className="mt-4 flex justify-between text-[10px] font-mono text-gray-500 px-2">
          <span>YEAR 0</span>
          <span>YEAR 12</span>
          <span>YEAR 25</span>
      </div>
    </div>
  );
};

const SolarCalculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    billAmount: '',
    location: 'Uttar Pradesh', 
    propertyType: 'residential',
    loading: false,
    result: null,
    error: null,
  });

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, error: null }));

    if (!state.billAmount || isNaN(Number(state.billAmount)) || Number(state.billAmount) <= 0) {
        setState((prev) => ({ ...prev, error: "Please enter a valid monthly bill amount." }));
        return;
    }

    setState((prev) => ({ ...prev, loading: true, result: null }));
    
    try {
      const estimate = await getSolarEstimate(Number(state.billAmount), state.location, state.propertyType);
      
      fetch('/api/estimate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                billAmount: Number(state.billAmount),
                location: state.location,
                propertyType: state.propertyType,
                result: estimate
            })
      }).catch(() => {}); // Silent fail for analytics

      setState((prev) => ({ ...prev, loading: false, result: estimate }));
    } catch (err: any) {
      setState((prev) => ({ ...prev, loading: false, error: "Calculation failed. Please check your network." }));
    }
  };

  return (
    <section id={SectionId.CALCULATOR} className="py-32 bg-htm-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/40"></div>
        <div className="absolute top-0 left-3/4 w-px h-full bg-white/40"></div>
        <div className="absolute top-1/2 w-full h-px bg-white/40"></div>
      </div>
      <CursorSpotlight color="radial-gradient(circle, rgba(52, 211, 153, 0.1) 0%, transparent 60%)" size={800} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
                <RevealOnScroll width="100%">
                    <div className="inline-block px-4 py-1 rounded-full mb-6">
                         <span className="text-htm-lightGreen font-mono text-xs tracking-widest uppercase flex items-center gap-2 justify-center">
                            03 // Savings Calc
                            <div className="h-px w-8 bg-htm-lightGreen"></div>
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-display mb-6">Calculate Your Savings.</h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        See how much you can save on your electricity bill and how much government subsidy you can get.
                    </p>
                </RevealOnScroll>
            </div>

            <RevealOnScroll width="100%" delay={200}>
                <div className="bg-htm-charcoal border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative transition-all duration-500 hover:border-white/20">
                    <div className="h-1.5 w-full bg-gradient-to-r from-htm-green via-htm-gold to-htm-green"></div>
                    <div className="p-8 md:p-12">
                        {state.error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-fade-in-up">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <p className="text-red-200 text-sm font-medium">{state.error}</p>
                            </div>
                        )}
                        {!state.result ? (
                            <form onSubmit={handleCalculate} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-8">
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-mono text-htm-gold uppercase tracking-[0.3em] group-hover:text-white transition-colors">01 // Monthly Bill</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-gray-600 group-hover:text-htm-lightGreen transition-colors" />
                                            <input 
                                                type="number" 
                                                required 
                                                min="500" 
                                                placeholder="5000" 
                                                className="w-full pl-10 bg-transparent border-b border-gray-800 text-4xl md:text-5xl font-display focus:border-htm-lightGreen outline-none transition-all duration-300 py-3 placeholder:text-gray-800 focus:scale-[1.02] origin-left" 
                                                value={state.billAmount} 
                                                onChange={(e) => setState({...state, billAmount: e.target.value === '' ? '' : parseInt(e.target.value)})} 
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-mono text-htm-gold uppercase tracking-[0.3em] group-hover:text-white transition-colors">02 // Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-hover:text-htm-lightGreen transition-colors" />
                                            <select 
                                                className="w-full bg-transparent border-b border-gray-800 text-2xl font-display focus:border-htm-lightGreen outline-none transition-all duration-300 py-3 appearance-none cursor-pointer text-white focus:scale-[1.02] origin-left" 
                                                value={state.location} 
                                                onChange={(e) => setState({...state, location: e.target.value})}
                                            >
                                                {STATES_INDIA.map(s => <option key={s} value={s} className="bg-htm-charcoal">{s}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-8 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-mono text-htm-gold uppercase tracking-[0.3em]">03 // Type</label>
                                        <div className="flex gap-4">
                                            {['residential', 'commercial'].map((type) => (
                                                <button 
                                                    key={type} 
                                                    type="button" 
                                                    onClick={() => setState({...state, propertyType: type as any})} 
                                                    className={`
                                                        flex-1 py-4 border rounded-xl uppercase tracking-widest text-xs font-bold transition-all duration-500 cursor-pointer
                                                        ${state.propertyType === type 
                                                            ? 'border-htm-lightGreen bg-htm-lightGreen/10 text-htm-lightGreen shadow-[0_4px_20px_-5px_rgba(52,211,153,0.3)]' 
                                                            : 'border-white/5 text-gray-600 hover:border-white/20 hover:text-white'
                                                        }
                                                    `}
                                                >
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={state.loading} 
                                        className="
                                            w-full bg-white text-htm-dark hover:bg-htm-gold transition-all duration-500 
                                            py-5 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-3 
                                            disabled:opacity-50 disabled:cursor-wait mt-auto rounded-xl shadow-xl hover:-translate-y-1
                                        "
                                    >
                                        {state.loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Check Savings <Zap className="w-4 h-4 fill-current" /></>}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="animate-fade-in">
                                <div className="flex justify-between items-start mb-10 border-b border-white/5 pb-6">
                                    <div>
                                        <h3 className="text-3xl font-display text-white">Your Savings Report</h3>
                                        <p className="text-[10px] text-gray-500 font-mono mt-2 tracking-widest uppercase">ID: {state.location.substring(0,3).toUpperCase()}-{(Math.random()*1000).toFixed(0)}</p>
                                    </div>
                                    <button onClick={() => setState(prev => ({...prev, result: null}))} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all group" title="Recalculate">
                                        <RefreshCw className="w-5 h-5 text-gray-400 group-hover:rotate-180 transition-transform duration-700" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                    <div className="bg-black/40 p-6 rounded-2xl border-l-4 border-htm-lightGreen"><p className="text-[10px] text-gray-500 font-mono uppercase mb-2">Ideal System</p><p className="text-4xl font-display">{state.result.systemSizeKw} <span className="text-lg opacity-50">kW</span></p></div>
                                    <div className="bg-black/40 p-6 rounded-2xl border-l-4 border-htm-gold"><p className="text-[10px] text-gray-500 font-mono uppercase mb-2">Estimated Cost</p><p className="text-2xl font-display">{state.result.estimatedCost}</p></div>
                                    <div className="bg-black/40 p-6 rounded-2xl border-l-4 border-htm-green"><p className="text-[10px] text-gray-500 font-mono uppercase mb-2">Pays Back In</p><p className="text-2xl font-display text-htm-lightGreen">{state.result.roiYears} <span className="text-lg opacity-50">Years</span></p></div>
                                </div>
                                
                                <ROIChart cost={(state.result.costMin + state.result.costMax) / 2} annualSavings={(state.result.savingsYearlyMin + state.result.savingsYearlyMax) / 2} />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                                    <div className="bg-white/5 rounded-2xl border border-white/5 p-8 flex items-start gap-4">
                                        <div className="bg-htm-lightGreen/20 p-2 rounded-lg"><CheckCircle className="w-5 h-5 text-htm-lightGreen" /></div>
                                        <div>
                                            <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-xs">Our Advice</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{state.result.recommendation}</p>
                                        </div>
                                    </div>
                                    <div className="bg-htm-gold/5 rounded-2xl border border-htm-gold/10 p-8 flex items-start gap-4">
                                        <div className="bg-htm-gold/20 p-2 rounded-lg"><Zap className="w-5 h-5 text-htm-gold" /></div>
                                        <div>
                                            <h4 className="font-bold text-white mb-2 uppercase tracking-widest text-xs">Helping Earth</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">You save <span className="text-htm-gold font-bold">{state.result.carbonOffset}</span> of CO2 every year. This is like planting 50 trees every year.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={(e) => smoothScroll(e, `#${SectionId.CONTACT}`)}
                                    className="w-full bg-htm-lightGreen text-htm-dark font-bold py-5 text-sm uppercase tracking-widest hover:bg-white transition-all duration-500 rounded-xl mt-10 shadow-lg active:scale-95"
                                >
                                    Book a Free Site Visit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default SolarCalculator;
