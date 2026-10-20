import { test } from "node:test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { getNote, listAreas, loadNotes, parseFrontmatter, searchNotes } from "../notes.mjs";

const NOTES_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "notes");

test("parseFrontmatter reads strings and inline lists", () => {
  const { data, body } = parseFrontmatter("---\ntitle: Hi\ntags: [a, b, c]\n---\nbody text\n");
  assert.equal(data.title, "Hi");
  assert.deepEqual(data.tags, ["a", "b", "c"]);
  assert.equal(body.trim(), "body text");
});

test("parseFrontmatter tolerates missing frontmatter", () => {
  const { data, body } = parseFrontmatter("no frontmatter here");
  assert.deepEqual(data, {});
  assert.equal(body, "no frontmatter here");
});

test("loadNotes indexes the seeded notes with ids and areas", async () => {
  const notes = await loadNotes(NOTES_DIR);
  assert.ok(notes.length >= 3, "expected the seeded notes");
  const bounty = notes.find((n) => n.id === "security/bounty-landscape-2026-10-15");
  assert.ok(bounty, "bounty note present");
  assert.equal(bounty.area, "security");
  assert.ok(bounty.summary.length > 0);
  assert.ok(bounty.body.includes("landscape"));
});

test("listAreas counts per area", async () => {
  const notes = await loadNotes(NOTES_DIR);
  const areas = listAreas(notes);
  const names = areas.map((a) => a.area);
  assert.ok(names.includes("security") && names.includes("gamedev") && names.includes("shared"));
});

test("search returns matches without bodies and respects filters", async () => {
  const notes = await loadNotes(NOTES_DIR);
  const hits = searchNotes(notes, { query: "bounty scope" });
  assert.ok(hits.length >= 1);
  assert.equal(hits[0].id, "security/bounty-landscape-2026-10-15");
  assert.ok(!("body" in hits[0]), "search results must not carry bodies");

  const byArea = searchNotes(notes, { query: "", area: "gamedev" });
  assert.ok(byArea.every((h) => h.area === "gamedev"));

  const byTag = searchNotes(notes, { query: "", tags: ["godot"] });
  assert.ok(byTag.length >= 1 && byTag.every((h) => h.tags.includes("godot")));
});

test("getNote returns full body by id, null otherwise", async () => {
  const notes = await loadNotes(NOTES_DIR);
  assert.equal(getNote(notes, "nope/missing"), null);
  const note = getNote(notes, "shared/writing-a-good-note");
  assert.ok(note.body.includes("Frontmatter"));
});
