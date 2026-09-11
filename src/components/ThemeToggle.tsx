"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "./ThemeProvider";

function subscribe() {
  return () => {};
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div 
        aria-hidden="true"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-12 h-12 rounded-full bg-[var(--surface-card)] border border-[var(--border)] shadow-[0_10px_25px_rgba(0,0,0,0.3)] opacity-0 pointer-events-none"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-[var(--surface-card)] hover:bg-[var(--surface-secondary)] border border-[var(--border)] text-[var(--text-primary)] shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:border-[var(--accent-gold)] hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] cursor-pointer group"
    >
      <span className="sr-only">Toggle theme</span>
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (Visible in dark mode to switch to light) */}
        <svg
          className={`w-5 h-5 text-[#EAD0A1] transition-all duration-300 transform ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0 absolute"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon Icon (Visible in light mode to switch to dark) */}
        <svg
          className={`w-5 h-5 text-[#C96F32] transition-all duration-300 transform ${
            !isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0 absolute"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>
    </button>
  );
}
