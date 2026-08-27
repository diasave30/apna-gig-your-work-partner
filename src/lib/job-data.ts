import type { StatusKind } from "@/components/apna/kit";

export type JobStatus =
  | "new"
  | "accepted"
  | "en-route"
  | "arrived"
  | "start-pending"
  | "active"
  | "extra-pending"
  | "completion-pending"
  | "completed"
  | "cancelled";

export const jobStatusMeta: Record<JobStatus, { label: string; kind: StatusKind }> = {
  new: { label: "New request", kind: "info" },
  accepted: { label: "Accepted", kind: "info" },
  "en-route": { label: "En route", kind: "pending" },
  arrived: { label: "Arrived", kind: "pending" },
  "start-pending": { label: "Start verification pending", kind: "pending" },
  active: { label: "Active", kind: "verified" },
  "extra-pending": { label: "Additional work pending", kind: "required" },
  "completion-pending": { label: "Completion pending", kind: "pending" },
  completed: { label: "Completed", kind: "verified" },
  cancelled: { label: "Cancelled", kind: "rejected" },
};

export type Job = {
  id: string;
  service: string;
  category: string;
  customer: string;
  area: string;
  address: string;
  distanceKm: number;
  travelMin: number;
  date: string;
  time: string;
  durationMin: number;
  earnings: number;
  payment: string;
  description: string;
  instructions: string;
  status: JobStatus;
};

export const jobs: Job[] = [
  {
    id: "AG-JOB-90412",
    service: "Bathroom tap & pipe leakage repair",
    category: "Plumbing",
    customer: "Ananya Deshpande",
    area: "Kothrud, Pune",
    address: "Flat 302, Shivneri Residency, Near Dashabhuja Ganpati, Kothrud",
    distanceKm: 2.4,
    travelMin: 11,
    date: "Today, 27 Aug",
    time: "11:30 AM",
    durationMin: 90,
    earnings: 720,
    payment: "Cashless · paid to cooperative wallet within 24 hrs",
    description:
      "Continuous leakage from bathroom wash-basin tap and slow drainage in the floor trap.",
    instructions:
      "Please call once you reach the society gate. Water supply is available till 1:00 PM only.",
    status: "new",
  },
  {
    id: "AG-JOB-90418",
    service: "Geyser installation & wiring check",
    category: "Electrical Repair",
    customer: "Rohit Kulkarni",
    area: "Warje Malwadi, Pune",
    address: "B-12, Sai Sankul Society, Warje Malwadi",
    distanceKm: 4.1,
    travelMin: 16,
    date: "Today, 27 Aug",
    time: "3:00 PM",
    durationMin: 120,
    earnings: 950,
    payment: "Cashless · UPI settlement via cooperative",
    description: "New 15L geyser to be installed in bathroom; existing wiring to be inspected.",
    instructions: "Geyser and MCB already purchased. Bring drilling machine.",
    status: "new",
  },
  {
    id: "AG-JOB-90423",
    service: "2 BHK deep cleaning",
    category: "Home Cleaning",
    customer: "Meera Joshi",
    area: "Shivajinagar, Pune",
    address: "Plot 7, Model Colony Lane 3, Shivajinagar",
    distanceKm: 6.8,
    travelMin: 24,
    date: "Tomorrow, 28 Aug",
    time: "9:00 AM",
    durationMin: 240,
    earnings: 1650,
    payment: "Cashless · paid after end OTP verification",
    description: "Full house deep cleaning including kitchen degreasing and 2 bathrooms.",
    instructions: "Society allows entry from 8:30 AM. Cleaning material provided by customer.",
    status: "new",
  },
  {
    id: "AG-JOB-90431",
    service: "Washing machine drum servicing",
    category: "Appliance Repair",
    customer: "Sandeep Pawar",
    area: "Hadapsar, Pune",
    address: "Row House 4, Amanora Park Town Road, Hadapsar",
    distanceKm: 9.2,
    travelMin: 32,
    date: "Tomorrow, 28 Aug",
    time: "5:30 PM",
    durationMin: 75,
    earnings: 640,
    payment: "Cashless · cooperative wallet",
    description: "Front-load machine making loud noise while spinning; drum bearing check needed.",
    instructions: "Parking available inside the society.",
    status: "new",
  },
];

export const scheduledJobs = [
  {
    id: "AG-JOB-90388",
    service: "Kitchen sink blockage",
    customer: "Priya Naik",
    area: "Kothrud, Pune",
    date: "Today, 27 Aug · 6:30 PM",
    earnings: 480,
    status: "accepted" as JobStatus,
  },
  {
    id: "AG-JOB-90390",
    service: "Fan & switchboard repair",
    customer: "Vikas Shinde",
    area: "Warje, Pune",
    date: "Tomorrow, 28 Aug · 10:00 AM",
    earnings: 560,
    status: "accepted" as JobStatus,
  },
];

export const completedJobs = [
  {
    id: "AG-JOB-90310",
    service: "Overhead tank pipe fitting",
    customer: "Nilesh Bhosale",
    area: "Kothrud, Pune",
    date: "26 Aug 2026 · 4:10 PM",
    earnings: 890,
    status: "completed" as JobStatus,
  },
  {
    id: "AG-JOB-90287",
    service: "Bathroom shower installation",
    customer: "Sneha Kadam",
    area: "Shivajinagar, Pune",
    date: "24 Aug 2026 · 12:40 PM",
    earnings: 650,
    status: "completed" as JobStatus,
  },
];

export const cancelledJobs = [
  {
    id: "AG-JOB-90265",
    service: "Water motor repair",
    customer: "Ajay Gaikwad",
    area: "Pimpri, Pune",
    date: "22 Aug 2026 · Rejected — too far",
    earnings: 0,
    status: "cancelled" as JobStatus,
  },
];

export const nearbyDemand = [
  { area: "Kothrud", jobs: 24, distance: "1–3 km" },
  { area: "Warje Malwadi", jobs: 17, distance: "3–5 km" },
  { area: "Shivajinagar", jobs: 12, distance: "5–7 km" },
  { area: "Hadapsar", jobs: 9, distance: "8–10 km" },
];

export const highDemandServices = [
  { name: "Home Cleaning", trend: "+32%", jobs: 210, emoji: "🧽" },
  { name: "Plumbing", trend: "+18%", jobs: 164, emoji: "🔧" },
  { name: "Electrical Repair", trend: "+14%", jobs: 138, emoji: "💡" },
  { name: "Appliance Repair", trend: "+9%", jobs: 96, emoji: "🛠️" },
  { name: "Painting", trend: "+6%", jobs: 54, emoji: "🎨" },
];

export const monthlyDemand = [
  { label: "Week 1", value: 46 },
  { label: "Week 2", value: 58 },
  { label: "Week 3", value: 71 },
  { label: "Week 4", value: 84 },
  { label: "Next wk", value: 92 },
];

export const seasonalSignals = [
  {
    title: "Monsoon leakage repairs",
    detail: "Plumbing demand stays high till mid-September in Pune.",
  },
  {
    title: "Festive deep cleaning",
    detail: "Ganesh Chaturthi & Diwali cleaning bookings open from next week.",
  },
];

export const rejectReasons = [
  "Too far from my service area",
  "Timing conflict with another job",
  "Not available on this date",
  "Service does not match my skills",
  "Other reason",
];
