import { createFileRoute } from "@tanstack/react-router";
import { VitruvianStage } from "@/components/portfolio/VitruvianStage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lewis Eydman" },
      {
        name: "description",
        content:
          "Lewis Eydman is a Product Manager bridging UX/UI design and full-stack development, in the tradition of the renaissance polymath.",
      },
      { property: "og:title", content: "Lewis Eydman — Product Manager" },
      {
        property: "og:description",
        content: "Portfolio of Lewis Eydman — Product Manager fluent in design and full-stack engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <VitruvianStage />
    </main>
  );
}
