import React, { useState, useRef } from 'react';
import { Tabs, TabButton, type TabItem } from '@component-library/core';

const section: React.CSSProperties = {
  marginBottom: '3rem',
  padding: '2rem',
  background: '#f9f9f9',
  borderRadius: 8,
};

const sectionTitle: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
  color: '#17191c',
};

const sectionDesc: React.CSSProperties = {
  color: '#666',
  marginBottom: '1.5rem',
  fontSize: 14,
};

const row: React.CSSProperties = {
  display: 'flex',
  gap: 32,
  flexWrap: 'wrap',
  alignItems: 'flex-start',
};

const sublabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: '#888',
  marginBottom: 12,
};

const DEMO_TABS: TabItem[] = [
  { id: 'overview',    label: 'Overview' },
  { id: 'schedule',    label: 'Schedule' },
  { id: 'access',      label: 'Access' },
  { id: 'settings',    label: 'Settings' },
];

const ENTERPRISE_TABS: TabItem[] = [
  { id: 'operations',  label: 'Operations' },
  { id: 'monitor',     label: 'Monitor' },
  { id: 'data',        label: 'Data' },
  { id: 'analyze',     label: 'Analyze' },
  { id: 'disabled',    label: 'Disabled tab', disabled: true },
];

const MANY_TABS: TabItem[] = [
  { id: 'overview',    label: 'Overview' },
  { id: 'schedule',    label: 'Schedule' },
  { id: 'access',      label: 'Access' },
  { id: 'users',       label: 'Users' },
  { id: 'devices',     label: 'Devices' },
  { id: 'reports',     label: 'Reports' },
  { id: 'analytics',   label: 'Analytics' },
  { id: 'settings',    label: 'Settings' },
  { id: 'billing',     label: 'Billing' },
  { id: 'integrations',label: 'Integrations' },
];

