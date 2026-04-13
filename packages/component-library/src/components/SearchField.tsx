import React, { useId, useRef, useState } from 'react';
import { SearchDefaultIcon } from '../icons';

// ── Inline X icon (no dedicated dismiss icon in the library) ─────────────────

function XIcon({ color }: { color: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{ display: 'block', flexShrink: 0 }}
    >
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type SearchFieldState = 'Default' | 'Focused' | 'Disabled';

export interface SearchFieldProps {
  /** Current search value */
  value?: string;
  /** Placeholder text shown when empty */
  placeholder?: string;
  /**
   * Outlined (true) = pill shape with full border.
   * Not outlined (false) = bottom border only.
   */
  outlined?: boolean;
  /**
   * Controlled state. Omit to let the component manage Focused automatically
   * on focus/blur. Pass 'Disabled' to disable the field.
   */
  state?: SearchFieldState;
  /** Called when the input value changes */
  onChange?: (value: string) => void;
  /** Called when the clear (×) button is clicked */
  onClear?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ── Token references ──────────────────────────────────────────────────────────

const FONT_FAMILY = 'var(--sds-typography-body-font-family, "Inter", sans-serif)';
const FONT_WEIGHT = 'var(--sds-typography-body-font-weight-regular, 400)';
const FONT_SIZE_MD = 'var(--sds-typography-body-size-medium, 16px)';

const COLOR_TEXT_DEFAULT   = 'var(--button-default-enabled-text, #191919)';
const COLOR_TEXT_DISABLED  = 'var(--button-default-disabled-text, #b2b2b2)';

const COLOR_BG_DEFAULT     = 'var(--button-default-enabled-background, #ffffff)';
const COLOR_BG_DISABLED    = 'var(--button-default-disabled-background, #f7f7f7)';

const COLOR_BORDER_DEFAULT  = 'var(--button-default-enabled-stroke, #b2b2b2)';
const COLOR_BORDER_FOCUSED  = 'var(--button-default-active-stroke, #0a76db)';
const COLOR_BORDER_DISABLED = 'var(--button-default-disabled-stroke, #b2b2b2)';

// Icon colors
const ICON_ENABLED  = '#636363';
const ICON_FOCUSED  = '#0a76db';
const ICON_DISABLED = '#b2b2b2';

const RADIUS_PILL = 'var(--sds-size-radius-full, 9999px)';
const SPACE_200   = 'var(--sds-size-space-200, 8px)';
const SPACE_300   = 'var(--sds-size-space-300, 12px)';
const SPACE_400   = 'var(--sds-size-space-400, 16px)';

// ── Helpers ───────────────────────────────────────────────────────────────────

// Use box-shadow for the stroke so it doesn't add to layout height,
// matching Figma's inside-stroke measurement behaviour.
function borderShadow(color: string, outlined: boolean): string {
  if (outlined) return `inset 0 0 0 1px ${color}`;
  return `inset 0 -1px 0 0 ${color}`;
}

function wrapperStyle(state: SearchFieldState, outlined: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: SPACE_200,
    boxSizing: 'border-box',
    border: 'none',
    paddingTop: SPACE_300,
    paddingBottom: SPACE_300,
    paddingLeft: outlined ? SPACE_400 : 0,
    paddingRight: outlined ? SPACE_400 : 0,
    width: '100%',
    minWidth: 100,
  };

  if (state === 'Disabled') {
    return {
      ...base,
      background: outlined ? COLOR_BG_DISABLED : 'transparent',
      borderRadius: outlined ? RADIUS_PILL : 0,
      boxShadow: borderShadow(COLOR_BORDER_DISABLED, outlined),
    };
  }

  const borderColor = state === 'Focused' ? COLOR_BORDER_FOCUSED : COLOR_BORDER_DEFAULT;

  return {
    ...base,
    background: outlined ? COLOR_BG_DEFAULT : 'transparent',
    borderRadius: outlined ? RADIUS_PILL : 0,
    boxShadow: borderShadow(borderColor, outlined),
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * SearchField
 *
 * Search input with leading search icon and optional clear button.
 * Supports outlined (pill) and underline-only appearances.
 * Matches Figma **Search** (node `2236-14989` — 4.0 Design System Enterprise).
 *
 * States: Default · Focused · Disabled
 */
export const SearchField: React.FC<SearchFieldProps> = ({
  value = '',
  placeholder = 'Search',
  outlined = true,
  state: stateProp,
  onChange,
  onClear,
  onFocus,
  onBlur,
  id: idProp,
  name,
  className = '',
  style,
}) => {
  const reactId = useId();
  const inputId = idProp ?? `search-field-${reactId.replace(/:/g, '')}`;
  const inputRef = useRef<HTMLInputElement>(null);

  const [internalFocused, setInternalFocused] = useState(false);

  const effectiveState: SearchFieldState =
    stateProp ??
    (internalFocused ? 'Focused' : 'Default');

  const isDisabled = effectiveState === 'Disabled';
  const hasValue = value.length > 0;

  const iconColor =
    isDisabled
      ? ICON_DISABLED
      : effectiveState === 'Focused'
      ? ICON_FOCUSED
      : ICON_ENABLED;

  const inputTextColor = isDisabled ? COLOR_TEXT_DISABLED : COLOR_TEXT_DEFAULT;

  // Scoped ::placeholder color
  const phClass = `cl-sfph-${inputId.replace(/[^a-z0-9]/gi, '')}`;
  const phColor = isDisabled ? COLOR_TEXT_DISABLED : COLOR_TEXT_DISABLED; // both use same #b2b2b2

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!stateProp) setInternalFocused(true);
    onFocus?.(e);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!stateProp) setInternalFocused(false);
    onBlur?.(e);
  }

  function handleClear() {
    onChange?.('');
    onClear?.();
    inputRef.current?.focus();
  }

  const sharedFont: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHT,
    lineHeight: '22px',
  };

  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', ...style }}
    >
      {/* Scoped placeholder color + suppress native search cancel button */}
      <style>{`
        .${phClass}::placeholder { color: ${phColor}; opacity: 1; }
        .${phClass}::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }
        .${phClass}::-webkit-search-decoration { -webkit-appearance: none; }
      `}</style>

      <div style={wrapperStyle(effectiveState, outlined)}>
        {/* Search icon */}
        <SearchDefaultIcon
          size={16}
          color={iconColor}
          style={{ flexShrink: 0, display: 'block' }}
        />

        {/* Input */}
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="search"
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={phClass}
          style={{
            flex: '1 0 0',
            minWidth: 0,
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            background: 'transparent',
            padding: 0,
            margin: 0,
            color: inputTextColor,
            fontSize: FONT_SIZE_MD,
            cursor: isDisabled ? 'not-allowed' : 'text',
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHT,
            lineHeight: '22px',
            ...sharedFont,
          }}
        />

        {/* Clear (×) button — shown when there is a value */}
        {hasValue && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
            disabled={isDisabled}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              width: 16,
              height: 16,
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            <XIcon color={isDisabled ? ICON_DISABLED : ICON_ENABLED} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchField;
