import React, { useCallback, useRef, useState } from 'react';
import {
  BellWithBadge,
  CommunityIcon,
  FacilityIcon,
  LocationPicker,
  RightNav,
  RightNavMobileStrip,
  SearchDefaultIcon,
  SettingsOutlinedIcon,
  UserMenu,
  type PickerLocation,
  type RightNavItem,
  type UserMenuItem,
} from '@component-library/core';

const DEMO_LOCATIONS: PickerLocation[] = [
  {
    id: '1',
    name: 'Drake Terrace',
    subtitle: 'Community · Wheaton, IL',
    icon: <CommunityIcon tier="premium" size={28} />,
  },
  {
    id: '2',
    name: 'Demo Facility',
    subtitle: 'Enterprise · Chicago, IL',
    icon: <FacilityIcon size={22} />,
  },
  {
    id: '3',
    name: 'North Campus',
    subtitle: 'Enterprise · Evanston, IL',
    icon: <FacilityIcon size={22} />,
  },
];

const USER_MENU_ITEMS: UserMenuItem[] = [
  { id: 'profile', label: 'Profile', path: '/profile' },
  { id: 'account', label: 'Account settings', path: '/account' },
  { id: 'logout', label: 'Log out', path: null, dividerBefore: true, destructive: true },
];

const makeRightItems = (onMenuLog: (msg: string) => void): RightNavItem[] => [
  { id: 'search', label: 'Search', icon: <SearchDefaultIcon size={20} />, onClick: () => onMenuLog('Search') },
  {
    id: 'alerts',
    label: 'Alerts',
    icon: <BellWithBadge size={22} hasAlert />,
    alert: true,
    onClick: () => onMenuLog('Alerts'),
  },
  { id: 'settings', label: 'Settings', icon: <SettingsOutlinedIcon size={20} />, onClick: () => onMenuLog('Settings') },
];

const section: React.CSSProperties = {
  marginBottom: '2.5rem',
  padding: '1.5rem',
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
  marginBottom: '1.25rem',
  fontSize: 14,
};

