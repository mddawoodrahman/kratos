import {
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  RefreshCw,
  Truck,
} from "lucide-react";
import {
  InfoPageLayout,
  InfoSection,
  TableOfContents,
} from "@/components/info";
import { Badge } from "@/components/ui/badge";

const tocItems = [
  { id: "shipping-options", label: "Shipping Options" },
  { id: "delivery-times", label: "Delivery Times" },
  { id: "shipping-cost", label: "Shipping Cost" },
  { id: "tracking", label: "Order Tracking" },
  { id: "returns", label: "Return Policy" },
  { id: "exchanges", label: "Exchanges" },
  { id: "refunds", label: "Refunds" },
];

const shippingOptions = [
  {
    name: "Standard Shipping",
    time: "5-7 business days",
    cost: "₹99 (Free over ₹1000)",
    description: "Our most economical shipping option",
  },
  {
    name: "Express Shipping",
    time: "2-3 business days",
    cost: "₹199",
    description: "Faster delivery for urgent orders",
  },
  {
    name: "Next Day Delivery",
    time: "1 business day",
    cost: "₹349",
    description: "Order by 2 PM for next-day delivery (Metro cities only)",
  },
];

const deliveryTimes = [
  { region: "Metro Cities", standard: "4-5 days", express: "1-2 days" },
  { region: "Tier 1 Cities", standard: "5-6 days", express: "2-3 days" },
  { region: "Tier 2 Cities", standard: "6-7 days", express: "3-4 days" },
  { region: "Remote Areas", standard: "7-10 days", express: "5-7 days" },
];

export const metadata = {
  title: "Shipping & Returns | Kratos",
  description:
    "Learn about our shipping options, delivery times, return policy, and exchange process.",
};

export default function ShippingPage() {
  return (
    <InfoPageLayout
      title="Shipping & Returns"
      subtitle="Everything you need to know about getting your order and our hassle-free returns."
      breadcrumbs={[{ label: "Help", href: "/help" }]}
      maxWidth="4xl"
    >
      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar with TOC */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <TableOfContents items={tocItems} />
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-12">
          {/* Shipping Options */}
          <InfoSection title="Shipping Options" id="shipping-options">
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {shippingOptions.map((option) => (
                <div
                  key={option.name}
                  className="rounded-lg border bg-card p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{option.name}</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary mb-1">
                    {option.time}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {option.cost}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </InfoSection>

          {/* Delivery Times */}
          <InfoSection title="Delivery Times by Region" id="delivery-times">
            <p className="text-muted-foreground mb-6">
              Estimated delivery times vary based on your location. Orders
              placed before 2 PM are processed the same day.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left font-semibold">
                      Region
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Standard
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Express
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryTimes.map((row) => (
                    <tr key={row.region} className="border-b">
                      <td className="px-4 py-3 font-medium">{row.region}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.standard}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {row.express}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InfoSection>

          {/* Shipping Cost */}
          <InfoSection title="Shipping Cost" id="shipping-cost">
            <div className="rounded-lg border bg-primary/5 p-6 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <Package className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">
                  Free Shipping on Orders Over ₹1000!
                </span>
              </div>
              <p className="text-muted-foreground">
                Enjoy free standard shipping on all orders above ₹1000. No
                coupon code needed – the discount is applied automatically at
                checkout.
              </p>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                Standard shipping: ₹99 for orders under ₹1000
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                Express shipping: ₹199 (2-3 business days)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                Next-day delivery: ₹349 (metro cities only)
              </li>
            </ul>
          </InfoSection>

          {/* Order Tracking */}
          <InfoSection title="Order Tracking" id="tracking">
            <div className="flex items-start gap-4 rounded-lg border p-6">
              <Clock className="h-8 w-8 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Track Your Order</h3>
                <p className="text-muted-foreground">
                  Once your order ships, you'll receive an email with your
                  tracking number. You can also track your order status anytime
                  by visiting 'My Orders' in your account.
                </p>
              </div>
            </div>
          </InfoSection>

          {/* Returns */}
          <InfoSection title="Return Policy" id="returns">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  30-Day Returns
                </Badge>
              </div>
              <p className="text-muted-foreground">
                We want you to love your purchase. If you're not completely
                satisfied, you can return most items within 30 days of delivery
                for a full refund.
              </p>
              <h4 className="font-semibold mt-6 mb-3">Return Conditions:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  Items must be unworn, unwashed, and in original condition
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  All original tags must be attached
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  Items must be returned in original packaging
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  Sale items are final sale and cannot be returned
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  Intimates and swimwear cannot be returned for hygiene reasons
                </li>
              </ul>
            </div>
          </InfoSection>

          {/* Exchanges */}
          <InfoSection title="Exchanges" id="exchanges">
            <div className="flex items-start gap-4 rounded-lg border p-6">
              <RefreshCw className="h-8 w-8 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Easy Size Exchanges</h3>
                <p className="text-muted-foreground mb-4">
                  Need a different size? We make exchanges simple. Just initiate
                  a return and select 'Exchange' – we'll ship your new size as
                  soon as we receive your return.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Exchanges are subject to availability.
                  If your preferred size is out of stock, we'll process a full
                  refund instead.
                </p>
              </div>
            </div>
          </InfoSection>

          {/* Refunds */}
          <InfoSection title="Refunds" id="refunds">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Once we receive and inspect your return, we'll process your
                refund within 5-7 business days. The refund will be credited to
                your original payment method.
              </p>
              <div className="rounded-lg border bg-muted/50 p-4">
                <h4 className="font-semibold mb-2">Refund Timeline:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>
                    <strong>Credit/Debit Card:</strong> 5-7 business days
                  </li>
                  <li>
                    <strong>UPI/Wallet:</strong> 3-5 business days
                  </li>
                  <li>
                    <strong>Net Banking:</strong> 5-10 business days
                  </li>
                </ul>
              </div>
            </div>
          </InfoSection>
        </div>
      </div>
    </InfoPageLayout>
  );
}
