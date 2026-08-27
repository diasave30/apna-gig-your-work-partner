import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Clock,
  IndianRupee,
  MapPin,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  SectionTitle,
  StickyFooter,
} from "@/components/apna/kit";
import { InfoRow, JobStatusBadge, MapPanel } from "@/components/apna/job-kit";
import { formatInr, useActiveJob } from "@/lib/job-store";

export const Route = createFileRoute("/job-details")({
  head: () => ({
    meta: [
      { title: "Job Details | Apna Gig" },
      {
        name: "description",
        content:
          "Full job brief: customer area, service description, duration, safety guidance and estimated earnings.",
      },
      { property: "og:title", content: "Job Details | Apna Gig" },
      { property: "og:description", content: "Review a service request before accepting it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobDetails,
});

function JobDetails() {
  const job = useActiveJob();
  const navigate = useNavigate();

  return (
    <PhoneShell
      header={<ScreenHeader title="Job details" subtitle={job.id} back="/job-requests" />}
      footer={
        <StickyFooter>
          <AppButton onClick={() => navigate({ to: "/job-decision", search: { action: "accept" } })}>
            Accept job · {formatInr(job.earnings)}
          </AppButton>
          <AppButton
            variant="outline"
            size="md"
            className="mt-2"
            onClick={() => navigate({ to: "/job-decision", search: { action: "reject" } })}
          >
            Reject job
          </AppButton>
        </StickyFooter>
      }
    >
      <Card className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
              {job.category}
            </p>
            <p className="mt-0.5 text-base font-bold leading-snug">{job.service}</p>
          </div>
          <JobStatusBadge status={job.status} />
        </div>
        <p className="text-xs text-muted-foreground">{job.description}</p>
      </Card>

      <SectionTitle title="Customer & location" />
      <Card>
        <InfoRow label="Customer" value={job.customer} />
        <InfoRow icon={<MapPin className="h-3.5 w-3.5" />} label="Area" value={job.area} />
        <InfoRow label="Address" value={job.address} />
        <InfoRow label="Distance" value={`${job.distanceKm} km · ~${job.travelMin} min ride`} />
        <div className="mt-3">
          <MapPanel
            label={job.area}
            distance={`${job.distanceKm} km`}
            eta={`${job.travelMin} min`}
            height={170}
          />
        </div>
        <AppButton variant="soft" size="md" className="mt-3" icon={<Phone className="h-4 w-4" />}>
          Contact customer (masked number)
        </AppButton>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Full address and contact number unlock after you accept the job.
        </p>
      </Card>

      <SectionTitle title="Service information" />
      <Card>
        <InfoRow icon={<Clock className="h-3.5 w-3.5" />} label="Scheduled" value={`${job.date} · ${job.time}`} />
        <InfoRow label="Expected duration" value={`~${job.durationMin} minutes`} />
        <div className="mt-2 rounded-2xl bg-secondary p-3">
          <p className="text-[11px] font-bold">Customer instructions</p>
          <p className="mt-1 text-xs text-muted-foreground">{job.instructions}</p>
        </div>
      </Card>

      <SectionTitle title="Earnings & payment" />
      <Card>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="flex items-center text-2xl font-extrabold text-success">
              <IndianRupee className="h-5 w-5" />
              {job.earnings.toLocaleString("en-IN")}
            </p>
            <p className="text-[11px] text-muted-foreground">Estimated earnings for this job</p>
          </div>
          <Wallet className="h-6 w-6 text-primary" />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{job.payment}</p>
      </Card>

      <SectionTitle title="Safety information" />
      <Card className="space-y-3">
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          Verified customer address. Share your live location with the cooperative while travelling.
        </p>
        <p className="flex items-start gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          Start the job only after verifying the customer OTP. Never accept cash payments.
        </p>
        <AppButton
          variant="outline"
          size="md"
          to="/incident"
          icon={<ShieldAlert className="h-4 w-4 text-destructive" />}
        >
          Report a concern about this job
        </AppButton>
      </Card>
    </PhoneShell>
  );
}
