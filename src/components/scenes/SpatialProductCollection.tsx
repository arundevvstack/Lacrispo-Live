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
          end: () => `+=${Math.abs(getScrollAmount()) * 1.2}`,
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

  // Mouse tilt for desktop spatial cards
  const handleMouseMove = (slug: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || isReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setMouseTilt((prev) => ({ ...prev, [slug]: { x, y } }));
  };

  const handleMouseLeave = (slug: string) => {
    setMouseTilt((prev) => ({ ...prev, [slug]: { x: 0, y: 0 } }));
  };

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="min-h-screen bg-[#0B0C0E] text-[#F2F2F0] relative overflow-hidden flex flex-col justify-between"
      aria-label="La Crispo 9-Flavor Spatial Product Collection"
    >
      {/* Dark Graphite Atmosphere */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(199,203,209,0.06),transparent_70%)]" />

      {/* Section Top Header */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-16 sm:pt-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5A855]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C7CBD1] font-bold font-mono">
              03 / The 9 Signatures
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic tracking-tight text-[#F2F2F0]">
            Spatial Collection
          </h2>
        </div>

        {/* Status Indicator & Catalog Link */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[#858B94] font-semibold">
            <span className="text-[#C7CBD1] font-bold">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>09 Flavours</span>
          </div>

          <Link
            href="/products"
            className="px-5 py-2.5 rounded-full border border-[#C7CBD1]/30 bg-[#181B20]/90 text-[11px] font-bold uppercase tracking-[0.2em] text-[#F2F2F0] hover:text-[#0B0C0E] hover:bg-[#E6E8EB] hover:border-[#E6E8EB] transition-all duration-300 shadow-sm"
          >
            Catalog View
          </Link>
        </div>
      </div>

      {/* Spatial Horizontal Carousel Track */}
      <div className="w-full relative my-auto py-6 sm:py-10 overflow-x-auto sm:overflow-visible no-scrollbar">
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
                className={`group relative flex-shrink-0 w-[230px] sm:w-[260px] md:w-[285px] rounded-[1.75rem] bg-gradient-to-b from-[#181B20] via-[#14161B] to-[#0E1013] border border-[#C7CBD1]/20 p-4 sm:p-5 flex flex-col justify-between transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.8)] hover:border-[#E6E8EB]/50 hover:shadow-[0_20px_50px_rgba(199,203,209,0.12)] ${
                  isAlternate ? "sm:translate-y-4" : "sm:-translate-y-4"
                }`}
                style={{
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Top Card Badge */}
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#C7CBD1] uppercase font-bold">
                    {String(index + 1).padStart(2, "0")} — {product.isSignature ? "Signature" : "Artisan"}
                  </span>
                  <div className="flex items-center gap-1 font-mono text-[10px] text-[#A7ACB4] font-bold">
                    <span className="text-[#E5A855]">★</span>
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Tactile Pack Visual with Dedicated 3D Floating Perspective Effect */}
                <div 
                  className="relative w-full h-36 sm:h-40 md:h-44 flex items-center justify-center my-1.5"
                  style={{ perspective: "600px", transformStyle: "preserve-3d" }}
                >
                  {/* Subtle Ambient Pack Halo */}
                  <div
                    className={`absolute inset-2 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-tr ${
                      product.color || "from-[#C7CBD1]/20 to-[#E5A855]/15"
                    }`}
                  />

                  {/* 3D Floating Packet — Compact Refined Sizing */}
                  <div 
                    className="relative w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-108 group-hover:-translate-y-2 will-change-transform flex items-center justify-center"
                    style={{
                      transform: `translateZ(24px) rotateY(${tilt.x * 0.6}deg) rotateX(${tilt.y * 0.6}deg)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.95)]"
                      sizes="(max-width: 768px) 180px, 220px"
                      priority={index < 3}
                    />
                  </div>
                </div>

                {/* Product Meta & Description */}
                <div className="mt-2 flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg sm:text-xl font-serif italic text-[#F2F2F0] group-hover:text-[#E6E8EB] transition-colors leading-tight">
                      {product.name}
                    </h3>
                    <span className="font-mono text-xs font-bold text-[#E5A855]">
                      {product.price}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#A7ACB4] font-normal line-clamp-2 leading-snug">
                    {product.description}
                  </p>

                  {/* Ingredients Preview Tag */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.ingredients.slice(0, 3).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[8px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#C7CBD1] font-mono font-semibold"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  {/* Direct Route CTA Button */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-2.5 w-full text-center py-2.5 rounded-full bg-gradient-to-r from-[#181B20] to-[#111317] hover:from-[#E6E8EB] hover:to-[#C7CBD1] hover:text-[#0B0C0E] border border-[#C7CBD1]/30 text-[#F2F2F0] font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-300 shadow-md block"
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
        <div>
          <span>Crafted in small batches</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Scroll to travel collection</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
}
