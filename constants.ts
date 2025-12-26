
import React from 'react';
import { SectionId } from './types';

export const NAV_LINKS = [
  { label: 'Home', href: `#${SectionId.HOME}`, isPage: false },
  { label: 'Our Story', href: '#about-us', isPage: true },
  { label: 'Govt Subsidy', href: '#subsidy', isPage: true },
  { label: 'Services', href: `#${SectionId.SERVICES}`, isPage: false },
  { label: 'Smart Calc', href: `#${SectionId.CALCULATOR}`, isPage: false },
  { label: 'Contact', href: `#${SectionId.CONTACT}`, isPage: false },
];

export const STATES_INDIA = [
  "Uttar Pradesh", "Maharashtra", "Karnataka", "Gujarat", "Tamil Nadu", "Rajasthan", 
  "Delhi", "Telangana", "Andhra Pradesh", "Kerala", 
  "Madhya Pradesh", "West Bengal", "Haryana", "Punjab", "Other"
];

export const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2058&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545208942-e91b9a952211?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?q=80&w=2070&auto=format&fit=crop"
];

export const HERO_IMAGE_URL = HERO_IMAGES[0];

export const SERVICE_IMAGES = {
  residential: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2058&auto=format&fit=crop",
  commercial: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  maintenance: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop",
  about: "https://images.unsplash.com/photo-1605980005219-4663e2e999fb?q=80&w=2070&auto=format&fit=crop",
  monitoring: "https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=2070&auto=format&fit=crop",
  subsidy: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
};

export const TESTIMONIALS = [
  { 
    id: 1, 
    name: "Rajesh Verma", 
    role: "Industrial Owner, Kanpur", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", 
    quote: "The technical expertise of the team is unmatched. They reduced our factory's electricity bill by 80%." 
  },
  { 
    id: 2, 
    name: "Priya Sharma", 
    role: "Homeowner, Lucknow", 
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop", 
    quote: "I was guided perfectly through the government subsidy process. Professional, transparent, and efficient." 
  },
  { 
    id: 3, 
    name: "Amit Singh", 
    role: "Hotel Manager, Varanasi", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop", 
    quote: "Trust is everything in solar. This team delivered on every promise, from installation quality to final grid connection." 
  }
];

export const scrollToSection = (href: string) => {
  try {
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    
    if (elem) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elem.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } catch (error) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

export const smoothScroll = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>, href: string) => {
  try {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    scrollToSection(href);
  } catch (error) {
    console.error("SmoothScroll error:", error);
  }
};
