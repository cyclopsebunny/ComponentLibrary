# Action Availability Matrix

**Companion to:** `yard-dock-operations-model.md` v0.23
**Status:** Draft v0.14 — a reason must name a step the reader can take
**Purpose:** For any trailer in any state, define which actions appear, which appear disabled, which are hidden, and what the user is told — so a screen can be built without re-deriving preconditions from the action catalog.

### Changes from v0.13
Reported from running the outbound preload as a gate clerk, which dead-ends three actions deep with no cause on screen.
- **§1.1 extended:** a reason must name a clearing action *this reader* can perform. Where the clearing action is role-gated away from them, the reason names the role that must do it — and §3.4's ban on naming roles is narrowed to the first-order permission block it was written for.
- **§1.7 caveat:** a derived primary must not silently route around a step the reader cannot perform, which is what produced the dead end.
- **§3.3 copy:** "Declare fill complete first" → "The load has not been declared complete". The old string read as though the loading were unconfirmed, when the per-shipment outcomes had already confirmed it.

### Changes from v0.12
- **Two primary slots** (§1.6) — the driver's next step and the facility's. Model §10.14: after the handoff they are concurrent, and one slot cannot show both.
- **`SEAL_TRAILER` row added for a trailer at a dock** (§1.7). The table had only the in-yard case, so the derived suggestion after fill-complete was to pull an unsealed load off the dock.
- **"Expected freight is not aboard yet" added** (§3.3). §5.1's "matches the manifest" is symmetric and only the unexpected-freight half was ever written down.

### Changes from v0.11
- **`AUTHORIZE_DEPARTURE`'s blocked reasons apply only to the trailer the driver actually has** (§2.6). Scoping them to every leg of the appointment made visit 1 of an outbound preload permanently un-authorizable (model §4 pattern 4a, §10.13).
- **A driver leaving bobtail is a normal departure**, not a blocked one — the TAKE leg he has not hooked belongs to a later visit.

### Changes from v0.10
All five found by implementing this document as an executable rule engine and walking the flows through it. Each is a place where the engine could not satisfy this document and the model at the same time.

- **`ADMIT` is now A at `AT_FACILITY`** (§2.1). v0.10 marked it H there, but model §5.1's precondition is "`AT_FACILITY` or `AT_GATE`" and flows §3 P1b admits straight from `AT_FACILITY`. Since `RECORD_ARRIVAL` requires "no prior QR scan", a self-registered driver could never reach `AT_GATE` — so under v0.10 every self-registering driver was unadmittable.
- **`SELF_REGISTER` is now A at `OFF_SITE`** (§2.1). v0.10 marked it H in all four columns, leaving no state in which the first step of five flows was available — the same circularity this document records fixing in v0.3 for `CHECK_IN`. The QR scan is the action; `AT_FACILITY` is its effect, not its precondition. `RECORD_ARRIVAL` was already treated this way in the same table.
- **Hide beats disable** when conditions of both kinds fail (§1.1). Previously unstated, and §1.3 alone could not decide it.
- **`AUTHORIZE_DEPARTURE` no longer requires the gate** (§2.3). Authorization is a records check; a live load is authorized at its dock. Only `CHECK_OUT` needs the trailer in the lane.
- **`POSITION_TRAILER` added** (§4), matching the new action in model §5.2. Without it no action moved a driver-attached trailer and four flows had a step with nothing behind it.
- **"Check the visit in first" → "Admit the visit first"** (§3.2). The old string used the term glossary §2 bans, and contradicted §2.1's wording for the same condition.

### Changes from v0.6
- **`OFF_SITE` self-registered column renamed `AT_FACILITY`** (§2.1). Registration requires scanning a QR sign on the property, so a registered driver is never off site.
- **`SELF_REGISTER` is H when `OFF_SITE`** — not merely unavailable but impossible; there is no remote path.

### Changes from v0.4
- **Gate contexts rebuilt** for two-stage check-in (§2.1). `CHECK_IN` is gone, replaced by `SELF_REGISTER`, `RECORD_ARRIVAL`, `ADMIT`, and `REGISTER_AND_ADMIT`.
- **Dock assignment actions added** — `ASSIGN_DOCK`, `RELEASE_DOCK`, `ASSIGN_YARD` — available **before** the trailer is on site (§2.1).
- **Contexts are now keyed on presence × destination**, since a single visit-state column cannot express "Dock Assigned — Pending Gate Check-In".

