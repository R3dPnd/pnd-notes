// Note loading + indexing for the pnd-notes knowledge base.
//
// A note is one Markdown file under notes/<area>/<slug>.md with YAML-ish
// frontmatter. The frontmatter grammar is intentionally small — we own the
// format — so we parse it here without a dependency:
//   key: value            → string
//   key: [a, b, c]         → inline list
//   key: 2026-10-20        → kept as a string
// Lines before the first `---` and anything else are ignored.

import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

/** Parse a tiny subset of YAML frontmatter. Returns { data, body }. */
export function parseFrontmatter(raw) {
  const text = raw.replace(/^﻿/, "");
  if (!text.startsWith("---")) return { data: {}, body: text };
  const end = text.indexOf("\n---", 3);
  if (end === -1) return { data: {}, body: text };
  const block = text.slice(3, end).trim();
  const body = text.slice(end + 4).replace(/^\r?\n/, "");
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let value = m[2].trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }
    data[key] = value;
  }
  return { data, body };
}

/** Recursively collect every *.md file under dir. */
async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md") {
      out.push(full);
    }
  }
  return out;
}

/**
 * Build the note index from notesDir. Each note gets a stable id of
 * "<area>/<slug>" derived from its path relative to notesDir.
 */
export async function loadNotes(notesDir) {
  const files = await walk(notesDir);
  const notes = [];
  for (const file of files) {
    const rel = relative(notesDir, file).split(sep).join("/");
    const id = rel.replace(/\.md$/, "");
    const area = id.includes("/") ? id.slice(0, id.indexOf("/")) : "(root)";
    const raw = await readFile(file, "utf8");
    const { data, body } = parseFrontmatter(raw);
    const tags = Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [];
    const info = await stat(file);
    notes.push({
      id,
      area,
      file,
      title: data.title || id,
      summary: data.summary || "",
      tags,
      updated: data.updated || info.mtime.toISOString().slice(0, 10),
      body,
    });
  }
  notes.sort((a, b) => a.id.localeCompare(b.id));
  return notes;
}

/** Areas with note counts, sorted by area name. */
export function listAreas(notes) {
  const counts = new Map();
  for (const n of notes) counts.set(n.area, (counts.get(n.area) || 0) + 1);
  return [...counts.entries()]
    .map(([area, count]) => ({ area, count }))
    .sort((a, b) => a.area.localeCompare(b.area));
}

/**
 * Score notes against a query and optional filters. Returns lightweight match
 * records (no body) so an agent can scan cheaply before fetching one note.
 */
export function searchNotes(notes, { query = "", area, tags } = {}) {
  const q = query.toLowerCase().trim();
  const terms = q ? q.split(/\s+/) : [];
  const wantTags = (Array.isArray(tags) ? tags : tags ? [tags] : []).map((t) => t.toLowerCase());
  const results = [];
  for (const n of notes) {
    if (area && n.area !== area) continue;
    const noteTags = n.tags.map((t) => t.toLowerCase());
    if (wantTags.length && !wantTags.every((t) => noteTags.includes(t))) continue;

    const title = n.title.toLowerCase();
    const summary = n.summary.toLowerCase();
    const body = n.body.toLowerCase();
    let score = 0;
    if (!terms.length) {
      score = 1; // no query → list everything that passed the filters
    } else {
      for (const term of terms) {
        if (title.includes(term)) score += 5;
        if (summary.includes(term)) score += 3;
        if (noteTags.some((t) => t.includes(term))) score += 3;
        if (body.includes(term)) score += 1;
      }
    }
    if (score > 0) {
      results.push({ id: n.id, title: n.title, area: n.area, tags: n.tags, summary: n.summary, updated: n.updated, score });
    }
  }
  results.sort((a, b) => b.score - a.score || a.id.localeCompare(b.id));
  return results;
}

/** Full note by id, or null. */
export function getNote(notes, id) {
  const n = notes.find((x) => x.id === id);
  if (!n) return null;
  return { id: n.id, title: n.title, area: n.area, tags: n.tags, summary: n.summary, updated: n.updated, body: n.body };
}
