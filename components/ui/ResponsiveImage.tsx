"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps extends Omit<ImageProps, "onLoad"> {
  wrapperClassName?: string;
  ratio?: number; // e.g., 4/5 = 0.8
}

export function ResponsiveImage({
  src,
  alt,
  className,
  wrapperClassName,
  ratio,
  fill = true,
  placeholder = "empty",
  ...props
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-neutral-100 dark:bg-neutral-800",
        wrapperClassName,
      )}
      style={ratio ? { aspectRatio: `${ratio}` } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={cn(
          "duration-500 ease-in-out",
          isLoading
            ? "scale-105 blur-lg grayscale"
            : "scale-100 blur-0 grayscale-0",
          className,
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
