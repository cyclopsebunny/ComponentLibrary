import React, { useState } from 'react';
import {
  NavItem,
  LocationSelector,
  SideNavigation,
  LeftNav,
  TopNav,
  SubNav,
  SubNavLink,
  type SideNavItem,
  type SubNavItem as SubNavItemType,
  DashboardIcon,
  UsersIcon,
  MonitorIcon,
  AccessIcon,
  AnalyzeIcon,
  SettingsIcon,
  PlansIcon,
  OperationsIcon,
  ScheduleIcon,
  DataIcon,
  FacilityIcon,
  CommunityIcon,
} from '@component-library/core';

const SUBNAV_ITEMS: SubNavItemType[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'history', label: 'History' },
  { id: 'disabled', label: 'Coming soon', disabled: true },
];

// ── Nav item datasets ─────────────────────────────────────────────────────────

const COMMUNITY_NAV: SideNavItem[] = [
  { id: 'dashboard', label: 'Dashboard',  icon: <DashboardIcon /> },
  { id: 'users',     label: 'Users',      icon: <UsersIcon /> },
  { id: 'monitor',   label: 'Monitor',    icon: <MonitorIcon /> },
  { id: 'access',    label: 'Access',     icon: <AccessIcon /> },
  { id: 'analyze',   label: 'Analyze',    icon: <AnalyzeIcon /> },
  { id: 'settings',  label: 'Settings',   icon: <SettingsIcon /> },
  { id: 'plans',     label: 'Plans',      icon: <PlansIcon /> },
];

const ENTERPRISE_NAV: SideNavItem[] = [
  { id: 'operations', label: 'Operations', icon: <OperationsIcon /> },
  { id: 'schedule',   label: 'Schedule',   icon: <ScheduleIcon /> },
  { id: 'monitor',    label: 'Monitor',    icon: <MonitorIcon /> },
  { id: 'access',     label: 'Access',     icon: <AccessIcon /> },
  { id: 'users',      label: 'Users',      icon: <UsersIcon /> },
  { id: 'data',       label: 'Data',       icon: <DataIcon /> },
  { id: 'analyze',    label: 'Analyze',    icon: <AnalyzeIcon /> },
  { id: 'settings',   label: 'Settings',   icon: <SettingsIcon /> },
];

// ── Shared styles ─────────────────────────────────────────────────────────────

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
  marginBottom: 8,
};

// ── Icon grid helper ──────────────────────────────────────────────────────────

const ALL_ICONS = [
  { name: 'Dashboard',   Icon: DashboardIcon   },
  { name: 'Users',       Icon: UsersIcon       },
  { name: 'Monitor',     Icon: MonitorIcon     },
  { name: 'Access',      Icon: AccessIcon      },
  { name: 'Analyze',     Icon: AnalyzeIcon     },
  { name: 'Settings',    Icon: SettingsIcon    },
  { name: 'Plans',       Icon: PlansIcon       },
  { name: 'Operations',  Icon: OperationsIcon  },
  { name: 'Schedule',    Icon: ScheduleIcon    },
  { name: 'Data',        Icon: DataIcon        },
];

// ── Showcase component ────────────────────────────────────────────────────────

