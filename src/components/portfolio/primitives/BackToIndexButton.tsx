import { ArrowLeft } from "lucide-react";
import { pillButtonClasses } from "./pillButton";

type Props = {
  onClick: () => void;
  label: string;
};

export function BackToIndexButton({ onClick, label }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={pillButtonClasses("ghost", "-ml-1 self-start border-transparent hover:border-transparent hover:bg-transparent", "sm")}
    >
      <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
      <span className="md:hidden">Back</span>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}
