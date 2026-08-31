"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface MergingSnackCardProps {
  image: string;
  name: string;
}

export default function MergingSnackCard({ image, name }: MergingSnackCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full aspect-square rounded-[2rem] bg-gradient-to-b from-white via-white to-zinc-100 overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 shadow-inner border border-white/40 group cursor-pointer select-none transition-all duration-700 hover:shadow-[0_0_40px_rgba(234,208,161,0.3)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(!isHovered)}
    >
      {/* Studio Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,208,161,0.22),_transparent_70%)] opacity-80 pointer-events-none" />
      
      {/* Minimal Top Badge */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="bg-black/85 text-[#EAD0A1] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-[#EAD0A1]/30 shadow-sm backdrop-blur-md">
          Signature
        </span>
      </div>

      {/* Merging Ingredients Layer (Floating Around -> Converging into Center) */}
      
      {/* 1. Crispy Golden Chip (Top-Left) */}
      <motion.div
        animate={{
          x: isHovered ? 0 : -62,
          y: isHovered ? 0 : -55,
          scale: isHovered ? 0.1 : 1,
          opacity: isHovered ? 0 : 1,
          rotate: isHovered ? 90 : [-12, -18, -12],
        }}
        transition={{
          duration: isHovered ? 0.45 : 3.5,
          repeat: isHovered ? 0 : Infinity,
          ease: isHovered ? [0.4, 0, 0.2, 1] : "easeInOut",
        }}
        className="absolute z-10 w-24 h-24 sm:w-28 sm:h-28 pointer-events-none"
        style={{ mixBlendMode: "multiply" }}
      >
        <Image
          src="/images/chip_single.jpg"
          alt="Fresh Potato Crisp"
          fill
          className="object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
          sizes="112px"
        />
      </motion.div>

      {/* 2. Ripe Tomato Slice (Top-Right) */}
      <motion.div
        animate={{
          x: isHovered ? 0 : 64,
          y: isHovered ? 0 : -50,
          scale: isHovered ? 0.1 : 1,
          opacity: isHovered ? 0 : 1,
          rotate: isHovered ? -120 : [15, 22, 15],
        }}
        transition={{
          duration: isHovered ? 0.45 : 4,
          repeat: isHovered ? 0 : Infinity,
          ease: isHovered ? [0.4, 0, 0.2, 1] : "easeInOut",
        }}
        className="absolute z-10 w-20 h-20 sm:w-24 sm:h-24 pointer-events-none"
        style={{ mixBlendMode: "multiply" }}
      >
        <Image
          src="/images/tomato_slice.jpg"
          alt="Fresh Ripe Tomato"
          fill
          className="object-contain drop-shadow-[0_8px_16px_rgba(220,38,38,0.15)]"
          sizes="96px"
        />
      </motion.div>

      {/* 3. Secondary Crispy Chip (Bottom-Left) */}
      <motion.div
        animate={{
          x: isHovered ? 0 : -58,
          y: isHovered ? 0 : 52,
          scale: isHovered ? 0.1 : 0.82,
          opacity: isHovered ? 0 : 0.9,
          rotate: isHovered ? -180 : [28, 35, 28],
        }}
        transition={{
          duration: isHovered ? 0.45 : 3.8,
          repeat: isHovered ? 0 : Infinity,
          ease: isHovered ? [0.4, 0, 0.2, 1] : "easeInOut",
        }}
        className="absolute z-10 w-20 h-20 sm:w-22 sm:h-22 pointer-events-none"
        style={{ mixBlendMode: "multiply" }}
      >
        <Image
          src="/images/chip_single.jpg"
          alt="Golden Crisp"
          fill
          className="object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.1)]"
          sizes="88px"
        />
      </motion.div>

      {/* 4. Seasoning / Spice Accent (Bottom-Right) */}
      <motion.div
        animate={{
          x: isHovered ? 0 : 58,
          y: isHovered ? 0 : 48,
          scale: isHovered ? 0.1 : 0.78,
          opacity: isHovered ? 0 : 0.85,
          rotate: isHovered ? 180 : [-20, -12, -20],
        }}
        transition={{
          duration: isHovered ? 0.45 : 4.2,
          repeat: isHovered ? 0 : Infinity,
          ease: isHovered ? [0.4, 0, 0.2, 1] : "easeInOut",
        }}
        className="absolute z-10 w-18 h-18 sm:w-20 sm:h-20 pointer-events-none"
        style={{ mixBlendMode: "multiply" }}
      >
        <Image
          src="/images/tomato_slice.jpg"
          alt="Tomato Seasoning"
          fill
          className="object-contain drop-shadow-[0_6px_12px_rgba(220,38,38,0.12)]"
          sizes="80px"
        />
      </motion.div>

      {/* Merge Energy Ripple */}
      {isHovered && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0.8 }}
          animate={{ scale: 1.35, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute w-44 h-44 rounded-full border-2 border-[#EAD0A1] pointer-events-none z-10"
        />
      )}

      {/* Central Assembled Pack */}
      <div className="relative w-full h-[82%] flex items-center justify-center z-15">
        <motion.div
          animate={{
            scale: isHovered ? 1.12 : 0.95,
            y: isHovered ? -8 : [0, -6, 0],
            rotate: isHovered ? 2 : 0,
          }}
          transition={{
            scale: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
            y: isHovered ? { duration: 0.4 } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 0.4 },
          }}
          className="relative w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </motion.div>
      </div>

      {/* Ground Contact Shadow on White Studio Pedestal */}
      <motion.div
        animate={{
          scale: isHovered ? 0.75 : [0.9, 0.96, 0.9],
          opacity: isHovered ? 0.35 : [0.2, 0.28, 0.2],
        }}
        transition={{
          scale: isHovered ? { duration: 0.4 } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: isHovered ? { duration: 0.4 } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="w-1/2 h-2.5 bg-black/20 blur-sm rounded-full mt-2"
      />
    </div>
  );
}
