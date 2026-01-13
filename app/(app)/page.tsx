import { Suspense } from "react";
import { CategoryTiles } from "@/components/app/CategoryTiles";
import { FeaturedCarousel } from "@/components/app/FeaturedCarousel";
import { FeaturedCarouselSkeleton } from "@/components/app/FeaturedCarouselSkeleton";
import { ProductSection } from "@/components/app/ProductSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { HeroSection, type HeroSlide } from "@/components/home/HeroSection";
import { Footer } from "@/components/ui/Footer";
import { ALL_CATEGORIES_QUERY } from "@/lib/sanity/queries/categories";
import { HOMEPAGE_QUERY } from "@/lib/sanity/queries/homepage";
import {
  FEATURED_PRODUCTS_QUERY,
  FILTER_PRODUCTS_BY_NAME_QUERY,
  FILTER_PRODUCTS_BY_PRICE_ASC_QUERY,
  FILTER_PRODUCTS_BY_PRICE_DESC_QUERY,
  FILTER_PRODUCTS_BY_RELEVANCE_QUERY,
} from "@/lib/sanity/queries/products";
import { sanityFetch } from "@/sanity/lib/live";

interface PageProps {
  searchParams: Promise<{
    q?: string;
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

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;

  const searchQuery = params.q ?? "";
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
    // If searching and sort is relevance, use relevance query
    if (searchQuery && sort === "relevance") {
      return FILTER_PRODUCTS_BY_RELEVANCE_QUERY;
    }

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

  // Fetch products with filters (server-side via GROQ)
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

  // Fetch categories for filter sidebar
  const { data: categories } = await sanityFetch({
    query: ALL_CATEGORIES_QUERY,
  });

  // Fetch featured products for carousel
  const { data: featuredProducts } = await sanityFetch({
    query: FEATURED_PRODUCTS_QUERY,
  });

  // Fetch homepage settings from Sanity (hero slides, section titles, etc.)
  const { data: homepage } = await sanityFetch({
    query: HOMEPAGE_QUERY,
  });

  // Transform Sanity hero slides to HeroSlide format
  const heroSlides: HeroSlide[] =
    homepage?.heroSlides?.map(
      (slide: {
        title?: string | null;
        subtitle?: string | null;
        image?: string | null;
        ctaText?: string | null;
        ctaLink?: string | null;
        textPosition?: "center" | "left" | "right" | null;
      }) => ({
        title: slide.title ?? null,
        subtitle: slide.subtitle ?? null,
        image: slide.image ?? null,
        ctaText: slide.ctaText ?? null,
        ctaLink: slide.ctaLink ?? null,
        textPosition: slide.textPosition ?? "center",
      }),
    ) ?? [];

  // If no filters are applied, show the redesigned homepage
  const isHomepage =
    !searchQuery && !categorySlug && !size && !color && !material && !style;

  if (isHomepage) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section - Dynamic slides from Sanity */}
        <HeroSection
          slides={heroSlides.length > 0 ? heroSlides : undefined}
          fallbackTitle="Elevate Your Style"
          fallbackSubtitle="Discover curated collections crafted for the modern wardrobe. Premium quality, timeless design."
          fallbackImage={
            featuredProducts[0]?.images?.[0]?.asset?.url ?? undefined
          }
        />

        {/* Category Grid */}
        <CategoryGrid categories={categories} />

        {/* Featured Products Carousel */}
        {featuredProducts.length > 0 && (
          <Suspense fallback={<FeaturedCarouselSkeleton />}>
            <FeaturedCarousel products={featuredProducts} />
          </Suspense>
        )}

        {/* Staff Picks / Featured Products Grid */}
        <FeaturedProducts
          title="New Arrivals"
          subtitle="The latest additions to our collection"
          products={products.slice(0, 8)}
        />

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // Otherwise show the filtered product listing
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Page Banner */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Shop {categorySlug ? categorySlug : "All Products"}
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Premium clothing for every occasion
          </p>
        </div>

        {/* Category Tiles - Full width */}
        <div className="mt-6">
          <CategoryTiles
            categories={categories}
            activeCategory={categorySlug || undefined}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductSection
          categories={categories}
          products={products}
          searchQuery={searchQuery}
        />
      </div>

      <Footer />
    </div>
  );
}
