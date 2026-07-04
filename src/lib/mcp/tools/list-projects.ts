import { defineTool } from "@lovable.dev/mcp-js";

const projects = [
  { title: "Helios Console", outcome: "Cut onboarding time by 64%" },
  { title: "Atlas Maps", outcome: "+1.2M MAU in twelve months" },
  { title: "Aviary", outcome: "Acquired, post YC W23" },
  { title: "Specimen", outcome: "Adopted by 7 research labs" },
];

export default defineTool({
  name: "list_projects",
  title: "List projects",
  description: "List selected product work from the Opera section of the portfolio.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(projects) }],
    structuredContent: { projects },
  }),
});