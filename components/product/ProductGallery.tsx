"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: Array<{ asset?: { url: string | null } | null }>;
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const validImages = images.filter((img) => img.asset?.url);

  if (validImages.length === 0) return null;

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Thumbnails */}
      <div className="flex gap-4 overflow-auto md:flex-col md:w-24 scrollbar-hide">
        {validImages.map((image, index) => (
          <button
            type="button"
            key={image.asset?.url ?? index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
              selectedIndex === index
                ? "border-primary"
                : "border-transparent opacity-70 hover:opacity-100",
            )}
          >
            <ResponsiveImage
              src={image.asset?.url ?? ""}
              alt={`${productName} view ${index + 1}`}
              ratio={1}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-[4/5] md:aspect-auto md:min-h-[600px] overflow-hidden rounded-xl bg-secondary">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <ResponsiveImage
              src={validImages[selectedIndex].asset?.url ?? ""}
              alt={`${productName} main view`}
              wrapperClassName="h-full w-full"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
