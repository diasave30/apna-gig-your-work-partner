import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { useState } from "react";

import { AppButton, Field, Logo, PhoneShell, inputClass } from "@/components/apna/kit";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Worker Login & Registration | Apna Gig" },
      {
        name: "description",
        content: "Sign in to Apna Gig with your mobile number and a one-time password.",
      },
      { property: "og:title", content: "Worker Login | Apna Gig" },
      { property: "og:description", content: "OTP based login for Apna Gig workers." },
    ],
  }),
  component: Login,
});

function Login() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const digits = phone.replace(/\D/g, "");
  const valid = digits.length === 10;

  return (
    <PhoneShell>
      <div className="pt-10">
        <Logo size={64} />
        <h1 className="mt-6 text-[28px] font-extrabold leading-tight tracking-tight">
          Welcome to Apna Gig
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your mobile number to continue. We will send you a 6-digit OTP.
        </p>

        <form
          className="mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            if (!valid) {
              setError("Please enter a valid 10-digit mobile number.");
              return;
            }
            navigate({ to: "/otp" });
          }}
        >
          <Field label="Mobile number" hint="Use the number linked to your Aadhaar if possible.">
            <div className="flex gap-2">
              <span className="flex h-13 shrink-0 items-center gap-1.5 rounded-2xl border border-input bg-card px-3 text-sm font-semibold">
                <Phone className="h-4 w-4 text-primary" /> +91
              </span>
              <input
                inputMode="numeric"
                maxLength={11}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError(null);
                }}
                placeholder="98765 43210"
                className={inputClass}
              />
            </div>
          </Field>
          {error ? (
            <p className="-mt-2 mb-4 text-xs font-semibold text-destructive">{error}</p>
          ) : null}
          <AppButton type="submit" disabled={!valid}>
            Continue
          </AppButton>
        </form>

        <AppButton variant="outline" size="md" className="mt-3" to="/dashboard">
          Already verified? Go to dashboard
        </AppButton>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
          By continuing you agree to the Apna Gig <span className="font-semibold text-primary">Terms of Service</span> and{" "}
          <span className="font-semibold text-primary">Privacy Policy</span>. Your number is used
          only for verification and job updates.
        </p>
      </div>
    </PhoneShell>
  );
}
