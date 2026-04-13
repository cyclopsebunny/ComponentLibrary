import React from 'react';
import { SideNavigation, SideNavItem } from './SideNavigation';
import { LocationSelector, LocationSelectorProps } from './LocationSelector';
import { MyQLogo } from '../icons/NavIcons';

export type LeftNavApplication = 'community' | 'enterprise';

export interface LeftNavProps {
  /**
   * Application type — 'community' or 'enterprise'.
   * Affects the label shown next to the logo and the default footer links
   * when `footerLinks` and `copyright` are not explicitly provided.
   * @default 'community'
   */
  application?: LeftNavApplication;
  /**
   * Text shown next to the myQ logo (e.g. "Community", "Enterprise", or a custom name).
   * Falls back to the capitalised `application` value when omitted.
   */
  appName?: string;
  /**
   * Custom logo element. When omitted, renders the standard myQ wordmark.
   */
  logo?: React.ReactNode;
  /**
   * Navigation items rendered in the main nav section.
   */
  navItems: SideNavItem[];
  /**
   * ID of the currently active nav item.
   */
  activeItem?: string;
  /**
   * Callback when a nav item is clicked.
   */
  onNavItemClick?: (id: string) => void;
  /**
   * Props forwarded to the `LocationSelector` component.
   * Omit to hide the location selector entirely.
   */
  location?: Omit<LocationSelectorProps, 'collapsed'>;
  /**
   * Collapsed mode — renders the sidebar at 84 px wide (icons only).
   * @default false
   */
  collapsed?: boolean;
  /**
   * Footer link labels rendered at the bottom of the sidebar.
   * Defaults to community or enterprise defaults when omitted.
   */
  footerLinks?: string[];
  /**
   * Copyright string shown below footer links.
   * @default '© 2026 LiftMaster'
   */
  copyright?: string;
  /**
   * Full height of the sidebar.
   * @default '100vh'
   */
  height?: React.CSSProperties['height'];
  /** Additional CSS class on the root element */
  className?: string;
  /** Additional inline styles on the root element */
  style?: React.CSSProperties;
}

const FOOTER_DEFAULTS: Record<LeftNavApplication, string[]> = {
  community: ['Contact', 'Products', 'For Dealers'],
  enterprise: ['Support', 'Privacy', 'Terms', 'Partners', 'myQ Dockpass'],
};

/**
 * LeftNav
 *
 * Full side-panel navigation component. Composes the myQ logo, optional
 * `LocationSelector`, `SideNavigation`, and a footer links section.
 *
 * Supports two widths:
 * - **Expanded** (`collapsed=false`): 220 px — icon + label nav items
 * - **Collapsed** (`collapsed=true`): 84 px  — icon-only nav items
 *
 * Matches the Figma `leftNav` component (node 3376:8082 in the 4.0 Design System).
 *
 * @example
 * ```tsx
 * const navItems = [
 *   { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
 *   { id: 'users',     label: 'Users',     icon: <UsersIcon /> },
 * ];
 *
 * <LeftNav
 *   application="community"
 *   navItems={navItems}
 *   activeItem="dashboard"
 *   onNavItemClick={(id) => navigate(id)}
 *   location={{ name: 'Drake Terrace', location: 'Wheaton, IL' }}
 * />
 * ```
 */
export const LeftNav: React.FC<LeftNavProps> = ({
  application = 'community',
  appName,
  logo,
  navItems,
  activeItem,
  onNavItemClick,
  location,
  collapsed = false,
  footerLinks,
  copyright = '© 2026 LiftMaster',
  height = '100vh',
  className = '',
  style,
}) => {
  const resolvedAppName = appName ?? (application === 'enterprise' ? 'Enterprise' : 'Community');
  const resolvedFooterLinks = footerLinks ?? FOOTER_DEFAULTS[application];
  const width = collapsed ? 84 : 220;

  // ── Root container ───────────────────────────────────────────────────────────
  const rootStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width,
    height,
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    boxSizing: 'border-box',
    paddingTop: 28,
    overflow: 'hidden',
    transition: 'width 0.2s ease',
    flexShrink: 0,
    ...style,
  };

  // ── Scrollable body (logo + location + nav) ─────────────────────────────────
  const bodyStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    gap: 24,
    padding: collapsed ? '0 12px' : '0 20px',
    overflowY: 'auto',
    overflowX: 'hidden',
    minHeight: 0,
    alignItems: collapsed ? 'center' : 'flex-start',
  };

  // ── Logo row ─────────────────────────────────────────────────────────────────
  const logoRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    height: 39,
    flexShrink: 0,
    overflow: 'hidden',
  };

  const logoMarkStyle: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  };

  const appNameStyle: React.CSSProperties = {
    fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
    fontWeight: 700,
    fontSize: 16,
    lineHeight: '14px',
    letterSpacing: '-0.125px',
    color: 'var(--sds-color-background-brand-default, #0a76db)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  };

  // ── Footer ───────────────────────────────────────────────────────────────────
  const footerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: '25px 24px 24px 24px',
    borderTop: '1px solid #e2e8f0',
    flexShrink: 0,
  };

  const footerLinksStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px 12px',
    fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
    fontWeight: 400,
    fontSize: 10,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: '#64748b',
  };

  const copyrightStyle: React.CSSProperties = {
    fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
    fontWeight: 400,
    fontSize: 10,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: '#64748b',
    lineHeight: '15px',
  };

  return (
    <aside className={className} style={rootStyle} aria-label="Side navigation">
      {/* ── Body ─────────────────────────────────────────────────────────────── */}
      <div style={bodyStyle}>
        {/* Logo */}
        <div style={logoRowStyle}>
          {logo ? (
            logo
          ) : (
            <>
              <div style={logoMarkStyle}>
                <MyQLogo height={21} />
              </div>
              {!collapsed && (
                <span style={appNameStyle}>{resolvedAppName}</span>
              )}
            </>
          )}
        </div>

        {/* Location selector */}
        {location && (
          <LocationSelector
            {...location}
            collapsed={collapsed}
            style={{ width: '100%' }}
          />
        )}

        {/* Navigation */}
        <SideNavigation
          items={navItems}
          activeItem={activeItem}
          collapsed={collapsed}
          onItemClick={onNavItemClick}
          style={{ width: collapsed ? 40 : 149 }}
        />
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      {!collapsed && (
        <footer style={footerStyle}>
          <div style={footerLinksStyle}>
            {resolvedFooterLinks.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </div>
          <p style={copyrightStyle}>{copyright}</p>
        </footer>
      )}
    </aside>
  );
};

export default LeftNav;
