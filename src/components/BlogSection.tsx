"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    title: "New Flavour: Kanthari & Crushed Black Pepper",
    desc: "An explosive new artisan crunch crafted with authentic Kerala Kanthari (bird's eye) chilies, toasted black pepper, and fresh curry leaves.",
    category: "Upcoming Flavour Launch",
    tags: ["Kanthari Chili", "Black Pepper", "Curry Leaves"],
    size: "col-span-12 md:col-span-8 row-span-2",
    badge: "Coming Soon",
  },
  {
    title: "Sourcing our Spices: From Hill Bird's Eye Chilies to Malabar Peppercorn",
    desc: "Handpicked wild chilies and estate spices sourced directly from local growers.",
    category: "Ingredients & Heritage",
    tags: ["Bird's Eye Chili", "Malabar Pepper"],
    size: "col-span-12 md:col-span-4 row-span-1",
  },
  {
    title: "The Art of the Authentic Small-Batch Crunch",
    desc: "Traditional kettle craftsmanship delivering uncompromised crispness in every bite.",
    category: "Behind the Craft",
    tags: ["Artisan", "Authentic Recipe"],
    size: "col-span-12 md:col-span-4 row-span-1",
  },
];

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const section = sectionRef.current;
    if (!grid || !section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        grid.children,
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="py-32 px-6 bg-[#0B0C0E] text-[#F2F2F0] min-h-screen flex flex-col justify-center border-t border-[#C7CBD1]/15">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-serif italic bg-gradient-to-r from-[#F2F2F0] via-[#E5A855] to-[#C96F32] bg-clip-text text-transparent inline-block">
              Latest News
            </h2>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-12 gap-6 auto-rows-[250px]">
          {posts.map((post, i) => (
            <article 
              key={i} 
              className={`${post.size} group relative rounded-3xl overflow-hidden bg-[#181B20]/80 border border-[#C7CBD1]/20 p-8 flex flex-col justify-between cursor-pointer shadow-[0_12px_32px_rgba(0,0,0,0.6)] hover:border-[#E6E8EB]/50 transition-all duration-300`}
              aria-labelledby={`post-title-${i}`}
            >
              {/* Silver Specular Hover Effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              
              {/* Top Badge (if any) */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <span className="text-[#858B94] uppercase tracking-[0.2em] text-xs font-bold font-mono">
                  {post.category}
                </span>
                {post.badge && (
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold px-3 py-1 rounded-full bg-[#E5A855]/15 text-[#E5A855] border border-[#E5A855]/30">
                    {post.badge}
                  </span>
                )}
              </div>
              
              {/* Bottom Content & Spice Tags */}
              <div className="relative z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 flex flex-col gap-3">
                <h3 id={`post-title-${i}`} className="text-2xl md:text-3xl text-[#F2F2F0] font-serif font-medium tracking-tight group-hover:text-[#E6E8EB] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A7ACB4] line-clamp-2 leading-relaxed font-light">
                  {post.desc}
                </p>
                {post.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#C7CBD1] font-mono font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  );
}
