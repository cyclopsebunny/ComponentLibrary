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
- **A board instead of a role picker.** A column is not a person, it is a **set** of people:
  everyone who can take exactly the same actions. Where one person owns an action the column is
  that person; where several may take it — the gate or the driver, the dock lead or the
  supervisor, whoever `roles_can_declare_fill_complete` names — they share one column and the
  action is written once, with a pick of who takes it. Each column shows what those people can
  do now, what they are waiting on and **who they are waiting for**, and which of their actions
  somebody else is waiting on. Clicking an action performs it as that person, so a permission
  gate reads as "someone else's job" rather than as a refusal in your own column. A headline
  says whether this stretch is parallel work, a queue, or the same action in several hands.
- **Two primary actions derived, never configured** (matrix §1.7) — the driver's next step and
  the facility's, because after a drop those are different objects' business.
- **Concurrent script tracks.** A scenario's steps carry a track; the driver's and the trailer's
  open at the same time and can be worked in either order, because the operation has no order
  there to enforce.
- **The `END_SESSION` reconciliation as a real per-shipment screen**, not a confirmation
  dialog — the thing model §12 says to design early.

## What you can do with it

Seventeen scenarios: the seven flows of `flows.md` walked step by step against their own script,
eight exception branches drawn from the stress tests, and two built for §10.12 and §10.13. Each
step declares what the documents say should change, and the bench marks it matched or not. Going
off script is allowed; the flow just stops predicting.

Also: flip facility config keys (turning
`readiness_requirements` to empty must make the dimension vanish everywhere, not merely go
unused — that is model §1.2 under test), reveal hidden actions with their reasons, and fire
world events the flows depend on but no user performs — camera reads landing after the fact,
dock sensors disagreeing with the records, the daily yard check.

## Custody and the five histories

The bench implements model §10.12 rather than only describing it, so the proposal can be judged
by running it:

- **`TrailerCustody`** replaces v0.21's stored `tractor` boolean. Each span carries the driver,
  the unit, and a `holder_type`, and is sourced from a visit leg or a move task.
  `TRACTOR_ATTACHED` is now genuinely derived — an open span held by a road tractor — which is
  what §6.1 claimed all along.
- **`holder_type` is tested everywhere**, never merely "is custody open". A road tractor holding
  the trailer suppresses move-task creation; a yard truck holding it *is* the move.
- **`TrailerStay`** is synced from position rather than written per action, so no action can
  forget to open or close one.
- **`DockStay`** is now a recorded span, not just a field on the trailer.
- **`Visit`** spans sit inside the appointment, each with its own registration, dockpass and
  detention clock (§10.13) — the only pair in the set that nests cleanly.
- **Every event is stamped** with its actor and with the id of each span it falls inside, captured
  as they stood when the action *began*, so an action that closes a span still files under it.

The **History panel** renders all five bracketings on one time axis and lets you switch which one
divides the event list. The overlap claims under the timeline are read off the spans, not
asserted — and the "inside no appointment" bucket is where the work that happens after the driver
goes home actually lands.

Two scenarios sit in that group:

- **"One stay, two appointments"** — one trailer brought by one driver, unloaded days later by the
  yard team, taken away by a second driver on a separate appointment. One stay, two appointments,
  one dock stay, three custody spans, no two brackets nesting.
- **"Outbound preload"** — one appointment the driver attends *twice*: brings an empty trailer,
  leaves, comes back for it loaded. Two visits, two dockpasses, four custody spans, one stay. This
  is the pattern §4 claimed to cover and could not run.

## Findings

Twenty findings are built in — places where the four documents could not all be implemented at
once, plus five things they did not know about. Eighteen have been applied back to the documents
in `../../docs/facility-rethink/` — model v0.23, matrix v0.16, flows v0.9, glossary v0.10 — and
the rail marks which. Five things are still open there:

- **The role → action mapping (F19).** Five actions are permission-gated; the other thirty-five
  have no owning role anywhere in the four documents. glossary §4.1 now holds an inferred roster
  and matrix §1.8 says what is needed, but until the action catalog carries owning roles the
  board's columns remain the bench's guess rather than the documents'. The shape of that column
  is settled, at least: **a set, not a value** (F20) — ownership is already plural in three
  Actor cells and in every `roles_can_*` list, which no document had noticed.
- **§10.10 — does appointment-driven binding need the empty check `ASSIGN_SHIPMENT` has?**
  An operational decision, not an editorial one, so it is written up as an open item with a
  recommendation rather than resolved.
- **`presence` on a fence crossing.** It is an Appointment dimension, but `COMPLETE_MOVE`
  changes it for a trailer that may have no appointment. A modelling decision.
- **What §10.13 still leaves open.** Detention becomes per visit, which a carrier billing per
  appointment will dispute; one appointment window cannot describe two visits hours apart. The
  pattern now runs; the commercial arithmetic is undecided.
- **Where a trailer stay starts (F13).** §10.12's first wording said "gate-in to gate-out",
  which cannot describe a company return that never crosses the gate. Opening at the
  perimeter instead makes every yard-occupancy number include trailers outside the fence.
  This is §10.11's `AT_FACILITY` ambiguity with a number attached, and the bench's answer is
  a placeholder. Found by implementing §10.12, so it is a finding against text written in
  this round rather than against the original set.

The finding that mattered most, and the shape of the rest: **no action positioned a trailer
that has a driver.** Deleting `DRIVER_SELF` was right, but §5 then had nothing that moved such
a trailer — `CREATE_MOVE_TASK` is hidden while a tractor is attached and `COMPLETE_MOVE`
requires a task. Four flows had a step with no action behind it. `POSITION_TRAILER` now exists
in model §5.2, and the bench and the catalog use the same name.

Findings can be marked Real / Not a problem / Decide later, and notes added from wherever
you are standing — they keep the scenario, the step and the state with them.

## Source documents

Built against `yard-dock-operations-model.md` v0.23, `flows.md` v0.9,
`action-availability-matrix.md` v0.16 and `glossary.md` v0.10, which live beside this bench in
`../../docs/facility-rethink/`. Every section reference in the page points into them, and the
two should be changed together — that is the whole arrangement.
