import React from 'react';
import { SubNavLink } from './SubNavLink';

export interface SubNavItem {
  /** Unique identifier */
  id: string;
  /** Visible label */
  label: string;
  /** Disabled state */
  disabled?: boolean;
}

export interface SubNavProps {
  /** Navigation items to display */
  items: SubNavItem[];
  /** Id of the currently active item */
  activeItem?: string;
  /** Called with the id of the clicked item */
  onItemClick?: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SubNav
 *
 * Third-level vertical navigation panel. Rendered inside the main content
 * card alongside the page body, producing a three-level navigation hierarchy:
 * Left-nav → Tab-bar → SubNav → content.
 *
 * Visual style: frosted-glass pill matching the Tabs / content-card aesthetic.
 *
 * Matches the Figma "Nav" component in the Commercial Web UI Refresh design
 * file (node 2263:21990).
 */
export const SubNav: React.FC<SubNavProps> = ({
  items,
  activeItem,
  onItemClick,
  className = '',
  style,
}) => {
  const containerStyle: React.CSSProperties = {
    display:              'flex',
    flexDirection:        'column',
    padding:              8,
    background:           'rgba(255, 255, 255, 0.7)',
    backdropFilter:       'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    border:               '0.75px solid #d2efff',
    borderRadius:         16,
    boxShadow:            '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
    flexShrink:           0,
    overflowY:            'auto',
    ...style,
  };

  return (
    <nav aria-label="Sub navigation" className={className} style={containerStyle}>
      {items.map((item) => (
        <SubNavLink
          key={item.id}
          label={item.label}
          active={item.id === activeItem}
          disabled={item.disabled}
          onClick={() => onItemClick?.(item.id)}
        />
      ))}
    </nav>
  );
};

export default SubNav;
