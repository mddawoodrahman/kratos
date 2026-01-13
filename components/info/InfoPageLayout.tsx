"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface InfoPageLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "full";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "6xl": "max-w-6xl",
  full: "max-w-full",
};

export function InfoPageLayout({
  title,
  subtitle,
  breadcrumbs = [],
  children,
  className,
  maxWidth = "4xl",
}: InfoPageLayoutProps) {
  const allBreadcrumbs = [
    { label: "Home", href: "/" },
    ...breadcrumbs,
    { label: title },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="border-b bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm">
              {allBreadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                  {index === 0 && (
                    <Home
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-foreground">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className={cn(
          "mx-auto px-4 py-12 sm:px-6 lg:px-8",
          maxWidthClasses[maxWidth],
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

// Reusable section component for consistent styling
interface InfoSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function InfoSection({
  title,
  children,
  className,
  id,
}: InfoSectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20", className)}>
      {title && (
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">{title}</h2>
      )}
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {children}
      </div>
    </section>
  );
}

// Table of contents for long legal pages
interface TableOfContentsItem {
  id: string;
  label: string;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 rounded-lg border bg-card p-6"
    >
      <h2 className="mb-4 text-lg font-semibold">On This Page</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
