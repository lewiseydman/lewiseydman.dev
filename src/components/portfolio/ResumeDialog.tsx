import { Download, ExternalLink } from "lucide-react";
import { SectionDialog } from "./SectionDialog";
import { pillButtonClasses } from "./primitives/pillButton";

const PDF_URL = "/Lewis_Eydman_Resume.pdf";
// Open with the thumbnail sidebar visible and 100% zoom by default
const PDF_VIEW = "#pagemode=thumbs&zoom=100";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ResumeDialog({ open, onOpenChange }: Props) {
  return (
    <SectionDialog
      open={open}
      onOpenChange={onOpenChange}
      numeral="※"
      latin="Curriculum"
      english="Résumé"
      kicker="Vitae"
    >
      <div className="flex flex-col gap-6" role="document" aria-label="Résumé of Lewis Eydman">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
            A working chronology — roles, outcomes and instruments. Use the controls
            on the right to download or open in a new tab if your browser blocks
            embedded documents.
          </p>
          <div className="flex items-center gap-2">
            <a
              href={PDF_URL}
              target="_blank"
              rel="noreferrer"
              className={pillButtonClasses("ghost")}
            >
              <ExternalLink className="h-3.5 w-3.5" /> Open in new tab
            </a>
            <a
              href={PDF_URL}
              download="Lewis_Eydman_Resume.pdf"
              className={pillButtonClasses("primary")}
            >
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-sm border border-border bg-card">
          <object
            data={`${PDF_URL}${PDF_VIEW}`}
            type="application/pdf"
            aria-label="Résumé PDF preview"
            className="block h-[70vh] w-full"
          >
            <iframe
              src={`${PDF_URL}${PDF_VIEW}`}
              title="Résumé of Lewis Eydman"
              className="block h-[70vh] w-full border-0"
            />
            <div className="flex flex-col items-center gap-3 p-10 text-center">
              <p className="text-sm text-muted-foreground">
                Your browser can&rsquo;t display embedded PDFs.
              </p>
              <a
                href={PDF_URL}
                download="Lewis_Eydman_Resume.pdf"
                className={pillButtonClasses("primary")}
              >
                <Download className="h-3.5 w-3.5" /> Download résumé
              </a>
            </div>
          </object>
        </div>
      </div>
    </SectionDialog>
  );
}