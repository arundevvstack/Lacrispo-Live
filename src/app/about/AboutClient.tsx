"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

const corePillars = [
  {
    icon: "✦",
    title: "Zero Compromise",
    desc: "Uncompromising standards in purity, crunch, and authentic flavor in every batch.",
  },
  {
    icon: "🌿",
    title: "Healthiest Ingredients",
    desc: "Crafted with clean, premium ingredients and minimum oil for a genuinely wholesome crunch.",
  },
  {
    icon: "🏺",
    title: "Ancestral Recipes",
    desc: "Reviving timeless South Indian culinary traditions loved by generations.",
  },
  {
    icon: "✨",
    title: "Affordable Luxury",
    desc: "Delivering world-class gourmet experience accessible for daily tea & coffee moments.",
  },
];

export default function AboutClient() {
  return (
    <div className="relative min-h-screen bg-[#070809] text-[#F2F2F0] overflow-hidden pt-28 sm:pt-36">
      {/* Ambient background glow effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E5A855]/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-[600px] -left-40 w-[500px] h-[500px] bg-[#C96F32]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#858B94] uppercase mb-8">
          <Link href="/" className="hover:text-[#E5A855] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#F2F2F0]">About Us</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 sm:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181B20] border border-[#C7CBD1]/20 text-[#E5A855] text-xs font-mono uppercase tracking-[0.25em] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A855] animate-pulse" />
            Hebron Group Brand
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F2F2F0] leading-[1.1] mb-8"
          >
            Taste the{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-[#F2F2F0] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
              Tradition.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#A7ACB4] leading-relaxed max-w-2xl mx-auto"
          >
            To serve you more and in better ways, we commenced a modern concept in bakery & snack craft — <strong className="text-white font-semibold">La&apos;Crispo</strong>.
          </motion.p>
        </div>

        {/* Brand Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-b from-[#111317] to-[#0D0E12] border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 mb-20 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5A855] block mb-3">
                Our Heritage & Origins
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-snug">
                Unlocking Rich Flavours for Every Tea & Coffee Moment
              </h2>
              <div className="space-y-4 text-[#C7CBD1] text-base sm:text-lg leading-relaxed">
                <p>
                  Just taste it once, and the name itself will give you a mouth-watering feeling for an array of snacks alongside a warm cup of tea or coffee.
                </p>
                <p>
                  <strong className="text-white">La&apos;Crispo</strong> is a premium snack brand from <strong className="text-white">Hebron Group</strong>. We offer a diverse spectrum of foods, with an absolute belief in product purity and culinary excellence above all else.
                </p>
                <p>
                  We bring you the unmistakable taste of authentic South Indian recipes — delivering the rich, nostalgic flavors once savored by our ancestors to contemporary snack lovers across the world.
                </p>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#E5A855] text-[#070809] font-bold text-xs uppercase tracking-widest hover:bg-[#F2F2F0] hover:scale-105 transition-all shadow-[0_0_20px_rgba(229,168,85,0.3)]"
                >
                  <span>Explore Product Range</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-[#F2F2F0] font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#181B20]/80 p-8 flex flex-col justify-between min-h-[340px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5A855]/15 blur-3xl rounded-full pointer-events-none" />
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#E5A855]/15 border border-[#E5A855]/30 flex items-center justify-center text-xl text-[#E5A855]">
                    ★
                  </div>
                  <h3 className="text-2xl font-serif italic text-white">Hebron Group Legacy</h3>
                  <p className="text-sm text-[#A7ACB4] leading-relaxed">
                    Headquartered in Trivandrum, Kerala, Hebron Consumables Enterprises blends state-of-the-art hygienic food crafting with generations-old culinary secrets.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4 mt-6 flex items-center justify-between text-xs font-mono text-[#858B94]">
                  <span>Pettah, Trivandrum</span>
                  <span className="text-[#E5A855]">Kerala – 695024</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Consolidated Unified Mission & Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5A855] block mb-3">
              Guiding North Star
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Mission &amp; Vision
            </h2>
            <p className="text-[#A7ACB4] text-base sm:text-lg">
              Our single commitment to health, taste, customer joy, and honest pricing.
            </p>
          </div>

          {/* Unified Spotlight Card */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#16181F] via-[#101216] to-[#0A0B0E] border border-[#E5A855]/30 p-8 sm:p-12 lg:p-16 shadow-[0_0_50px_rgba(229,168,85,0.08)]">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-[#E5A855] text-[#070809] font-mono text-xs font-bold uppercase tracking-[0.25em] shadow-lg">
              Our Core Purpose
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-stretch divide-y md:divide-y-0 md:divide-x divide-white/10">
              {/* Vision Card */}
              <div className="flex flex-col justify-between pt-6 md:pt-0 md:pr-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E5A855] uppercase tracking-wider mb-4">
                    <span>👁</span> Our Vision
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif italic text-white mb-4">
                    Pure Customer Delight &amp; Affordable Quality
                  </h3>
                  <blockquote className="text-[#C7CBD1] text-base sm:text-lg leading-relaxed border-l-2 border-[#E5A855] pl-4 italic">
                    &ldquo;Customer satisfaction by providing the most delicious food at an affordable price with no compromise in quality is our Vision and of prime importance.&rdquo;
                  </blockquote>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-[#858B94] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Uncompromising culinary excellence for everyone</span>
                </div>
              </div>

              {/* Mission Card */}
              <div className="flex flex-col justify-between pt-10 md:pt-0 md:pl-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E5A855] uppercase tracking-wider mb-4">
                    <span>🎯</span> Our Mission
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif italic text-white mb-4">
                    Healthier Living Through Healthiest Ingredients
                  </h3>
                  <blockquote className="text-[#C7CBD1] text-base sm:text-lg leading-relaxed border-l-2 border-[#C96F32] pl-4 italic">
                    &ldquo;By providing healthier food products with utmost care, produced from the healthiest ingredients and minimum oil with no compromise in taste and quality, our Mission will be achieved; making our mark on the market by delighting our customers again and again.&rdquo;
                  </blockquote>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-[#858B94] font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#E5A855]" />
                  <span>Minimum oil • Clean processing • Authentic taste</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Core Pillars Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#858B94] block mb-2">
              Values & Standards
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white">
              The Four Pillars of La Crispo
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#111317] border border-white/10 hover:border-[#E5A855]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg mb-4 text-[#E5A855]">
                    {pillar.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm text-[#A7ACB4] leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact & Distribution Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-gradient-to-r from-[#181B20] via-[#121418] to-[#181B20] border border-white/15 p-8 sm:p-12 text-center max-w-4xl mx-auto mb-28 shadow-2xl"
        >
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5A855] block mb-3">
            Partner With Hebron Consumables
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Bring Authentic Heritage Snacks to Your Customers
          </h2>
          <p className="text-[#A7ACB4] max-w-xl mx-auto text-base mb-8">
            Reach out for retail distribution, corporate supply, or wholesale dealership across India and global markets.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E5A855] to-[#C96F32] text-[#070809] font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
            >
              Contact Sales &amp; Distribution
            </Link>
            <a
              href="tel:+919995566396"
              className="px-6 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs hover:bg-white/10 transition-colors"
            >
              📞 +91 999 55 66 396
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
