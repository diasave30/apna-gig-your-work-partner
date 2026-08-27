import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Clock, Loader2, MapPin, XCircle } from "lucide-react";
import { useState } from "react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  SectionTitle,
  StickyFooter,
} from "@/components/apna/kit";
import { InfoRow } from "@/components/apna/job-kit";
import { rejectReasons } from "@/lib/job-data";
import { formatInr, setJobState, useActiveJob } from "@/lib/job-store";
import { cn } from "@/lib/utils";

type Action = "accept" | "reject";

export const Route = createFileRoute("/job-decision")({
  validateSearch: (search: Record<string, unknown>): { action: Action } => ({
    action: search.action === "reject" ? "reject" : "accept",
  }),
  head: () => ({
    meta: [
      { title: "Confirm Job Decision | Apna Gig" },
      {
        name: "description",
        content: "Confirm acceptance or share a reason for declining a service request.",
      },
      { property: "og:title", content: "Confirm Job Decision | Apna Gig" },
      { property: "og:description", content: "Accept or reject a job with one clear confirmation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobDecision,
});

function JobDecision() {
  const { action } = Route.useSearch();
  const job = useActiveJob();
  const navigate = useNavigate();
  const [state, setState] = useState<"idle" | "working" | "done">("idle");
  const [reason, setReason] = useState<string | null>(null);

  function accept() {
    setState("working");
    setTimeout(() => {
      setJobState({ status: "accepted" });
      setState("done");
      setTimeout(() => navigate({ to: "/navigate-customer" }), 800);
    }, 900);
  }

  function reject() {
    if (!reason) return;
    setState("working");
    setTimeout(() => {
      setJobState({ status: "cancelled", rejectedReason: reason });
      setState("done");
      setTimeout(() => navigate({ to: "/job-requests" }), 900);
    }, 800);
  }

  return (
    <PhoneShell
      header={
        <ScreenHeader
          title={action === "accept" ? "Confirm & accept" : "Reject job"}
          subtitle={job.id}
          back="/job-details"
        />
      }
      footer={
        <StickyFooter>
          {action === "accept" ? (
            <AppButton onClick={accept} disabled={state !== "idle"}>
              {state === "working" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Accepting job…
                </>
              ) : (
                "Confirm & accept job"
              )}
            </AppButton>
          ) : (
            <AppButton onClick={reject} disabled={!reason || state !== "idle"}>
              {state === "working" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                </>
              ) : (
                "Confirm rejection"
              )}
            </AppButton>
          )}
          <AppButton variant="ghost" size="md" className="mt-1" to="/job-details">
            Go back to job details
          </AppButton>
        </StickyFooter>
      }
    >
      <Card className="space-y-1">
        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">{job.category}</p>
        <p className="text-sm font-bold leading-snug">{job.service}</p>
        <InfoRow icon={<MapPin className="h-3.5 w-3.5" />} label="Location" value={job.area} />
        <InfoRow
          icon={<Clock className="h-3.5 w-3.5" />}
          label="Date & time"
          value={`${job.date} · ${job.time}`}
        />
        <InfoRow label="Estimated earnings" value={formatInr(job.earnings)} />
        <InfoRow label="Travel" value={`${job.distanceKm} km · ~${job.travelMin} min`} />
      </Card>

      {action === "accept" ? (
        <>
          <SectionTitle title="Before you accept" />
          <Card className="space-y-2 text-xs text-muted-foreground">
            <p>• Reach the customer location before {job.time}.</p>
            <p>• Carry your Apna Gig worker ID and required tools.</p>
            <p>• Start the job only after verifying the customer start OTP.</p>
          </Card>
          {state === "done" ? (
            <p className="mt-4 flex items-center gap-2 rounded-2xl bg-success-soft px-4 py-3 text-xs font-bold text-success">
              <CheckCircle2 className="h-4 w-4" /> Job accepted. Opening navigation…
            </p>
          ) : null}
        </>
      ) : (
        <>
          <SectionTitle title="Why are you rejecting?" />
          <div className="space-y-2">
            {rejectReasons.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setReason(option)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-2xl border bg-card px-4 py-3.5 text-left text-sm font-semibold shadow-card",
                  reason === option ? "border-primary text-primary" : "border-border",
                )}
              >
                {option}
                {reason === option ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : null}
              </button>
            ))}
          </div>
          {state === "done" ? (
            <p className="mt-4 flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-xs font-bold text-muted-foreground">
              <XCircle className="h-4 w-4" /> Job rejected. Showing other requests…
            </p>
          ) : null}
        </>
      )}
    </PhoneShell>
  );
}