export const NavigationShowcase: React.FC = () => {
  const [communityActive, setCommunityActive] = useState('dashboard');
  const [enterpriseActive, setEnterpriseActive] = useState('operations');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileCommOpen, setMobileCommOpen] = useState(false);
  const [mobileEntOpen, setMobileEntOpen] = useState(false);
  const [subNavActive, setSubNavActive] = useState('overview');

  return (
    <div style={{ padding: '2rem', maxWidth: 1400, margin: 0 }}>

      {/* Header */}
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Navigation</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          NavItem · LocationSelector · SideNavigation · TopNav · LeftNav · SubNav · SubNavLink — 4.0 Design System
          (Enterprise)
        </p>
      </header>

      {/* ── 0. Icon sprites ─────────────────────────────────────────────────── */}
      <section style={section}>
        <h2 style={sectionTitle}>Nav Icons — Outlined &amp; Filled states</h2>
        <p style={sectionDesc}>
          10 icons extracted directly from the 4.0 Design System Figma file. Each ships an
          outlined (default) and a filled (active/selected) variant via the <code>active</code> prop.
          All use <code>currentColor</code> — color is driven by the parent <code>NavItem</code>.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Column headers */}
          <div style={{ display: 'flex', gap: 24, paddingLeft: 80 }}>
            <span style={{ ...sublabel, width: 56, textAlign: 'center' }}>Outlined</span>
            <span style={{ ...sublabel, width: 56, textAlign: 'center' }}>Filled</span>
          </div>
          {ALL_ICONS.map(({ name, Icon }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ width: 72, fontSize: 12, color: '#555', textAlign: 'right' }}>{name}</span>
              {/* Outlined */}
              <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', borderRadius: 8, border: '1px solid #e2e8f0', color: '#191919' }}>
                <Icon size={22} active={false} />
              </div>
              {/* Filled / selected */}
              <div style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e0ebff', borderRadius: 8, border: '1px solid #b3d0ff', color: '#0a76db' }}>
                <Icon size={22} active={true} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 1. NavItem ──────────────────────────────────────────────────────── */}
      <section style={section}>
        <h2 style={sectionTitle}>NavItem</h2>
        <p style={sectionDesc}>The atomic navigation row. Active item uses brand blue + bold; inactive uses medium weight + 8px border-radius hover.</p>
        <div style={row}>
          <div>
            <p style={sublabel}>Default</p>
            <NavItem label="Dashboard" icon={<DashboardIcon />} />
          </div>
          <div>
            <p style={sublabel}>Active</p>
            <NavItem label="Dashboard" icon={<DashboardIcon />} active />
          </div>
          <div>
            <p style={sublabel}>Collapsed (icon only)</p>
            <NavItem label="Dashboard" icon={<DashboardIcon />} collapsed />
          </div>
          <div>
            <p style={sublabel}>Collapsed + Active</p>
            <NavItem label="Dashboard" icon={<DashboardIcon />} active collapsed />
          </div>
          <div>
            <p style={sublabel}>No icon</p>
            <NavItem label="Settings" />
          </div>
        </div>
      </section>

      {/* ── 2. LocationSelector ─────────────────────────────────────────────── */}
      <section style={section}>
        <h2 style={sectionTitle}>LocationSelector</h2>
        <p style={sectionDesc}>Facility / community picker shown below the logo. Click opens a location picker (handler wired separately).</p>
        <div style={row}>
          <div>
            <p style={sublabel}>Community (expanded)</p>
            <LocationSelector
              name="Drake Terrace"
              location="Wheaton, IL"
              icon={<CommunityIcon tier="premium" size={28} />}
              style={{ width: 180 }}
            />
          </div>
          <div>
            <p style={sublabel}>Enterprise (expanded)</p>
            <LocationSelector
              name="Demo Facility"
              location="Chicago, IL"
              icon={<FacilityIcon size={22} />}
              style={{ width: 180 }}
            />
          </div>
          <div>
            <p style={sublabel}>Collapsed (icon only)</p>
            <LocationSelector
              name="Drake Terrace"
              location="Wheaton, IL"
              icon={<CommunityIcon tier="premium" size={28} />}
              collapsed
            />
          </div>
        </div>
      </section>

      {/* ── 3. SideNavigation ───────────────────────────────────────────────── */}
      <section style={section}>
        <h2 style={sectionTitle}>SideNavigation</h2>
        <p style={sectionDesc}>The nav item list. Click an item to change the active route. Supports collapsed (icon-only) mode.</p>
        <div style={row}>
          <div>
            <p style={sublabel}>Community — expanded</p>
            <SideNavigation
              items={COMMUNITY_NAV}
              activeItem={communityActive}
              onItemClick={setCommunityActive}
              style={{ width: 160, background: '#fff', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}
            />
          </div>
          <div>
            <p style={sublabel}>Enterprise — expanded</p>
            <SideNavigation
              items={ENTERPRISE_NAV}
              activeItem={enterpriseActive}
              onItemClick={setEnterpriseActive}
              style={{ width: 160, background: '#fff', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}
            />
          </div>
          <div>
            <p style={sublabel}>Community — collapsed</p>
            <SideNavigation
              items={COMMUNITY_NAV}
              activeItem={communityActive}
              onItemClick={setCommunityActive}
              collapsed
              style={{ width: 56, background: '#fff', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}
            />
          </div>
          <div>
            <p style={sublabel}>Enterprise — collapsed</p>
            <SideNavigation
              items={ENTERPRISE_NAV}
              activeItem={enterpriseActive}
              onItemClick={setEnterpriseActive}
              collapsed
              style={{ width: 56, background: '#fff', padding: 8, borderRadius: 8, border: '1px solid #e2e8f0' }}
            />
          </div>
        </div>
      </section>

      {/* ── 4. TopNav (mobile / phone breakpoint) ───────────────────────────── */}
      <section style={section}>
        <h2 style={sectionTitle}>TopNav — Mobile Navigation</h2>
        <p style={sectionDesc}>
          Replaces the side panel on phone-size breakpoints. A 40 px top bar shows the hamburger, logo, and avatar.
          Tapping the hamburger slides open a drawer with the location selector and nav list. Tapping an item closes the drawer.
        </p>
        <div style={row}>
          {/* Community mobile */}
          <div style={{ flex: '1 1 360px', minWidth: 280, maxWidth: 420 }}>
            <p style={sublabel}>Community — phone</p>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
              <TopNav
                application="community"
                appName="Community"
                navItems={COMMUNITY_NAV}
                activeItem={communityActive}
                onNavItemClick={setCommunityActive}
                location={{ name: 'Drake Terrace', location: 'Wheaton, IL', icon: <CommunityIcon tier="premium" size={28} /> }}
                open={mobileCommOpen}
                onOpenChange={setMobileCommOpen}
              />
              {/* Placeholder page content */}
              {!mobileCommOpen && (
                <div style={{ height: 160, background: '#f4f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 13 }}>
                  Page content
                </div>
              )}
            </div>
          </div>

          {/* Enterprise mobile */}
          <div style={{ flex: '1 1 360px', minWidth: 280, maxWidth: 420 }}>
            <p style={sublabel}>Enterprise — phone</p>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
              <TopNav
                application="enterprise"
                appName="Enterprise"
                navItems={ENTERPRISE_NAV}
                activeItem={enterpriseActive}
                onNavItemClick={setEnterpriseActive}
                location={{ name: 'Demo Facility', location: 'Chicago, IL', icon: <FacilityIcon size={22} /> }}
                open={mobileEntOpen}
                onOpenChange={setMobileEntOpen}
              />
              {!mobileEntOpen && (
                <div style={{ height: 160, background: '#f4f6f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: 13 }}>
                  Page content
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. LeftNav ──────────────────────────────────────────────────────── */}
      <section style={section}>
        <h2 style={sectionTitle}>LeftNav — Full Sidebar</h2>
        <p style={sectionDesc}>
          Composes logo, location selector, navigation list, and footer. Toggle collapsed mode with the button below.
        </p>

        {/* Collapsed toggle */}
        <div style={{ marginBottom: 24 }}>
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid #0a76db',
              background: collapsed ? '#0a76db' : '#fff',
              color: collapsed ? '#fff' : '#0a76db',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {collapsed ? '⇥  Show expanded (220px)' : '⇤  Show collapsed (84px)'}
          </button>
        </div>

        <div style={row}>
          {/* Community sidebar */}
          <div>
            <p style={sublabel}>Community</p>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'inline-flex' }}>
              <LeftNav
                application="community"
                appName="Community"
                navItems={COMMUNITY_NAV}
                activeItem={communityActive}
                onNavItemClick={setCommunityActive}
                location={{ name: 'Drake Terrace', location: 'Wheaton, IL', icon: <CommunityIcon tier="premium" size={28} /> }}
                collapsed={collapsed}
                height={560}
              />
            </div>
          </div>

          {/* Enterprise sidebar */}
          <div>
            <p style={sublabel}>Enterprise</p>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', display: 'inline-flex' }}>
              <LeftNav
                application="enterprise"
                appName="Enterprise"
                navItems={ENTERPRISE_NAV}
                activeItem={enterpriseActive}
                onNavItemClick={setEnterpriseActive}
                location={{ name: 'Demo Facility', location: 'Chicago, IL', icon: <FacilityIcon size={22} /> }}
                collapsed={collapsed}
                height={560}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SubNavLink & SubNav (third-level nav) ───────────────────────── */}
      <section style={section}>
        <h2 style={sectionTitle}>SubNavLink &amp; SubNav</h2>
        <p style={sectionDesc}>
          Third-level vertical navigation (left-nav → tabs → sub-nav → content). Frosted-glass panel matches the Tabs
          aesthetic. <code>SubNav</code> composes <code>SubNavLink</code> rows.
        </p>

        <div style={{ marginBottom: 28 }}>
          <p style={sublabel}>SubNavLink — individual states</p>
          <div style={{ ...row, alignItems: 'center' }}>
            <div style={{ width: 200 }}>
              <SubNavLink label="Default" />
            </div>
            <div style={{ width: 200 }}>
              <SubNavLink label="Active" active />
            </div>
            <div style={{ width: 200 }}>
              <SubNavLink label="Disabled" disabled />
            </div>
          </div>
        </div>

        <div>
          <p style={sublabel}>SubNav — with placeholder content</p>
          <div
            style={{
              display: 'flex',
              gap: 24,
              alignItems: 'stretch',
              flexWrap: 'wrap',
              padding: 16,
              background: 'linear-gradient(135deg, #f4f8ff 0%, #eef6f0 100%)',
              borderRadius: 12,
              border: '1px solid #e2e8f0',
            }}
          >
            <SubNav
              items={SUBNAV_ITEMS}
              activeItem={subNavActive}
              onItemClick={setSubNavActive}
              style={{ width: 200, maxHeight: 280 }}
            />
            <div
              style={{
                flex: '1 1 240px',
                minHeight: 200,
                padding: 20,
                background: '#fff',
                borderRadius: 12,
                border: '1px solid #e8e8e8',
                fontSize: 14,
                color: '#555',
              }}
            >
              <strong style={{ color: '#17191c' }}>Content area</strong>
              <p style={{ marginTop: 12, lineHeight: 1.5 }}>
                Active sub-nav: <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: 4 }}>{subNavActive}</code>
              </p>
              <p style={{ marginTop: 8, fontSize: 13, color: '#888' }}>
                Use this pattern beside page body inside a main content card.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
