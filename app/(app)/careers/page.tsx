import {
  Briefcase,
  ChevronRight,
  Clock,
  Heart,
  Leaf,
  MapPin,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { InfoPageLayout, InfoSection } from "@/components/info";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description:
      "Comprehensive health insurance, mental health support, and wellness programs.",
  },
  {
    icon: Zap,
    title: "Flexible Work",
    description:
      "Hybrid work options, flexible hours, and generous PTO policy.",
  },
  {
    icon: Users,
    title: "Growth & Learning",
    description:
      "Annual learning budget, mentorship programs, and career development.",
  },
  {
    icon: Leaf,
    title: "Sustainability Perks",
    description:
      "Employee discounts, sustainable commute allowance, and volunteer days.",
  },
];

const openPositions = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Mumbai / Remote",
    type: "Full-time",
    description:
      "Build beautiful, performant user experiences for our e-commerce platform.",
  },
  {
    id: "2",
    title: "Fashion Designer",
    department: "Design",
    location: "Mumbai",
    type: "Full-time",
    description:
      "Create innovative designs that blend modern aesthetics with timeless style.",
  },
  {
    id: "3",
    title: "Digital Marketing Manager",
    department: "Marketing",
    location: "Mumbai / Remote",
    type: "Full-time",
    description:
      "Lead our digital marketing strategy and grow our brand presence.",
  },
  {
    id: "4",
    title: "Customer Experience Associate",
    department: "Customer Success",
    location: "Mumbai",
    type: "Full-time",
    description:
      "Deliver exceptional support and create memorable customer experiences.",
  },
  {
    id: "5",
    title: "Supply Chain Analyst",
    department: "Operations",
    location: "Mumbai",
    type: "Full-time",
    description:
      "Optimize our sustainable supply chain and logistics operations.",
  },
];

const cultureValues = [
  "We prioritize people over processes",
  "We embrace diversity and inclusion",
  "We're passionate about sustainability",
  "We celebrate creativity and innovation",
  "We believe in work-life harmony",
  "We support continuous learning",
];

export const metadata = {
  title: "Careers | Kratos",
  description:
    "Join the Kratos team. Explore open positions and help us redefine sustainable fashion.",
};

export default function CareersPage() {
  return (
    <InfoPageLayout
      title="Careers"
      subtitle="Join us in building the future of sustainable fashion."
      breadcrumbs={[{ label: "Company" }]}
      maxWidth="6xl"
    >
      {/* Hero Banner */}
      <div className="mb-16 rounded-2xl bg-primary text-primary-foreground p-8 lg:p-12">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold lg:text-3xl mb-4">
            More than a job – a mission.
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            At Kratos, we're not just selling clothes – we're building a
            movement. Join a team that's passionate about making fashion more
            sustainable, accessible, and beautiful.
          </p>
        </div>
      </div>

      {/* Culture */}
      <InfoSection title="Our Culture" className="mb-16">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-muted-foreground mb-6">
              We believe that great work happens when people feel valued,
              supported, and inspired. Our culture is built on trust,
              transparency, and a shared commitment to our mission.
            </p>
            <ul className="space-y-3">
              {cultureValues.map((value) => (
                <li key={value} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Users className="mx-auto h-12 w-12 mb-2" />
              <p>Team Culture Image</p>
            </div>
          </div>
        </div>
      </InfoSection>

      {/* Benefits */}
      <InfoSection title="Why Join Kratos?" className="mb-16">
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-xl border bg-card p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </InfoSection>

      {/* Open Positions */}
      <InfoSection title="Open Positions" id="positions" className="mb-16">
        <p className="text-muted-foreground mb-8">
          We're always looking for talented people who share our passion.
          Explore our current openings below.
        </p>
        <div className="space-y-4">
          {openPositions.map((position) => (
            <div
              key={position.id}
              className="group rounded-xl border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {position.title}
                    </h3>
                    <Badge variant="secondary">{position.department}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {position.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {position.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {position.type}
                    </span>
                  </div>
                </div>
                <Button className="shrink-0 group-hover:translate-x-1 transition-transform">
                  Apply Now
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </InfoSection>

      {/* Don't see a fit */}
      <div className="rounded-2xl border bg-secondary/30 p-8 text-center lg:p-12">
        <Briefcase className="mx-auto h-12 w-12 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-4">Don't see a perfect fit?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          We're always interested in hearing from talented individuals. Send us
          your resume and tell us how you can contribute to our mission.
        </p>
        <Button asChild size="lg">
          <Link href="mailto:careers@kratos.com">Send Your Resume</Link>
        </Button>
      </div>
    </InfoPageLayout>
  );
}
