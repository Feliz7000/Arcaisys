export type ProductStatus = "live" | "in-development";

export type Product = {
  slug: string;
  name: string;
  status: ProductStatus;
  industry: string;
  tagline: string;
  summary: string;
  /** Tailwind gradient stops used for the product's accent. */
  accent: { from: string; to: string };
  highlights: string[];
  features: { title: string; body: string }[];
  audience: string[];
  modules?: { name: string; body: string }[];
  stack: string[];
  /** Public URL of the running product, if it has one. */
  url?: string;
  /** Full stacked logo and square mark, served from /public. */
  logo: { src: string; width: number; height: number };
  mark: string;
};

export const products: Product[] = [
  {
    slug: "restoqr",
    logo: { src: "/brand/restoqr-logo.png", width: 962, height: 756 },
    mark: "/brand/restoqr-icon.png",
    name: "RestoQR",
    status: "live",
    url: "https://platform.restoqr-arcaisys.com",
    industry: "Hospitality",
    tagline: "Scan. Order. Serve. Grow.",
    summary:
      "A complete restaurant operating system. Guests order from a QR code at the table, the kitchen sees tickets instantly, staff run the floor, and owners watch the business live — all on one multi-tenant platform.",
    accent: { from: "#ffa41b", to: "#ff6a13" },
    highlights: [
      "QR table ordering with add-ons and service requests",
      "Live kitchen display with ticket lifecycle",
      "Owner analytics, inventory and floor plans",
    ],
    features: [
      {
        title: "Table-side ordering",
        body: "Guests scan, browse a rich digital menu, order, add items mid-meal, call staff and view the bill — no app to install.",
      },
      {
        title: "Real-time kitchen",
        body: "Tickets land on the kitchen display the moment they're placed and move from preparing to ready with a tap.",
      },
      {
        title: "Floor & payments",
        body: "Staff manage tables and sessions, punch in orders on behalf of guests, handle requests and close out payments.",
      },
      {
        title: "Owner intelligence",
        body: "Live sales analytics, menu management, inventory tracking and printable QR codes for every table.",
      },
      {
        title: "Built for chains",
        body: "Multi-tenant from the core: organisations, outlets, subscriptions and roles managed from one control plane.",
      },
      {
        title: "Native where it counts",
        body: "Dedicated native apps for kitchen and waiters keep the busiest hands fast, even on a crowded network.",
      },
    ],
    audience: ["Restaurants & cafés", "Cloud kitchens", "Multi-outlet chains", "Food courts"],
    modules: [
      { name: "TableOS", body: "Customer-facing QR menu and ordering" },
      { name: "KitchenOS", body: "Kitchen display system" },
      { name: "WaiterOS", body: "Floor staff and service requests" },
      { name: "StaffOS", body: "Tables, sessions and payments" },
      { name: "OwnerOS", body: "Analytics, menu, inventory, QR codes" },
    ],
    stack: ["FastAPI", "PostgreSQL", "Next.js", "React Native", "Google Cloud"],
  },
  {
    slug: "pacs",
    logo: { src: "/brand/pacs-logo.svg", width: 960, height: 740 },
    mark: "/brand/pacs-mark.svg",
    name: "PACS",
    status: "in-development",
    industry: "Medical imaging",
    tagline: "Imaging infrastructure for modern diagnostics.",
    summary:
      "A web-based picture archiving and communication system that securely receives, stores, indexes and serves DICOM studies — connecting modalities, radiologists, clinicians and patients through a single imaging workflow.",
    accent: { from: "#ff6a13", to: "#e01422" },
    highlights: [
      "Receive studies directly from CT, MRI, X-ray and ultrasound",
      "Browser-based viewing and structured reporting",
      "Secure patient portal for studies and reports",
    ],
    features: [
      {
        title: "Modality integration",
        body: "Connect scanners over standard DICOM and receive CT, MRI, X-ray, ultrasound and other compatible studies automatically.",
      },
      {
        title: "Zero-install viewer",
        body: "Radiologists and referring clinicians open studies in the browser — no workstation software to deploy.",
      },
      {
        title: "Reporting workflow",
        body: "Worklists, structured reports and sign-off designed around how radiology teams actually read.",
      },
      {
        title: "Patient access",
        body: "A secure portal gives patients their own images and reports, cutting down on CDs and collection queues.",
      },
      {
        title: "Cloud or on-premise",
        body: "Run it as a hosted service or inside your own network — with substantially the same functionality either way.",
      },
      {
        title: "Security first",
        body: "Role-based access, audit trails and encrypted storage, designed for the obligations of handling health data.",
      },
    ],
    audience: ["Diagnostic centres", "Hospitals", "Radiology chains", "Teleradiology providers"],
    stack: ["Python", "DICOM", "PostgreSQL", "Object storage", "Docker"],
  },
  {
    slug: "hospio",
    logo: { src: "/brand/hospio-logo.svg", width: 960, height: 740 },
    mark: "/brand/hospio-mark.svg",
    name: "Hospio",
    status: "in-development",
    industry: "Hospital operations",
    tagline: "The operating system for the modern hospital.",
    summary:
      "An AI-assisted hospital management platform that brings patients, departments, beds, billing and records into one connected system — so care teams spend less time on paperwork and more time with patients.",
    accent: { from: "#f2361c", to: "#9e0b1e" },
    highlights: [
      "Patient journeys from registration to discharge",
      "Live bed, ward and department visibility",
      "Billing, pharmacy and records in one place",
    ],
    features: [
      {
        title: "Unified patient record",
        body: "One timeline for each patient — visits, prescriptions, labs and imaging — available to the people who need it.",
      },
      {
        title: "Admissions & beds",
        body: "Real-time occupancy across wards so admissions, transfers and discharges move without phone calls.",
      },
      {
        title: "Front desk to billing",
        body: "Registration, appointments, insurance and billing flow into each other instead of being re-keyed.",
      },
      {
        title: "AI assistance",
        body: "Smart summaries, triage support and forecasting that help staff act sooner — always with a human in charge.",
      },
      {
        title: "Connected to imaging",
        body: "Designed to work alongside our PACS so studies and reports appear right in the patient's record.",
      },
      {
        title: "Insight for leadership",
        body: "Operational dashboards for throughput, revenue and resource use across every department.",
      },
    ],
    audience: ["Multi-speciality hospitals", "Nursing homes", "Clinics", "Healthcare groups"],
    stack: ["Python", "PostgreSQL", "Next.js", "AI services"],
  },
  {
    slug: "meridian",
    logo: { src: "/brand/meridian-logo.svg", width: 960, height: 740 },
    mark: "/brand/meridian-mark.svg",
    name: "Meridian",
    status: "in-development",
    industry: "Developer tools",
    tagline: "AI engineering answers you can verify.",
    summary:
      "An evidence-grounded AI engineering assistant. Meridian answers questions about your codebase — then checks every claim against your AST, dependency manifests, database schema and live runtime telemetry before you read it.",
    accent: { from: "#ff5a5f", to: "#e01422" },
    highlights: [
      "Every claim checked against real code, not another model",
      "Grounded, refuted or unverifiable — never a guess",
      "Local-first, runs as an MCP server for your AI agents",
    ],
    features: [
      {
        title: "Deterministic verification",
        body: "No verifier calls a language model. Functions, routes, packages, columns and latency figures are checked against artefacts that can't be talked into agreeing.",
      },
      {
        title: "Three honest verdicts",
        body: "Grounded, refuted or unverifiable. Absent evidence is never reported as a contradiction — only real contradictions block.",
      },
      {
        title: "Runtime-aware",
        body: "Reads live spans to spot N+1 queries and slow routes, with sample-size gating so numbers mean something.",
      },
      {
        title: "Impact & history",
        body: "Ask what breaks if you change a function, why a dependency was introduced, or who owns a directory.",
      },
      {
        title: "Works with your agents",
        body: "Ships as an MCP server so the coding agents you already use can verify their own answers on your existing model quota.",
      },
      {
        title: "Local-first",
        body: "Runs on your machine with zero third-party runtime dependencies. Your code never needs to leave it.",
      },
    ],
    audience: ["Engineering teams", "Platform & SRE", "AI-assisted developers", "Code reviewers"],
    stack: ["Python", "AST analysis", "MCP", "OpenTelemetry"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const statusLabel: Record<ProductStatus, string> = {
  live: "Live",
  "in-development": "In development",
};
