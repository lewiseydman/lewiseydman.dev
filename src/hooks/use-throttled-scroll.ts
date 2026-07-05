import { useEffect } from "react";

/**
 * Subscribe to scroll on the given element (or window if null), throttled to
 * one rAF per event. The callback receives the current scrollTop.
 */
export function useThrottledScroll(
  target: HTMLElement | Window | null,
  cb: (scrollTop: number) => void,
  deps: unknown[] = [],
) {
  useEffect(() => {
    if (!target) return;
    let raf = 0;
    let queued = false;

    const read = () => {
      queued = false;
      if (target instanceof Window) {
        cb(target.scrollY);
      } else {
        cb(target.scrollTop);
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(read);
    };

    // Prime with the current value.
    read();
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      target.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ...deps]);
}