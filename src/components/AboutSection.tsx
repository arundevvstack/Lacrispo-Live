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
      className="relative min-h-screen bg-[var(--background)] text-[var(--text-primary)] py-28 px-6 sm:px-10 lg:px-16 border-t border-[var(--border)] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E5A855]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Pill */}
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.35em] text-[var(--accent-gold)] text-xs sm:text-sm font-bold font-mono inline-block px-4 py-1.5 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)]">
            About La&apos;Crispo • Hebron Group
          </span>
        </div>

        {/* Animated Main Philosophy Quote */}
        <p
          className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--text-primary)] leading-[1.12] text-justify mb-20"
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
        <div className="relative rounded-3xl bg-gradient-to-br from-[var(--surface-card)] via-[var(--surface-secondary)] to-[var(--surface-card)] border border-[var(--border)] p-8 sm:p-12 lg:p-14 mb-16 shadow-[var(--shadow-card)]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--accent-gold)] block mb-1">
                Guiding Compass
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Mission &amp; Vision
              </h2>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--accent-gold)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>Read Full Story</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-[var(--border)]">
            {/* Vision */}
            <div className="flex flex-col justify-between md:pr-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-xs font-mono text-[var(--accent-gold)] uppercase tracking-wider mb-3">
                  Our Vision
                </div>
                <h3 className="text-xl sm:text-2xl font-serif italic text-[var(--text-primary)] mb-3">
                  Delight Without Quality Compromise
                </h3>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                  Customer satisfaction by providing the most delicious food at an affordable price with no compromise in quality is our Vision and of prime importance.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Affordable gourmet experience for daily life</span>
              </div>
            </div>

            {/* Mission */}
            <div className="flex flex-col justify-between pt-6 md:pt-0 md:pl-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-xs font-mono text-[var(--accent-gold)] uppercase tracking-wider mb-3">
                  Our Mission
                </div>
                <h3 className="text-xl sm:text-2xl font-serif italic text-[var(--text-primary)] mb-3">
                  Healthiest Ingredients &amp; Low Oil
                </h3>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                  By providing healthier food products with utmost care, produced from the healthiest ingredients and minimum oil with no compromise in taste and quality, our Mission is achieved—delighting customers again and again.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-gold)]" />
                <span>Ancestral South Indian recipes refined with modern care</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Callout Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-[var(--text-primary)]">Taste The Tradition</h4>
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">
              Hebron Consumables Enterprises • Pettah, Trivandrum, Kerala – 695024
            </p>
          </div>
          <Link
            href="/about"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E5A855] to-[#C96F32] text-[#0B0C0E] font-bold text-xs uppercase tracking-widest hover:from-white hover:to-[#EAD0A1] hover:scale-105 active:scale-95 transition-all shadow-[0_4px_15px_rgba(229,168,85,0.25)] whitespace-nowrap"
          >
            Explore About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
