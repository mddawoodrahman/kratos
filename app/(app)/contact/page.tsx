"use client";

import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { InfoPageLayout, InfoSection } from "@/components/info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@kratos.com",
    href: "mailto:support@kratos.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 1800-123-4567",
    href: "tel:+911800123567",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Fashion Street, Mumbai, Maharashtra 400001",
    href: "https://maps.google.com",
  },
];

const businessHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 8:00 PM IST" },
  { day: "Saturday", hours: "10:00 AM - 6:00 PM IST" },
  { day: "Sunday", hours: "Closed" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent!", {
      description: "We'll get back to you within 24-48 hours.",
    });
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <InfoPageLayout
      title="Contact Us"
      subtitle="Have a question or need help? We're here for you."
      breadcrumbs={[{ label: "Help", href: "/help" }]}
      maxWidth="6xl"
    >
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <div>
          <InfoSection title="Send Us a Message">
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select name="subject" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="order">Order Inquiry</SelectItem>
                    <SelectItem value="product">Product Question</SelectItem>
                    <SelectItem value="return">Returns & Exchanges</SelectItem>
                    <SelectItem value="shipping">
                      Shipping Information
                    </SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderNumber">Order Number (Optional)</Label>
                <Input
                  id="orderNumber"
                  name="orderNumber"
                  placeholder="ORD-XXXX-XXXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="How can we help you?"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </InfoSection>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <InfoSection title="Get in Touch">
            <p className="text-muted-foreground">
              Our customer support team is ready to assist you with any
              questions about orders, products, or general inquiries.
            </p>
            <div className="mt-6 space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
                >
                  <div className="rounded-full bg-primary/10 p-3">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </InfoSection>

          <InfoSection title="Business Hours">
            <div className="mt-4 rounded-lg border bg-card p-4">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Clock className="h-5 w-5" />
                <span className="font-medium">Working Hours</span>
              </div>
              <dl className="space-y-2">
                {businessHours.map((item) => (
                  <div key={item.day} className="flex justify-between text-sm">
                    <dt className="text-muted-foreground">{item.day}</dt>
                    <dd className="font-medium">{item.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </InfoSection>

          {/* Map Placeholder */}
          <div className="rounded-lg border bg-muted/50 aspect-video flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="mx-auto h-12 w-12 mb-2" />
              <p className="font-medium">Store Location</p>
              <p className="text-sm">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  );
}
