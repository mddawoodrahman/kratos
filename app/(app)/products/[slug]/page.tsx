import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { PRODUCT_BY_SLUG_QUERY } from "@/lib/sanity/queries/products";
import { sanityFetch } from "@/sanity/lib/live";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await sanityFetch({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Kratos`,
    description: product.description,
    openGraph: {
      images: product.images?.[0]?.asset?.url
        ? [product.images[0].asset.url]
        : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const { data: product } = await sanityFetch({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <ProductGallery
            images={product.images || []}
            productName={product.name || "Product"}
          />

          {/* Info */}
          <ProductInfo product={product} />
        </div>
      </div>
    </div>
  );
}