### Changes from v0.3
- **Bug fix.** v0.3 listed `CHECK_IN` under the `AT_GATE_IN` context — but `CHECK_IN` is what *causes* `AT_GATE_IN`, so the action was only available once its own effect had happened. Circular.
- **Gate contexts are now keyed on visit state, not trailer position** (§2.1). Position cannot key the gate: a bobtail arrival has no trailer, and an inbound trailer has no record until it is bound.
- **`AT_GATE_IN` is now correctly the post-check-in context** (§2.2) — a checked-in trailer inside the gate awaiting its first move.
- **Gap named:** physically-arrived-but-not-checked-in has no trailer position, and gate queue time is therefore excluded from detention (§6.5).

### Changes from v0.2
- **The show/hide rule was wrong.** v0.2 said "show blocked actions with a reason" and hid only "irrelevant" ones, which was too vague to decide anything. It produced permanently-disabled buttons with unchanging messages — e.g. `ASSIGN_SHIPMENT` on a trailer full of inbound freight. Corrected in §1.1.
- **Treatment now belongs to the (action, condition) pair.** v0.2 collapsed conditions with different correct treatments into one cell. §2 and §3 are restructured accordingly.
- **Explicit: never enabled-then-error** (§1.2). A reason is visible without clicking.
- **A visible-disabled cap** added (§1.5), because the old rule implied ~20 disabled controls on a yard trailer.

---

## 0. Why this document exists

The domain model defines actions as preconditions and effects (§5). That is correct but not buildable: a developer looking at a trailer at a dock with two shipments aboard and one assigned cannot tell from §5 which of twenty-eight actions to show. This document inverts the catalog — from *action → conditions* to *state → actions* — which is the direction a UI is written in.

---

## 1. Availability rules

These matter more than the matrix; the matrix is just their application.

### 1.1 The test: does the reason name a plausible next step?

For each condition that blocks an action, ask: **would the reason send the user somewhere they would plausibly go right now?**

| | Treatment |
|---|---|
| **Yes** — the clearing action is available on this trailer, in this position, to someone present | **Disabled, reason visible.** The control is a breadcrumb that teaches sequencing |
| **No** — clearing it requires a different plan, a different position, or an operation nobody is about to perform | **Hidden.** A permanently-disabled control with an unchanging message is noise, and noise trains people to stop reading |

**When conditions of both kinds fail at once, hiding wins.** An outbound assignment offered to a trailer that holds inbound freight *and* is out of service fails one hidden-class condition and one disabled-class one. Show the disabled control and its reason sends the user to return the trailer to service, after which the action is still not available — a breadcrumb pointing at the wrong door is worse than no control. So: **any failing hidden-class condition hides the action, whatever else also fails.** §1.3's precedence then only ever picks between conditions of the same kind.

Worked examples, since the rule is a judgment and examples are how it gets applied consistently:

| Action | Blocking condition | Clearing action | Treatment |
|---|---|---|---|
| `PULL_FROM_DOCK` | Session `OPEN` | `END_SESSION` / `CANCEL_SESSION` — right here | Disabled + reason |
| `SEAL_TRAILER` | Fill `OPEN` | `DECLARE_FILL_COMPLETE` — right here | Disabled + reason |
| `SEAL_TRAILER` | No freight aboard | Nothing. An empty trailer is not a sealing candidate | Hidden |
| `ASSIGN_SHIPMENT` | Fill `COMPLETE` | `REOPEN_FILL` — right here | Disabled + reason |
| `ASSIGN_SHIPMENT` | Trailer out of service | `RETURN_TO_SERVICE` — right here | Disabled + reason |
| `ASSIGN_SHIPMENT` | **Trailer holds inbound freight** | Move to a dock and unload an entire inbound load | **Hidden** |
| `ASSIGN_SHIPMENT` | Position `OFF_SITE` | The trailer has to arrive | Hidden |
| `END_SESSION` | No session exists | Nothing — there is no work to end | Hidden |
| Any action | Position `IN_MOTION` | `COMPLETE_MOVE`, by the spotter | See §1.4 |

**Permission is a "yes."** "Not permitted for your role" names a next step — find a supervisor — even though the step is outside the software. Permission-blocked actions therefore show disabled, which also keeps the escalation path visible.

