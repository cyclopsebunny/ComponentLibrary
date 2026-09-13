# Glossary — Canonical Terms

**Companion to:** `yard-dock-operations-model.md` v0.23, `action-availability-matrix.md` v0.13
**Status:** Draft v0.7 — `EXPECTED_FREIGHT_MISSING`
**Purpose:** The single source of truth for every entity, state, action, flag, and label. When this document and another disagree, this one is wrong and should be corrected — but until it is, it is what the product, the training material, and support should say.

### Changes from v0.6
- **`EXPECTED_FREIGHT_MISSING` added** (§7). There was a flag for freight aboard that was not expected and none for freight expected that was not aboard.
- **`READY_TO_DEPART` tightened** (§7): both directions of the match, and the driver must actually have the trailer.

### Changes from v0.5
- **Bare "preload" banned** (§2). It meant a state, an outbound preload appointment, and an outbound pickup — and one of those three was called "preload pickup", which is the name that hid the distinction.
- **Bare "visit" banned** where it means the appointment (§2). An appointment may be attended twice (model §10.13).
- **`Visit` added as an entity** (§4) and Appointment redefined as a booking containing 1..n visits.
- **Two industry synonyms split** (§10): picking up someone else's loaded trailer is an *outbound pickup*; bringing your own and returning for it is an *outbound preload*.

### Changes from v0.4
- **`tractor` added as a stored trailer dimension** (§5.1). It was only ever listed in §7 as a derived flag under "computed, never stored", and there is nothing in the model to compute it from. Its writers are now named.
- **`TRACTOR_ATTACHED` stays in §7** as a badge, annotated as a rendering of that dimension rather than a computed flag.

*Found by implementing the document set as an executable rule engine; the engine treated every gate arrival as tractorless and handed live loads to the yard team.*

---

## 1. Why this exists and how to use it

Three problems made it necessary:

1. **"Check in" had to be banned** (§3.6.4 of the model) because it means two different things once registration and admission are separate events.
2. **Several terms are overloaded** in ordinary yard language — "clear," "drop," "spot," "load" — and each can mean two things in a sentence a dispatcher would actually say.
3. **Terms have been renamed as decisions changed.** Anyone reading earlier notes will meet names that no longer exist (§3).

### 1.1 Two vocabularies, deliberately

| | Example | Audience |
|---|---|---|
| **Internal identifier** | `AWAITING_ASSIGNMENT`, `NOT_READY` | Schema, API, logs, code |
| **Displayed label** | "Awaiting Dock", "Not cleaned" | Screens, training, support calls |

They are not the same and should not be forced to match. Internal names optimize for precision and stability; labels optimize for what a night-shift spotter understands at a glance. **Every displayed label in §7 maps to exactly one internal state**, and that mapping is the thing to keep honest.

---

## 2. Terms not to use

The highest-value section. Each of these will be said in meetings; none should appear in the product, the schema, or documentation.

