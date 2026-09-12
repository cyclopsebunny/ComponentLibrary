# Yard Flow Bench

An interactive bench for walking the yard & dock operations document set against itself,
before any of it is built.

**Live:** https://claude.ai/code/artifact/960be596-bef0-456f-875a-020ab7830efd

`flow-simulator.html` is a single self-contained page. Open it locally or use the link
above (the published version also persists findings and verdicts across viewers).

## What it is

Not a UI prototype. It is the document set's own rules, implemented once and executable:

- **Nine state dimensions stored** — six on the trailer, three on the visit (glossary §5).
- **Load state and every derived flag computed on read**, never stored (model §3.1, §6.1),
  so a contradiction surfaces as `INTEGRITY_ALARM` instead of two fields disagreeing.
- **Roughly forty actions with the action catalog's real preconditions** (model §5).
- **One central treatment resolver** implementing matrix §1.1–1.5: each blocking condition
  carries its precedence class and whether it hides or disables, and the treatment is then
  decided in one place. This is what matrix §6 open question 1 asks for.
- **Matrix §2.1 transcribed** and compared against what the engine derives from the model's
  preconditions. Where they disagree, the action chip says so on its face.
- **The primary action derived, never configured** (matrix §1.7).
- **The `END_SESSION` reconciliation as a real per-shipment screen**, not a confirmation
  dialog — the thing model §12 says to design early.

## What you can do with it

Fifteen scenarios: the seven flows of `flows.md` walked step by step against their own
script, plus eight exception branches drawn from the stress tests. Each step declares what
the documents say should change, and the bench marks it matched or not. Going off script is
allowed; the flow just stops predicting.

Also: switch role (permission gates are real), flip facility config keys (turning
`readiness_requirements` to empty must make the dimension vanish everywhere, not merely go
unused — that is model §1.2 under test), reveal hidden actions with their reasons, and fire
world events the flows depend on but no user performs — camera reads landing after the fact,
dock sensors disagreeing with the records, the daily yard check.

## Findings

Eleven findings are built in, each one a place where the four documents could not all be
implemented at once, with the sections that disagree named. The one that matters most:

**F10 — no action positions a trailer that has a driver.** Deleting `DRIVER_SELF` was right,
but §5 then has no action that changes such a trailer's position. `CREATE_MOVE_TASK` is
hidden while a tractor is attached and `COMPLETE_MOVE` requires a task, so flows 1, 2, 3 and
5 and stress tests 1-vi, 1-x and 12 each have a step with nothing behind it. The bench
supplies `DRIVER_POSITIONS`, labelled ENGINE, and every flow depends on it.

Findings can be marked Real / Not a problem / Decide later, and notes added from wherever
you are standing — they keep the scenario, the step and the state with them.

## Source documents

Built against `yard-dock-operations-model.md` v0.20, `flows.md` v0.4,
`action-availability-matrix.md` v0.10 and `glossary.md` v0.4. The documents are not in this
repository; the section references in the page point into them.
