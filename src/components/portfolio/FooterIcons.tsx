import { Mail, Linkedin, FileText, Github, Coffee } from "lucide-react";
import { SiMedium } from "react-icons/si";
import type { ComponentType, SVGProps } from "react";

type IconCmp = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

const icons: { Icon: IconCmp; label: string; href: string }[] = [
  { Icon: Mail, label: "Email", href: "mailto:lewiseydman@gmail.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/lewiseydman/" },
  { Icon: FileText, label: "Résumé", href: "#" },
  { Icon: Github, label: "GitHub", href: "https://github.com/lewiseydman" },
  { Icon: SiMedium as IconCmp, label: "Medium", href: "https://medium.com/@lewiseydman" },
  { Icon: Coffee, label: "Buy me a coffee", href: "https://buymeacoffee.com/lewiseydman" },
];

export function FooterIcons() {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-2 backdrop-blur-md">
      {icons.map(({ Icon, label, href }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={label}
          className="group relative flex h-8 w-8 items-center justify-center rounded-full text-sepia transition-colors hover:text-foreground"
        >
          <Icon className="h-4 w-4" />
          <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-border bg-background px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-sepia opacity-0 transition-opacity group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