| Do not say | Because | Say instead |
|---|---|---|
| **"Checked in"** | Two distinct events: registration and admission | `SELF_REGISTER` / "registered", or `ADMIT` / "admitted" |
| **"Clear"** (bare) | Means authorize, resolve an exception, *or* dismiss from a board | `AUTHORIZE_DEPARTURE` for departure; "resolve" for exceptions; "dismiss" for UI. **No identifier uses "clear"** |
| **"Spotted"** (loosely) | Means placed **at a dock** — not "at any destination" | `AT_DESTINATION` for the general case; `SPOTTED` only for a sensor-confirmed dock |
| **"Full"** (of a trailer) | The system cannot know fullness with multiple shipments | `fill_declaration = COMPLETE` / "fill complete" |
| **"Drop"** (bare) | Either the appointment type or the physical unhooking | `visit_type = DROP` for the type; `DROP_TRAILER` for unhooking |
| **"Spot"** (bare) | A yard position, or the act of placing a trailer at a dock | "yard spot" for the place; `COMPLETE_MOVE` / "spotted" for the act |
| **"Trailer status"** | There is no single status; there are six dimensions | Name the dimension: load state, position, destination, readiness |
| **"Available"** (of a trailer) | Ambiguous between empty, unassigned, and ready | `AVAILABLE_FOR_ASSIGNMENT` — all four conditions, §6 |
| **"Move"** (for a live load) | A tractor-attached trailer has a destination, not a move task | "destination" for driver-attached; `MoveTask` only for tractorless |
| **"Dock"** *(bare, for the area)* | Now means one numbered position | "dock area" for the building side; "dock crew"/"dock lead" are fine as roles |
| **"Dock queue"** *(bare)* | Two queues contain the word | **Dock Assignment Queue** (which dock) vs **Dock Work Queue** (load/unload) |
| **"Cleaned"** | Only one instance of readiness; others are pre-cool, washout, inspection | `readiness_requirements` / `READY` |
| **"Preload"** *(bare)* | Three different things: a loaded sealed trailer waiting (a state), an **outbound preload** appointment (§4 pattern 4a), and what used to be called a "preload pickup" but is an **outbound pickup** (pattern 4) | `PRELOAD_STAGED` for the state; "outbound preload" and "outbound pickup" for the two patterns, never interchangeably |
| **"Visit"** *(bare, meaning the appointment)* | An appointment may be attended more than once, so the two are not the same object (model §10.13) | "appointment" for the booking; "visit" only for one arrival-to-departure span |
| **"Trailer session"** | "Session" already means one work activity at a dock. A trailer's continuous time on site is a different span entirely, and it can contain several dock sessions across several appointments | `TrailerStay` — proposed in model §10.12, parallel to `DockStay` |
| **"History"** *(bare)* | Five different spans bracket the same event log, and only appointment ⊃ visit nests (model §10.12, §10.13) | Name the bracketing: trailer-stay, appointment, visit, dock-stay, or custody history |

---

## 3. Retired terms

Names that appeared in earlier drafts and no longer exist. Listed so old notes remain readable.

| Retired | Replaced by | Why |
|---|---|---|
| `CHECK_IN` | `SELF_REGISTER`, `ADMIT`, `REGISTER_AND_ADMIT` | Two-stage check-in made it ambiguous |
| `CHECKED_IN` (state) | `registration` + `presence` dimensions | Was a composite masquerading as one value |
| `DRIVER_SELF` (executor) | Nothing — deleted | A tractor-attached trailer has no move task at all |
| `SELF_MOVABLE` | `TRACTOR_ATTACHED` | Framed as a property of a task rather than of the trailer |
| `YARD_FULL` | Nothing — deleted | The overflow lot is unbounded; the condition cannot occur |
| `UNDESIGNATED_PARKING` | Nothing — deleted | Overflow parking is normal, not an exception |
| `UNSECURED_FREIGHT` | `FREIGHT_OUTSIDE_PERIMETER` | Reframed from security alarm to policy exception |
| `WRONG_TRAILER_EXITING` | `UNDECLARED_TRAILER_EXIT` | The alarm is the missing declaration, not the substitution |
| `AWAITING_INTAKE` | `NOT_READY` | Generalized from paperwork to physical readiness |
| `AWAITING_SERVICE`, `IN_SERVICE_BAY`, `AVAILABLE` | `NOT_READY`, `IN_PREP`, `READY` | Generalized beyond cleaning |
| `sequence` (on TrailerLoad) | Nothing — deleted | Unload order is physically determined; no rule needed it |
| `pool_owner` | `carrier` | Plainer term |
| `CLEAR_VISIT`, `CLEARED`, `DEPARTED_WITHOUT_CLEARANCE` | `AUTHORIZE_DEPARTURE`, `AUTHORIZED_TO_DEPART`, `DEPARTED_WITHOUT_AUTHORIZATION` | "Clear" was on the banned list while the action still used it |
| `SPOTTED` *(as a destination value)* | Derived `AT_DESTINATION`; `SPOTTED` kept only for a sensor-confirmed dock | Stored a fact position already carried, so the two could disagree |
| `DockAssignment.SPOTTED` | `FULFILLED` | Same reason |
| `Door`, `DoorAssignment`, `ASSIGN_DOOR`, `DOOR_ASSIGNED`, `PULL_FROM_DOOR`, `BLOCKING_DOOR`, `door_id` | `Dock`, `DockAssignment`, `ASSIGN_DOCK`, `DOCK_ASSIGNED`, `PULL_FROM_DOCK`, `BLOCKING_DOCK`, `dock_id` | "Dock" is the operation's own term; half the schema already used it |
| "Door Assignment Queue", "Dock Queue" | "Dock Assignment Queue", "Dock Work Queue" | The rename collapsed both into one name |
| `IN_TRANSIT_BETWEEN_FACILITIES` | Never built | Facilities are self-managed; a departing trailer is `OFF_SITE` |
| `INBOUND_LOADED`, `AT_DOCK_UNLOADING`, `EMPTY_IN_YARD` | The six dimensions | Illustrations of the single-status mistake, never real values |

