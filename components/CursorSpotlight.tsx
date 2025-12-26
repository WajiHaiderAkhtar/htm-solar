
import React, { useEffect, useRef, useState } from 'react';

interface CursorSpotlightProps {
  color?: string;
  size?: number;
  opacity?: number;
}

const CursorSpotlight: React.FC<CursorSpotlightProps> = ({ 
  color = 'radial-gradient(circle, rgba(234, 179, 8, 0.15) 0%, transparent 70%)', 
  size = 600,
  opacity = 1
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.parentElement?.getBoundingClientRect();
      
      if (rect) {
        // Calculate position relative to the parent container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Check if mouse is inside the parent (with some buffer for smooth edge entry)
        const isInside = 
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom;
          
        if (isInside) {
            setPosition({ x, y });
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-[5]"
      aria-hidden="true"
    >
      <div 
        className="absolute rounded-full blur-[60px] transition-opacity duration-500 will-change-transform"
        style={{
          width: size,
          height: size,
          left: 0,
          top: 0,
          background: color,
          opacity: isHovering ? opacity : 0,
          transform: `translate3d(${position.x - size / 2}px, ${position.y - size / 2}px, 0)`,
        }}
      />
    </div>
  );
};

export default CursorSpotlight;
