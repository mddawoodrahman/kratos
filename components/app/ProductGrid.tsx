"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Grid3X3,
  LayoutGrid,
  PackageSearch,
  Rows3,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

interface ProductGridProps {
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
  totalCount?: number;
}

const SORT_OPTIONS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "relevance", label: "Relevance" },
];

export function ProductGrid({ products, totalCount }: ProductGridProps) {
  const [layout, setLayout] = useState<"grid" | "compact" | "list">("grid");
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "name";

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[400px] rounded-2xl border-2 border-dashed border-border bg-secondary/30"
      >
        <EmptyState
          icon={PackageSearch}
          title="No products found"
          description="Try adjusting your search or filters to find what you're looking for"
          size="lg"
        />
      </motion.div>
    );
  }

  const currentSortLabel =
    SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label || "Sort";

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Product Count */}
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">{products.length}</span>
          {totalCount && totalCount > products.length && (
            <>
              {" "}
              of{" "}
              <span className="font-medium text-foreground">{totalCount}</span>
            </>
          )}{" "}
          products
        </p>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 min-w-[160px] justify-between"
              >
                <span className="text-sm">{currentSortLabel}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              {SORT_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={cn(
                    "cursor-pointer",
                    currentSort === option.value && "bg-secondary font-medium",
                  )}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Layout Toggle */}
          <div className="hidden sm:flex items-center rounded-lg border border-border p-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLayout("grid")}
              className={cn(
                "h-8 w-8 rounded-md",
                layout === "grid" && "bg-secondary",
              )}
              aria-label="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLayout("compact")}
              className={cn(
                "h-8 w-8 rounded-md",
                layout === "compact" && "bg-secondary",
              )}
              aria-label="Compact View"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLayout("list")}
              className={cn(
                "h-8 w-8 rounded-md",
                layout === "list" && "bg-secondary",
              )}
              aria-label="List View"
            >
              <Rows3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <motion.div
        layout
        className={cn(
          "grid gap-4 sm:gap-6 transition-all",
          layout === "grid" && "grid-cols-2 lg:grid-cols-3",
          layout === "compact" && "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
          layout === "list" && "grid-cols-1",
        )}
      >
        <AnimatePresence mode="popLayout">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <ProductCard product={product} priority={index < 6} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