**But the reason must name a step *this reader* can take.** The rule above silently assumes the clearing action is one the reader could perform. When it is not, the breadcrumb points at a door they cannot open — and the escalation this section is proud of keeping visible becomes invisible exactly where it is needed. A gate clerk who ends a load session, with every shipment `LOADED`, then meets "declare fill complete first" on sealing, on authorization, and finally "visit is not authorized to depart" at the gate: three blocked controls, no cause on screen, and the one action that would clear them is role-gated away from him.

So: **when the clearing action named in a reason is blocked for the current role and otherwise ready, the reason says who must clear it** — "the load has not been declared complete — a dock lead has to declare it". This does not contradict §3.4's refusal to name a role on a *permission* block. There the role is unknown to the screen and a guess would mislead; here it is read straight out of the effective config (`roles_can_declare_fill_complete`), so it is a fact.

**And a derived primary must not quietly route around it.** §1.7 picks the highest-priority *available* action, so a role-gated step simply vanishes from the suggestion and the user is steered past it — which is how the dead end above is reached without ever seeing a refusal. Where an action is otherwise ready and waiting only on another role, say so alongside the primary rather than skipping it in silence.

### 1.2 Never enabled-then-error

A blocked action is **disabled, with its reason readable without interaction** — inline, or on hover/tap-and-hold. An enabled control that produces an error when used is not permitted anywhere in this system. The user should never have to click something to discover they could not.

### 1.3 One primary reason per blocked action

When several conditions fail at once, show the one the user can act on first:

1. **Service and integrity** — out of service, integrity alarm. Nothing else matters until resolved.
2. **Physical** — wrong position, session active, trailer in motion.
3. **Data prerequisite** — no shipment assigned, fill not declared, not sealed.
4. **Permission** — role not permitted.

Permission is last on purpose. Telling someone they lack permission for an action that is also physically impossible sends them to their supervisor for nothing.

### 1.4 `IN_MOTION` shows state, not a list of blocked actions

A trailer between locations blocks nearly everything, and by §1.1 every one of those blocks would be hidden — the clearing action belongs to a spotter, elsewhere. Rather than an empty action list, the card shows a state banner: **"In motion → DOCK 27"** with `COMPLETE_MOVE` and `CANCEL_MOVE` as the only controls. One honest statement beats twenty absent ones.

### 1.5 Cap visible disabled controls at three

If more than three disabled controls would show, keep the three highest by §1.3 precedence and collapse the rest behind a single "other actions" affordance. The old rule implied around twenty disabled controls on an ordinary yard trailer, which is worse than hiding everything.

### 1.6 Primary, secondary, supervisor

| Tier | Presentation | Contents |
|---|---|---|
| **Primary** | Buttons on the card | **Two slots, not one** (model §10.14): what the *driver* does next and what the *facility* does next. After a drop these advance independently — he checks out while the trailer is loaded — so a single slot has to pick one and be wrong about the other. On a live load both resolve to the same object's business and only one fills. **Never a disabled action** |
| **Secondary** | Menu | Everything else available, plus disabled actions per §1.1 and §1.5 |
| **Supervisor** | Menu, visually separated, reason code required | `ADJUST_STATE`, `CORRECT_TRAILER_IDENTITY`, `MERGE_TRAILERS`, `CORRECT_DEPARTURE`, `CANCEL_SESSION` on an active session, `PARTIAL` outcomes, loaded substitutions |

Supervisor actions never sit adjacent to routine ones. They are the actions that write history nobody can fully trust, and physical separation is a cheap control.

### 1.7 The primary action is derived, not configured

The primary is the highest-priority action that is **available**, which means a step the reader cannot perform disappears from the suggestion entirely and they are steered past it. That is how a gate clerk reaches the gate blocked on a load declaration nobody told him he could not make. **Where an action is otherwise ready and waiting only on another role, surface it beside the primary rather than skipping it in silence** (§1.1).

