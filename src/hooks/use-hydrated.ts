import { useEffect, useState } from "react";

/**
 * True after the first client-side render. Use to gate reads of `window`,
 * `document`, `localStorage`, etc. so components render identically on
 * the server and during hydration.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
