import type { ReactNode } from 'react';

function InventoryList() {
  const rows = [
    {
      area: 'Components',
      items:
        'Button, CheckboxField, RadioField, SwitchField, SegmentedControl, SegmentedControlButton, SelectField, NavItem, LocationSelector, SideNavigation, TopNav, LeftNav, LocationPicker, RightNav, RightNavMobileStrip, UserMenu, BellWithBadge, Tabs, TabButton, SubNav, SubNavLink',
    },
    { area: 'Icons (package)', items: 'Nav icons (Dashboard, Users, …) + large Icons.tsx set — see Icons tab' },
    { area: 'Tokens & CSS', items: 'Colors, semantic/component colors, spacing, typography, shadows — see Tokens tab' },
  ];
  return (
    <div style={{ overflowX: 'auto', border: '1px solid #e8e8e8', borderRadius: 8, marginBottom: '1.5rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
            <th style={{ padding: '10px 14px', fontWeight: 600 }}>Area</th>
            <th style={{ padding: '10px 14px', fontWeight: 600 }}>In this library</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.area} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: '10px 14px', verticalAlign: 'top', whiteSpace: 'nowrap', color: '#333' }}>{r.area}</td>
              <td style={{ padding: '10px 14px', color: '#444', lineHeight: 1.5 }}>{r.items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RoadmapList() {
  const items = [
    'Text / typography — Figma text styles in code',
    'Card (surface) — content containers',
    'Stack / spacing layout — vertical/horizontal rhythm from tokens',
    'Text field + Label',
    'Select / dropdown',
    'Checkbox + Radio',
    'Divider',
    'Badge / tag',
    'List row',
    'Modal / dialog',
    'Toast / inline alert',
  ];

  return (
    <ol style={{ paddingLeft: '1.25rem', lineHeight: 1.7, color: '#333' }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: 6 }}>
          {item}
        </li>
      ))}
    </ol>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        padding: '1rem 1.25rem',
        marginBottom: '1.25rem',
        background: '#fafafa',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, color: '#444', lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

export function OverviewSection() {
  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: 0 }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>Component library preview</h1>
        <p style={{ color: '#666', fontSize: '1.05rem' }}>
          Prototype-oriented workspace: Figma-led tokens and components. Use the tabs above to browse tokens, global
          CSS, and live components.
        </p>
      </header>

      <Callout title="Where things live">
        <strong>Package:</strong> <code>packages/component-library/src/</code> — components, tokens, and{' '}
        <code>styles/index.css</code>.<br />
        <strong>Showcase only:</strong> <code>apps/example-app/src/preview/</code> — not published with the package.
        <br />
        <strong>Team doc:</strong> repo root <code>docs/LIBRARY_ORGANIZATION.md</code> (folder conventions + full
        notes).
      </Callout>

      <Callout title="Adding a new component">
        Add <code>ComponentName.tsx</code> under <code>src/components/</code>, export it from{' '}
        <code>src/components/index.ts</code>, then add a section in this preview app (or extend an existing showcase).
        Regenerate tokens/styles from Figma when variables change.
      </Callout>

      <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem' }}>What&apos;s in the package now</h2>
      <p style={{ color: '#666', marginBottom: 12, fontSize: 14 }}>
        Mirror of <code>@component-library/core</code> public exports. Preview tabs: Button, Checkbox, Radio, Side
        Panel Navigation (incl. SubNav), Location &amp; right rail, Tabs, Icons, Tokens.
      </p>
      <InventoryList />

      <h2 style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Next components (priority)</h2>
      <p style={{ color: '#666', marginBottom: 12, fontSize: 14 }}>
        Ordered for prototype screens; adjust based on what your Figma library uses most.
      </p>
      <RoadmapList />
    </div>
  );
}
