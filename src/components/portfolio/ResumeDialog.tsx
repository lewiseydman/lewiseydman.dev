import { Download, ExternalLink } from "lucide-react";
import { SectionDialog } from "./SectionDialog";
import { pillButtonClasses } from "./primitives/pillButton";
import cvAsset from "@/assets/Lewis_Eydman_CV.pdf.asset.json";

const PDF_URL = cvAsset.url;
const DOWNLOAD_NAME = "Lewis_Eydman_CV.pdf";
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
      <div className="flex flex-col gap-8 md:gap-12" role="document" aria-label="Résumé of Lewis Eydman">
        <div className="sticky top-0 z-10 -mx-5 flex items-center justify-between gap-3 border-b border-border bg-background/85 px-5 py-2 backdrop-blur-md md:-mx-8 md:px-8 lg:-mx-12 lg:px-12">
          <span className="font-mono-mar flex min-w-0 items-center gap-2 truncate text-sepia">
            <span className="shrink-0">Curriculum vitae</span>
            <span className="hairline h-px w-6 shrink-0 sm:w-10" />
            <span className="shrink-0">PDF</span>
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={PDF_URL}
              target="_blank"
              rel="noreferrer"
              className={pillButtonClasses("ghost", undefined, "sm")}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Open in new tab</span>
              <span className="sm:hidden">Open</span>
            </a>
            <a
              href={PDF_URL}
              download={DOWNLOAD_NAME}
              className={pillButtonClasses("primary", undefined, "sm")}
            >
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </div>
        </div>

        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          A working chronology — roles, outcomes and instruments. Use the controls
          above to download or open in a new tab if your browser blocks embedded
          documents.
        </p>

        <div className="relative overflow-hidden rounded-sm border border-border bg-card">
          <object
            data={`${PDF_URL}${PDF_VIEW}`}
            type="application/pdf"
            aria-label="Résumé PDF preview"
            className="block h-[70vh] w-full md:h-[75vh]"
          >
            <iframe
              src={`${PDF_URL}${PDF_VIEW}`}
              title="Résumé of Lewis Eydman"
              className="block h-[70vh] w-full border-0 md:h-[75vh]"
            />
            <div className="flex flex-col items-center gap-4 p-4 text-center sm:p-6 lg:p-8">
              <p className="text-sm text-muted-foreground">
                Your browser can&rsquo;t display embedded PDFs.
              </p>
              <a
                href={PDF_URL}
                download={DOWNLOAD_NAME}
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