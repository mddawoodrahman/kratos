"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, Truck } from "lucide-react";
import { AddToCartButton } from "@/components/app/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface ProductInfoProps {
  product: {
    _id: string;
    name: string | null;
    description: string | null;
    price: number | null;
    stock: number | null;
    size: string | null;
    color: string | null;
    material: string | null;
    style: string | null;
    images: Array<{
      _key: string;
      asset?: { _id: string; url: string | null } | null;
      hotspot?: unknown | null;
    }> | null;
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  const mainImage = product.images?.[0]?.asset?.url;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          {product.name}
        </h1>
        <div className="mt-2 flex items-center gap-4">
          <div className="text-2xl font-bold">{formatPrice(product.price)}</div>
          {(product.stock ?? 0) > 0 ? (
            <Badge
              variant="outline"
              className="text-green-600 border-green-200 bg-green-50"
            >
              In Stock
            </Badge>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>
      </div>

      {/* Attributes Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        {product.size && (
          <div className="rounded-lg border p-3">
            <span className="text-muted-foreground block text-xs mb-1">
              Size
            </span>
            <span className="font-medium">{product.size}</span>
          </div>
        )}
        {product.color && (
          <div className="rounded-lg border p-3">
            <span className="text-muted-foreground block text-xs mb-1">
              Color
            </span>
            <span className="font-medium capitalize">{product.color}</span>
          </div>
        )}
        {product.material && (
          <div className="rounded-lg border p-3">
            <span className="text-muted-foreground block text-xs mb-1">
              Material
            </span>
            <span className="font-medium capitalize">{product.material}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 py-6 border-y border-border">
        <AddToCartButton
          productId={product._id}
          name={product.name ?? "Product"}
          price={product.price ?? 0}
          stock={product.stock ?? 0}
          image={mainImage ?? undefined}
          className="w-full h-12 text-lg"
        />
        <p className="text-xs text-muted-foreground text-center">
          {(product.stock ?? 0) <= 5 && (product.stock ?? 0) > 0
            ? `Only ${product.stock} left — order soon!`
            : "Free shipping on orders over ₹1000"}
        </p>
      </div>

      <div className="space-y-4">
        <div className="prose prose-sm dark:prose-invert">
          <p>{product.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
          <div className="rounded-full bg-secondary p-2">
            <Truck className="h-4 w-4" />
          </div>
          <span>Fast Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
          <div className="rounded-full bg-secondary p-2">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span>Secure Payment</span>
        </div>
        <div className="flex flex-col items-center gap-2 text-center text-xs text-muted-foreground">
          <div className="rounded-full bg-secondary p-2">
            <Star className="h-4 w-4" />
          </div>
          <span>Premium Quality</span>
        </div>
      </div>
    </motion.div>
  );
}
