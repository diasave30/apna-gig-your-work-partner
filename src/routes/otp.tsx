import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Pencil, ShieldCheck, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AppButton, PhoneShell, ScreenHeader, StickyFooter } from "@/components/apna/kit";
import { worker } from "@/lib/demo-data";

export const Route = createFileRoute("/otp")({
  head: () => ({
    meta: [
      { title: "OTP Verification | Apna Gig" },
      {
        name: "description",
        content: "Verify your mobile number with the 6-digit OTP sent by Apna Gig.",
      },
      { property: "og:title", content: "OTP Verification | Apna Gig" },
      { property: "og:description", content: "Secure OTP verification for Apna Gig workers." },
    ],
  }),
  component: Otp,
});

type State = "idle" | "loading" | "verified" | "invalid" | "expired";

function Otp() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [state, setState] = useState<State>("idle");
  const [seconds, setSeconds] = useState(38);
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  const navigate = useNavigate();
  const filled = code.every((c) => c !== "");

  useEffect(() => {
    if (seconds === 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  function submit() {
    if (seconds === 0) {
      setState("expired");
      return;
    }
    setState("loading");
    setTimeout(() => {
      const entered = code.join("");
      if (entered === "123456" || entered.length === 6) {
        setState("verified");
        setTimeout(() => navigate({ to: "/profile-setup" }), 900);
      } else {
        setState("invalid");
      }
    }, 1100);
  }

  return (
    <PhoneShell
      header={<ScreenHeader title="Verify your number" back="/login" />}
      footer={
        <StickyFooter>
          <AppButton disabled={!filled || state === "loading"} onClick={submit}>
            {state === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Verifying…
              </>
            ) : (
              "Verify & Continue"
            )}
          </AppButton>
          <AppButton variant="ghost" size="md" className="mt-2" to="/dashboard">
            Existing verified worker? Skip to dashboard
          </AppButton>
        </StickyFooter>
      }
    >
      <div className="pt-2">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft">
          <ShieldCheck className="h-7 w-7 text-primary" />
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          We sent a 6-digit code to
        </p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-bold">{worker.phone}</span>
          <Link
            to="/login"
            className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-bold text-primary"
          >
            <Pencil className="h-3 w-3" /> Edit
          </Link>
        </div>

        <div className="mt-7 flex gap-2">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={digit}
              inputMode="numeric"
              maxLength={1}
              aria-label={`OTP digit ${i + 1}`}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "");
                setCode((prev) => prev.map((c, idx) => (idx === i ? v : c)));
                setState("idle");
                if (v && i < 5) refs.current[i + 1]?.focus();
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !code[i] && i > 0) refs.current[i - 1]?.focus();
              }}
              className="h-14 min-w-0 flex-1 rounded-2xl border border-input bg-card text-center text-xl font-bold focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring/15"
            />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            {seconds > 0 ? `Code expires in 00:${String(seconds).padStart(2, "0")}` : "Code expired"}
          </span>
          <button
            type="button"
            disabled={seconds > 0}
            onClick={() => {
              setSeconds(38);
              setState("idle");
            }}
            className="font-bold text-primary disabled:text-muted-foreground"
          >
            Resend OTP
          </button>
        </div>

        {state === "verified" ? (
          <p className="mt-6 flex items-center gap-2 rounded-2xl bg-success-soft px-4 py-3 text-xs font-bold text-success">
            <CheckCircle2 className="h-4 w-4" /> Mobile number verified successfully
          </p>
        ) : null}
        {state === "invalid" ? (
          <p className="mt-6 flex items-center gap-2 rounded-2xl bg-destructive-soft px-4 py-3 text-xs font-bold text-destructive">
            <TriangleAlert className="h-4 w-4" /> Incorrect OTP. Please check and try again.
          </p>
        ) : null}
        {state === "expired" ? (
          <p className="mt-6 flex items-center gap-2 rounded-2xl bg-warning-soft px-4 py-3 text-xs font-bold text-warning-foreground">
            <TriangleAlert className="h-4 w-4" /> This OTP has expired. Tap Resend OTP.
          </p>
        ) : null}
      </div>
    </PhoneShell>
  );
}
