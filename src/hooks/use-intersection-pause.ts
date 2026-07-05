import { useEffect, useState, type RefObject } from "react";

/**
 * Returns true when the target ref is off-screen (or when the tab is hidden).
 * Use it to pause animation loops (r3f Canvas, spinning gears) that don't need
 * to run while the user can't see them.
 */
export function useIntersectionPause(
  ref: RefObject<Element | null>,
  { rootMargin = "0px" }: { rootMargin?: string } = {},
) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let visible = true;
    let docVisible =
      typeof document === "undefined" ? true : !document.hidden;
    const apply = () => setPaused(!(visible && docVisible));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible = entry.isIntersecting;
        }
        apply();
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);

    const onVis = () => {
      docVisible = !document.hidden;
      apply();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ref, rootMargin]);

  return paused;
}