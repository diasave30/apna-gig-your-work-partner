export const worker = {
  name: "Ramesh Kumar Yadav",
  firstName: "Ramesh",
  workerId: "AG-MH-2026-004871",
  phone: "+91 98765 43210",
  city: "Pune, Maharashtra",
  cooperative: "Shramik Seva Cooperative, Pune",
  rating: 4.8,
  reviews: 132,
  photo:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
};

export const documents = [
  {
    id: "identity",
    title: "Identity Proof (Aadhaar)",
    meta: "Verified via authorised OTP consent",
    status: "verified" as const,
    label: "Verified",
  },
  {
    id: "address",
    title: "Address Proof",
    meta: "Electricity bill · uploaded 12 Aug 2026",
    status: "pending" as const,
    label: "Pending review",
  },
  {
    id: "skill",
    title: "Skill Certificate — Plumbing",
    meta: "ITI Pune, 2021",
    status: "verified" as const,
    label: "Verified",
  },
  {
    id: "bank",
    title: "Bank Passbook / Account Proof",
    meta: "Required for payouts in ₹",
    status: "required" as const,
    label: "Upload required",
  },
  {
    id: "police",
    title: "Police Verification",
    meta: "Re-upload — document was unclear",
    status: "rejected" as const,
    label: "Rejected",
  },
];

export const skillCategories = [
  { id: "plumbing", name: "Plumbing", jobs: "1,240 jobs / month", emoji: "🔧" },
  { id: "electrical", name: "Electrical Work", jobs: "980 jobs / month", emoji: "💡" },
  { id: "cleaning", name: "Deep Cleaning", jobs: "2,100 jobs / month", emoji: "🧽" },
  { id: "appliance", name: "Appliance Repair", jobs: "760 jobs / month", emoji: "🛠️" },
  { id: "carpentry", name: "Carpentry", jobs: "540 jobs / month", emoji: "🪚" },
  { id: "painting", name: "Painting", jobs: "430 jobs / month", emoji: "🎨" },
  { id: "delivery", name: "Delivery & Pickup", jobs: "3,050 jobs / month", emoji: "🛵" },
  { id: "gardening", name: "Gardening", jobs: "290 jobs / month", emoji: "🌿" },
];

export const cooperatives = [
  {
    id: "shramik",
    name: "Shramik Seva Cooperative",
    description: "Home services cooperative with 1,200+ verified workers.",
    location: "Kothrud, Pune",
    status: "info" as const,
    statusLabel: "Open for members",
  },
  {
    id: "sahyog",
    name: "Sahyog Workers Collective",
    description: "Cleaning and facility management across Pimpri-Chinchwad.",
    location: "Pimpri-Chinchwad, Pune",
    status: "pending" as const,
    statusLabel: "Waitlist",
  },
  {
    id: "nirman",
    name: "Nirman Kaushal Sangh",
    description: "Skilled trades cooperative — plumbing, electrical, carpentry.",
    location: "Hadapsar, Pune",
    status: "info" as const,
    statusLabel: "Open for members",
  },
];

export const serviceAreas = [
  { id: "kothrud", name: "Kothrud", pin: "411038", radius: "8 km", primary: true },
  { id: "warje", name: "Warje Malwadi", pin: "411058", radius: "5 km", primary: false },
  { id: "shivaji", name: "Shivajinagar", pin: "411005", radius: "6 km", primary: false },
];
