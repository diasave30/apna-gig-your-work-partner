import { createFileRoute } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useState } from "react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  StepProgress,
  StickyFooter,
  inputClass,
} from "@/components/apna/kit";
import { skillCategories } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Select Your Skills | Apna Gig" },
      {
        name: "description",
        content: "Choose the services you provide and set your skill level for each one.",
      },
      { property: "og:title", content: "Select Your Skills | Apna Gig" },
      { property: "og:description", content: "Plumbing, electrical, cleaning, delivery and more." },
    ],
  }),
  component: Skills,
});

const levels = ["Beginner", "Skilled", "Expert"];

function Skills() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, string>>({
    plumbing: "Expert",
    appliance: "Skilled",
  });

  const results = skillCategories.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()),
  );
  const selectedIds = Object.keys(selected);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = "Skilled";
      return next;
    });
  }

  return (
    <PhoneShell
      header={<ScreenHeader title="Your skills" subtitle="Choose what you do best" back="/kyc" />}
      footer={
        <StickyFooter>
          <AppButton to="/skill-verification" disabled={selectedIds.length === 0}>
            Save & Continue ({selectedIds.length} selected)
          </AppButton>
        </StickyFooter>
      }
    >
      <StepProgress step={4} total={7} />

      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a skill or service"
          className={inputClass + " pl-11"}
        />
      </div>

      {selectedIds.length > 0 ? (
        <div className="mb-5 flex flex-wrap gap-2">
          {selectedIds.map((id) => {
            const skill = skillCategories.find((s) => s.id === id)!;
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggle(id)}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary"
              >
                {skill.name}
                <X className="h-3.5 w-3.5" />
              </button>
            );
          })}
        </div>
      ) : (
        <p className="mb-5 rounded-2xl bg-muted px-4 py-3 text-xs text-muted-foreground">
          No skills selected yet. Tap a category below to add it.
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {results.map((skill) => {
          const active = Boolean(selected[skill.id]);
          return (
            <button
              key={skill.id}
              type="button"
              onClick={() => toggle(skill.id)}
              className={cn(
                "rounded-2xl border p-4 text-left shadow-card transition-colors",
                active
                  ? "border-primary bg-primary-soft"
                  : "border-border bg-card hover:bg-secondary/60",
              )}
            >
              <span className="text-2xl">{skill.emoji}</span>
              <p className="mt-2 text-sm font-bold leading-tight">{skill.name}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{skill.jobs}</p>
            </button>
          );
        })}
      </div>

      {results.length === 0 ? (
        <Card className="mt-4 text-center text-xs text-muted-foreground">
          No skills match “{query}”. Try a different word.
        </Card>
      ) : null}

      {selectedIds.length > 0 ? (
        <>
          <h2 className="mb-3 mt-7 text-[15px] font-bold tracking-tight">Set your skill level</h2>
          <div className="space-y-3">
            {selectedIds.map((id) => {
              const skill = skillCategories.find((s) => s.id === id)!;
              return (
                <Card key={id}>
                  <p className="text-sm font-bold">{skill.name}</p>
                  <div className="mt-3 flex gap-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSelected((p) => ({ ...p, [id]: level }))}
                        className={cn(
                          "flex-1 rounded-xl px-2 py-2 text-xs font-bold transition-colors",
                          selected[id] === level
                            ? "brand-gradient text-primary-foreground"
                            : "bg-secondary text-muted-foreground",
                        )}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      ) : null}
    </PhoneShell>
  );
}
