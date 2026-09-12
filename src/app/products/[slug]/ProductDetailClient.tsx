"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useState, MouseEvent } from "react";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<"ingredients" | "nutrition">("ingredients");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / rect.height) * 40, 
      y: (x / rect.width) * 40,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 overflow-hidden">
      
      {/* Breadcrumbs */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-xs tracking-widest uppercase font-medium text-[var(--text-muted)] flex items-center gap-2"
      >
        <Link href="/" className="hover:text-[var(--text-primary)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[var(--text-primary)] transition-colors">Products</Link>
        <span>/</span>
        <span className="text-[var(--accent-gold)]">{product.name}</span>
      </motion.nav>

      <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
        
        {/* Left Column: Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 w-full max-w-2xl mx-auto lg:mx-0 relative aspect-square flex items-center justify-center cursor-pointer group"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1500px" }}
        >
          {/* Interactive Floating Glow */}
          <div 
            className="absolute inset-0 rounded-full blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" 
            style={{
               background: `radial-gradient(circle at center, #E5A855 0%, transparent 70%)`,
               transform: `translate3d(${tilt.y * -2}px, ${tilt.x * -2}px, -100px)`
            }}
          />
          
          {/* 3D Tilted Image Container */}
          <div 
            className="relative w-full h-[90%] flex items-center justify-center z-10 transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.05)`,
              transformStyle: "preserve-3d"
            }}
          >
            <div 
              className="relative w-full h-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_35px_60px_rgba(255,255,255,0.15)] group-hover:brightness-110 transition-all duration-300" 
              style={{ transform: "translateZ(60px)" }}
            >
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain" 
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Dynamic Ground Shadow */}
          <div 
            className="absolute bottom-10 w-1/2 h-4 bg-black/60 blur-xl rounded-full transition-all duration-300 pointer-events-none"
            style={{
              transform: `translate3d(${tilt.y * -1.5}px, ${Math.max(0, tilt.x * 2)}px, -50px) scale(${1 - Math.abs(tilt.x)/80})`,
              opacity: 1 - Math.abs(tilt.x)/40
            }}
          />
        </motion.div>

        {/* Right Column: Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center"
        >
          {product.isSignature && (
            <span className="text-[var(--accent-gold)] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Signature Series</span>
          )}
          
          <h1 className="text-5xl md:text-6xl font-serif italic text-[var(--text-primary)] mb-6 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-medium text-[var(--text-primary)]">{product.price}</span>
            <div className="h-6 w-px bg-[var(--border)]" />
            <div className="flex items-center gap-1 text-[var(--accent-gold)] text-sm">
              {"★".repeat(Math.floor(product.rating))}
              <span className="text-[var(--text-muted)] ml-2">({product.reviews} reviews)</span>
            </div>
          </div>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10 max-w-xl">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="/contact"
              className="flex-1 py-4 text-center bg-gradient-to-r from-[#EAD0A1] to-[#E5A855] text-[#0B0C0E] font-bold rounded-full hover:from-white hover:to-[#EAD0A1] hover:scale-105 active:scale-95 transition-all duration-300 tracking-widest text-xs uppercase shadow-[0_10px_30px_rgba(234,208,161,0.25)] font-mono"
            >
              Enquire Product
            </Link>
            <a
              href="https://wa.me/919995566396"
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 text-center rounded-full bg-[var(--surface-secondary)] hover:bg-[#25D366]/20 border border-[var(--border)] hover:border-[#25D366] text-[var(--text-primary)] hover:text-[#25D366] transition-all text-xs tracking-widest uppercase font-mono font-bold flex items-center justify-center gap-2"
            >
              <span>WhatsApp Direct</span>
              <span>↗</span>
            </a>
          </div>

          {/* Details Tabs (Ingredients / Nutrition) */}
          <div className="border-t border-[var(--border)] pt-8">
            <div className="flex gap-8 mb-6">
              <button 
                onClick={() => setActiveTab("ingredients")}
                className={`text-sm tracking-widest uppercase font-semibold pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "ingredients" ? "text-[var(--text-primary)] border-[var(--accent-gold)]" : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]"}`}
              >
                Ingredients
              </button>
              <button 
                onClick={() => setActiveTab("nutrition")}
                className={`text-sm tracking-widest uppercase font-semibold pb-2 border-b-2 transition-colors cursor-pointer ${activeTab === "nutrition" ? "text-[var(--text-primary)] border-[var(--accent-gold)]" : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]"}`}
              >
                Nutrition
              </button>
            </div>

            <div className="min-h-[100px] text-[var(--text-secondary)] text-sm leading-relaxed">
              {activeTab === "ingredients" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p>{product.ingredients.join(", ")}.</p>
                  <p className="mt-4 text-xs text-[var(--text-muted)] italic">*Allergen info: Manufactured in a facility that also processes dairy, soy, and tree nuts.</p>
                </motion.div>
              )}
              {activeTab === "nutrition" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Calories</span>
                    <span className="text-xl font-medium text-[var(--text-primary)]">{product.nutrition.calories}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Total Fat</span>
                    <span className="text-xl font-medium text-[var(--text-primary)]">{product.nutrition.fat}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Total Carbs</span>
                    <span className="text-xl font-medium text-[var(--text-primary)]">{product.nutrition.carbs}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[var(--text-muted)] mb-1">Protein</span>
                    <span className="text-xl font-medium text-[var(--text-primary)]">{product.nutrition.protein}</span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
