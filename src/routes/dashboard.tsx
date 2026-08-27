import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Briefcase,
  CalendarDays,
  FileText,
  IdCard,
  IndianRupee,
  MapPin,
  Star,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import {
  BottomNav,
  Card,
  Logo,
  NotificationButton,
  PhoneShell,
  SectionTitle,
  StatusBadge,
} from "@/components/apna/kit";
import { worker } from "@/lib/demo-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Worker Dashboard | Apna Gig" },
      {
        name: "description",
        content: "Today's jobs, earnings in ₹, availability, utilisation and rating at a glance.",
      },
      { property: "og:title", content: "Worker Dashboard | Apna Gig" },
      { property: "og:description", content: "Everything a verified Apna Gig worker needs, daily." },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { label: "Update Availability", to: "/availability", icon: CalendarDays },
  { label: "Manage Service Area", to: "/service-area", icon: MapPin },
  { label: "View Worker ID", to: "/worker-id", icon: IdCard },
  { label: "View Documents", to: "/kyc", icon: FileText },
];

function Dashboard() {
  return (
    <PhoneShell footer={<BottomNav />}>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pt-3">
        <Link to="/profile-setup" className="flex min-w-0 items-center gap-3">
          <img
            src={worker.photo}
            alt={worker.name}
            className="h-12 w-12 shrink-0 rounded-2xl object-cover"
          />
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">Namaste 👋</p>
            <p className="truncate text-base font-bold">{worker.firstName} Yadav</p>
          </div>
        </Link>
        <NotificationButton />
      </header>

      <Link
        to="/worker-id"
        className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-success-soft px-4 py-3"
      >
        <span className="flex min-w-0 items-center gap-2 text-xs font-bold text-success">
          <BadgeCheck className="h-4 w-4 shrink-0" /> Verified worker · {worker.workerId}
        </span>
        <span className="shrink-0 text-[11px] font-bold text-success">View ID</span>
      </Link>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Card>
          <Briefcase className="h-5 w-5 text-primary" />
          <p className="mt-2 text-2xl font-extrabold">3</p>
          <p className="text-[11px] text-muted-foreground">Today's jobs</p>
        </Card>
        <Card>
          <IndianRupee className="h-5 w-5 text-success" />
          <p className="mt-2 text-2xl font-extrabold">₹1,850</p>
          <p className="text-[11px] text-muted-foreground">Today's earnings</p>
        </Card>
        <Link to="/availability" className="block">
          <Card className="h-full">
            <CalendarDays className="h-5 w-5 text-accent" />
            <p className="mt-2 text-base font-extrabold">Available</p>
            <p className="text-[11px] text-muted-foreground">9:00 AM – 7:00 PM today</p>
            <StatusBadge kind="verified" label="Accepting jobs" className="mt-2" />
          </Card>
        </Link>
        <Card>
          <TrendingUp className="h-5 w-5 text-primary" />
          <p className="mt-2 text-2xl font-extrabold">82%</p>
          <p className="text-[11px] text-muted-foreground">Utilisation this week</p>
        </Card>
      </div>

      <Card className="mt-3 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-lg font-extrabold">
            <Star className="h-4 w-4 fill-[var(--warning)] text-[var(--warning)]" />
            {worker.rating}
          </p>
          <p className="text-[11px] text-muted-foreground">
            Worker rating · {worker.reviews} reviews
          </p>
        </div>
        <StatusBadge kind="info" label="Top rated in Kothrud" />
      </Card>

      <SectionTitle title="Important alerts" />
      <div className="space-y-3">
        <Link to="/kyc" className="block">
          <Card className="flex items-start gap-3 border-warning/40 bg-warning-soft">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-warning-foreground" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-warning-foreground">Bank proof pending</p>
              <p className="text-xs text-warning-foreground/80">
                Upload your passbook to receive payouts without delay.
              </p>
            </div>
          </Card>
        </Link>
        <Link to="/skill-verification" className="block">
          <Card className="flex items-start gap-3">
            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-bold">Appliance repair assessment</p>
              <p className="text-xs text-muted-foreground">
                02 Sep 2026, 11:00 AM · Kothrud skill centre
              </p>
            </div>
          </Card>
        </Link>
      </div>

      <SectionTitle title="Quick actions" />
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="rounded-2xl border border-border bg-card p-4 shadow-card transition-colors hover:bg-secondary/60"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft">
              <action.icon className="h-5 w-5 text-primary" />
            </span>
            <p className="mt-2 text-[13px] font-bold leading-tight">{action.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-2xl bg-secondary px-4 py-3">
        <Logo size={26} />
        <p className="text-[11px] font-semibold text-muted-foreground">
          {worker.cooperative}
        </p>
      </div>
    </PhoneShell>
  );
}
