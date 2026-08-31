"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  progress: number; // 0 to 1
  isReady: boolean;
}

export default function LoadingScreen({ progress, isReady }: LoadingScreenProps) {
  const percentage = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0C0E] text-[#F2F2F0]"
        >
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-6 text-center">
            {/* Cinematic Title Reveal */}
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                className="text-5xl md:text-7xl font-serif italic tracking-tight text-[#F2F2F0] drop-shadow-[0_4px_24px_rgba(199,203,209,0.15)] leading-none"
              >
                La Crispo
              </motion.h1>
            </div>

            <div className="overflow-hidden mb-10">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#858B94] font-bold font-mono"
              >
                Entering The Flavour World
              </motion.p>
            </div>

            {/* High-End Polished Silver Progress Bar */}
            <div className="w-full md:w-80 h-[2px] bg-white/10 relative overflow-hidden rounded-full border border-white/5">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#858B94] via-[#E6E8EB] to-[#C96F32]"
                initial={{ width: "0%" }}
                animate={{ width: `${percentage}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>

            <div className="mt-5 overflow-hidden">
              <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[10px] tracking-[0.4em] text-[#A7ACB4] tabular-nums font-mono font-semibold"
              >
                {String(percentage).padStart(3, "0")}%
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
