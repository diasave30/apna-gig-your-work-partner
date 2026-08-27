import { createFileRoute } from "@tanstack/react-router";
import { FileText, RefreshCcw, Upload } from "lucide-react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  StatusBadge,
  StepProgress,
  StickyFooter,
} from "@/components/apna/kit";
import { documents } from "@/lib/demo-data";

export const Route = createFileRoute("/kyc")({
  head: () => ({
    meta: [
      { title: "KYC & Document Centre | Apna Gig" },
      {
        name: "description",
        content: "Upload, replace and track the verification status of your KYC documents.",
      },
      { property: "og:title", content: "KYC & Document Centre | Apna Gig" },
      { property: "og:description", content: "All your worker documents in one secure place." },
    ],
  }),
  component: Kyc,
});

function Kyc() {
  const pending = documents.filter((d) => d.status !== "verified").length;

  return (
    <PhoneShell
      header={
        <ScreenHeader title="Document centre" subtitle="KYC & certificates" back="/aadhaar" />
      }
      footer={
        <StickyFooter>
          <AppButton to="/skills">Save & Continue</AppButton>
        </StickyFooter>
      }
    >
      <StepProgress step={3} total={7} />

      <Card className="mb-4 flex items-center gap-3 bg-primary-soft">
        <FileText className="h-5 w-5 shrink-0 text-primary" />
        <p className="min-w-0 text-xs font-semibold text-primary">
          {pending} of {documents.length} documents still need your attention.
        </p>
      </Card>

      <div className="space-y-3">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="text-sm font-bold">{doc.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{doc.meta}</p>
              </div>
              <StatusBadge kind={doc.status} label={doc.label} />
            </div>
            <div className="mt-3 flex gap-2">
              {doc.status === "verified" ? (
                <AppButton variant="outline" size="md" icon={<FileText className="h-4 w-4" />}>
                  View document
                </AppButton>
              ) : doc.status === "rejected" || doc.status === "pending" ? (
                <AppButton variant="outline" size="md" icon={<RefreshCcw className="h-4 w-4" />}>
                  Replace document
                </AppButton>
              ) : (
                <AppButton variant="soft" size="md" icon={<Upload className="h-4 w-4" />}>
                  Upload document
                </AppButton>
              )}
            </div>
          </Card>
        ))}
      </div>

      <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground">
        Documents are stored securely and shared only with your cooperative for verification. You
        can open this centre any time from your dashboard.
      </p>
    </PhoneShell>
  );
}
