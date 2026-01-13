import { Award, Heart, Leaf, Sparkles, Target, Users } from "lucide-react";
import Link from "next/link";
import { InfoPageLayout, InfoSection } from "@/components/info";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Heart,
    title: "Quality First",
    description:
      "We never compromise on quality. Every garment is crafted with attention to detail and built to last.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "From eco-friendly materials to ethical manufacturing, we're committed to reducing our environmental footprint.",
  },
  {
    icon: Award,
    title: "Timeless Design",
    description:
      "We create pieces that transcend trends – versatile, elegant, and designed to be worn season after season.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We believe in building genuine connections with our customers and supporting the communities we serve.",
  },
];

const stats = [
  { value: "2018", label: "Founded" },
  { value: "50K+", label: "Happy Customers" },
  { value: "100%", label: "Sustainable Cotton" },
  { value: "15+", label: "Cities Served" },
];

const team = [
  {
    name: "Arjun Sharma",
    role: "Founder & CEO",
    image: "/team/arjun.jpg",
    description:
      "Fashion industry veteran with 15+ years of experience in sustainable fashion.",
  },
  {
    name: "Priya Patel",
    role: "Creative Director",
    image: "/team/priya.jpg",
    description:
      "Award-winning designer bringing modern aesthetics to classic silhouettes.",
  },
  {
    name: "Vikram Reddy",
    role: "Head of Operations",
    image: "/team/vikram.jpg",
    description:
      "Supply chain expert ensuring quality at every step of production.",
  },
  {
    name: "Ananya Gupta",
    role: "Head of Customer Experience",
    image: "/team/ananya.jpg",
    description: "Dedicated to making every customer interaction exceptional.",
  },
];

export const metadata = {
  title: "About Us | Kratos",
  description:
    "Learn about Kratos, our mission to redefine modern fashion with quality, sustainability, and timeless design.",
};

export default function AboutPage() {
  return (
    <InfoPageLayout
      title="About Us"
      subtitle="Redefining modern fashion with quality, sustainability, and timeless design."
      breadcrumbs={[{ label: "Company" }]}
      maxWidth="6xl"
    >
      {/* Our Story */}
      <InfoSection className="mb-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Kratos was born from a simple belief: everyone deserves access
                to quality clothing that looks great, feels amazing, and doesn't
                cost the earth – literally.
              </p>
              <p>
                Founded in 2018 by a team of fashion industry veterans, we set
                out to challenge the status quo. We saw an industry plagued by
                fast fashion waste, poor quality, and exploitative practices. We
                knew there had to be a better way.
              </p>
              <p>
                Today, Kratos stands as proof that fashion can be both beautiful
                and responsible. Every piece in our collection is thoughtfully
                designed, ethically manufactured, and made to become a lasting
                part of your wardrobe.
              </p>
            </div>
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted">
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Sparkles className="mx-auto h-12 w-12 mb-2" />
                <p>Brand Story Image</p>
              </div>
            </div>
          </div>
        </div>
      </InfoSection>

      {/* Stats */}
      <div className="mb-16 rounded-2xl bg-primary text-primary-foreground p-8 lg:p-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold lg:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-primary-foreground/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <InfoSection className="mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <Target className="mx-auto h-12 w-12 text-primary mb-6" />
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-muted-foreground">
            To make sustainable, quality fashion accessible to everyone. We're
            proving that you don't have to choose between looking good, feeling
            good, and doing good.
          </p>
        </div>
      </InfoSection>

      {/* Values */}
      <InfoSection title="Our Values" className="mb-16">
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border bg-card p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </InfoSection>

      {/* Team */}
      <InfoSection title="Meet the Team" className="mb-16">
        <p className="text-muted-foreground mb-8">
          The passionate individuals behind Kratos, working every day to bring
          you the best in sustainable fashion.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative mx-auto mb-4 aspect-square w-40 overflow-hidden rounded-full bg-muted">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-2xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-primary">{member.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </InfoSection>

      {/* CTA */}
      <div className="rounded-2xl border bg-secondary/30 p-8 text-center lg:p-12">
        <h2 className="text-2xl font-bold mb-4">Join the Kratos Community</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Be the first to know about new collections, exclusive offers, and
          sustainability initiatives.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/careers">Join Our Team</Link>
          </Button>
        </div>
      </div>
    </InfoPageLayout>
  );
}
