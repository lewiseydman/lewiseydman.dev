import { defineTool } from "@lovable.dev/mcp-js";

const writings = [
  { title: "The product manager as draftsman" },
  { title: "Notes on small surfaces" },
  { title: "Hiring for the hyphen" },
  { title: "Against the platform shrug" },
];

export default defineTool({
  name: "list_writings",
  title: "List writings",
  description: "List essays and notes from the Codex section of the portfolio.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(writings) }],
    structuredContent: { writings },
  }),
});