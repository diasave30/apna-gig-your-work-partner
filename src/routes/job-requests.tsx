import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  SectionTitle,
  StickyFooter,
  inputClass,
} from "@/components/apna/kit";
import { FilterChips, JobCard } from "@/components/apna/job-kit";
import { jobs } from "@/lib/job-data";
import { selectJob } from "@/lib/job-store";

export const Route = createFileRoute("/job-requests")({
  head: () => ({
    meta: [
      { title: "Job Requests | Apna Gig" },
      {
        name: "description",
        content:
          "New service requests near you with distance, timing, duration and estimated earnings in ₹.",
      },
      { property: "og:title", content: "Job Requests | Apna Gig" },
      { property: "og:description", content: "Accept nearby verified service jobs on Apna Gig." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobRequests,
});

const categories = ["All services", "Plumbing", "Electrical Repair", "Home Cleaning", "Appliance Repair"];
const distances = ["Any distance", "Under 3 km", "Under 5 km", "Under 10 km"];
const times = ["Any time", "Today", "Tomorrow"];

function JobRequests() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]!);
  const [distance, setDistance] = useState(distances[0]!);
  const [time, setTime] = useState(times[0]!);
  const [showFilters, setShowFilters] = useState(true);

  const filtered = jobs.filter((job) => {
    const q = query.trim().toLowerCase();
    if (q && !`${job.service} ${job.category} ${job.area}`.toLowerCase().includes(q)) return false;
    if (category !== "All services" && job.category !== category) return false;
    if (distance === "Under 3 km" && job.distanceKm >= 3) return false;
    if (distance === "Under 5 km" && job.distanceKm >= 5) return false;
    if (distance === "Under 10 km" && job.distanceKm >= 10) return false;
    if (time === "Today" && !job.date.startsWith("Today")) return false;
    if (time === "Tomorrow" && !job.date.startsWith("Tomorrow")) return false;
    return true;
  });

  function open(id: string) {
    selectJob(id);
    navigate({ to: "/job-details" });
  }

  return (
    <PhoneShell
      header={
        <ScreenHeader
          title="Job requests"
          subtitle={`${filtered.length} new requests near Kothrud`}
          back="/demand"
          action={
            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              aria-label="Toggle filters"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card shadow-card"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          }
        />
      }
      footer={
        <StickyFooter>
          <AppButton variant="outline" to="/dashboard">
            Back to home dashboard
          </AppButton>
        </StickyFooter>
      }
    >
      <div className="relative pt-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search service or area"
          className={`${inputClass} pl-11`}
        />
      </div>

      {showFilters ? (
        <div className="mt-3 space-y-2">
          <FilterChips options={categories} value={category} onChange={setCategory} />
          <FilterChips options={distances} value={distance} onChange={setDistance} />
          <FilterChips options={times} value={time} onChange={setTime} />
        </div>
      ) : null}

      <SectionTitle title="New requests" />
      {filtered.length === 0 ? (
        <Card className="text-center">
          <p className="text-sm font-bold">No matching job requests</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try widening the distance or clearing the service filter.
          </p>
          <AppButton
            variant="soft"
            size="md"
            className="mt-4"
            onClick={() => {
              setQuery("");
              setCategory(categories[0]!);
              setDistance(distances[0]!);
              setTime(times[0]!);
            }}
          >
            Clear filters
          </AppButton>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => open(job.id)} />
          ))}
        </div>
      )}
    </PhoneShell>
  );
}
