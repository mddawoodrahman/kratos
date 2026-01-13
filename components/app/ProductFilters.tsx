"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  COLORS,
  MATERIALS,
  SIZES,
  SORT_OPTIONS,
  STYLES,
} from "@/lib/constants/filters";
import type { ALL_CATEGORIES_QUERYResult } from "@/sanity.types";

interface ProductFiltersProps {
  categories: ALL_CATEGORIES_QUERYResult;
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentSize = searchParams.get("size") ?? "";
  const currentColor = searchParams.get("color") ?? "";
  const currentMaterial = searchParams.get("material") ?? "";
  const currentStyle = searchParams.get("style") ?? "";
  const currentSort = searchParams.get("sort") ?? "name";
  const urlMinPrice = Number(searchParams.get("minPrice")) || 0;
  const urlMaxPrice = Number(searchParams.get("maxPrice")) || 500;
  const currentInStock = searchParams.get("inStock") === "true";

  // Local state for price range (for smooth slider dragging)
  const [priceRange, setPriceRange] = useState<[number, number]>([
    urlMinPrice,
    urlMaxPrice,
  ]);

  // Sync local state when URL changes
  useEffect(() => {
    setPriceRange([urlMinPrice, urlMaxPrice]);
  }, [urlMinPrice, urlMaxPrice]);

  // Check which filters are active
  const isSearchActive = !!currentSearch;
  const isCategoryActive = !!currentCategory;
  const isSizeActive = !!currentSize;
  const isColorActive = !!currentColor;
  const isMaterialActive = !!currentMaterial;
  const isStyleActive = !!currentStyle;
  const isPriceActive = urlMinPrice > 0 || urlMaxPrice < 500;
  const isInStockActive = currentInStock;

  const hasActiveFilters =
    isSearchActive ||
    isCategoryActive ||
    isSizeActive ||
    isColorActive ||
    isMaterialActive ||
    isStyleActive ||
    isPriceActive ||
    isInStockActive;

