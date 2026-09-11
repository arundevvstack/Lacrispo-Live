"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, Product } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

const getProductTint = (slug: string) => {
  if (slug.includes("banana") || slug.includes("dal") || slug.includes("tapioca")) {
    return "var(--tint-yellow)";
  }
  if (slug.includes("garlic") || slug.includes("murukku") || slug.includes("mixture") || slug.includes("andhra")) {
    return "var(--tint-pink)";
  }
  if (slug.includes("tomato") || slug.includes("chili") || slug.includes("pepper") || slug.includes("chilli")) {
    return "var(--tint-orange)";
  }
  if (slug.includes("jackfruit") || slug.includes("salt") || slug.includes("peanut")) {
    return "var(--tint-blue)";
  }
  return "var(--tint-green)";
};

export default function SpatialProductCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mouseTilt, setMouseTilt] = useState<{ [key: string]: { x: number; y: number } }>({});

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

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      if (isMobile) {
        return;
      }

      const getScrollAmount = () => {
        return -(track.scrollWidth - window.innerWidth + 120);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount()) * 1.05}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              products.length - 1,
              Math.floor(self.progress * products.length)
            );
            setActiveIndex(idx);
          },
        },
      });

      return () => {
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mouse tilt for desktop spatial cards (restrained subtle spatial depth)
  const handleMouseMove = (slug: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || isReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
    setMouseTilt((prev) => ({ ...prev, [slug]: { x, y } }));
  };

  const handleMouseLeave = (slug: string) => {
    setMouseTilt((prev) => ({ ...prev, [slug]: { x: 0, y: 0 } }));
  };

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] relative overflow-hidden flex flex-col justify-between border-t border-[var(--border)]"
      aria-label="La Crispo 15-Flavor Spatial Product Collection"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(229,168,85,0.08),transparent_70%)] pointer-events-none rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,111,50,0.07),transparent_70%)] pointer-events-none rounded-full blur-[120px]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(199,203,209,0.05),transparent_70%)]" />

      {/* Section Top Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-16 sm:pt-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
        <div>
          <span className="text-[var(--accent-gold)] text-xs uppercase tracking-[0.3em] font-mono font-bold block mb-2 px-3 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] w-max">
            Exclusive Lineup
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic tracking-tight bg-gradient-to-r from-[var(--text-primary)] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
            Spatial Collection
          </h2>
        </div>

        {/* Status Indicator, Progress Bar, and Catalog Link */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-end gap-1.5 font-mono text-xs text-[var(--text-muted)] font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-[var(--accent-gold)] font-bold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(products.length).padStart(2, "0")} Flavours</span>
            </div>
            
            {/* Visual Mini Progress Bar */}
            <div className="w-28 h-1 bg-[var(--border)] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[var(--accent-gold)] to-[#E5A855] transition-all duration-300 rounded-full"
                style={{ width: `${((activeIndex + 1) / products.length) * 100}%` }}
              />
            </div>
          </div>

          <Link
            href="/products"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E5A855] to-[#C96F32] text-[#0B0C0E] font-mono font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_4px_15px_rgba(229,168,85,0.25)] hover:from-white hover:to-[#EAD0A1] hover:scale-105 active:scale-95"
          >
            Catalog View
          </Link>
        </div>
      </div>

      {/* Spatial Horizontal Carousel Track with Left/Right Scroll Container */}
      <div 
        ref={trackContainerRef}
        className="w-full relative my-auto py-8 sm:py-12 overflow-x-auto scroll-smooth no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div
          ref={trackRef}
          className="flex items-center gap-6 sm:gap-10 px-6 sm:px-14 w-max"
          style={{ perspective: "1200px" }}
        >
          {products.map((product: Product, index: number) => {
            const tilt = mouseTilt[product.slug] || { x: 0, y: 0 };
            const isAlternate = index % 2 === 1;

            return (
              <div
                key={product.slug}
                onMouseMove={(e) => handleMouseMove(product.slug, e)}
                onMouseLeave={() => handleMouseLeave(product.slug)}
                className={`group relative flex-shrink-0 w-[240px] sm:w-[270px] md:w-[295px] rounded-[2rem] bg-[var(--surface-card)] border border-[var(--border)] p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 shadow-[var(--shadow-card)] hover:border-[var(--accent-gold)]/50 hover:shadow-[0_20px_45px_rgba(60,45,30,0.08)] ${
                  isAlternate ? "sm:translate-y-2" : "sm:-translate-y-2"
                }`}
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Dynamic Ambient Glow Behind Card */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 bg-[var(--accent-gold)]/10 rounded-full blur-2xl group-hover:opacity-100 opacity-30 transition-opacity duration-500 pointer-events-none" />

                {/* Top Card Badge */}
                <div className="flex items-center justify-between w-full mb-2 relative z-10">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--accent-gold)] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-[var(--accent-gold)] font-bold">
                    <span>★</span>
                    <span className="text-[var(--text-primary)]">{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Tactile Pack Visual with Centered Floating Perspective Effect */}
                <div 
                  className="relative w-full h-44 sm:h-48 md:h-52 rounded-2xl flex items-center justify-center my-auto mx-auto overflow-hidden transition-all duration-500"
                  style={{
                    backgroundColor: getProductTint(product.slug),
                  }}
                >
                  {/* Subtle Center Aura Glow */}
                  <div
                    className={`absolute inset-3 rounded-full blur-xl opacity-35 group-hover:opacity-65 transition-opacity duration-500 bg-gradient-to-tr ${
                      product.color || "from-[var(--accent-gold)]/20 to-[var(--accent-warm)]/15"
                    }`}
                  />

                  {/* 3D Floating Packet */}
                  <div 
                    className="relative w-full h-[88%] transform transition-transform duration-300 ease-out group-hover:scale-108 group-hover:-translate-y-1.5 will-change-transform flex items-center justify-center z-10"
                    style={{
                      transform: `translateZ(12px) rotateY(${tilt.x * 0.4}deg) rotateX(${tilt.y * 0.4}deg)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain object-center drop-shadow-[0_14px_24px_rgba(40,25,15,0.22)]"
                      sizes="(max-width: 768px) 200px, 260px"
                      priority={index < 3}
                    />
                  </div>
                </div>

                {/* Product Meta & Description */}
                <div className="mt-3 flex flex-col gap-2 relative z-10">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg sm:text-xl font-serif italic text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors duration-300 leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-[11px] text-[var(--text-secondary)] font-normal line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Ingredients Preview Tag */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[8px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-secondary)] font-mono font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  {/* Direct Route CTA Button */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-3 w-full text-center py-2.5 rounded-full bg-gradient-to-r from-[#E5A855] to-[#C96F32] text-[#0B0C0E] font-mono font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_4px_15px_rgba(229,168,85,0.25)] hover:from-white hover:to-[#EAD0A1] hover:scale-[1.02] active:scale-95 block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Direction Bar */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pb-8 pt-4 flex items-center justify-between border-t border-[var(--border)] text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[var(--text-muted)] font-semibold">
        <div className="flex items-center gap-3">
          <span>Crafted in small batches</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="text-[var(--accent-gold)]">15 Regional Flavours</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 text-[var(--text-secondary)]">
          <span>Scroll horizontally to explore</span>
          <span className="text-[var(--accent-gold)]">→</span>
        </div>
      </div>
    </section>
  );
}

