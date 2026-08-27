import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Loader2, QrCode, ScanLine, XCircle } from "lucide-react";
import { useState } from "react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  StickyFooter,
} from "@/components/apna/kit";
import { worker } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/qr-verify")({
  head: () => ({
    meta: [
      { title: "Worker QR Verification | Apna Gig" },
      {
        name: "description",
        content: "Show your worker QR code or scan a customer QR to confirm a verified job.",
      },
      { property: "og:title", content: "Worker QR Verification | Apna Gig" },
      { property: "og:description", content: "Instant on-site verification for workers." },
    ],
  }),
  component: QrVerify,
});

type Mode = "show" | "scan";
type Result = "ready" | "scanning" | "verified" | "invalid";

function QrVerify() {
  const [mode, setMode] = useState<Mode>("show");
  const [result, setResult] = useState<Result>("ready");

  return (
    <PhoneShell
      header={<ScreenHeader title="QR verification" subtitle="Verify on the spot" back="/worker-id" />}
      footer={
        <StickyFooter>
          <AppButton to="/dashboard">
            {result === "verified" ? "Verified — Go to Dashboard" : "Continue to Dashboard"}
          </AppButton>
        </StickyFooter>
      }
    >
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-secondary p-1">
        {(["show", "scan"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setResult("ready");
            }}
            className={cn(
              "rounded-xl py-2.5 text-xs font-bold transition-colors",
              mode === m ? "bg-card text-primary shadow-card" : "text-muted-foreground",
            )}
          >
            {m === "show" ? "My QR code" : "Scan QR"}
          </button>
        ))}
      </div>

      {mode === "show" ? (
        <Card className="text-center">
          <div className="mx-auto grid h-56 w-56 place-items-center rounded-2xl border border-border bg-secondary">
            <QrCode className="h-40 w-40" />
          </div>
          <p className="mt-4 text-sm font-bold">{worker.name}</p>
          <p className="font-mono text-xs text-muted-foreground">{worker.workerId}</p>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Ask the customer to scan this code before you start the job.
          </p>
        </Card>
      ) : (
        <Card className="text-center">
          <div
            className={cn(
              "relative mx-auto grid h-56 w-56 place-items-center overflow-hidden rounded-2xl border-2 border-dashed",
              result === "verified" && "border-success bg-success-soft",
              result === "invalid" && "border-destructive bg-destructive-soft",
              (result === "ready" || result === "scanning") && "border-primary bg-primary-soft/40",
            )}
          >
            {result === "scanning" ? (
              <Loader2 className="h-14 w-14 animate-spin text-primary" />
            ) : result === "verified" ? (
              <CheckCircle2 className="h-16 w-16 text-success" />
            ) : result === "invalid" ? (
              <XCircle className="h-16 w-16 text-destructive" />
            ) : (
              <ScanLine className="h-16 w-16 text-primary" />
            )}
          </div>
          <p className="mt-4 text-sm font-bold">
            {result === "ready" && "Ready to scan"}
            {result === "scanning" && "Scanning QR code…"}
            {result === "verified" && "Verified successfully"}
            {result === "invalid" && "QR code not recognised"}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {result === "verified"
              ? "Job code JOB-2026-11784 · Anjali Deshpande, Kothrud"
              : result === "invalid"
                ? "Ask the customer to reopen the job in their Apna Gig app."
                : "Point your camera at the customer's job QR code."}
          </p>
          <div className="mt-4 grid gap-2">
            <AppButton
              size="md"
              onClick={() => {
                setResult("scanning");
                setTimeout(() => setResult("verified"), 1400);
              }}
            >
              Start scanning
            </AppButton>
            <AppButton variant="outline" size="md" onClick={() => setResult("invalid")}>
              Simulate invalid code
            </AppButton>
          </div>
        </Card>
      )}
    </PhoneShell>
  );
}
