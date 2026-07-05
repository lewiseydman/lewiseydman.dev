import { useCallback, useEffect, useState } from "react";

export type SectionHash = { section: string | null; item: string | null };

function parse(hash: string): SectionHash {
  const raw = hash.replace(/^#/, "");
  if (!raw) return { section: null, item: null };
  const [section, item] = raw.split("/");
  return { section: section || null, item: item || null };
}

/**
 * Reads the URL fragment as `section` / `section/item`.
 * Keeps section-level and detail-level state in one canonical place so the
 * VitruvianStage and section components can't drift out of sync.
 */
export function useSectionHash() {
  const [state, setState] = useState<SectionHash>(() =>
    typeof window === "undefined"
      ? { section: null, item: null }
      : parse(window.location.hash),
  );

  useEffect(() => {
    const apply = () => setState(parse(window.location.hash));
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const write = useCallback((next: SectionHash) => {
    if (typeof window === "undefined") return;
    const hash = next.section
      ? next.item
        ? `#${next.section}/${next.item}`
        : `#${next.section}`
      : "";
    const url = hash || window.location.pathname;
    history.replaceState(null, "", url);
    setState(next);
  }, []);

  const openSection = useCallback(
    (section: string) => write({ section, item: null }),
    [write],
  );
  const openItem = useCallback(
    (section: string, item: string) => write({ section, item }),
    [write],
  );
  const closeItem = useCallback(
    () => write({ section: state.section, item: null }),
    [write, state.section],
  );
  const closeSection = useCallback(
    () => write({ section: null, item: null }),
    [write],
  );

  return { ...state, openSection, openItem, closeItem, closeSection };
}