"use client";

import { useState } from "react";

type Node = {
  id: string;
  label: string;
  category: string;
  description: string;
  x: number;
  y: number;
  side: "left" | "right";
};

const nodes: Node[] = [
  {
    id: "c",
    label: "C",
    category: "SYSTEMS",
    description: "Systems programming, memory and low-level problem solving.",
    x: 30,
    y: 15,
    side: "left",
  },

  {
    id: "cpp",
    label: "C++",
    category: "SYSTEMS",
    description: "Object-oriented programming and problem solving.",
    x: 11,
    y: 42,
    side: "left",
  },

  {
    id: "linux",
    label: "LINUX",
    category: "SYSTEMS",
    description: "Servers, environments and infrastructure.",
    x: 5,
    y: 56,
    side: "left",
  },

  {
    id: "python",
    label: "PYTHON",
    category: "PROGRAMMING",
    description: "Scripting, automation, data handling and experimentation.",
    x: 17,
    y: 78,
    side: "left",
  },

  {
    id: "arduino",
    label: "ARDUINO",
    category: "HARDWARE",
    description: "Microcontrollers, sensors and physical computing.",
    x: 34,
    y: 86,
    side: "left",
  },

  {
    id: "next",
    label: "NEXT.JS",
    category: "WEB",
    description:
      "React-based applications with routing and server-side features.",
    x: 70,
    y: 15,
    side: "right",
  },

  {
    id: "react",
    label: "REACT",
    category: "WEB",
    description:
      "Component-driven interfaces and interactive experiences.",
    x: 94,
    y: 42,
    side: "right",
  },

  {
    id: "git",
    label: "GIT",
    category: "TOOLS",
    description:
      "Version control, collaboration and project history.",
    x: 94,
    y: 56,
    side: "right",
  },

  {
    id: "tailwind",
    label: "TAILWIND",
    category: "WEB",
    description:
      "Utility-first styling for responsive interfaces.",
    x: 82,
    y: 78,
    side: "right",
  },

  {
    id: "esp32",
    label: "ESP32",
    category: "HARDWARE",
    description:
      "Wi-Fi enabled microcontrollers and IoT experimentation.",
    x: 66,
    y: 86,
    side: "right",
  },
];
export default function StackSection() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const centerX = 50;
  const centerY = 50;

  return (
    <section
      id="stack"
      className="relative min-h-screen overflow-hidden border-t border-white/10 bg-black px-6 py-16 md:px-10 md:py-20"
    >
      {/* HEADER */}
      <div className="relative z-20 mx-auto max-w-7xl">
        <p className="text-[10px] uppercase tracking-[0.25em] text-white/35">
          04 / STACK
        </p>
      </div>

      {/* GRAPH AREA */}
      <div
        className="
          relative
          mt-2
          h-[calc(100vh-125px)]
          min-h-[620px]
          max-h-[820px]
          -translate-y-2
        "
        style={{
          width: "calc(100% - 190px)",
          maxWidth: "1500px",
          marginLeft: "auto",
          marginRight: "170px",
        }}
      >
        {/* CONNECTION LINES */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {nodes.map((node) => {
            const isActive = activeNode === node.id;

            return (
              <line
                key={node.id}
                x1={centerX}
                y1={centerY}
                x2={node.x}
                y2={node.y}
                vectorEffect="non-scaling-stroke"
                className={`transition-all duration-300 ${
                  isActive
                    ? "stroke-white/55"
                    : "stroke-white/[0.12]"
                }`}
                strokeWidth={isActive ? 1.2 : 0.7}
              />
            );
          })}
        </svg>

        {/* CENTER CORE */}
        <div
          className="absolute z-20"
          style={{
            left: `${centerX}%`,
            top: `${centerY}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/20">
            <div className="absolute inset-2 rounded-full border border-white/10" />

            {/* ORBIT DOT */}
<span
  className="
    absolute
    left-1/2
    top-1/2
    h-2
    w-2
    rounded-full
    bg-white/65
    shadow-[0_0_10px_rgba(255,255,255,0.35)]
    animate-[orbit_8s_linear_infinite]
  "
/>

            <div className="relative z-10 text-center">
              <p className="text-[8px] font-bold uppercase tracking-[0.35em] text-white/55">
                CORE
              </p>

              <p className="mt-2 text-[16px] font-medium tracking-[0.08em] text-white">
                BUILD
              </p>
            </div>
          </div>
        </div>

        {/* NODES */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;

          return (
            <div
              key={node.id}
              className="absolute z-10"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
            >
              {/* LARGE INVISIBLE INTERACTION AREA */}
              <button
                type="button"
                aria-label={`View details for ${node.label}`}
                onFocus={() => setActiveNode(node.id)}
                onBlur={() => setActiveNode(null)}
                onClick={() =>
                  setActiveNode((current) =>
                    current === node.id ? null : node.id
                  )
                }
                className="
                  group
                  relative
                  flex
                  min-h-[56px]
                  min-w-[120px]
                  items-center
                  justify-center
                  rounded-full
                  outline-none
                "
              >
                {/* NODE DOT */}
                <span
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    h-3.5
                    w-3.5
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    border
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "scale-125 border-white/80 bg-white/10"
                        : "border-white/25 bg-black"
                    }
                  `}
                />

                {/* INNER DOT */}
                <span
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    h-1
                    w-1
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "scale-150 bg-white"
                        : "bg-white/30"
                    }
                  `}
                />

                {/* TITLE */}
                <span
                  className={`
                    absolute
                    whitespace-nowrap
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    transition-all
                    duration-300
                    ${
                      node.side === "left"
                        ? "left-full ml-4"
                        : "right-full mr-4"
                    }
                    ${
                      isActive
                        ? "text-white"
                        : "text-white/35"
                    }
                  `}
                >
                  {node.label}
                </span>

                {/* HOVER DETAIL CARD */}
                <span
                  className={`
                    pointer-events-none
                    absolute
                    z-50
                    w-[230px]
                    rounded-sm
                    border
                    border-white/10
                    bg-[#050505]/95
                    px-4
                    py-3
                    text-left
                    shadow-[0_15px_45px_rgba(0,0,0,0.55)]
                    backdrop-blur-md
                    transition-all
                    duration-250
                    ${
                      node.side === "left"
                        ? "left-full ml-4"
                        : "right-full mr-4"
                    }
                    top-full
                    mt-5
                    ${
                      isActive
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                    }
                  `}
                >
                  <span className="block text-[8px] font-semibold uppercase tracking-[0.25em] text-white/50">
                    {node.category}
                  </span>

                  <span className="mt-1.5 block text-[11px] leading-relaxed text-white/75">
                    {node.description}
                  </span>
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="mx-auto flex max-w-7xl items-center justify-between border-t border-white/10 pt-5">
        <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">
          SYSTEMS I WORK WITH
        </p>

        <p className="text-[9px] uppercase tracking-[0.22em] text-white/30">
          10 NODES
        </p>
      </div>
    </section>
  );
}