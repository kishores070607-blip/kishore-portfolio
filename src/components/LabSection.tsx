"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";

function PulseSignal({
  status,
  active,
}: {
  status: string;
  active: boolean;
}) {
  const isBuilt = status === "BUILT";
  const pathRef = useRef<SVGPathElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const phaseRef = useRef(0);

  useEffect(() => {
    const path = pathRef.current;

    if (!path) return;

    const width = 62;
    const center = 12;

    const draw = () => {
      phaseRef.current += isBuilt ? 0.08 : 0.06;

      let d = "";

      /*
       * BUILT:
       * One clean pulse that stays still.
       *
       * BUILDING:
       * Continuous repeating pulses.
       */

      if (isBuilt) {
        const pulseWidth = active ? 18 : 14;
        const amplitude = active ? 7 : 5;

        const start = (width - pulseWidth) / 2;

        d = `M 0 ${center} L ${start} ${center}
             L ${start + pulseWidth * 0.28} ${center - amplitude}
             L ${start + pulseWidth * 0.5} ${center + amplitude}
             L ${start + pulseWidth * 0.72} ${center}
             L ${width} ${center}`;
      } else {
        const amplitude = active ? 6 : 4;
        const frequency = 2.4;

        for (let x = 0; x <= width; x += 1.5) {
          const wave =
            Math.sin(
              (x / width) * Math.PI * frequency + phaseRef.current
            ) * amplitude;

          const y = center + wave;

          d += `${x === 0 ? "M" : "L"} ${x} ${y} `;
        }
      }

      path.setAttribute("d", d);

      if (!isBuilt) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isBuilt, active]);

  return (
    <div className="flex h-9 w-[62px] shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 62 24"
        className={`h-6 w-[62px] transition-all duration-700 ${
          active
            ? "text-white opacity-100"
            : "text-white/35 opacity-70 group-hover:text-white/70"
        }`}
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default function LabSection() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <section
      id="lab"
      className="relative min-h-screen overflow-hidden border-t border-white/10 px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-20 flex items-start justify-between md:mb-28">
          <div>
            <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-white/40 md:text-xs">
              02 / Lab
            </p>

            <h2 className="text-[17vw] font-medium leading-[0.76] tracking-[-0.08em] md:text-[11vw]">
              THINGS
              <br />
              I&apos;VE BUILT.
            </h2>
          </div>

          <div className="hidden max-w-[180px] pt-10 text-right text-[10px] leading-[1.6] text-white/30 md:block">
            <p>
              A record of things
              <br />
              built, tested,
              <br />
              broken and learned.
            </p>
          </div>
        </div>

        {/* PROJECT AREA */}
        <div className="w-full md:pr-56 lg:pr-64">
          <div className="border-t border-white/10">
            {projects.map((project) => {
              const active = activeProject === project.id;

              return (
                <button
                  key={project.id}
                  type="button"
                  onMouseEnter={() => setActiveProject(project.id)}
                  onMouseLeave={() => setActiveProject(null)}
                  onFocus={() => setActiveProject(project.id)}
                  onBlur={() => setActiveProject(null)}
                  onClick={() =>
                    setActiveProject(active ? null : project.id)
                  }
                  className={`group relative flex w-full flex-col border-b border-white/10 text-left transition-all duration-700 ${
                    active ? "py-10 md:py-14" : "py-7 md:py-9"
                  }`}
                >
                  {/* MAIN ROW */}
                  <div
                    className="
                      grid
                      grid-cols-[28px_minmax(0,1fr)_62px]
                      items-center
                      gap-4
                      md:grid-cols-[36px_minmax(0,1fr)_70px_90px_62px]
                      md:gap-6
                    "
                  >
                    {/* NUMBER */}
                    <div
                      className={`font-mono text-[9px] transition-all duration-500 md:text-xs ${
                        active ? "text-white" : "text-white/30"
                      }`}
                    >
                      {project.number}
                    </div>

                    {/* TITLE */}
                    <div className="min-w-0">
                      <h3
                        className={`truncate text-[7vw] font-medium leading-none tracking-[-0.055em] transition-all duration-700 md:text-[4vw] ${
                          active
                            ? "translate-x-2 text-white md:translate-x-4"
                            : "text-white/65"
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* YEAR */}
                    <div className="hidden text-[9px] tracking-[0.15em] text-white/25 md:block">
                      {project.year}
                    </div>

                    {/* STATUS */}
                    <div
                      className={`hidden text-right text-[8px] uppercase tracking-[0.15em] md:block ${
                        active ? "text-white/70" : "text-white/25"
                      }`}
                    >
                      {project.status}
                    </div>

                    {/* LIFE SIGNAL */}
                    <PulseSignal
                      status={project.status}
                      active={active}
                    />
                  </div>

                  {/* EXPANDED CONTENT */}
                  <div
                    className={`grid transition-all duration-700 ${
                      active
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-8 pt-8 md:grid-cols-[1fr_1fr_180px] md:pl-12 md:pt-10">
                        {/* DESCRIPTION */}
                        <p className="max-w-md text-xs leading-[1.7] text-white/45 md:text-sm">
                          {project.description}
                        </p>

                        {/* STACK */}
                        <div>
                          <p className="mb-3 text-[8px] uppercase tracking-[0.2em] text-white/25">
                            Built with
                          </p>

                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {project.stack.map((item) => (
                              <span
                                key={item}
                                className="text-[9px] uppercase tracking-[0.12em] text-white/55"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* FOOTER */}
          <div className="flex items-center justify-between pt-8 text-[8px] uppercase tracking-[0.18em] text-white/25 md:text-[9px]">
            <span>{projects.length} recorded experiments</span>

            <span>
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-white/50" />
              continuously updating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}