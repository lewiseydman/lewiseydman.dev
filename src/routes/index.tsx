import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { SelectedWork } from "@/components/portfolio/SelectedWork";
import { ExperienceTimeline } from "@/components/portfolio/ExperienceTimeline";
import { WritingsAppraisals } from "@/components/portfolio/WritingsAppraisals";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lewis Eydman — Product Manager · Design & Engineering" },
      {
        name: "description",
        content:
          "Lewis Eydman is a Product Manager bridging UX/UI design and full-stack development, in the tradition of the renaissance polymath.",
      },
      { property: "og:title", content: "Lewis Eydman — Product Manager" },
      {
        property: "og:description",
        content:
          "Portfolio of Lewis Eydman — Product Manager fluent in design and full-stack engineering.",
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
      <Nav />
      <Hero />
      <About />
      <SelectedWork />
      <ExperienceTimeline />
      <WritingsAppraisals />
      <Contact />
      <Footer />
    </main>
  );
}