  // Count active filters
  const activeFilterCount = [
    isSearchActive,
    isCategoryActive,
    isSizeActive,
    isColorActive,
    isMaterialActive,
    isStyleActive,
    isPriceActive,
    isInStockActive,
  ].filter(Boolean).length;

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === 0) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get("search") as string;
    updateParams({ q: searchQuery || null });
  };

  const handleClearFilters = () => {
    router.push("/", { scroll: false });
  };

  const clearSingleFilter = (key: string) => {
    if (key === "price") {
      updateParams({ minPrice: null, maxPrice: null });
    } else {
      updateParams({ [key]: null });
    }
  };

  // Helper for filter label with active indicator
  const FilterLabel = ({
    children,
    isActive,
    filterKey,
  }: {
    children: React.ReactNode;
    isActive: boolean;
    filterKey: string;
  }) => (
    <div className="mb-2 flex items-center justify-between">
      <span
        className={`block text-sm font-medium ${
          isActive
            ? "text-zinc-900 dark:text-zinc-100"
            : "text-zinc-700 dark:text-zinc-300"
        }`}
      >
        {children}
        {isActive && (
          <Badge className="ml-2 h-5 bg-zinc-900 px-1.5 text-xs text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
            Active
          </Badge>
        )}
      </span>
      {isActive && (
        <button
          type="button"
          onClick={() => clearSingleFilter(filterKey)}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          aria-label={`Clear ${filterKey} filter`}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="space-y-6 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      {/* Clear Filters - Show at top when active */}
      {hasActiveFilters && (
        <div className="rounded-lg border-2 border-zinc-300 bg-zinc-50 p-3 dark:border-zinc-600 dark:bg-zinc-900">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              {activeFilterCount}{" "}
              {activeFilterCount === 1 ? "filter" : "filters"} applied
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleClearFilters}
            className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <X className="mr-2 h-4 w-4" />
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Search */}
      <div>
        <FilterLabel isActive={isSearchActive} filterKey="q">
          Search
        </FilterLabel>
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <Input
            name="search"
            placeholder="Search products..."
            defaultValue={currentSearch}
            className={`flex-1 ${
              isSearchActive
                ? "border-zinc-500 ring-1 ring-zinc-500 dark:border-zinc-400 dark:ring-zinc-400"
                : ""
            }`}
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>
      </div>

      {/* Category */}
      <div>
        <FilterLabel isActive={isCategoryActive} filterKey="category">
          Category
        </FilterLabel>
        <Select
          value={currentCategory || "all"}
          onValueChange={(value) =>
            updateParams({ category: value === "all" ? null : value })
          }
        >
          <SelectTrigger
            className={
              isCategoryActive
                ? "border-zinc-500 ring-1 ring-zinc-500 dark:border-zinc-400 dark:ring-zinc-400"
                : ""
            }
          >
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category.slug ?? ""}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Size */}
      <div>
        <FilterLabel isActive={isSizeActive} filterKey="size">
          Size
        </FilterLabel>
        <Select
          value={currentSize || "all"}
          onValueChange={(value) =>
            updateParams({ size: value === "all" ? null : value })
          }
        >
          <SelectTrigger
            className={
              isSizeActive
                ? "border-zinc-500 ring-1 ring-zinc-500 dark:border-zinc-400 dark:ring-zinc-400"
                : ""
            }
          >
            <SelectValue placeholder="All Sizes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sizes</SelectItem>
            {SIZES.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Color */}
      <div>
        <FilterLabel isActive={isColorActive} filterKey="color">
          Color
        </FilterLabel>
        <Select
          value={currentColor || "all"}
          onValueChange={(value) =>
            updateParams({ color: value === "all" ? null : value })
          }
        >
          <SelectTrigger
            className={
              isColorActive
                ? "border-zinc-500 ring-1 ring-zinc-500 dark:border-zinc-400 dark:ring-zinc-400"
                : ""
            }
          >
            <SelectValue placeholder="All Colors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Colors</SelectItem>
            {COLORS.map((color) => (
              <SelectItem key={color.value} value={color.value}>
                {color.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Material */}
      <div>
        <FilterLabel isActive={isMaterialActive} filterKey="material">
          Material
        </FilterLabel>
        <Select
          value={currentMaterial || "all"}
          onValueChange={(value) =>
            updateParams({ material: value === "all" ? null : value })
          }
        >
          <SelectTrigger
            className={
              isMaterialActive
                ? "border-zinc-500 ring-1 ring-zinc-500 dark:border-zinc-400 dark:ring-zinc-400"
                : ""
            }
          >
            <SelectValue placeholder="All Materials" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Materials</SelectItem>
            {MATERIALS.map((material) => (
              <SelectItem key={material.value} value={material.value}>
                {material.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Style */}
      <div>
        <FilterLabel isActive={isStyleActive} filterKey="style">
          Style
        </FilterLabel>
        <Select
          value={currentStyle || "all"}
          onValueChange={(value) =>
            updateParams({ style: value === "all" ? null : value })
          }
        >
          <SelectTrigger
            className={
              isStyleActive
                ? "border-zinc-500 ring-1 ring-zinc-500 dark:border-zinc-400 dark:ring-zinc-400"
                : ""
            }
          >
            <SelectValue placeholder="All Styles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Styles</SelectItem>
            {STYLES.map((style) => (
              <SelectItem key={style.value} value={style.value}>
                {style.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <FilterLabel isActive={isPriceActive} filterKey="price">
          Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
        </FilterLabel>
        <Slider
          min={0}
          max={10000}
          step={100}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          onValueCommit={([min, max]) =>
            updateParams({
              minPrice: min > 0 ? min : null,
              maxPrice: max < 10000 ? max : null,
            })
          }
          className={`mt-4 ${isPriceActive ? "[&_[role=slider]]:border-zinc-500 [&_[role=slider]]:ring-zinc-500" : ""}`}
        />
      </div>

      {/* In Stock Only */}
      <div>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) =>
              updateParams({ inStock: e.target.checked ? "true" : null })
            }
            className="h-5 w-5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800"
          />
          <span
            className={`text-sm font-medium ${
              isInStockActive
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-700 dark:text-zinc-300"
            }`}
          >
            Show only in-stock
            {isInStockActive && (
              <Badge className="ml-2 h-5 bg-zinc-900 px-1.5 text-xs text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
                Active
              </Badge>
            )}
          </span>
        </label>
      </div>

      {/* Sort */}
      <div>
        <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Sort By
        </span>
        <Select
          value={currentSort}
          onValueChange={(value) => updateParams({ sort: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
