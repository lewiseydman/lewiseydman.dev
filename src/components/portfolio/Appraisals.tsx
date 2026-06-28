import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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
      "The clearest thinker about service design I've worked with. Every decision was traceable back to a user — and to a number.",
    name: "Placeholder Name",
    role: "Senior Designer",
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
      <ul className="columns-1 gap-6 md:columns-2 [&>li]:mb-6 [&>li]:break-inside-avoid">
        {testimonials.map((t, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="relative flex flex-col gap-5 rounded-sm border border-border bg-background p-7 md:p-8"
          >
            <Quote
              aria-hidden
              className="absolute -left-1 -top-2 h-10 w-10 rotate-180 text-sepia/30"
              strokeWidth={1}
            />
            <div className="flex items-baseline justify-between pl-1">
              <span className="font-mono-mar">{`Laus · ${String(i + 1).padStart(2, "0")}`}</span>
              <span className="font-mono-mar">{t.relation}</span>
            </div>
            <blockquote className="relative font-display text-xl italic leading-snug text-foreground md:text-2xl">
              {t.quote}
            </blockquote>
            <div className="hairline mt-2 h-px w-12" />
            <figcaption className="flex flex-col gap-0.5">
              <span className="font-display text-base text-foreground md:text-lg">{t.name}</span>
              <span className="font-mono-mar">
                {t.role} · {t.org}
              </span>
            </figcaption>
          </motion.li>
        ))}
      </ul>
      <p className="font-mono-mar">
        * Placeholder quotes — replace in <code>src/components/portfolio/Appraisals.tsx</code>.
      </p>
    </div>
  );
}