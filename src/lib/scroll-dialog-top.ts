/**
 * Scroll every open SectionDialog body to the top. Called after opening a
 * detail view so the content always starts at the top regardless of prior
 * scroll position in the dialog.
 */
export function scrollDialogToTop() {
  if (typeof document === "undefined") return;
  const reset = () => {
    document
      .querySelectorAll<HTMLElement>("[data-dialog-scroll]")
      .forEach((el) => {
        el.scrollTo({ top: 0, behavior: "auto" });
      });
  };
  // Two nested RAFs so the reset lands after AnimatePresence paints the
  // incoming view; behavior "auto" avoids the smooth-scroll flicker.
  requestAnimationFrame(() => requestAnimationFrame(reset));
}