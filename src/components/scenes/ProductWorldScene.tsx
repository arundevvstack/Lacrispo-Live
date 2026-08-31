"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CanvasSequence, { CanvasSequenceHandle } from "../CanvasSequence";

gsap.registerPlugin(ScrollTrigger);

interface ProductWorldSceneProps {
  frameUrls: string[];
  onReady: () => void;
  onProgress: (progress: number) => void;
}

export default function ProductWorldScene({
  frameUrls,
  onReady,
  onProgress,
}: ProductWorldSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<CanvasSequenceHandle>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Flavour Wave Flow Elements (Harmonic Silver & Seasoning Ambient Ribbons)
  const flavourWaveBackRef = useRef<HTMLDivElement>(null);
  const flavourWaveFrontRef = useRef<HTMLDivElement>(null);
  const atmosphericGlowRef = useRef<HTMLDivElement>(null);

  // Minimal Supporting Brand Layer (Revealed post chip emergence)
  const brandingGroupRef = useRef<HTMLDivElement>(null);
  const brandTitleRef = useRef<HTMLHeadingElement>(null);
  const brandSubRef = useRef<HTMLParagraphElement>(null);
  const craftBadgeRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

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
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMq = window.matchMedia("(max-width: 768px)");

    const onMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    const onMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    motionMq.addEventListener("change", onMotionChange);
    mobileMq.addEventListener("change", onMobileChange);

    return () => {
      motionMq.removeEventListener("change", onMotionChange);
      mobileMq.removeEventListener("change", onMobileChange);
    };
  }, []);

  // GSAP Scroll Choreography: THE FLAVOUR WAVE -> CHIP EMERGES -> TEXTURE REVEAL -> BRANDING
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Ambient Flavour Wave Harmonic Flow (Organic Silver & Subtle Seasoning Motion)
      if (!isReducedMotion) {
        gsap.to(flavourWaveBackRef.current, {
          xPercent: 7,
          yPercent: -5,
          rotate: 3,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(flavourWaveFrontRef.current, {
          xPercent: -5,
          yPercent: 7,
          rotate: -2,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 2. Scroll-Driven Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=650%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (canvasRef.current) {
              const p = self.progress;
              // Smooth non-linear progress tying scroll directly to the 80 crisp frames
              const frameProgress = p === 1 ? 1 : 1 - Math.pow(2, -8.5 * p);
              canvasRef.current.setProgress(frameProgress);
            }
          },
        },
      });

      if (isReducedMotion) {
        tl.to(brandingGroupRef.current, { opacity: 1, duration: 0.1, ease: "none" }, 0.2);
        if (scrollCueRef.current) {
          tl.to(scrollCueRef.current, { opacity: 0, duration: 0.05 }, 0.05);
        }
      } else {
        // Stage 02 -> 03: The Flavour Wave parts as the Chip Emerges & Scales (0.00 -> 0.35)
        tl.fromTo(
          canvasContainerRef.current,
          { scale: isMobile ? 0.88 : 0.84, opacity: 0.95, y: isMobile ? 20 : 35 },
          { scale: isMobile ? 1.02 : 1.1, opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
          0.0
        );

        // Refined silver specular glow highlights the chip
        tl.to(
          atmosphericGlowRef.current,
          { scale: 1.25, opacity: 0.85, duration: 0.4, ease: "power2.out" },
          0.05
        );

        // Fade out initial scroll cue
        if (scrollCueRef.current) {
          tl.to(
            scrollCueRef.current,
            { opacity: 0, y: 15, duration: 0.08, ease: "power2.out" },
            0.02
          );
        }

        // Stage 04: Texture Revealed & Minimal Branding Materializes (0.35 -> 0.70)
        tl.fromTo(
          craftBadgeRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
          0.32
        )
          .fromTo(
            brandTitleRef.current,
            { opacity: 0, scale: 0.96, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.22, ease: "power3.out" },
            0.36
          )
          .fromTo(
            brandSubRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
            0.42
          );

        // Stage 05: Seamless Handoff into Scene 02 (Flavour & Texture)
        tl.to(
          brandingGroupRef.current,
          { opacity: 0, y: -30, duration: 0.2, ease: "power2.in" },
          0.82
        );

        tl.to(
          canvasContainerRef.current,
          { scale: 1.15, opacity: 0.3, duration: 0.2, ease: "power2.in" },
          0.85
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion, isMobile, frameUrls.length]);

  // Subtle Mouse Parallax on Desktop
  useEffect(() => {
    if (isReducedMotion || isMobile || !canvasContainerRef.current) return;

    const xTo = gsap.quickTo(canvasContainerRef.current, "x", { duration: 0.9, ease: "power3" });
    const yTo = gsap.quickTo(canvasContainerRef.current, "y", { duration: 0.9, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      const maxDisplacement = 12;
      xTo(nx * -maxDisplacement);
      yTo(ny * -maxDisplacement);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isReducedMotion, isMobile]);

  return (
    <section
      ref={containerRef}
      id="product-world"
      className="h-screen w-full relative bg-[#0B0C0E] overflow-hidden select-none"
      aria-label="La Crispo Product World Experience"
    >
      {/* ================= DARK LUXURY GRAPHITE + SILVER ENVIRONMENT ================= */}
      {/* 1. Base Dark Graphite Foundation */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#070809] via-[#0B0C0E] to-[#111317] z-0" />

      {/* 2. Soft Ambient Silver Specular Studio Spotlight behind the Chip */}
      <div
        ref={atmosphericGlowRef}
        className="absolute inset-0 pointer-events-none z-1 flex items-center justify-center"
      >
        <div className="w-[85vw] md:w-[65vw] h-[85vh] md:h-[65vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(199,203,209,0.12)_0%,rgba(229,168,85,0.06)_30%,transparent_70%)] blur-3xl" />
      </div>

      {/* 3. Flowing Flavour Wave Ribbons (Refined Silver & Restrained Amber Heat) */}
      <div
        ref={flavourWaveBackRef}
        className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] pointer-events-none z-1 opacity-20"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_30%_40%,rgba(199,203,209,0.4)_0%,rgba(17,19,23,0.3)_35%,transparent_65%)] filter blur-3xl transform rotate-12" />
      </div>

      <div
        ref={flavourWaveFrontRef}
        className="absolute -bottom-1/4 -right-1/4 w-[150vw] h-[150vh] pointer-events-none z-1 opacity-15"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_70%_60%,rgba(201,111,50,0.3)_0%,rgba(199,203,209,0.15)_40%,transparent_70%)] filter blur-3xl transform -rotate-12" />
      </div>

      {/* ================= THE HERO CHIP CANVAS SEQUENCE ================= */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none will-change-transform"
      >
        <CanvasSequence
          ref={canvasRef}
          frameUrls={frameUrls}
          onReady={onReady}
          onProgress={onProgress}
        />
      </div>

      {/* ================= SUPPORTING BRANDING OVERLAY (Revealed post chip arrival) ================= */}
      <div
        ref={brandingGroupRef}
        className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-12 md:p-16 pointer-events-none"
      >
        {/* Top Indicator Row */}
        <div className="flex items-start justify-between w-full pt-16 md:pt-12">
          <div ref={craftBadgeRef} className="opacity-0 flex flex-col gap-1">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#C7CBD1] font-bold font-mono">
              01 / The Flavour Wave
            </span>
            <span className="text-[10px] tracking-[0.2em] text-[#858B94] uppercase font-mono font-semibold">
              Hand-Cooked Kettle Crisps
            </span>
          </div>

          <div className="opacity-0 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border border-[#C7CBD1]/20 bg-[#181B20]/80 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E5A855]" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C7CBD1] font-bold">
              Pure Sunflower Oil
            </span>
          </div>
        </div>

        {/* Minimal Supporting Wordmark (Understated, behind & below the chip focus) */}
        <div className="w-full flex flex-col items-center justify-end text-center my-auto pt-52 sm:pt-64">
          <h1
            ref={brandTitleRef}
            className="opacity-0 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic tracking-tighter text-[#F2F2F0] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] leading-none"
          >
            La Crispo
          </h1>

          <p
            ref={brandSubRef}
            className="opacity-0 mt-4 max-w-lg text-xs sm:text-sm md:text-base text-[#A7ACB4] font-medium tracking-wider leading-relaxed px-4"
          >
            Hand-selected potatoes, kettle-cooked to pristine golden crunch.
          </p>
        </div>

        {/* Bottom Metadata & Initial Scroll Direction */}
        <div className="flex items-end justify-between w-full pb-4">
          <div className="text-[10px] tracking-[0.25em] uppercase text-[#858B94] font-mono font-medium hidden sm:block">
            Artisan Quality Verified — 9 Unique Flavours
          </div>

          {/* Initial Scroll Cue */}
          <div
            ref={scrollCueRef}
            className="flex items-center gap-3 ml-auto opacity-90 transition-opacity duration-300 pointer-events-none"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#C7CBD1] font-mono font-bold">
              Scroll To Journey
            </span>
            <div className="w-8 h-[1.5px] bg-gradient-to-r from-[#C7CBD1] to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
