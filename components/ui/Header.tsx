"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartActions, useTotalItems } from "@/lib/store/cart-store-provider";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    href: "/products",
    label: "Shop",
  },
  {
    href: "/products?category=new-arrivals",
    label: "New Arrivals",
    highlight: true,
  },
  {
    href: "/products?category=apparel",
    label: "Apparel",
  },
  {
    href: "/products?category=accessories",
    label: "Accessories",
  },
  {
    href: "/products?category=sale",
    label: "Sale",
    accent: true,
  },
];

const ANNOUNCEMENT_MESSAGES = [
  "Free shipping on orders over ₹2,000",
  "New Collection Available — Shop Now",
  "Members get 15% off their first order",
];

export function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = React.useState(0);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = React.useState(searchParams.get("search") || "");
  const { openCart } = useCartActions();
  const totalItems = useTotalItems();

  // Scroll detection for header transformation
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Rotate announcements
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement(
        (prev) => (prev + 1) % ANNOUNCEMENT_MESSAGES.length,
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard shortcut for search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const isActiveLink = (href: string) => {
    if (
      href === "/products" &&
      pathname === "/products" &&
      !searchParams.get("category")
    ) {
      return true;
    }
    return (
      pathname +
        (searchParams.get("category")
          ? `?category=${searchParams.get("category")}`
          : "") ===
      href
    );
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-foreground text-background text-xs sm:text-sm py-2 text-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentAnnouncement}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="font-medium tracking-wide"
          >
            {ANNOUNCEMENT_MESSAGES[currentAnnouncement]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Main Header */}
      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/50"
            : "bg-background border-b border-transparent",
        )}
      >
        <div className="container mx-auto max-w-[1440px]">
          {/* Top Header Row */}
          <div className="flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
            {/* Left Section - Mobile Menu & Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 -ml-2"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-sm p-0">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="text-left font-bold text-xl tracking-tight">
                      KRATOS
                    </SheetTitle>
                  </SheetHeader>

                  {/* Mobile Search */}
                  <div className="p-4 border-b">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search products..."
                          className="w-full pl-10 h-11 bg-secondary/50 border-0"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col p-4">
                    {NAV_LINKS.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            "flex items-center justify-between py-4 text-lg font-medium border-b border-border/50 transition-colors",
                            link.accent && "text-red-600",
                            link.highlight && "text-primary",
                            isActiveLink(link.href) && "text-primary",
                          )}
                        >
                          {link.label}
                          {link.highlight && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>

                  {/* Mobile Account Section */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-secondary/30">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button className="w-full h-12 font-medium">
                          Sign In
                        </Button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex items-center gap-3">
                        <UserButton afterSwitchSessionUrl="/" />
                        <span className="text-sm font-medium">My Account</span>
                      </div>
                    </SignedIn>
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link href="/" className="flex items-center">
                <motion.h1
                  className={cn(
                    "font-bold tracking-[-0.02em] transition-all duration-300",
                    isScrolled ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl",
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  KRATOS
                </motion.h1>
              </Link>
            </div>

            {/* Center Section - Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors group",
                    link.accent
                      ? "text-red-600 hover:text-red-700"
                      : "text-muted-foreground hover:text-foreground",
                    isActiveLink(link.href) &&
                      !link.accent &&
                      "text-foreground",
                  )}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {link.label}
                    {link.highlight && (
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </span>

                  {/* Hover underline effect */}
                  <motion.span
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-foreground origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Active indicator */}
                  {isActiveLink(link.href) && !link.accent && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-foreground"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Desktop Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex h-10 w-10"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex h-10 w-10"
                asChild
              >
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10"
                onClick={openCart}
              >
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center"
                    >
                      {totalItems > 9 ? "9+" : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="sr-only">Cart ({totalItems} items)</span>
              </Button>

              {/* Account */}
              <div className="hidden sm:block">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost" size="icon" className="h-10 w-10">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Sign in</span>
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton
                    afterSwitchSessionUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "h-9 w-9",
                      },
                    }}
                  />
                </SignedIn>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSearchOpen(false)}
            />

            {/* Search Modal */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-0 left-0 right-0 z-[70] bg-background p-4 sm:p-6 shadow-2xl"
            >
              <div className="container mx-auto max-w-3xl">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 h-5 sm:h-6 w-5 sm:w-6 text-muted-foreground" />
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search for products, categories, styles..."
                    className="w-full h-14 sm:h-16 pl-12 sm:pl-16 pr-12 text-base sm:text-lg bg-secondary/50 border-0 rounded-xl focus-visible:ring-2 focus-visible:ring-foreground"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close search</span>
                  </Button>
                </form>

                {/* Quick Links */}
                <div className="mt-4 sm:mt-6">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "T-Shirts",
                      "Hoodies",
                      "Jackets",
                      "Denim",
                      "Accessories",
                    ].map((term) => (
                      <Button
                        key={term}
                        variant="secondary"
                        size="sm"
                        className="rounded-full text-sm font-medium"
                        onClick={() => {
                          setQuery(term);
                          router.push(
                            `/products?search=${encodeURIComponent(term)}`,
                          );
                          setIsSearchOpen(false);
                        }}
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Keyboard hint */}
                <p className="mt-4 text-xs text-muted-foreground text-center">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">
                    ESC
                  </kbd>{" "}
                  to close
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
