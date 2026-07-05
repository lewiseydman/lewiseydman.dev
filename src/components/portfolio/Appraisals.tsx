import { motion } from "framer-motion";
import { PopoverSummaryStrip } from "./PopoverSummaryStrip";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org?: string;
  relation?: "Colleague" | "Client" | "Built for";
};

// Placeholder drafts — swap in real quotes when ready.
const testimonials: Testimonial[] = [
  {
    quote:
      "Lewis is the rare PM who can sketch the interface in the morning, write the React in the afternoon, and still argue the roadmap with the board.",
    name: "Placeholder Name",
    role: "Head of Engineering",
    org: "100Green",
    relation: "Colleague",
  },
  {
    quote:
      "Lewis is a caring, hardworking, and talented individual. He always considers all aspects of project when generating ideas, making sure every stage, is carefully thought through. His experience in design and development made him an invaluable asset to our team.",
    name: "Monika Marcinkeviciene",
    role: "Creative Lead",
    org: "ITS",
    relation: "Colleague",
  },
  {
    quote:
      "I worked with Lewis directly for 2 years. He’s a great co-worker, friend and colleague. I learnt a lot from his experience. He taught me how to use multiple design tools, frameworks and ways of working. I’d highly recommend him, he’s hardworking and just a genuinely nice person to be around.",
    name: "Holly Tillier",
    role: "Designer",
    org: "ITS",
    relation: "Colleague",
  },
  {
    quote:
      "Lewis is an outstanding digital creative. He developed a site for me that looked years ahead of its time, and he was with me every step of the way. Would recommend him for anyone trying to stand out in an otherwise oversaturated market.",
    name: "Anonymous",
    role: "Director",
  },
];

export function Appraisals() {
  return (
    <div className="flex flex-col gap-8">
      <p className="font-display text-2xl leading-snug md:text-3xl">
        Laudes &mdash;{" "}
        <span className="italic text-sepia">
          a few words from former colleagues, clients, and the people I&rsquo;ve built for.
        </span>
      </p>
      <ul className="grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group flex flex-col gap-5 bg-background p-6 md:p-7"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono-mar">{`Laus · ${String(i + 1).padStart(2, "0")}`}</span>
              {t.relation ? <span className="font-mono-mar">{t.relation}</span> : null}
            </div>
            <blockquote className="font-display text-xl italic leading-snug text-foreground md:text-2xl">
              <span className="text-sepia">&ldquo;</span>
              {t.quote}
              <span className="text-sepia">&rdquo;</span>
            </blockquote>
            <div className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4">
              <span className="font-display text-base text-foreground md:text-lg">{t.name}</span>
              <span className="font-mono-mar">{t.org ? `${t.role} · ${t.org}` : t.role}</span>
            </div>
            <div className="h-px w-0 bg-sepia transition-all duration-500 group-hover:w-full" />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
