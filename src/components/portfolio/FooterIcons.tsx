import { Mail, Linkedin, FileText, Github, Coffee } from "lucide-react";
import { SiMedium } from "react-icons/si";
import { useState, type ComponentType, type SVGProps } from "react";
import { ResumeDialog } from "./ResumeDialog";
import { IconPillButton } from "./primitives/IconPillButton";

type IconCmp = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

type IconItem = {
  Icon: IconCmp;
  label: string;
  href?: string;
  action?: "resume";
};

const icons: IconItem[] = [
  { Icon: Mail, label: "Email", href: "mailto:lewiseydman@gmail.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/lewiseydman/" },
  { Icon: FileText, label: "Résumé", action: "resume" },
  { Icon: Github, label: "GitHub", href: "https://github.com/lewiseydman" },
  { Icon: SiMedium as IconCmp, label: "Medium", href: "https://medium.com/@lewiseydman" },
  { Icon: Coffee, label: "Buy me a coffee", href: "https://buymeacoffee.com/lewiseydman" },
];

export function FooterIcons() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-2 backdrop-blur-md">
        {icons.map(({ Icon, label, href, action }) => {
          if (action === "resume") {
            return (
              <IconPillButton
                key={label}
                size="sm"
                label={label}
                showTooltip
                onClick={() => setResumeOpen(true)}
                aria-haspopup="dialog"
              >
                <Icon className="h-4 w-4" />
              </IconPillButton>
            );
          }
          return (
            <IconPillButton
              key={label}
              size="sm"
              label={label}
              showTooltip
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noreferrer" : undefined}
            >
              <Icon className="h-4 w-4" />
            </IconPillButton>
          );
        })}
      </div>
      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </>
  );
}
