"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const philosophyText =
  "We believe that a snack is not just food. It is an experience, a momentary escape, and a masterpiece of flavor. Every crunch tells a story of tradition, refined into pure indulgence.";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const words = philosophyText.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || wordsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordsRef.current,
        { y: 50, opacity: 0, rotateX: 25 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.025,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen bg-[#090A0D] text-[#F2F2F0] py-28 px-6 sm:px-10 lg:px-16 border-t border-[#C7CBD1]/15 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E5A855]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Pill */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.35em] text-[#E5A855] text-xs sm:text-sm font-bold font-mono inline-block px-4 py-1.5 rounded-full bg-[#181B20] border border-white/10">
            About La&apos;Crispo • Hebron Group
          </span>
        </div>

        {/* Animated Main Philosophy Quote */}
        <p
          className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#F2F2F0] leading-[1.12] text-justify mb-20 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          style={{ textAlign: "justify", textJustify: "inter-word" }}
          aria-label={philosophyText}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden pb-0 perspective-[1000px] leading-none mr-[0.22em]"
              aria-hidden="true"
            >
              <span
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                className="inline-block origin-bottom transform-gpu"
              >
                {word}
              </span>
            </span>
          ))}
        </p>

        {/* Unified Mission & Vision Section Under About Us */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#14161C] via-[#0E1014] to-[#0A0B0E] border border-[#E5A855]/30 p-8 sm:p-12 lg:p-14 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E5A855] block mb-1">
                Guiding Compass
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Mission &amp; Vision
              </h2>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E5A855] hover:text-white transition-colors"
            >
              <span>Read Full Story</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {/* Vision */}
            <div className="flex flex-col justify-between md:pr-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E5A855] uppercase tracking-wider mb-3">
                  Our Vision
                </div>
                <h3 className="text-xl sm:text-2xl font-serif italic text-white mb-3">
                  Delight Without Quality Compromise
                </h3>
                <p className="text-[#A7ACB4] text-sm sm:text-base leading-relaxed">
                  Customer satisfaction by providing the most delicious food at an affordable price with no compromise in quality is our Vision and of prime importance.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#858B94]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Affordable gourmet experience for daily life</span>
              </div>
            </div>

            {/* Mission */}
            <div className="flex flex-col justify-between pt-6 md:pt-0 md:pl-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E5A855] uppercase tracking-wider mb-3">
                  Our Mission
                </div>
                <h3 className="text-xl sm:text-2xl font-serif italic text-white mb-3">
                  Healthiest Ingredients &amp; Low Oil
                </h3>
                <p className="text-[#A7ACB4] text-sm sm:text-base leading-relaxed">
                  By providing healthier food products with utmost care, produced from the healthiest ingredients and minimum oil with no compromise in taste and quality, our Mission is achieved—delighting customers again and again.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#858B94]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5A855]" />
                <span>Ancestral South Indian recipes refined with modern care</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Callout Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#111317] border border-white/10">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">Taste The Tradition</h4>
            <p className="text-xs sm:text-sm text-[#858B94]">
              Hebron Consumables Enterprises • Pettah, Trivandrum, Kerala – 695024
            </p>
          </div>
          <Link
            href="/about"
            className="px-6 py-2.5 rounded-full bg-[#E5A855] text-[#070809] font-bold text-xs uppercase tracking-widest hover:bg-[#F2F2F0] hover:scale-105 transition-all shadow-[0_0_20px_rgba(229,168,85,0.25)] whitespace-nowrap"
          >
            Explore About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