---

## 4. Entities

| Entity | One-line definition |
|---|---|
| **Tenant** | A customer. Owns facilities; the isolation and billing boundary |
| **Facility** | A site. **The operational boundary** — trailers, shipments, docks, and config are all facility-scoped |
| **FacilityConfig** | Per-facility settings, seeded by copy from tenant defaults at creation, facility-owned thereafter |
| **Trailer** | The physical asset. Facility-scoped; created on first arrival, not pre-registered |
| **Shipment** | A unit of freight with a direction. Exists independently of any trailer |
| **TrailerLoad** | The shipment↔trailer junction. One row per shipment on a trailer; `shipment_id` is **unique** |
| **Appointment** | A **booking** by a driver and tractor — not a trailer visit, and **not necessarily one visit**. Contains legs and 1..n visits (model §10.13) |
| **Visit** | One physical arrival to departure by a driver. Carries its own registration, dockpass, presence and detention clock. Proposed in model §10.13 |
| **VisitLeg** | One half of a visit: `BRING` (trailer arrives) or `TAKE` (trailer departs). Each names its own trailer |
| **Dockpass** | A single-use 5-digit reference to an appointment, issued at registration, redeemed at the gate |
| **DockAssignment** | A dock held for a visit. May precede admission; released on spot-in, reassignment, or no-show |
| **DockStay** | One continuous occupancy of a dock by one trailer, spot-in to pull-out. Contains 1..n sessions |
| **DockSession** | One work activity at a dock, covering one or more shipments in the same direction |
| **SessionShipment** | A shipment's membership in a session, with `joined_at` and its end-of-session `outcome` |
| **MoveTask** | A requested relocation. **Exists only for trailers with no tractor attached** |
| **YardSpot** | A numbered position, capacity 1, tracked occupancy. All spots are interchangeable |
| **Lot** | An unbounded position with no space numbers. `inside_fence` decides whether it is on site |
| **Dock** | A dock position, capacity 1, fungible. Carries `sensor_state` where presence sensors exist — **an observation, distinct from the trailer's believed position** |
| **YardCheck** | The daily reconciliation pass. Also how unannounced trailers are discovered |
| **UnappointedReturn** | A trailer arriving with no appointment, registration, or visit — typically a company trailer off route |
| **TrailerIdentification** | One reading of a trailer number, from a guard, driver, or camera. Entry or exit |
| **Event** | Append-only log entry. The backbone of trailer history and the only durable record of session outcomes |

---

## 5. State dimensions

**No entity has a single "status."** Each dimension answers one question and they move independently.

### 5.1 Trailer

| Dimension | Values | Notes |
|---|---|---|
| **Load state** | `EMPTY` · `ASSIGNED_ONLY` · `IN_WORK` · `PART_LOADED` · `HAS_FREIGHT` · `INTEGRITY_ALARM` | **Derived** from TrailerLoad rows, never stored. Evaluated in precedence order |
| **Position** | `OFF_SITE` · `AT_GATE_IN` · `YARD_SPOT` · `LOT` · `DOCK` · `IN_MOTION` · `AT_GATE_OUT` | `IN_MOTION` is a real state, not a transition artifact |
| **Destination** | `AWAITING_ASSIGNMENT` · `DOCK_ASSIGNED` · `YARD_ASSIGNED` · `NONE` | A **trailer** dimension — it outlives the visit. `SPOTTED` is **not** a value here; use derived `AT_DESTINATION` |
| **Readiness** | `NOT_READY` · `IN_PREP` · `READY` | Facility-configured requirements. Empty list ⇒ always `READY` |
| **Service** | `IN_SERVICE` · `OUT_OF_SERVICE` | Damage, reefer failure, DOT hold |
| **Fill declaration** | `OPEN` · `COMPLETE` | Human judgment; the system cannot infer fullness |
| **Empty verification** | `UNVERIFIED` · `CLAIMED_EMPTY` · `VERIFIED_EMPTY` | Driver claim at the gate, with optional physical check |
| **Identity confidence** | `CORROBORATED` · `SINGLE_SOURCE` · `DISPUTED` | Derived from identification readings |
| **Tractor** | `ATTACHED` · `NONE` | **Stored, not derived.** Nothing else in the model records whether a tractor is on the trailer, so there is nothing to compute it from. Set on arrival by `BIND_TRAILER_TO_LEG` for a BRING leg and by `HOOK_TRAILER`; cleared by `DROP_TRAILER` and `CHECK_OUT`. Decides whether movement is a task or a destination (§6.3) |

