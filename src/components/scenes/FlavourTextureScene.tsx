"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

// The 3 supplied signature product packets in exact required sequence:
// 01 — RED PACKET (Classic Tomato / Archer & Finch)
// 02 — ORANGE PACKET (Spicy Masala / Artisan Crisps)
// 03 — BLACK PACKET (Truffle Cheese / Golden Harvest Luxury Pack)
const threePacks = [
  {
    ...(products.find((p) => p.slug === "classic-tomato") || products[0]),
    image: "/images/anatomy_red.png",
  },
  {
    ...(products.find((p) => p.slug === "spicy-masala") || products[1]),
    image: "/images/anatomy_orange.png",
  },
  {
    ...(products.find((p) => p.slug === "truffle-cheese") || products[2]),
    image: "/images/anatomy_black.png",
  },
];

export default function FlavourTextureScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage3dRef = useRef<HTMLDivElement>(null);
  const redPackRef = useRef<HTMLDivElement>(null);
  const orangePackRef = useRef<HTMLDivElement>(null);
  const blackPackRef = useRef<HTMLDivElement>(null);
  const redGlowRef = useRef<HTMLDivElement>(null);
  const orangeGlowRef = useRef<HTMLDivElement>(null);
  const silverGlowRef = useRef<HTMLDivElement>(null);
  const redSectionBgRef = useRef<HTMLDivElement>(null);
  const orangeSectionBgRef = useRef<HTMLDivElement>(null);
  const silverSectionBgRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<(HTMLDivElement | null)[]>([]);
  const chipFgRef = useRef<HTMLDivElement>(null);
  const chipMgRef = useRef<HTMLDivElement>(null);
  const chipBgRef = useRef<HTMLDivElement>(null);

  const headingGroupRef = useRef<HTMLDivElement>(null);
  const ingredientNodesRef = useRef<HTMLDivElement>(null);
  const textureMetricsRef = useRef<HTMLDivElement>(null);

  const [activeFlavourIndex, setActiveFlavourIndex] = useState(0);

  const [isReducedMotion, setIsReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 768px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMq = window.matchMedia("(max-width: 768px)");

    const onMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    const onMobileChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    motionMq.addEventListener("change", onMotionChange);
    mobileMq.addEventListener("change", onMobileChange);

    return () => {
      motionMq.removeEventListener("change", onMotionChange);
      mobileMq.removeEventListener("change", onMobileChange);
    };
  }, []);

  // 3D Scroll-Driven Product Timeline
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=450%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // 3-phase live product data mapping:
            // 0.00 -> 0.40: Red Packet (Classic Tomato)
            // 0.40 -> 0.72: Orange Packet (Spicy Masala)
            // 0.72 -> 1.00: Black Packet (Truffle Cheese)
            let idx = 0;
            if (p >= 0.72) {
              idx = 2;
            } else if (p >= 0.4) {
              idx = 1;
            } else {
              idx = 0;
            }
            setActiveFlavourIndex(idx);
          },
        },
      });

      if (isReducedMotion) {
        // Reduced motion: simple graceful cross-fades
        tl.to(headingGroupRef.current, { opacity: 1, duration: 0.1 }, 0)
          .to(ingredientNodesRef.current, { opacity: 1, duration: 0.1 }, 0)
          .to(textureMetricsRef.current, { opacity: 1, duration: 0.1 }, 0)
          .to(redSectionBgRef.current, { opacity: 1, duration: 0.3 }, 0)
          .to(redGlowRef.current, { opacity: 1, duration: 0.3 }, 0)
          .to(redPackRef.current, { opacity: 1, duration: 0.3 }, 0)
          .to(redSectionBgRef.current, { opacity: 0, duration: 0.1 }, 0.35)
          .to(redGlowRef.current, { opacity: 0, duration: 0.1 }, 0.35)
          .to(redPackRef.current, { opacity: 0, duration: 0.1 }, 0.35)
          .to(orangeSectionBgRef.current, { opacity: 1, duration: 0.3 }, 0.4)
          .to(orangeGlowRef.current, { opacity: 1, duration: 0.3 }, 0.4)
          .to(orangePackRef.current, { opacity: 1, duration: 0.3 }, 0.4)
          .to(orangeSectionBgRef.current, { opacity: 0, duration: 0.1 }, 0.7)
          .to(orangeGlowRef.current, { opacity: 0, duration: 0.1 }, 0.7)
          .to(orangePackRef.current, { opacity: 0, duration: 0.1 }, 0.7)
          .to(silverSectionBgRef.current, { opacity: 1, duration: 0.3 }, 0.75)
          .to(silverGlowRef.current, { opacity: 1, duration: 0.3 }, 0.75)
          .to(blackPackRef.current, { opacity: 1, duration: 0.3 }, 0.75);

        chipsRef.current.forEach((c) => {
          if (c) {
            tl.to(c, { opacity: 0.85, duration: 0.3 }, 0)
              .to(c, { opacity: 0, duration: 0.1 }, 0.92);
          }
        });
      } else {
        // Step 1: Heading Entrance
        tl.fromTo(
          headingGroupRef.current,
          { opacity: 0, y: -40 },
          { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
          0.02
        );

        // Step 2: Layered Spatial Ingredient Node Reveal — Single Combined Card Framing Product
        if (ingredientNodesRef.current) {
          tl.fromTo(
            ingredientNodesRef.current,
            { opacity: 0, scale: 0.9, y: 15 },
            { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "power2.out" },
            0.08
          );

          tl.to(
            ingredientNodesRef.current,
            { x: isMobile ? 0 : 12, y: isMobile ? 0 : -8, duration: 0.6, ease: "none" },
            0.25
          );
        }

        // Texture Metrics Entrance
        tl.fromTo(
          textureMetricsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
          0.1
        );

        // ================= 3D PRODUCT 01 — RED PACKET + 5 FLOATING CHIPS =================
        // Starts in depth -> approaches camera -> rotates in 3D -> reaches focal plane -> exits
        tl.fromTo(
          redSectionBgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.28, ease: "power2.out" },
          0.04
        );

        tl.fromTo(
          redGlowRef.current,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, duration: 0.28, ease: "power2.out" },
          0.04
        );

        // 5 Floating 3D Chips entrance for Red Packet
        if (chipsRef.current[0]) tl.fromTo(chipsRef.current[0], { opacity: 0, scale: 0.5, z: -140, rotateX: 30, rotateY: -35, rotateZ: -20, y: 30 }, { opacity: 1, scale: 1, z: 45, rotateX: 16, rotateY: -18, rotateZ: -10, y: 0, duration: 0.28, ease: "power2.out" }, 0.04);
        if (chipsRef.current[1]) tl.fromTo(chipsRef.current[1], { opacity: 0, scale: 0.5, z: -160, rotateX: -25, rotateY: 35, rotateZ: 20, y: 30 }, { opacity: 1, scale: 0.95, z: -20, rotateX: -12, rotateY: 22, rotateZ: 14, y: 0, duration: 0.28, ease: "power2.out" }, 0.04);
        if (chipsRef.current[2]) tl.fromTo(chipsRef.current[2], { opacity: 0, scale: 0.5, z: -180, rotateX: 30, rotateY: -25, rotateZ: 35, y: 30 }, { opacity: 1, scale: 0.9, z: -45, rotateX: 18, rotateY: -12, rotateZ: 28, y: 0, duration: 0.28, ease: "power2.out" }, 0.04);
        if (chipsRef.current[3]) tl.fromTo(chipsRef.current[3], { opacity: 0, scale: 0.6, z: -100, rotateX: -35, rotateY: 25, rotateZ: -25, y: 30 }, { opacity: 1, scale: 1.05, z: 65, rotateX: -18, rotateY: 12, rotateZ: -16, y: 0, duration: 0.28, ease: "power2.out" }, 0.04);
        if (chipsRef.current[4]) tl.fromTo(chipsRef.current[4], { opacity: 0, scale: 0.5, z: -150, rotateX: 20, rotateY: -40, rotateZ: 15, y: 30 }, { opacity: 1, scale: 0.92, z: 15, rotateX: 10, rotateY: -25, rotateZ: 8, y: 0, duration: 0.28, ease: "power2.out" }, 0.04);

        tl.fromTo(
          redPackRef.current,
          {
            opacity: 0,
            scale: 0.62,
            z: -250,
            y: 35,
            rotateX: 18,
            rotateY: isMobile ? -8 : -18,
            rotateZ: -4,
          },
          {
            opacity: 1,
            scale: 0.90,
            z: 25,
            y: 0,
            rotateX: -2,
            rotateY: isMobile ? 2 : 4,
            rotateZ: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          0.04
        );

        tl.to(
          redSectionBgRef.current,
          { opacity: 0, duration: 0.16, ease: "power2.in" },
          0.34
        );

        tl.to(
          redGlowRef.current,
          { opacity: 0, scale: 1.08, duration: 0.16, ease: "power2.in" },
          0.34
        );

        // Exit Red Chips
        chipsRef.current.forEach((c) => {
          if (c) tl.to(c, { opacity: 0, scale: 1.1, z: 100, y: -35, duration: 0.16, ease: "power2.in" }, 0.34);
        });

        tl.to(
          redPackRef.current,
          {
            opacity: 0,
            scale: 1.02,
            z: 120,
            y: -40,
            rotateX: -12,
            rotateY: isMobile ? 6 : 14,
            duration: 0.16,
            ease: "power2.in",
          },
          0.34
        );

        // ================= 3D PRODUCT 02 — ORANGE PACKET + 5 FLOATING CHIPS =================
        // Emerges from depth -> moves forward -> rotates in 3D -> focal plane hero -> exits
        tl.fromTo(
          orangeSectionBgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.28, ease: "power2.out" },
          0.38
        );

        tl.fromTo(
          orangeGlowRef.current,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, duration: 0.28, ease: "power2.out" },
          0.38
        );

        // 5 Floating 3D Chips entrance for Orange Packet
        if (chipsRef.current[0]) tl.fromTo(chipsRef.current[0], { opacity: 0, scale: 0.6, z: -160, rotateX: -20, rotateY: 30, y: 35 }, { opacity: 1, scale: 0.96, z: 35, rotateX: -14, rotateY: 20, rotateZ: -8, y: 0, duration: 0.28, ease: "power2.out" }, 0.38);
        if (chipsRef.current[1]) tl.fromTo(chipsRef.current[1], { opacity: 0, scale: 0.5, z: -150, rotateX: 30, rotateY: -30, y: 35 }, { opacity: 1, scale: 1, z: -15, rotateX: 16, rotateY: -18, rotateZ: 12, y: 0, duration: 0.28, ease: "power2.out" }, 0.38);
        if (chipsRef.current[2]) tl.fromTo(chipsRef.current[2], { opacity: 0, scale: 0.5, z: -170, rotateX: -25, rotateY: 20, y: 35 }, { opacity: 1, scale: 0.92, z: -35, rotateX: -15, rotateY: 16, rotateZ: 22, y: 0, duration: 0.28, ease: "power2.out" }, 0.38);
        if (chipsRef.current[3]) tl.fromTo(chipsRef.current[3], { opacity: 0, scale: 0.6, z: -110, rotateX: 25, rotateY: -18, y: 35 }, { opacity: 1, scale: 1.08, z: 55, rotateX: 15, rotateY: -12, rotateZ: -14, y: 0, duration: 0.28, ease: "power2.out" }, 0.38);
        if (chipsRef.current[4]) tl.fromTo(chipsRef.current[4], { opacity: 0, scale: 0.5, z: -160, rotateX: -15, rotateY: 35, y: 35 }, { opacity: 1, scale: 0.9, z: 20, rotateX: -8, rotateY: 22, rotateZ: 6, y: 0, duration: 0.28, ease: "power2.out" }, 0.38);

        tl.fromTo(
          orangePackRef.current,
          {
            opacity: 0,
            scale: 0.58,
            z: -280,
            y: 40,
            rotateX: -12,
            rotateY: isMobile ? 8 : 20,
            rotateZ: 5,
          },
          {
            opacity: 1,
            scale: 0.90,
            z: 25,
            y: 0,
            rotateX: 2,
            rotateY: isMobile ? -2 : -4,
            rotateZ: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          0.38
        );

        tl.to(
          orangeSectionBgRef.current,
          { opacity: 0, duration: 0.16, ease: "power2.in" },
          0.66
        );

        tl.to(
          orangeGlowRef.current,
          { opacity: 0, scale: 1.08, duration: 0.16, ease: "power2.in" },
          0.66
        );

        // Exit Orange Chips
        chipsRef.current.forEach((c) => {
          if (c) tl.to(c, { opacity: 0, scale: 1.1, z: 100, y: -35, duration: 0.16, ease: "power2.in" }, 0.66);
        });

        tl.to(
          orangePackRef.current,
          {
            opacity: 0,
            scale: 1.02,
            z: 120,
            y: -40,
            rotateX: -12,
            rotateY: isMobile ? -6 : -14,
            duration: 0.16,
            ease: "power2.in",
          },
          0.66
        );

        // ================= 3D PRODUCT 03 — BLACK PACKET + 5 FLOATING CHIPS =================
        // Emerges from depth -> moves forward -> rotates subtly -> settles as final hero
        tl.fromTo(
          silverSectionBgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.26, ease: "power2.out" },
          0.7
        );

        tl.fromTo(
          silverGlowRef.current,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, duration: 0.26, ease: "power2.out" },
          0.7
        );

        // 5 Floating 3D Chips entrance for Black Packet
        if (chipsRef.current[0]) tl.fromTo(chipsRef.current[0], { opacity: 0, scale: 0.6, z: -160, rotateX: 18, rotateY: -25, y: 30 }, { opacity: 1, scale: 1, z: 40, rotateX: 10, rotateY: -14, rotateZ: -6, y: 0, duration: 0.26, ease: "power2.out" }, 0.70);
        if (chipsRef.current[1]) tl.fromTo(chipsRef.current[1], { opacity: 0, scale: 0.5, z: -150, rotateX: -20, rotateY: 25, y: 30 }, { opacity: 1, scale: 0.95, z: -25, rotateX: -10, rotateY: 18, rotateZ: 10, y: 0, duration: 0.26, ease: "power2.out" }, 0.70);
        if (chipsRef.current[2]) tl.fromTo(chipsRef.current[2], { opacity: 0, scale: 0.5, z: -170, rotateX: 25, rotateY: -16, y: 30 }, { opacity: 1, scale: 0.9, z: -40, rotateX: 14, rotateY: -10, rotateZ: 20, y: 0, duration: 0.26, ease: "power2.out" }, 0.70);
        if (chipsRef.current[3]) tl.fromTo(chipsRef.current[3], { opacity: 0, scale: 0.6, z: -100, rotateX: -25, rotateY: 20, y: 30 }, { opacity: 1, scale: 1.05, z: 50, rotateX: -12, rotateY: 10, rotateZ: -12, y: 0, duration: 0.26, ease: "power2.out" }, 0.70);
        if (chipsRef.current[4]) tl.fromTo(chipsRef.current[4], { opacity: 0, scale: 0.5, z: -150, rotateX: 12, rotateY: -30, y: 30 }, { opacity: 1, scale: 0.92, z: 15, rotateX: 6, rotateY: -20, rotateZ: 5, y: 0, duration: 0.26, ease: "power2.out" }, 0.70);

        tl.fromTo(
          blackPackRef.current,
          {
            opacity: 0,
            scale: 0.58,
            z: -280,
            y: 40,
            rotateX: 14,
            rotateY: isMobile ? -8 : -16,
            rotateZ: -3,
          },
          {
            opacity: 1,
            scale: 0.90,
            z: 25,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            duration: 0.26,
            ease: "power2.out",
          },
          0.7
        );

        // Final scene exit transition to Collection
        tl.to(
          [headingGroupRef.current, ingredientNodesRef.current, textureMetricsRef.current],
          { opacity: 0, y: -40, duration: 0.12, ease: "power2.in" },
          0.92
        );

        tl.to(
          [silverSectionBgRef.current, silverGlowRef.current],
          { opacity: 0, duration: 0.12, ease: "power2.in" },
          0.92
        );

        // Exit Black Chips
        chipsRef.current.forEach((c) => {
          if (c) tl.to(c, { opacity: 0, scale: 1.15, duration: 0.12, ease: "power2.in" }, 0.92);
        });

        tl.to(
          blackPackRef.current,
          { scale: 1.12, opacity: 0.25, duration: 0.12, ease: "power2.in" },
          0.92
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isReducedMotion, isMobile]);

  // Multi-Layer Shallow 3D Depth Mouse Parallax with Arc Rotation for Floating Chips
  useEffect(() => {
    if (isReducedMotion || isMobile || !containerRef.current) return;

    const fgXTo = chipFgRef.current
      ? gsap.quickTo(chipFgRef.current, "x", { duration: 0.6, ease: "power2.out" })
      : null;
    const fgYTo = chipFgRef.current
      ? gsap.quickTo(chipFgRef.current, "y", { duration: 0.6, ease: "power2.out" })
      : null;
    const fgRotZTo = chipFgRef.current
      ? gsap.quickTo(chipFgRef.current, "rotateZ", { duration: 0.6, ease: "power2.out" })
      : null;
    const fgRotYTo = chipFgRef.current
      ? gsap.quickTo(chipFgRef.current, "rotateY", { duration: 0.6, ease: "power2.out" })
      : null;
    const fgRotXTo = chipFgRef.current
      ? gsap.quickTo(chipFgRef.current, "rotateX", { duration: 0.6, ease: "power2.out" })
      : null;

    const mgXTo = chipMgRef.current
      ? gsap.quickTo(chipMgRef.current, "x", { duration: 0.7, ease: "power2.out" })
      : null;
    const mgYTo = chipMgRef.current
      ? gsap.quickTo(chipMgRef.current, "y", { duration: 0.7, ease: "power2.out" })
      : null;
    const mgRotZTo = chipMgRef.current
      ? gsap.quickTo(chipMgRef.current, "rotateZ", { duration: 0.7, ease: "power2.out" })
      : null;
    const mgRotYTo = chipMgRef.current
      ? gsap.quickTo(chipMgRef.current, "rotateY", { duration: 0.7, ease: "power2.out" })
      : null;
    const mgRotXTo = chipMgRef.current
      ? gsap.quickTo(chipMgRef.current, "rotateX", { duration: 0.7, ease: "power2.out" })
      : null;

    const bgXTo = chipBgRef.current
      ? gsap.quickTo(chipBgRef.current, "x", { duration: 0.8, ease: "power2.out" })
      : null;
    const bgYTo = chipBgRef.current
      ? gsap.quickTo(chipBgRef.current, "y", { duration: 0.8, ease: "power2.out" })
      : null;
    const bgRotZTo = chipBgRef.current
      ? gsap.quickTo(chipBgRef.current, "rotateZ", { duration: 0.8, ease: "power2.out" })
      : null;
    const bgRotYTo = chipBgRef.current
      ? gsap.quickTo(chipBgRef.current, "rotateY", { duration: 0.8, ease: "power2.out" })
      : null;
    const bgRotXTo = chipBgRef.current
      ? gsap.quickTo(chipBgRef.current, "rotateX", { duration: 0.8, ease: "power2.out" })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;

      // Foreground Layer: Translation (±20px/±14px) + Arc Rotation (±8° roll, ±10° yaw, ±6° pitch)
      if (fgXTo && fgYTo) {
        fgXTo(nx * 20);
        fgYTo(ny * 14);
      }
      if (fgRotZTo && fgRotYTo && fgRotXTo) {
        fgRotZTo(nx * 8);
        fgRotYTo(nx * 10);
        fgRotXTo(-ny * 6);
      }

      // Midground Layer: Translation (±14px/±9px) + Arc Rotation (±5° roll, ±7° yaw, ±4° pitch)
      if (mgXTo && mgYTo) {
        mgXTo(nx * 14);
        mgYTo(ny * 9);
      }
      if (mgRotZTo && mgRotYTo && mgRotXTo) {
        mgRotZTo(nx * 5);
        mgRotYTo(nx * 7);
        mgRotXTo(-ny * 4);
      }

      // Background Layer: Translation (±8px/±5px) + Arc Rotation (±3° roll, ±4° yaw, ±3° pitch)
      if (bgXTo && bgYTo) {
        bgXTo(nx * 8);
        bgYTo(ny * 5);
      }
      if (bgRotZTo && bgRotYTo && bgRotXTo) {
        bgRotZTo(nx * 3);
        bgRotYTo(nx * 4);
        bgRotXTo(-ny * 3);
      }
    };

    const handleMouseLeave = () => {
      // Smoothly return all chip layers to neutral (0, 0, 0, 0, 0) on mouse exit
      if (fgXTo && fgYTo && fgRotZTo && fgRotYTo && fgRotXTo) {
        fgXTo(0);
        fgYTo(0);
        fgRotZTo(0);
        fgRotYTo(0);
        fgRotXTo(0);
      }
      if (mgXTo && mgYTo && mgRotZTo && mgRotYTo && mgRotXTo) {
        mgXTo(0);
        mgYTo(0);
        mgRotZTo(0);
        mgRotYTo(0);
        mgRotXTo(0);
      }
      if (bgXTo && bgYTo && bgRotZTo && bgRotYTo && bgRotXTo) {
        bgXTo(0);
        bgYTo(0);
        bgRotZTo(0);
        bgRotYTo(0);
        bgRotXTo(0);
      }
    };

    const container = containerRef.current;
    window.addEventListener("mousemove", handleMouseMove);
    if (container) {
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (container) {
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isReducedMotion, isMobile]);

  const activeProduct = threePacks[activeFlavourIndex] || threePacks[0];

  return (
    <section
      ref={containerRef}
      id="flavours"
      className="h-screen w-full relative bg-[#0B0C0E] overflow-hidden text-[#F2F2F0] select-none"
      aria-label="La Crispo Flavour and Texture Experience"
    >
      {/* Dark Graphite Atmosphere with Soft Ambient Specular Lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(199,203,209,0.08),transparent_65%)]" />

      {/* Dynamic Ambient Background Tints for Active Packets */}
      {/* Red Background Tint for Red Packet */}
      <div
        ref={redSectionBgRef}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(220,35,45,0.14)_0%,rgba(160,20,30,0.05)_50%,transparent_75%)] opacity-0 will-change-transform"
      />

      {/* Orange Background Tint for Orange Packet */}
      <div
        ref={orangeSectionBgRef}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(245,105,25,0.14)_0%,rgba(180,70,10,0.05)_50%,transparent_75%)] opacity-0 will-change-transform"
      />

      {/* Black + Silver Background Tint for Black Packet */}
      <div
        ref={silverSectionBgRef}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_45%,rgba(200,205,215,0.12)_0%,rgba(120,125,135,0.04)_50%,transparent_75%)] opacity-0 will-change-transform"
      />

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 sm:px-12 py-8 flex flex-col justify-between">
        
        {/* Scene Header */}
        <div ref={headingGroupRef} className="pt-14 sm:pt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5A855]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C7CBD1] font-bold font-mono">
                02 / Spatial Flavour & Texture
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif italic tracking-tight text-[#F2F2F0]">
              Anatomy of the Crunch
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#858B94] font-mono font-medium">
              Live Profile:
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#181B20] border border-[#C7CBD1]/30 text-[#E6E8EB] text-xs font-bold shadow-md transition-all duration-300">
              {activeProduct.name}
            </span>
          </div>
        </div>

        {/* Spatial Central Composition: 3D Product Stage & Spatial Ingredient Nodes */}
        <div className="relative flex-1 flex items-center justify-center my-auto">
          
          {/* 3D Spatial Product Stage */}
          <div
            ref={stage3dRef}
            className="relative w-[210px] h-[315px] sm:w-[250px] sm:h-[375px] md:w-[280px] md:h-[420px] flex items-center justify-center z-10 will-change-transform"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            {/* Background Glow Layer Behind Active Packets */}
            {/* RED GLOW — Subtle deep red (approx 10-14% opacity) for Red Packet */}
            <div
              ref={redGlowRef}
              className="absolute -inset-8 sm:-inset-16 rounded-full bg-[radial-gradient(circle_at_center,rgba(220,35,45,0.14)_0%,rgba(220,35,45,0.06)_45%,transparent_70%)] blur-2xl pointer-events-none opacity-0 will-change-transform"
            />

            {/* ORANGE GLOW — Subtle warm orange (approx 10-14% opacity) for Orange Packet */}
            <div
              ref={orangeGlowRef}
              className="absolute -inset-8 sm:-inset-16 rounded-full bg-[radial-gradient(circle_at_center,rgba(245,105,25,0.14)_0%,rgba(245,105,25,0.06)_45%,transparent_70%)] blur-2xl pointer-events-none opacity-0 will-change-transform"
            />

            {/* LIGHT SILVER GLOW — Subtle light silver (approx 10-12% opacity) for Black Packet */}
            <div
              ref={silverGlowRef}
              className="absolute -inset-8 sm:-inset-16 rounded-full bg-[radial-gradient(circle_at_center,rgba(220,225,230,0.12)_0%,rgba(220,225,230,0.05)_45%,transparent_70%)] blur-2xl pointer-events-none opacity-0 will-change-transform"
            />

            {/* PRODUCT 01 — RED PACKET (Classic Tomato) */}
            <div
              ref={redPackRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 will-change-transform z-15"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
                <Image
                  src={threePacks[0].image}
                  alt={threePacks[0].name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 256px, 384px"
                  priority
                />
              </div>
            </div>

            {/* PRODUCT 02 — ORANGE PACKET (Spicy Masala) */}
            <div
              ref={orangePackRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 will-change-transform z-15"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
                <Image
                  src={threePacks[1].image}
                  alt={threePacks[1].name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 256px, 384px"
                  priority
                />
              </div>
            </div>

            {/* PRODUCT 03 — BLACK PACKET (Truffle Cheese / Black Luxury Pack) */}
            <div
              ref={blackPackRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 will-change-transform z-15"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative w-full h-full flex items-center justify-center drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
                <Image
                  src={threePacks[2].image}
                  alt={threePacks[2].name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 256px, 384px"
                  priority
                />
              </div>
            </div>

            {/* 1. BACKGROUND CHIPS LAYER (Rear Depth: Weaker Parallax ±8px/±5px, Scale: Slightly Smaller, Blur: ~1px) */}
            <div
              ref={chipBgRef}
              className="absolute -inset-10 sm:-inset-16 md:-inset-20 pointer-events-none flex items-center justify-center z-5 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Chip 3: Bottom-Right (Single Crisp — Rear Background Depth: Subtle Blur) */}
              <div
                className="absolute bottom-[10%] -right-4 sm:-right-8 md:-right-10 w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18 scale-95"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  ref={(el) => { chipsRef.current[2] = el; }}
                  className="w-full h-full opacity-0 will-change-transform drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] blur-[1px]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className={`relative w-full h-full ${isReducedMotion ? "" : "animate-[spin_26s_linear_infinite]"}`}>
                    <Image
                      src="/images/chip_orbit_3.png"
                      alt="La Crispo Crisp"
                      fill
                      className="object-contain"
                      sizes="75px"
                    />
                  </div>
                </div>
              </div>

              {/* Chip 5: Top-Left (Curved Crisp — Rear Background Depth: Subtle Blur) */}
              <div
                className="absolute top-[20%] -left-8 sm:-left-12 md:-left-16 w-11 h-11 sm:w-14 sm:h-14 md:w-17 md:h-17 scale-95"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  ref={(el) => { chipsRef.current[4] = el; }}
                  className="w-full h-full opacity-0 will-change-transform drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)] blur-[1px]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className={`relative w-full h-full ${isReducedMotion ? "" : "animate-[spin_25s_linear_infinite]"}`}>
                    <Image
                      src="/images/chip_orbit_2.png"
                      alt="La Crispo Crisp"
                      fill
                      className="object-contain"
                      sizes="70px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. MIDGROUND CHIPS LAYER (Mid Focal Depth: Medium Parallax ±14px/±9px, Scale: Normal, Blur: 0px / 100% Sharp) */}
            <div
              ref={chipMgRef}
              className="absolute -inset-10 sm:-inset-16 md:-inset-20 pointer-events-none flex items-center justify-center z-20 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Chip 2: Top-Right (Curved Crisp — Focal Plane Near Packet: 100% Crisp & Sharp) */}
              <div
                className="absolute top-[20%] -right-8 sm:-right-12 md:-right-16 w-13 h-13 sm:w-16 sm:h-16 md:w-20 md:h-20"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  ref={(el) => { chipsRef.current[1] = el; }}
                  className="w-full h-full opacity-0 will-change-transform drop-shadow-[0_14px_28px_rgba(0,0,0,0.85)] blur-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className={`relative w-full h-full ${isReducedMotion ? "" : "animate-[spin_28s_linear_infinite_reverse]"}`}>
                    <Image
                      src="/images/chip_orbit_2.png"
                      alt="La Crispo Crisp"
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. FOREGROUND CHIPS LAYER (Front Depth: Strong Parallax ±20px/±14px, Scale: Slightly Larger, Blur: ~1.5px) */}
            <div
              ref={chipFgRef}
              className="absolute -inset-10 sm:-inset-16 md:-inset-20 pointer-events-none flex items-center justify-center z-30 will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Chip 1: Top (Ridge Cut Crisp — Foreground Depth: Slightly Larger, Soft Edge) */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 sm:-top-6 md:-top-8 w-15 h-15 sm:w-19 sm:h-19 md:w-23 md:h-23 scale-105"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  ref={(el) => { chipsRef.current[0] = el; }}
                  className="w-full h-full opacity-0 will-change-transform drop-shadow-[0_16px_32px_rgba(0,0,0,0.9)] blur-[1.5px]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className={`relative w-full h-full ${isReducedMotion ? "" : "animate-[spin_24s_linear_infinite]"}`}>
                    <Image
                      src="/images/chip_orbit_1.png"
                      alt="La Crispo Crisp"
                      fill
                      className="object-contain"
                      sizes="95px"
                    />
                  </div>
                </div>
              </div>

              {/* Chip 4: Bottom-Left (Ridge Cut Crisp — Foreground Depth: Slightly Larger, Soft Edge) */}
              <div
                className="absolute bottom-[10%] -left-4 sm:-left-8 md:-left-10 w-16 h-16 sm:w-21 sm:h-21 md:w-25 md:h-25 scale-105"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  ref={(el) => { chipsRef.current[3] = el; }}
                  className="w-full h-full opacity-0 will-change-transform drop-shadow-[0_16px_32px_rgba(0,0,0,0.9)] blur-[1.5px]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className={`relative w-full h-full ${isReducedMotion ? "" : "animate-[spin_30s_linear_infinite_reverse]"}`}>
                    <Image
                      src="/images/chip_orbit_1.png"
                      alt="La Crispo Crisp"
                      fill
                      className="object-contain"
                      sizes="105px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spatial Consolidated Information Card: Botanical + Nutrition */}
          <div
            ref={ingredientNodesRef}
            className="absolute inset-0 pointer-events-none z-20 flex items-center justify-end px-4 sm:px-10 md:px-16"
          >
            <div className="w-[220px] sm:w-[250px] md:w-[270px] pointer-events-auto p-5 sm:p-6 rounded-2xl bg-[#181B20]/90 backdrop-blur-xl border border-[#C7CBD1]/20 shadow-[0_16px_40px_rgba(0,0,0,0.7)] flex flex-col gap-3">
              {/* Botanical Section */}
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C7CBD1] block font-mono font-bold mb-1">
                  Botanical
                </span>
                <p className="text-sm sm:text-base font-bold text-[#F2F2F0] transition-colors duration-300 leading-tight">
                  {activeProduct.ingredients[2] || activeProduct.ingredients[0]}
                </p>
              </div>

              {/* Minimal Divider */}
              <div className="border-t border-[#C7CBD1]/15 my-0.5" />

              {/* Nutrition Section */}
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#C7CBD1] block font-mono font-bold mb-1">
                  Nutrition ({activeProduct.nutrition.calories} kcal)
                </span>
                <div className="flex items-center gap-2 text-xs font-mono text-[#E6E8EB] font-bold">
                  <span>{activeProduct.nutrition.fat} Fat</span>
                  <span className="text-[#858B94]">•</span>
                  <span>{activeProduct.nutrition.protein} Prot</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Texture Specifications & Direct Route Link */}
        <div
          ref={textureMetricsRef}
          className="pb-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-6 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-mono text-[#858B94] font-semibold">
            <div>
              <span className="text-[#F2F2F0] font-bold">{activeProduct.price}</span> Price
            </div>
            <div>
              <span className="text-[#F2F2F0] font-bold">{activeProduct.nutrition.calories} kcal</span> Per Serving
            </div>
            <div>
              <span className="text-[#E5A855] font-bold">{activeProduct.rating} ★</span> ({activeProduct.reviews} reviews)
            </div>
          </div>

          <Link
            href={`/products/${activeProduct.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#C7CBD1] hover:text-[#F2F2F0] transition-colors group"
          >
            <span>Explore {activeProduct.name}</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
