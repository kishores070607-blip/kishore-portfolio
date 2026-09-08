export type ProjectStatus = "Built" | "In progress";

export type Project = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  year: string;
  featured?: boolean;
  live?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    id: "credify",
    number: "01",
    title: "Credify",
    eyebrow: "Verifiable credentials",
    description:
      "A student-owned academic credential platform. Universities issue tamper-proof records. Students share only the claims they choose. Employers verify signature, hash, and revocation in seconds — anchored on Polygon.",
    stack: [
      "React",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Ed25519",
      "Polygon",
    ],
    status: "Built",
    year: "2026",
    featured: true,
    live: "https://credify-credentials-platform-web.vercel.app/",
    repo: "https://github.com/kishores070607-blip/credify-credentials-platform",
  },
  {
    id: "personal-cloud",
    number: "02",
    title: "Personal Cloud",
    eyebrow: "Self-hosted infrastructure",
    description:
      "A retired laptop, rebuilt as private infrastructure. Nextcloud, remote access, and the quiet discipline of owning the pipes.",
    stack: ["Nextcloud", "Linux", "Networking", "Self-hosting"],
    status: "Built",
    year: "2025",
  },
  {
    id: "energy-monitor",
    number: "03",
    title: "Energy Monitor",
    eyebrow: "Sensing the grid",
    description:
      "Live voltage and current, read from the metal. An ESP32 meter that learns the grid by watching it.",
    stack: ["ESP32", "ACS712", "ZMPT101B"],
    status: "In progress",
    year: "2026",
  },
  {
    id: "personal-interface",
    number: "04",
    title: "Personal Interface",
    eyebrow: "This site",
    description:
      "A working surface for everything I make next. Motion, metal, and restraint — designed to feel as considered as the work it holds.",
    stack: ["Next.js", "R3F", "GSAP", "Lenis"],
    status: "In progress",
    year: "2026",
  },
];
