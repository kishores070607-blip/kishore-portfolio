"use client";

import { useEffect, useRef, useState } from "react";

const stages = [
  {
    number: "01",
    title: "CURIOUS",
    description:
      "Started by taking things apart, asking how they worked, and wanting to understand what was happening underneath.",
  },
  {
    number: "02",
    title: "BUILDING",
    description:
      "Moving from learning concepts to turning them into things that actually work.",
  },
  {
    number: "03",
    title: "EXPLORING",
    description:
      "Experimenting across software, hardware, systems and the spaces between them.",
  },
  {
    number: "04",
    title: "BECOMING",
    description:
      "Still learning. Still building. Still figuring out what comes next.",
  },
];

const JOURNEY_PATH =
  "M 50 0 " +
  "C 50 12, 75 18, 75 28 " +
  "C 75 40, 25 45, 25 56 " +
  "C 25 68, 70 73, 70 84 " +
  "C 70 94, 50 98, 50 100";

const STAGE_POINTS = [
  { x: 50, y: 0 },
  { x: 75, y: 28 },
  { x: 25, y: 56 },
  { x: 50, y: 100 },
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const pathRef = useRef<SVGPathElement | null>(null);
  const progressPathRef = useRef<SVGPathElement | null>(null);

  const signalRef = useRef<HTMLDivElement | null>(null);
  const signalGlowRef = useRef<HTMLDivElement | null>(null);

  const mobileProgressRef = useRef<HTMLDivElement | null>(null);

  const frameRef = useRef<number | null>(null);
  const tickingRef = useRef(false);

  const pathLengthRef = useRef(0);
  const lastStageRef = useRef(0);

  const [activeStage, setActiveStage] = useState(0);

  const clamp = (value: number, min = 0, max = 1) =>
    Math.min(Math.max(value, min), max);

  const getProgress = () => {
    const body = bodyRef.current;

    if (!body) return 0;

    const rect = body.getBoundingClientRect();

    const travelDistance =
      body.offsetHeight - window.innerHeight;

    if (travelDistance <= 0) {
      return 0;
    }

    return clamp(-rect.top / travelDistance);
  };

  const updateVisuals = () => {
    tickingRef.current = false;

    const progress = getProgress();

    const path = pathRef.current;

    if (
      path &&
      signalRef.current &&
      signalGlowRef.current
    ) {
      const totalLength =
        pathLengthRef.current ||
        path.getTotalLength();

      pathLengthRef.current = totalLength;

      const distance =
        totalLength * progress;

      const point =
        path.getPointAtLength(distance);

      signalRef.current.style.left =
        `${point.x}%`;

      signalRef.current.style.top =
        `${point.y}%`;

      signalGlowRef.current.style.left =
        `${point.x}%`;

      signalGlowRef.current.style.top =
        `${point.y}%`;
    }

    if (progressPathRef.current) {
      progressPathRef.current.style.strokeDashoffset =
        `${100 - progress * 100}`;
    }

    if (mobileProgressRef.current) {
      mobileProgressRef.current.style.transform =
        `scaleX(${progress})`;
    }

    const stage = Math.min(
      Math.floor(progress * stages.length),
      stages.length - 1
    );

    if (stage !== lastStageRef.current) {
      lastStageRef.current = stage;
      setActiveStage(stage);
    }
  };

  const handleScroll = () => {
    if (tickingRef.current) return;

    tickingRef.current = true;

    frameRef.current =
      requestAnimationFrame(updateVisuals);
  };

  useEffect(() => {
    if (pathRef.current) {
      pathLengthRef.current =
        pathRef.current.getTotalLength();
    }

    updateVisuals();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );

      if (frameRef.current !== null) {
        cancelAnimationFrame(
          frameRef.current
        );
      }
    };
    // Unused legacy section retained in tree; hook deps are intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToStage = (index: number) => {
    const body = bodyRef.current;

    if (!body) return;

    const rect =
      body.getBoundingClientRect();

    const bodyTop =
      window.scrollY + rect.top;

    const travelDistance =
      body.offsetHeight -
      window.innerHeight;

    const progress =
      index / (stages.length - 1);

    window.scrollTo({
      top:
        bodyTop +
        travelDistance * progress,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative border-t border-white/10"
    >
      {/* HEADER */}

      <div className="px-6 pt-24 md:px-10 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 md:text-xs">
            03 / Journey
          </p>
        </div>
      </div>

      {/* JOURNEY BODY */}

      <div
        ref={bodyRef}
        className="relative mx-auto max-w-7xl px-6 md:px-10"
      >
        {/* JOURNEY RAIL */}

        <div
          className="
            pointer-events-none
            absolute
            right-8
            top-0
            z-20
            hidden
            h-full
            w-[240px]
            md:block
            lg:right-12
          "
        >
          <div
            className="
              sticky
              top-[21vh]
              h-[58vh]
              w-full
            "
          >
            {/* PATH */}

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="
                absolute
                left-0
                top-0
                h-full
                w-[110px]
              "
              fill="none"
              overflow="visible"
            >
              {/* BASE PATH */}

              <path
                ref={pathRef}
                d={JOURNEY_PATH}
                pathLength="100"
                stroke="currentColor"
                strokeWidth="0.45"
                strokeLinecap="round"
                className="text-white/20"
              />

              {/* SCROLL REVEAL */}

              <path
                ref={progressPathRef}
                d={JOURNEY_PATH}
                pathLength="100"
                stroke="currentColor"
                strokeWidth="0.7"
                strokeLinecap="round"
                strokeDasharray="100"
                strokeDashoffset="100"
                className="text-white/70"
              />

              {/* SUBTLE END LIGHT — TOP */}

              <circle
                cx="50"
                cy="0"
                r="1.2"
                fill="white"
                opacity="0.5"
              />

              {/* SUBTLE END LIGHT — BOTTOM */}

              <circle
                cx="50"
                cy="100"
                r="1.2"
                fill="white"
                opacity="0.5"
              />
            </svg>

            {/* STAGE NODES */}

            {stages.map((stage, index) => {
              const point =
                STAGE_POINTS[index];

              const isActive =
                index === activeStage;

              const isComplete =
                index < activeStage;

              return (
                <button
                  key={stage.number}
                  type="button"
                  onClick={() =>
                    scrollToStage(index)
                  }
                  aria-label={`Go to ${stage.title}`}
                  className="
                    pointer-events-auto
                    absolute
                    z-30
                    -translate-x-1/2
                    -translate-y-1/2
                  "
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                  }}
                >
                  {/* NODE */}

                  <span
                    className={`
                      relative
                      block
                      rounded-full
                      border
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "h-5 w-5 border-white bg-white"
                          : isComplete
                            ? "h-3 w-3 border-white/40 bg-[#0a0a0a]"
                            : "h-3 w-3 border-white/20 bg-[#0a0a0a]"
                      }
                    `}
                  >
                    {isActive && (
                      <span
                        className="
                          absolute
                          left-1/2
                          top-1/2
                          h-1.5
                          w-1.5
                          -translate-x-1/2
                          -translate-y-1/2
                          rounded-full
                          bg-black
                        "
                      />
                    )}
                  </span>

                  {/* LABEL */}

                  <span
                    className={`
                      absolute
                      left-7
                      top-1/2
                      -translate-y-1/2
                      whitespace-nowrap
                      text-[8px]
                      uppercase
                      tracking-[0.18em]
                      transition-colors
                      duration-300
                      ${
                        isActive
                          ? "text-white"
                          : "text-white/20"
                      }
                    `}
                  >
                    {stage.number} /{" "}
                    {stage.title}
                  </span>
                </button>
              );
            })}

            {/* SIGNAL GLOW */}

            <div
              ref={signalGlowRef}
              className="
                pointer-events-none
                absolute
                z-10
                h-7
                w-7
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-white/10
                blur-md
              "
              style={{
                left: "50%",
                top: "0%",
              }}
            />

            {/* SIGNAL DOT */}

            <div
              ref={signalRef}
              className="
                pointer-events-none
                absolute
                z-40
                h-2
                w-2
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-white
              "
              style={{
                left: "50%",
                top: "0%",
              }}
            />
          </div>
        </div>

        {/* STAGES */}

        {stages.map((stage, index) => {
          const active =
            index === activeStage;

          return (
            <div
              key={stage.number}
              className="
                relative
                flex
                min-h-[85vh]
                items-center
              "
            >
              <div
                className="
                  w-full
                  md:w-[calc(100%-300px)]
                "
              >
                {/* STATE LABEL */}

                <div className="mb-8 flex items-center gap-4">
                  <span
                    className={`
                      font-mono
                      text-[9px]
                      transition-colors
                      duration-500
                      md:text-xs
                      ${
                        active
                          ? "text-white"
                          : "text-white/20"
                      }
                    `}
                  >
                    {stage.number}
                  </span>

                  <span
                    className={`
                      h-px
                      transition-all
                      duration-500
                      ${
                        active
                          ? "w-14 bg-white/60"
                          : "w-7 bg-white/15"
                      }
                    `}
                  />

                  <span
                    className={`
                      text-[8px]
                      uppercase
                      tracking-[0.2em]
                      transition-colors
                      duration-500
                      ${
                        active
                          ? "text-white/60"
                          : "text-white/20"
                      }
                    `}
                  >
                    Current state
                  </span>
                </div>

                {/* TITLE */}

                <div className="overflow-hidden">
                  <h2
                    className={`
                      text-[16vw]
                      font-medium
                      leading-[0.78]
                      tracking-[-0.09em]
                      transition-all
                      duration-700
                      md:text-[10vw]
                      ${
                        active
                          ? "translate-x-0 text-white opacity-100"
                          : "translate-x-6 text-white/10 opacity-40"
                      }
                    `}
                  >
                    {stage.title}
                  </h2>
                </div>

                {/* DESCRIPTION */}

                <div className="relative mt-12 min-h-[80px] overflow-hidden md:mt-16">
                  <p
                    className={`
                      max-w-lg
                      text-xs
                      leading-[1.8]
                      transition-all
                      duration-700
                      md:text-sm
                      ${
                        active
                          ? "translate-y-0 text-white/45 opacity-100"
                          : "translate-y-4 text-white/10 opacity-0"
                      }
                    `}
                  >
                    {stage.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MOBILE PROGRESS */}

      <div className="px-6 pb-10 md:hidden">
        <div className="mb-5 h-px w-full overflow-hidden bg-white/10">
          <div
            ref={mobileProgressRef}
            className="
              h-px
              origin-left
              bg-white
            "
            style={{
              transform: "scaleX(0)",
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] text-white/25">
            {String(activeStage + 1).padStart(
              2,
              "0"
            )}
          </span>

          <span className="text-[8px] uppercase tracking-[0.18em] text-white/25">
            {stages[activeStage].title}
          </span>

          <span className="font-mono text-[8px] text-white/25">
            04
          </span>
        </div>
      </div>

      {/* FOOTER */}

      <div className="px-6 pb-12 md:px-10 md:pb-16">
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/25
            md:text-[9px]
          "
        >
          <span>Still becoming</span>

          <span>
            {String(activeStage + 1).padStart(
              2,
              "0"
            )}{" "}
            / 04
          </span>
        </div>
      </div>
    </section>
  );
}