"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products, Product } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

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
      className="min-h-screen bg-[#0A0C0F] text-[#F2F2F0] relative overflow-hidden flex flex-col justify-between border-t border-[#C7CBD1]/15"
      aria-label="La Crispo 15-Flavor Spatial Product Collection"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(229,168,85,0.08),transparent_70%)] pointer-events-none rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,111,50,0.07),transparent_70%)] pointer-events-none rounded-full blur-[120px]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(199,203,209,0.05),transparent_70%)]" />

      {/* Section Top Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-16 sm:pt-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
        <div>
          <span className="text-[#EAD0A1] text-xs uppercase tracking-[0.3em] font-mono font-bold block mb-2 px-3 py-1 rounded-full bg-white/5 border border-[#EAD0A1]/30 w-max">
            Exclusive Lineup
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic tracking-tight bg-gradient-to-r from-[#F2F2F0] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
            Spatial Collection
          </h2>
        </div>

        {/* Status Indicator, Progress Bar, and Catalog Link */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-end gap-1.5 font-mono text-xs text-[#858B94] font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-[#EAD0A1] font-bold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(products.length).padStart(2, "0")} Flavours</span>
            </div>
            
            {/* Visual Mini Progress Bar */}
            <div className="w-28 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#EAD0A1] to-[#E5A855] transition-all duration-300 rounded-full"
                style={{ width: `${((activeIndex + 1) / products.length) * 100}%` }}
              />
            </div>
          </div>

          <Link
            href="/products"
            className="px-6 py-2.5 rounded-full border border-[#EAD0A1]/40 bg-gradient-to-r from-[#181B20] to-[#111317] text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#F2F2F0] hover:text-[#0B0C0E] hover:from-[#EAD0A1] hover:to-[#E5A855] hover:border-[#EAD0A1] transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.6)] hover:scale-105"
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
                className={`group relative flex-shrink-0 w-[240px] sm:w-[270px] md:w-[295px] rounded-[2rem] bg-gradient-to-b from-[#181B20]/95 via-[#14161B]/95 to-[#0E1013]/95 border border-white/15 p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:border-[#EAD0A1]/60 hover:shadow-[0_25px_55px_rgba(234,208,161,0.15)] ${
                  isAlternate ? "sm:translate-y-2" : "sm:-translate-y-2"
                }`}
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Dynamic Ambient Glow Behind Card */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#EAD0A1]/15 rounded-full blur-2xl group-hover:opacity-100 opacity-30 transition-opacity duration-500 pointer-events-none" />

                {/* Top Card Badge */}
                <div className="flex items-center justify-between w-full mb-2 relative z-10">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-[#EAD0A1] uppercase font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-[#E5A855] font-bold">
                    <span>★</span>
                    <span className="text-[#F2F2F0]">{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Tactile Pack Visual with Centered Floating Perspective Effect */}
                <div 
                  className="relative w-full h-40 sm:h-44 md:h-48 flex items-center justify-center my-auto mx-auto"
                  style={{ perspective: "600px", transformStyle: "preserve-3d" }}
                >
                  {/* Ambient Pack Halo */}
                  <div
                    className={`absolute inset-2 rounded-full blur-xl opacity-25 group-hover:opacity-45 transition-opacity duration-500 bg-gradient-to-tr ${
                      product.color || "from-[#EAD0A1]/20 to-[#E5A855]/15"
                    }`}
                  />

                  {/* 3D Floating Packet */}
                  <div 
                    className="relative w-full h-full transform transition-transform duration-300 ease-out group-hover:scale-106 group-hover:-translate-y-1.5 will-change-transform flex items-center justify-center"
                    style={{
                      transform: `translateZ(12px) rotateY(${tilt.x * 0.4}deg) rotateX(${tilt.y * 0.4}deg)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain object-center drop-shadow-[0_18px_30px_rgba(0,0,0,0.9)]"
                      sizes="(max-width: 768px) 200px, 260px"
                      priority={index < 3}
                    />
                  </div>
                </div>

                {/* Product Meta & Description */}
                <div className="mt-3 flex flex-col gap-2 relative z-10">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg sm:text-xl font-serif italic text-[#F2F2F0] group-hover:text-[#EAD0A1] transition-colors duration-300 leading-tight">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-[11px] text-[#A7ACB4] font-normal line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Ingredients Preview Tag */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[8px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#C7CBD1] font-mono font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  {/* Direct Route CTA Button */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-3 w-full text-center py-2.5 rounded-full bg-gradient-to-r from-white/10 to-white/5 hover:from-[#EAD0A1] hover:to-[#E5A855] hover:text-[#0B0C0E] border border-white/15 hover:border-[#EAD0A1] text-[#F2F2F0] font-mono font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-md block"
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
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pb-8 pt-4 flex items-center justify-between border-t border-white/10 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#858B94] font-semibold">
        <div className="flex items-center gap-3">
          <span>Crafted in small batches</span>
          <span className="text-white/20">•</span>
          <span className="text-[#EAD0A1]">15 Regional Flavours</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 text-[#A7ACB4]">
          <span>Scroll horizontally to explore</span>
          <span className="text-[#EAD0A1]">→</span>
        </div>
      </div>
    </section>
  );
}

