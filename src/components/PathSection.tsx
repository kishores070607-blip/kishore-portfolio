import { pathStages } from "@/data/path";

export default function PathSection() {
  return (
    <section
      id="path"
      className="relative border-t border-[#C9A86C]/12 px-5 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p data-reveal className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#C9A86C]">
          03 / Path
        </p>
        <h2 data-reveal className="mb-14 font-display text-[12vw] font-semibold leading-[0.9] tracking-[-0.04em] md:mb-20 md:text-6xl lg:text-7xl">
          How the
          <br />
          work arrived.
        </h2>

        <ol className="relative border-l border-[#C9A86C]/25 pl-6 md:border-l-0 md:pl-0 md:grid md:grid-cols-4 md:gap-8">
          {pathStages.map((stage, index) => (
            <li key={stage.number} data-reveal className="relative pb-12 last:pb-0 md:pb-0">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border border-[#C9A86C] bg-[#0C0B0A] md:static md:mb-8 md:block" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#C9A86C]">
                {stage.number} / {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                {stage.title}
              </h3>
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#9A9184]">
                {stage.kicker}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#9A9184]">
                {stage.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
