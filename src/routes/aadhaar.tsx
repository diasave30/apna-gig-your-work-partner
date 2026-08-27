import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, EyeOff, Loader2, Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  StepProgress,
  StickyFooter,
} from "@/components/apna/kit";

export const Route = createFileRoute("/aadhaar")({
  head: () => ({
    meta: [
      { title: "Identity Verification | Apna Gig" },
      {
        name: "description",
        content:
          "Privacy-first Aadhaar based identity verification through an authorised consent mechanism.",
      },
      { property: "og:title", content: "Identity Verification | Apna Gig" },
      {
        property: "og:description",
        content: "Only your verification status is retained — never your Aadhaar details.",
      },
    ],
  }),
  component: Aadhaar,
});

function Aadhaar() {
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const navigate = useNavigate();

  return (
    <PhoneShell
      header={
        <ScreenHeader title="Identity verification" subtitle="Secure & private" back="/profile-setup" />
      }
      footer={
        <StickyFooter>
          {state === "done" ? (
            <AppButton to="/kyc">Continue to Documents</AppButton>
          ) : (
            <AppButton
              disabled={!consent || state === "loading"}
              onClick={() => {
                setState("loading");
                setTimeout(() => setState("done"), 1600);
              }}
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Verifying identity…
                </>
              ) : (
                "Verify with consent"
              )}
            </AppButton>
          )}
        </StickyFooter>
      }
    >
      <StepProgress step={2} total={7} />

      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-success-soft">
        <ShieldCheck className="h-7 w-7 text-success" />
      </div>
      <h2 className="mt-4 text-xl font-extrabold tracking-tight">
        Verify that you are really you
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Customers only accept verified workers. Verification is done through an authorised
        government-approved mechanism using your consent — Apna Gig never sees or stores your
        Aadhaar number.
      </p>

      <div className="mt-5 space-y-3">
        <Card className="flex items-start gap-3">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="text-sm font-bold">Consent-based check</p>
            <p className="text-xs text-muted-foreground">
              You approve the check with an OTP on your Aadhaar-linked mobile number.
            </p>
          </div>
        </Card>
        <Card className="flex items-start gap-3">
          <EyeOff className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="text-sm font-bold">Only status is retained</p>
            <p className="text-xs text-muted-foreground">
              We keep just “Verified / Not verified”. No Aadhaar number, image or biometric data is
              stored in the app.
            </p>
          </div>
        </Card>
        <Card className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="min-w-0">
            <p className="text-sm font-bold">You stay in control</p>
            <p className="text-xs text-muted-foreground">
              You can withdraw consent at any time from your profile settings.
            </p>
          </div>
        </Card>
      </div>

      <label className="mt-5 flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--primary)]"
        />
        <span className="text-xs leading-relaxed text-muted-foreground">
          I give my consent to verify my identity through the authorised verification partner and
          understand that only my verification status will be stored.
        </span>
      </label>

      {state === "done" ? (
        <div
          className="mt-5 flex items-center gap-2 rounded-2xl bg-success-soft px-4 py-3 text-xs font-bold text-success"
          onClick={() => navigate({ to: "/kyc" })}
        >
          <CheckCircle2 className="h-4 w-4" /> Identity verified successfully
        </div>
      ) : null}
    </PhoneShell>
  );
}
