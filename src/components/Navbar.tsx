"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Our Story", href: "/about" },
  { name: "Flavours", href: "/#flavours" },
  { name: "Contact", href: "/contact" },
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
            className="group flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--surface-glass)] backdrop-blur-xl border border-[var(--border)] hover:border-[var(--border-strong)] transition-all duration-300 shadow-[var(--shadow-card)]"
            aria-label="La Crispo Home"
          >
            <span className="w-2 h-2 rounded-full bg-[#C96F32] animate-pulse" />
            <span className="text-sm sm:text-base font-serif italic tracking-[0.2em] uppercase text-[var(--text-primary)] font-bold group-hover:text-[var(--accent)] transition-colors">
              La Crispo
            </span>
          </Link>

          {/* Desktop Floating Navigation Pill (Title Bars) */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-all duration-500 shadow-[var(--shadow-card)] ${
              scrolled
                ? "bg-[var(--surface-glass-solid)] backdrop-blur-2xl border-[var(--border-strong)]"
                : "bg-[var(--surface-glass)] backdrop-blur-xl border-[var(--border)]"
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
                      ? "text-[var(--accent)] bg-[var(--border-subtle)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Direct CTA / Shop Now Button & Mobile Trigger */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#E5A855] to-[#C96F32] text-[#0B0C0E] text-[11px] font-bold uppercase tracking-[0.2em] shadow-[0_4px_15px_rgba(229,168,85,0.25)] hover:from-white hover:to-[#EAD0A1] hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <span>Shop Now</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-full bg-[var(--surface-glass)] backdrop-blur-xl border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`w-4 h-[1.5px] bg-[var(--text-primary)] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : "-translate-y-1"}`} />
              <span className={`w-4 h-[1.5px] bg-[var(--text-primary)] transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`w-4 h-[1.5px] bg-[var(--text-primary)] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : "translate-y-1"}`} />
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
            className="fixed inset-0 z-40 bg-[var(--background)]/98 flex flex-col justify-between p-8 pt-28 text-[var(--text-primary)]"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-mono font-bold">
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
                    className="text-2xl sm:text-3xl font-serif italic text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors block py-1"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-[var(--border)] flex flex-col gap-4">
              <Link
                href="/products"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center py-4 rounded-full bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-primary)] font-bold text-xs uppercase tracking-[0.2em] shadow-lg"
              >
                Browse Full Catalog
              </Link>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] text-center font-mono">
                La Crispo • Hebron Group © 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
