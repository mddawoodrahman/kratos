import {
  InfoPageLayout,
  InfoSection,
  TableOfContents,
} from "@/components/info";

const tocItems = [
  { id: "information-collection", label: "Information We Collect" },
  { id: "information-use", label: "How We Use Your Information" },
  { id: "information-sharing", label: "Information Sharing" },
  { id: "data-security", label: "Data Security" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "your-rights", label: "Your Rights" },
  { id: "children", label: "Children's Privacy" },
  { id: "changes", label: "Policy Changes" },
  { id: "contact", label: "Contact Us" },
];

export const metadata = {
  title: "Privacy Policy | Kratos",
  description:
    "Learn how Kratos collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout
      title="Privacy Policy"
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
              At Kratos, we take your privacy seriously. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website or make a purchase. Please
              read this policy carefully.
            </p>
          </div>

          <InfoSection
            title="Information We Collect"
            id="information-collection"
          >
            <h4 className="font-semibold mt-4 mb-2">Personal Information</h4>
            <p className="text-muted-foreground mb-4">
              We collect personal information that you voluntarily provide when
              you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Create an account or make a purchase</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact our customer support</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="text-muted-foreground mb-4">
              This information may include: name, email address, phone number,
              shipping/billing address, payment information, and order history.
            </p>

            <h4 className="font-semibold mt-6 mb-2">
              Automatically Collected Information
            </h4>
            <p className="text-muted-foreground">
              When you visit our website, we automatically collect certain
              information including your IP address, browser type, operating
              system, referring URLs, pages viewed, and the dates/times of your
              visits.
            </p>
          </InfoSection>

          <InfoSection title="How We Use Your Information" id="information-use">
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </InfoSection>

          <InfoSection title="Information Sharing" id="information-sharing">
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Service Providers:</strong> Payment processors, shipping
                carriers, and email service providers who help us operate our
                business
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets
              </li>
            </ul>
          </InfoSection>

          <InfoSection title="Data Security" id="data-security">
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>256-bit SSL encryption for all data transmission</li>
              <li>PCI-DSS compliant payment processing</li>
              <li>Regular security audits and updates</li>
              <li>Limited access to personal data on a need-to-know basis</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              However, no method of transmission over the internet is 100%
              secure. While we strive to protect your information, we cannot
              guarantee absolute security.
            </p>
          </InfoSection>

          <InfoSection title="Cookies & Tracking" id="cookies">
            <p className="text-muted-foreground mb-4">
              We use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Remember your preferences and login status</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Personalize your shopping experience</li>
              <li>Deliver targeted advertisements</li>
            </ul>
            <p className="text-muted-foreground">
              You can control cookies through your browser settings. Note that
              disabling cookies may affect some website functionality.
            </p>
          </InfoSection>

          <InfoSection title="Your Rights" id="your-rights">
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>
                <strong>Access:</strong> Request a copy of your personal
                information
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate
                data
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                information
              </li>
              <li>
                <strong>Portability:</strong> Request transfer of your data to
                another service
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us at privacy@kratos.com.
            </p>
          </InfoSection>

          <InfoSection title="Children's Privacy" id="children">
            <p className="text-muted-foreground">
              Our website is not intended for children under 13 years of age. We
              do not knowingly collect personal information from children. If
              you believe we have collected information from a child, please
              contact us immediately.
            </p>
          </InfoSection>

          <InfoSection title="Policy Changes" id="changes">
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy on
              this page and updating the "Last updated" date. We encourage you
              to review this policy periodically.
            </p>
          </InfoSection>

          <InfoSection title="Contact Us" id="contact">
            <p className="text-muted-foreground mb-4">
              If you have questions about this Privacy Policy or our privacy
              practices, please contact us:
            </p>
            <div className="rounded-lg border bg-card p-4">
              <p className="font-medium mb-2">Kratos Privacy Team</p>
              <p className="text-sm text-muted-foreground">
                Email: privacy@kratos.com
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
