import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children?: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number; // Delay in ms
}

export const RevealOnScroll: React.FC<RevealProps> = ({ children, width = "fit-content", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const transitionDelay = `${delay}ms`;

  return (
    <div ref={ref} style={{ width }} className={`${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-10'}`} >
      <div style={{ transitionDelay }}>
        {children}
      </div>
    </div>
  );
};