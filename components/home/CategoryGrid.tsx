"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  title: string | null;
  slug: string | null;
  image?: { asset?: { url: string | null } | null } | null;
}

interface CategoryGridProps {
  categories: Category[];
}

// Predefined layout positions for visual hierarchy
const LAYOUT_CONFIG = [
  {
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    aspectRatio: "aspect-square md:aspect-auto",
    minHeight: "md:min-h-[500px]",
  },
  {
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    aspectRatio: "aspect-4/3",
    minHeight: "",
  },
  {
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    aspectRatio: "aspect-4/3",
    minHeight: "",
  },
  {
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    aspectRatio: "aspect-4/3",
    minHeight: "",
  },
  {
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    aspectRatio: "aspect-4/3",
    minHeight: "",
  },
];

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) return null;

  const displayCategories = categories.slice(0, 5);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Explore Collections
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Shop by Category
              </h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View All Categories
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Category Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {displayCategories.map((category, index) => {
            const config = LAYOUT_CONFIG[index] || LAYOUT_CONFIG[4];
            return (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(config.colSpan, config.rowSpan)}
              >
                <CategoryCard
                  category={category}
                  isLarge={index === 0}
                  aspectRatio={config.aspectRatio}
                  minHeight={config.minHeight}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

interface CategoryCardProps {
  category: Category;
  isLarge?: boolean;
  aspectRatio: string;
  minHeight: string;
}

function CategoryCard({
  category,
  isLarge = false,
  aspectRatio,
  minHeight,
}: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group relative block h-full overflow-hidden rounded-2xl bg-secondary"
    >
      <div className={cn("relative h-full", aspectRatio, minHeight)}>
        {/* Background Image */}
        {category.image?.asset?.url ? (
          <Image
            src={category.image.asset.url}
            alt={category.title || "Category"}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
            sizes={
              isLarge
                ? "(max-width: 768px) 100vw, 66vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {/* Category Label */}
          <div className="overflow-hidden">
            <motion.h3
              className={cn(
                "font-bold text-white leading-tight",
                isLarge
                  ? "text-2xl md:text-3xl lg:text-4xl"
                  : "text-xl md:text-2xl",
              )}
            >
              {category.title}
            </motion.h3>
          </div>

          {/* CTA */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-medium text-white/90 transition-colors group-hover:text-white">
              Explore Collection
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:bg-white group-hover:text-black">
              <ArrowRight className="h-3 w-3 text-white transition-all group-hover:text-black group-hover:translate-x-0.5" />
            </div>
          </div>

          {/* Decorative Line */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full" />
        </div>
      </div>
    </Link>
  );
}
