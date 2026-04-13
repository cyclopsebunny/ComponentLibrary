import React, { useState } from 'react';

export interface LocationSelectorProps {
  /** Primary name (facility or community name) */
  name: string;
  /** Secondary line (city, state) */
  location?: string;
  /** Icon element shown on the left (24×24 recommended) */
  icon?: React.ReactNode;
  /** Click handler — open a picker/dropdown */
  onClick?: () => void;
  /** Like onClick, but also receives the button's bounding rect for anchor positioning */
  onClickWithRect?: (rect: DOMRect) => void;
  /** Collapsed mode — renders icon only, no text or chevron */
  collapsed?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

/**
 * LocationSelector
 *
 * The facility / community location picker shown below the logo in the side panel.
 * Clicking it typically opens a dropdown to switch locations.
 *
 * Matches the Figma `location selector` component inside `leftNav`
 * (nodes 3376:4254, 3376:8092 in the 4.0 Design System).
 */
export const LocationSelector: React.FC<LocationSelectorProps> = ({
  name,
  location,
  icon,
  onClick,
  onClickWithRect,
  collapsed = false,
  className = '',
  style,
}) => {
  const [hovered, setHovered] = useState(false);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'space-between',
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: 8,
    paddingRight: collapsed ? 8 : 4,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: hovered ? '#f0f4f8' : '#f9fcfd',
    border: '1px solid #e2e8f0',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 0.15s ease',
    flexShrink: 0,
    ...style,
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flex: collapsed ? undefined : '1 0 0',
    minWidth: 0,
  };

  const iconWrapperStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const textGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
    fontWeight: 500,
    fontSize: 12,
    minWidth: 0,
  };

  const nameStyle: React.CSSProperties = {
    color: 'var(--sds-color-text-default-default, #191919)',
    lineHeight: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'left',
  };

  const locationStyle: React.CSSProperties = {
    color: 'var(--sds-color-text-default-tertiary, #999)',
    lineHeight: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    textAlign: 'left',
  };

  // Chevron SVG (right-pointing when collapsed to indicate expand)
  const chevronStyle: React.CSSProperties = {
    width: 24,
    height: 24,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--sds-color-text-default-secondary, #636363)',
  };

  return (
    <button
      type="button"
      className={className}
      style={containerStyle}
      onClick={(e) => {
        onClick?.();
        onClickWithRect?.(e.currentTarget.getBoundingClientRect());
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={collapsed ? `${name}${location ? `, ${location}` : ''}` : undefined}
    >
      <span style={contentStyle}>
        {icon && <span style={iconWrapperStyle}>{icon}</span>}
        {!collapsed && (
          <span style={textGroupStyle}>
            <span style={nameStyle}>{name}</span>
            {location && <span style={locationStyle}>{location}</span>}
          </span>
        )}
      </span>
      {!collapsed && (
        <span style={chevronStyle}>
          {/* Down-pointing chevron */}
          <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
            <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
    </button>
  );
};

export default LocationSelector;
