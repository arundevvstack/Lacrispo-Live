"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { label: "Locally Sourced", value: "100%" },
  { label: "Crunch Factor", value: "Max" },
  { label: "Flavors", value: "24+" },
  { label: "Artisan Quality", value: "Verified" },
];

export default function FactorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const stats = statsRef.current;
    if (!section || !bg || !stats) return;

    const ctx = gsap.context(() => {
      // Parallax background effect
      gsap.to(bg, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Fade in stats
      gsap.fromTo(
        stats.children,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stats,
            start: "top 80%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="factory" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0C0E] text-[#F2F2F0] border-t border-[#C7CBD1]/15">
      {/* Dark Ambient Parallax Background */}
      <div 
        ref={bgRef}
        className="absolute inset-[-20%] w-[140%] h-[140%] opacity-30 z-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(199,203,209,0.15)_0%,rgba(11,12,14,0.8)_60%,#070809_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full flex flex-col md:flex-row gap-16 items-center">
        
        {/* Text Side */}
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5A855]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#C7CBD1] font-bold font-mono">
              The Craft Facility
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif italic bg-gradient-to-r from-[#F2F2F0] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent inline-block">
            The Factory
          </h2>
          <p className="text-lg md:text-xl text-[#A7ACB4] font-normal leading-relaxed max-w-xl">
            Where tradition meets modern precision. We source the finest ingredients from local farms and run them through our state-of-the-art facility to guarantee the perfect crunch in every single bite.
          </p>
          <button className="px-8 py-3.5 rounded-full bg-[#181B20] hover:bg-[#E6E8EB] hover:text-[#0B0C0E] border border-[#C7CBD1]/30 text-[#F2F2F0] transition-all duration-300 tracking-widest uppercase text-xs font-bold shadow-md">
            Discover Our Process
          </button>
        </div>

        {/* Stats Grid */}
        <dl ref={statsRef} className="flex-1 grid grid-cols-2 gap-8 w-full" aria-label="Factory Statistics">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col space-y-2 p-8 border border-[#C7CBD1]/20 rounded-3xl bg-[#181B20]/80 backdrop-blur-sm shadow-[0_12px_32px_rgba(0,0,0,0.6)]">
              <dd className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#F2F2F0] via-[#C7CBD1] to-[#858B94] m-0">
                {stat.value}
              </dd>
              <dt className="text-xs tracking-[0.2em] uppercase text-[#858B94] font-bold font-mono">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
