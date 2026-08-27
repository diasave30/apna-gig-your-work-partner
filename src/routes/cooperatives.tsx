import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Users } from "lucide-react";
import { useState } from "react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  StatusBadge,
  StepProgress,
  StickyFooter,
} from "@/components/apna/kit";
import { cooperatives } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cooperatives")({
  head: () => ({
    meta: [
      { title: "Choose Your Cooperative | Apna Gig" },
      {
        name: "description",
        content: "Browse approved worker cooperatives in your city and request membership.",
      },
      { property: "og:title", content: "Choose Your Cooperative | Apna Gig" },
      {
        property: "og:description",
        content: "Cooperative membership brings steady work and worker benefits.",
      },
    ],
  }),
  component: Cooperatives,
});

function Cooperatives() {
  const [joined, setJoined] = useState<string | null>(null);

  return (
    <PhoneShell
      header={
        <ScreenHeader
          title="Cooperative membership"
          subtitle="Pune district"
          back="/skill-verification"
        />
      }
      footer={
        <StickyFooter>
          <AppButton to="/worker-id" disabled={!joined}>
            {joined ? "Continue to Worker ID" : "Select a cooperative to continue"}
          </AppButton>
        </StickyFooter>
      }
    >
      <StepProgress step={6} total={7} />

      <p className="mb-4 text-sm text-muted-foreground">
        Your cooperative assigns jobs, supports you during disputes and manages your benefits.
      </p>

      <div className="space-y-3">
        {cooperatives.map((coop) => {
          const active = joined === coop.id;
          return (
            <Card
              key={coop.id}
              className={cn(active && "border-primary bg-primary-soft/40")}
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl brand-gradient">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight">{coop.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{coop.description}</p>
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {coop.location}
                  </p>
                </div>
                <StatusBadge
                  kind={active ? "verified" : coop.status}
                  label={active ? "Joined" : coop.statusLabel}
                />
              </div>
              <div className="mt-3">
                <AppButton
                  variant={active ? "soft" : "primary"}
                  size="md"
                  onClick={() => setJoined(active ? null : coop.id)}
                >
                  {active ? "Selected — tap to change" : "Request to join"}
                </AppButton>
              </div>
            </Card>
          );
        })}
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
        You can be a member of one cooperative at a time. Membership requests are usually approved
        within 24 hours.
      </p>
    </PhoneShell>
  );
}
