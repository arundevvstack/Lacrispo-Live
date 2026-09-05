"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useState } from "react";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<"ingredients" | "nutrition">("ingredients");

  return (
    <div className="max-w-7xl mx-auto px-6 overflow-hidden">
      
      {/* Breadcrumbs */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-xs tracking-widest uppercase font-medium text-white/40 flex items-center gap-2"
      >
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">Products</Link>
        <span>/</span>
        <span className="text-[#EAD0A1]">{product.name}</span>
      </motion.nav>

      <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
        
        {/* Left Column: Product Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 w-full max-w-2xl mx-auto lg:mx-0 relative aspect-square"
        >
          {/* Subtle glowing silver backdrop aura on hover */}
          <div className="absolute inset-0 rounded-full blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(230,232,235,0.25)_0%,rgba(199,203,209,0.08)_50%,transparent_75%)] pointer-events-none" />
          
          <div className="absolute inset-4 md:inset-8 rounded-[2.5rem] bg-gradient-to-b from-[#181B20]/95 via-[#111317]/85 to-[#0B0C0E] backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center p-8 lg:p-12 border border-[#C7CBD1]/20 hover:border-[#E6E8EB]/70 hover:shadow-[0_0_50px_rgba(230,232,235,0.18)] group transition-all duration-700 cursor-pointer">
            
            {/* 1. Minimal Silver Ambient Background Light (Illuminates in rich silver on hover) */}
            <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(230,232,235,0.20)_0%,rgba(199,203,209,0.06)_45%,transparent_70%)] opacity-30 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl" />

            {/* 2. Outer Minimal Silver Collect Orbit Ring */}
            <div className="absolute w-[82%] h-[82%] rounded-full border border-[#E6E8EB]/30 opacity-0 group-hover:opacity-90 scale-110 group-hover:scale-95 group-hover:rotate-45 transition-all duration-700 ease-out pointer-events-none" />

            {/* 3. Inner Minimal Silver Dashed Orbit Ring */}
            <div className="absolute w-[68%] h-[68%] rounded-full border border-dashed border-[#C7CBD1]/40 opacity-0 group-hover:opacity-80 scale-120 group-hover:scale-100 group-hover:-rotate-90 transition-all duration-1000 ease-out pointer-events-none" />

            {/* 4. Converging Minimal Silver Collect Corner Reticles */}
            <div className="absolute inset-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-95">
              <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#E6E8EB]/80 rounded-tl-sm shadow-[0_0_10px_rgba(230,232,235,0.5)]" />
              <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#E6E8EB]/80 rounded-tr-sm shadow-[0_0_10px_rgba(230,232,235,0.5)]" />
              <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#E6E8EB]/80 rounded-bl-sm shadow-[0_0_10px_rgba(230,232,235,0.5)]" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#E6E8EB]/80 rounded-br-sm shadow-[0_0_10px_rgba(230,232,235,0.5)]" />
            </div>

            {/* 5. Four Minimal Silver Orbit Nodes (Collect inward on hover) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="relative w-[75%] h-[75%] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E6E8EB] shadow-[0_0_10px_#E6E8EB]" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E6E8EB] shadow-[0_0_10px_#E6E8EB]" />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E6E8EB] shadow-[0_0_10px_#E6E8EB]" />
                <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#E6E8EB] shadow-[0_0_10px_#E6E8EB]" />
              </div>
            </div>

            {/* Main Product Packet — Silver Illumination & Glow on Hover */}
            <div className="relative w-full h-[90%] flex items-center justify-center z-10">
              <div className="relative w-full h-full transform group-hover:-translate-y-2 group-hover:scale-106 transition-all duration-700 ease-out drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] group-hover:drop-shadow-[0_0_35px_rgba(230,232,235,0.35)] group-hover:brightness-110">
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

            {/* Ground Specular Reflection Shadow */}
            <div className="w-1/2 h-3 bg-black/40 blur-md rounded-full mt-2 transform group-hover:scale-75 group-hover:opacity-30 transition-all duration-700" />
          </div>
        </motion.div>

        {/* Right Column: Product Details */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 flex flex-col justify-center"
        >
          {product.isSignature && (
            <span className="text-[#EAD0A1] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">Signature Series</span>
          )}
          
          <h1 className="text-5xl md:text-6xl font-serif italic text-white mb-6 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-medium text-white">{product.price}</span>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-1 text-[#EAD0A1] text-sm">
              {"★".repeat(Math.floor(product.rating))}
              <span className="text-white/40 ml-2">({product.reviews} reviews)</span>
            </div>
          </div>

          <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-xl">
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
              className="py-4 px-8 text-center rounded-full bg-white/[0.04] hover:bg-[#25D366]/20 border border-white/15 hover:border-[#25D366] text-[#F2F2F0] hover:text-[#25D366] transition-all text-xs tracking-widest uppercase font-mono font-bold flex items-center justify-center gap-2"
            >
              <span>WhatsApp Direct</span>
              <span>↗</span>
            </a>
          </div>

          {/* Details Tabs (Ingredients / Nutrition) */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex gap-8 mb-6">
              <button 
                onClick={() => setActiveTab("ingredients")}
                className={`text-sm tracking-widest uppercase font-semibold pb-2 border-b-2 transition-colors ${activeTab === "ingredients" ? "text-white border-[#EAD0A1]" : "text-white/40 border-transparent hover:text-white/70"}`}
              >
                Ingredients
              </button>
              <button 
                onClick={() => setActiveTab("nutrition")}
                className={`text-sm tracking-widest uppercase font-semibold pb-2 border-b-2 transition-colors ${activeTab === "nutrition" ? "text-white border-[#EAD0A1]" : "text-white/40 border-transparent hover:text-white/70"}`}
              >
                Nutrition
              </button>
            </div>

            <div className="min-h-[100px] text-white/60 text-sm leading-relaxed">
              {activeTab === "ingredients" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p>{product.ingredients.join(", ")}.</p>
                  <p className="mt-4 text-xs text-white/30 italic">*Allergen info: Manufactured in a facility that also processes dairy, soy, and tree nuts.</p>
                </motion.div>
              )}
              {activeTab === "nutrition" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">Calories</span>
                    <span className="text-xl font-medium text-white">{product.nutrition.calories}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">Total Fat</span>
                    <span className="text-xl font-medium text-white">{product.nutrition.fat}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">Total Carbs</span>
                    <span className="text-xl font-medium text-white">{product.nutrition.carbs}</span>
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/40 mb-1">Protein</span>
                    <span className="text-xl font-medium text-white">{product.nutrition.protein}</span>
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
