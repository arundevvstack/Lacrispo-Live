"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const philosophyText = "We believe that a snack is not just food. It is an experience, a momentary escape, and a masterpiece of flavor. Every crunch tells a story of tradition, refined into pure indulgence.";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Split text into an array of words
  const words = philosophyText.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || wordsRef.current.length === 0) return;

    gsap.fromTo(
      wordsRef.current,
      { y: 100, opacity: 0, rotateX: 45 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%", // Starts animating when the section hits 60% down the screen
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
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative min-h-screen bg-[#0B0C0E] text-[#F2F2F0] flex items-center justify-center py-24 px-6 md:px-20 border-t border-[#C7CBD1]/15"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <span className="uppercase tracking-[0.35em] text-[#C7CBD1] text-xs sm:text-sm mb-16 font-bold font-mono leading-none">
          The La Crispo Philosophy
        </span>
        
        <p 
          className="text-3xl md:text-5xl lg:text-7xl font-serif text-[#F2F2F0] leading-[1.08] text-justify drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
          style={{ textAlign: "justify", textJustify: "inter-word" }}
          aria-label={philosophyText}
        >
          {words.map((word, i) => (
            <span 
              key={i} 
              className="inline-block overflow-hidden pb-0 perspective-[1000px] leading-none mr-[0.25em]"
              aria-hidden="true"
            >
              <span 
                ref={(el) => { wordsRef.current[i] = el; }}
                className="inline-block origin-bottom transform-gpu"
              >
                {word}
              </span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
