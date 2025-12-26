
import React, { useState } from 'react';
import { SectionId } from '../types';
import { Phone, Mail, MapPin, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { RevealOnScroll } from './RevealOnScroll';
import CursorSpotlight from './CursorSpotlight';

interface FormData {
  name: string;
  phone: string;
  requirements: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  requirements?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', requirements: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (formData.name.trim().length < 3) { newErrors.name = "Full Name must be at least 3 characters"; isValid = false; }
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) { newErrors.phone = "Please enter a valid phone number (min 10 digits)"; isValid = false; }
    if (formData.requirements.trim().length < 10) { newErrors.requirements = "Please describe your requirements (min 10 chars)"; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setErrorMessage('');
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Safely parse JSON or handle text response
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = { message: response.statusText || 'Unknown server response' };
      }

      if (!response.ok) {
        // Differentiate HTTP errors
        if (response.status === 400) {
            throw new Error(data.message || 'Invalid information provided. Please check your inputs.');
        } else if (response.status >= 500) {
            throw new Error('Server error. Our technical team has been notified. Please try again later.');
        } else {
            throw new Error(data.message || `Request failed (${response.status})`);
        }
      }

      setSubmitStatus('success');
      setServerMessage(data.message || 'Message sent successfully.');
      setFormData({ name: '', phone: '', requirements: '' });
      
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error: any) { 
      console.error("Contact Form Submission Error:", error);
      setSubmitStatus('error'); 
      
      // Developer friendly logging & User friendly messaging
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
          setErrorMessage("Network error: Unable to connect to server. Please check your internet connection.");
      } else {
          setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
      }
    } finally { 
      setIsSubmitting(false); 
    }
  };

  return (
    <section id={SectionId.CONTACT} className="py-24 bg-htm-green text-white relative overflow-hidden">
      
      {/* Spotlight Effect */}
      <CursorSpotlight color="radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%)" size={600} />

      <div className="container mx-auto px-6 relative z-10">
        <RevealOnScroll>
             <span className="text-xs font-mono text-htm-gold uppercase tracking-widest flex items-center gap-2 mb-8">
                05 // Contact Us
                <div className="h-px w-12 bg-htm-gold"></div>
            </span>
        </RevealOnScroll>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-between">
                <RevealOnScroll>
                    <div>
                        <h2 className="text-6xl md:text-8xl font-display mb-12 opacity-90">Start Your <br/> Journey.</h2>
                        <div className="space-y-8 text-lg font-light">
                            <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform">
                                <MapPin className="w-6 h-6 mt-1 text-htm-gold group-hover:scale-125 transition-transform" />
                                <div><p className="font-bold mb-1">Our Office</p><p className="opacity-80">Alamnagar, Lucknow<br/>Uttar Pradesh, India</p></div>
                            </div>
                            <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform">
                                <Phone className="w-6 h-6 mt-1 text-htm-gold group-hover:scale-125 transition-transform" />
                                <div>
                                    <p className="font-bold mb-1">Phone</p>
                                    <a href="tel:+918368813443" className="opacity-80 font-mono text-xl hover:text-htm-gold transition-colors block">+91 83688 13443</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 group cursor-pointer hover:translate-x-2 transition-transform">
                                <Mail className="w-6 h-6 mt-1 text-htm-gold group-hover:scale-125 transition-transform" />
                                <div>
                                    <p className="font-bold mb-1">Email</p>
                                    <a href="mailto:info@htmsolar.com" className="opacity-80 hover:text-htm-gold transition-colors block">info@htmsolar.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
                <div className="mt-12 opacity-50 text-sm font-mono hidden lg:block">HTM SOLAR SOLUTIONS PVT LTD © {new Date().getFullYear()}</div>
            </div>
            <RevealOnScroll delay={200} width="100%">
                <div className="bg-white text-htm-dark p-8 md:p-12 rounded-none md:rounded-tl-[4rem] shadow-2xl relative overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                    <h3 className="text-2xl font-bold mb-8">Get a Free Quote</h3>
                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 animate-fade-in-up">
                            <CheckCircle className="w-5 h-5 text-green-600" /><p className="text-green-800 font-medium">{serverMessage}</p>
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 animate-fade-in-up">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                            <p className="text-red-800 font-medium text-sm">{errorMessage}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div className={`
                            relative border-b-2 transition-all duration-300 p-3 rounded-t-lg
                            ${errors.name 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-200 bg-transparent focus-within:border-htm-green focus-within:bg-green-50/50 focus-within:shadow-[0_4px_20px_-2px_rgba(4,120,87,0.1)]'
                            }
                        `}>
                            <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Full Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                className="w-full outline-none text-lg font-medium placeholder-gray-300 bg-transparent transition-transform focus:scale-[1.01] origin-left" 
                                placeholder="Enter Your Name" 
                            />
                            {errors.name && <p className="absolute bottom-1 right-2 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                        </div>

                        {/* Phone Field */}
                        <div className={`
                            relative border-b-2 transition-all duration-300 p-3 rounded-t-lg
                            ${errors.phone 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-200 bg-transparent focus-within:border-htm-green focus-within:bg-green-50/50 focus-within:shadow-[0_4px_20px_-2px_rgba(4,120,87,0.1)]'
                            }
                        `}>
                            <label className="block text-xs font-bold uppercase mb-1 text-gray-500">Phone Number</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange} 
                                className="w-full outline-none text-lg font-medium placeholder-gray-300 bg-transparent transition-transform focus:scale-[1.01] origin-left" 
                                placeholder="+91" 
                            />
                            {errors.phone && <p className="absolute bottom-1 right-2 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                        </div>

                        {/* Requirements Field */}
                        <div className={`
                            relative border-b-2 transition-all duration-300 p-3 rounded-t-lg
                            ${errors.requirements 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-200 bg-transparent focus-within:border-htm-green focus-within:bg-green-50/50 focus-within:shadow-[0_4px_20px_-2px_rgba(4,120,87,0.1)]'
                            }
                        `}>
                            <label className="block text-xs font-bold uppercase mb-1 text-gray-500">How can we help?</label>
                            <textarea 
                                rows={3} 
                                name="requirements" 
                                value={formData.requirements} 
                                onChange={handleChange} 
                                className="w-full outline-none text-lg font-medium resize-none placeholder-gray-300 bg-transparent transition-transform focus:scale-[1.01] origin-left" 
                                placeholder="Tell us about your home or shop..."
                            ></textarea>
                            {errors.requirements && <p className="absolute bottom-2 right-2 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />Please write more</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className="
                                w-full bg-htm-dark text-white py-5 font-bold uppercase tracking-widest hover:bg-black transition-all duration-300 
                                disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 
                                shadow-lg hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:translate-y-0
                            "
                        >
                            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : "Send Request"}
                        </button>
                    </form>
                </div>
            </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default Contact;
