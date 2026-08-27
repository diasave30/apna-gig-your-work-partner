import { createFileRoute } from "@tanstack/react-router";
import { Camera } from "lucide-react";

import {
  AppButton,
  Field,
  PhoneShell,
  ScreenHeader,
  StepProgress,
  StickyFooter,
  inputClass,
} from "@/components/apna/kit";
import { worker } from "@/lib/demo-data";

export const Route = createFileRoute("/profile-setup")({
  head: () => ({
    meta: [
      { title: "Worker Profile Setup | Apna Gig" },
      {
        name: "description",
        content: "Add your photo, name, address, language and work experience to your Apna Gig profile.",
      },
      { property: "og:title", content: "Worker Profile Setup | Apna Gig" },
      { property: "og:description", content: "Step 1 of the Apna Gig worker onboarding." },
    ],
  }),
  component: ProfileSetup,
});

function ProfileSetup() {
  return (
    <PhoneShell
      header={<ScreenHeader title="Your profile" subtitle="Basic worker details" back="/otp" />}
      footer={
        <StickyFooter>
          <AppButton to="/aadhaar">Save & Continue</AppButton>
        </StickyFooter>
      }
    >
      <StepProgress step={1} total={7} />

      <div className="mb-6 flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={worker.photo}
            alt="Worker profile photo"
            className="h-20 w-20 rounded-2xl object-cover"
          />
          <button
            type="button"
            aria-label="Change profile photo"
            className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-xl brand-gradient text-primary-foreground shadow-float"
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold">Profile photo</p>
          <p className="text-xs text-muted-foreground">
            A clear face photo helps customers trust you. JPG or PNG, under 5 MB.
          </p>
        </div>
      </div>

      <Field label="Full name (as per Aadhaar)">
        <input className={inputClass} defaultValue={worker.name} />
      </Field>

      <Field label="Address">
        <textarea
          rows={3}
          className={inputClass + " h-auto"}
          defaultValue="Flat 12, Sai Residency, Kothrud, Pune, Maharashtra 411038"
        />
      </Field>

      <Field label="Preferred language">
        <select className={inputClass} defaultValue="hi">
          <option value="hi">हिन्दी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="en">English</option>
          <option value="ta">தமிழ் (Tamil)</option>
        </select>
      </Field>

      <Field label="Work experience">
        <select className={inputClass} defaultValue="5-10">
          <option value="0-1">Less than 1 year</option>
          <option value="1-3">1 – 3 years</option>
          <option value="3-5">3 – 5 years</option>
          <option value="5-10">5 – 10 years</option>
          <option value="10+">More than 10 years</option>
        </select>
      </Field>

      <Field label="About your work" hint="Optional — customers see this on your profile.">
        <textarea
          rows={3}
          className={inputClass + " h-auto"}
          placeholder="I do plumbing repair, tap and pipe fitting for homes and shops."
        />
      </Field>
    </PhoneShell>
  );
}
