import React, { useState } from 'react';

export interface SubNavLinkProps {
  /** Visible label */
  label: string;
  /** Whether this link is currently active */
  active?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SubNavLink
 *
 * A single third-level navigation link for use inside a `SubNav` panel.
 *
 * - **Default**: transparent background, secondary text colour, no border
 * - **Active**: brand-secondary background, brand border, bold brand text
 *
 * Matches the Figma "Nav / Link" component in the Commercial Web UI Refresh
 * design file (node 2263:21990).
 */
export const SubNavLink: React.FC<SubNavLinkProps> = ({
  label,
  active = false,
  onClick,
  disabled = false,
  className = '',
  style,
}) => {
  const [hovered, setHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    display:      'block',
    width:        '100%',
    textAlign:    'left',
    padding:      '12px 16px',
    border:       active
      ? '1px solid var(--sds-color-text-brand-default, #0a76db)'
      : '1px solid transparent',
    borderRadius: active ? 8 : 4,
    background:   active
      ? 'var(--sds-color-background-brand-secondary, #e0eeff)'
      : hovered && !disabled
        ? 'rgba(10, 118, 219, 0.04)'
        : 'transparent',
    cursor:      disabled ? 'not-allowed' : 'pointer',
    opacity:     disabled ? 0.4 : 1,
    transition:  'background 0.12s ease, border-color 0.12s ease',
    fontFamily:  'var(--sds-typography-body-font-family, "Inter", sans-serif)',
    fontSize:    14,
    fontWeight:  active ? 600 : 500,
    lineHeight:  '20px',
    color:       active
      ? 'var(--sds-color-text-brand-default, #0a76db)'
      : 'var(--secondary, #6b6b6b)',
    whiteSpace:  'nowrap',
    boxSizing:   'border-box',
    ...style,
  };

  return (
    <button
      type="button"
      className={className}
      style={baseStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled}
    >
      {/*
       * Bold-weight spacer keeps the button width stable between inactive (500)
       * and active (600) states — the invisible span always occupies the bolder
       * measurement, while the visible span overlays the correct visual weight.
       */}
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ visibility: 'hidden', fontWeight: 600, userSelect: 'none', pointerEvents: 'none' }} aria-hidden="true">
          {label}
        </span>
        <span style={{ position: 'absolute', inset: 0, fontWeight: active ? 600 : 500 }}>
          {label}
        </span>
      </span>
    </button>
  );
};

export default SubNavLink;
