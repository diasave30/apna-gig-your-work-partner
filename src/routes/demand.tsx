import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, Sparkles, TrendingUp } from "lucide-react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  SectionTitle,
  StatusBadge,
  StickyFooter,
} from "@/components/apna/kit";
import {
  highDemandServices,
  monthlyDemand,
  nearbyDemand,
  seasonalSignals,
} from "@/lib/job-data";

export const Route = createFileRoute("/demand")({
  head: () => ({
    meta: [
      { title: "Demand Dashboard | Apna Gig" },
      {
        name: "description",
        content:
          "See nearby service demand, high-demand skills and monthly trends around Pune before picking your next job.",
      },
      { property: "og:title", content: "Demand Dashboard | Apna Gig" },
      {
        property: "og:description",
        content: "Local job demand insights for Apna Gig cooperative workers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DemandDashboard,
});

function DemandDashboard() {
  const navigate = useNavigate();
  const max = Math.max(...monthlyDemand.map((d) => d.value));

  return (
    <PhoneShell
      header={
        <ScreenHeader
          title="Demand insights"
          subtitle="Pune · updated 10 min ago"
          back="/dashboard"
        />
      }
      footer={
        <StickyFooter>
          <AppButton to="/job-requests">View nearby jobs</AppButton>
        </StickyFooter>
      }
    >
      <Card className="brand-gradient border-0 text-primary-foreground">
        <p className="text-xs opacity-90">Opportunities near you today</p>
        <p className="mt-1 text-3xl font-extrabold">62 jobs</p>
        <p className="mt-1 text-[11px] opacity-90">
          Within 10 km of Kothrud · matched to your verified skills
        </p>
      </Card>

      <SectionTitle title="Nearby demand" />
      <div className="space-y-3">
        {nearbyDemand.map((area) => (
          <Card
            key={area.area}
            onClick={() => navigate({ to: "/job-requests" })}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft">
                <MapPin className="h-5 w-5 text-primary" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{area.area}</p>
                <p className="text-[11px] text-muted-foreground">{area.distance} away</p>
              </div>
            </div>
            <StatusBadge kind="info" label={`${area.jobs} jobs`} />
          </Card>
        ))}
      </div>

      <SectionTitle title="High-demand services" />
      <div className="space-y-3">
        {highDemandServices.map((service) => (
          <Card
            key={service.name}
            onClick={() => navigate({ to: "/job-requests" })}
            className="flex items-center justify-between gap-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-lg">
                {service.emoji}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{service.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {service.jobs} requests this month
                </p>
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-success">
              <TrendingUp className="h-3.5 w-3.5" /> {service.trend}
            </span>
          </Card>
        ))}
      </div>

      <SectionTitle title="Monthly demand trend" />
      <Card>
        <div className="flex h-36 items-end gap-3">
          {monthlyDemand.map((d) => (
            <div key={d.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-muted-foreground">{d.value}</span>
              <span
                className="w-full rounded-t-lg brand-gradient"
                style={{ height: `${(d.value / max) * 100}%` }}
              />
              <span className="truncate text-[10px] font-semibold text-muted-foreground">
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <SectionTitle title="Seasonal signals" />
      <div className="space-y-3">
        {seasonalSignals.map((signal) => (
          <Card key={signal.title} className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div className="min-w-0">
              <p className="text-sm font-bold">{signal.title}</p>
              <p className="text-xs text-muted-foreground">{signal.detail}</p>
            </div>
          </Card>
        ))}
      </div>
    </PhoneShell>
  );
}
