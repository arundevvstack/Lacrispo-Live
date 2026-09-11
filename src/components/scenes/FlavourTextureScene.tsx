"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { products } from "@/data/products";

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

  // 3D Circular Ring Rotation & Scroll-Driven Center Spotlight Engine
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const N = anatomyProducts.length; // 15 authentic packets
      const STEP_DEG = 360 / N; // 24 degrees per step

      const renderRingLayout = (progress: number) => {
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

        // Geometry radii for the 3D circular ring orbit
        const rx = isMobile ? 160 : 340; // Horizontal circle radius
        const ry = isMobile ? 55 : 100;  // Vertical perspective radius
        const rz = isMobile ? 110 : 200; // 3D depth radius

        anatomyProducts.forEach((_, i) => {
          const el = packRefs.current[i];
          if (!el) return;

          const stepDelta = i - currentStep;
          const absStepDelta = Math.abs(stepDelta);

          const angleDeg = stepDelta * STEP_DEG;
          const angleRad = (angleDeg * Math.PI) / 180;

          const xRing = rx * Math.sin(angleRad);
          const yRing = -ry * Math.cos(angleRad) + (isMobile ? 10 : 15);
          const zRing = -rz * (1 - Math.cos(angleRad));

          const focusT = Math.max(0, 1 - absStepDelta);
          const s = focusT * focusT * (3 - 2 * focusT);

          const x = xRing * (1 - s);
          const y = yRing * (1 - s);
          const z = zRing * (1 - s) + (isMobile ? 35 : 75) * s;

          const ringScale = isMobile ? 0.40 : 0.48;
          const activeScale = isMobile ? 1.02 : 1.20;
          const scale = ringScale * (1 - s) + activeScale * s;

          const depthFactor = (Math.cos(angleRad) + 1) / 2;
          const ringOpacity = 0.35 + depthFactor * 0.35;
          const opacity = ringOpacity * (1 - s) + 1.0 * s;

          const rotY = (angleDeg * 0.40) * (1 - s);
          const rotZ = (Math.sin(angleRad) * -6) * (1 - s);

          const shadowBlur = Math.round(15 + s * 40);
          const shadowSpread = Math.round(8 + s * 20);
          const shadowAlpha = 0.4 + s * 0.45;
          const brightness = 0.8 + s * 0.35;

          const zIndex = s > 0.35 ? 50 : Math.round(10 + depthFactor * 20);

          el.style.opacity = `${opacity}`;
          el.style.zIndex = `${zIndex}`;
          el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
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
      renderRingLayout(0);

      // ScrollTrigger locking scroll to smooth 3D circular ring rotation
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: `+=${N * 90}%`,
        pin: true,
        scrub: 0.9,
        anticipatePin: 1,
        onUpdate: (self) => {
          renderRingLayout(self.progress);
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
      className="min-h-screen w-full relative bg-[var(--background)] overflow-hidden text-[var(--text-primary)] select-none transition-colors duration-500 ease-out flex items-center justify-center py-20 lg:py-0"
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

      {/* Decorative Circular Orbit Ring Guide Line */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] md:w-[740px] h-[130px] sm:h-[230px] md:h-[250px] rounded-[50%] border border-white/10 [data-theme='light']_:border-[var(--border-strong)] pointer-events-none opacity-30 -rotate-3" 
        style={{ boxShadow: "0 0 40px rgba(229,168,85,0.04)" }}
      />

      {/* Central Spotlight Glow Behind the Active Hero Packet */}
      <div
        ref={spotlightGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[420px] md:w-[480px] h-[280px] sm:h-[420px] md:h-[480px] rounded-full blur-[80px] pointer-events-none transition-all duration-700 ease-out will-change-transform z-0"
        style={{
          background: `radial-gradient(circle at center, ${activeProduct.theme.spotlightGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Main Visual Layout */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-between py-12 sm:py-16">
        
        {/* ================= TOP-LEFT HEADER CONTENT AREA ================= */}
        <div
          ref={leftContentRef}
          className="lg:absolute lg:top-14 xl:lg:top-16 lg:left-10 xl:lg:left-14 max-w-md sm:max-w-lg lg:max-w-xl flex flex-col justify-start text-left z-20 pt-4 lg:pt-0"
        >
          
          {/* 15 FLAVOURS Label Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-[var(--accent-gold)] shadow-sm mb-3 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
            <span>15 FLAVOURS</span>
          </div>

          {/* Large Editorial Heading at Top - Matching Spatial Collection Color Gradient */}
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif italic tracking-tight leading-tight mb-3 whitespace-nowrap bg-gradient-to-r from-[var(--text-primary)] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
            Anatomy of the Crunch
          </h2>

          {/* Supporting Text Description at Top */}
          <p className="text-xs sm:text-sm md:text-base text-[var(--text-secondary)] font-normal leading-relaxed max-w-sm sm:max-w-md mb-2">
            Different flavours. A common love. Crafted for every craving.
          </p>

          {/* Three Benefit Items Stacked Vertically - Larger & Positioned Further Down */}
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 lg:mt-10">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--accent-gold)] text-xs sm:text-sm font-mono font-bold shadow-sm shrink-0">
                01
              </div>
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] leading-snug">
                  PREMIUM
                </p>
                <p className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-[var(--text-secondary)] uppercase">
                  INGREDIENTS
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--accent-gold)] text-xs sm:text-sm font-mono font-bold shadow-sm shrink-0">
                02
              </div>
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] leading-snug">
                  AUTHENTIC TASTE
                </p>
                <p className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-[var(--text-secondary)] uppercase">
                  EVERYTIME
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--surface-secondary)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--accent-gold)] text-xs sm:text-sm font-mono font-bold shadow-sm shrink-0">
                03
              </div>
              <div className="flex flex-col">
                <p className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] leading-snug">
                  SNACKING
                </p>
                <p className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-[var(--text-secondary)] uppercase">
                  HAPPIER LIVES
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ================= CENTER PRODUCT LINEUP PRESENTATION ================= */}
        <div className="relative flex-1 flex flex-col items-center justify-center my-auto min-h-[360px] sm:min-h-[440px] md:min-h-[500px]">
          
          {/* 3D Circular Ring Stage: All 15 Authentic Packets orbiting around the Central Hero Packet */}
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
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain drop-shadow-[0_16px_30px_rgba(0,0,0,0.35)]"
                    sizes="(max-width: 768px) 260px, (max-width: 1200px) 380px, 440px"
                    priority={idx < 4}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* ================= RIGHT INFORMATION CARD & SEPARATE BUTTON DOWN (Positioned closer to packets) ================= */}
      <div
        ref={infoCardRef}
        className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 right-8 sm:right-14 md:right-20 lg:right-28 xl:right-36 z-30 flex flex-col items-end gap-2 pointer-events-auto"
      >
        {/* Small Sized Information Box at Right End */}
        <div className="w-[230px] sm:w-[250px] md:w-[260px] p-3.5 sm:p-4 rounded-2xl bg-[var(--surface-glass-solid)] backdrop-blur-2xl border border-[var(--border-strong)] shadow-[var(--shadow-card)] flex flex-col gap-2 transition-all duration-500">
          
          {/* Top Navigation Row */}
          <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
            <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-[var(--accent-gold)] font-bold">
              {String(activeFlavourIndex + 1).padStart(2, "0")} / 15 FLAVOURS
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                type="button"
                className="w-6 h-6 rounded-full bg-[var(--surface-secondary)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-[10px] text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer active:scale-90"
                aria-label="Previous Flavour"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                type="button"
                className="w-6 h-6 rounded-full bg-[var(--surface-secondary)] hover:bg-[var(--surface-elevated)] border border-[var(--border)] flex items-center justify-center text-[10px] text-[var(--text-primary)] hover:text-[var(--accent-gold)] transition-colors cursor-pointer active:scale-90"
                aria-label="Next Flavour"
              >
                →
              </button>
            </div>
          </div>

          {/* Product Title */}
          <div>
            <h3 className="text-base sm:text-lg font-serif italic text-[var(--text-primary)] font-bold tracking-tight leading-tight">
              {activeProduct.name}
            </h3>
          </div>

          {/* Product Ingredients Section */}
          <div className="border-t border-[var(--border-subtle)] pt-1.5">
            <span className="text-[8px] uppercase font-mono tracking-[0.2em] text-[var(--text-muted)] font-bold block mb-0.5">
              Ingredients
            </span>
            <p className="text-[11px] text-[var(--text-secondary)] leading-snug line-clamp-2">
              {activeProduct.ingredients.join(", ")}
            </p>
          </div>

          {/* Nutrition Information Grid */}
          <div className="pt-1.5 border-t border-[var(--border-subtle)]">
            <span className="text-[8px] uppercase font-mono tracking-[0.2em] text-[var(--text-muted)] font-bold block mb-1">
              Nutrition (Per Serving)
            </span>
            <div className="grid grid-cols-4 gap-1 text-center">
              <div className="p-1 rounded-md bg-[var(--surface-secondary)] border border-[var(--border)]">
                <span className="block text-[11px] font-bold text-[var(--text-primary)] font-mono">{activeProduct.nutrition.calories}</span>
                <span className="block text-[7px] uppercase font-mono text-[var(--text-muted)]">Kcal</span>
              </div>
              <div className="p-1 rounded-md bg-[var(--surface-secondary)] border border-[var(--border)]">
                <span className="block text-[11px] font-bold text-[var(--text-primary)] font-mono">{activeProduct.nutrition.fat}</span>
                <span className="block text-[7px] uppercase font-mono text-[var(--text-muted)]">Fat</span>
              </div>
              <div className="p-1 rounded-md bg-[var(--surface-secondary)] border border-[var(--border)]">
                <span className="block text-[11px] font-bold text-[var(--text-primary)] font-mono">{activeProduct.nutrition.carbs}</span>
                <span className="block text-[7px] uppercase font-mono text-[var(--text-muted)]">Carbs</span>
              </div>
              <div className="p-1 rounded-md bg-[var(--surface-secondary)] border border-[var(--border)]">
                <span className="block text-[11px] font-bold text-[var(--text-primary)] font-mono">{activeProduct.nutrition.protein}</span>
                <span className="block text-[7px] uppercase font-mono text-[var(--text-muted)]">Prot</span>
              </div>
            </div>
          </div>

        </div>

        {/* Separate Button Down */}
        <Link
          href="/products"
          className="w-[230px] sm:w-[250px] md:w-[260px] py-2 px-4 rounded-full bg-gradient-to-r from-[#E5A855] to-[#C96F32] text-[#0B0C0E] font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.2em] shadow-[0_4px_15px_rgba(229,168,85,0.25)] hover:from-white hover:to-[#EAD0A1] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-1.5 font-mono group text-center"
        >
          <span>VIEW ALL 15 FLAVOURS</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>

      </div>
    </section>
  );
}
