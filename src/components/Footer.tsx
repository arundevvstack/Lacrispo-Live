"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const footer = footerRef.current;
    const logo = logoRef.current;
    if (!footer || !logo) return;

    // Parallax effect on the giant logo text
    gsap.fromTo(
      logo,
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 0.6,
        },
      }
    );

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === footer) t.kill();
      });
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@lacrispo.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="relative bg-[#060709] text-[#F2F2F0] pt-24 pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-white/10"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E5A855]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24 items-start">
          
          {/* Left: Let's talk about crunch */}
          <div className="md:col-span-7">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
              Let&apos;s talk about{" "}
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#F2F2F0] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
                crunch.
              </span>
            </h2>
            <p className="text-[#A7ACB4] max-w-md text-base leading-relaxed mb-8">
              Interested in retail distribution, bulk wholesale, or custom partnerships? We&apos;d love to connect with you.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-[#E5A855] to-[#C96F32] text-[#0B0C0E] font-bold text-xs tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(229,168,85,0.3)] hover:shadow-[0_0_30px_rgba(229,168,85,0.45)] hover:scale-[1.02] active:scale-100 transition-all duration-300"
              >
                <span>Get In Touch</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <button
                onClick={handleCopyEmail}
                type="button"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#E5A855]/40 text-[#C7CBD1] hover:text-white transition-all text-xs font-mono"
              >
                <svg className="w-3.5 h-3.5 text-[#E5A855]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {copied ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  )}
                </svg>
                <span>{copied ? "Copied!" : "hello@lacrispo.com"}</span>
              </button>
            </div>
          </div>

          {/* Right: Essential Navigation & Connect */}
          <div className="md:col-span-5 grid grid-cols-2 gap-8 md:pl-10">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-[#858B94] uppercase mb-4">
                Explore
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/products" className="text-[#A7ACB4] hover:text-white transition-colors">
                    Collection
                  </Link>
                </li>
                <li>
                  <a href="#about" className="text-[#A7ACB4] hover:text-white transition-colors">
                    Our Craft
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-[#A7ACB4] hover:text-white transition-colors">
                    Journal
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="text-[#A7ACB4] hover:text-[#E5A855] transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono tracking-widest text-[#858B94] uppercase mb-4">
                Social
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#A7ACB4] hover:text-[#E5A855] transition-colors">
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-[#A7ACB4] hover:text-[#E5A855] transition-colors">
                    Twitter (X) ↗
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#A7ACB4] hover:text-[#E5A855] transition-colors">
                    LinkedIn ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Clean & Minimal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[#858B94] text-xs border-t border-white/10 pt-8 font-mono">
          <p>© {new Date().getFullYear()} LA CRISPO. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Giant Background Watermark Logo with space between LA and CRISPO */}
      <h1
        ref={logoRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[14vw] font-black tracking-tight text-[#C7CBD1] pointer-events-none select-none leading-[0.7] opacity-5 whitespace-nowrap"
      >
        LA CRISPO
      </h1>
    </footer>
  );
}


