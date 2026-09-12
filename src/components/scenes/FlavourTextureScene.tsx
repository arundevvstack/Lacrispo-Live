"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { products } from "@/data/products";
import Particles from "./Particles";

gsap.registerPlugin(ScrollTrigger);

// Flavor Themes matching the 15 authentic signature La Crispo products
const flavourThemes = [
  { slug: "andhra-murukku", name: "Andhra Murukku", bg: "#140e04", glow: "rgba(234, 179, 8, 0.35)", spotlightGlow: "rgba(234, 179, 8, 0.55)", accent: "#EAB308" },
  { slug: "banana-chips", name: "Banana Chips", bg: "#161303", glow: "rgba(250, 204, 21, 0.38)", spotlightGlow: "rgba(250, 204, 21, 0.60)", accent: "#FACC15" },
  { slug: "dal-mixture", name: "Dal Mixture", bg: "#140f03", glow: "rgba(202, 138, 4, 0.35)", spotlightGlow: "rgba(202, 138, 4, 0.55)", accent: "#CA8A04" },
  { slug: "garlic-murukku", name: "Garlic Murukku", bg: "#03121b", glow: "rgba(56, 189, 248, 0.35)", spotlightGlow: "rgba(56, 189, 248, 0.55)", accent: "#38BDF8" },
  { slug: "jackfruit-chips", name: "Jackfruit Chips", bg: "#170c03", glow: "rgba(249, 115, 22, 0.35)", spotlightGlow: "rgba(249, 115, 22, 0.55)", accent: "#FB923C" },
  { slug: "kara-seva", name: "Kara Seva", bg: "#140d04", glow: "rgba(217, 119, 6, 0.35)", spotlightGlow: "rgba(217, 119, 6, 0.55)", accent: "#D97706" },
  { slug: "kerala-mixture", name: "Kerala Mixture", bg: "#180505", glow: "rgba(239, 68, 68, 0.38)", spotlightGlow: "rgba(239, 68, 68, 0.58)", accent: "#EF4444" },
  { slug: "masala-murukku", name: "Masala Murukku", bg: "#18040a", glow: "rgba(244, 63, 94, 0.36)", spotlightGlow: "rgba(244, 63, 94, 0.55)", accent: "#F43F5E" },
  { slug: "palak-murukku", name: "Palak Murukku", bg: "#03170a", glow: "rgba(34, 197, 94, 0.35)", spotlightGlow: "rgba(34, 197, 94, 0.55)", accent: "#22C55E" },
  { slug: "peanut-masala", name: "Peanut Masala", bg: "#170505", glow: "rgba(239, 68, 68, 0.38)", spotlightGlow: "rgba(239, 68, 68, 0.58)", accent: "#EF4444" },
  { slug: "peanut-roast", name: "Peanut Roast", bg: "#04121a", glow: "rgba(56, 189, 248, 0.35)", spotlightGlow: "rgba(56, 189, 248, 0.55)", accent: "#38BDF8" },
  { slug: "ring-murukku", name: "Ring Murukku", bg: "#151203", glow: "rgba(234, 179, 8, 0.35)", spotlightGlow: "rgba(234, 179, 8, 0.55)", accent: "#EAB308" },
  { slug: "sesame-ball", name: "Sesame Ball", bg: "#0f061c", glow: "rgba(167, 139, 250, 0.35)", spotlightGlow: "rgba(167, 139, 250, 0.55)", accent: "#A78BFA" },
  { slug: "tapioca-chips", name: "Tapioca Chips", bg: "#03121b", glow: "rgba(56, 189, 248, 0.35)", spotlightGlow: "rgba(56, 189, 248, 0.55)", accent: "#38BDF8" },
  { slug: "tomato-murukku", name: "Tomato Murukku", bg: "#18040a", glow: "rgba(244, 63, 94, 0.36)", spotlightGlow: "rgba(244, 63, 94, 0.55)", accent: "#F43F5E" },
];

