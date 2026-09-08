import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";

const links = [
  { label: "Email", href: `mailto:${site.email}`, meta: site.email },
  { label: "GitHub", href: site.github, meta: "kishores070607-blip" },
  { label: "LinkedIn", href: site.linkedin, meta: "Kishore S" },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-t border-[#C9A86C]/12 px-5 pb-32 pt-20 md:px-10 md:pb-20 md:pt-32"
    >
      <div className="mx-auto max-w-7xl">
        <p data-reveal className="mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#C9A86C]">
          05 / Contact
        </p>
        <h2 data-reveal className="font-display text-[14vw] font-semibold leading-[0.86] tracking-[-0.04em] md:text-7xl lg:text-8xl">
          Let&apos;s make
          <br />
          something
          <span className="text-[#C9A86C]"> true.</span>
        </h2>
        <p className="mt-8 max-w-lg text-sm leading-relaxed text-[#9A9184] md:text-base">
          {site.availability}
        </p>

        <div className="mt-12 border-t border-[#C9A86C]/15">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex min-h-16 items-center justify-between border-b border-[#C9A86C]/15 py-5"
            >
              <span className="font-display text-2xl tracking-[-0.03em] md:text-3xl">
                {link.label}
              </span>
              <span className="flex items-center gap-4 text-xs text-[#9A9184]">
                <span className="hidden sm:inline">{link.meta}</span>
                <ArrowUpRight
                  size={18}
                  className="text-[#C9A86C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 text-[10px] uppercase tracking-[0.2em] text-[#9A9184] md:flex-row md:items-center md:justify-between">
          <span>{site.location}</span>
          <span>© {site.year} {site.name}</span>
        </div>
      </div>
    </section>
  );
}
