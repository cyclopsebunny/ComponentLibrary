import React, { useState } from 'react';

export interface NavItemProps {
  /** Navigation label */
  label: string;
  /** Icon element (24×24) */
  icon?: React.ReactNode;
  /** Whether this item is the currently active route */
  active?: boolean;
  /** Collapsed mode — renders icon only (no label) */
  collapsed?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Accessible href — renders as <a> when provided */
  href?: string;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles on the container */
  style?: React.CSSProperties;
}

/**
 * NavItem
 *
 * A single navigation row used inside the side panel. Supports active, hover, and
 * collapsed (icon-only) states. Matches the Figma `menuButtonsComm` component
 * (node 3376:4354 in the 4.0 Design System).
 *
 * Active:   brand-primary text (#0a76db), bold, no border-radius
 * Default:  dark text (#191919), medium weight, border-radius 8px
 * Hover:    light slate background (#f2f5fa), cursor pointer
 * Collapsed: icon only, 40×40 square
 */
export const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  active = false,
  collapsed = false,
  onClick,
  href,
  className = '',
  style,
}) => {
  const [hovered, setHovered] = useState(false);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: collapsed ? 0 : 8,
    height: 40,
    width: '100%',
    paddingLeft: 9,
    paddingRight: collapsed ? 9 : 12,
    boxSizing: 'border-box',
    borderRadius: active ? 0 : 8,
    backgroundColor: hovered && !active ? '#f2f5fa' : 'transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.15s ease',
    flexShrink: 0,
    ...style,
  };

  const iconWrapperStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: active ? 'var(--sds-color-background-brand-default, #0a76db)' : 'var(--sds-color-text-default-default, #191919)',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
    fontWeight: active ? 700 : 500,
    fontSize: 14,
    lineHeight: '12px',
    color: active
      ? 'var(--sds-color-background-brand-default, #0a76db)'
      : 'var(--sds-color-text-default-default, #191919)',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  };

  // If the icon is a React element, forward the `active` prop so icons can
  // swap between their outlined and filled shape variants automatically.
  const resolvedIcon = icon && React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<{ active?: boolean }>, { active })
    : icon;

  const content = (
    <>
      {resolvedIcon && <span style={iconWrapperStyle}>{resolvedIcon}</span>}
      {!collapsed && <span style={labelStyle}>{label}</span>}
    </>
  );

  const commonProps = {
    className,
    style: containerStyle,
    onClick,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    'aria-current': active ? ('page' as const) : undefined,
    title: collapsed ? label : undefined,
  };

  if (href) {
    return (
      <a href={href} {...commonProps}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...commonProps} style={{ ...containerStyle, border: 'none', background: containerStyle.backgroundColor }}>
      {content}
    </button>
  );
};

export default NavItem;