const flavourThemesLight = [
  { slug: "andhra-murukku", name: "Andhra Murukku", bg: "#FAF6EF", glow: "rgba(217, 160, 24, 0.12)", spotlightGlow: "rgba(229, 168, 85, 0.22)", accent: "#AC6F1E" },
  { slug: "banana-chips", name: "Banana Chips", bg: "#FAF7EE", glow: "rgba(225, 175, 20, 0.14)", spotlightGlow: "rgba(229, 175, 45, 0.24)", accent: "#AC6F1E" },
  { slug: "dal-mixture", name: "Dal Mixture", bg: "#FAF6F0", glow: "rgba(202, 138, 4, 0.12)", spotlightGlow: "rgba(229, 168, 85, 0.20)", accent: "#AC6F1E" },
  { slug: "garlic-murukku", name: "Garlic Murukku", bg: "#F6F8FA", glow: "rgba(56, 189, 248, 0.12)", spotlightGlow: "rgba(56, 189, 248, 0.18)", accent: "#0284C7" },
  { slug: "jackfruit-chips", name: "Jackfruit Chips", bg: "#FAF5EE", glow: "rgba(234, 115, 22, 0.12)", spotlightGlow: "rgba(249, 115, 22, 0.20)", accent: "#C46227" },
  { slug: "kara-seva", name: "Kara Seva", bg: "#FAF5EE", glow: "rgba(217, 119, 6, 0.12)", spotlightGlow: "rgba(217, 119, 6, 0.20)", accent: "#C46227" },
  { slug: "kerala-mixture", name: "Kerala Mixture", bg: "#FAF3F2", glow: "rgba(225, 68, 68, 0.12)", spotlightGlow: "rgba(229, 90, 75, 0.20)", accent: "#C46227" },
  { slug: "masala-murukku", name: "Masala Murukku", bg: "#FAF2F4", glow: "rgba(225, 63, 94, 0.12)", spotlightGlow: "rgba(244, 85, 115, 0.20)", accent: "#C46227" },
  { slug: "palak-murukku", name: "Palak Murukku", bg: "#F4F8F4", glow: "rgba(34, 197, 94, 0.12)", spotlightGlow: "rgba(34, 197, 94, 0.18)", accent: "#16A34A" },
  { slug: "peanut-masala", name: "Peanut Masala", bg: "#FAF3F2", glow: "rgba(225, 68, 68, 0.12)", spotlightGlow: "rgba(229, 90, 75, 0.20)", accent: "#C46227" },
  { slug: "peanut-roast", name: "Peanut Roast", bg: "#F6F8FA", glow: "rgba(56, 189, 248, 0.12)", spotlightGlow: "rgba(56, 189, 248, 0.18)", accent: "#0284C7" },
  { slug: "ring-murukku", name: "Ring Murukku", bg: "#FAF6EF", glow: "rgba(217, 160, 24, 0.12)", spotlightGlow: "rgba(229, 168, 85, 0.22)", accent: "#AC6F1E" },
  { slug: "sesame-ball", name: "Sesame Ball", bg: "#F8F5FB", glow: "rgba(167, 139, 250, 0.12)", spotlightGlow: "rgba(167, 139, 250, 0.20)", accent: "#8B5CF6" },
  { slug: "tapioca-chips", name: "Tapioca Chips", bg: "#F6F8FA", glow: "rgba(56, 189, 248, 0.12)", spotlightGlow: "rgba(56, 189, 248, 0.18)", accent: "#0284C7" },
  { slug: "tomato-murukku", name: "Tomato Murukku", bg: "#FAF2F4", glow: "rgba(225, 63, 94, 0.12)", spotlightGlow: "rgba(244, 85, 115, 0.20)", accent: "#C46227" },
];

const anatomyProducts = products.map((p, idx) => ({
  slug: p.slug,
  name: p.name,
  description: p.description,
  image: p.image,
  ingredients: p.ingredients,
  nutrition: {
    calories: p.nutrition.calories,
    fat: p.nutrition.fat,
    carbs: p.nutrition.carbs,
    protein: p.nutrition.protein,
  },
  theme: flavourThemes[idx] || flavourThemes[0],
  themeLight: flavourThemesLight[idx] || flavourThemesLight[0],
}));

