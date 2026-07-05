import { motion } from "framer-motion";
import { PopoverSummaryStrip } from "./PopoverSummaryStrip";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  org: string;
  relation: "Colleague" | "Client" | "Built for";
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
      "He took an ambiguous business problem and returned a wireframe, a prototype, and the analytics that proved it. We shipped in weeks, not quarters.",
    name: "Placeholder Name",
    role: "Founder",
    org: "Independent client",
    relation: "Client",
  },
  {
    quote:
      "I worked with Lewis directly for 2 years. He’s a great co-worker, friend and intelligent colleague. I learnt a lot from his experience. He taught me how to use dot digital, how to design emails, and how to use bigcommerce editing bits of the website. I’d highly recommend him, he’s hardworking and just a genuinely nice person to be around.",
    name: "Holly Tillier",
    role: "Designer",
    org: "ITS",
    relation: "Colleague",
  },
  {
    quote:
      "Lewis built our entire web presence from research to deployment. Two years on, it still feels considered — nothing has had to be rebuilt.",
    name: "Placeholder Name",
    role: "Director",
    org: "Freelance engagement",
    relation: "Built for",
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
              <span className="font-mono-mar">{t.relation}</span>
            </div>
            <blockquote className="font-display text-xl italic leading-snug text-foreground md:text-2xl">
              <span className="text-sepia">&ldquo;</span>
              {t.quote}
              <span className="text-sepia">&rdquo;</span>
            </blockquote>
            <div className="mt-auto flex flex-col gap-0.5 border-t border-border pt-4">
              <span className="font-display text-base text-foreground md:text-lg">{t.name}</span>
              <span className="font-mono-mar">
                {t.role} · {t.org}
              </span>
            </div>
            <div className="h-px w-0 bg-sepia transition-all duration-500 group-hover:w-full" />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
