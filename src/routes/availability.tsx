import { createFileRoute } from "@tanstack/react-router";
import { CalendarOff, Plus } from "lucide-react";
import { useState } from "react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  StatusBadge,
  StickyFooter,
} from "@/components/apna/kit";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/availability")({
  head: () => ({
    meta: [
      { title: "Availability Calendar | Apna Gig" },
      {
        name: "description",
        content: "Set your working days, time slots and leave dates so you get the right jobs.",
      },
      { property: "og:title", content: "Availability Calendar | Apna Gig" },
      { property: "og:description", content: "Control exactly when you receive job requests." },
    ],
  }),
  component: Availability,
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const slots = ["8:00 AM – 12:00 PM", "12:00 PM – 4:00 PM", "4:00 PM – 8:00 PM"];

function Availability() {
  const [workingDays, setWorkingDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
  const [activeSlots, setActiveSlots] = useState<string[]>([slots[0]!, slots[2]!]);
  const [unavailable, setUnavailable] = useState<number[]>([14, 15]);

  const monthStart = 5; // 1 Sep 2026 grid offset
  const cells = Array.from({ length: 30 }, (_, i) => i + 1);

  function toggle<T>(list: T[], value: T, set: (v: T[]) => void) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  return (
    <PhoneShell
      header={<ScreenHeader title="My availability" subtitle="September 2026" back="/dashboard" />}
      footer={
        <StickyFooter>
          <AppButton to="/dashboard">Save availability</AppButton>
        </StickyFooter>
      }
    >
      <h2 className="mb-3 text-[15px] font-bold tracking-tight">Working days</h2>
      <div className="flex gap-1.5">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => toggle(workingDays, day, setWorkingDays)}
            className={cn(
              "min-w-0 flex-1 rounded-xl py-2.5 text-[11px] font-bold transition-colors",
              workingDays.includes(day)
                ? "brand-gradient text-primary-foreground"
                : "bg-secondary text-muted-foreground",
            )}
          >
            {day}
          </button>
        ))}
      </div>

      <h2 className="mb-3 mt-6 text-[15px] font-bold tracking-tight">Available time slots</h2>
      <div className="space-y-2">
        {slots.map((slot) => {
          const active = activeSlots.includes(slot);
          return (
            <button
              key={slot}
              type="button"
              onClick={() => toggle(activeSlots, slot, setActiveSlots)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left shadow-card transition-colors",
                active ? "border-primary bg-primary-soft" : "border-border bg-card",
              )}
            >
              <span className="min-w-0 text-sm font-bold">{slot}</span>
              <StatusBadge
                kind={active ? "verified" : "not-submitted"}
                label={active ? "Available" : "Off"}
              />
            </button>
          );
        })}
      </div>
      <AppButton variant="outline" size="md" className="mt-3" icon={<Plus className="h-4 w-4" />}>
        Add custom time slot
      </AppButton>

      <h2 className="mb-3 mt-6 text-[15px] font-bold tracking-tight">
        Mark unavailable dates
      </h2>
      <Card>
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-muted-foreground">
          {days.map((d) => (
            <span key={d}>{d[0]}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: monthStart }).map((_, i) => (
            <span key={`pad-${i}`} />
          ))}
          {cells.map((date) => {
            const off = unavailable.includes(date);
            return (
              <button
                key={date}
                type="button"
                onClick={() => toggle(unavailable, date, setUnavailable)}
                className={cn(
                  "grid aspect-square place-items-center rounded-lg text-xs font-semibold transition-colors",
                  off
                    ? "bg-destructive-soft text-destructive"
                    : "bg-secondary text-foreground hover:bg-primary-soft",
                )}
              >
                {date}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap gap-3 text-[10px] font-semibold text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded bg-secondary" /> Available
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded bg-destructive-soft" /> Unavailable
          </span>
        </div>
      </Card>

      <Card className="mt-3 flex items-start gap-3">
        <CalendarOff className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <div className="min-w-0">
          <p className="text-sm font-bold">Leave period</p>
          <p className="text-xs text-muted-foreground">
            14 – 15 Sep 2026 · Family function (approved by cooperative)
          </p>
        </div>
      </Card>
    </PhoneShell>
  );
}
