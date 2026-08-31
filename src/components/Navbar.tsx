"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Flavours", href: "#flavours" },
  { name: "Collection", href: "#collection" },
  { name: "Craft", href: "#factory" },
  { name: "Story", href: "#about" },
  { name: "Journal", href: "#blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Header Container */}
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out py-4 sm:py-6 px-4 sm:px-8 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 px-4 py-2 rounded-full bg-[#111317]/85 backdrop-blur-xl border border-[#C7CBD1]/20 hover:border-[#E6E8EB]/50 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            aria-label="La Crispo Home"
          >
            <span className="w-2 h-2 rounded-full bg-[#C96F32] animate-pulse" />
            <span className="text-sm sm:text-base font-serif italic tracking-[0.2em] uppercase text-[#F2F2F0] font-bold group-hover:text-[#E6E8EB] transition-colors">
              La Crispo
            </span>
          </Link>

          {/* Desktop Floating Navigation Pill */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${
              scrolled
                ? "bg-[#181B20]/95 backdrop-blur-2xl border-[#C7CBD1]/30"
                : "bg-[#111317]/80 backdrop-blur-xl border-[#C7CBD1]/20"
            }`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.25em] font-semibold text-[#A7ACB4] hover:text-[#F2F2F0] hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Direct CTA / Catalog Shortcut & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#181B20] to-[#111317] border border-[#C7CBD1]/35 text-[#F2F2F0] text-[11px] font-bold uppercase tracking-[0.2em] hover:border-[#E6E8EB] hover:scale-105 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] group"
            >
              <span className="group-hover:text-[#E5A855] transition-colors">Product Range</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full bg-[#111317]/90 backdrop-blur-xl border border-[#C7CBD1]/25 text-[#F2F2F0] focus:outline-none focus:ring-2 focus:ring-[#C7CBD1]"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`w-4 h-[1.5px] bg-[#F2F2F0] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : "-translate-y-1"}`} />
              <span className={`w-4 h-[1.5px] bg-[#F2F2F0] transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`w-4 h-[1.5px] bg-[#F2F2F0] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-[#0B0C0E]/98 flex flex-col justify-between p-8 pt-28"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#858B94] font-mono font-bold">
                Navigation Index
              </span>
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-serif italic text-[#F2F2F0] hover:text-[#C7CBD1] transition-colors block py-1"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-4 rounded-full bg-[#181B20] border border-[#C7CBD1]/30 text-[#F2F2F0] font-bold text-xs uppercase tracking-[0.2em] shadow-lg"
              >
                Browse Full Catalog
              </Link>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#858B94] text-center font-mono">
                La Crispo Artisan Crisps © 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
