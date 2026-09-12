# Yard & Dock Operations — Document Set

Four documents, one subject, deliberately different cuts. Each answers a different question, and **each fact should live in exactly one of them.**

---

## Which document answers what

| Question | Document |
|---|---|
| "Walk me through an inbound live load, step by step" | **flows.md** |
| "What can a user do to *this* trailer right now?" | **action-availability-matrix.md** |
| "What does `PART_LOADED` mean? What do we call this?" | **glossary.md** |
| "Why is it built this way? What did we decide and why?" | **yard-dock-operations-model.md** |

### The four

**`flows.md` — Operational Flows**
Process view. Seven appointment types walked start to finish, with the states, flags, actions, and actor at each step. Built on one shared six-phase spine so the flows cannot drift from each other.
*Read this first if you are new.*

**`action-availability-matrix.md` — Action Availability**
UI view. For any trailer in any state: which actions appear, which appear disabled, which are hidden, and the exact wording shown when blocked.
*Read this before building any screen.*

**`glossary.md` — Canonical Terms**
Reference. Every entity, state, action, flag, config key, and label. Includes terms **not** to use, retired names, and industry synonyms.
*The tiebreaker. When documents disagree, correct this one first.*

**`yard-dock-operations-model.md` — Domain Model**
Structural view and decision record. Entities, the six state dimensions, the action catalog with preconditions, the queues, 35 resolved decisions with their consequences, 9 open items, and ~90 stress tests.
*Read §9 (decisions) and §10 (open items) before changing anything.*

---

## Reading orders

**New to the project:** flows → glossary §2–3 → model §1 (why there is no single trailer status) → model §9.

**Building a screen:** matrix §1 (the availability rules) → matrix §2 for your context → glossary §7 for labels.

**Building the schema:** model §2 (entities) → model §12 (what to get right first) → model §10.4.

**Answering a support ticket:** glossary → flows for the relevant pattern → model §9 for why it behaves that way.

**Deciding something new:** model §10 (open items) → model §9 (what is already decided, and what it cost).

---

## The load-bearing ideas

Five things that, if lost, make the rest incoherent:

1. **There is no single "trailer status."** Six independent dimensions, rendered as badges. An enumerated status would need their cross-product. *(model §1)*
2. **Trailer identity lives on the visit leg, not the appointment.** This is what makes drop-and-hook swaps work without special cases. *(model §4)*
3. **A move task exists only for trailers with no tractor attached.** A driver-attached trailer has a *destination*. This is why the move queue is an honest measure of your own workload. *(model §3.5)*
4. **Capabilities generalize by defaulting, not by feature flags.** A flag is justified only when it changes a precondition. *(model §1.2)*
5. **The event log is the only durable record of what happened.** Every other view reconstructs from it. *(model §2.10)*

---

## Status

| Document | Version | Size |
|---|---|---|
| yard-dock-operations-model.md | v0.21 | ~152 KB |
| flows.md | v0.5 | ~19 KB |
| action-availability-matrix.md | v0.11 | ~28 KB |
| glossary.md | v0.5 | ~18 KB |

**38 decisions resolved. 11 items open** (model §10). The model is decided enough to build.

### The bench

`../../prototypes/facility-rethink/` holds an executable version of this document set — the
six trailer dimensions, the derived flags, and the action catalog's preconditions implemented
once, with the seven flows and the sharper stress tests walked through them step by step.

It exists because prose cannot be run. Every change in the v0.21 / v0.11 / v0.5 round was
found by building it and hitting a wall: an action with no state in which it was available, an
effect naming a value no dimension has, a flow step with no action behind it. The four
documents are still the specification; the bench is the thing that says when they disagree.
Run the flows there after changing anything here.

### Known maintenance risks

- **The model document is too large.** At ~149 KB it is past the size where a sequential edit can silently delete a section — this has already happened once. It should be split into domain model, decision log, and UI spec.
- **Four documents will drift.** Nothing enforces consistency. The glossary is designated the tiebreaker, which only works if it is the document people actually open.
- ~~`CLEAR_VISIT` naming inconsistency~~ — **resolved in v0.20**: renamed `AUTHORIZE_DEPARTURE`. Three naming items remain open in glossary §11.

### Before writing code

1. Answer model §10.4 — multi-facility identity scoping. The only item that cannot be retrofitted cheaply.
2. Build the event log first.
3. Enforce two constraints in the database, not application code: `TrailerLoad.shipment_id` unique, and single-occupancy on numbered yard spots.
4. Design the `END_SESSION` reconciliation screen early. It is the most consequential new UI and the easiest to under-build into a confirmation dialog.
5. Walk the stress tests (model §11) with dock and yard staff at more than one facility.
