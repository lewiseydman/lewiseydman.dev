import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_profile",
  title: "Get profile",
  description: "Return Lewis Eydman's profile summary, role, and contact links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [
      {
        type: "text",
        text: JSON.stringify({
          name: "Lewis Eydman",
          role: "Product Manager fluent in design and full-stack development",
          links: {
            email: "mailto:lewiseydman@gmail.com",
            linkedin: "https://linkedin.com/in/lewiseydman/",
            github: "https://github.com/lewiseydman",
            medium: "https://medium.com/@lewiseydman",
            buymeacoffee: "https://buymeacoffee.com/lewiseydman",
          },
        }),
      },
    ],
  }),
});
