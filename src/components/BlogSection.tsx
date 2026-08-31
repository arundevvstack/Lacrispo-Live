"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const posts = [
  {
    title: "The Art of the Perfect Crunch",
    category: "Behind the Scenes",
    size: "col-span-12 md:col-span-8 row-span-2",
  },
  {
    title: "Sourcing our Spices",
    category: "Ingredients",
    size: "col-span-12 md:col-span-4 row-span-1",
  },
  {
    title: "New Flavor: Coming Soon",
    category: "Announcements",
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

    gsap.fromTo(
      grid.children,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section id="blog" ref={sectionRef} className="py-32 px-6 bg-[#0B0C0E] text-[#F2F2F0] min-h-screen flex flex-col justify-center border-t border-[#C7CBD1]/15">
      <div className="max-w-7xl mx-auto w-full">
        
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E5A855]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C7CBD1] font-bold font-mono">
                The Journal
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif italic text-[#F2F2F0]">
              Latest News
            </h2>
          </div>
          <button aria-label="View all blog posts" className="hidden md:block text-[#C7CBD1] font-bold tracking-widest uppercase text-xs border-b border-[#C7CBD1] pb-1 hover:text-[#E6E8EB] hover:border-[#E6E8EB] transition-colors duration-300">
            View All
          </button>
        </div>

        <div ref={gridRef} className="grid grid-cols-12 gap-6 auto-rows-[250px]">
          {posts.map((post, i) => (
            <article 
              key={i} 
              className={`${post.size} group relative rounded-3xl overflow-hidden bg-[#181B20]/80 border border-[#C7CBD1]/20 p-8 flex flex-col justify-end cursor-pointer shadow-[0_12px_32px_rgba(0,0,0,0.6)] hover:border-[#E6E8EB]/50 transition-all duration-300`}
              aria-labelledby={`post-title-${i}`}
            >
              {/* Silver Specular Hover Effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              
              <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[#858B94] uppercase tracking-[0.2em] text-xs font-bold font-mono mb-3 block">
                  {post.category}
                </span>
                <h3 id={`post-title-${i}`} className="text-2xl md:text-3xl text-[#F2F2F0] font-serif font-medium tracking-tight group-hover:text-[#E6E8EB] transition-colors">
                  {post.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
        
      </div>
    </section>
  );
}