### 5.2 TrailerLoad (per shipment)

`ASSIGNED` → `LOADING` → `ON_BOARD` → `UNLOADING` → *closed*, plus `PART_LOADED` (supervisor-only, from a cancelled load).

Inbound rows begin at `ON_BOARD` — the freight is already aboard, so there is no assignment phase.

### 5.3 Shipment

- **Outbound:** `PLANNED` → `ASSIGNED` → `LOADING` → `LOADED` → `STAGED` → `DEPARTED`
- **Inbound:** `EXPECTED` → `ARRIVED` → `UNLOADING` → `RECEIVED`

`STAGED` = preloaded, sealed, fill complete, waiting for a pickup.

### 5.4 Appointment (visit)

| Dimension | Values |
|---|---|
| **Registration** | `NOT_REGISTERED` · `SELF_REGISTERED` · `REGISTERED_AT_GATE` |
| **Presence** | `OFF_SITE` · `AT_FACILITY` · `AT_GATE` · `ON_SITE` · `AUTHORIZED_TO_DEPART` · `DEPARTED` |
| **Visit type** | `LIVE` · `DROP` |
| **Party type** | `THIRD_PARTY` · `COMPANY_DRIVER` |
| **Access method** | `DOCKPASS` · `RF_BADGE` · `GUARD` |

### 5.5 Others

- **DockSession:** `OPEN` → `ACTIVE` → `ENDED`, or `CANCELLED`
- **MoveTask:** `PENDING` → `ASSIGNED` → `IN_PROGRESS` → `COMPLETED`, or `CANCELLED`
- **DockAssignment:** `HELD` → `FULFILLED` / `RELEASED`
- **Dock sensor:** `OCCUPIED` · `VACANT` · `UNKNOWN` — an observation, not a belief
- **YardSpot:** `FREE` · `OCCUPIED` · `RESERVED` · `OUT_OF_USE`
- **Identification match:** `CORROBORATED` · `MISMATCH` · `UNMATCHED`
- **Session outcome (per shipment):** `LOADED` · `NOT_LOADED` · `PARTIAL` · `UNLOADED`

---

## 6. Actions

### 6.1 Registration, gate, and departure

| Action | Definition |
|---|---|
| `SELF_REGISTER` | Driver scans the QR sign **at the facility**, supplies appointment ID and trailer number, receives a dockpass |
| `RECORD_ARRIVAL` | Notes the truck at the gate. Redundant where a QR scan already recorded arrival |
| `ADMIT` | Opens the gate. Consumes the dockpass; presence → `ON_SITE` |
| `REGISTER_AND_ADMIT` | The single-step kiosk path. Writes the same dimensions as the two-stage path |
| `HOLD_OUTSIDE` | Holds a visit outside the fence when no dock and no in-gate space is available |
| `BIND_TRAILER_TO_LEG` | Attaches a trailer to a leg. Creates the trailer record if the number is new, **and creates the TrailerLoad rows from the leg's shipments** — `ON_BOARD` for BRING, `ASSIGNED` for TAKE |
| `VERIFY_EMPTY` | Physically confirms a trailer is empty. Optional |
| `AUTHORIZE_DEPARTURE` | **Authorizes departure.** Verifies legs, freight match, fill complete, seal, no open work. *Formerly `CLEAR_VISIT`* |
| `CHECK_OUT` | Records the actual departure. Requires `AUTHORIZED_TO_DEPART` |
| `TURN_AWAY` | Refuses a visit. Reason code required; releases any held dock |
| `DECLARE_TAKE_LEG_CHANGE` | Driver declares taking a different trailer, or none. Supervisor confirmation if the substitute carries freight |
| `RESOLVE_IDENTIFICATION` | Settles a disputed or unmatched reading, **recording which source was correct** |

### 6.2 Dock and yard assignment

