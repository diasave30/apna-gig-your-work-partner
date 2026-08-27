import { useSyncExternalStore } from "react";

import { jobs, type Job, type JobStatus } from "@/lib/job-data";

export type Evidence = { id: string; label: string; type: "photo" | "video" };

export type ExtraWork = {
  description: string;
  minutes: number;
  amount: number;
  status: "none" | "requested" | "approved" | "rejected";
};

type JobState = {
  jobId: string;
  status: JobStatus;
  startedAt: string | null;
  beforeEvidence: Evidence[];
  afterEvidence: Evidence[];
  incidentSubmitted: boolean;
  extraWork: ExtraWork;
  rejectedReason: string | null;
};

const initial: JobState = {
  jobId: jobs[0]!.id,
  status: "new",
  startedAt: null,
  beforeEvidence: [],
  afterEvidence: [],
  incidentSubmitted: false,
  extraWork: { description: "", minutes: 0, amount: 0, status: "none" },
  rejectedReason: null,
};

let state: JobState = initial;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function setJobState(patch: Partial<JobState>) {
  state = { ...state, ...patch };
  emit();
}

export function selectJob(jobId: string) {
  state = { ...initial, jobId };
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function snapshot() {
  return state;
}

export function useJobState() {
  return useSyncExternalStore(subscribe, snapshot, () => initial);
}

export function useActiveJob(): Job {
  const s = useJobState();
  return jobs.find((j) => j.id === s.jobId) ?? jobs[0]!;
}

export function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}
