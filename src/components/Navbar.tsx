"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Our Story", href: "/about" },
  { name: "Blog", href: "/#blog" },
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
      {/* Minimalist Transparent Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] py-6 px-6 sm:px-12 lg:px-24 xl:px-32 pointer-events-none ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className={`w-full mx-auto flex items-center justify-between ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}>
          
          {/* Brand Wordmark (La Crispo) */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
            aria-label="La Crispo Home"
          >
            <div className="relative w-32 h-10 sm:w-40 sm:h-12 flex items-center">
              <Image 
                src="/logo-crispo-logo.png" 
                alt="La Crispo" 
                fill 
                className="object-contain object-left" 
                priority 
              />
            </div>
          </Link>

          {/* Desktop Minimalist Navigation */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === pathname ||
                (link.href.startsWith("/#") && pathname === "/" && false);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.2em] font-semibold transition-colors duration-300 relative group py-2 ${
                    isActive
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-[var(--accent)] transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>

          {/* Direct CTA & Mobile Trigger */}
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="hidden sm:inline-block text-[11px] uppercase tracking-[0.2em] font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-300 relative group py-2"
            >
              <span>Product Range</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--text-primary)] group-hover:bg-[var(--accent)] transform origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col items-end justify-center w-8 h-8 text-[var(--text-primary)] focus:outline-none group"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? "w-6 rotate-45 translate-y-[5px]" : "w-6 mb-1.5 group-hover:w-4"}`} />
              <span className={`h-[1.5px] bg-current transition-all duration-300 ${menuOpen ? "w-6 -rotate-45 -translate-y-[2.5px]" : "w-4 group-hover:w-6"}`} />
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