| Action | Definition |
|---|---|
| `ASSIGN_DOCK` | Holds a dock for a visit. May precede admission |
| `RELEASE_DOCK` | Frees a held dock, with a reason |
| `ASSIGN_YARD` | Sets the yard as the destination. Specific spot optional |

### 6.3 Movement

| Action | Definition |
|---|---|
| `DROP_TRAILER` | Tractor detaches. **The handoff** — the trailer becomes yard-team responsibility |
| `HOOK_TRAILER` | Tractor attaches. Cancels any pending move task |
| `CREATE_MOVE_TASK` | Requests a relocation. Only for trailers with **no tractor attached** |
| `ASSIGN_MOVE_TASK` | Assigns it to a spotter |
| `START_MOVE` | Begins it; position → `IN_MOTION` |
| `COMPLETE_MOVE` | Ends it. **Requires the reported `actual_destination`** |
| `CANCEL_MOVE` | Abandons it; releases reservations |

### 6.4 Dock work

| Action | Definition |
|---|---|
| `OPEN_SESSION` | Creates a work session at a dock, **pre-populated** with the trailer's eligible rows — `ON_BOARD` for unload, `ASSIGNED` for load |
| `ADD_SHIPMENT_TO_SESSION` | **Exception path.** Adds a shipment not already in the pre-populated set, recording `joined_at`. Permitted while `ACTIVE` |
| `REMOVE_SHIPMENT_FROM_SESSION` | Removes one not yet worked — the normal way to exclude LTL freight staying aboard |
| `START_SESSION` | Begins work; rows → `LOADING` / `UNLOADING` |
| `END_SESSION` | **A reconciliation, not a button** — records an outcome for every shipment in the session |
| `CANCEL_SESSION` | Abandons the session. Supervisor role if `ACTIVE` |
| `DECLARE_FILL_COMPLETE` | Declares no more freight is going on. Gates sealing and departure |
| `REOPEN_FILL` | Reverses it, with a reason |
| `PULL_FROM_DOCK` | Requests removal from the dock; closes the DockStay on move start |

### 6.5 Shipment

| Action | Definition |
|---|---|
| `ASSIGN_SHIPMENT` | **Exception path.** Links an outbound shipment to a trailer **on site**, for preloads and unplanned loads. Appointment-driven work gets its rows from `BIND_TRAILER_TO_LEG` |
| `UNASSIGN_SHIPMENT` | Unlinks it. Only while `ASSIGNED` — never once loading has begun |
| `SEAL_TRAILER` | Records a seal. Requires fill complete and no part-loaded rows |
| `BREAK_SEAL` | Clears it, with a reason |

### 6.6 Trailer

| Action | Definition |
|---|---|
| `INTAKE_TRAILER` | Brings an unappointed return into the system as a tracked asset |
| `MARK_OUT_OF_SERVICE` | Blocks assignment and departure. Does **not** cancel an active session |
| `RETURN_TO_SERVICE` | Reverses it |

### 6.7 Corrections — all supervisor, all reason-coded

| Action | Definition |
|---|---|
| `CORRECT_TRAILER_IDENTITY` | Renumbers a misidentified trailer. Blocked during active work |
| `MERGE_TRAILERS` | Merges duplicate records. **Retires the duplicate, never deletes it** |
| `CORRECT_DEPARTURE` | Amends a completed check-out — restores the trailer that did not leave, including its preload |
| `ADJUST_STATE` | Manual override of any dimension. Logged prominently |

---

## 7. Derived flags and their labels

Computed, never stored. Internal name → what a user sees.

