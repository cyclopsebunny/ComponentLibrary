# Operational Flows — States, Flags, and Actions by Step

**Companion to:** `yard-dock-operations-model.md` v0.23, `action-availability-matrix.md` v0.15, `glossary.md` v0.9
**Status:** Draft v0.9 — one cell, two people
**Purpose:** Walk each appointment type from start to finish, showing at every step which states change, which flags can appear, which actions are available, and who acts.

### Changes from v0.8
- **§12 item 3:** three Actor cells name two people — `Guard / driver`, `Dock lead / supervisor`, `Wash / maintenance`. Read as single strings they are three roles nobody has defined; read as sets they are three actions with two owners each, which is what they are (glossary §4.1, matrix §1.8).

### Changes from v0.7
- **§12 item 3 upgraded from caveat to named gap.** The Actor column turns out to be the only place the documents say who performs an action, so a roster now lives in glossary §4.1 and matrix §1.8 says what is still missing.

### Changes from v0.6
- **The spine is not a linear composition** (§1.1). After the handoff the driver's phases and the trailer's are concurrent; flow 4a is written in two tracks, and §12's concurrency caveat is narrowed to the across-trailers case it actually described.

### Changes from v0.5
- **Flow 4 renamed "Outbound pickup".** It takes a trailer that a *different* appointment loaded. Calling it a preload pickup conflated it with flow 4a.
- **Flow 4a added — outbound preload.** One appointment, **two visits**: the driver brings an empty trailer, leaves, and returns for it loaded. The spine runs P1 and P5 twice, which no other flow does.
- **§10's phase table gains a column**, because "which phases" was no longer enough — flow 4a repeats two of them.

### Changes from v0.4
- **`POSITION_TRAILER` named at P3** in flows 1, 2, 3 and 5. Those steps previously named no action at all, or only the action that is *hidden* there — nothing in the catalog moved a driver-attached trailer.
- **P1a sets `tractor → ATTACHED`.** A trailer driven in is hooked from arrival until `DROP_TRAILER`; no step said so, and an implementation that misses it hands every live load to the yard team.
- **Flow 6 P1 names `ADMIT`** rather than "RF access", which was a description and not an action.
- **The spine's P5 ends at presence `DEPARTED`,** not `CHECKED_OUT` — the latter is not a value of any dimension (glossary §5.4).

---

## 1. How to read this, and one structural warning

The model is organized by **structure** — entities, dimensions, actions. This document is organized by **process**. Same facts, different cut.

### 1.1 The flows are not separate pipelines

Every flow below is a **composition of the same six phases**, not a distinct process. That is deliberate and load-bearing: it is why ten visit patterns need three fields (`visit_type`, `party_type`, `expected_visits`) rather than ten implementations.

*`expected_visits` is new in v0.6. Flow 4a repeats P1 and P5, and a flow that revisits a phase is the first thing the "subset of the spine" framing did not anticipate — the spine is still right, but a flow is a subset **with repeats**, not a straight prefix.*

So this document defines the **spine once** (§2) and then, per flow, shows only:

- which phases apply,
- what differs at each,
- who acts.

**But the composition is not linear.** After `DROP_TRAILER` — the handoff (model §3.5) — the driver's remaining phases and the trailer's run **concurrently and independently**: he is authorized and checks out while the facility assigns a dock, loads and seals. They rejoin at `HOOK_TRAILER` and only there. So a flow is a subset of the spine *with repeats and with parallel branches*, and nothing should report an order between tracks that the operation does not have. Flow 4a is written in two tracks for that reason; model §10.14 has the argument.

**Do not turn these into nine standalone specifications.** Nine copies of the spine will disagree with each other within a month, and then with the model. If a flow seems to need a step the spine does not have, that is a finding about the spine.

### 1.2 Column meaning

| Column | Contents |
|---|---|
| **Step** | What happens |
| **Changes** | Which dimensions move (§5 of the glossary) |
| **Flags** | What can appear here — not what always does |
| **Actions** | Available at this step. `D` = shown disabled with a reason |
| **Actor** | Who does it |

---

## 2. The spine — six phases

Every flow is a subset of these, in this order.

