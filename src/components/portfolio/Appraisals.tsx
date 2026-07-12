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
  {
    quote:
      "Lewis has a rare instinct for balancing craft and pragmatism. He'll happily push back on a spec if the outcome would be worse for the user, and he'll always come back with a better option. That made every project we shipped together noticeably sharper.",
    name: "Sam Whittaker",
    role: "Product Manager",
    org: "Apply Digital",
    relation: "Colleague",
  },
  {
    quote:
      "We came to Lewis with a rough brief and left with a brand system, a site, and a way of thinking about our product we didn't have before. He treats small companies with the same seriousness as the big ones.",
    name: "Priya Anand",
    role: "Co-founder",
    org: "Loom & Ledger",
    relation: "Client",
  },
  {
    quote:
      "One of those engineers who can hold the design intent in their head while writing the code. Reviews from Lewis always made the work better — never just style nits, always the substance.",
    name: "Marcus Feld",
    role: "Staff Engineer",
    org: "Apply Digital",
    relation: "Colleague",
  },
  {
    quote:
      "The rebuild Lewis delivered doubled our conversion within a quarter and, honestly, made the team proud to send the link to friends again. That second part is harder to measure and just as important.",
    name: "Elena Ruiz",
    role: "Head of Growth",
    org: "Northwind Studio",
    relation: "Built for",
  },
  {
    quote:
      "Lewis quietly raised the bar for everyone around him. Not through big statements — through the standard of the work he put in front of us every week.",
    name: "Tomás Oliveira",
    role: "Design Director",
    org: "ITS",
    relation: "Colleague",
  },
  {
    quote:
      "Working with Lewis felt like hiring a small studio, not a freelancer. Strategy, design, build, and follow-through all handled with the same care. Rare combination.",
    name: "Anonymous",
    role: "Operator",
    relation: "Client",
  },
  {
    quote:
      "He asks the questions no one else is asking in the room, and then does the work to answer them. Our launch was better for it, and so was the team culture after he left.",
    name: "Hannah Boateng",
    role: "Programme Lead",
    org: "Civic Futures",
    relation: "Built for",
  },
  {
    quote:
      "Genuinely thoughtful collaborator. Lewis takes feedback well, gives it kindly, and always leaves the codebase and the Figma file in a better state than he found them.",
    name: "Rory MacLean",
    role: "Senior Developer",
    org: "Apply Digital",
    relation: "Colleague",
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
                <span className="font-display text-base text-foreground md:text-lg">
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