| Flag | Displayed | Meaning |
|---|---|---|
| `AWAITING_DOCK` | "Awaiting Dock" | Needs a dock. Applies to an arriving live load *and* a trailer dropped hours ago |
| `AT_DESTINATION` | *(no badge — implicit)* | Position matches destination. **Derived**; replaced the stored `SPOTTED` value |
| `SPOTTED` | "Spotted" | At a dock **and** sensor-confirmed. The narrow, correct sense |
| `UNRECORDED_DOCK_OCCUPANCY` | "Unknown at dock" | Sensor occupied, records show nothing there |
| `SPOT_UNCONFIRMED` | "Not at dock?" | Records show a trailer at the dock, sensor vacant |
| `UNRECORDED_DOCK_DEPARTURE` | "Left dock unrecorded" | Sensor went vacant while a stay or session was open |
| `TRACTOR_ATTACHED` | *(muted styling)* | A driver is hooked — needs a destination, not a move task. **A rendering of the stored `tractor` dimension (§5.1), not a computed flag** — it is listed here only because it occupies a badge slot |
| `NEEDS_MOVE` | "Needs move" | Position ≠ required position, and no open move task |
| `DROPPED_NO_DESTINATION` | "Dropped — no dock" | No tractor, no destination. **Your problem, unassigned** |
| `READY_TO_PULL` | "Ready to pull" | Work finished at a dock |
| `BLOCKING_DOCK` | "Blocking dock" | Ready to pull, and the dock is needed |
| `ACCEPTING_FREIGHT` | "Open — accepting" | Has freight, fill still `OPEN` |
| `READY_TO_DEPART` | "Ready to depart" | Matches its leg **in both directions**, fill complete, sealed, **and the driver has it** — one he dropped is waiting for a later visit, not ready to go |
| `PRELOAD_STAGED` | "Staged" | Loaded, sealed, awaiting pickup |
| `STAGED_AGING` | "Staged — aging" | Staged too long, or its pickup no-showed |
| `AVAILABLE_FOR_ASSIGNMENT` | "Available" | Ready, empty, in service, unassigned, on site — **the pool** |
| `NOT_READY` | "Not ready" | Readiness requirements outstanding |
| `AWAITING_ASSIGNMENT` | "Awaiting assignment" | At a dock, empty, nothing assigned — **an idle dock** |
| `PART_LOAD_HELD` | "Part load — blocked" | A part-loaded shipment blocks sealing and departure |
| `PARTIAL_RECEIPT` | "Partial receipt" | LTL trailer leaving with expected freight aboard. **Normal** |
| `UNEXPECTED_RESIDUAL` | "Unexpected freight" | Freight aboard that is not on the residual list |
| `EXPECTED_FREIGHT_MISSING` | "Freight not loaded" | A TAKE leg's expected shipments are not all aboard at authorization — the load is still in the building. The other direction of the same check (model §6.1) |
| `DETENTION_RISK` | "Detention risk" | Live visit approaching free-time |
| `PAST_WINDOW` | "Past window" | Beyond the appointment window, not departed |
| `OUTSIDE_PERIMETER` | "Outside gate" | In a lot with `inside_fence = false` |
| `FREIGHT_OUTSIDE_PERIMETER` | "Freight outside gate" | Loaded trailer in an outside lot — **a misplacement, not a theft** |
| `FIRST_VISIT` | "First visit" | No history here — genuinely new, or a mistyped number |
| `ID_DISPUTED` | "ID disputed" | Manual and camera readings disagree |
| `ID_SINGLE_SOURCE` | "ID unconfirmed" | Only one reading where two were expected |
| `ENTERED_WITHOUT_CHECKIN` | "Unauthorized entry" | Gate read with no registration. **Security, not data cleanup** |
| `UNDECLARED_TRAILER_EXIT` | "Wrong trailer left" | Exit read ≠ declaration. Detected after departure |
| `DECLARED_SUBSTITUTION` | "Substituted" | Leg amended at checkout. Normal |
| `SUBSTITUTE_CARRIES_FREIGHT` | "Substitute loaded" | A substitution involving loaded freight |
| `PICKUP_NOT_TAKEN` | "Pickup not taken" | Departed bobtail where a trailer was expected |
| `DEPARTED_WITHOUT_AUTHORIZATION` | "Left unauthorized" | Exit with no authorized visit. Security |
| `RECOVERY_WINDOW_OPEN` | "Recoverable" | Recent enough that the driver is reachable. **Decays** |
| `SPOT_CONFLICT` | "Spot conflict" | Two trailers reported in one numbered spot |
| `POSITION_STALE` | "Position unconfirmed" | Reported but not verified by the last yard check |
| `PLACEMENT_VARIANCE` | "Placed elsewhere" | Actual destination ≠ requested |
| `UNVERIFIED_ASSIGNMENT` | "Empty unverified" | Assigned on a claimed-empty trailer |
| `INTEGRITY_ALARM` | "Needs review" | State contradiction. **Not a valid state** |

---

## 8. Views and queues