export const LocationPickerRightNavShowcase: React.FC = () => {
  const [selectedId, setSelectedId] = useState('1');
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stripOpen, setStripOpen] = useState(true);
  const [railLog, setRailLog] = useState<string>('—');
  const [menuLog, setMenuLog] = useState<string>('—');
  const mobileBtnRef = useRef<HTMLButtonElement>(null);
  const [mobileRect, setMobileRect] = useState<DOMRect | null>(null);

  const rightItems = makeRightItems((msg) => setRailLog(msg));

  const openMobilePicker = useCallback(() => {
    setMobileRect(mobileBtnRef.current?.getBoundingClientRect() ?? null);
    setMobileOpen(true);
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: 1200, margin: 0 }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>LocationPicker &amp; RightNav</h1>
        <p style={{ color: '#666', fontSize: '1.05rem' }}>
          Location switcher overlay, <strong>UserMenu</strong>, <strong>BellWithBadge</strong>, and right-rail actions
          (desktop + mobile strip).
        </p>
      </header>

      <section style={section}>
        <h2 style={sectionTitle}>BellWithBadge</h2>
        <p style={sectionDesc}>Notification bell with optional red dot.</p>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <BellWithBadge size={28} hasAlert />
            <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>hasAlert</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <BellWithBadge size={28} hasAlert={false} />
            <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>no alert</p>
          </div>
        </div>
      </section>

      <section style={section}>
        <h2 style={sectionTitle}>UserMenu</h2>
        <p style={sectionDesc}>
          Avatar opens a frosted menu. <code>placement=&quot;left&quot;</code> for the rail;{' '}
          <code>&quot;below&quot;</code> for mobile-style anchoring.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#888', marginBottom: 8 }}>placement left</p>
            <UserMenu
              size={40}
              placement="left"
              activePath="/profile"
              menuItems={USER_MENU_ITEMS}
              onItemClick={(item) => setMenuLog(`${item.label} (${item.path ?? 'action'})`)}
            />
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#888', marginBottom: 8 }}>placement below</p>
            <UserMenu
              size={40}
              placement="below"
              menuItems={USER_MENU_ITEMS}
              onItemClick={(item) => setMenuLog(`${item.label}`)}
            />
          </div>
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: '#64748b' }}>
          Last menu action: <code>{menuLog}</code>
        </p>
      </section>

      <section style={section}>
        <h2 style={sectionTitle}>LocationPicker — desktop (offset from left)</h2>
        <p style={sectionDesc}>
          Opens from a fixed offset to align with a sidebar. Uses a left-pointing arrow when not in mobile mode.
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <div
            style={{
              width: 220,
              minHeight: 120,
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: 8,
              padding: 16,
              fontSize: 13,
              color: '#64748b',
            }}
          >
            Fake sidebar (220px). Picker uses <code>offsetLeft={'{220}'}</code>.
          </div>
          <div>
            <button
              type="button"
              onClick={() => setDesktopOpen(true)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #0a76db',
                background: '#fff',
                color: '#0a76db',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Open location picker
            </button>
            <p style={{ marginTop: 12, fontSize: 13, color: '#888' }}>
              Selected: <strong style={{ color: '#191919' }}>{DEMO_LOCATIONS.find((l) => l.id === selectedId)?.name}</strong>
            </p>
          </div>
        </div>
        {desktopOpen && (
          <LocationPicker
            locations={DEMO_LOCATIONS}
            selectedId={selectedId}
            offsetLeft={220}
            onClose={() => setDesktopOpen(false)}
            onSelect={(id) => setSelectedId(id)}
          />
        )}
      </section>

      <section style={section}>
        <h2 style={sectionTitle}>LocationPicker — mobile (anchored below trigger)</h2>
        <p style={sectionDesc}>
          Set <code>mobile</code> and pass <code>anchorRect</code> from the trigger button&apos;s{' '}
          <code>getBoundingClientRect()</code> for placement under the top bar.
        </p>
        <button
          ref={mobileBtnRef}
          type="button"
          onClick={openMobilePicker}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid #cbd5e1',
            background: '#fff',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Choose location (mobile)
        </button>
        {mobileOpen && (
          <LocationPicker
            locations={DEMO_LOCATIONS}
            selectedId={selectedId}
            mobile
            anchorRect={mobileRect}
            onClose={() => setMobileOpen(false)}
            onSelect={(id) => setSelectedId(id)}
          />
        )}
      </section>

      <section style={section}>
        <h2 style={sectionTitle}>RightNav — desktop / tablet rail</h2>
        <p style={sectionDesc}>
          64px column: <strong>UserMenu</strong> on top, then icon actions (here: Search,{' '}
          <strong>BellWithBadge</strong>, Settings). Uses <code>paddingTop</code> / <code>gap</code> props.
        </p>
        <div
          style={{
            display: 'flex',
            height: 420,
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            overflow: 'hidden',
            background: '#f4f6f8',
          }}
        >
          <div style={{ flex: 1, padding: 20, fontSize: 14, color: '#64748b' }}>
            Main content
            <p style={{ marginTop: 12, fontSize: 12, color: '#94a3b8' }}>Rail log: {railLog}</p>
          </div>
          <RightNav
            paddingTop={24}
            gap={20}
            items={rightItems}
            avatar={
              <UserMenu
                size={40}
                placement="left"
                activePath="/profile"
                menuItems={USER_MENU_ITEMS}
                onItemClick={(item) => setRailLog(`menu: ${item.label}`)}
              />
            }
          />
        </div>
      </section>

      <section style={section}>
        <h2 style={sectionTitle}>RightNavMobileStrip</h2>
        <p style={sectionDesc}>
          Slides in from the right; <strong>UserMenu</strong> at top, then actions. Toggle <code>isOpen</code> below.
        </p>
        <button
          type="button"
          onClick={() => setStripOpen((o) => !o)}
          style={{
            marginBottom: 16,
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid #0a76db',
            background: stripOpen ? '#0a76db' : '#fff',
            color: stripOpen ? '#fff' : '#0a76db',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {stripOpen ? 'Hide mobile strip' : 'Show mobile strip'}
        </button>
        <div style={{ position: 'relative', height: 200, background: '#fff', border: '1px dashed #cbd5e1', borderRadius: 8 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 40, background: '#fff', borderBottom: '1px solid #e2e8f0' }} />
          <RightNavMobileStrip
            isOpen={stripOpen}
            items={rightItems}
            avatar={
              <UserMenu size={36} placement="below" menuItems={USER_MENU_ITEMS} onItemClick={(i) => setRailLog(`mobile menu: ${i.label}`)} />
            }
          />
        </div>
      </section>
    </div>
  );
};
