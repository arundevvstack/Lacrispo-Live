"use client";

import { useEffect, useState, useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  blur: number;
  opacity: number;
  duration: number;
  delay: number;
}

export default function Particles({ 
  count = 20, 
  layer = "background", 
  className = "" 
}: { 
  count?: number; 
  layer?: "background" | "foreground";
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, i) => {
      const isFore = layer === "foreground";
      return {
        id: i,
        x: Math.random() * 100, // 0 to 100%
        y: Math.random() * 100, // 0 to 100%
        // Foreground particles are huge and heavily blurred to simulate objects right on the camera lens
        size: isFore ? Math.random() * 30 + 15 : Math.random() * 5 + 2, 
        blur: isFore ? Math.random() * 20 + 10 : Math.random() * 3 + 1, 
        opacity: isFore ? Math.random() * 0.15 + 0.05 : Math.random() * 0.25 + 0.05,
        duration: Math.random() * 40 + 20, // Move very slowly
        delay: Math.random() * 20 * -1, // Start at different animation times
      };
    });
  }, [count, layer]);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#EAD0A1] [data-theme='light']_:bg-[#8B5A2B] will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
            animation: `drift-${layer} ${p.duration}s infinite alternate ease-in-out`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drift-background {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -60px) scale(1.2); }
          100% { transform: translate(-30px, -120px) scale(0.8); }
        }
        @keyframes drift-foreground {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-100px, -150px) scale(1.5); }
          100% { transform: translate(80px, -300px) scale(0.9); }
        }
      `}} />
    </div>
  );
}