| Situation | Primary action |
|---|---|
| At a dock, no session, shipments assigned | `OPEN_SESSION` |
| At a dock, session `OPEN` with shipments | `START_SESSION` |
| At a dock, session `ACTIVE` | `END_SESSION` |
| At a dock, session `ENDED`, work complete | `DECLARE_FILL_COMPLETE` or `PULL_FROM_DOCK` |
| At a dock, empty, nothing assigned | `ASSIGN_SHIPMENT` |
| **At a dock**, loaded, fill complete, unsealed | `SEAL_TRAILER` — **added in v0.13.** This row was missing, and sealing is where a dock stay normally ends (flows §4 P4d). Without it the suggestion after fill-complete is `PULL_FROM_DOCK`, i.e. pull an unsealed load off the dock |
| In yard, loaded, fill complete, unsealed | `SEAL_TRAILER` |
| In yard, `NEEDS_MOVE` | `CREATE_MOVE_TASK` |
| Move `PENDING` | `ASSIGN_MOVE_TASK` |
| Move `IN_PROGRESS` | `COMPLETE_MOVE` |
| On a TAKE leg, `READY_TO_DEPART` | `AUTHORIZE_DEPARTURE` |
| Entry identification disputed | `RESOLVE_IDENTIFICATION` |
| Undeclared exit detected | `CORRECT_DEPARTURE` |

---

## 2. Matrix by position

Legend: **A** = available · **D** = disabled with reason · **H** = hidden

### 2.0 The gate is keyed on visit state, not trailer position

Everything else in §2 is keyed on where the trailer is. The gate cannot be, for three reasons:

- A **bobtail arrival** has no trailer at all — there is nothing to give a position to, and the screen still has work to do.
- An **inbound trailer has no record** until `BIND_TRAILER_TO_LEG` creates it, so there is no object to carry a position.
- A trailer's position only becomes meaningful *after* check-in, which is the very action the gate screen exists to perform.

So the gate is an **appointment-centric** surface, and §2.1 below is keyed on `visit_state`. Position-keyed contexts resume at §2.2.

### 2.1 Gate processing — keyed on presence × destination

A single column cannot express these contexts, because presence and destination move independently (§3.6). Note especially that **dock assignment is available while the truck is still off site.**

