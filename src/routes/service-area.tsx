import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Navigation, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  StatusBadge,
  StickyFooter,
} from "@/components/apna/kit";
import { serviceAreas } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/service-area")({
  head: () => ({
    meta: [
      { title: "Service Area | Apna Gig" },
      {
        name: "description",
        content: "Choose the localities and travel radius where you want to receive service jobs.",
      },
      { property: "og:title", content: "Service Area | Apna Gig" },
      { property: "og:description", content: "Work close to home — set your own coverage." },
    ],
  }),
  component: ServiceArea,
});

const radii = ["3 km", "5 km", "8 km", "12 km", "20 km"];

function ServiceArea() {
  const [areas, setAreas] = useState(serviceAreas);
  const [radius, setRadius] = useState("8 km");

  return (
    <PhoneShell
      header={<ScreenHeader title="Service area" subtitle="Pune, Maharashtra" back="/dashboard" />}
      footer={
        <StickyFooter>
          <AppButton to="/dashboard">Save service area</AppButton>
        </StickyFooter>
      }
    >
      <div className="relative mt-1 h-44 overflow-hidden rounded-2xl border border-border bg-primary-soft/60">
        <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(oklch(0.9_0.02_250)_1px,transparent_1px),linear-gradient(90deg,oklch(0.9_0.02_250)_1px,transparent_1px)] [background-size:28px_28px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="block h-32 w-32 rounded-full border-2 border-primary/40 bg-primary/10" />
        </div>
        <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full brand-gradient text-primary-foreground shadow-float">
          <MapPin className="h-5 w-5" />
        </span>
        <button
          type="button"
          className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-xl bg-card px-3 py-2 text-[11px] font-bold shadow-card"
        >
          <Navigation className="h-3.5 w-3.5 text-primary" /> Use my location
        </button>
      </div>

      <h2 className="mb-3 mt-6 text-[15px] font-bold tracking-tight">Travel radius</h2>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {radii.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRadius(r)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors",
              radius === r
                ? "brand-gradient text-primary-foreground"
                : "bg-secondary text-muted-foreground",
            )}
          >
            {r}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        You will receive jobs within {radius} of your selected localities.
      </p>

      <h2 className="mb-3 mt-6 text-[15px] font-bold tracking-tight">Preferred locations</h2>
      <div className="space-y-3">
        {areas.map((area) => (
          <Card key={area.id}>
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft">
                <MapPin className="h-5 w-5 text-primary" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">{area.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  PIN {area.pin} · up to {area.radius}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {area.primary ? <StatusBadge kind="info" label="Primary" /> : null}
                <button
                  type="button"
                  aria-label={`Remove ${area.name}`}
                  onClick={() => setAreas((prev) => prev.filter((a) => a.id !== area.id))}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-destructive-soft text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
        {areas.length === 0 ? (
          <Card className="text-center text-xs text-muted-foreground">
            No service areas yet. Add at least one locality to receive jobs.
          </Card>
        ) : null}
      </div>

      <AppButton
        variant="outline"
        size="md"
        className="mt-3"
        icon={<Plus className="h-4 w-4" />}
        onClick={() =>
          setAreas((prev) => [
            ...prev,
            {
              id: `area-${prev.length + 1}`,
              name: "Baner",
              pin: "411045",
              radius,
              primary: false,
            },
          ])
        }
      >
        Add service area
      </AppButton>
    </PhoneShell>
  );
}
