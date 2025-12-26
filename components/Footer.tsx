
import React from 'react';
import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { SectionId, PageView } from '../types';
import { smoothScroll } from '../constants';

interface FooterProps {
  currentView: PageView;
  onNavigate: (view: PageView, targetId?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ currentView, onNavigate }) => {
  
  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    if (currentView === 'subsidy') {
      onNavigate('main', targetId);
    } else {
      smoothScroll(e, targetId);
    }
  };

  return (
    <footer className="bg-htm-cream pt-20 pb-10 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-gray-200 p-1 shadow-sm">
                        <img src="logo.png" alt="HTM Solar Logo" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-2xl font-bold text-htm-dark tracking-tight">HTM <span className="text-htm-gold">Solar</span></span>
                </div>
                <p className="text-gray-500 leading-relaxed">
                    Professionally engineering solar solutions nationwide with a focus on Uttar Pradesh. Our team brings 15+ years of collective experience and has contributed to hundreds of successful installations across the region.
                </p>
            </div>
            
            <div>
                <h4 className="font-bold text-htm-dark mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-500">
                    <li><a href={`#${SectionId.HOME}`} onClick={(e) => handleLinkClick(e, `#${SectionId.HOME}`)} className="hover:text-htm-green transition-colors cursor-pointer block w-fit">Home</a></li>
                    <li><a href={`#${SectionId.ABOUT}`} onClick={(e) => handleLinkClick(e, `#${SectionId.ABOUT}`)} className="hover:text-htm-green transition-colors cursor-pointer block w-fit">Our Story</a></li>
                    <li><a href={`#${SectionId.SERVICES}`} onClick={(e) => handleLinkClick(e, `#${SectionId.SERVICES}`)} className="hover:text-htm-green transition-colors cursor-pointer block w-fit">Solutions</a></li>
                    <li><a href={`#${SectionId.CALCULATOR}`} onClick={(e) => handleLinkClick(e, `#${SectionId.CALCULATOR}`)} className="hover:text-htm-green transition-colors cursor-pointer block w-fit">Savings Calculator</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-htm-dark mb-4">Solutions</h4>
                <ul className="space-y-2 text-gray-500">
                    <li><a href={`#${SectionId.SERVICES}`} onClick={(e) => handleLinkClick(e, `#${SectionId.SERVICES}`)} className="hover:text-htm-green transition-colors cursor-pointer block w-fit">Residential Solar</a></li>
                    <li><a href={`#${SectionId.SERVICES}`} onClick={(e) => handleLinkClick(e, `#${SectionId.SERVICES}`)} className="hover:text-htm-green transition-colors cursor-pointer block w-fit">Business & Retail</a></li>
                    <li><a href={`#${SectionId.SERVICES}`} onClick={(e) => handleLinkClick(e, `#${SectionId.SERVICES}`)} className="hover:text-htm-green transition-colors cursor-pointer block w-fit">Industries</a></li>
                    <li><a href="#subsidy" onClick={(e) => { e.preventDefault(); onNavigate('subsidy'); }} className="hover:text-htm-green transition-colors cursor-pointer block w-fit">Subsidy Assistance</a></li>
                </ul>
            </div>

            <div>
                <h4 className="font-bold text-htm-dark mb-4">Contact</h4>
                <div className="space-y-2 mb-4 text-gray-500">
                    <p>Headquarters: Lucknow, UP</p>
                    <p className="text-xs uppercase tracking-widest text-htm-gold font-bold">Serving All India</p>
                    <a href="tel:+918368813443" className="block hover:text-htm-green transition-colors w-fit">+91 83688 13443</a>
                    <a href="mailto:info@htmsolar.com" className="block hover:text-htm-green transition-colors w-fit">info@htmsolar.com</a>
                </div>
                <div className="flex gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E1306C] transition-all duration-300 hover:scale-110 hover:-translate-y-1"><Instagram className="w-5 h-5"/></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1DA1F2] transition-all duration-300 hover:scale-110 hover:-translate-y-1"><Twitter className="w-5 h-5"/></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-all duration-300 hover:scale-110 hover:-translate-y-1"><Linkedin className="w-5 h-5"/></a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-all duration-300 hover:scale-110 hover:-translate-y-1"><Facebook className="w-5 h-5"/></a>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} HTM Solar Solutions Pvt Ltd. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-htm-dark transition-colors">Privacy Policy</a>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-htm-dark transition-colors">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
