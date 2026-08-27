import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, GraduationCap, IndianRupee, ShieldCheck, Briefcase } from "lucide-react";
import { useState } from "react";

import { AppButton, Logo, PhoneShell, StickyFooter } from "@/components/apna/kit";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "How Apna Gig Works | Worker Onboarding" },
      {
        name: "description",
        content:
          "Discover work opportunities, transparent earnings, safety and skill growth with Apna Gig.",
      },
      { property: "og:title", content: "How Apna Gig Works" },
      {
        property: "og:description",
        content: "Four things every Apna Gig worker gets: work, earnings, safety and growth.",
      },
    ],
  }),
  component: Onboarding,
});

const slides = [
  {
    icon: Briefcase,
    title: "Find work near you",
    body: "Get service jobs from verified customers in your own area. No middlemen, no daily hunting for work.",
  },
  {
    icon: IndianRupee,
    title: "Clear, on-time earnings",
    body: "See job rates in ₹ before you accept. Regular work through your cooperative with transparent payouts.",
  },
  {
    icon: ShieldCheck,
    title: "Safety you can trust",
    body: "Every job and customer is verified. Share your live status and reach support any time you need help.",
  },
  {
    icon: GraduationCap,
    title: "Grow your skills",
    body: "Free training, skill certification and cooperative benefits so you can earn more each year.",
  },
];

function Onboarding() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const slide = slides[index]!;
  const isLast = index === slides.length - 1;

  return (
    <PhoneShell
      header={
        <header className="flex shrink-0 items-center justify-between px-5 pt-2 pb-2">
          <span className="flex items-center gap-2">
            <Logo size={32} />
            <span className="text-sm font-bold">Apna Gig</span>
          </span>
          <Link to="/login" className="text-sm font-semibold text-muted-foreground">
            Skip
          </Link>
        </header>
      }
      footer={
        <StickyFooter>
          <div className="mb-4 flex justify-center gap-2">
            {slides.map((_, i) => (
              <span
                key={i}
                className={
                  i === index
                    ? "h-2 w-6 rounded-full brand-gradient"
                    : "h-2 w-2 rounded-full bg-muted"
                }
              />
            ))}
          </div>
          {isLast ? (
            <AppButton to="/login">Get Started</AppButton>
          ) : (
            <AppButton onClick={() => setIndex((i) => i + 1)}>Next</AppButton>
          )}
          {index > 0 ? (
            <AppButton
              variant="ghost"
              size="md"
              className="mt-2"
              onClick={() => setIndex((i) => i - 1)}
            >
              Back
            </AppButton>
          ) : (
            <AppButton
              variant="ghost"
              size="md"
              className="mt-2"
              onClick={() => navigate({ to: "/login" })}
            >
              I already have an account
            </AppButton>
          )}
        </StickyFooter>
      }
    >
      <div className="flex h-full flex-col items-center justify-center py-8 text-center">
        <div className="grid h-56 w-56 place-items-center rounded-[2.5rem] bg-primary-soft">
          <div className="grid h-32 w-32 place-items-center rounded-[2rem] brand-gradient shadow-float">
            <slide.icon className="h-14 w-14 text-primary-foreground" strokeWidth={1.6} />
          </div>
        </div>
        <h2 className="mt-9 text-[26px] font-extrabold leading-tight tracking-tight">
          {slide.title}
        </h2>
        <p className="mt-3 max-w-[300px] text-sm leading-relaxed text-muted-foreground">
          {slide.body}
        </p>
        <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-success-soft px-3 py-1.5 text-[11px] font-bold text-success">
          <BadgeCheck className="h-3.5 w-3.5" /> Trusted by 12,000+ workers
        </p>
      </div>
    </PhoneShell>
  );
}
