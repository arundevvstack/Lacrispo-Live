"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Classic Tomato",
    desc: "An explosive burst of zesty tomato and authentic spices, delivering a world-class crunch in every bite.",
    color: "from-red-950 to-black",
    image: "/images/anatomy_red.png",
  },
  {
    id: 2,
    name: "Spicy Masala",
    desc: "A bold fusion of Indian spices for those who crave heat.",
    color: "from-orange-900 to-black",
  },
  {
    id: 3,
    name: "Cream & Onion",
    desc: "Smooth, velvety cream balanced with sharp spring onion.",
    color: "from-emerald-900 to-black",
  },
  {
    id: 4,
    name: "Truffle Cheese",
    desc: "Premium aged cheese elevated with rich black truffle.",
    color: "from-yellow-900 to-black",
  },
];

export default function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!section || !scrollContainer) return;

    // Calculate total width to move
    const getScrollAmount = () => {
      const scrollWidth = scrollContainer.scrollWidth || 0;
      return -(scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(scrollContainer, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculates on resize
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section id="products" ref={sectionRef} className="h-screen bg-black overflow-hidden relative">
      {/* Background styling for the showroom */}
      <div className="absolute top-10 left-10 z-20 pointer-events-none">
        <h2 className="text-4xl md:text-7xl font-serif italic text-white/30 tracking-tighter drop-shadow-xl mix-blend-overlay">
          Our Products
        </h2>
      </div>

      <div 
        ref={scrollContainerRef} 
        className="flex h-full w-[400vw] sm:w-[300vw] lg:w-[250vw]"
      >
        {products.map((product, i) => (
          <article 
            key={product.id}
            className={`w-screen h-full flex-shrink-0 relative flex items-center justify-center bg-gradient-to-br ${product.color} group overflow-hidden`}
          >
            {/* Immersive Background Image */}
            {product.image && (
              <>
                <Image
                  src={product.image}
                  alt={`La Crispo - ${product.name} potato crisps`}
                  fill
                  className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                  priority={i === 0}
                  sizes="100vw"
                />
                {/* Radial gradient overlay to ensure text pops without hiding the explosion */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_black_100%)] opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              </>
            )}

            {/* Content Container */}
            <div className={`relative z-10 flex flex-col items-center justify-center p-10 text-center w-full ${product.image ? 'max-w-5xl mt-32' : 'max-w-2xl aspect-[4/5] md:aspect-[16/9] rounded-3xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-md'}`}>
              
              <h3 className={`font-black tracking-tighter mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out text-transparent bg-clip-text bg-gradient-to-b ${product.image ? 'text-6xl md:text-9xl from-white via-[#F5E6CC] to-[#D4A373]' : 'text-5xl md:text-8xl from-white to-white/40'}`}>
                {product.name}
              </h3>
              
              <p className={`font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 ease-out ${product.image ? 'text-xl md:text-3xl text-white/90 drop-shadow-xl max-w-3xl' : 'text-lg md:text-2xl text-white/70'}`}>
                {product.desc}
              </p>
              
              <button className="mt-10 px-10 py-4 rounded-full border border-[#EAD0A1] text-[#EAD0A1] font-semibold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 hover:bg-[#EAD0A1] hover:text-black hover:scale-105 shadow-[0_0_20px_rgba(234,208,161,0.2)]">
                Explore Flavor
              </button>
            </div>
            
            {/* Parallax / Hover Glow Effect for Non-Image cards */}
            {!product.image && (
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay pointer-events-none" />
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