| Action | `OFF_SITE` not registered | `AT_FACILITY` registered | `AT_GATE` | `ON_SITE` |
|---|---|---|---|---|
| `SELF_REGISTER` | **A** — the QR scan on the property *is* this action, and it is what produces `AT_FACILITY` | **H** already registered | **H** — use kiosk path | **H** |
| `RECORD_ARRIVAL` | **A** | **A** | **H** already recorded | **H** |
| `ADMIT` | **H** — not here | **A**, or **D** as at `AT_GATE` | **A**, or **D** "Identify the arriving trailer first" / "Dockpass expired or already used" | **H** already admitted |
| `REGISTER_AND_ADMIT` | **H** | **H** — already registered | **A** — the single-step kiosk path | **H** |
| `ASSIGN_DOCK` | **H** — nothing to assign to yet | **A** → "Dock Assigned — Pending Gate Check-In". Driver is on the property, minutes away (§2.13) | **A** | **A** — highest queue priority (§6.2) |
| `RELEASE_DOCK` | **H** | **A** if a dock is `HELD` | **A** | **A** |
| `ASSIGN_YARD` | **H** | **A** | **A** | **A** |
| `BIND_TRAILER_TO_LEG` | **A** | **A** — usually already done by self-registration | **A** | **A** for an unresolved TAKE leg |
| `TURN_AWAY` | **H** | **A** — cancels registration and releases any held dock | **A** | **A** |
| `RESOLVE_IDENTIFICATION` | **H** | **H** — no read yet | **A** if disputed | **A** if disputed |
| `CREATE_MOVE_TASK` | **H** | **D** "Admit the visit first" | **D** "Admit the visit first" | **A** |
| `ASSIGN_SHIPMENT` | **H** "Trailer is not on site" | **H** — at the facility but not through the gate (§9 #2) | **H** | per §2.2 |

**`OFF_SITE` is nearly empty, and that is correct.** Nothing can be done to a visit that has not announced itself — and it cannot announce itself remotely (§9 #31). A trailer record that departed previously still exists, so it can be bound to a future leg or marked out of service, but not assigned freight.

**`AT_FACILITY` is the genuinely new column.** The driver has scanned in and is standing outside the fence: they can hold a dock, be reassigned, or be turned away, all before the gate opens. Everything physical stays blocked, and `CREATE_MOVE_TASK` is **D** rather than **H** because "Admit the visit first" names a real next step (§1.1) — and one that is minutes away, not hypothetical.

### 2.2 `AT_GATE_IN` — admitted, awaiting first move

The trailer is inside the gate, identified, and not yet spotted. A real location — the inbound apron — and a source of work for the move queue. Displayed status is "Awaiting Dock" or "Dock Assigned" depending on `destination` (§3.6.5).

| Action | | Condition / reason |
|---|---|---|
| `CREATE_MOVE_TASK` | A / D | **D** "Assign a dock or yard destination first" when `destination = AWAITING_ASSIGNMENT`. Otherwise the primary action here |
| `ASSIGN_DOCK` | A / H | **A** while `AWAITING_ASSIGNMENT` — and the top of the dock-assignment queue, since detention is running (§6.2) |
| `RELEASE_DOCK` | A / H | **A** if a dock is `HELD` |
| `ASSIGN_SHIPMENT` | A / D / H | **A** normally. **D** if out of service. **H** if the trailer holds inbound freight (§1.1) |
| `VERIFY_EMPTY` | A / H | **H** if freight aboard |
| `RESOLVE_IDENTIFICATION` | A / H | **H** if identification is corroborated |
| `MARK_OUT_OF_SERVICE` | A | |
| `TURN_AWAY` | A | Still possible after check-in |
| `ADMIT`, `SELF_REGISTER` | H | Already done (§2.1) |
| `OPEN_SESSION`, `PULL_FROM_DOCK` | H | Not at a dock |

### 2.3 `YARD_SPOT` / `LOT`

This is the section v0.2 got wrong. Treatment is listed per condition.

| Action | Condition | Treatment | Reason shown |
|---|---|---|---|
| `ASSIGN_SHIPMENT` | Available | **A** | — |
| | Fill `COMPLETE` | **D** | "Fill is declared complete — reopen fill to add freight" |
| | Out of service | **D** | "Trailer is out of service" |
| | Holds inbound freight | **H** | *(nothing shown — see §1.1)* |
| `UNASSIGN_SHIPMENT` | ≥1 `ASSIGNED` row | **A** | — |
| | All rows loading or loaded | **H** | Nothing is unassignable; not a candidate |
| `DECLARE_FILL_COMPLETE` | Freight aboard, no `PART_LOADED` | **A** | — |
| | `PART_LOADED` row exists | **D** | "Resolve the part-loaded shipment first" |
| | Role not permitted | **D** | "Not permitted for your role" |
| | No freight aboard | **H** | Not a candidate |
| `REOPEN_FILL` | Fill `COMPLETE`, unsealed | **A** | — |
| | Sealed | **D** | "Break the seal first" |
| | Fill already `OPEN` | **H** | Nothing to reopen |
| `SEAL_TRAILER` | Fill `COMPLETE`, freight aboard | **A** | — |
| | Fill `OPEN` | **D** | "Declare fill complete first" |
| | `PART_LOADED` row exists | **D** | "Resolve the part-loaded shipment first" |
| | No freight aboard | **H** | Not a candidate |
| `BREAK_SEAL` | Sealed | **A** | Reason code required |
| | Not sealed | **H** | Nothing to break |
| `CREATE_MOVE_TASK` | No open move | **A** | — |
| | Open move exists | **D** | "A move is already open for this trailer" |
| `VERIFY_EMPTY` | Load state `EMPTY` | **A** | — |
| | Freight aboard | **H** | Not a candidate |
| `CORRECT_TRAILER_IDENTITY` | Supervisor, no active work | **A** | — |
| | Row `LOADING`/`UNLOADING` | **D** | "Cannot renumber during active work" |
| `OPEN_SESSION`, `END_SESSION`, `PULL_FROM_DOCK` | Not at a dock | **H** | Position-wrong actions are always hidden |
| `CHECK_OUT` | Not at the gate | **H** | |
| `AUTHORIZE_DEPARTURE` | Not at the gate | **A** | Authorization is a records check, not a lane operation — a live load is authorized while still at its dock (flows §3 P5a). Only `CHECK_OUT` needs the trailer at the gate |

### 2.4 `IN_MOTION`

Per §1.4, the card shows a state banner rather than an action list.

| Action | | Notes |
|---|---|---|
| `COMPLETE_MOVE` | A | **Requires `actual_destination`** — the only way out of this state (§9 #8) |
| `CANCEL_MOVE` | A | Requires a reported location; returns the trailer to its origin |
| Everything else | H | The clearing action belongs to the spotter, not this user (§1.1) |

### 2.5 `DOCK` — by session state

The busiest context, and where a single "trailer status" field would fail hardest.

| Action | No session | `OPEN` | `ACTIVE` | `ENDED` |
|---|---|---|---|---|
| `OPEN_SESSION` | **A** — opens **pre-populated** (§9 #37) | **H** | **H** | **A** next session (§3.4) |
| `ADD_SHIPMENT_TO_SESSION` *(exception)* | **H** | **A** | **A** (§9 #17) | **H** |
| `REMOVE_SHIPMENT_FROM_SESSION` | **H** | **A** — the normal LTL adjustment (§9 #37) | **H** work started | **H** |
| `START_SESSION` | **H** | **A**, or **D** "Add at least one shipment" | **H** | **H** |
| `END_SESSION` | **H** | **H** | **A** — per-shipment outcomes required | **H** |
| `CANCEL_SESSION` | **H** | **A** | **D**/**A** supervisor (§9 #14) | **H** |
| `ASSIGN_SHIPMENT` | **A** | **A** | **A** if fill `OPEN` | **A** |
| `UNASSIGN_SHIPMENT` | **A** if any `ASSIGNED` | **A** if not in session | **H** | **A** if any `ASSIGNED` |
| `DECLARE_FILL_COMPLETE` | **A** | **D** "End or cancel the open session first" | **D** "Work is in progress at the dock" | **A** |
| `SEAL_TRAILER` | **A**/**D** | **D** session open | **D** session active | **A**/**D** needs fill complete |
| `PULL_FROM_DOCK` | **A** | **D** "End or cancel the open session first" | **D** "Work is in progress at the dock" | **A** |
| `CREATE_MOVE_TASK` | **A** | **D** same reason | **D** same reason | **A** |
| `CORRECT_TRAILER_IDENTITY` | **A** supervisor | **A** supervisor | **D** "Cannot renumber during active work" | **A** supervisor |
| `MARK_OUT_OF_SERVICE` | **A** | **A** | **A** — does **not** cancel the session (§5.5) | **A** |

Note how many dock-context blocks are **D** rather than **H**: at a dock, the clearing action is almost always right there, which is exactly when a disabled control earns its place. Contrast §2.3, where most blocks are structural and hidden.

The `ENDED → OPEN` column is the sequential-session case: unload, end, assign, load again at the same dock — and multi-shipment outbound loading across several sessions in one stay.

### 2.6 `AT_GATE_OUT`

| Action | | Condition / reason |
|---|---|---|
| `DECLARE_TAKE_LEG_CHANGE` | A | Substitution or bobtail. **Supervisor confirmation if the substitute carries freight** (§9 #27) |
| `AUTHORIZE_DEPARTURE` | A / D | **Every reason below applies only to the trailer this visit is leaving with** — the TAKE-leg trailer the driver currently has hooked (model §10.13). A driver who hooked nothing departs bobtail with none of these checks, because he is taking nothing: **A**. **D**: "Unexpected freight aboard — verify against the manifest" · "Declare fill complete first" · "Seal the trailer first" · "A move is already open for this trailer" · "End or cancel the open session first" |
| `CHECK_OUT` | A / D | **D** "Visit is not authorized to depart". **No camera dependency** — reads are too slow to gate the lane (§9 #28) |
| `SEAL_TRAILER` | A / D | Last chance before departure |
| `RESOLVE_IDENTIFICATION` | A / H | Entry reads only. Exit reads land after departure (§2.7) |

### 2.7 After departure — `OFF_SITE`

Camera reads are detective, not preventive (§9 #28), so an exit read resolves *after* check-out has completed. That creates a small set of actions on a trailer no longer on site:

| Action | | Notes |
|---|---|---|
| `CORRECT_DEPARTURE` | A | **Supervisor.** Restores the trailer that did not leave, including its `STAGED` preload |
| `RESOLVE_IDENTIFICATION` | A | On the exit read pair |
| Everything else | H | Position-wrong; nothing a user can do from here |

**The recovery queue inverts normal ordering.** Recoverability decays with time since departure, so the newest event is the most actionable. Every other queue in this system puts the oldest item first; this one must not, and a generic queue component will get it wrong by default.

---

## 3. Condition reference

Canonical strings, with treatment. These are UI copy, not paraphrase — each is phrased as the thing the user should do next.

### 3.1 Service and integrity (precedence 1)

| Condition | Treatment | Reason shown |
|---|---|---|
| `service_state = OUT_OF_SERVICE` | D | "Trailer is out of service" |
| `INTEGRITY_ALARM` | D | "Trailer state needs review before any action" |
| Inbound and outbound rows coexist | D | "Trailer holds both inbound and outbound freight — resolve first" |

All three are **D**: each has a clearing action available to someone present.

### 3.2 Physical (precedence 2)

| Condition | Treatment | Reason shown |
|---|---|---|
| Session `ACTIVE` | D | "Work is in progress at the dock" |
| Session `OPEN` | D | "End or cancel the open session first" |
| Open MoveTask exists | D | "A move is already open for this trailer" |
| Visit not admitted | D | "Admit the visit first" |
| Position `IN_MOTION` | H | Clearing action belongs to the spotter (§1.4) |
| Position not `DOCK` when a dock is required | H | |
| Position `OFF_SITE` | H | |

### 3.3 Data prerequisite (precedence 3)

| Condition | Treatment | Reason shown |
|---|---|---|
| Session has no shipment | D | "Add at least one shipment" |
| `fill_declaration = OPEN` | D | "The load has not been declared complete" — **plus "— a *role* has to declare it" when that role is not the reader's** (§1.1). Deliberately not "declare fill complete first", which reads as though the loading itself were unconfirmed; the per-shipment session outcomes are a different confirmation, made by a different person (glossary §11 #4) |
| `fill_declaration = COMPLETE` blocking assignment | D | "Fill is declared complete — reopen fill to add freight" |
| `PART_LOADED` row exists | D | "Resolve the part-loaded shipment first" |
| Not sealed | D | "Seal the trailer first" |
| Sealed | D | "Break the seal first" |
| Freight aboard not on residual list | D | "Unexpected freight aboard — verify against the manifest" |
| **Expected freight not aboard** | D | "Expected freight is not aboard yet" — the other direction of the same check, missing until v0.13 (model §5.1) |
| `empty_verification = UNVERIFIED` | D | "Confirm the trailer is empty" |
| Trailer holds inbound freight, blocking outbound assignment | **H** | *(nothing shown — clearing it is a different plan)* |
| No freight aboard, for a freight-requiring action | **H** | |
| No session exists, for a session action | **H** | |
| Nothing assigned, for `UNASSIGN_SHIPMENT` | **H** | |

### 3.4 Permission (precedence 4) — always D

| Action | Gate |
|---|---|
| `DECLARE_FILL_COMPLETE` | `roles_can_declare_fill_complete` (facility) |
| `CANCEL_SESSION` on `ACTIVE`, `PARTIAL` outcome | `roles_can_override_session_outcome` |
| `RESOLVE_IDENTIFICATION` | `roles_can_resolve_identification` |
| `CORRECT_TRAILER_IDENTITY`, `MERGE_TRAILERS`, `ADJUST_STATE`, `CORRECT_DEPARTURE` | Supervisor |
| `DECLARE_TAKE_LEG_CHANGE` with a loaded substitute | Supervisor |

Reason shown: **"Not permitted for your role"** — never naming which role, since that varies by facility (§9 #25) and a wrong hint is worse than none.

**The exception is a second-order block** (§1.1): when action A is blocked because action B has not happened, and B is role-gated away from this reader, A's reason *does* name B's role. The difference is that the role is then read from the effective config rather than guessed, and without it the reader has no path at all.

---

## 4. Movement — destination versus task

**There is no `DRIVER_SELF` executor** (§3.5, §9 #30). Whether a trailer's movement is a task at all depends on one thing: is a tractor attached?

| Trailer state | What it needs | Available actions |
|---|---|---|
| **Tractor attached** (live load, or a drop not yet dropped) | A destination | `ASSIGN_DOCK`, `ASSIGN_YARD`, `POSITION_TRAILER`, `DROP_TRAILER`. **`CREATE_MOVE_TASK` is H** — "trailer has a driver" is not a blocked condition to explain, it is a different situation entirely (§1.1) |
| **No tractor** (dropped, preloaded, repositioning) | A move task | `CREATE_MOVE_TASK`, then `ASSIGN_MOVE_TASK` → `START_MOVE` → `COMPLETE_MOVE` |

| Move task action | | Notes |
|---|---|---|
| `POSITION_TRAILER` | A / D / H | **H** if no tractor is attached — this is yard-team work. **D** "Assign a dock or yard destination first" while `AWAITING_ASSIGNMENT`: a driver with nowhere to go is blocked on a decision, not on labour. **D** on an open session |
| `CREATE_MOVE_TASK` | A / D / H | **H** if a tractor is attached. **D** "Assign a dock or yard destination first" if `AWAITING_ASSIGNMENT`. **D** "A move is already open for this trailer" |
| `ASSIGN_MOVE_TASK` | A | To a spotter |
| `START_MOVE` | A / D | **D** "Work is in progress at the dock" if a session is active |
| `COMPLETE_MOVE` | A | Requires `actual_destination` — **or sensor confirmation at a dock** (§2.9) |
| `CANCEL_MOVE` | A | Also cancelled automatically by `HOOK_TRAILER` — a hooked trailer needs no task |
| `DROP_TRAILER` | A / H | **H** if no tractor attached |
| `HOOK_TRAILER` | A / D / H | **D** "End or cancel the open session first" · "A move is in progress" |

**The move queue contains only your work, by construction.** Since a tractor-attached trailer never generates a task, there is no informational lane to render muted and nothing to filter. Queue length is therefore an honest measure of yard-team backlog — which was not true when `DRIVER_SELF` tasks sat in it.

**Where driver-attached trailers appear instead:** the dock-assignment queue (§6.2), because what they need is a decision, not labour.

## 5. What this document does not yet cover

1. **Screen inventory.** Which of these surfaces appear on the gate screen, dock board, yard map, move queue, dock work queue, trailer detail, reconciliation screen, identification queue, and recovery queue. The matrix says what is available; not where.
2. **Bulk actions.** Everything here is single-trailer. Real yards want "pull these four," and bulk breaks the one-reason-per-block model — it becomes a summary of mixed outcomes. Decide before queue screens are built; retrofitting bulk usually means rewriting the action layer.
3. **Priority scoring.** Still "suggested ordering, tunable" in the model (§6.2). The matrix makes queues actionable but not ordered.
4. **The `END_SESSION` reconciliation screen.** Named as the most consequential new UI and specified only as a requirement.
5. **The `CORRECT_DEPARTURE` screen.** Touches trailer position, shipment status, and preload restoration at once — second only to `END_SESSION` in difficulty.
6. **Mobile versus desk.** A spotter reporting `actual_destination` and a clerk running `END_SESSION` reconciliation have almost nothing in common. This matrix assumes one surface.

---

## 6. Open questions

1. **Is §1.1's test consistently applicable by developers?** It is a judgment, and judgments drift across a team. The worked examples in §1.1 and the treatments in §3 are meant to be the reference — but a condition that is not listed there will get decided by whoever writes that screen. Consider making the treatment a property of the condition in code, so it is defined once rather than per screen.
2. **Should disabled reasons be actionable links?** "Declare fill complete first" could navigate to that action. Useful, but chains of redirects lose the user's place.
3. **Does hiding structural blocks hurt learning?** A new user never discovers the cross-dock rule from the UI, only from training or an attempted action elsewhere. That is probably the right trade — training is a one-time cost, clutter is permanent — but it is a trade.
4. **Is the cap of three (§1.5) right?** Arbitrary. Worth tuning once real screens exist.
5. **Does gate queue time count as detention?** Raised by the §2.1 rework. A truck at `ARRIVED` is physically on your property, but its trailer's position is still `OFF_SITE` and `on_site_since` is not set until check-in — so queue time at the gate is currently **excluded** from detention. Carriers routinely argue it should be included. Two ways to resolve it, and the choice is commercial rather than technical: (a) leave the clock at check-in and treat gate queue as your own throughput problem, measured separately; (b) stamp an `arrived_at` on the appointment and let the facility choose which timestamp starts detention. Recommend (b) — capture `arrived_at` regardless, because you cannot decide later using data you never collected, and a facility that never uses it loses nothing.
6. **Should a long gate queue be visible as a queue?** With §2.1 keyed on visit state, appointments at `ARRIVED` are the right object for waiting trucks — but nothing in the model surfaces "six trucks waiting at the gate" as a work queue alongside the move and dock work queues. That may be a third queue.
