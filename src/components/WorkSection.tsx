"use client";

import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

export default function WorkSection() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured.id);

  return (
    <section
      id="work"
      className="relative border-t border-[#C9A86C]/12 px-5 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mb-12 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#C9A86C]">
              02 / Work
            </p>
            <h2 className="font-display text-[12vw] font-semibold leading-[0.9] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              Things that
              <br />
              hold.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#9A9184] md:text-right">
            Flagship first. Then the quieter machines that taught the rest.
          </p>
        </div>

        <article data-reveal className="group relative overflow-hidden rounded-[28px] border border-[#C9A86C]/18 bg-[#141210] p-6 md:p-12">
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#C9A86C]/10 blur-3xl transition-opacity duration-700 group-hover:opacity-80" />
          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A86C]">
                <span>{featured.number}</span>
                <span className="h-px w-8 bg-[#C9A86C]/40" />
                <span>{featured.eyebrow}</span>
                <span className="rounded-full border border-[#C9A86C]/30 px-3 py-1 text-[#F4EFE6]">
                  {featured.status}
                </span>
              </div>
              <h3 className="font-display text-4xl font-semibold tracking-[-0.03em] md:text-6xl">
                {featured.title}
              </h3>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#9A9184] md:text-base">
                {featured.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {featured.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#C9A86C]/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#F4EFE6]/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              {featured.live ? (
                <a
                  href={featured.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-full bg-[#C9A86C] px-6 text-[11px] uppercase tracking-[0.2em] text-[#0C0B0A] transition-transform duration-300 hover:scale-[1.02] lg:w-auto lg:min-w-[240px]"
                >
                  Live platform
                  <ArrowUpRight size={16} />
                </a>
              ) : null}
              {featured.repo ? (
                <a
                  href={featured.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-full border border-[#C9A86C]/35 px-6 text-[11px] uppercase tracking-[0.2em] text-[#C9A86C] lg:w-auto lg:min-w-[240px]"
                >
                  Source
                  <ArrowUpRight size={16} />
                </a>
              ) : null}
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9A9184]">
                {featured.year} · Four portals · Instant verify
              </p>
            </div>
          </div>
        </article>

        <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-3">
          {rest.map((project) => (
            <article
              key={project.id}
              data-reveal
              className="flex min-h-[240px] flex-col justify-between rounded-[22px] border border-[#C9A86C]/12 bg-[#141210]/70 p-6 transition-transform duration-500 hover:-translate-y-1 md:p-7"
            >
              <div>
                <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[#C9A86C]">
                  <span>{project.number}</span>
                  <span>{project.year}</span>
                </div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#9A9184]">
                  {project.eyebrow}
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[#9A9184]">
                  {project.description}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#F4EFE6]/55">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
