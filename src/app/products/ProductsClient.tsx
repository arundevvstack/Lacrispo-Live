"use client";

import { useState, useMemo } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { products, Product } from "@/data/products";
import ProductHoverSequence from "@/components/ProductHoverSequence";

export default function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const signatureFlavors = useMemo(() => products.filter((p) => p.isSignature), []);
  const regularMenu = useMemo(() => products.filter((p) => !p.isSignature), []);

  // Filtered menu based on user selection without changing underlying content
  const filteredRegularMenu = useMemo(() => {
    if (selectedCategory === "all") return regularMenu;
    if (selectedCategory === "chips") {
      return regularMenu.filter(
        (p) =>
          p.slug.includes("chips") ||
          p.slug.includes("tapioca")
      );
    }
    if (selectedCategory === "murukku") {
      return regularMenu.filter(
        (p) =>
          p.slug.includes("murukku") ||
          p.slug.includes("seva") ||
          p.slug.includes("mixture")
      );
    }
    if (selectedCategory === "roast") {
      return regularMenu.filter(
        (p) =>
          p.slug.includes("peanut") ||
          p.slug.includes("sesame") ||
          p.slug.includes("dal")
      );
    }
    return regularMenu;
  }, [selectedCategory, regularMenu]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      
      {/* Dynamic Ambient Background Orbs */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-[#EAD0A1]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-96 right-10 w-[500px] h-[500px] bg-[#C96F32]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-[30%] left-10 w-[600px] h-[600px] bg-[#E5A855]/08 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* 1. Hero Section */}
      <motion.section
        className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 py-10 lg:py-20 relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex-1 space-y-8 text-center lg:text-left relative z-10">
          
          {/* Subtle Tag Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#EAD0A1]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#E5A855] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#EAD0A1]">
              Artisan Master Collection
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif italic text-white leading-[1.08] tracking-tight transition-all duration-500"
          >
            All Premium Snacks are <br className="hidden lg:block" />
            Available at{" "}
            <span className="bg-gradient-to-r from-[#F2F2F0] via-[#EAD0A1] to-[#E5A855] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(234,208,161,0.3)]">
              La Crispo
            </span>
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center lg:justify-start gap-4"
          >
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#EAD0A1]/30 relative bg-[#181B20]/90 backdrop-blur-md p-1 shadow-[0_8px_20px_rgba(0,0,0,0.6)] flex-shrink-0">
              <Image
                src="/images/products/BANANA CHIPS (1).png"
                alt="La Crispo"
                fill
                className="object-contain p-1.5"
                sizes="56px"
              />
            </div>
            <p className="text-[#A7ACB4] text-sm max-w-sm text-left leading-relaxed font-normal">
              We are just a click away when you crave for artisan, hand-crafted crisps with pure quality and minimum oil.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-2"
          >
            <a
              href="#menu"
              className="px-8 py-4 bg-gradient-to-r from-[#EAD0A1] to-[#E5A855] text-[#0B0C0E] font-bold rounded-full hover:from-white hover:to-[#EAD0A1] hover:scale-105 active:scale-95 transition-all duration-300 tracking-widest text-xs uppercase shadow-[0_10px_30px_rgba(234,208,161,0.25)] flex items-center gap-2"
            >
              <span>Explore Menu</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-[#EAD0A1]/50 text-[#F2F2F0] hover:text-[#EAD0A1] transition-all duration-300 group backdrop-blur-md"
            >
              <span className="w-8 h-8 rounded-full bg-[#EAD0A1]/15 text-[#EAD0A1] flex items-center justify-center group-hover:scale-110 transition-transform text-xs">
                ▶
              </span>
              <span className="text-xs uppercase tracking-widest font-mono font-bold">
                Contact Us
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex-1 relative w-full aspect-square max-w-md lg:max-w-none mx-auto flex items-center justify-center"
        >
          {/* Ambient Studio Spotlight Glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-[#EAD0A1]/20 via-[#C96F32]/15 to-transparent blur-3xl pointer-events-none" />
          
          {/* Decorative Outer Aura Ring */}
          <div className="absolute inset-8 rounded-full border border-[#EAD0A1]/15 pointer-events-none animate-spin-slow" style={{ animationDuration: "40s" }} />
          <div className="absolute inset-16 rounded-full border border-dashed border-white/10 pointer-events-none animate-spin-slow" style={{ animationDuration: "60s", animationDirection: "reverse" }} />

          {/* Circulating Orbit of Artisan Chips */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full pointer-events-none z-20"
          >
            {[
              { img: "/images/chip_orbit_1.png", top: "4%", left: "50%", rot: 15, size: "w-14 h-14 sm:w-16 sm:h-16" },
              { img: "/images/chip_orbit_2.png", top: "34%", left: "94%", rot: -25, size: "w-12 h-12 sm:w-15 sm:h-15" },
              { img: "/images/chip_orbit_3.png", top: "86%", left: "76%", rot: 40, size: "w-14 h-14 sm:w-16 sm:h-16" },
              { img: "/images/chip_orbit_1.png", top: "86%", left: "24%", rot: -20, size: "w-13 h-13 sm:w-15 sm:h-15" },
              { img: "/images/chip_orbit_2.png", top: "34%", left: "6%", rot: 30, size: "w-13 h-13 sm:w-15 sm:h-15" },
            ].map((chip, idx) => (
              <div
                key={idx}
                className={`absolute ${chip.size} -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]`}
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
                    sizes="64px"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Main Hero Snack Floating */}
          <div className="relative w-[85%] h-[85%] flex items-center justify-center">
            <motion.div
              animate={{
                y: [0, -14, 0],
                rotate: [0, 1.5, 0, -1.5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full relative drop-shadow-[0_30px_70px_rgba(234,208,161,0.25)] hover:scale-105 transition-transform duration-700 cursor-pointer flex items-center justify-center"
            >
              <Image
                src="/images/products/KERALA MIXTURE.png"
                alt="La Crispo Premium Pack"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* 2. Features Bar (Luxury Frosted Glass Card) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-gradient-to-r from-[#14161B]/90 via-[#181B20]/80 to-[#14161B]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 my-16 sm:my-24 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
      >
        <div className="absolute top-0 right-1/4 w-72 h-36 bg-[#EAD0A1]/10 blur-[80px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { icon: "📦", title: "Secure Shipping", desc: "Your premium snacks delivered safely to your door." },
            { icon: "🥔", title: "Artisan Quality", desc: "100% locally sourced potatoes with hand-crafted care." },
            { icon: "✨", title: "Free Premium Delivery", desc: "Enjoy complimentary shipping on all bulk orders." },
          ].map((feature, i) => (
            <div key={i} className={`flex items-start gap-5 ${i !== 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#EAD0A1]/20 to-[#EAD0A1]/5 text-[#EAD0A1] flex items-center justify-center text-2xl flex-shrink-0 border border-[#EAD0A1]/30 shadow-[0_4px_15px_rgba(234,208,161,0.15)]">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-medium text-white mb-1.5 flex items-center gap-2">
                  {feature.title}
                </h3>
                <p className="text-[#A7ACB4] text-xs sm:text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. Signature Flavors (Premium Showcase Gallery) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="my-20 sm:my-28"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[#EAD0A1] text-xs uppercase tracking-[0.3em] font-mono font-bold block mb-2 px-3 py-1 rounded-full bg-white/5 border border-[#EAD0A1]/30 w-max">
              Chef Curated
            </span>
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-6xl font-serif italic text-white leading-tight bg-gradient-to-r from-white via-[#F2F2F0] to-[#EAD0A1] bg-clip-text text-transparent"
            >
              Our Signature Flavors
            </motion.h2>
          </div>
          <motion.p variants={itemVariants} className="text-[#A7ACB4] text-sm max-w-sm text-left md:text-right leading-relaxed">
            Here are some of our best distributed flavors. Explore what makes La Crispo a global standard of crunch.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureFlavors.map((flavor) => (
            <motion.article key={flavor.slug} variants={itemVariants}>
              <Link
                href={`/products/${flavor.slug}`}
                className="group relative block bg-gradient-to-b from-[#181B20] via-[#14161B] to-[#0E1013] border border-white/15 hover:border-[#EAD0A1]/60 rounded-[2.25rem] p-6 sm:p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85)] cursor-pointer overflow-hidden"
              >
                {/* Dynamic Ambient Card Backlight */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#EAD0A1]/15 rounded-full blur-3xl group-hover:opacity-100 opacity-40 transition-opacity duration-500 pointer-events-none" />

                <ProductHoverSequence
                  image={flavor.image}
                  name={flavor.name}
                  slug={flavor.slug}
                  isSignature={true}
                  size="large"
                />

                {/* Flavor Details */}
                <div className="mt-6 flex flex-col items-start relative z-10">
                  <div className="flex items-center justify-between w-full mb-2">
                    <h3 className="text-xl sm:text-2xl font-serif italic text-[#F2F2F0] group-hover:text-[#EAD0A1] transition-colors duration-300">
                      {flavor.name}
                    </h3>
                  </div>

                  <p className="text-[#A7ACB4] text-xs line-clamp-2 mb-4 leading-relaxed font-normal">
                    {flavor.description}
                  </p>

                  {/* Ingredient Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {flavor.ingredients.slice(0, 4).map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-white/5 border border-white/10 text-[#C7CBD1] px-2.5 py-0.5 rounded-full font-mono font-medium"
                      >
                        {ing}
                      </span>
                    ))}
                    {flavor.ingredients.length > 4 && (
                      <span className="text-[10px] bg-[#EAD0A1]/15 text-[#EAD0A1] px-2 py-0.5 rounded-full border border-[#EAD0A1]/30 font-mono font-semibold">
                        +{flavor.ingredients.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between w-full pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-[#E5A855] text-xs font-mono font-bold">
                      <span>★</span>
                      <span>{flavor.rating.toFixed(1)}</span>
                      <span className="text-[#858B94] font-normal ml-1">({flavor.reviews} reviews)</span>
                    </div>

                    <span className="text-[#EAD0A1] text-xs uppercase tracking-widest font-mono font-bold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-300">
                      View Details <span className="text-base leading-none">›</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* 4. Complete Menu Catalog (Balanced Full-Width Grid) */}
      <section id="menu" className="my-20 sm:my-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-[#EAD0A1] text-xs uppercase tracking-[0.3em] font-mono font-bold block mb-2 px-3 py-1 rounded-full bg-white/5 border border-[#EAD0A1]/30 w-max">
              All Varieties
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif italic text-white mb-2 leading-tight bg-gradient-to-r from-white via-[#F2F2F0] to-[#EAD0A1] bg-clip-text text-transparent">
              Our Complete Menu
            </h2>
            <p className="text-[#A7ACB4] text-sm max-w-md leading-relaxed">
              The full collection of our artisan crafted premium crisps and traditional snacks.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Snacks" },
              { id: "chips", label: "Chips & Crisps" },
              { id: "murukku", label: "Murukku & Savouries" },
              { id: "roast", label: "Roasts & Sweets" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-[#EAD0A1] to-[#E5A855] text-[#0B0C0E] shadow-[0_4px_15px_rgba(234,208,161,0.3)] scale-105"
                    : "bg-white/5 hover:bg-white/10 text-[#C7CBD1] border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid: Perfectly Balanced 4-Column on Desktop, 3-Column on Laptops, 2-Column on Tablets */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredRegularMenu.map((item, i) => (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                key={item.slug}
                className="h-full"
              >
                <Link
                  href={`/products/${item.slug}`}
                  className="relative bg-gradient-to-b from-[#181B20]/90 via-[#14161B]/90 to-[#0E1013]/90 border border-white/10 hover:border-[#EAD0A1]/50 rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center hover:bg-[#1C2026]/90 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] group h-full cursor-pointer overflow-hidden"
                >
                  {/* Ambient Glow Spotlight Behind Product Image */}
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#EAD0A1]/10 rounded-full blur-2xl group-hover:opacity-100 opacity-30 transition-opacity duration-300 pointer-events-none" />

                  {/* Snack Sequence Showcase */}
                  <div className="w-full flex justify-center mb-4 relative z-10">
                    <ProductHoverSequence
                      image={item.image}
                      name={item.name}
                      slug={item.slug}
                      isSignature={false}
                      size="compact"
                    />
                  </div>

                  <h3 className="text-lg font-serif italic text-white mb-1.5 group-hover:text-[#EAD0A1] transition-colors duration-300 leading-snug">
                    {item.name}
                  </h3>

                  <p className="text-[#A7ACB4] text-[11px] line-clamp-2 mb-3 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1.5 mb-4 text-[#E5A855] text-xs font-mono font-bold">
                    <span>★</span>
                    <span>{item.rating.toFixed(1)}</span>
                    <span className="text-[#858B94] font-normal ml-1">({item.reviews})</span>
                  </div>

                  <div className="w-full mt-auto pt-3 border-t border-white/10 relative z-10">
                    <span className="w-full py-2.5 rounded-full bg-gradient-to-r from-white/10 to-white/5 group-hover:from-[#EAD0A1] group-hover:to-[#E5A855] group-hover:text-[#0B0C0E] text-[#F2F2F0] font-mono font-bold text-[10px] uppercase tracking-widest transition-all duration-300 shadow-sm block text-center">
                      View Details
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 5. Promotional Highlights Section (Seamless Full-Width Dual Feature) */}
      <section className="my-20 sm:my-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Promo 1: Limited Edition Showcase (7 Cols) */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative min-h-[340px] sm:min-h-[380px] rounded-[2.5rem] bg-gradient-to-b from-[#181B20] via-[#14161B] to-[#0E1013] border border-white/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            {/* Ambient Gold/Amber Halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#EAD0A1]/15 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />

            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-between h-full z-10 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[#EAD0A1] text-[10px] uppercase tracking-[0.25em] font-mono font-bold px-3 py-1 rounded-full bg-white/5 border border-[#EAD0A1]/30 backdrop-blur-md">
                  Limited Edition
                </span>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#E5A855] to-[#C96F32] text-black font-bold text-[11px] uppercase tracking-wider shadow-md">
                  Save 20%
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif italic text-white leading-tight group-hover:text-[#EAD0A1] transition-colors duration-300 mb-2">
                  Jackfruit Chips Reserve
                </h3>
                <p className="text-[#A7ACB4] text-xs sm:text-sm font-normal leading-relaxed max-w-sm">
                  Hand-harvested Varikka jackfruit crisps lightly salted to perfection.
                </p>
              </div>

              <div>
                <Link
                  href="/products/jackfruit-chips"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#EAD0A1] hover:text-black border border-white/20 hover:border-[#EAD0A1] text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300"
                >
                  <span>Explore Reserve</span>
                  <span>›</span>
                </Link>
              </div>
            </div>

            {/* Right Packet Visual */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex-shrink-0 flex items-center justify-center">
              <div className="relative w-full h-full transform group-hover:scale-108 group-hover:-translate-y-2 transition-all duration-700 ease-out drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
                <Image
                  src="/images/products/JACKFRUIT CHIPS.png"
                  alt="Jackfruit Chips Reserve"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 240px, 320px"
                />
              </div>
            </div>
          </motion.article>

          {/* Promo 2: Gourmet Box Set Banner (5 Cols) */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 relative min-h-[340px] sm:min-h-[380px] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-[#D4A373] via-[#EAD0A1] to-[#E5A855] group cursor-pointer p-6 sm:p-8 flex flex-col justify-between border border-white/20 shadow-[0_20px_45px_rgba(229,168,85,0.25)]"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-black/80 text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-black/10 border border-black/15 backdrop-blur-md">
                Curated Gift Pack
              </span>
              <div className="inline-block bg-[#0B0C0E] text-[#EAD0A1] px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider shadow-md">
                15% OFF
              </div>
            </div>

            <div className="relative z-10 my-4">
              <h3 className="text-2xl sm:text-3xl font-serif italic font-bold text-black mb-2 leading-tight">
                Gourmet Box Set
              </h3>
              <p className="text-black/80 text-xs sm:text-sm leading-relaxed font-medium max-w-xs">
                Get your order fresh with an artisan mixed box crafted for sharing.
              </p>
            </div>

            <div className="relative z-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B0C0E] hover:bg-white text-[#EAD0A1] hover:text-black text-xs font-mono font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
              >
                <span>Enquire Gift Box</span>
                <span>›</span>
              </Link>
            </div>

            <div className="absolute -right-8 -bottom-8 w-60 h-60 opacity-25 group-hover:opacity-40 transition-opacity pointer-events-none">
              <div className="w-full h-full border-[20px] border-black/20 rounded-full" />
            </div>
          </motion.article>

        </div>
      </section>

    </div>
  );
}

