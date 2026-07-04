import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shared "click → brief spinner → run action" hook used by the site's
 * expand controls (Codex "Reveal earlier folios", Opera "Read more").
 */
export function useExpandWithLoading(delay = 400) {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const trigger = useCallback(
    (action: () => void) => {
      if (isLoading) return;
      setIsLoading(true);
      timeoutRef.current = setTimeout(() => {
        action();
        setIsLoading(false);
        timeoutRef.current = null;
      }, delay);
    },
    [delay, isLoading],
  );

  return { isLoading, trigger };
}