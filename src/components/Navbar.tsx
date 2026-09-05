"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Flavours", href: "/#flavours" },
  { name: "Collection", href: "/products" },
  { name: "Craft", href: "/#factory" },
  { name: "Blog", href: "/#blog" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      // When at top of page, stay visible
      if (currentScrollY <= 40) {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsVisible(true);
        return;
      }

      // While scrolling down/through the page, hide the header
      setIsVisible(false);

      // Reset timer: reappear after 10 seconds of no scroll activity
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsVisible(true);
      }, 10000); // 10 seconds
    };

    // Show header when mouse hovers near top edge
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 60) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      {/* Floating Header Container with Timed Scroll Auto-Hide & 10s Reappearance */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] py-4 sm:py-6 px-4 sm:px-8 pointer-events-none ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-28 opacity-0"
        }`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}>
          
          {/* Brand Wordmark (La Crispo) */}
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

          {/* Desktop Floating Navigation Pill (Title Bars) */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.5)] ${
              scrolled
                ? "bg-[#181B20]/95 backdrop-blur-2xl border-[#C7CBD1]/30"
                : "bg-[#111317]/80 backdrop-blur-xl border-[#C7CBD1]/20"
            }`}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.href.startsWith("/#") && pathname === "/" && false);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-[#E5A855] bg-white/10"
                      : "text-[#A7ACB4] hover:text-[#F2F2F0] hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Direct CTA / Catalog Shortcut (Product Range) & Mobile Trigger */}
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
                    className="text-2xl sm:text-3xl font-serif italic text-[#F2F2F0] hover:text-[#E5A855] transition-colors block py-1"
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
                La Crispo • Hebron Group © 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
