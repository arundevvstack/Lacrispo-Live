"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

import { products } from "@/data/products";
import Link from "next/link";
import ProductHoverSequence from "@/components/ProductHoverSequence";

export default function ProductsClient() {
  const signatureFlavors = products.filter(p => p.isSignature);
  const regularMenu = products.filter(p => !p.isSignature);
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 overflow-hidden">
      
      {/* 1. Hero Section */}
      <motion.section 
        className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 py-12 lg:py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif italic text-white leading-[1.1] tracking-tight transition-all duration-500 ease-out hover:text-[#EAD0A1] hover:scale-[1.03] origin-center lg:origin-left cursor-pointer hover:drop-shadow-[0_0_30px_rgba(234,208,161,0.35)] group inline-block"
          >
            All Premium Snacks are <br className="hidden lg:block"/>
            Available at <span className="text-[#EAD0A1] group-hover:text-[#EAD0A1] transition-colors duration-500">La Crispo</span>
          </motion.h1>
          
          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 relative bg-white/10 backdrop-blur-sm">
              <Image src="/images/anatomy_black.png" alt="Avatar" fill className="object-contain p-1" sizes="48px" />
            </div>
            <p className="text-white/60 text-sm max-w-xs text-left leading-relaxed">
              We are just a click away when you crave for artisan, hand-crafted crisps.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-6 pt-4">
            <button className="px-8 py-4 bg-[#EAD0A1] text-black font-semibold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 tracking-widest text-sm uppercase shadow-[0_0_20px_rgba(234,208,161,0.2)]">
              Buy Now
            </button>
            <button className="flex items-center gap-3 text-white hover:text-[#EAD0A1] transition-colors group">
              <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                ▶
              </span>
              <span className="text-sm uppercase tracking-widest font-medium">How To Order</span>
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="flex-1 relative w-full aspect-square max-w-lg mx-auto lg:max-w-none"
        >
          {/* Ambient Studio Backlighting */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#EAD0A1]/15 to-transparent blur-3xl pointer-events-none" />

          {/* Circulating Orbit of 5 Small Artisan Chips */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
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
                className={`absolute ${chip.size} -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]`}
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
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              animate={{ 
                y: [0, -14, 0],
                rotate: [0, 1.5, 0, -1.5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-[82%] h-[82%] relative drop-shadow-[0_25px_60px_rgba(234,208,161,0.25)] hover:scale-105 transition-transform duration-700 cursor-pointer"
            >
              <Image 
                src="/images/anatomy_red.png" 
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

      {/* 2. Features Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 my-20 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {[
            { icon: "📦", title: "Secure Shipping", desc: "Your premium snacks delivered safely to your door." },
            { icon: "🥔", title: "Artisan Quality", desc: "100% locally sourced potatoes with hand-crafted care." },
            { icon: "✨", title: "Free Premium Delivery", desc: "Enjoy complimentary shipping on all bulk orders." }
          ].map((feature, i) => (
            <div key={i} className={`flex items-start gap-6 ${i !== 0 ? 'pt-10 md:pt-0 md:pl-10' : ''}`}>
              <div className="w-14 h-14 rounded-full bg-[#EAD0A1]/10 text-[#EAD0A1] flex items-center justify-center text-2xl flex-shrink-0 border border-[#EAD0A1]/20">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 3. Signature Flavors (Minimal White Studio Showcases) */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="my-32"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#EAD0A1] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">Chef Curated</span>
            <motion.h2 
              variants={itemVariants} 
              className="text-4xl md:text-5xl font-serif italic text-white max-w-md leading-tight transition-all duration-500 ease-out hover:text-[#EAD0A1] hover:scale-[1.03] origin-left cursor-pointer hover:drop-shadow-[0_0_25px_rgba(234,208,161,0.35)] inline-block"
            >
              Our Signature Flavors
            </motion.h2>
          </div>
          <motion.p variants={itemVariants} className="text-white/50 text-sm max-w-sm text-left md:text-right">
            Here are some of our best distributed flavors. Explore what makes La Crispo a global standard.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signatureFlavors.map((flavor) => (
            <motion.article 
              key={flavor.slug} 
              variants={itemVariants}
            >
              <Link 
                href={`/products/${flavor.slug}`} 
                className="group block bg-zinc-950/80 border border-white/10 hover:border-[#EAD0A1]/50 rounded-[2.5rem] p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.6)] cursor-pointer"
              >
                <ProductHoverSequence 
                  image={flavor.image} 
                  name={flavor.name} 
                  slug={flavor.slug}
                  isSignature={true}
                  size="large"
                />

                {/* Minimalist Info */}
                <div className="mt-6 flex flex-col items-start">
                  <div className="flex items-center justify-between w-full mb-1.5">
                    <h3 className="text-2xl font-serif italic text-white group-hover:text-[#EAD0A1] transition-colors duration-300">
                      {flavor.name}
                    </h3>
                    <span className="text-lg font-bold text-[#EAD0A1]">{flavor.price}</span>
                  </div>
                  <p className="text-white/50 text-xs line-clamp-2 mb-3 leading-relaxed font-light">
                    {flavor.description}
                  </p>
                  
                  {/* Ingredient Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {flavor.ingredients.slice(0, 4).map((ing, idx) => (
                      <span key={idx} className="text-[10px] bg-white/5 border border-white/10 text-white/70 px-2.5 py-0.5 rounded-full font-light">
                        {ing}
                      </span>
                    ))}
                    {flavor.ingredients.length > 4 && (
                      <span className="text-[10px] bg-[#EAD0A1]/10 text-[#EAD0A1] px-2 py-0.5 rounded-full border border-[#EAD0A1]/20 font-medium">
                        +{flavor.ingredients.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between w-full pt-3 border-t border-white/10">
                    <div className="flex items-center gap-1 text-[#EAD0A1] text-xs">
                      {"★".repeat(Math.floor(flavor.rating))}
                      <span className="text-white/40 ml-1">({flavor.reviews})</span>
                    </div>
                    <span className="text-[#EAD0A1] text-xs uppercase tracking-widest font-semibold flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
                      Order Now <span className="text-base leading-none">›</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* 4 & 5. Regular Menu and Banners Grid */}
      <section className="my-32 flex flex-col xl:flex-row gap-16">
        
        {/* Left Side: Regular Menu with Minimal White Stages */}
        <div className="flex-1">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[#EAD0A1] text-xs uppercase tracking-[0.25em] font-semibold block mb-3">All Varieties</span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-white mb-4 transition-all duration-500 ease-out hover:text-[#EAD0A1] hover:scale-[1.03] origin-left cursor-pointer hover:drop-shadow-[0_0_25px_rgba(234,208,161,0.35)] inline-block">
                Our Complete Menu
              </h2>
              <p className="text-white/50 text-sm max-w-md">The full collection of our artisan crafted premium crisps.</p>
            </div>
            <button className="hidden sm:block px-6 py-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-[#EAD0A1] hover:text-[#EAD0A1] transition-all text-xs tracking-widest uppercase">
              See All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularMenu.map((item, i) => (
              <motion.article 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                key={item.slug} 
              >
                <Link 
                  href={`/products/${item.slug}`} 
                  className="bg-zinc-950/70 border border-white/10 hover:border-[#EAD0A1]/40 rounded-3xl p-5 flex flex-col items-center text-center hover:bg-zinc-900/70 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] group h-full cursor-pointer"
                >
                  {/* Snack Thrower Canvas */}
                  <div className="w-full flex justify-center mb-5">
                    <ProductHoverSequence 
                      image={item.image} 
                      name={item.name} 
                      slug={item.slug}
                      isSignature={false}
                      size="compact"
                    />
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#EAD0A1] transition-colors duration-300">
                    {item.name}
                  </h3>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4 text-[#EAD0A1] text-xs">
                    {"★".repeat(Math.floor(item.rating))}
                    <span className="text-white/30 ml-1.5">({item.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between w-full mt-auto pt-3 border-t border-white/5">
                    <span className="text-xl font-bold text-white group-hover:text-[#EAD0A1] transition-colors">{item.price}</span>
                    <button className="px-4 py-2 bg-[#EAD0A1] text-black font-bold rounded-full text-xs uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-sm group-hover:scale-105">
                      Buy Now
                    </button>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Right Side: Promotional Banners */}
        <div className="w-full xl:w-[400px] flex flex-col gap-6 pt-10 xl:pt-[6.5rem]">
          
          {/* Promo 1: Large - Limited Edition (Unboxed Open Showcase) */}
          <motion.article 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full min-h-[360px] flex flex-col justify-between p-4 group cursor-pointer"
          >
            {/* Soft Ambient Gold/Amber Halo (Open Space) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#EAD0A1]/10 via-transparent to-transparent rounded-3xl blur-3xl pointer-events-none" />

            {/* Top Row: Limited Edition Tag & Discount Pill */}
            <div className="flex items-center justify-between z-10 mb-2">
              <span className="text-[#EAD0A1] text-xs uppercase tracking-[0.25em] font-mono font-bold px-3 py-1 rounded-full bg-white/5 border border-[#EAD0A1]/30 backdrop-blur-md">
                Limited Edition
              </span>
              <span className="px-3.5 py-1 rounded-full bg-[#E5A855] text-black font-bold text-xs uppercase tracking-wider shadow-md">
                Save 20%
              </span>
            </div>

            {/* Central Floating Isolated Packet */}
            <div className="relative w-full h-[240px] flex items-center justify-center my-2 pointer-events-none">
              <div className="relative w-full h-full transform group-hover:scale-108 group-hover:-translate-y-3 transition-all duration-700 ease-out drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
                <Image 
                  src="/images/anatomy_black.png" 
                  alt="Truffle & Black Garlic Reserve" 
                  fill 
                  className="object-contain" 
                  sizes="(max-width: 1200px) 100vw, 360px" 
                />
              </div>
            </div>
            
            {/* Bottom Title & Description */}
            <div className="relative z-10 flex flex-col gap-1">
              <h3 className="text-2xl sm:text-3xl font-serif italic text-white leading-tight group-hover:text-[#EAD0A1] transition-colors duration-300">
                Truffle &amp; Black Garlic Reserve
              </h3>
              <p className="text-white/50 text-xs font-light">
                Hand-crafted batch with aged truffle oil &amp; black garlic crystals.
              </p>
            </div>
          </motion.article>

          {/* Promo 2: Wide */}
          <motion.article 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative w-full h-[200px] rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#D4A373] to-[#EAD0A1] group cursor-pointer p-6 flex flex-col justify-center border border-white/10 shadow-xl"
          >
            <div className="relative z-10 max-w-[60%]">
              <h3 className="text-xl font-bold text-black mb-2">Gourmet Box Set</h3>
              <p className="text-black/70 text-sm mb-4 leading-tight">Get your order fresh with a mixed box.</p>
              <div className="inline-block bg-black text-white px-3 py-1 rounded-full text-xs font-bold transform -rotate-2">
                15% OFF
              </div>
            </div>
            
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-64 h-64 opacity-50 group-hover:opacity-100 transition-opacity">
               <div className="w-full h-full border-[20px] border-black/10 rounded-full" />
            </div>
          </motion.article>

        </div>

      </section>

    </div>
  );
}
