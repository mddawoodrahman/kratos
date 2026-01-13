import { SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/app/ProductGrid";
import { FiltersPanel } from "@/components/filters/FiltersPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries/categories";
import {
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
} from "@/lib/sanity/queries/products";
import { sanityFetch } from "@/sanity/lib/live";

export const metadata = {
  title: "Shop All Products | Kratos",
  description:
    "Discover our curated collection of premium clothing and accessories.",
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    search?: string;
    category?: string;
    size?: string;
    color?: string;
    material?: string;
    style?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    inStock?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const searchQuery = params.q ?? params.search ?? "";
  const categorySlug = params.category ?? "";
  const size = params.size ?? "";
  const color = params.color ?? "";
  const material = params.material ?? "";
  const style = params.style ?? "";
  const minPrice = Number(params.minPrice) || 0;
  const maxPrice = Number(params.maxPrice) || 0;
  const sort = params.sort ?? "name";
  const inStock = params.inStock === "true";

  // Select query based on sort parameter
  const getQuery = () => {
    if (searchQuery && sort === "relevance")
      return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    switch (sort) {
      case "price_asc":
        return FILTER_PRODUCTS_BY_PRICE_ASC_QUERY;
      case "price_desc":
        return FILTER_PRODUCTS_BY_PRICE_DESC_QUERY;
      case "relevance":
        return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
      default:
        return FILTER_PRODUCTS_BY_NAME_QUERY;
    }
  };

  // Fetch products
  const { data: products } = await sanityFetch({
    query: getQuery(),
    params: {
      searchQuery,
      categorySlug,
      size,
      color,
      material,
      style,
      minPrice,
      maxPrice,
      inStock,
    },
  });

  // Fetch categories
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  // Find current category for header
  const currentCategory = categorySlug
    ? categories.find((c: { slug: string | null }) => c.slug === categorySlug)
    : null;

  // Count active filters
  const activeFilters = [
    categorySlug && {
      key: "category",
      value: currentCategory?.title || categorySlug,
    },
    size && { key: "size", value: size.toUpperCase() },
    color && { key: "color", value: color },
    material && { key: "material", value: material },
    style && { key: "style", value: style },
  ].filter(Boolean) as { key: string; value: string }[];

  // Get page title
  const getPageTitle = () => {
    if (searchQuery) return `Search: "${searchQuery}"`;
    if (currentCategory?.title) return currentCategory.title;
    return "All Products";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Category Hero Header */}
      <div className="relative bg-secondary">
        {currentCategory?.image?.asset?.url && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={currentCategory.image.asset.url}
              alt={currentCategory.title || "Category"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/products"
              className="hover:text-foreground transition-colors"
            >
              Shop
            </Link>
            {currentCategory && (
              <>
                <span>/</span>
                <span className="text-foreground font-medium">
                  {currentCategory.title}
                </span>
              </>
            )}
          </nav>

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {getPageTitle()}
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {searchQuery
              ? `Found ${products.length} result${products.length !== 1 ? "s" : ""}`
              : currentCategory
                ? "Discover our curated selection of premium pieces"
                : "Explore our complete collection of clothing and accessories"}
          </p>

          {/* Category Quick Links */}
          {!searchQuery && !categorySlug && categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {categories
                .slice(0, 6)
                .map((cat: { slug: string | null; title: string | null }) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="rounded-full border border-border bg-background/80 backdrop-blur-sm px-4 py-2 text-sm font-medium transition-all hover:bg-foreground hover:text-background hover:border-foreground"
                  >
                    {cat.title}
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Bar */}
      {activeFilters.length > 0 && (
        <div className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.key}
                  variant="secondary"
                  className="gap-1.5 pl-3 pr-1.5 py-1 capitalize"
                >
                  {filter.value}
                  <Link
                    href={`/products?${new URLSearchParams(
                      Object.fromEntries(
                        Object.entries(params).filter(
                          ([k]) => k !== filter.key,
                        ),
                      ),
                    ).toString()}`}
                    className="ml-1 rounded-full p-0.5 hover:bg-background/50"
                  >
                    <X className="h-3 w-3" />
                  </Link>
                </Badge>
              ))}
              <Link
                href="/products"
                className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline ml-2"
              >
                Clear all
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Mobile Filter Trigger */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFilters.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full max-w-sm overflow-y-auto"
              >
                <SheetHeader className="mb-6">
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <FiltersPanel
                  categories={categories}
                  minPrice={0}
                  maxPrice={15000}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Filters Sidebar */}
          <aside className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24">
              <FiltersPanel
                categories={categories}
                minPrice={0}
                maxPrice={15000}
              />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 min-w-0">
            <ProductGrid products={products} totalCount={products.length} />
          </main>
        </div>
      </div>
    </div>
  );
}
