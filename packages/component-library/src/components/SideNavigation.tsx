import React from 'react';
import { NavItem } from './NavItem';

export interface SideNavItem {
  /** Unique identifier — used to match against activeItem */
  id: string;
  /** Display label */
  label: string;
  /** Icon element (24×24) */
  icon?: React.ReactNode;
  /** Optional href for anchor-based navigation */
  href?: string;
}

export interface SideNavigationProps {
  /** Array of navigation items to render */
  items: SideNavItem[];
  /** ID of the currently active item */
  activeItem?: string;
  /** Collapsed mode — renders icons only, no labels */
  collapsed?: boolean;
  /** Callback when a nav item is clicked */
  onItemClick?: (id: string) => void;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * SideNavigation
 *
 * A vertical list of `NavItem` rows used inside `LeftNav`. Renders the full nav
 * section with icon + label (expanded) or icon only (collapsed).
 *
 * Matches the Figma `side navigation` component (node 3376:6408 in the 4.0 Design System).
 * Supports both Community and Enterprise navigation by accepting `items` as a prop.
 */
export const SideNavigation: React.FC<SideNavigationProps> = ({
  items,
  activeItem,
  collapsed = false,
  onItemClick,
  className = '',
  style,
}) => {
  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    width: '100%',
    ...style,
  };

  return (
    <nav className={className} style={listStyle} aria-label="Main navigation">
      {items.map((item) => (
        <NavItem
          key={item.id}
          label={item.label}
          icon={item.icon}
          active={item.id === activeItem}
          collapsed={collapsed}
          href={item.href}
          onClick={item.href ? undefined : () => onItemClick?.(item.id)}
        />
      ))}
    </nav>
  );
};

export default SideNavigation;
