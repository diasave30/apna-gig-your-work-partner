import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Download, QrCode, Star } from "lucide-react";

import {
  AppButton,
  Logo,
  PhoneShell,
  ScreenHeader,
  StepProgress,
  StickyFooter,
} from "@/components/apna/kit";
import { worker } from "@/lib/demo-data";

export const Route = createFileRoute("/worker-id")({
  head: () => ({
    meta: [
      { title: "Virtual Worker ID Card | Apna Gig" },
      {
        name: "description",
        content: "Your verified Apna Gig digital worker identity card with QR verification.",
      },
      { property: "og:title", content: "Virtual Worker ID Card | Apna Gig" },
      { property: "og:description", content: "Show your verified worker ID to any customer." },
    ],
  }),
  component: WorkerId,
});

function WorkerId() {
  return (
    <PhoneShell
      header={<ScreenHeader title="Worker ID card" subtitle="Verified digital identity" back="/cooperatives" />}
      footer={
        <StickyFooter>
          <AppButton to="/qr-verify" icon={<QrCode className="h-5 w-5" />}>
            Show / Verify QR
          </AppButton>
          <AppButton variant="outline" size="md" className="mt-2" to="/dashboard">
            Continue to Dashboard
          </AppButton>
        </StickyFooter>
      }
    >
      <StepProgress step={7} total={7} />

      <div className="overflow-hidden rounded-[1.75rem] brand-gradient p-5 shadow-float">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Logo size={30} />
            <span className="text-sm font-bold text-primary-foreground">Apna Gig</span>
          </span>
          <span className="rounded-full bg-primary-foreground/20 px-2.5 py-1 text-[10px] font-bold text-primary-foreground">
            WORKER ID
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <img
            src={worker.photo}
            alt={worker.name}
            className="h-20 w-20 shrink-0 rounded-2xl border-2 border-primary-foreground/40 object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold text-primary-foreground">{worker.name}</p>
            <p className="mt-0.5 text-[11px] font-medium text-primary-foreground/80">
              {worker.cooperative}
            </p>
            <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-foreground/20 px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
              <BadgeCheck className="h-3.5 w-3.5" /> Fully verified
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4 rounded-2xl bg-primary-foreground/15 p-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-primary-foreground/70">
              Worker ID
            </p>
            <p className="truncate font-mono text-sm font-bold text-primary-foreground">
              {worker.workerId}
            </p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground/70">
              Valid till
            </p>
            <p className="text-sm font-bold text-primary-foreground">31 Mar 2027</p>
          </div>
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-card">
            <QrCode className="h-16 w-16 text-foreground" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="flex items-center gap-1 text-lg font-extrabold">
            <Star className="h-4 w-4 fill-[var(--warning)] text-[var(--warning)]" /> {worker.rating}
          </p>
          <p className="text-[11px] text-muted-foreground">{worker.reviews} customer reviews</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
          <p className="text-lg font-extrabold">4 skills</p>
          <p className="text-[11px] text-muted-foreground">1 pending verification</p>
        </div>
      </div>

      <AppButton variant="outline" size="md" className="mt-4" icon={<Download className="h-4 w-4" />}>
        Save ID card to phone
      </AppButton>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
        This ID is issued by your cooperative and can be verified by any customer using the QR code.
      </p>
    </PhoneShell>
  );
}
