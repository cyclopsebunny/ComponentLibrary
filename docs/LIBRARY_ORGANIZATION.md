# Library organization & component roadmap

This document describes how we structure `@component-library/core` and the order we plan to add components. Share this with anyone using the Figma library + code preview.

## Repository layout

```
packages/component-library/
├── src/
│   ├── components/           # React components (one primary component per file)
│   │   ├── primitives/     # (optional) Text, Icon wrapper, VisuallyHidden — add when needed
│   │   ├── Button.tsx
│   │   └── index.ts        # Barrel exports only (public API)
│   ├── tokens/             # Generated from Figma; do not hand-edit after generation
│   ├── styles/
│   │   └── index.css       # Global CSS variables (generated from Figma)
│   └── index.ts            # Package entry: components + tokens side-effect import of styles
├── scripts/                # Figma sync, generate-*, validate
└── docs/                   # Human-facing notes (this file)

apps/example-app/
└── src/
    ├── preview/            # Tab shell: Overview, Tokens & CSS, route to showcases
    └── components/         # Showcases per area + LocationPickerRightNavShowcase
```

Keep **every exported component** represented in the example app: either its own tab/section or grouped (e.g. all navigation under **Side Panel Navigation**). When you add `export { NewThing }` to `src/components/index.ts`, add a demo here in the same PR.

### Conventions

| Area | Rule |
|------|------|
| **New UI component** | Add `ComponentName.tsx` under `src/components/` (or a subfolder if the component has colocated small pieces). Export from `src/components/index.ts`. |
| **Tokens & CSS** | Regenerated from `scripts/figma-raw/` via `generate-tokens` — preview surfaces them but does not redefine them. |
| **Preview / demo** | Lives in `apps/example-app/src/preview/` so the package stays lean; designers open the example app to review. |

### Optional future split (only if the flat folder gets crowded)

- `components/primitives/` — Text, Label, Icon
- `components/layout/` — Stack, Inline, Divider, Card shell
- `components/forms/` — Input, Select, Checkbox, Radio
- `components/feedback/` — Badge, Tooltip, Banner

Until there are many files, a single `components/` folder is fine.

---

## Priority list — next components

Order is optimized for **prototype screens**: layout and forms first, then density and navigation.

1. **Text / typography** — Mapped to Figma text styles; avoids ad-hoc font sizes in every screen.
2. **Card (surface)** — Container for content blocks; almost every screen needs it.
3. **Stack / spacing layout** — Vertical/horizontal rhythm using spacing tokens (can start as a thin flex wrapper).
4. **Text field + Label** — Single-line input for forms and filters.
5. **Select / dropdown** — Common in settings and flows (start with native `<select>` styled if needed).
6. **Checkbox + Radio** — Forms and lists of options.
7. **Divider** — Sections and list separators.
8. **Badge / tag** — Status, counts, filters.
9. **List row** — Settings rows, simple lists (leading/trailing slot pattern).
10. **Tabs** — Multi-panel prototypes without full routing.
11. **Modal / dialog** — Overlays for confirmations and wizards (more interaction complexity).
12. **Toast / inline alert** — Feedback after actions.

Revisit order after the Figma library lists what your team actually uses most (e.g. if tables are central, bump a **Table** or **Data row** item earlier).

---

## Figma ↔ code alignment

- Component names and **variants** in Figma should match props (or a documented mapping) so Code Connect and generation scripts stay straightforward.
- When adding a component: **Figma component first** → extract or implement in code → add a **preview section** in `apps/example-app` → optional Code Connect mapping in repo.
