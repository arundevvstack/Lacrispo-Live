"use client";

import { useState } from "react";
import SmoothScroll from "../components/SmoothScroll";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import ProductWorldScene from "../components/scenes/ProductWorldScene";
import FlavourTextureScene from "../components/scenes/FlavourTextureScene";
import SpatialProductCollection from "../components/scenes/SpatialProductCollection";
import AboutSection from "../components/AboutSection";
import FactorySection from "../components/FactorySection";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer";

export default function PageClient({ frameUrls }: { frameUrls: string[] }) {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <SmoothScroll>
      <Navbar />
      <LoadingScreen progress={progress} isReady={isReady} />

      {/* PHASE 1 VERTICAL SLICE: 3D / Depth Scroll-Driven Brand Experience */}
      {/* 01 — PRODUCT WORLD */}
      {frameUrls.length > 0 ? (
        <ProductWorldScene
          frameUrls={frameUrls}
          onReady={() => setIsReady(true)}
          onProgress={setProgress}
        />
      ) : (
        <div className="h-screen w-full flex items-center justify-center bg-black">
          <p className="text-white/50 text-sm tracking-widest uppercase">
            Waiting for sequence frames in public/home/
          </p>
        </div>
      )}

      {/* 02 — FLAVOUR + TEXTURE */}
      <FlavourTextureScene />

      {/* 03 — SPATIAL PRODUCT COLLECTION */}
      <SpatialProductCollection />

      {/* Existing Downstream Sections (Preserved intact for Phase 2) */}
      <AboutSection />
      <FactorySection />
      <BlogSection />
      <Footer />
    </SmoothScroll>
  );
}

