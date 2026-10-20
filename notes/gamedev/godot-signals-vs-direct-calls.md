---
title: Godot — signals vs. direct calls (when to use which)
area: gamedev
tags: [godot, architecture, signals, patterns]
summary: Use signals to broadcast "something happened" upward/outward without the emitter knowing who listens; use direct calls to command a node you own downward. Picking wrong creates either tight coupling or spaghetti.
updated: 2026-10-20
---

# Godot — signals vs. direct calls

*Example note — showing the format. Replace or extend with real, durable guidance.*

## The rule of thumb

- **Direct call (down):** a parent/owner telling a child it controls to do
  something — `$HealthBar.set_value(hp)`. The caller already holds the
  reference and the relationship is fixed. Clear and cheap.
- **Signal (up / out):** a node announcing an event to whoever cares, without
  knowing who that is — `emit_signal("died")`. Decouples the emitter from
  listeners; the listener connects.

## Why it matters

Reaching *up* with a direct call (`get_parent().score += 1`) hard-wires a child
to a specific parent layout and breaks the moment the scene tree changes. That
is the case where a signal belongs.

## Smells

- A node calling `get_parent()` / `get_node("../../..")` to change state → use a
  signal instead.
- A signal connected to exactly one owner-controlled child that never changes →
  a direct call is simpler and easier to follow.
