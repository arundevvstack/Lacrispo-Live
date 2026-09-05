"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

// Flavor Themes matching the 15 signature products
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

const anatomyProducts = products.map((p, idx) => ({
  slug: p.slug,
  name: p.name,
  image: p.image,
  botanical: p.ingredients.slice(0, 3).join(", "),
  nutrition: {
    calories: p.nutrition.calories,
    fat: p.nutrition.fat,
    protein: p.nutrition.protein,
  },
  theme: flavourThemes[idx] || flavourThemes[0],
}));

export default function FlavourTextureScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage3dRef = useRef<HTMLDivElement>(null);
  const packRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightGlowRef = useRef<HTMLDivElement>(null);
  const bgAmbientRef = useRef<HTMLDivElement>(null);

  const headingGroupRef = useRef<HTMLDivElement>(null);
  const ingredientNodesRef = useRef<HTMLDivElement>(null);

  const [activeFlavourIndex, setActiveFlavourIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 768px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mobileMq = window.matchMedia("(max-width: 768px)");
    const onMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mobileMq.addEventListener("change", onMobileChange);
    return () => mobileMq.removeEventListener("change", onMobileChange);
  }, []);

  // 3D Circular Ring Rotation & Scroll-Driven Center Spotlight Engine
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const N = anatomyProducts.length; // 15 packets
      const STEP_DEG = 360 / N; // 24 degrees per step

      // Function to position all 15 packets along the 3D circular ring and interpolate active packet to spotlight
      const renderRingLayout = (progress: number) => {
        // Continuous step from 0 to N - 1
        const currentStep = progress * (N - 1);
        const activeIdx = Math.min(Math.max(Math.round(currentStep), 0), N - 1);
        setActiveFlavourIndex(activeIdx);

        // Dynamic theme background & spotlight glow interpolation
        const currentTheme = anatomyProducts[activeIdx]?.theme || flavourThemes[0];
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
        const rx = isMobile ? 180 : 380; // Horizontal circle radius
        const ry = isMobile ? 65 : 120;  // Vertical perspective radius (tilted ellipse)
        const rz = isMobile ? 120 : 220; // 3D depth radius

        anatomyProducts.forEach((_, i) => {
          const el = packRefs.current[i];
          if (!el) return;

          // Angular difference in steps from current scroll position
          const stepDelta = i - currentStep;
          const absStepDelta = Math.abs(stepDelta);

          // Angle on the 360 ring (24 deg per packet)
          const angleDeg = stepDelta * STEP_DEG;
          const angleRad = (angleDeg * Math.PI) / 180;

          // Ring 3D coordinates
          const xRing = rx * Math.sin(angleRad);
          const yRing = -ry * Math.cos(angleRad) + (isMobile ? 10 : 20);
          const zRing = -rz * (1 - Math.cos(angleRad));

          // Active focus transition: when close to center (absStepDelta < 1.0)
          // Smooth transition from ring position into center spotlight (0, 0, 0)
          const focusT = Math.max(0, 1 - absStepDelta);
          // Smoothstep curve for silky fluid glide
          const s = focusT * focusT * (3 - 2 * focusT);

          // Interpolated 3D coordinates
          const x = xRing * (1 - s);
          const y = yRing * (1 - s);
          const z = zRing * (1 - s) + (isMobile ? 40 : 80) * s;

          // Scale: 14 outer ring packets are smaller (0.46x - 0.52x), center active scales cleanly (1.22x)
          const ringScale = isMobile ? 0.42 : 0.50;
          const activeScale = isMobile ? 1.05 : 1.22;
          const scale = ringScale * (1 - s) + activeScale * s;

          // Opacity: outer ring packets semi-transparent (0.40 - 0.65), active center full opacity (1.0)
          const depthFactor = (Math.cos(angleRad) + 1) / 2; // 1 at front, 0 at back
          const ringOpacity = 0.35 + depthFactor * 0.35;
          const opacity = ringOpacity * (1 - s) + 1.0 * s;

          // Angle alignment along the curve of the circle
          const rotY = (angleDeg * 0.42) * (1 - s);
          const rotZ = (Math.sin(angleRad) * -7) * (1 - s);

          // Realistic shadow & spotlight glow
          const shadowBlur = Math.round(15 + s * 40);
          const shadowSpread = Math.round(8 + s * 20);
          const shadowAlpha = 0.5 + s * 0.45;
          const brightness = 0.75 + s * 0.45;

          // Z-index: Active packet always on top
          const zIndex = s > 0.35 ? 50 : Math.round(10 + depthFactor * 20);

          el.style.opacity = `${opacity}`;
          el.style.zIndex = `${zIndex}`;
          el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`;
          el.style.filter = `brightness(${brightness}) drop-shadow(0 ${shadowSpread}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha}))`;
          el.style.pointerEvents = s > 0.4 ? "auto" : "none";
        });
      };

      // Header entrance animation
      gsap.fromTo(
        headingGroupRef.current,
        { opacity: 0, y: -25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          },
        }
      );

      // Ingredient Card Entrance
      if (ingredientNodesRef.current) {
        gsap.fromTo(
          ingredientNodesRef.current,
          { opacity: 0, scale: 0.96, y: 15 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
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
        end: `+=${N * 95}%`, // Responsive balanced scroll length
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

  const handleJumpToCollection = useCallback(() => {
    const el = document.getElementById("collection");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="flavours"
      className="h-screen w-full relative bg-[#140e04] overflow-hidden text-[#F2F2F0] select-none transition-colors duration-500 ease-out"
      aria-label="La Crispo Flavour and Texture Experience"
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        ref={bgAmbientRef}
        className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out will-change-transform opacity-70"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${activeProduct.theme.glow} 0%, transparent 68%)`,
        }}
      />

      {/* Dark Subtle Vignette Atmosphere & Smooth Scene Blending */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_35%,rgba(5,6,8,0.7)_100%)]" />
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0B0C0E]/60 to-transparent pointer-events-none z-2" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0B0C0E]/60 to-transparent pointer-events-none z-2" />

      {/* Decorative Circular Orbit Ring Guide Line */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[680px] md:w-[740px] h-[130px] sm:h-[230px] md:h-[250px] rounded-[50%] border border-white/10 pointer-events-none opacity-40 -rotate-3" 
        style={{ boxShadow: "0 0 40px rgba(255,255,255,0.03)" }}
      />

      {/* Central Spotlight Glow Behind the Active Middle Packet */}
      <div
        ref={spotlightGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[420px] md:w-[480px] h-[280px] sm:h-[420px] md:h-[480px] rounded-full blur-[80px] pointer-events-none transition-all duration-700 ease-out will-change-transform z-0"
        style={{
          background: `radial-gradient(circle at center, ${activeProduct.theme.spotlightGlow} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex flex-col justify-between">
        
        {/* Scene Header */}
        <div ref={headingGroupRef} className="pt-14 sm:pt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic tracking-tight bg-gradient-to-r from-[#F2F2F0] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
              Anatomy of the Crunch
            </h2>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#E5A855] block mt-1 sm:mt-2 font-bold">
              15 Flavours
            </span>
          </div>
        </div>

        {/* 3D Circular Ring Stage: All 15 Packets orbiting around the Central Spotlight */}
        <div className="relative flex-1 flex items-center justify-center my-auto">
          
          <div
            ref={stage3dRef}
            className="relative w-[180px] h-[270px] sm:w-[220px] sm:h-[330px] md:w-[260px] md:h-[390px] lg:w-[280px] lg:h-[420px] flex items-center justify-center z-10 will-change-transform"
            style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
          >
            {/* All 15 Lays Packets in 3D Circular Ring Orbit */}
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
                    className="object-contain"
                    sizes="(max-width: 768px) 260px, (max-width: 1200px) 380px, 440px"
                    priority={idx < 3}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Spacer for bottom breathing room */}
        <div className="h-6 sm:h-8" />

      </div>

      {/* Bottom Right Area: Active Focus Info Card + View Spatial Collection */}
      <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-12 md:right-16 z-30 pointer-events-auto flex flex-col items-end gap-5 sm:gap-7">
        {/* Spatial Information Card for Active Centered Product */}
        <div
          ref={ingredientNodesRef}
          className="w-[220px] sm:w-[250px] md:w-[270px] pointer-events-auto p-4 sm:p-5 rounded-2xl bg-[#181B20]/90 backdrop-blur-xl border border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.85)] flex flex-col gap-2.5 transition-all duration-500"
        >
          {/* Flavor Counter & Name */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#E5A855] font-mono font-bold">
                Active Flavour
              </span>
              <span className="font-mono text-[10px] text-[#A7ACB4]">
                {String(activeFlavourIndex + 1).padStart(2, "0")} / 15
              </span>
            </div>
            <p className="text-sm sm:text-base font-bold text-[#F2F2F0] transition-colors duration-300 leading-tight">
              {activeProduct.name}
            </p>
          </div>

          {/* Minimal Divider */}
          <div className="border-t border-white/10 my-0.5" />

          {/* Botanical Section */}
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C7CBD1] block font-mono font-bold mb-1">
              Ingredients
            </span>
            <p className="text-xs sm:text-sm text-[#D1D5DB] transition-colors duration-300 leading-snug">
              {activeProduct.botanical}
            </p>
          </div>

          {/* Minimal Divider */}
          <div className="border-t border-white/10 my-0.5" />

          {/* Nutrition Section */}
          <div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C7CBD1] block font-mono font-bold mb-1">
              Nutrition ({activeProduct.nutrition.calories} kcal)
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-[#E6E8EB] font-bold">
              <span>{activeProduct.nutrition.fat} Fat</span>
              <span className="text-[#858B94]">•</span>
              <span>{activeProduct.nutrition.protein} Prot</span>
            </div>
          </div>
        </div>

        {/* View Spatial Collection Button */}
        <button
          onClick={handleJumpToCollection}
          type="button"
          className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#14161A]/95 hover:bg-[#1C2026] border border-[#C7CBD1]/30 hover:border-[#E5A855] text-[#F2F2F0] hover:text-[#E5A855] text-xs font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.85)] group hover:scale-105 active:scale-95 backdrop-blur-xl cursor-pointer"
          aria-label="View Spatial Collection"
        >
          <span>View Spatial Collection</span>
          <span className="text-[#E5A855] group-hover:translate-y-1 transition-transform duration-300 font-bold">↓</span>
        </button>
      </div>
    </section>
  );
}
