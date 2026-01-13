import {
  ChevronRight,
  CreditCard,
  HelpCircle,
  MessageCircle,
  Package,
  RefreshCw,
  Ruler,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { InfoPageLayout } from "@/components/info";
import { Button } from "@/components/ui/button";

const helpTopics = [
  {
    icon: Package,
    title: "Track Your Order",
    description: "View order status and tracking information",
    href: "/orders",
    action: "Track Order",
  },
  {
    icon: Truck,
    title: "Shipping Information",
    description: "Delivery times, costs, and shipping options",
    href: "/shipping",
    action: "Learn More",
  },
  {
    icon: RefreshCw,
    title: "Returns & Exchanges",
    description: "Start a return or exchange an item",
    href: "/shipping#returns",
    action: "Start Return",
  },
  {
    icon: Ruler,
    title: "Size Guide",
    description: "Find your perfect fit with our sizing charts",
    href: "/size-guide",
    action: "View Sizes",
  },
  {
    icon: CreditCard,
    title: "Payment & Billing",
    description: "Payment methods, security, and billing questions",
    href: "/faqs#orders",
    action: "View FAQs",
  },
  {
    icon: HelpCircle,
    title: "FAQs",
    description: "Browse frequently asked questions",
    href: "/faqs",
    action: "Browse FAQs",
  },
];

const popularQuestions = [
  {
    question: "How do I track my order?",
    answer:
      "Go to 'My Orders' in your account or use the tracking number from your shipping confirmation email.",
    link: "/orders",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer 30-day returns on unworn items with original tags. Sale items are final sale.",
    link: "/shipping#returns",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5-7 business days. Express options are available for faster delivery.",
    link: "/shipping",
  },
  {
    question: "How do I find my size?",
    answer:
      "Check our Size Guide for detailed measurements and fit recommendations for each category.",
    link: "/size-guide",
  },
];

export const metadata = {
  title: "Help Center | Kratos",
  description:
    "Get help with orders, shipping, returns, sizing, and more at the Kratos Help Center.",
};

export default function HelpPage() {
  return (
    <InfoPageLayout
      title="Help Center"
      subtitle="How can we help you today?"
      maxWidth="6xl"
    >
      {/* Help Topics Grid */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Browse Help Topics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {helpTopics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="group rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:border-primary/50"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3 shrink-0">
                  <topic.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {topic.description}
                  </p>
                  <span className="text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    {topic.action}
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Questions */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Popular Questions</h2>
        <div className="space-y-4">
          {popularQuestions.map((item) => (
            <div key={item.question} className="rounded-lg border bg-card p-6">
              <h3 className="font-medium mb-2">{item.question}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {item.answer}
              </p>
              <Link
                href={item.link}
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                Learn more
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link href="/faqs">View All FAQs</Link>
          </Button>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="rounded-2xl bg-primary text-primary-foreground p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary-foreground/20 p-3 shrink-0">
              <MessageCircle className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
              <p className="text-primary-foreground/80">
                Our customer support team is here to assist you. Available
                Monday-Saturday, 9 AM - 8 PM IST.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 lg:shrink-0">
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a href="mailto:support@kratos.com">Email Support</a>
            </Button>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
