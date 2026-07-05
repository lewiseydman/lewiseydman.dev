import { ArrowLeft } from "lucide-react";

type Props = {
  onClick: () => void;
  label: string;
};

export function BackToIndexButton({ onClick, label }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-mono-mar group flex min-h-11 items-center gap-2 self-start rounded-full px-2 py-2 -ml-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sepia/40"
    >
      <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
      {label}
    </button>
  );
}