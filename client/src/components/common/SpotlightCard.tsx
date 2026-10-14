import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  size?: number;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(56, 189, 248, 0.12)',
  borderColor = 'rgba(56, 189, 248, 0.35)',
  size = 350,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl overflow-hidden p-[1px] transition-all duration-300 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(${size * 0.8}px circle at ${position.x}px ${position.y}px, ${borderColor}, transparent 80%)`,
        }}
      />

      {/* Base Border Container */}
      <div className="relative w-full h-full rounded-[23px] bg-[#0A1020] border border-[#1E293B]/70 overflow-hidden z-10 transition-colors duration-300 hover:border-slate-700/60">
        {/* Dynamic Surface Ambient Spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
          style={{
            opacity,
            background: `radial-gradient(${size}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />

        {/* Card Children Content */}
        <div className="relative z-20 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
