export const loadFrame = async (src: string): Promise<HTMLImageElement | ImageBitmap> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "anonymous";
    img.onload = async () => {
      if (typeof window !== "undefined" && window.createImageBitmap) {
        try {
          const bitmap = await window.createImageBitmap(img);
          resolve(bitmap);
        } catch {
          resolve(img);
        }
      } else {
        resolve(img);
      }
    };
    img.onerror = (err) => reject(err);
  });
};

export const preloadFrames = async (
  frames: string[],
  onProgress?: (progress: number) => void
): Promise<(HTMLImageElement | ImageBitmap)[]> => {
  const loadedFrames: (HTMLImageElement | ImageBitmap)[] = [];
  let loadedCount = 0;

  const loadPromises = frames.map(async (src, index) => {
    try {
      const frame = await loadFrame(src);
      loadedFrames[index] = frame;
      loadedCount++;
      if (onProgress) {
        onProgress(loadedCount / frames.length);
      }
    } catch (error) {
      console.error(`Failed to load frame at ${src}`, error);
    }
  });

  await Promise.all(loadPromises);
  return loadedFrames;
};
