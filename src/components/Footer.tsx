"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const logo = logoRef.current;
    if (!footer || !logo) return;

    const ctx = gsap.context(() => {
      // Parallax effect on the giant logo text
      gsap.fromTo(
        logo,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 items-start">
          
          {/* Left: Taste the Tradition */}
          <div className="md:col-span-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
              Taste the{" "}
              <span className="font-serif italic font-normal bg-gradient-to-r from-[#F2F2F0] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent">
                Tradition.
              </span>
            </h2>
            <p className="text-[#A7ACB4] max-w-md text-base leading-relaxed mb-6">
              La&apos;Crispo is a premium snack brand from Hebron Group, delivering traditional South Indian flavours and artisan crisps with pure quality and minimum oil.
            </p>

            {/* Direct Action Buttons: Get In Touch, Direct WhatsApp & Direct Email */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#E5A855] to-[#C96F32] text-[#0B0C0E] font-bold text-xs tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(229,168,85,0.3)] hover:shadow-[0_0_30px_rgba(229,168,85,0.45)] hover:scale-[1.02] active:scale-100 transition-all duration-300"
              >
                <span>Get In Touch</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              {/* Direct WhatsApp Button */}
              <a
                href="https://wa.me/919995566396"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/35 hover:border-[#25D366] text-[#25D366] hover:text-white transition-all text-xs font-mono font-bold shadow-[0_0_20px_rgba(37,211,102,0.15)] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:scale-[1.02] active:scale-100"
                aria-label="Direct WhatsApp Chat with La Crispo"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Direct Mailto Email Button */}
              <a
                href="mailto:info@hebrongroup.com?subject=La%20Crispo%20Inquiry"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#E5A855]/50 text-[#C7CBD1] hover:text-white transition-all text-xs font-mono group"
                aria-label="Direct Email to info@hebrongroup.com"
              >
                <svg className="w-3.5 h-3.5 text-[#E5A855]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@hebrongroup.com</span>
                <span className="text-[#858B94] text-[10px] group-hover:text-[#E5A855] transition-colors">↗</span>
              </a>
            </div>

            <div className="text-xs text-[#858B94] font-mono space-y-1">
              <p className="text-white font-semibold">Hebron Consumables Enterprises</p>
              <p>Pettah, Trivandrum, Kerala – 695024</p>
              <p>Phone: <a href="tel:+919995566396" className="text-[#E5A855] hover:underline">+91 999 55 66 396</a></p>
            </div>
          </div>

          {/* Right: Essential Navigation & Connect */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 md:pl-10">
            <div>
              <h3 className="text-xs font-mono tracking-widest text-[#858B94] uppercase mb-4">
                Explore
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-[#A7ACB4] hover:text-[#E5A855] transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-[#A7ACB4] hover:text-white transition-colors">
                    Product Collection
                  </Link>
                </li>
                <li>
                  <Link href="/#flavours" className="text-[#A7ACB4] hover:text-white transition-colors">
                    Flavours
                  </Link>
                </li>
                <li>
                  <Link href="/#factory" className="text-[#A7ACB4] hover:text-white transition-colors">
                    The Craft
                  </Link>
                </li>
                <li>
                  <Link href="/#blog" className="text-[#A7ACB4] hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono tracking-widest text-[#858B94] uppercase mb-4">
                Connect
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/contact"
                    className="text-[#A7ACB4] hover:text-[#E5A855] transition-colors flex items-center gap-1.5"
                  >
                    <span>Contact Us (Form)</span>
                    <span className="text-[10px] text-[#858B94]">↗</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://wa.me/919995566396"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#A7ACB4] hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                  >
                    <span>WhatsApp Direct</span>
                    <span className="text-[10px] text-[#858B94]">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@hebrongroup.com?subject=La%20Crispo%20Inquiry"
                    className="text-[#A7ACB4] hover:text-[#E5A855] transition-colors flex items-center gap-1.5"
                  >
                    <span>Email Us</span>
                    <span className="text-[10px] text-[#858B94]">↗</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919995566396"
                    className="text-[#A7ACB4] hover:text-white transition-colors"
                  >
                    +91 999 55 66 396
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="text-[#A7ACB4] hover:text-white transition-colors">
                    Wholesale Enquiries
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Heritage & Rights */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#858B94]">
          <p>© {new Date().getFullYear()} La&apos;Crispo. A Brand by Hebron Group. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Heritage
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <span className="text-[#E5A855]">Made with Artisan Care</span>
          </div>
        </div>
      </div>

      {/* Massive Ambient Background Brand Typography */}
      <h2
        ref={logoRef}
        className="text-[14vw] font-serif italic text-white/5 whitespace-nowrap absolute -bottom-8 left-1/2 -translate-x-1/2 select-none pointer-events-none tracking-tighter"
        aria-hidden="true"
      >
        La Crispo
      </h2>
    </footer>
  );
}
