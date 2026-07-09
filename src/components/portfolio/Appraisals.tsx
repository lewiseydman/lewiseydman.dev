import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const relations = ["All", ...Array.from(new Set(testimonials.map((t) => t.relation).filter(Boolean)))] as const;

export function Appraisals() {
  const [activeRelation, setActiveRelation] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeRelation === "All") return testimonials;
    return testimonials.filter((t) => t.relation === activeRelation);
  }, [activeRelation]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <p className="font-display text-2xl leading-snug md:text-3xl">
          Laudes &mdash;{" "}
          <span className="italic text-sepia">
            a few words from former colleagues, clients, and the people I&rsquo;ve built for.
          </span>
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter testimonials by relation">
          {relations.map((relation) => {
            const isActive = relation === activeRelation;
            return (
              <button
                key={relation}
                onClick={() => setActiveRelation(relation)}
                aria-pressed={isActive}
                className={pillButtonClasses(isActive ? "primary" : "ghost")}
              >
                {relation}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((t, i) => (
            <motion.li
              key={`${t.name}-${t.role}`}
              layout
              initial={{ opacity: 0, scale: 0.98, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              transition={{ duration: 0.35, delay: i * 0.05, layout: { duration: 0.35 } }}
              className="group relative flex flex-col gap-5 bg-background p-6 transition-all duration-300 ease-out hover:bg-card hover:shadow-[0_12px_40px_-16px_color-mix(in_oklab,var(--ink)_18%,transparent)] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/40 md:p-7"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono-mar text-foreground transition-colors duration-300 group-hover:text-brass">{`Laus · ${String(i + 1).padStart(2, "0")}`}</span>
                {t.relation ? (
                  <span className="font-mono-mar text-foreground transition-colors duration-300 group-hover:text-brass">
                    {t.relation}
                  </span>
                ) : null}
              </div>
              <blockquote className="font-sans text-base leading-relaxed text-foreground transition-colors duration-300 md:text-lg">
                <span className="text-ink transition-colors duration-300 group-hover:text-brass" aria-hidden="true">
                  &ldquo;
                </span>
                {t.quote}
                <span className="text-ink transition-colors duration-300 group-hover:text-brass" aria-hidden="true">
                  &rdquo;
                </span>
              </blockquote>
              <div className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4 transition-colors duration-300 group-hover:border-sepia/40">
                <span className="font-display text-base text-foreground transition-colors duration-300 group-hover:text-brass md:text-lg">
                  {t.name}
                </span>
                <span className="font-mono-mar text-foreground">{t.org ? `${t.role} · ${t.org}` : t.role}</span>
              </div>
              <div className="h-px w-0 bg-ink transition-all duration-500 group-hover:w-full group-hover:bg-brass" />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
