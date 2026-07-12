import { createFileRoute } from "@tanstack/react-router";
import { VitruvianStage } from "@/components/portfolio/VitruvianStage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lewis Eydman — Product Engineer, design & dev" },
      {
        name: "description",
        content:
          "Portfolio of Lewis Eydman — Product Engineer fluent in UX/UI design and full-stack development. Selected work, writings, experiments and résumé.",
      },
      { property: "og:title", content: "Lewis Eydman — Product Engineer" },
      {
        property: "og:description",
        content: "Portfolio of Lewis Eydman — Product Engineer fluent in design and full-stack engineering.",
      },
      { property: "og:url", content: "https://renaissance-blueprint-muse.lovable.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://renaissance-blueprint-muse.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Lewis Eydman",
          jobTitle: "Product Engineer",
          url: "https://renaissance-blueprint-muse.lovable.app/",
          sameAs: [
            "https://linkedin.com/in/lewiseydman/",
            "https://github.com/lewiseydman",
            "https://medium.com/@lewiseydman",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-dvh overflow-x-clip bg-background text-foreground">
      <VitruvianStage />
    </main>
  );
}