| Phase | Question | Ends when |
|---|---|---|
| **P0 · Plan** | What is expected? | Appointment exists, shipments planned |
| **P1 · Announce & access** | Who is here, and may they enter? | Presence `ON_SITE`, or held outside |
| **P2 · Destination** | Where is this trailer going? | `DOCK_ASSIGNED` or `YARD_ASSIGNED` |
| **P3 · Position** | Get it there | `AT_DESTINATION`; `SPOTTED` once a dock sensor confirms it |
| **P4 · Dock work** | Load or unload | Sessions ended, fill declared, sealed |
| **P5 · Depart** | Authorize and record leaving | presence `DEPARTED` |
| **P6 · After** | Reconcile what actually happened | Exit read matched, or recovery resolved |

**The phase that decides everything downstream is P3.** If a tractor is attached, the driver positions the trailer and there is no move task. If not, positioning is yard-team work and generates one. Every flow difference below traces back to this.

---

## 3. Flow 1 — Inbound live load

Trailer arrives loaded, unloads at a dock with the driver waiting, departs empty. *(§4 pattern 1)*

| Step | Changes | Flags | Actions | Actor |
|---|---|---|---|---|
| **P0** Appointment booked; inbound shipments expected on the BRING leg. Trailer number unknown | Shipment `EXPECTED` | — | — | Planner |
| **P1a** Driver scans QR at the facility, gives appointment ID + trailer number | registration → `SELF_REGISTERED`; presence → `AT_FACILITY`; trailer record created if new; **tractor → `ATTACHED`** (it was driven here, and stays hooked until `DROP_TRAILER`); **TrailerLoad rows created from the leg's shipments** — `ON_BOARD` here, `ASSIGNED` on a TAKE leg (§9 #37); dockpass issued | `FIRST_VISIT`, `ID_SINGLE_SOURCE`, `TRACTOR_ATTACHED` | `SELF_REGISTER` | Driver |
| **P1b** Dockpass redeemed at kiosk | presence → `ON_SITE`; inbound shipments → `ARRIVED` | `ID_DISPUTED` | `ADMIT`, `TURN_AWAY` | Gate / kiosk |
| **P2** Dock assigned | destination → `DOCK_ASSIGNED`; DockAssignment `HELD` | `AWAITING_DOCK`, `DETENTION_RISK` | `ASSIGN_DOCK`, `RELEASE_DOCK` | Dispatcher |
| **P3** Driver drives to the dock. **No move task** | position → `DOCK`; DockStay opens; `DockAssignment → FULFILLED` | `AT_DESTINATION`, `SPOTTED` (sensor), `TRACTOR_ATTACHED` | `POSITION_TRAILER`. `CREATE_MOVE_TASK` is **hidden** — a driver is attached | Driver |
| **P4a** Unload session opened — **pre-populated with every `ON_BOARD` shipment** (§9 #37). The user removes any staying aboard, rather than adding what to unload | Session `OPEN` | `AWAITING_ASSIGNMENT` if left idle | `OPEN_SESSION`, `REMOVE_SHIPMENT_FROM_SESSION` *(exception)* | Dock lead |
| **P4b** Unloading | Session `ACTIVE`; rows → `UNLOADING`; load state `IN_WORK` | `DETENTION_RISK` | `END_SESSION`, `CANCEL_SESSION` (`D`, supervisor) | Dock crew |
| **P4c** Session ended, **outcome per shipment** | Rows closed; shipments → `RECEIVED`; load state `EMPTY`; `empty_verification → VERIFIED_EMPTY` | `PARTIAL_RECEIPT` if LTL freight stays aboard; `UNEXPECTED_RESIDUAL` | `END_SESSION` | Dock lead |
| **P5a** Departure authorized | presence → `AUTHORIZED_TO_DEPART` | `READY_TO_DEPART` | `AUTHORIZE_DEPARTURE`, `DECLARE_TAKE_LEG_CHANGE` | Clerk |
| **P5b** Driver pulls off the dock and leaves | position → `OFF_SITE`; presence → `DEPARTED` | — | `CHECK_OUT` | Gate |
| **P6** Exit read lands minutes later | Departure time backfilled from image capture | `UNDECLARED_TRAILER_EXIT` → recovery | `RESOLVE_IDENTIFICATION`, `CORRECT_DEPARTURE` | System / supervisor |

**Note on P4c:** this is the LTL case. If only some shipments are consigned here, the rest stay `ON_BOARD` and must appear on the TAKE leg's `expected_residual_shipment_ids`, or `AUTHORIZE_DEPARTURE` blocks at P5a.

---

## 4. Flow 2 — Outbound live load

Trailer arrives empty, loads with the driver waiting, departs loaded. *(§4 pattern 2)*

Identical to Flow 1 through P2. Differences:

| Step | Changes | Flags | Actions | Actor |
|---|---|---|---|---|
| **P1a** Driver claims the trailer is empty | `empty_verification → CLAIMED_EMPTY` | `UNVERIFIED_ASSIGNMENT` once assigned | `SELF_REGISTER`, `VERIFY_EMPTY` | Driver / guard |
| **P3** Driver drives to the dock. **No move task** | position → `DOCK`; DockStay opens | `AWAITING_ASSIGNMENT` — **an occupied dock doing nothing** | `POSITION_TRAILER`, `ASSIGN_SHIPMENT` | Driver |
| **P4a** *Usually nothing to do.* Rows were created `ASSIGNED` at the gate from the TAKE leg (§9 #37). `ASSIGN_SHIPMENT` is only needed for an unplanned load | Load state `ASSIGNED_ONLY` | `ACCEPTING_FREIGHT` | `ASSIGN_SHIPMENT` *(exception)* | Planner |
| **P4b** One session, **pre-populated with every `ASSIGNED` row** | Session `ACTIVE`; rows → `LOADING` | — | `OPEN_SESSION`, `START_SESSION`; `ADD_SHIPMENT_TO_SESSION` *(exception, permitted while `ACTIVE`)* | Dock crew |
| **P4c** Session ended with **an outcome each** | Per shipment: `ON_BOARD` / back to `ASSIGNED` / `PART_LOADED` | `PART_LOAD_HELD` | `END_SESSION` | Dock lead |
| **P4d** Fill declared, then sealed | `fill_declaration → COMPLETE`; shipments → `STAGED` | Blocked if `PART_LOAD_HELD` | `DECLARE_FILL_COMPLETE`, `REOPEN_FILL`, `SEAL_TRAILER` | Dock lead (role-gated) |
| **P5a** Authorized | presence → `AUTHORIZED_TO_DEPART` | `READY_TO_DEPART` | `AUTHORIZE_DEPARTURE` | Clerk |

**The order P4c → P4d → P5a is not optional.** Fill complete gates sealing; sealing gates departure authorization; a `PART_LOADED` row blocks all three.

---

## 5. Flow 3 — Inbound drop

Trailer arrives loaded, is dropped, driver leaves. Unloading happens later, on your schedule. *(§4 pattern 3)*

| Step | Changes | Flags | Actions | Actor |
|---|---|---|---|---|
| **P1** As Flow 1 | presence → `ON_SITE`; rows `ON_BOARD` | — | `SELF_REGISTER`, `ADMIT` | Driver / gate |
| **P2** Destination set — a dock if one is free, otherwise the yard | destination → `DOCK_ASSIGNED` or `YARD_ASSIGNED` | `AWAITING_DOCK` | `ASSIGN_DOCK`, `ASSIGN_YARD` | Dispatcher |
| **P3a** Driver drives to the drop point. **Still no move task** | position → yard spot / lot / dock | `TRACTOR_ATTACHED` | `POSITION_TRAILER` | Driver |
| **P3b** **Tractor detaches — the handoff** | Trailer becomes yard-team responsibility; if no dock, destination → `AWAITING_ASSIGNMENT` | `DROPPED_NO_DESTINATION` | `DROP_TRAILER` | Driver |
| **P5** Driver departs bobtail, typically before any unloading | presence → `DEPARTED`; exit read `NO_TRAILER` | `PICKUP_NOT_TAKEN` does **not** apply — nothing was expected | `AUTHORIZE_DEPARTURE`, `CHECK_OUT` | Gate |
| **— gap of hours, appointment closed —** | | `DROPPED_NO_DESTINATION` **ages invisibly** | | |
| **P2′** A dock frees up; assigned to the **trailer**, not a visit | destination → `DOCK_ASSIGNED` | `AWAITING_DOCK` | `ASSIGN_DOCK` | Dispatcher |
| **P3′** **Now** a move task exists | MoveTask `PENDING` → `COMPLETED`; position → `DOCK` | `NEEDS_MOVE`, `PLACEMENT_VARIANCE` | `CREATE_MOVE_TASK` (auto or manual), `ASSIGN_MOVE_TASK`, `START_MOVE`, `COMPLETE_MOVE` | Yard team |
| **P4** Unload as Flow 1 | Rows closed; load state `EMPTY` | — | Session actions | Dock crew |

**This flow is why destination is a trailer dimension, not a visit one.** Between P5 and P2′ the appointment is closed and the driver is gone, but the trailer still shows "Awaiting Dock" and still needs a dock. Nothing about that is the visit's business.

**The quiet risk is the gap.** No driver is waiting, no detention is running, nobody is complaining — so a dropped trailer with no dock is the item most likely to be ignored while louder things get attention. That is the entire reason `DROPPED_NO_DESTINATION` exists.

---

## 6. Flow 4 — Outbound pickup

Driver arrives bobtail, hooks a trailer that **another appointment loaded**, leaves. One visit. *(§4 pattern 4)*

**Not the same as flow 4a below.** This driver takes someone else's staged trailer; a preload driver brings his own and comes back for it. Both were called "preload pickup" until v0.6, and the name hid a real difference in the booking, the credential count, and the detention arithmetic.

| Step | Changes | Flags | Actions | Actor |
|---|---|---|---|---|
| **P0** Trailer already loaded, fill complete, sealed, waiting in the yard | Shipments `STAGED`; destination `NONE` | `PRELOAD_STAGED`, `STAGED_AGING` | — | — |
| **P1** Driver registers and is admitted. **No BRING leg** | presence → `ON_SITE` | — | `SELF_REGISTER`, `ADMIT` | Driver / gate |
| **P2** *Not applicable* — the trailer already has a position | — | — | — | — |
| **P3** Driver hooks the staged trailer | Any pending MoveTask **cancelled** | `TRACTOR_ATTACHED` | `HOOK_TRAILER` | Driver |
| **P5a** Authorized: shipments match the TAKE leg, fill complete, sealed | presence → `AUTHORIZED_TO_DEPART` | `READY_TO_DEPART` | `AUTHORIZE_DEPARTURE` | Clerk |
| **P5b** Departs loaded | Shipments → `DEPARTED` | — | `CHECK_OUT` | Gate |
| **P6** Exit read | Departure time backfilled | `UNDECLARED_TRAILER_EXIT` | `CORRECT_DEPARTURE` | System |

**P3 is where the wrong trailer gets taken.** Self-service pickup from a yard of similar trailers, no guard watching the hook. If the driver takes a different one and says so, that is `DECLARE_TAKE_LEG_CHANGE` at P5a — normal, logged, with a hard warning if the substitute carries freight. If they say nothing, P6 catches it after departure.

---

## 6a. Flow 4a — Outbound preload

Driver brings an **empty** trailer, drops it, and **leaves the facility**. The trailer is loaded on your schedule. The **same driver returns on the same appointment** and takes it away. *(§4 pattern 4a)*

**One appointment, two visits.** This is the only flow that runs P1 and P5 twice, and the only one where the appointment outlives the driver's first departure.

### Visit 1 — bringing it

| Step | Changes | Flags | Actions | Actor |
|---|---|---|---|---|
| **P0** Appointment booked with `expected_visits = 2`; outbound shipments planned on the TAKE leg. Both legs name the same trailer | Shipment `PLANNED` | — | — | Planner |
| **P1** Registers and is admitted, **first dockpass** | registration → `SELF_REGISTERED`; presence → `ON_SITE`; tractor → `ATTACHED`; TAKE-leg rows created `ASSIGNED` | `TRACTOR_ATTACHED` | `SELF_REGISTER`, `ADMIT` | Driver / gate |
| **P2** Destination set — a spot to leave it in | destination → `YARD_ASSIGNED` | — | `ASSIGN_YARD` | Dispatcher |
| **P3a** Drives to the spot | position → yard spot | `TRACTOR_ATTACHED` | `POSITION_TRAILER` | Driver |
| **P3b** **Tractor detaches** | Yard-team responsibility; destination → `AWAITING_ASSIGNMENT` | `DROPPED_NO_DESTINATION` | `DROP_TRAILER` | Driver |
| **P5a** Authorized to leave **bobtail** — *the TAKE leg is not checked, because he is not taking anything* | presence → `AUTHORIZED_TO_DEPART` | — | `AUTHORIZE_DEPARTURE` | Clerk |
| **P5b** Departs. **Visit 1 ends; the appointment does not.** A second visit slot opens | Visit 1 span closed; registration and dockpass reset for visit 2 | `PICKUP_NOT_TAKEN` must **not** fire — the return is planned | `CHECK_OUT` | Gate |

### — the facility loads it, with no driver attached —

| Step | Changes | Flags | Actions | Actor |
|---|---|---|---|---|
| **P2′** A dock frees up | destination → `DOCK_ASSIGNED` | `AWAITING_DOCK` | `ASSIGN_DOCK` | Dispatcher |
| **P3′** Now a move task exists | MoveTask `PENDING` → `COMPLETED`; position → `DOCK` | `NEEDS_MOVE` | Move actions | Yard team |
| **P4** Loaded, fill declared, sealed | Rows → `ON_BOARD`; `fill_declaration → COMPLETE`; shipments → `STAGED` | `PRELOAD_STAGED` | Session actions, `DECLARE_FILL_COMPLETE`, `SEAL_TRAILER` | Dock crew |
| **P3″** Pulled off the dock to a yard spot | position → yard spot | `READY_TO_PULL`, then `PRELOAD_STAGED` | `PULL_FROM_DOCK`, move actions | Yard team |

### Visit 2 — collecting it

| Step | Changes | Flags | Actions | Actor |
|---|---|---|---|---|
| **P1′** Same driver returns, registers again, **second dockpass** | Visit 2: registration → `SELF_REGISTERED`; presence → `ON_SITE` | — | `SELF_REGISTER`, `ADMIT` | Driver / gate |
| **P3‴** Hooks the trailer he brought | tractor → `ATTACHED`; any pending move cancelled | `TRACTOR_ATTACHED` | `HOOK_TRAILER` | Driver |
| **P5a′** Authorized — **now** the TAKE leg is checked, because now he is taking it | presence → `AUTHORIZED_TO_DEPART` | `READY_TO_DEPART` | `AUTHORIZE_DEPARTURE` | Clerk |
| **P5b′** Departs loaded. Appointment closes with the visit | Shipments → `DEPARTED`; trailer stay closes | — | `CHECK_OUT` | Gate |
| **P6** Exit read | Departure time backfilled | `UNDECLARED_TRAILER_EXIT` | `CORRECT_DEPARTURE` | System |

**Why this is not flow 2.** The legs are identical to an outbound live load — BRING empty, TAKE loaded, same trailer. The difference is entirely in the gate crossings, and that is what §10.13 of the model is about. Read the two flows side by side: every row of P4 here happens with nobody waiting, which is the whole commercial point of a preload.

**Why this is not flow 4.** Flow 4's driver takes a trailer that a *different* appointment loaded, in one visit. Here the driver supplies the trailer and comes back for his own freight. Different booking, different credential count, different detention arithmetic.

**The three things to watch.** Visit 1's departure authorization must not test the TAKE leg (§5.1). The second visit needs its own dockpass, because the first was consumed. And `PICKUP_NOT_TAKEN` must stay quiet at P5b — a planned return is not a failed pickup.

---

## 7. Flow 5 — Drop and hook (swap)

Driver brings one trailer and takes a **different** one, in one visit. *(§4 patterns 5 and 6)*

This is Flow 3's P1–P3b and Flow 4's P3–P5b, in one appointment with two legs naming two trailers.

| Step | Changes | Actions |
|---|---|---|
| **P1** Both legs bound: BRING = T1, TAKE = T2 | T1 rows `ON_BOARD`; T2 already `STAGED` | `BIND_TRAILER_TO_LEG` ×2 |
| **P3b** T1 dropped | T1 → `AWAITING_ASSIGNMENT`, yard-team responsibility | `DROP_TRAILER` |
| **P3** T2 hooked | T2 pending move cancelled | `HOOK_TRAILER` |
| **P5** Authorized and checked out on T2 | T1 stays; T2 departs | `AUTHORIZE_DEPARTURE`, `CHECK_OUT` |

**The only reason this works without special-casing is that trailer identity lives on the leg.** Nothing here is a distinct flow; it is two legs of the spine running in one visit.

---

## 8. Flow 6 — Company driver takes a staged load

Employee takes a company trailer out on a route. *(§4 pattern 8 — optional)*

| Step | Changes | Flags | Actions | Actor |
|---|---|---|---|---|
| **P0** Trailer cleaned, inspected, in the pool, then loaded and staged | readiness `READY` → assigned → `STAGED` | `AVAILABLE_FOR_ASSIGNMENT` then `PRELOAD_STAGED` | `ASSIGN_SHIPMENT`, session actions | Planner / dock |
| **P1** Employee arrives, `party_type = COMPANY_DRIVER`, `access_method = RF_BADGE`. **No dockpass** | presence → `ON_SITE` | — | `ADMIT`, on the badge as credential (§5.1) | Driver |
| **P3** Hooks the trailer from the yard or a dock | Pending move cancelled | `TRACTOR_ATTACHED` | `HOOK_TRAILER` | Driver |
| **P5** Departs on RF badge. **Relaxed ceremony** | Shipments → `DEPARTED` | — | `AUTHORIZE_DEPARTURE` (reduced checks), `CHECK_OUT` | Driver |
| **P6** Exit read still fires | Departure recorded | `UNDECLARED_TRAILER_EXIT` | `CORRECT_DEPARTURE` | System |

**What relaxes and what does not:** dockpass, guard interaction, seal ceremony, and full departure-authorization checks all relax. Which trailer left, which shipments were aboard, and the departure timestamp do not. The wrong-trailer risk here is **higher** than third-party — near-identical fleet, night shift, no guard — and P6 is the control that covers it at no extra cost.

---

## 9. Flow 7 — Company trailer returns (no appointment)

The return leg of the fleet loop. *(§4 pattern 9 — optional)*

**There is no appointment, no registration, and no visit.** This flow starts at P6 and runs backwards into P0 of the next cycle.

| Step | Changes | Flags | Actions | Actor |
|---|---|---|---|---|
| **Return** Driver parks in the outside lot and goes home | Position = lot (`inside_fence = false`); readiness → `NOT_READY` | `OUTSIDE_PERIMETER`, `NOT_READY` | — | Driver |
| **Discovery** Found by yard check, or reported from the driver's phone | `UnappointedReturn` created, `AWAITING_INTAKE` | `FREIGHT_OUTSIDE_PERIMETER` if loaded — **a policy violation** | `INTAKE_TRAILER` | Yard team |
| **Intake** Brought into the system | `intake_state → TAKEN_IN` | — | `INTAKE_TRAILER` | Yard team |
| **Prep** Cleaned and inspected | readiness `IN_PREP` → `READY`, **or** → `OUT_OF_SERVICE` on damage | — | `MARK_OUT_OF_SERVICE` | Wash / maintenance |
| **P0′** Enters the pool | `AVAILABLE_FOR_ASSIGNMENT` | — | `ASSIGN_SHIPMENT` now permitted | Planner |

**The trailer is not assignable at any point before Prep completes.** It is technically an empty outbound-capable trailer; it is operationally unavailable because it is dirty. Recording it as a preload on arrival would assert two false things.

**Discovery is the weak link** — up to a day of latency on your own asset, because nothing announced it. A driver-reported drop closes that to minutes using the same intake path.

---

## 10. Which phases each flow uses

| Flow | Visits | P0 | P1 | P2 | P3 | P4 | P5 | P6 |
|---|---|---|---|---|---|---|---|---|
| 1 · Inbound live | 1 | ✔ | ✔ | ✔ | driver | unload | ✔ | ✔ |
| 2 · Outbound live | 1 | ✔ | ✔ | ✔ | driver | load | ✔ | ✔ |
| 3 · Inbound drop | 1 | ✔ | ✔ | **twice** | driver, then **yard team** | unload | ✔ early | ✔ |
| 4 · Outbound pickup | 1 | ✔ | ✔ | — | driver hooks | — | ✔ | ✔ |
| 4a · Outbound preload | **2** | ✔ | **twice** | **twice** | driver, **yard team**, driver | load | **twice** | ✔ |
| 5 · Drop & hook | 1 | ✔ | ✔ | ✔ for T1 | both | later, on T1 | ✔ on T2 | ✔ |
| 6 · Company pickup | 1 | ✔ | RF | — | driver hooks | — | relaxed | ✔ |
| 7 · Company return | — | next cycle | **none** | later | — | — | — | starts here |

Two things this table makes obvious that prose does not:

- **Flow 3 runs P2 twice** — once for the driver's drop point, again when a dock frees up. It is the only flow where the same phase recurs after the visit closes.
- **Flow 7 has no P1 at all**, which is why every arrival path in the model had to be revisited to accommodate it.
- **Flow 4a repeats P1 and P5**, which nothing else does. A flow is a subset of the spine *with repeats*, not a prefix of it — and the Visits column is now the first thing to read, because it is what separates 4a from flow 2 and from flow 4.

---

## 11. Exception branches

These interrupt the spine rather than belonging to one flow.

| Branch | Where | What happens |
|---|---|---|
| **No dock available** | P2 | `HOLD_OUTSIDE` if the facility has no inside lot; otherwise admit and park. Presence stays `AT_FACILITY` or goes `ON_SITE` with `AWAITING_DOCK` |
| **Idle dock** | P3→P4 | Trailer spotted, nothing assigned: `AWAITING_ASSIGNMENT`. An occupied dock doing nothing — the most expensive invisible condition in a yard |
| **Part load** | P4c | `PARTIAL` outcome → `PART_LOADED` row → `PART_LOAD_HELD`. Blocks fill complete, sealing, and departure. Supervisor only |
| **Substitution** | P5a | `DECLARE_TAKE_LEG_CHANGE`. Normal and logged; hard warning and supervisor confirmation if the substitute carries freight |
| **Pickup not taken** | P5a | Driver leaves bobtail where a trailer was expected. Trailer and preload stay, still aging |
| **Undeclared exit** | P6 | `UNDECLARED_TRAILER_EXIT` → recovery queue, **ordered newest-first** because recoverability decays. `CORRECT_DEPARTURE` restores the stranded trailer |
| **Identity dispute** | P1 or P6 | `ID_DISPUTED`. Resolved by a human against the stored image; the resolution records **which source was right** |
| **Unauthorized entry** | P1 | `ENTERED_WITHOUT_CHECKIN` — gate read with no registration. Security, **not** data cleanup |
| **Spot conflict** | P3 | Two trailers reported in one numbered spot. Report **accepted and flagged**, never refused |
| **Misidentified trailer** | any | `CORRECT_TRAILER_IDENTITY`, blocked during active work; `MERGE_TRAILERS` retires the duplicate |

---

## 12. What this document does not cover

1. **Screen layouts.** Which surface each step appears on — gate kiosk, dock board, yard map, queues. This says what is available at each step, not where.
2. **Timing and SLAs.** No target durations per phase. Worth adding once real data exists.
3. **Who exactly acts.** "Dispatcher," "dock lead," and "clerk" are placeholders; actual roles are facility-configured. **This is now a named gap rather than a caveat:** glossary §4.1 holds a roster of roles, inferred from this column, and matrix §1.8 explains what it is for — nothing else in the four documents assigns the other thirty-five actions to anybody, so no screen can say who is waiting on whom. And the column is not even one role per row: `Guard / driver`, `Dock lead / supervisor` and `Wash / maintenance` each name **two people**, so what this column holds is a set of owners written as prose.
4. **Concurrency across trailers.** In reality P2 for one trailer overlaps P4 for twenty others, and the queues (§8 of the glossary) are how that is actually managed. *Concurrency **within** one appointment — the driver's track and the trailer's after a drop — is no longer uncovered: see §1.1, flow 4a, and model §10.14.*
5. **Flows 8+.** Reefer pre-cool, cross-dock, and other facility-specific patterns compose from the same spine but are not written out.
