"use client";

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { preloadFrames, loadFrame } from "../utils/frameLoader";

export interface CanvasSequenceHandle {
  setProgress: (progress: number) => void;
}

interface CanvasSequenceProps {
  frameUrls: string[];
  onReady: () => void;
  onProgress: (progress: number) => void;
}

const CanvasSequence = forwardRef<CanvasSequenceHandle, CanvasSequenceProps>(
  ({ frameUrls, onReady, onProgress }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const framesRef = useRef<(HTMLImageElement | ImageBitmap | null)[]>(new Array(frameUrls.length).fill(null));
    
    const [isLoaded, setIsLoaded] = useState(false);
    const currentFrameIndex = useRef(0);
    const renderRequested = useRef(false);

    // We want to draw preserving the aspect ratio (cover style)
    const drawImage = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement | ImageBitmap, canvas: HTMLCanvasElement) => {
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvas.width / imgRatio;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, []);

    const renderFrame = useCallback(() => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d", { alpha: false });
      if (!ctx) return;

      const img = framesRef.current[currentFrameIndex.current];
      if (img) {
        drawImage(ctx, img, canvasRef.current);
      }
      renderRequested.current = false;
    }, [drawImage]);

    const requestRender = useCallback(() => {
      if (!renderRequested.current) {
        renderRequested.current = true;
        requestAnimationFrame(renderFrame);
      }
    }, [renderFrame]);

    // Expose imperative handle for performance (no re-renders on scroll)
    useImperativeHandle(ref, () => ({
      setProgress: (progress: number) => {
        if (!isLoaded || frameUrls.length === 0) return;
        
        // Ensure progress is between 0 and 1
        const normalizedProgress = Math.max(0, Math.min(1, progress));
        const targetFrame = Math.round(normalizedProgress * (frameUrls.length - 1));
        
        if (targetFrame !== currentFrameIndex.current) {
          currentFrameIndex.current = targetFrame;
          requestRender();
        }
      }
    }), [isLoaded, frameUrls.length, requestRender]);

    // Handle Resize
    useEffect(() => {
      const handleResize = () => {
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
          canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
          requestRender();
        }
      };
      
      window.addEventListener("resize", handleResize);
      handleResize(); // Initial sizing
      
      return () => window.removeEventListener("resize", handleResize);
    }, [requestRender]);

    // Preloading Strategy
    useEffect(() => {
      if (frameUrls.length === 0) return;

      const initialBatchSize = Math.min(30, frameUrls.length);
      const initialBatch = frameUrls.slice(0, initialBatchSize);
      
      let isCancelled = false;

      const loadInitial = async () => {
        const loaded = await preloadFrames(initialBatch, onProgress);
        if (isCancelled) return;
        
        for (let i = 0; i < loaded.length; i++) {
          framesRef.current[i] = loaded[i];
        }
        
        setIsLoaded(true);
        onReady();
        requestRender();

        // Lazy load the rest in the background
        for (let i = initialBatchSize; i < frameUrls.length; i++) {
          if (isCancelled) break;
          try {
            const img = await loadFrame(frameUrls[i]);
            framesRef.current[i] = img;
            // Optionally redraw if scroll reached an unloaded frame before it finished
            if (currentFrameIndex.current === i) {
              requestRender();
            }
          } catch (err) {
            console.error(`Error background loading frame ${i}`, err);
          }
        }
      };

      loadInitial();

      return () => {
        isCancelled = true;
      };
    }, [frameUrls, onReady, onProgress, requestRender]);

    return (
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="La Crispo cinematic intro sequence"
        className="w-full h-full object-cover block"
      />
    );
  }
);

CanvasSequence.displayName = "CanvasSequence";

export default CanvasSequence;
