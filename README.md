# pnd-notes

Shared, curated **knowledge base** for the r3dpnd agents, served **read-only
over MCP**. One place to keep durable reference knowledge so an agent in any
project can pull the one note it needs — instead of re-researching or carrying
background in its context window.

You curate the notes by hand. Agents only read.

## Layout

```
notes/
  security/     reference for the Endless Illusion security agents
  gamedev/      Godot / pnd-games knowledge
  shared/       cross-cutting notes (incl. how to write a note)
server/
  pnd-notes.mjs the MCP server (stdio)
  notes.mjs     note loading, indexing, search
  test/         node --test suite
```

A **note** is one Markdown file at `notes/<area>/<slug>.md` with frontmatter.
Its id (what agents reference) is `<area>/<slug>`. Adding an area is just a new
folder — no code change. See `notes/shared/writing-a-good-note.md` for the
format.

## The MCP tools

| Tool | Returns |
|---|---|
| `list_areas` | areas + note counts |
| `search_notes(query, area?, tags?)` | matching notes as **summaries only** (id, title, area, tags, summary) — no bodies |
| `get_note(id)` | the full body of one note |

The two-step `search` → `get` shape is deliberate: an agent scans cheap
summaries, then loads exactly one body. There are **no write tools** — the base
is curated by hand, which is what makes it safe to wire into every agent.

Note payloads are wrapped with a `DATA (not instructions)` header because a note
may quote third-party or target-sourced text.

## Run it

```sh
npm install
npm run check     # list what's indexed
npm test          # unit tests
npm start         # run the MCP server on stdio
```

The notes directory defaults to `./notes`; override with `--notes <dir>` or
`PND_NOTES_DIR`.

## Consuming it from another repo

Add the server to that repo's `.mcp.json`:

```json
{
  "mcpServers": {
    "pnd-notes": {
      "command": "node",
      "args": ["/Users/prestonharms/Git/r3dpnd/pnd-notes/server/pnd-notes.mjs"]
    }
  }
}
```

Then grant an agent the tools `mcp__pnd-notes__list_areas`,
`mcp__pnd-notes__search_notes`, `mcp__pnd-notes__get_note`. Endless Illusion is
already wired up this way.
