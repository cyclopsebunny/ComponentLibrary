// Button component from Figma
// This file is generated from Figma component data
// Source: Extracted from Figma node 4185-3778
// Generated at: 2026-02-04T19:45:00.000Z

import React, { useState } from 'react';
import * as componentColors from '../tokens/component-colors';

export type ButtonVariant = 'default' | 'CTA' | 'brand' | 'subtle' | 'danger' | 'danger-subtle' | 'frameless';
export type ButtonState = 'enabled' | 'hover' | 'pressed' | 'active' | 'disabled';
export type ButtonSize = 'Small' | 'Medium';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button label text
   */
  label?: string;
  /**
   * Button variant style
   * @default 'CTA'
   */
  variant?: ButtonVariant;
  /**
   * Button state
   * @default 'enabled'
   */
  state?: ButtonState;
  /**
   * Button size
   * @default 'Medium'
   */
  size?: ButtonSize;
  /**
   * Show icon at the start
   */
  hasIconStart?: boolean;
  /**
   * Show icon at the end
   */
  hasIconEnd?: boolean;
  /**
   * Custom start icon
   */
  iconStart?: React.ReactNode;
  /**
   * Custom end icon
   */
  iconEnd?: React.ReactNode;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * Button content (children)
   */
  children?: React.ReactNode;
}

/**
 * Get component color token key
 */
function getColorKey(variant: ButtonVariant, state: ButtonState, property: 'Background' | 'Text' | 'Icon' | 'Stroke'): string {
  // Map variant to componentColors key format
  // Note: Keys in componentColors use camelCase (e.g., "Dangersubtle" not "DangerSubtle")
  const variantMap: Record<ButtonVariant, string> = {
    'default': 'Default',
    'CTA': 'CTA',
    'brand': 'Brand',
    'subtle': 'Subtle',
    'danger': 'Danger',
    'danger-subtle': 'Dangersubtle', // Note: lowercase 'subtle' in the key
    'frameless': 'Default', // Frameless uses default colors
  };
  
  // Map state to componentColors key format
  const stateMap: Record<ButtonState, string> = {
    'enabled': 'Enabled',
    'hover': 'Hover',
    'pressed': 'Pressed',
    'active': 'Active',
    'disabled': 'Disabled',
  };
  
  const variantKey = variantMap[variant];
  const stateKey = stateMap[state];
  const propertyKey = property;
  
  // Build the key: button{Variant}{State}{Property}
  const key = `button${variantKey}${stateKey}${propertyKey}` as keyof typeof componentColors.componentcolors;
  
  return componentColors.componentcolors[key] || '';
}

/**
 * Get spacing values based on size and variant
 * Subtle buttons always use smaller font size (14px) regardless of size prop
 */
function getSpacing(size: ButtonSize, variant: ButtonVariant) {
  const isSmall = size === 'Small';
  // Subtle buttons always use smaller font size (14px) per Figma design
  const isSubtle = variant === 'subtle';
  
  if (isSmall) {
    return {
      paddingX: '12px',
      paddingY: '4px',
      gap: '8px',
      fontSize: '14px',
      iconSize: '16px',
    };
  }
  return {
    paddingX: '16px',
    paddingY: '8px',
    gap: '16px',
    fontSize: isSubtle ? '14px' : '16px', // Subtle always uses 14px
    iconSize: '24px',
  };
}

/**
 * Button component
 * 
 * Extracted from Figma node 4185-3778
 * Uses design tokens from component-colors.json (Figma node 3278-6898)
 */
export const Button: React.FC<ButtonProps> = ({
  label = 'Button',
  variant = 'CTA',
  state = 'enabled',
  size = 'Medium',
  hasIconStart = false,
  hasIconEnd = false,
  iconStart,
  iconEnd,
  className = '',
  children,
  disabled,
  style,
  ...rest
}) => {
  // Track interactive states (hover, press)
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Determine effective state:
  // - If disabled, always disabled
  // - If state prop is explicitly set to something other than 'enabled', use that (for showcase)
  // - Otherwise, use interactive states (hover/pressed) if user is interacting
  const effectiveState: ButtonState = disabled
    ? 'disabled'
    : state !== 'enabled'
      ? state // Use explicit state prop for showcase/demo purposes
      : isPressed
        ? 'pressed'
        : isHovered
          ? 'hover'
          : 'enabled';
  
  // Get colors from design tokens
  // Per Figma design: subtle buttons in enabled/disabled states have NO background (transparent)
  let backgroundColor = getColorKey(variant, effectiveState, 'Background');
  if (variant === 'subtle' && (effectiveState === 'enabled' || effectiveState === 'disabled')) {
    backgroundColor = 'transparent';
  }
  const textColor = getColorKey(variant, effectiveState, 'Text');
  const iconColor = getColorKey(variant, effectiveState, 'Icon');
  const strokeColor = getColorKey(variant, effectiveState, 'Stroke');
  
  // Get spacing (subtle buttons always use smaller font size)
  const spacing = getSpacing(size, variant);
  
  // Determine border styling - match Figma design exactly
  // Subtle buttons have NO borders in any state per Figma design
  // Frameless buttons have no borders
  // Other buttons use stroke color if provided
  let borderStyle: string;
  if (variant === 'frameless' || variant === 'subtle') {
    borderStyle = 'none';
  } else if (strokeColor) {
    borderStyle = `1px solid ${strokeColor}`;
  } else {
    borderStyle = 'none';
  }

  // Build styles
  const buttonStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.gap,
    paddingLeft: spacing.paddingX,
    paddingRight: spacing.paddingX,
    paddingTop: spacing.paddingY,
    paddingBottom: spacing.paddingY,
    backgroundColor: backgroundColor || 'transparent',
    color: textColor,
    border: borderStyle,
    borderRadius: '8px',
    boxSizing: 'border-box', // Ensure consistent sizing across all states
    fontSize: spacing.fontSize,
    fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
    fontWeight: 'var(--sds-typography-body-font-weight-regular, 400)',
    lineHeight: '22px',
    cursor: effectiveState === 'disabled' ? 'not-allowed' : 'pointer',
    opacity: effectiveState === 'disabled' ? 0.6 : 1,
    transition: 'all 0.2s ease',
    ...(style ?? {}),
  };
  
  // Icon styles
  const iconStyle: React.CSSProperties = {
    width: spacing.iconSize,
    height: spacing.iconSize,
    color: iconColor,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  // Event handlers for interactive states
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && state === 'enabled') {
      setIsHovered(true);
    }
    rest.onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    setIsPressed(false);
    rest.onMouseLeave?.(e);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && state === 'enabled') {
      setIsPressed(true);
    }
    rest.onMouseDown?.(e);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(false);
    rest.onMouseUp?.(e);
  };

  return (
    <button
      {...rest}
      className={className}
      style={buttonStyles}
      disabled={effectiveState === 'disabled' || disabled}
      data-variant={variant}
      data-state={effectiveState}
      data-size={size}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {hasIconStart && (iconStart || <span style={iconStyle}>★</span>)}
      {children || <span>{label}</span>}
      {hasIconEnd && (iconEnd || <span style={iconStyle}>×</span>)}
    </button>
  );
};

export default Button;
