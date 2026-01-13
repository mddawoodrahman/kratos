import {
  InfoPageLayout,
  InfoSection,
  TableOfContents,
} from "@/components/info";

const tocItems = [
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "use-of-site", label: "Use of Website" },
  { id: "accounts", label: "User Accounts" },
  { id: "products", label: "Products & Pricing" },
  { id: "orders", label: "Orders & Payment" },
  { id: "shipping", label: "Shipping & Delivery" },
  { id: "returns", label: "Returns & Refunds" },
  { id: "intellectual-property", label: "Intellectual Property" },
  { id: "limitation", label: "Limitation of Liability" },
  { id: "indemnification", label: "Indemnification" },
  { id: "governing-law", label: "Governing Law" },
  { id: "contact", label: "Contact Information" },
];

export const metadata = {
  title: "Terms of Service | Kratos",
  description:
    "Read the terms and conditions that govern your use of the Kratos website and services.",
};

export default function TermsPage() {
  return (
    <InfoPageLayout
      title="Terms of Service"
      subtitle="Last updated: January 1, 2026"
      breadcrumbs={[{ label: "Company" }]}
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
        <div className="lg:col-span-3 space-y-10">
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground">
              Welcome to Kratos. These Terms of Service ("Terms") govern your
              use of our website and the purchase of products from our online
              store. By accessing or using our website, you agree to be bound by
              these Terms.
            </p>
          </div>

          <InfoSection title="1. Acceptance of Terms" id="acceptance">
            <p className="text-muted-foreground mb-4">
              By accessing and using this website, you accept and agree to be
              bound by these Terms and our Privacy Policy. If you do not agree
              to these Terms, you must not use our website.
            </p>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. Your
              continued use of the website following any changes constitutes
              your acceptance of the revised Terms.
            </p>
          </InfoSection>

          <InfoSection title="2. Use of Website" id="use-of-site">
            <p className="text-muted-foreground mb-4">
              You agree to use this website only for lawful purposes and in a
              way that does not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>Interfere with or disrupt the website's operation</li>
              <li>
                Attempt to gain unauthorized access to any systems or networks
              </li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Collect or harvest user data without consent</li>
            </ul>
          </InfoSection>

          <InfoSection title="3. User Accounts" id="accounts">
            <p className="text-muted-foreground mb-4">
              When you create an account, you must provide accurate and complete
              information. You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate accounts that violate
              these Terms or are used for fraudulent purposes.
            </p>
          </InfoSection>

          <InfoSection title="4. Products & Pricing" id="products">
            <p className="text-muted-foreground mb-4">
              We make every effort to display products accurately, but we cannot
              guarantee that colors shown on your device will exactly match the
              actual product.
            </p>
            <p className="text-muted-foreground mb-4">
              All prices are displayed in Indian Rupees (₹) and include
              applicable taxes unless otherwise stated. We reserve the right to
              change prices without notice.
            </p>
            <p className="text-muted-foreground">
              In the event of a pricing error, we reserve the right to cancel
              any orders placed at the incorrect price and will notify you of
              the cancellation.
            </p>
          </InfoSection>

          <InfoSection title="5. Orders & Payment" id="orders">
            <p className="text-muted-foreground mb-4">
              When you place an order, you are making an offer to purchase. We
              reserve the right to accept or reject any order for any reason,
              including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Product unavailability</li>
              <li>Errors in product or pricing information</li>
              <li>Suspected fraudulent transactions</li>
            </ul>
            <p className="text-muted-foreground">
              Payment must be made at the time of order. We accept major
              credit/debit cards, UPI, net banking, and select digital wallets.
              All payments are processed securely through our payment partners.
            </p>
          </InfoSection>

          <InfoSection title="6. Shipping & Delivery" id="shipping">
            <p className="text-muted-foreground mb-4">
              We ship to addresses within India. Delivery times are estimates
              and may vary based on location and other factors. We are not
              responsible for delays caused by:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Incorrect shipping information provided by you</li>
              <li>Carrier delays or disruptions</li>
              <li>Weather conditions or natural disasters</li>
              <li>Customs delays for international orders (when available)</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Risk of loss transfers to you upon delivery to the carrier.
            </p>
          </InfoSection>

          <InfoSection title="7. Returns & Refunds" id="returns">
            <p className="text-muted-foreground mb-4">
              Please refer to our Shipping & Returns page for complete details
              on our return policy. Key points include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Returns accepted within 30 days of delivery</li>
              <li>Items must be unworn with original tags attached</li>
              <li>Sale items are final sale and non-returnable</li>
              <li>
                Refunds processed within 5-7 business days of receiving the
                return
              </li>
            </ul>
          </InfoSection>

          <InfoSection
            title="8. Intellectual Property"
            id="intellectual-property"
          >
            <p className="text-muted-foreground mb-4">
              All content on this website, including but not limited to text,
              graphics, logos, images, product descriptions, and software, is
              the property of Kratos or its licensors and is protected by
              copyright and trademark laws.
            </p>
            <p className="text-muted-foreground">
              You may not reproduce, distribute, modify, or create derivative
              works from any content without our prior written consent.
            </p>
          </InfoSection>

          <InfoSection title="9. Limitation of Liability" id="limitation">
            <p className="text-muted-foreground mb-4">
              To the fullest extent permitted by law, Kratos shall not be liable
              for any indirect, incidental, special, consequential, or punitive
              damages arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Your use or inability to use our website or products</li>
              <li>Any unauthorized access to your personal information</li>
              <li>Any interruption or cessation of our services</li>
              <li>Any errors or omissions in our content</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Our total liability shall not exceed the amount paid by you for
              the specific product or service giving rise to the claim.
            </p>
          </InfoSection>

          <InfoSection title="10. Indemnification" id="indemnification">
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless Kratos, its officers,
              directors, employees, and agents from any claims, damages, losses,
              or expenses (including legal fees) arising from your violation of
              these Terms or your use of our website.
            </p>
          </InfoSection>

          <InfoSection title="11. Governing Law" id="governing-law">
            <p className="text-muted-foreground mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of India. Any disputes arising from these Terms or your
              use of our website shall be subject to the exclusive jurisdiction
              of the courts in Mumbai, Maharashtra.
            </p>
            <p className="text-muted-foreground">
              If any provision of these Terms is found to be unenforceable, the
              remaining provisions shall continue in full force and effect.
            </p>
          </InfoSection>

          <InfoSection title="12. Contact Information" id="contact">
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-medium mb-2">Kratos Legal Team</p>
              <p className="text-sm text-muted-foreground">
                Email: legal@kratos.com
              </p>
              <p className="text-sm text-muted-foreground">
                Phone: +91 1800-123-4567
              </p>
              <p className="text-sm text-muted-foreground">
                Address: 123 Fashion Street, Mumbai, Maharashtra 400001
              </p>
            </div>
          </InfoSection>
        </div>
      </div>
    </InfoPageLayout>
  );
}