| Name | Shape | Contents |
|---|---|---|
| **Dock Assignment Queue** | Ordered | Visits and trailers at `AWAITING_ASSIGNMENT`. **Upstream of the dock work queue** |
| **Move Queue** | Ordered | MoveTasks. 100% yard-team work by construction |
| **Dock Work Queue** | Ordered | Docks and candidate sessions |
| **Recovery Queue** | Ordered by **decay** | Undeclared exits. **Newest first** — inverts every other queue |
| **Available Pool** | A **count** | `AVAILABLE_FOR_ASSIGNMENT`. A stock view, not a queue |
| **Identification Queue** | Ordered | Disputed and unmatched readings |
| **Effective Config** | Read-only | What one facility currently runs, with last-changed actor |

---

## 9. Config keys

| Key | Kind | Default |
|---|---|---|
| `readiness_requirements` | **List** | Empty — collapses the readiness dimension |
| `require_readiness_before_assignment` | Flag | Off |
| `roles_can_declare_fill_complete` | Roles | Facility-defined |
| `roles_can_override_session_outcome` | Roles | Supervisor |
| `roles_can_resolve_identification` | Roles | Facility-defined |
| `allow_add_shipment_to_active_session` | Flag | On |
| `auto_create_move_on_dock_assignment` | Flag | Facility choice |
| `admit_live_load_without_dock` | Flag | Facility choice |
| `dock_presence_sensors` | Flag | Where installed — changes whether spot-in is auto-confirmed |
| `identification_sources` | List | Guard / driver / camera |
| `enable_near_match_warning` | Flag | On where no camera |
| `exit_identification_enabled` | Flag | Where cameras exist |
| `pickup_mode` | Enum | `DIRECTED` / `SELF_SERVICE`, per carrier |
| `departure_time_source` | Enum | Exit read where available |
| `recovery_alert_routing` | Routing | Facility-defined |
| `staged_aging_thresholds` | Thresholds | **Deliberately unset** until measured |
| `detention_free_time` | Duration | Per carrier agreement |
| `reconciliation_schedule` | Schedule | Daily |
| `yard_spot_inventory`, `lots` | Inventory | Per facility |

---

## 10. Industry synonyms

What people say → what the system calls it.

| Said in the yard | Canonical |
|---|---|
| "Shag," "jockey," "hostler," "spotter" | The yard team executing `MoveTask`s |
| "Spot it at 27" | `CREATE_MOVE_TASK` to dock 27, then `COMPLETE_MOVE`. The trailer becomes `SPOTTED` when the sensor confirms |
| "Bump the dock," "bump the door" | `START_SESSION` |
| "Live unload," "live" | `visit_type = LIVE` |
| "Drop and hook" | An appointment with both a BRING and a TAKE leg naming different trailers |
| "Bobtail" | Tractor with no trailer — `NO_TRAILER` on a leg or exit read |
| "Preload," "pre-stage" *(the state)* | Outbound shipment `STAGED` on a sealed trailer |
| "Preload" *(the appointment)* | **Outbound preload** — one appointment, two visits: brings an empty trailer, returns for it loaded (§4 pattern 4a) |
| "Picking up a preload," "grabbing a load" | **Outbound pickup** — one visit, taking a trailer another appointment loaded (§4 pattern 4) |
| "Empty," "MT" | Load state `EMPTY` |
| "Detention," "waiting time" | Time from the detention start timestamp to `CHECK_OUT` |
| "Yard check," "yard audit," "trailer count" | `YardCheck` |
| "Wash bay," "trailer wash" | A readiness requirement |
| "Gate pass" | `Dockpass` |

---

## 11. Pending naming decisions

1. ~~`CLEAR_VISIT` → `AUTHORIZE_DEPARTURE`~~ — **applied in v0.4.** The state `CLEARED` became `AUTHORIZED_TO_DEPART` and `DEPARTED_WITHOUT_CLEARANCE` became `DEPARTED_WITHOUT_AUTHORIZATION`. No identifier now contains "clear".
2. **`AT_GATE_IN` / `AT_GATE_OUT`** read as jargon. "Inbound apron" and "exit lane" are what staff would say. Worth considering for labels, though the internal names are fine.
3. **`PART_LOADED`** versus "partially loaded." The abbreviation saves nothing and reads like a typo.
4. **`fill_declaration`** is precise but stilted. "Load complete" is what a dock lead would say, and the label should probably differ from the field name (§1.1).