export const TabsShowcase: React.FC = () => {
  const [active1, setActive1] = useState('overview');
  const [active2, setActive2] = useState('operations');
  const [activeBtn, setActiveBtn] = useState('b');
  const [activeMany, setActiveMany] = useState('overview');
  const [containerWidth, setContainerWidth] = useState(480);
  const sliderRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ padding: '2rem', maxWidth: 1400, margin: 0 }}>

      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Tabs</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          TabButton · Tabs — matched to the 4.0 Design System (node 48:12327)
        </p>
      </header>

      {/* ── 1. TabButton ────────────────────────────────────────────────────── */}
      <section style={section}>
        <h2 style={sectionTitle}>TabButton</h2>
        <p style={sectionDesc}>
          Individual pill tab. Active state uses brand blue + bold weight; inactive uses medium weight + gray text.
          Hover shows <code>#ececec</code> for inactive and a slightly darker blue for active.
        </p>
        <div style={row}>
          <div>
            <p style={sublabel}>Default (inactive)</p>
            <TabButton label="Label" />
          </div>
          <div>
            <p style={sublabel}>Active</p>
            <TabButton label="Label" active />
          </div>
          <div>
            <p style={sublabel}>Disabled</p>
            <TabButton label="Label" disabled />
          </div>
          <div>
            <p style={sublabel}>Disabled + Active</p>
            <TabButton label="Label" active disabled />
          </div>
        </div>

        {/* Interactive toggle */}
        <div style={{ marginTop: 32 }}>
          <p style={sublabel}>Interactive — click to toggle</p>
          <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', padding: '8px 12px', borderRadius: 12, display: 'inline-flex', gap: 8, border: '0.75px solid #d2efff' }}>
            {['a', 'b', 'c', 'd'].map((id) => (
              <TabButton
                key={id}
                label={`Tab ${id.toUpperCase()}`}
                active={activeBtn === id}
                onClick={() => setActiveBtn(id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Tabs ─────────────────────────────────────────────────────────── */}
      <section style={section}>
        <h2 style={sectionTitle}>Tabs</h2>
        <p style={sectionDesc}>
          Frosted-glass pill bar that wraps <code>TabButton</code> pills. Background{' '}
          <code>rgba(255,255,255,0.7)</code> + <code>backdrop-filter: blur(6px)</code>, 0.75 px{' '}
          <code>#d2efff</code> border on bottom/left/right, 16px radius.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div>
            <p style={sublabel}>4 tabs — "Overview" active</p>
            <Tabs
              items={DEMO_TABS}
              activeTab={active1}
              onTabChange={setActive1}
            />
            <p style={{ marginTop: 12, fontSize: 13, color: '#888' }}>
              Active: <strong style={{ color: '#191919' }}>{active1}</strong>
            </p>
          </div>

          <div>
            <p style={sublabel}>Enterprise tabs — with disabled item</p>
            <Tabs
              items={ENTERPRISE_TABS}
              activeTab={active2}
              onTabChange={setActive2}
            />
            <p style={{ marginTop: 12, fontSize: 13, color: '#888' }}>
              Active: <strong style={{ color: '#191919' }}>{active2}</strong>
            </p>
          </div>

          {/* Dark background to show the glass effect */}
          <div>
            <p style={sublabel}>On dark background — glass effect</p>
            <div style={{
              background: 'linear-gradient(135deg, #172dbd 0%, #0a76db 100%)',
              padding: '32px 24px',
              borderRadius: 12,
              display: 'inline-flex',
            }}>
              <Tabs
                items={DEMO_TABS}
                activeTab={active1}
                onTabChange={setActive1}
              />
            </div>
          </div>

          {/* On image-like gradient */}
          <div>
            <p style={sublabel}>On gradient — glass effect</p>
            <div style={{
              background: 'linear-gradient(135deg, #e0f3ff 0%, #c7e9fe 50%, #ddf4e8 100%)',
              padding: '32px 24px',
              borderRadius: 12,
              display: 'inline-flex',
            }}>
              <Tabs
                items={DEMO_TABS}
                activeTab={active1}
                onTabChange={setActive1}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Overflow / "•••" more button ─────────────────────────────────── */}
      <section style={section}>
        <h2 style={sectionTitle}>Overflow — "•••" more menu</h2>
        <p style={sectionDesc}>
          When the tab bar is too narrow to show all tabs, extra tabs collapse into a{' '}
          <code>•••</code> overflow button. Clicking it opens a frosted-glass dropdown
          (portaled to <code>document.body</code> so it's never clipped). Drag the
          slider below to resize the container and watch tabs collapse.
        </p>

        {/* Resizable demo */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <label style={{ ...sublabel, marginBottom: 0 }}>Container width:</label>
            <input
              ref={sliderRef}
              type="range"
              min={180}
              max={760}
              value={containerWidth}
              onChange={(e) => setContainerWidth(Number(e.target.value))}
              style={{ width: 200, cursor: 'pointer' }}
            />
            <code style={{ fontSize: 13, color: '#555', minWidth: 48 }}>{containerWidth}px</code>
          </div>
          <div style={{ width: containerWidth, transition: 'width 0.1s ease' }}>
            <Tabs
              items={MANY_TABS}
              activeTab={activeMany}
              onTabChange={setActiveMany}
            />
          </div>
          <p style={{ marginTop: 12, fontSize: 13, color: '#888' }}>
            Active: <strong style={{ color: '#191919' }}>{activeMany}</strong>
          </p>
        </div>

        {/* Fixed narrow example */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <p style={sublabel}>Narrow (320px) — most tabs hidden</p>
            <div style={{ width: 320 }}>
              <Tabs
                items={MANY_TABS}
                activeTab={activeMany}
                onTabChange={setActiveMany}
              />
            </div>
          </div>
          <div>
            <p style={sublabel}>Medium (500px) — some tabs hidden</p>
            <div style={{ width: 500 }}>
              <Tabs
                items={MANY_TABS}
                activeTab={activeMany}
                onTabChange={setActiveMany}
              />
            </div>
          </div>
          <div>
            <p style={sublabel}>Full width — all tabs visible</p>
            <Tabs
              items={MANY_TABS}
              activeTab={activeMany}
              onTabChange={setActiveMany}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
