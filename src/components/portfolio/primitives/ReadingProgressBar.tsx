import { useEffect, useRef, useState } from "react";
import { useThrottledScroll } from "@/hooks/use-throttled-scroll";

/**
 * Thin sepia progress bar bound to the section-dialog scroll container.
 * Renders nothing on first paint (before the scroller is found) so it never
 * flashes an empty bar.
 */
export function ReadingProgressBar() {
  const [scroller, setScroller] = useState<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const readyRef = useRef(false);

  useEffect(() => {
    // The scroller mounts inside a Radix Portal — poll for a frame or two.
    let raf = 0;
    const find = () => {
      const el = document.querySelector<HTMLElement>("[data-dialog-scroll]");
      if (el) {
        setScroller(el);
        readyRef.current = true;
      } else {
        raf = requestAnimationFrame(find);
      }
    };
    find();
    return () => cancelAnimationFrame(raf);
  }, []);

  useThrottledScroll(
    scroller,
    (top) => {
      if (!scroller) return;
      const max = scroller.scrollHeight - scroller.clientHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, top / max)) : 0);
    },
    [scroller],
  );

  if (!scroller) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none sticky top-0 z-10 -mt-12 mb-6 h-0.5 w-full overflow-hidden bg-transparent md:-mt-16"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-sepia/70 to-brass/70 transition-[width] duration-150 ease-out motion-reduce:transition-none"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}