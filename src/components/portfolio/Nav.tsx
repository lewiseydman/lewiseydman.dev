import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const items = [
  { href: "#about", label: "I", name: "About" },
  { href: "#work", label: "II", name: "Work" },
  { href: "#experience", label: "III", name: "Experience" },
  { href: "#writings", label: "IV", name: "Writings" },
  { href: "#contact", label: "V", name: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center pt-4 px-4"
    >
      <nav
        className={`flex items-center gap-1 rounded-full border border-border/60 px-2 py-1.5 backdrop-blur-md transition-all ${
          scrolled ? "bg-background/80 shadow-[0_1px_30px_-12px_rgba(0,0,0,0.25)]" : "bg-background/40"
        }`}
      >
        <a
          href="#top"
          className="font-display text-base font-medium tracking-tight px-3 py-1 text-foreground"
        >
          L·E
        </a>
        <span className="hairline mx-1 h-5 w-px" />
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            className="group relative flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="font-mono text-[0.65rem] tracking-widest text-sepia opacity-60">
              {it.label}
            </span>
            <span className="hidden sm:inline">{it.name}</span>
          </a>
        ))}
      </nav>
    </motion.header>
  );
}