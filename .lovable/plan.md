## Fix stale MCP files + confirm Contact cleanup

**Contact.tsx**: already deleted last turn — not on disk, not imported anywhere. The editor tab you see is stale; closing/reopening the file tree will refresh it. No action needed.

**MCP directory**: `src/lib/mcp/tools/get-profile.ts` (and siblings) reappeared on disk after the previous `rm -rf`, and the `@lovable.dev/mcp-js` package has been removed — that's the TS2307 error.

Action:
- Delete `src/lib/mcp/` (entire folder: `tools/get-profile.ts`, `tools/list-projects.ts`, `tools/list-writings.ts`) again.
- Run the build to confirm the TS2307 error clears.
