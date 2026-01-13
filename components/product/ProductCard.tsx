"use client";

import { motion } from "framer-motion";
import { Eye, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { useCartActions } from "@/lib/store/cart-store-provider";
import { cn, formatPrice } from "@/lib/utils";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

// Use the exact type from Sanity queries for compatibility
type Product = FILTER_PRODUCTS_BY_NAME_QUERYResult[number];

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartActions();
  const [isAdding, setIsAdding] = useState(false);

  const mainImage = product.images?.[0]?.asset?.url;
  const hoverImage = product.images?.[1]?.asset?.url || mainImage;
  const price = product.price || 0;
  const isOutOfStock = (product.stock ?? 0) <= 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAdding(true);

    addItem({
      productId: product._id,
      name: product.name ?? "Unknown Product",
      price: price,
      image: mainImage ?? undefined,
    });

    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <motion.div
      className="group relative flex flex-col gap-2"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-secondary">
          {/* Badge */}
          {isOutOfStock && (
            <div className="absolute top-2 left-2 z-20">
              <Badge variant="destructive">Sold Out</Badge>
            </div>
          )}

          {/* Images */}
          <div className="relative h-full w-full">
            {mainImage ? (
              <>
                <ResponsiveImage
                  src={mainImage}
                  alt={product.name || "Product"}
                  ratio={0.8}
                  priority={priority}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                {hoverImage && hoverImage !== mainImage && (
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-300",
                      isHovered ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <ResponsiveImage
                      src={hoverImage}
                      alt={product.name || "Product"}
                      ratio={0.8}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
                No Image
              </div>
            )}
          </div>

          {/* Quick Actions (Desktop) */}
          <div className="absolute bottom-4 left-0 right-0 z-20 mx-4 translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hidden md:flex gap-2">
            <Button
              className="flex-1 gap-2 bg-white/90 text-black shadow-sm backdrop-blur-sm hover:bg-white"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isAdding ? (
                <span className="text-green-600">Added!</span>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  {isOutOfStock ? "Out of Stock" : "Quick Add"}
                </>
              )}
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/90 backdrop-blur-sm hover:bg-white"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="mt-3 flex justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground capitalize">
              Category {/* Would need category data */}
            </p>
          </div>
          <div className="text-sm font-semibold">{formatPrice(price)}</div>
        </div>
      </Link>

      {/* Mobile Quick Add (Optional - maybe keep it simple on mobile) */}
      <Button
        size="icon"
        className="absolute right-2 top-2 z-10 md:hidden h-8 w-8 rounded-full shadow-md transition-transform active:scale-95"
        onClick={handleAddToCart}
        disabled={isOutOfStock}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
