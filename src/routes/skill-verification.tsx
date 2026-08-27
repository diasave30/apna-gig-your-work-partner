import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, Info, Upload } from "lucide-react";

import {
  AppButton,
  Card,
  PhoneShell,
  ScreenHeader,
  StatusBadge,
  StepProgress,
  StickyFooter,
  type StatusKind,
} from "@/components/apna/kit";

export const Route = createFileRoute("/skill-verification")({
  head: () => ({
    meta: [
      { title: "Skill Verification | Apna Gig" },
      {
        name: "description",
        content: "Upload certificates, book assessments and track verification for each skill.",
      },
      { property: "og:title", content: "Skill Verification | Apna Gig" },
      {
        property: "og:description",
        content: "Verified skills get more job requests and better rates.",
      },
    ],
  }),
  component: SkillVerification,
});

const skills: Array<{
  name: string;
  level: string;
  status: StatusKind;
  label: string;
  note: string;
}> = [
  {
    name: "Plumbing",
    level: "Expert · 8 years",
    status: "verified",
    label: "Verified",
    note: "ITI certificate verified on 14 Aug 2026.",
  },
  {
    name: "Appliance Repair",
    level: "Skilled · 4 years",
    status: "pending",
    label: "Pending",
    note: "Assessment scheduled — 02 Sep 2026, 11:00 AM, Kothrud centre.",
  },
  {
    name: "Electrical Work",
    level: "Skilled · 3 years",
    status: "required",
    label: "More info needed",
    note: "Certificate photo was unclear. Please upload again.",
  },
  {
    name: "Deep Cleaning",
    level: "Beginner",
    status: "not-submitted",
    label: "Not submitted",
    note: "Upload a certificate or request a practical assessment.",
  },
];

function SkillVerification() {
  return (
    <PhoneShell
      header={
        <ScreenHeader title="Skill verification" subtitle="Prove your expertise" back="/skills" />
      }
      footer={
        <StickyFooter>
          <AppButton to="/cooperatives">Save & Continue</AppButton>
        </StickyFooter>
      }
    >
      <StepProgress step={5} total={7} />

      <Card className="mb-4 flex items-start gap-3 bg-primary-soft">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p className="min-w-0 text-xs font-semibold text-primary">
          Verified skills earn up to 25% higher job rates and appear first in customer searches.
        </p>
      </Card>

      <div className="space-y-3">
        {skills.map((skill) => (
          <Card key={skill.name}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <p className="text-sm font-bold">{skill.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{skill.level}</p>
              </div>
              <StatusBadge kind={skill.status} label={skill.label} />
            </div>
            <p className="mt-2 rounded-xl bg-secondary px-3 py-2 text-[11px] text-muted-foreground">
              {skill.note}
            </p>
            {skill.status !== "verified" ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <AppButton variant="soft" size="md" icon={<Upload className="h-4 w-4" />}>
                  Certificate
                </AppButton>
                <AppButton
                  variant="outline"
                  size="md"
                  icon={<ClipboardCheck className="h-4 w-4" />}
                >
                  Assessment
                </AppButton>
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </PhoneShell>
  );
}
