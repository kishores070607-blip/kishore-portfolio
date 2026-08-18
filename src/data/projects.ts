export type ProjectStatus =
  | "BUILT"
  | "BUILDING"
  | "EXPERIMENT"
  | "ARCHIVED";

export type Project = {
  id: string;
  number: string;
  title: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  year: string;
};

export const projects: Project[] = [
  {
    id: "personal-cloud",
    number: "01",
    title: "PERSONAL CLOUD",
    description:
      "A self-hosted personal cloud built from an old laptop, running Nextcloud with remote access. A practical exploration of repurposing hardware, self-hosting, networking, and private file access.",
    stack: ["NEXTCLOUD", "LINUX", "SELF-HOSTING", "NETWORKING"],
    status: "BUILT",
    year: "2025",
  },

  {
    id: "smart-dustbin",
    number: "02",
    title: "SMART DUSTBIN",
    description:
      "An Arduino-based automatic dustbin using ultrasonic sensing and servo control.",
    stack: ["ARDUINO", "ULTRASONIC", "SERVO"],
    status: "BUILT",
    year: "2025",
  },

  {
    id: "energy-monitor",
    number: "03",
    title: "ENERGY MONITOR",
    description:
      "An electronics project exploring real-time voltage and current measurement.",
    stack: ["ESP32", "ACS712", "ZMPT101B"],
    status: "BUILDING",
    year: "2026",
  },

  {
    id: "personal-interface",
    number: "04",
    title: "PERSONAL INTERFACE",
    description:
      "This portfolio — an experimental interface built around motion, interaction and restraint.",
    stack: ["NEXT.JS", "GSAP", "LENIS"],
    status: "BUILDING",
    year: "2026",
  },
];