"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products, Product } from "@/data/products";

const getChipsForProduct = (slug: string) => {
  if (slug === "banana-chips") {
    return [
      { img: "/images/chips/banana_slice.png", top: "4%", left: "50%", rot: 15, size: "w-14 h-14 sm:w-18 sm:h-18" },
      { img: "/images/chips/golden_crisp.png", top: "34%", left: "94%", rot: -25, size: "w-12 h-12 sm:w-16 sm:h-16" },
      { img: "/images/chips/banana_slice.png", top: "86%", left: "76%", rot: 40, size: "w-14 h-14 sm:w-18 sm:h-18" },
      { img: "/images/chips/golden_crisp.png", top: "86%", left: "24%", rot: -45, size: "w-13 h-13 sm:w-17 sm:h-17" },
      { img: "/images/chips/banana_slice.png", top: "34%", left: "6%", rot: 30, size: "w-14 h-14 sm:w-18 sm:h-18" },
    ];
  }
  if (slug === "andhra-murukku") {
    return [
      { img: "/images/chips/murukku_crisp.png", top: "4%", left: "50%", rot: 15, size: "w-14 h-14 sm:w-18 sm:h-18" },
      { img: "/images/chips/golden_crisp.png", top: "34%", left: "94%", rot: -25, size: "w-13 h-13 sm:w-17 sm:h-17" },
      { img: "/images/chips/murukku_crisp.png", top: "86%", left: "76%", rot: 40, size: "w-14 h-14 sm:w-18 sm:h-18" },
      { img: "/images/chips/golden_crisp.png", top: "86%", left: "24%", rot: -45, size: "w-13 h-13 sm:w-17 sm:h-17" },
      { img: "/images/chips/murukku_crisp.png", top: "34%", left: "6%", rot: 30, size: "w-14 h-14 sm:w-18 sm:h-18" },
    ];
  }
  return [
    { img: "/images/chips/golden_crisp.png", top: "4%", left: "50%", rot: 15, size: "w-14 h-14 sm:w-18 sm:h-18" },
    { img: "/images/chips/banana_slice.png", top: "34%", left: "94%", rot: -25, size: "w-13 h-13 sm:w-17 sm:h-17" },
    { img: "/images/chips/murukku_crisp.png", top: "86%", left: "76%", rot: 40, size: "w-14 h-14 sm:w-18 sm:h-18" },
    { img: "/images/chips/golden_crisp.png", top: "86%", left: "24%", rot: -45, size: "w-13 h-13 sm:w-17 sm:h-17" },
    { img: "/images/chips/banana_slice.png", top: "34%", left: "6%", rot: 30, size: "w-13 h-13 sm:w-17 sm:h-17" },
  ];
};

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
                {/* Image Container with Elegant Gradient Background and Orbiting Chips */}
                <div 
                  className="flex-1 relative w-full aspect-square max-w-md lg:max-w-[480px] min-h-[340px] sm:min-h-[420px] lg:min-h-[480px] mx-auto flex items-center justify-center transition-all duration-500"
                >
                  {/* Subtle inner glow matching product color */}
                  <div 
                    className={`absolute inset-4 rounded-full blur-[80px] opacity-25 group-hover:opacity-45 transition-all duration-700 ease-out bg-gradient-to-tr ${product.color || "from-[var(--accent-gold)] to-[var(--accent-warm)]"}`} 
                    style={{
                      transform: `translate(${tilt.x * 1.5}px, ${tilt.y * 1.5}px)`,
                    }}
                  />

                  {/* Circulating Orbit of Artisan Chips */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28 + index * 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full pointer-events-none z-20"
                  >
                    {getChipsForProduct(product.slug).map((chip, idx) => (
                      <div
                        key={idx}
                        className={`absolute ${chip.size} -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]`}
                        style={{ top: chip.top, left: chip.left }}
                      >
                        <div
                          className="relative w-full h-full"
                          style={{ transform: `rotate(${chip.rot}deg)` }}
                        >
                          <Image
                            src={chip.img}
                            alt="Circulating Crisp"
                            fill
                            className="object-contain"
                            sizes="80px"
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* 3D Floating Packet with Smooth Float and Refined Tilt */}
                  <div 
                    className="relative w-[85%] h-[85%] transform transition-transform duration-500 ease-out will-change-transform flex items-center justify-center z-10"
                    style={{
                      transform: `rotateY(${tilt.x * 0.5}deg) rotateX(${tilt.y * 0.5}deg) translateZ(20px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -12, 0],
                        rotate: [0, 1.5, 0, -1.5, 0],
                      }}
                      transition={{
                        duration: 5 + index * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-full h-full relative flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform duration-500"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain object-center drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_25px_55px_rgba(229,168,85,0.25)] transition-all duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={true}
                      />
                    </motion.div>
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
