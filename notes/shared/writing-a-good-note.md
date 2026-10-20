---
title: How to write a good pnd-notes entry
area: shared
tags: [meta, conventions, authoring]
summary: One file = one topic. Frontmatter carries title/area/tags/summary/updated; the summary is what agents read before loading the body, so make it a real one-line gist. Write durable knowledge, not engagement logs.
updated: 2026-10-20
---

# How to write a good pnd-notes entry

This is the knowledge base r3dpnd agents read over MCP. Notes here should stay
true across tasks — reference knowledge, not a running log of one engagement.

## File layout

`notes/<area>/<slug>.md` — the id an agent uses is `<area>/<slug>`. Pick a slug
that reads well: `godot-signals-vs-direct-calls`, not `note3`. A new area is
just a new folder; no code change is needed.

## Frontmatter (required)

```
---
title: Human-readable title
area: security | gamedev | shared | <new area>
tags: [lowercase, keywords]
summary: One line. This is what an agent sees in search results before it
         decides whether to load the whole note — make it a real gist.
updated: YYYY-MM-DD
---
```

## What belongs here

- How a thing works, how to detect it, how to defend/handle it.
- Decisions and conventions that outlive a single task.
- Curated landscape/reference surveys.

## What does not

- Live credentials, tokens, customer data, unredacted PII.
- Per-engagement findings (those stay in the originating project's own
  `research/` folder; promote only the durable lesson here).

## How agents use it

`list_areas` → `search_notes` (returns summaries only) → `get_note` (full
body). Writing a sharp `summary` and good `tags` is what keeps an agent from
loading the wrong note.
