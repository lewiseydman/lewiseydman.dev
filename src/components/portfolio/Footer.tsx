export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="flex flex-col gap-1">
          <span className="font-display text-2xl">Lewis Eydman</span>
          <span className="font-mono-mar">Codex personalis · MMXXVI</span>
        </div>
        <div className="flex flex-col items-start gap-1 md:items-end">
          <span className="font-mono-mar">Set in Cormorant & Inter Tight</span>
          <span className="font-mono-mar">Folio · 001 / 001</span>
        </div>
      </div>
    </footer>
  );
}