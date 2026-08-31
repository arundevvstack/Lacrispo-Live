"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasSequence, { CanvasSequenceHandle } from "../CanvasSequence";

gsap.registerPlugin(ScrollTrigger);

interface HeroSceneProps {
  frameUrls: string[];
  onReady: () => void;
  onProgress: (progress: number) => void;
}

export default function HeroScene({ frameUrls, onReady, onProgress }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<CanvasSequenceHandle>(null);
  const textGroupRef = useRef<HTMLDivElement>(null);
  
  const titleLeftRef = useRef<HTMLHeadingElement>(null);
  const titleRightRef = useRef<HTMLHeadingElement>(null);
  const laCrispoRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 768px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    const mobileHandler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    
    mediaQuery.addEventListener("change", handler);
    mobileQuery.addEventListener("change", mobileHandler);
    
    return () => {
      mediaQuery.removeEventListener("change", handler);
      mobileQuery.removeEventListener("change", mobileHandler);
    };
  }, []);

  // GSAP Timeline and ScrollTrigger setup
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1200%", 
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (canvasRef.current) {
              const p = self.progress;
              const easedProgress = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
              canvasRef.current.setProgress(easedProgress);
            }
          }
        }
      });

      if (isReducedMotion) {
        // Simple fade for reduced motion
        tl.to([laCrispoRef.current, titleLeftRef.current, titleRightRef.current, descriptionRef.current], {
          opacity: 1,
          duration: 0.1,
          ease: "none"
        }, 0.1);
        
        if (scrollIndicatorRef.current) {
          tl.to(scrollIndicatorRef.current, { opacity: 0, duration: 0.05 }, 0.1);
        }
      } else {
        // Spatial Convergence Animation
        if (isMobile) {
          // Mobile specific animation: standard stack with simple vertical translation
          tl.fromTo(laCrispoRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.1 }, 0.1)
            .fromTo(titleLeftRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.12)
            .fromTo(titleRightRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1 }, 0.14)
            .fromTo(descriptionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.16);
            
          tl.to([laCrispoRef.current, titleLeftRef.current, titleRightRef.current, descriptionRef.current], {
            y: -50,
            duration: 0.85,
            ease: "none"
          }, 0.2);
        } else {
          // Desktop specific spatial convergence
          // "ENTER" comes from top-left, "THE CRUNCH" comes from bottom-right
          tl.fromTo(titleLeftRef.current, 
            { opacity: 0, x: -150, y: -100 }, 
            { opacity: 1, x: 0, y: 0, duration: 0.15, ease: "power2.out" }, 
            0.1
          )
          .fromTo(titleRightRef.current, 
            { opacity: 0, x: 150, y: 100 }, 
            { opacity: 1, x: 0, y: 0, duration: 0.15, ease: "power2.out" }, 
            0.1
          )
          .fromTo(laCrispoRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.1, ease: "power2.out" },
            0.12
          )
          .fromTo(descriptionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.1 },
            0.15
          );

          // Subtle overall drift backwards as the sequence finishes
          tl.to(textGroupRef.current, {
            y: -80,
            scale: 1.02,
            duration: 0.85,
            ease: "none"
          }, 0.2);
        }

        if (scrollIndicatorRef.current) {
          tl.to(scrollIndicatorRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.05,
            ease: "power2.out"
          }, 0.05);
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion, isMobile, frameUrls.length]);

  // Subtle Mouse Parallax (Desktop Only)
  useEffect(() => {
    if (isReducedMotion || isMobile || !textGroupRef.current) return;

    // Use GSAP quickTo for high-performance imperative updates
    const xTo = gsap.quickTo(textGroupRef.current, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(textGroupRef.current, "y", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coordinates (-1 to +1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      
      // Maximum displacement in pixels
      const maxMove = 12;
      
      xTo(nx * -maxMove);
      yTo(ny * -maxMove);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isReducedMotion, isMobile]);

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-[#050505] overflow-hidden">
      <div className="sr-only">
        Interactive cinematic animation of La Crispo premium snacks being formed. Scroll down to explore.
      </div>
      
      {/* PURE RENDERER: CanvasSequence receives imperative updates via ref */}
      <div className="absolute inset-0">
        <CanvasSequence
          ref={canvasRef}
          frameUrls={frameUrls}
          onReady={onReady}
          onProgress={onProgress}
        />
      </div>

      {/* Subtle Cinematic Depth/Vignette Gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] z-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40 z-0" />
      
      {/* HERO SCENE TYPOGRAPHY */}
      <div 
        ref={textGroupRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 px-4 md:px-0"
      >
        <div className="flex flex-col items-center mb-6 w-full relative">
          
          {/* Background-blended Brand Text */}
          <h1 
            ref={laCrispoRef}
            className="opacity-0 text-7xl md:text-[12rem] font-serif italic tracking-tighter text-white mix-blend-overlay drop-shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] md:-translate-y-1/2 z-0 whitespace-nowrap"
          >
            La Crispo
          </h1>
          
          {/* Foreground Spatial Typography */}
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-1 md:gap-6 mt-16 md:mt-0">
            <h2 
              ref={titleLeftRef}
              className="opacity-0 text-5xl md:text-[7rem] font-black tracking-tighter text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]"
            >
              ENTER
            </h2>
            <h2 
              ref={titleRightRef}
              className="opacity-0 text-5xl md:text-[7rem] font-black tracking-tighter bg-gradient-to-b from-[#FFF] via-[#F5E6CC] to-[#D4A373] text-transparent bg-clip-text drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
            >
              THE CRUNCH
            </h2>
          </div>
        </div>
        
        <p 
          ref={descriptionRef}
          className="opacity-0 text-lg md:text-2xl text-white/90 font-light tracking-wide drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] text-center max-w-2xl px-6 leading-relaxed relative z-10 mt-6"
        >
          Every bite is carefully crafted to deliver a <strong className="font-semibold text-white">premium crunch</strong> and an explosion of refined flavor.
        </p>
      </div>
      
      {/* Custom Scroll Indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex items-center gap-4 opacity-80 pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Discover
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/40 to-white/10 overflow-hidden relative">
          <div className="w-full h-1/2 bg-white absolute top-0 left-0 animate-[shimmer_2s_infinite]" />
        </div>
      </div>
    </section>
  );
}
