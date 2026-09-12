"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/data/products";

export default function SpatialProductCollection() {
  const [mouseTilt, setMouseTilt] = useState<{ [key: string]: { x: number; y: number } }>({});
  
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    }
  }, []);

  // Pick 3 specific featured products based on request
  const featuredSlugs = ["andhra-murukku", "banana-chips", "dal-mixture"];
  const featuredProducts = products.filter(p => featuredSlugs.includes(p.slug));
  const displayProducts = featuredProducts.length === 3 ? featuredProducts : products.slice(0, 3);

  const handleMouseMove = (slug: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || isReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // Reduced multiplier for smaller, more elegant movements
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setMouseTilt((prev) => ({ ...prev, [slug]: { x, y } }));
  };

  const handleMouseLeave = (slug: string) => {
    setMouseTilt((prev) => ({ ...prev, [slug]: { x: 0, y: 0 } }));
  };

  return (
    <section
      id="collection"
      className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] relative overflow-hidden flex flex-col justify-center py-24 sm:py-32 border-t border-[var(--border)]"
      aria-label="Featured Products"
    >
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(229,168,85,0.08),transparent_70%)] pointer-events-none rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(201,111,50,0.07),transparent_70%)] pointer-events-none rounded-full blur-[120px]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(199,203,209,0.05),transparent_70%)]" />

      {/* Section Top Header */}
      <div className="w-full max-w-[2000px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 mb-16">
        <div>
          <span className="text-[var(--accent-gold)] text-xs uppercase tracking-[0.3em] font-mono font-bold block mb-3 px-4 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] w-max">
            Exclusive Lineup
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic tracking-tight bg-gradient-to-r from-[var(--text-primary)] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
            Featured Products
          </h2>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 pb-2">
          <Link
            href="/products"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E5A855] to-[#C96F32] text-[#0B0C0E] font-mono font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-[0_4px_15px_rgba(229,168,85,0.25)] hover:from-white hover:to-[#EAD0A1] hover:scale-105 active:scale-95"
          >
            Catalog View
          </Link>
        </div>
      </div>

      {/* 3 Featured Products Interactive Banner Blocks */}
      <div className="w-full max-w-[2000px] mx-auto px-6 sm:px-12 lg:px-24 xl:px-32 z-10">
        <div className="flex flex-col gap-24 sm:gap-32 lg:gap-40" style={{ perspective: "1500px" }}>
          {displayProducts.map((product: Product, index: number) => {
            const tilt = mouseTilt[product.slug] || { x: 0, y: 0 };
            const isAlternate = index % 2 === 1;

            return (
              <div
                key={product.slug}
                onMouseMove={(e) => handleMouseMove(product.slug, e)}
                onMouseLeave={() => handleMouseLeave(product.slug)}
                className={`group relative w-full flex flex-col ${isAlternate ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-20 items-center justify-between transition-all duration-500`}
                style={{
                  // Subtle global tilt
                  transform: `rotateY(${tilt.x * 0.15}deg) rotateX(${tilt.y * 0.15}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Image Container with Elegant Gradient Background */}
                <div 
                  className="flex-1 relative w-full h-80 sm:h-96 lg:h-[500px] flex items-center justify-center transition-all duration-500"
                >
                  {/* Subtle inner glow matching product color */}
                  <div 
                    className={`absolute inset-0 rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-all duration-700 ease-out bg-gradient-to-tr ${product.color || "from-[var(--accent-gold)] to-[var(--accent-warm)]"}`} 
                    style={{
                      transform: `translate(${tilt.x * 1.5}px, ${tilt.y * 1.5}px)`,
                    }}
                  />

                  {/* 3D Floating Packet with Smaller, Refined Tilt */}
                  <div 
                    className="relative w-full h-[90%] transform transition-transform duration-500 ease-out group-hover:scale-105 will-change-transform flex items-center justify-center z-10"
                    style={{
                      // Reduced tilt angles and Z-depth for smaller, smoother movements
                      transform: `rotateY(${tilt.x * 0.5}deg) rotateX(${tilt.y * 0.5}deg) translateZ(20px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain object-center drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] group-hover:drop-shadow-[0_20px_40px_rgba(229,168,85,0.15)] transition-all duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={true}
                    />
                  </div>
                </div>

                {/* Product Meta & Description */}
                <div 
                  className="flex-1 flex flex-col gap-6 relative z-10 w-full transition-transform duration-500 ease-out"
                  style={{
                    // Reduced parallax on the text
                    transform: `translateZ(10px) translateX(${tilt.x * -0.2}px)`,
                  }}
                >
                  {/* Top Badge */}
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-mono text-[11px] tracking-[0.25em] text-[var(--accent-gold)] uppercase font-bold px-3 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-xs text-[var(--accent-gold)] font-bold">
                      <span>★</span>
                      <span className="text-[var(--text-primary)]">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors duration-300 leading-tight">
                    {product.name}
                  </h3>

                  <p className="text-base sm:text-lg text-[var(--text-secondary)] font-light leading-relaxed max-w-xl group-hover:text-white transition-colors duration-300">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4 mb-8">
                    {product.ingredients.slice(0, 4).map((ing, i) => (
                      <span
                        key={i}
                        className="text-[10px] sm:text-[11px] uppercase tracking-widest px-4 py-2 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-secondary)] font-mono font-medium transition-colors duration-500"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full sm:w-max px-12 py-4 rounded-full bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-gradient-to-r hover:from-[#E5A855] hover:to-[#C96F32] hover:text-[#0B0C0E] hover:border-transparent font-mono font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-sm hover:shadow-[0_4px_30px_rgba(229,168,85,0.2)] block text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
