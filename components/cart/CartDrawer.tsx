"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStock } from "@/lib/hooks/useCartStock";
import { motionTokens } from "@/lib/motion";
import {
  useCartActions,
  useCartIsOpen,
  useCartItems,
  useTotalItems,
} from "@/lib/store/cart-store-provider";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const items = useCartItems();
  const isOpen = useCartIsOpen();
  const totalItems = useTotalItems();
  const { closeCart, removeItem, updateQuantity } = useCartActions();
  const { stockMap, isLoading, hasStockIssues } = useCartStock(items);

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col sm:max-w-md p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center gap-2 text-lg">
            <ShoppingBag className="h-5 w-5" />
            Cart ({totalItems})
            {isLoading && (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center"
          >
            <div className="rounded-full bg-secondary p-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground">
                Add items to get started.
              </p>
            </div>
            <SheetClose asChild>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </SheetClose>
          </motion.div>
        ) : (
          <>
            {/* Stock Issues Banner */}
            {hasStockIssues && !isLoading && (
              <div className="flex items-center gap-2 border-b bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>Some items have stock issues.</span>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence initial={false}>
                {items.map((item) => {
                  const stockInfo = stockMap.get(item.productId);
                  const hasIssue =
                    stockInfo && stockInfo.currentStock < item.quantity;
                  return (
                    <motion.div
                      key={item.productId}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: motionTokens.duration.normal }}
                      className="border-b"
                    >
                      <div className="flex gap-4 p-4">
                        {/* Image */}
                        <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-md bg-secondary">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                              No img
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-medium line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.price)}
                            </p>
                            {hasIssue && (
                              <Badge
                                variant="destructive"
                                className="mt-1 text-xs"
                              >
                                Only {stockInfo?.currentStock} left
                              </Badge>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1,
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1,
                                )
                              }
                              disabled={
                                stockInfo &&
                                item.quantity >= stockInfo.currentStock
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 self-start text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.productId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Footer / Summary */}
            <SheetFooter className="flex-col gap-4 border-t p-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <SheetClose asChild>
                <Button
                  asChild
                  size="lg"
                  className="w-full"
                  disabled={hasStockIssues}
                >
                  <Link href="/checkout">Checkout Securely</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="outline" size="lg" className="w-full">
                  Continue Shopping
                </Button>
              </SheetClose>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
