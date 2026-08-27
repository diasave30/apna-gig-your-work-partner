import { Link } from "@tanstack/react-router";
import { Clock, IndianRupee, MapPin, Navigation } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { Card, StatusBadge } from "@/components/apna/kit";
import { jobStatusMeta, type Job, type JobStatus } from "@/lib/job-data";
import { formatInr } from "@/lib/job-store";
import { cn } from "@/lib/utils";

export function JobStatusBadge({ status, className }: { status: JobStatus; className?: string }) {
  const meta = jobStatusMeta[status];
  return <StatusBadge kind={meta.kind} label={meta.label} className={className} />;
}

export function JobCard({
  job,
  onClick,
  cta = "View details",
}: {
  job: Job;
  onClick?: () => void;
  cta?: string;
}) {
  return (
    <Card onClick={onClick} className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-wide text-primary">
            {job.category}
          </p>
          <p className="mt-0.5 text-sm font-bold leading-snug">{job.service}</p>
        </div>
        <JobStatusBadge status={job.status} />
      </div>
      <div className="grid grid-cols-2 gap-y-1.5 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" /> {job.area}
        </span>
        <span className="flex items-center gap-1.5">
          <Navigation className="h-3.5 w-3.5 shrink-0 text-primary" /> {job.distanceKm} km away
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0 text-primary" /> {job.date} · {job.time}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0 text-primary" /> ~{job.durationMin} min
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
        <p className="flex items-center text-base font-extrabold text-success">
          <IndianRupee className="h-4 w-4" />
          {job.earnings.toLocaleString("en-IN")}
        </p>
        <span className="text-xs font-bold text-primary">{cta} →</span>
      </div>
    </Card>
  );
}

export function CompactJobCard({
  service,
  customer,
  area,
  date,
  earnings,
  status,
  to,
  onClick,
}: {
  service: string;
  customer: string;
  area: string;
  date: string;
  earnings: number;
  status: JobStatus;
  to?: string;
  onClick?: () => void;
}) {
  const body = (
    <Card onClick={onClick} className="space-y-2">
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 text-sm font-bold leading-snug">{service}</p>
        <JobStatusBadge status={status} />
      </div>
      <p className="text-[11px] text-muted-foreground">
        {customer} · {area}
      </p>
      <div className="flex items-center justify-between gap-3 text-[11px] font-semibold">
        <span className="text-muted-foreground">{date}</span>
        {earnings > 0 ? <span className="text-success">{formatInr(earnings)}</span> : null}
      </div>
    </Card>
  );
  return to ? (
    <Link to={to} className="block">
      {body}
    </Link>
  ) : (
    body
  );
}

export function FilterChips({
  options,
  value,
  onChange,
  className,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("-mx-5 flex gap-2 overflow-x-auto px-5 pb-1", className)}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "shrink-0 rounded-full border px-3.5 py-2 text-[12px] font-bold transition-colors",
            value === opt
              ? "border-primary bg-primary-soft text-primary"
              : "border-border bg-card text-muted-foreground",
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function InfoRow({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </span>
      <span className="max-w-[60%] text-right text-xs font-bold">{value}</span>
    </div>
  );
}

export function MapPanel({
  eta,
  distance,
  label,
  height = 220,
}: {
  eta?: string;
  distance?: string;
  label: string;
  height?: number;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-secondary"
      style={{ height }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path
          d="M40 200 C 120 180, 90 110, 170 100 S 250 60, 300 34"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="12 10"
        />
      </svg>
      <span className="absolute bottom-5 left-6 grid h-8 w-8 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-float">
        You
      </span>
      <span className="absolute right-8 top-5 grid h-8 w-8 place-items-center rounded-full accent-gradient text-[10px] font-bold text-primary-foreground shadow-float">
        <MapPin className="h-4 w-4" />
      </span>
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl bg-card/95 px-3 py-2 shadow-card backdrop-blur">
        <p className="min-w-0 truncate text-[11px] font-bold">{label}</p>
        <p className="shrink-0 text-[11px] font-bold text-primary">
          {distance ? `${distance}` : null} {eta ? `· ${eta}` : null}
        </p>
      </div>
    </div>
  );
}

export function OtpEntry({
  length = 4,
  value,
  onChange,
}: {
  length?: number;
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={value[i] ?? ""}
          inputMode="numeric"
          maxLength={1}
          aria-label={`OTP digit ${i + 1}`}
          onChange={(e) => {
            const v = e.target.value.replace(/\D/g, "");
            const next = Array.from({ length }, (_, idx) => (idx === i ? v : (value[idx] ?? "")));
            onChange(next);
            if (v && i < length - 1) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
          }}
          className="h-16 min-w-0 flex-1 rounded-2xl border border-input bg-card text-center text-2xl font-bold focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring/15"
        />
      ))}
    </div>
  );
}

export function Timeline({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="space-y-0">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                  done && "bg-success text-primary-foreground",
                  active && "brand-gradient text-primary-foreground",
                  !done && !active && "bg-muted text-muted-foreground",
                )}
              >
                {i + 1}
              </span>
              {i < steps.length - 1 ? (
                <span className={cn("w-0.5 flex-1", done ? "bg-success" : "bg-border")} />
              ) : null}
            </div>
            <p
              className={cn(
                "pb-4 text-xs font-semibold",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {step}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

export function useElapsed(startedAt: string | null) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!startedAt) return "00:00:00";
  const diff = Math.max(0, Math.floor((now - new Date(startedAt).getTime()) / 1000));
  const h = String(Math.floor(diff / 3600)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
  const s = String(diff % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function EvidenceTile({
  item,
  onRemove,
}: {
  item: { id: string; label: string; type: "photo" | "video" };
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-3 py-3 shadow-card">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-[10px] font-bold uppercase text-primary">
          {item.type === "photo" ? "IMG" : "VID"}
        </span>
        <p className="min-w-0 truncate text-xs font-bold">{item.label}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="shrink-0 rounded-full bg-destructive-soft px-3 py-1.5 text-[11px] font-bold text-destructive"
      >
        Remove
      </button>
    </div>
  );
}
