"use client";

import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  MessageCircle,
  Package,
  RefreshCw,
  Ruler,
  Search,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { InfoPageLayout } from "@/components/info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  faqs: FAQ[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "orders",
    name: "Orders & Payment",
    icon: CreditCard,
    faqs: [
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive an email with a tracking number. You can also view your order status in your account under 'My Orders'. Click on any order to see detailed tracking information.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit and debit cards (Visa, MasterCard, American Express), UPI, net banking, and popular wallets like Paytm and PhonePe. All transactions are secured with 256-bit SSL encryption.",
      },
      {
        question: "Can I modify or cancel my order?",
        answer:
          "You can modify or cancel your order within 1 hour of placing it. After that, the order enters processing and cannot be changed. Contact our support team immediately if you need assistance.",
      },
      {
        question: "Why was my payment declined?",
        answer:
          "Payments may be declined due to insufficient funds, incorrect card details, or security blocks from your bank. Please verify your details and try again, or contact your bank for assistance.",
      },
    ],
  },
  {
    id: "shipping",
    name: "Shipping & Delivery",
    icon: Truck,
    faqs: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. Metro cities typically receive orders faster than other locations.",
      },
      {
        question: "Do you offer free shipping?",
        answer:
          "Yes! We offer free standard shipping on all orders above ₹1000. Orders below this amount have a flat shipping fee of ₹99.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Currently, we ship within India only. We're working on expanding to international destinations soon. Sign up for our newsletter to be notified when international shipping becomes available.",
      },
      {
        question: "What if my package is lost or damaged?",
        answer:
          "Contact us immediately if your package appears lost or arrives damaged. We'll investigate with the carrier and either reship your order or provide a full refund within 5-7 business days.",
      },
    ],
  },
  {
    id: "returns",
    name: "Returns & Exchanges",
    icon: RefreshCw,
    faqs: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unworn items with original tags attached. Items must be in their original condition. Sale items are final sale and cannot be returned.",
      },
      {
        question: "How do I initiate a return?",
        answer:
          "Go to 'My Orders' in your account, select the order containing the item you want to return, and click 'Request Return'. You'll receive a prepaid shipping label via email within 24 hours.",
      },
      {
        question: "How long does it take to process a refund?",
        answer:
          "Once we receive your return, we'll inspect the item and process your refund within 5-7 business days. The refund will be credited to your original payment method.",
      },
      {
        question: "Can I exchange an item for a different size?",
        answer:
          "Yes! When initiating a return, select 'Exchange' and choose your preferred size. If the size is in stock, we'll ship it as soon as we receive your return.",
      },
    ],
  },
  {
    id: "products",
    name: "Products & Sizing",
    icon: Ruler,
    faqs: [
      {
        question: "How do I find my correct size?",
        answer:
          "Check our detailed Size Guide for measurements. Each product page also includes specific sizing recommendations. If you're between sizes, we generally recommend sizing up for a comfortable fit.",
      },
      {
        question: "Are your products true to size?",
        answer:
          "Most of our products are true to size. However, some styles may run slightly larger or smaller. Check the product description for specific fit notes.",
      },
      {
        question: "What materials do you use?",
        answer:
          "We use premium materials including 100% organic cotton, sustainable linen, recycled polyester, and responsibly-sourced wool. Material composition is listed on each product page.",
      },
      {
        question: "How should I care for my garments?",
        answer:
          "Care instructions are included on each garment's label and product page. Generally, we recommend washing in cold water, avoiding bleach, and air drying when possible to maintain quality.",
      },
    ],
  },
  {
    id: "account",
    name: "Account & Support",
    icon: MessageCircle,
    faqs: [
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign In' in the header and select 'Create Account'. You can register with your email or sign in with Google. Having an account lets you track orders, save addresses, and checkout faster.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "Click 'Sign In', then 'Forgot Password'. Enter your email address and we'll send you a secure link to reset your password. The link expires after 24 hours for security.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach us via email at support@kratos.com, phone at +91 1800-123-4567, or through the contact form on our website. Our team is available Monday-Saturday, 9 AM - 8 PM IST.",
      },
      {
        question: "How do I unsubscribe from emails?",
        answer:
          "Click the 'Unsubscribe' link at the bottom of any marketing email. You can also manage your email preferences in your account settings. Note: You'll still receive transactional emails about your orders.",
      },
    ],
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left hover:text-primary transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-medium pr-4">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 pb-4" : "max-h-0",
        )}
      >
        <p className="text-muted-foreground">{faq.answer}</p>
      </div>
    </div>
  );
}

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return faqCategories;

    const query = searchQuery.toLowerCase();
    return faqCategories
      .map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.faqs.length > 0);
  }, [searchQuery]);

  const displayCategories = activeCategory
    ? filteredCategories.filter((c) => c.id === activeCategory)
    : filteredCategories;

  return (
    <InfoPageLayout
      title="Frequently Asked Questions"
      subtitle="Find quick answers to common questions about orders, shipping, returns, and more."
      breadcrumbs={[{ label: "Help", href: "/help" }]}
      maxWidth="4xl"
    >
      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-lg"
        />
      </div>

      {/* Category Pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(null)}
        >
          All Topics
        </Button>
        {faqCategories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon className="mr-2 h-4 w-4" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* FAQ Categories */}
      {displayCategories.length > 0 ? (
        <div className="space-y-8">
          {displayCategories.map((category) => (
            <section key={category.id} className="rounded-lg border bg-card">
              <div className="flex items-center gap-3 border-b bg-muted/50 px-6 py-4">
                <category.icon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{category.name}</h2>
                <span className="ml-auto text-sm text-muted-foreground">
                  {category.faqs.length} questions
                </span>
              </div>
              <div className="px-6">
                {category.faqs.map((faq, index) => {
                  const itemId = `${category.id}-${index}`;
                  return (
                    <FAQItem
                      key={itemId}
                      faq={faq}
                      isOpen={openItems.has(itemId)}
                      onToggle={() => toggleItem(itemId)}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No results found</h3>
          <p className="mt-2 text-muted-foreground">
            We couldn't find any FAQs matching "{searchQuery}".
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      )}

      {/* Still Need Help */}
      <div className="mt-12 rounded-lg border bg-primary/5 p-8 text-center">
        <MessageCircle className="mx-auto h-10 w-10 text-primary" />
        <h3 className="mt-4 text-xl font-semibold">Still have questions?</h3>
        <p className="mt-2 text-muted-foreground">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <Button asChild className="mt-4">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </InfoPageLayout>
  );
}
