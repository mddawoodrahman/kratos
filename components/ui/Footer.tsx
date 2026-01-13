import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  shop: [
    { label: "New Arrivals", href: "/products?category=new-arrivals" },
    { label: "Best Sellers", href: "/products?sort=popular" },
    { label: "Sale", href: "/products?category=sale" },
    { label: "All Products", href: "/products" },
  ],
  help: [
    { label: "Help Center", href: "/help" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "Size Guide", href: "/size-guide" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              KRATOS
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Modern clothing for the modern you. Quality craftsmanship,
              timeless style.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://facebook.com"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Help
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} Kratos. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" /> support@kratos.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
