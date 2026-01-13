"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface FiltersPanelProps {
  categories: { title: string | null; slug: string | null }[];
  minPrice?: number;
  maxPrice?: number;
  className?: string;
  onClose?: () => void;
}

const SIZES = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" },
];

const COLORS = [
  { value: "black", label: "Black", hex: "#000000" },
  { value: "white", label: "White", hex: "#FFFFFF" },
  { value: "grey", label: "Grey", hex: "#6B7280" },
  { value: "navy", label: "Navy", hex: "#1E3A5F" },
  { value: "beige", label: "Beige", hex: "#D4C4B0" },
  { value: "red", label: "Red", hex: "#DC2626" },
  { value: "green", label: "Green", hex: "#16A34A" },
  { value: "blue", label: "Blue", hex: "#2563EB" },
  { value: "brown", label: "Brown", hex: "#78350F" },
  { value: "pink", label: "Pink", hex: "#EC4899" },
];

const STYLES = [
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
  { value: "sporty", label: "Sporty" },
  { value: "streetwear", label: "Streetwear" },
  { value: "vintage", label: "Vintage" },
  { value: "minimalist", label: "Minimalist" },
];

const MATERIALS = [
  { value: "cotton", label: "Cotton" },
  { value: "polyester", label: "Polyester" },
  { value: "denim", label: "Denim" },
  { value: "leather", label: "Leather" },
  { value: "wool", label: "Wool" },
  { value: "silk", label: "Silk" },
  { value: "linen", label: "Linen" },
  { value: "cashmere", label: "Cashmere" },
];

export function FiltersPanel({
  categories,
  minPrice = 0,
  maxPrice = 10000,
  className,
  onClose,
}: FiltersPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for immediate UI feedback
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || minPrice,
    Number(searchParams.get("maxPrice")) || maxPrice,
  ]);

  // Collapsible states
  const [openSections, setOpenSections] = useState({
    categories: true,
    size: true,
    color: true,
    price: true,
    style: false,
    material: false,
  });

  useEffect(() => {
    setPriceRange([
      Number(searchParams.get("minPrice")) || minPrice,
      Number(searchParams.get("maxPrice")) || maxPrice,
    ]);
  }, [searchParams, minPrice, maxPrice]);

  const updateFilter = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router],
  );

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handlePriceCommit = (value: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", value[0].toString());
    params.set("maxPrice", value[1].toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const activeFiltersCount = [
    searchParams.get("category"),
    searchParams.get("size"),
    searchParams.get("color"),
    searchParams.get("style"),
    searchParams.get("material"),
    searchParams.get("minPrice") || searchParams.get("maxPrice"),
  ].filter(Boolean).length;

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Categories */}
      <Collapsible
        open={openSections.categories}
        onOpenChange={() => toggleSection("categories")}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-primary transition-colors">
          Categories
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              openSections.categories && "rotate-180",
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-col gap-1.5 pt-2">
            {categories.map((category) => {
              if (!category.slug) return null;
              const isActive = searchParams.get("category") === category.slug;
              return (
                <button
                  type="button"
                  key={category.slug}
                  onClick={() =>
                    updateFilter("category", isActive ? null : category.slug)
                  }
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-all text-left",
                    isActive
                      ? "bg-foreground text-background font-medium"
                      : "hover:bg-secondary text-muted-foreground hover:text-foreground",
                  )}
                >
                  {category.title}
                  {isActive && <Check className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Size */}
      <Collapsible
        open={openSections.size}
        onOpenChange={() => toggleSection("size")}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-primary transition-colors">
          Size
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              openSections.size && "rotate-180",
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-wrap gap-2 pt-2">
            {SIZES.map((size) => {
              const isActive = searchParams.get("size") === size.value;
              return (
                <button
                  type="button"
                  key={size.value}
                  onClick={() =>
                    updateFilter("size", isActive ? null : size.value)
                  }
                  className={cn(
                    "flex h-10 w-12 items-center justify-center rounded-lg border text-sm font-medium transition-all",
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground",
                  )}
                >
                  {size.label}
                </button>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Color */}
      <Collapsible
        open={openSections.color}
        onOpenChange={() => toggleSection("color")}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-primary transition-colors">
          Color
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              openSections.color && "rotate-180",
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-wrap gap-2 pt-2">
            {COLORS.map((color) => {
              const isActive = searchParams.get("color") === color.value;
              return (
                <button
                  type="button"
                  key={color.value}
                  onClick={() =>
                    updateFilter("color", isActive ? null : color.value)
                  }
                  className={cn(
                    "group relative flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all",
                    isActive
                      ? "border-foreground scale-110"
                      : "border-transparent hover:scale-105",
                  )}
                  title={color.label}
                >
                  <span
                    className={cn(
                      "h-7 w-7 rounded-full shadow-sm",
                      color.value === "white" && "border border-border",
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                  {isActive && (
                    <Check
                      className={cn(
                        "absolute h-4 w-4",
                        color.value === "white" || color.value === "beige"
                          ? "text-foreground"
                          : "text-white",
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Range */}
      <Collapsible
        open={openSections.price}
        onOpenChange={() => toggleSection("price")}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-primary transition-colors">
          Price
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              openSections.price && "rotate-180",
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-4 pt-4">
            <Slider
              value={priceRange}
              min={minPrice}
              max={maxPrice}
              step={100}
              onValueChange={handlePriceChange}
              onValueCommit={handlePriceCommit}
              className="w-full"
            />
            <div className="flex items-center justify-between">
              <div className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium">
                ₹{priceRange[0].toLocaleString()}
              </div>
              <span className="text-muted-foreground">—</span>
              <div className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium">
                ₹{priceRange[1].toLocaleString()}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Style */}
      <Collapsible
        open={openSections.style}
        onOpenChange={() => toggleSection("style")}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-primary transition-colors">
          Style
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              openSections.style && "rotate-180",
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-wrap gap-2 pt-2">
            {STYLES.map((style) => {
              const isActive = searchParams.get("style") === style.value;
              return (
                <button
                  type="button"
                  key={style.value}
                  onClick={() =>
                    updateFilter("style", isActive ? null : style.value)
                  }
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-all",
                    isActive
                      ? "border-foreground bg-foreground text-background font-medium"
                      : "border-border hover:border-foreground",
                  )}
                >
                  {style.label}
                </button>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Material */}
      <Collapsible
        open={openSections.material}
        onOpenChange={() => toggleSection("material")}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-primary transition-colors">
          Material
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              openSections.material && "rotate-180",
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-wrap gap-2 pt-2">
            {MATERIALS.map((material) => {
              const isActive = searchParams.get("material") === material.value;
              return (
                <button
                  type="button"
                  key={material.value}
                  onClick={() =>
                    updateFilter("material", isActive ? null : material.value)
                  }
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-all",
                    isActive
                      ? "border-foreground bg-foreground text-background font-medium"
                      : "border-border hover:border-foreground",
                  )}
                >
                  {material.label}
                </button>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      <AnimatePresence>
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pt-4 border-t border-border"
          >
            <Button
              variant="outline"
              onClick={() => router.push(window.location.pathname)}
              className="w-full"
            >
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
