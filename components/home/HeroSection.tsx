"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useChatActions } from "@/lib/store/chat-store-provider";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  _id?: string;
  title: string | null;
  subtitle: string | null;
  image: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  textPosition: "center" | "left" | "right" | null;
}

interface HeroSectionProps {
  slides?: HeroSlide[];
  // Fallback props for when no Sanity data
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  fallbackImage?: string;
  autoPlayInterval?: number;
}

export function HeroSection({
  slides,
  fallbackTitle = "Elevate Your Style",
  fallbackSubtitle = "Discover curated collections crafted for the modern wardrobe. Premium quality, timeless design.",
  fallbackImage,
  autoPlayInterval = 6000,
}: HeroSectionProps) {
  const { openChat } = useChatActions();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  // Create fallback slide if no slides provided
  const displaySlides: HeroSlide[] =
    slides && slides.length > 0
      ? slides
      : [
          {
            title: fallbackTitle,
            subtitle: fallbackSubtitle,
            image: fallbackImage ?? null,
            ctaText: "Shop Collection",
            ctaLink: "/products",
            textPosition: "center",
          },
        ];

  const slideCount = displaySlides.length;
  const hasMultipleSlides = slideCount > 1;

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || !hasMultipleSlides) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, slideCount, autoPlayInterval, hasMultipleSlides]);

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide],
  );

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const slide = displaySlides[currentSlide];
  const textAlign = slide.textPosition || "center";

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-neutral-900 md:min-h-[85vh]">
      {/* Background Slides */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          {slide.image ? (
            <Image
              src={slide.image}
              alt={slide.title || "Hero background"}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-neutral-800 via-neutral-900 to-black" />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={contentVariants}
            className={cn(
              "max-w-3xl",
              textAlign === "center" && "mx-auto text-center",
              textAlign === "left" && "text-left",
              textAlign === "right" && "ml-auto text-right",
            )}
          >
            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {slide.title}
            </h1>

            {/* Subtitle */}
            {slide.subtitle && (
              <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-200 sm:text-xl md:text-2xl">
                {slide.subtitle}
              </p>
            )}

            {/* CTAs */}
            <div
              className={cn(
                "mt-10 flex flex-col gap-4 sm:flex-row",
                textAlign === "center" && "items-center justify-center",
                textAlign === "left" && "items-start",
                textAlign === "right" && "items-end justify-end",
              )}
            >
              <Button
                asChild
                size="lg"
                className="h-14 min-w-[200px] bg-white text-black text-base font-semibold hover:bg-neutral-100 transition-all hover:scale-105"
              >
                <Link href={slide.ctaLink || "/products"}>
                  {slide.ctaText || "Shop Now"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 min-w-[200px] border-white/40 bg-white/10 text-white text-base font-semibold backdrop-blur-md hover:bg-white/20 transition-all"
                onClick={openChat}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Ask AI Stylist
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Navigation - Only show if multiple slides */}
      {hasMultipleSlides && (
        <>
          {/* Arrow Controls */}
          <div className="absolute left-4 right-4 top-1/2 z-20 flex -translate-y-1/2 justify-between pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="pointer-events-auto h-12 w-12 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="pointer-events-auto h-12 w-12 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {displaySlides.map((slide, index) => (
                <button
                  type="button"
                  key={slide._id ?? `slide-${index}`}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentSlide
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Play/Pause */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span className="sr-only">
                {isPlaying ? "Pause" : "Play"} slideshow
              </span>
            </Button>
          </div>
        </>
      )}

      {/* Scroll Indicator - Only show for single slide */}
      {!hasMultipleSlides && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-6 rounded-full border-2 border-white/30 p-1"
          >
            <div className="h-2 w-full rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      )}

      {/* Progress Bar */}
      {hasMultipleSlides && isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
          <motion.div
            key={currentSlide}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
            className="h-full bg-white"
          />
        </div>
      )}
    </section>
  );
}
