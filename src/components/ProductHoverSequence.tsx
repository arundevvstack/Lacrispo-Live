"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProductHoverSequenceProps {
  image: string;
  name: string;
  slug?: string;
  isSignature?: boolean;
  size?: "large" | "compact";
}

export default function ProductHoverSequence({
  image,
  name,
  slug = "",
  isSignature = false,
  size = "large",
}: ProductHoverSequenceProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Flavor identification
  const isTomato = slug.includes("tomato") || slug.includes("sweet-chili") || slug.includes("paprika") || image.includes("red");
  const isHerb = slug.includes("rosemary") || slug.includes("thyme") || slug.includes("truffle");
  const isSeaSalt = slug.includes("sea-salt") || slug.includes("salt") || slug.includes("balsamic");

  // Mouse move handler for interactive 3D parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsClicked(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);
  };

  const isCompact = size === "compact";

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`relative w-full aspect-square ${
        isCompact ? "rounded-2xl max-w-[220px]" : "rounded-[2rem]"
      } bg-transparent overflow-hidden flex flex-col items-center justify-center p-3 sm:p-5 group cursor-pointer select-none transition-all duration-700 ${
        isHovered
          ? isTomato
            ? "shadow-[0_0_45px_rgba(239,68,68,0.25)]"
            : isHerb
            ? "shadow-[0_0_45px_rgba(34,197,94,0.25)]"
            : isSeaSalt
            ? "shadow-[0_0_45px_rgba(56,189,248,0.25)]"
            : "shadow-[0_0_45px_rgba(234,208,161,0.3)]"
          : "shadow-none"
      }`}
      style={{ perspective: 1000 }}
    >
      {/* Studio Radial Warm Glow */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(234,208,161,0.12),_transparent_70%)] pointer-events-none transition-opacity duration-500"
        style={{ opacity: isHovered ? 1 : 0.2 }}
      />

      {/* Signature Badge */}
      {isSignature && (
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <span className="bg-black/85 text-[#EAD0A1] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-[#EAD0A1]/30 shadow-sm backdrop-blur-md">
            Signature
          </span>
        </div>
      )}

      {/* ================= CENTRAL MAIN PACKET ONLY ================= */}
      <motion.div
        animate={{
          scale: isClicked ? 1.15 : isHovered ? 1.08 : 0.96,
          y: isHovered ? -6 : [0, -6, 0],
          rotateX: isHovered ? -mouseOffset.y * 10 : 0,
          rotateY: isHovered ? mouseOffset.x * 12 : 0,
          rotateZ: isHovered ? mouseOffset.x * 2 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 350, damping: 20 },
          y: isHovered ? { duration: 0.3 } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotateX: { type: "spring", stiffness: 300, damping: 25 },
          rotateY: { type: "spring", stiffness: 300, damping: 25 },
          rotateZ: { type: "spring", stiffness: 300, damping: 25 },
        }}
        className="relative w-full h-[84%] flex items-center justify-center z-15 drop-shadow-[0_18px_35px_rgba(0,0,0,0.18)]"
      >
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={`${name} Pack`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={isSignature}
          />

          {/* Glossy Reflection Sheen on Hover */}
          <motion.div
            animate={{
              opacity: isHovered ? [0, 0.55, 0] : 0,
              x: isHovered ? ["-100%", "200%"] : "-100%",
            }}
            transition={{
              duration: 1.2,
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/35 to-transparent pointer-events-none rotate-12"
          />
        </div>
      </motion.div>

      {/* Ground Contact Shadow */}
      <motion.div
        animate={{
          scale: isClicked ? 0.7 : isHovered ? 0.78 : [0.88, 0.94, 0.88],
          opacity: isHovered ? 0.38 : [0.22, 0.28, 0.22],
        }}
        transition={{
          scale: isHovered ? { duration: 0.3 } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: isHovered ? { duration: 0.3 } : { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="w-1/2 h-2.5 bg-black/20 blur-sm rounded-full mt-auto mb-1.5 z-5"
      />
    </div>
  );
}
