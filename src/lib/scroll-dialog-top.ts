/**
 * Scroll every open SectionDialog body to the top. Called after opening a
 * detail view so the content always starts at the top regardless of prior
 * scroll position in the dialog.
 */
export function scrollDialogToTop() {
  if (typeof document === "undefined") return;
  requestAnimationFrame(() => {
    document
      .querySelectorAll<HTMLElement>("[data-dialog-scroll]")
      .forEach((el) => {
        el.scrollTop = 0;
      });
  });
}