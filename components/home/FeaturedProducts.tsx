"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/ProductCard";
import { slideIn, staggerContainer } from "@/lib/motion";
import type { FILTER_PRODUCTS_BY_NAME_QUERYResult } from "@/sanity.types";

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  products: FILTER_PRODUCTS_BY_NAME_QUERYResult;
}

export function FeaturedProducts({
  title = "Staff Picks",
  subtitle = "Hand-selected favorites from our team",
  products,
}: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
        >
          {products.slice(0, 8).map((product, index) => (
            <motion.div key={product._id} variants={slideIn}>
              <ProductCard product={product} priority={index < 4} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
