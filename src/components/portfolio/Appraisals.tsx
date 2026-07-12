import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { pillButtonClasses } from "./primitives/pillButton";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org?: string;
  relation?: "Colleague" | "Client" | "Built for";
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Lewis is a caring, hardworking, and talented individual. He always considers all aspects of the project when generating ideas, making sure every stage is carefully thought through. His experience in design and development made him an invaluable asset to our team.",
    name: "Monika Marcinkeviciene",
    role: "Creative Lead",
    org: "ITS",
    relation: "Colleague",
  },
  {
    quote:
      "What consistently stood out was the quality and reliability of his work. He was someone I could always count on to deliver front-end work that was on point and met our quality standards.",
    name: "Dave Craven",
    role: "Technology Lead",
    org: "Apply Digital",
  },
  {
    quote:
      "I worked with Lewis directly for 2 years. He’s a great co-worker, friend and colleague. I learnt a lot from his experience. He taught me how to use multiple design tools, frameworks and ways of working. I’d highly recommend him; he’s hardworking and just a genuinely nice person to be around.",
    name: "Holly Tillier",
    role: "Designer",
    org: "ITS",
    relation: "Colleague",
  },
  {
    quote:
      "Lewis is an outstanding digital creative. He developed a site for me that looked years ahead of its time, and he was with me every step of the way. Would recommend him for anyone trying to stand out in an otherwise oversaturated market.",
    name: "Anonymous",
    role: "Founder",
    relation: "Client",
  },
];

export function Appraisals() {
  const relations = useMemo(() => {
    const set = new Set<string>();
    testimonials.forEach((t) => t.relation && set.add(t.relation));
    return ["All", ...Array.from(set)];
  }, []);
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? testimonials : testimonials.filter((t) => t.relation === filter);

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <header className="flex flex-col gap-4">
        <p className="font-display text-2xl leading-snug md:text-3xl">
          <span className="italic text-sepia">A few words from clients and collaborators.</span>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <span className="font-mono-mar">Filter ·</span>
          <div className="flex flex-wrap gap-2">
            {relations.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setFilter(r)}
                aria-pressed={filter === r}
                className={pillButtonClasses(filter === r ? "primary" : "ghost", undefined, "sm")}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </header>
      <ul className="grid gap-6 md:gap-8 lg:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((t, i) => (
            <motion.li
              key={t.name}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, delay: Math.min(i, 3) * 0.05 }}
              className="group relative flex flex-col gap-4 rounded-sm border border-border bg-background p-4 transition-[background-color,box-shadow,border-color] duration-300 ease-out hover:bg-card hover:shadow-[0_12px_40px_-16px_color-mix(in_oklab,var(--ink)_12%,transparent)] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/40 sm:p-6 lg:p-8"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono-mar transition-colors duration-300 group-hover:text-brass">{`Laus · ${String(i + 1).padStart(2, "0")}`}</span>
                {t.relation ? (
                  <span className="font-mono-mar transition-colors duration-300 group-hover:text-brass">
                    {t.relation}
                  </span>
                ) : null}
              </div>
              <blockquote className="font-display text-lg italic leading-snug text-foreground transition-colors duration-300 md:text-xl">
                <span className="text-sepia transition-colors duration-300 group-hover:text-brass">&ldquo;</span>
                {t.quote}
                <span className="text-sepia transition-colors duration-300 group-hover:text-brass">&rdquo;</span>
              </blockquote>
              <div className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4 transition-colors duration-300 group-hover:border-sepia/40">
                <span className="font-display text-base text-foreground transition-colors duration-300 group-hover:text-brass md:text-lg">
                  {t.name}
                </span>
                <span className="font-mono-mar">{t.org ? `${t.role} · ${t.org}` : t.role}</span>
              </div>
              <div className="h-px w-0 bg-sepia transition-all duration-500 group-hover:w-full group-hover:bg-brass" />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
