import { systemGroups } from "@/data/systems";

export default function SystemsSection() {
  return (
    <section
      id="systems"
      className="relative border-t border-[#C9A86C]/12 px-5 py-20 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div data-reveal className="mb-12 md:mb-16 md:flex md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#C9A86C]">
              04 / Systems
            </p>
            <h2 className="font-display text-[12vw] font-semibold leading-[0.9] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              Tools in
              <br />
              the kit.
            </h2>
          </div>
          <p className="mt-4 max-w-sm text-sm text-[#9A9184] md:mt-0 md:text-right">
            Languages, boards, and the quieter machinery of proof.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {systemGroups.map((group) => (
            <div
              key={group.id}
              data-reveal
              className="rounded-[22px] border border-[#C9A86C]/12 bg-[#141210]/60 p-6 md:p-8"
            >
              <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-[#C9A86C]">
                {group.title}
              </h3>
              <ul className="space-y-5">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-start justify-between gap-6 border-b border-[#C9A86C]/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-display text-xl tracking-[-0.03em]">
                      {item.name}
                    </span>
                    <span className="max-w-[58%] text-right text-xs leading-relaxed text-[#9A9184]">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
