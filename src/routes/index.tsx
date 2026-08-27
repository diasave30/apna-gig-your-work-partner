import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { Logo } from "@/components/apna/kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apna Gig — Work. Grow. Together." },
      {
        name: "description",
        content:
          "Apna Gig helps workers register, verify skills, join cooperatives and receive trusted service jobs.",
      },
      { property: "og:title", content: "Apna Gig — Work. Grow. Together." },
      {
        property: "og:description",
        content: "Worker registration, verification and cooperative membership in one app.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/onboarding" }), 2200);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="flex min-h-screen justify-center bg-secondary/60 sm:py-8">
      <div className="relative flex w-full max-w-[420px] flex-col items-center justify-between overflow-hidden brand-gradient px-8 py-16 shadow-float sm:rounded-[2.25rem]">
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Logo size={112} className="shadow-float" />
          <h1 className="mt-7 text-[34px] font-extrabold tracking-tight text-primary-foreground">
            Apna Gig
          </h1>
          <p className="mt-2 text-sm font-medium text-primary-foreground/85">
            Work. Grow. Together.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-2 w-2 animate-bounce rounded-full bg-primary-foreground/80"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
          <p className="text-[11px] font-medium text-primary-foreground/70">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
