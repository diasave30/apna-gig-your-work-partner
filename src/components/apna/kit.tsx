import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bell, CalendarDays, Home, IdCard, User } from "lucide-react";
import type { ReactNode } from "react";

import logo from "@/assets/apna-gig-logo.png.asset.json";
import { cn } from "@/lib/utils";

/* ---------------- Brand ---------------- */

export function Logo({ size = 56, className }: { size?: number; className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Apna Gig logo"
      width={size}
      height={size}
      className={cn("rounded-2xl object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}

/* ---------------- Phone shell ---------------- */

export function PhoneShell({
  children,
  header,
  footer,
  className,
}: {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen justify-center bg-secondary/60 py-0 sm:py-8">
      <div className="relative flex w-full max-w-[420px] flex-col overflow-hidden bg-background shadow-float sm:rounded-[2.25rem] sm:border sm:border-border">
        <StatusStrip />
        {header}
        <main className={cn("flex-1 overflow-y-auto px-5 pb-8", className)}>{children}</main>
        {footer}
      </div>
    </div>
  );
}

function StatusStrip() {
  return (
    <div className="flex shrink-0 items-center justify-between px-6 pt-3 pb-1 text-[11px] font-semibold text-muted-foreground">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="tracking-tight">•••</span>
        <span>4G</span>
        <span className="inline-block h-2.5 w-5 rounded-[3px] border border-current" />
      </span>
    </div>
  );
}

/* ---------------- Header ---------------- */

export function ScreenHeader({
  title,
  subtitle,
  back,
  action,
}: {
  title: string;
  subtitle?: string;
  back?: string;
  action?: ReactNode;
}) {
  const router = useRouter();
  return (
    <header className="shrink-0 bg-background px-5 pt-2 pb-4">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        {back ? (
          <Link
            to={back}
            aria-label="Go back"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-card text-foreground shadow-card transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => router.history.back()}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-card text-foreground shadow-card transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold tracking-tight">{title}</h1>
          {subtitle ? (
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <div className="shrink-0">{action}</div>
      </div>
    </header>
  );
}

/* ---------------- Buttons ---------------- */

type BtnProps = {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "soft" | "ghost";
  size?: "md" | "lg";
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  type?: "button" | "submit";
};

const btnBase =
  "inline-flex w-full items-center justify-center gap-2 rounded-2xl font-semibold transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const btnVariants: Record<NonNullable<BtnProps["variant"]>, string> = {
  primary: "brand-gradient text-primary-foreground shadow-float hover:brightness-105",
  outline: "border border-border bg-card text-foreground shadow-card hover:bg-secondary",
  soft: "bg-primary-soft text-primary hover:bg-primary-soft/70",
  ghost: "text-primary hover:bg-primary-soft",
};

export function AppButton({
  children,
  to,
  onClick,
  variant = "primary",
  size = "lg",
  disabled,
  className,
  icon,
  type = "button",
}: BtnProps) {
  const classes = cn(
    btnBase,
    btnVariants[variant],
    size === "lg" ? "h-14 px-6 text-[15px]" : "h-11 px-4 text-sm",
    className,
  );
  if (to && !disabled) {
    return (
      <Link to={to} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {icon}
      {children}
    </button>
  );
}

export function StickyFooter({ children }: { children: ReactNode }) {
  return (
    <div className="shrink-0 border-t border-border bg-card/90 px-5 py-4 backdrop-blur">
      {children}
    </div>
  );
}

/* ---------------- Progress ---------------- */

export function StepProgress({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-5">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold">
        <span className="text-primary">
          Step {step} of {total}
        </span>
        <span className="text-muted-foreground">
          {Math.round((step / total) * 100)}% complete
        </span>
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i < step ? "brand-gradient" : "bg-muted",
            )}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Status badge ---------------- */

export type StatusKind =
  | "verified"
  | "pending"
  | "required"
  | "rejected"
  | "info"
  | "not-submitted";

const statusStyles: Record<StatusKind, string> = {
  verified: "bg-success-soft text-success",
  pending: "bg-warning-soft text-warning-foreground",
  required: "bg-accent-soft text-accent-foreground",
  rejected: "bg-destructive-soft text-destructive",
  info: "bg-primary-soft text-primary",
  "not-submitted": "bg-muted text-muted-foreground",
};

export function StatusBadge({
  kind,
  label,
  className,
}: {
  kind: StatusKind;
  label: string;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold",
        statusStyles[kind],
        className,
      )}
    >
      {label}
    </span>
  );
}

/* ---------------- Cards & fields ---------------- */

export function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string | undefined;
  onClick?: (() => void) | undefined;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-border bg-card p-4 shadow-card",
        onClick && "cursor-pointer transition-colors hover:bg-secondary/50",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  action,
}: {
  title: string;
  action?: { label: string; to: string };
}) {
  return (
    <div className="mb-3 mt-6 flex items-center justify-between gap-3">
      <h2 className="text-[15px] font-bold tracking-tight">{title}</h2>
      {action ? (
        <Link to={action.to} className="text-xs font-semibold text-primary">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-[13px] font-semibold text-foreground">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-[11px] text-muted-foreground">{hint}</span> : null}
    </label>
  );
}

export const inputClass =
  "h-13 w-full rounded-2xl border border-input bg-card px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring/15";

/* ---------------- Bottom navigation ---------------- */

const navItems = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/availability", label: "Calendar", icon: CalendarDays },
  { to: "/worker-id", label: "ID Card", icon: IdCard },
  { to: "/profile-setup", label: "Profile", icon: User },
];

export function BottomNav() {
  return (
    <nav className="shrink-0 border-t border-border bg-card px-3 pb-3 pt-2">
      <ul className="grid grid-cols-4 gap-1">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              activeProps={{ className: "text-primary bg-primary-soft" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-semibold"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function NotificationButton({ count = 2 }: { count?: number }) {
  return (
    <Link
      to="/dashboard"
      aria-label="Notifications"
      className="relative grid h-11 w-11 place-items-center rounded-2xl border border-border bg-card shadow-card"
    >
      <Bell className="h-5 w-5" />
      {count > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full accent-gradient text-[10px] font-bold text-primary-foreground">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