export default function FlavourTextureScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage3dRef = useRef<HTMLDivElement>(null);
  const packRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightGlowRef = useRef<HTMLDivElement>(null);
  const bgAmbientRef = useRef<HTMLDivElement>(null);

  const leftContentRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);

  // Default active product index (Tapioca Sticks / Tapioca Chips is at index 13)
  const defaultTapiocaIndex = anatomyProducts.findIndex((p) => p.slug === "tapioca-chips");
  const [activeFlavourIndex, setActiveFlavourIndex] = useState(defaultTapiocaIndex >= 0 ? defaultTapiocaIndex : 0);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 1024px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 1024px)");
    const onMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileMq.addEventListener("change", onMobileChange);
    return () => mobileMq.removeEventListener("change", onMobileChange);
  }, []);

  // 3D Mouse Parallax Effect
  useEffect(() => {
    if (isMobile) return; // Disable on mobile for performance and UX
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!stage3dRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      gsap.to(stage3dRef.current, {
        rotationY: x * 15,
        rotationX: -y * 15,
        x: x * -20,
        y: y * -20,
        transformPerspective: 1400,
        transformOrigin: "center center",
        duration: 1.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Slide Rotation & Scroll-Driven Center Spotlight Engine
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const N = anatomyProducts.length; // 15 authentic packets

      const renderSlideLayout = (progress: number) => {
        const currentStep = progress * (N - 1);
        const activeIdx = Math.min(Math.max(Math.round(currentStep), 0), N - 1);
        setActiveFlavourIndex(activeIdx);

        const isLight = document.documentElement.getAttribute("data-theme") === "light";
        const prod = anatomyProducts[activeIdx];
        const currentTheme = isLight ? (prod?.themeLight || flavourThemesLight[0]) : (prod?.theme || flavourThemes[0]);

        if (container) {
          container.style.backgroundColor = currentTheme.bg;
        }
        if (bgAmbientRef.current) {
          bgAmbientRef.current.style.background = `radial-gradient(ellipse at 50% 50%, ${currentTheme.glow} 0%, transparent 68%)`;
        }
        if (spotlightGlowRef.current) {
          spotlightGlowRef.current.style.background = `radial-gradient(circle at center, ${currentTheme.spotlightGlow} 0%, transparent 70%)`;
        }

        // Horizontal slide distance between items
        const rx = isMobile ? 220 : 420;

        anatomyProducts.forEach((_, i) => {
          const el = packRefs.current[i];
          if (!el) return;

          const stepDelta = i - currentStep;
          const absStepDelta = Math.abs(stepDelta);

          // Horizontal translation
          const x = stepDelta * rx;
          const y = isMobile ? 10 : 20;

          // Smooth focus scale for the center active item
          const focusT = Math.max(0, 1 - absStepDelta);
          const s = focusT * focusT * (3 - 2 * focusT); 

          const activeScale = isMobile ? 1.05 : 1.30;
          const inactiveScale = isMobile ? 0.70 : 0.80;
          const scale = inactiveScale + (activeScale - inactiveScale) * s;

          // Opacity falls off for items further away from center
          const opacity = Math.max(0, 1 - absStepDelta * 0.55);

          const rotZ = stepDelta * 2; // Slight natural tilt based on position

          const shadowBlur = Math.round(15 + s * 40);
          const shadowSpread = Math.round(8 + s * 20);
          const shadowAlpha = 0.2 + s * 0.25;
          const brightness = 0.5 + s * 0.5;

          const zIndex = 50 - Math.round(absStepDelta * 10);

          el.style.opacity = `${opacity}`;
          el.style.zIndex = `${zIndex}`;
          el.style.transform = `translate3d(${x}px, ${y}px, 0px) rotateZ(${rotZ}deg) scale(${scale})`;
          el.style.filter = `brightness(${brightness}) drop-shadow(0 ${shadowSpread}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha}))`;
          el.style.pointerEvents = s > 0.4 ? "auto" : "none";
        });
      };

      // Entrance animations
      if (leftContentRef.current) {
        gsap.fromTo(
          leftContentRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
            },
          }
        );
      }

      if (infoCardRef.current) {
        gsap.fromTo(
          infoCardRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
            },
          }
        );
      }

      // Initial render pass
      renderSlideLayout(0);

      // ScrollTrigger locking scroll to smooth slide interaction
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${N * 90}%`,
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        onUpdate: (self) => {
          renderSlideLayout(self.progress);
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isMobile]);

  const activeProduct = anatomyProducts[activeFlavourIndex] || anatomyProducts[0];

  const handlePrev = useCallback(() => {
    setActiveFlavourIndex((prev) => (prev > 0 ? prev - 1 : anatomyProducts.length - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveFlavourIndex((prev) => (prev < anatomyProducts.length - 1 ? prev + 1 : 0));
  }, []);

  return (
    <section
      ref={containerRef}
      id="flavours"
      className="min-h-screen w-full relative bg-[var(--background)] overflow-hidden text-[var(--text-primary)] select-none transition-colors duration-500 ease-out flex flex-col justify-center items-center py-20 lg:py-0"
      aria-label="La Crispo Anatomy of the Crunch"
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        ref={bgAmbientRef}
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out will-change-transform opacity-70"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${activeProduct.theme.glow} 0%, transparent 68%)`,
        }}
      />

      {/* Atmospheric Daylight Gradients & Vignettes */}
      <div className="absolute inset-0 pointer-events-none opacity-0 [data-theme='dark']_:opacity-100 bg-[radial-gradient(circle_at_50%_50%,transparent_35%,rgba(5,6,8,0.7)_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-0 [data-theme='light']_:opacity-100 bg-[radial-gradient(circle_at_50%_50%,transparent_45%,rgba(235,225,215,0.4)_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[var(--background)]/60 to-transparent pointer-events-none z-2" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--background)]/60 to-transparent pointer-events-none z-2" />

      {/* Delicate Blurred Botanical Silhouettes */}
      <div className="absolute top-12 left-8 w-64 h-64 bg-[#C46227]/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 right-12 w-80 h-80 bg-[#AC6F1E]/06 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Slide Guide Line */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[1px] bg-white/5 [data-theme='light']_:bg-black/5 pointer-events-none opacity-50" 
      />

      {/* Central Spotlight Glow Behind the Active Hero Packet */}
      <div
        ref={spotlightGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[420px] md:w-[480px] h-[280px] sm:h-[420px] md:h-[480px] rounded-full blur-[80px] pointer-events-none transition-all duration-700 ease-out will-change-transform z-0"
        style={{
          background: `radial-gradient(circle at center, ${activeProduct.theme.spotlightGlow} 0%, transparent 70%)`,
        }}
      />

      <Particles count={40} layer="background" className="z-0 opacity-70" />

      {/* ================= TOP SECTION HEADER ================= */}
      <div className="absolute top-10 sm:top-14 lg:top-16 left-0 right-0 z-30 flex flex-col items-center text-center px-6 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-glass-solid)] backdrop-blur-md border border-[var(--border)] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[var(--accent-gold)] shadow-[var(--shadow-sm)] mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
          <span>15 FLAVOURS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif italic tracking-tight leading-tight mb-3 bg-gradient-to-r from-[var(--text-primary)] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
          Anatomy of the Crunch
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] font-normal max-w-sm sm:max-w-md">
          Different flavours. A common love. Crafted for every craving.
        </p>
      </div>

      {/* ================= MAIN VISUAL LAYOUT (LEFT CARD + SLIDER + RIGHT CARD) ================= */}
      <div className="relative z-10 w-full h-full max-w-[1500px] mx-auto flex items-center justify-center">
        
        {/* LEFT DYNAMIC PRODUCT DESCRIPTION CARD */}
        <div
          ref={leftContentRef}
          className="hidden md:flex absolute left-6 lg:left-24 xl:left-32 bottom-24 lg:bottom-28 z-30 flex-col items-start pointer-events-auto"
        >
          <div className="w-[260px] lg:w-[320px] p-6 lg:p-8 rounded-3xl bg-black/10 [data-theme='light']_:bg-white/40 backdrop-blur-3xl border border-white/10 [data-theme='light']_:border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col gap-3 transition-all duration-500 overflow-hidden relative group">
            {/* Subtle inner highlight */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col gap-3">
              <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[var(--text-primary)] opacity-60 font-bold">
                Signature Product
              </span>
              <h3 className="text-3xl lg:text-4xl font-serif italic text-[var(--text-primary)] font-bold tracking-tight leading-tight">
                {activeProduct.name}
              </h3>
              <div className="w-12 h-[1px] bg-gradient-to-r from-[var(--text-primary)] to-transparent opacity-30 mt-1 mb-2" />
              <p className="text-[13px] lg:text-sm text-[var(--text-primary)] opacity-80 leading-relaxed font-light">
                {activeProduct.description}
              </p>
            </div>
          </div>
        </div>

        {/* CENTER PRODUCT LINEUP SLIDER */}
        <div className="relative flex-1 flex flex-col items-center justify-center my-auto min-h-[360px] sm:min-h-[440px] md:min-h-[500px]">
          <div
            ref={stage3dRef}
            className="relative w-[200px] h-[300px] sm:w-[240px] sm:h-[360px] md:w-[280px] md:h-[420px] flex items-center justify-center z-10 will-change-transform mt-4"
            style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
          >
            {anatomyProducts.map((prod, idx) => (
              <div
                key={prod.slug}
                ref={(el) => {
                  packRefs.current[idx] = el;
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform transition-opacity duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Link href={`/products/${prod.slug}`} className="relative w-full h-full flex items-center justify-center pointer-events-auto cursor-pointer group">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:brightness-110 transition-all duration-300"
                    sizes="(max-width: 768px) 260px, (max-width: 1200px) 380px, 440px"
                    priority={idx < 4}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT NUTRITION & INGREDIENTS CARD */}
        <div
          ref={infoCardRef}
          className="hidden md:flex absolute right-6 lg:right-24 xl:right-32 bottom-24 lg:bottom-28 z-30 flex-col items-end pointer-events-auto"
        >
          <div className="w-[260px] lg:w-[320px] p-6 lg:p-8 rounded-3xl bg-black/10 [data-theme='light']_:bg-white/40 backdrop-blur-3xl border border-white/10 [data-theme='light']_:border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col gap-5 transition-all duration-500 overflow-hidden relative group">
            {/* Subtle inner highlight */}
            <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent opacity-50 pointer-events-none group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col gap-5 w-full">
              {/* Top Navigation Row */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 [data-theme='light']_:border-black/5">
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[var(--text-primary)] opacity-60 font-bold">
                  <span className="text-[var(--text-primary)] opacity-100">{String(activeFlavourIndex + 1).padStart(2, "0")}</span> / 15
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    type="button"
                    className="w-8 h-8 rounded-full bg-white/5 [data-theme='light']_:bg-black/5 hover:bg-white/10 [data-theme='light']_:hover:bg-black/10 border border-white/10 [data-theme='light']_:border-black/5 flex items-center justify-center text-xs text-[var(--text-primary)] transition-all cursor-pointer hover:scale-105 active:scale-95"
                    aria-label="Previous Flavour"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    type="button"
                    className="w-8 h-8 rounded-full bg-white/5 [data-theme='light']_:bg-black/5 hover:bg-white/10 [data-theme='light']_:hover:bg-black/10 border border-white/10 [data-theme='light']_:border-black/5 flex items-center justify-center text-xs text-[var(--text-primary)] transition-all cursor-pointer hover:scale-105 active:scale-95"
                    aria-label="Next Flavour"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Product Ingredients Section */}
              <div>
                <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-[var(--text-primary)] opacity-60 font-bold block mb-2">
                  Ingredients
                </span>
                <p className="text-xs lg:text-[13px] text-[var(--text-primary)] opacity-80 font-light leading-relaxed">
                  {activeProduct.ingredients.join(", ")}
                </p>
              </div>

              {/* Nutrition Information Grid */}
              <div className="pt-1">
                <span className="text-[9px] uppercase font-mono tracking-[0.2em] text-[var(--text-primary)] opacity-60 font-bold block mb-3">
                  Nutrition (Per Serving)
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: "Kcal", value: activeProduct.nutrition.calories },
                    { label: "Fat", value: activeProduct.nutrition.fat },
                    { label: "Carbs", value: activeProduct.nutrition.carbs },
                    { label: "Prot", value: activeProduct.nutrition.protein },
                  ].map((nut) => (
                    <div key={nut.label} className="py-2.5 px-1 rounded-xl bg-white/5 [data-theme='light']_:bg-black/5 border border-white/10 [data-theme='light']_:border-black/5 flex flex-col items-center justify-center hover:bg-white/10 [data-theme='light']_:hover:bg-black/10 transition-colors">
                      <span className="block text-[13px] font-bold text-[var(--text-primary)] font-mono">{nut.value}</span>
                      <span className="block text-[8px] uppercase font-mono text-[var(--text-primary)] opacity-50 mt-1">{nut.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE FALLBACK INFO STACK (Visible only on small screens below sliding track) */}
        <div className="md:hidden absolute bottom-24 left-6 right-6 flex flex-col gap-3 items-center text-center z-30 pointer-events-none">
           <h3 className="text-2xl font-serif italic text-[var(--text-primary)] font-bold tracking-tight">
              {activeProduct.name}
           </h3>
           <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-[280px]">
             {activeProduct.description}
           </p>
        </div>

      </div>

      {/* ================= BOTTOM CTA BUTTONS ================= */}
      <div className="absolute bottom-6 sm:bottom-10 lg:bottom-12 left-0 right-0 z-30 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-none">
        <Link 
          href="/products" 
          className="pointer-events-auto px-6 py-3 rounded-full bg-[var(--surface-elevated)] hover:bg-[var(--accent-gold)] text-[var(--accent-gold)] hover:text-black border border-[var(--accent-gold)] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-3 group"
        >
          <span>VIEW ALL 15 FLAVOURS</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        <button 
          onClick={() => {
            document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="pointer-events-auto px-6 py-3 rounded-full bg-white/5 [data-theme='light']_:bg-black/5 backdrop-blur-md hover:bg-white/10 [data-theme='light']_:hover:bg-black/10 text-[var(--text-primary)] border border-white/10 [data-theme='light']_:border-black/5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-3 group"
        >
          <span>FEATURED PRODUCTS</span>
          <span className="group-hover:translate-y-1 transition-transform">↓</span>
        </button>
      </div>

      <Particles count={15} layer="foreground" className="z-[50] pointer-events-none opacity-40 mix-blend-screen [data-theme='light']_:mix-blend-multiply" />
    </section>
  );
}
