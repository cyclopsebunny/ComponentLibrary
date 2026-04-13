import React, { useState } from 'react';
import type { SideNavItem } from './SideNavigation';
import { SideNavigation } from './SideNavigation';
import { LocationSelector } from './LocationSelector';
import { MyQLogo } from '../icons/NavIcons';

// ── Inline icons (no external deps) ──────────────────────────────────────────

function HamburgerIcon() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <rect width="20" height="2" rx="1" fill="currentColor" />
      <rect y="6" width="20" height="2" rx="1" fill="currentColor" />
      <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TopNavLocation {
  name: string;
  location?: string;
  icon?: React.ReactNode;
}

export interface TopNavProps {
  /** "community" or "enterprise" — drives the app name displayed */
  application?: 'community' | 'enterprise';
  /** Override the displayed app name */
  appName?: string;
  /** Logo element (defaults to a plain myQ text mark) */
  logo?: React.ReactNode;
  /** Navigation items */
  navItems?: SideNavItem[];
  /** Currently active nav item id */
  activeItem?: string;
  /** Called when a nav item is tapped */
  onNavItemClick?: (id: string) => void;
  /** Location / facility for the selector */
  location?: TopNavLocation;
  /** Called when the location selector is clicked, with the button's bounding rect */
  onLocationClick?: (rect: DOMRect) => void;
  /** User avatar element shown in top-right */
  avatar?: React.ReactNode;
  /**
   * Custom content rendered in the right slot of the top bar, replacing the
   * default avatar. Use this to add extra action buttons or dropdowns on mobile.
   */
  rightContent?: React.ReactNode;
  /** Control open state externally (uncontrolled by default) */
  open?: boolean;
  /** Called when the hamburger / close button is pressed */
  onOpenChange?: (open: boolean) => void;
  /**
   * Top and bottom padding (px) applied to the bar itself.
   * Controls bar height while keeping button sizes constant.
   * @default 4
   */
  barPaddingY?: number;
  /**
   * When false the hamburger / close button is hidden and the nav drawer
   * will not open — useful at breakpoints where a sidebar is already visible.
   * @default true
   */
  showHamburger?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ── Default avatar ────────────────────────────────────────────────────────────

function DefaultAvatar() {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: '50%',
      background: 'var(--sds-color-background-brand-default, #0a76db)',
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700,
    }}>
      U
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * TopNav
 *
 * Horizontal navigation bar used at all breakpoints.
 *
 * - `barPaddingY` controls top/bottom padding so the bar height can be tuned
 *   per breakpoint while keeping the button sizes constant.
 * - `showHamburger` hides the hamburger/close button and drawer at breakpoints
 *   where a sidebar is already visible (tablet, desktop).
 */
export const TopNav: React.FC<TopNavProps> = ({
  application = 'community',
  appName,
  logo,
  navItems = [],
  activeItem,
  onNavItemClick,
  location,
  onLocationClick,
  avatar,
  rightContent,
  open: controlledOpen,
  onOpenChange,
  barPaddingY = 4,
  showHamburger = true,
  className = '',
  style,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const toggle = () => {
    if (!showHamburger) return;
    const next = !isOpen;
    setInternalOpen(next);
    onOpenChange?.(next);
  };

  const handleNavClick = (id: string) => {
    onNavItemClick?.(id);
    setInternalOpen(false);
    onOpenChange?.(false);
  };

  const displayName = appName ?? (application === 'enterprise' ? 'Enterprise' : 'Community');

  // Bar height = button content + barPaddingY×2
  const barHeight = 36 + barPaddingY * 2; // 36px = icon(20) + button padding(8×2)

  // ── Top bar ────────────────────────────────────────────────────────────────
  const topBar: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    padding: `${barPaddingY}px 4px`,
    position: 'relative',
    zIndex: 201,
  };

  const iconButton: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '8px',
    borderRadius: 8, border: 'none', background: 'transparent',
    cursor: 'pointer', color: '#191919', flexShrink: 0,
  };

  const logoArea: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 9,
    position: 'absolute', left: '50%', transform: 'translateX(-50%)',
  };

  // ── Drawer ─────────────────────────────────────────────────────────────────
  const drawer: React.CSSProperties = {
    position: 'fixed',
    top: barHeight,
    bottom: 0,
    left: 0,
    zIndex: 200,
    background: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    boxShadow: '4px 0 16px rgba(0, 0, 0, 0.10)',
    padding: '16px 16px 24px',
    display: 'flex', flexDirection: 'column', gap: 24,
    width: 214,
    overflowY: 'auto',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform',
  };

  return (
    <div
      className={className}
      style={{
        width: '100%',
        fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
        flexShrink: 0,
        ...style,
      }}
    >
      {/* ── Top bar ── */}
      <div style={topBar}>
        {/* Left — hamburger / close, or invisible spacer to keep logo centered */}
        {showHamburger ? (
          <button
            type="button"
            style={iconButton}
            onClick={toggle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        ) : (
          <div style={{ padding: '8px', flexShrink: 0, visibility: 'hidden' }} aria-hidden="true">
            <HamburgerIcon />
          </div>
        )}

        {/* Center — logo + app name */}
        <div style={logoArea}>
          {logo ?? <MyQLogo height={21} />}
          <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--sds-color-background-brand-default, #0a76db)', letterSpacing: -0.125 }}>
            {displayName}
          </span>
        </div>

        {/* Right — custom content or default avatar */}
        {rightContent ?? (
          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: 6 }}>
            {avatar ?? <DefaultAvatar />}
          </div>
        )}
      </div>

      {/* ── Drawer (always rendered when hamburger is enabled so it can animate) ── */}
      {showHamburger && (
        <div style={drawer}>
          {location && (
            <LocationSelector
              name={location.name}
              location={location.location}
              icon={location.icon}
              onClickWithRect={onLocationClick}
              style={{ width: '100%' }}
            />
          )}
          {navItems.length > 0 && (
            <SideNavigation
              items={navItems}
              activeItem={activeItem}
              onItemClick={handleNavClick}
              style={{ width: '100%' }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TopNav;
