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
          {/* Subtle glowing backdrop matching the brand color if signature, else neutral */}
          <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${product.color ? `bg-gradient-to-b ${product.color}` : 'bg-[#EAD0A1]'}`} />
          
          <div className="absolute inset-4 md:inset-8 rounded-[2.5rem] bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent backdrop-blur-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8 lg:p-12 border border-white/10 group">
            <div className="relative w-full h-[90%] flex items-center justify-center">
              <div className="relative w-full h-full transform group-hover:-translate-y-3 group-hover:scale-105 group-hover:rotate-1 transition-all duration-700 ease-out drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
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
            {/* Ground shadow */}
            <div className="w-1/2 h-3 bg-black/15 blur-md rounded-full mt-2 transform group-hover:scale-75 group-hover:opacity-40 transition-all duration-700" />
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
            <button className="flex-1 py-4 bg-[#EAD0A1] text-black font-semibold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 tracking-widest text-sm uppercase shadow-[0_0_20px_rgba(234,208,161,0.2)]">
              Add To Cart
            </button>
            <button className="py-4 px-10 rounded-full border border-white/20 text-white hover:border-white transition-all text-sm tracking-widest uppercase font-medium">
              Subscribe &amp; Save 10%
            </button>
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
