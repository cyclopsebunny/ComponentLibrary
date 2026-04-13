import React, { useId, useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

export type InputFieldState = 'Enabled' | 'Disabled' | 'Error' | 'Focused';

export interface InputFieldProps {
  /** Text label rendered above the input; hidden when `hasLabel` is false */
  label?: string;
  /** Shows a label above the input */
  hasLabel?: boolean;
  /** Marks the field with a required asterisk (*) */
  isRequired?: boolean;
  /** Helper text rendered below the label */
  description?: string;
  /** Shows helper/description text below the label */
  hasDescription?: boolean;
  /** Message rendered below the input (neutral in Enabled, red in Error) */
  error?: string;
  /** Shows the supporting message below the input */
  hasError?: boolean;
  /** Current value of the input */
  value?: string;
  /** Placeholder text shown when the input is empty */
  placeholder?: string;
  /**
   * Outlined (true) renders a full border + rounded corners.
   * Not outlined (false) renders only a bottom border.
   */
  outlined?: boolean;
  /**
   * Controlled interaction state. When omitted the component manages
   * focus internally; `Disabled` is forwarded to the native input.
   */
  state?: InputFieldState;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  /** Passed to the native input (e.g. `email`, `current-password` for sign-in flows). */
  autoComplete?: string;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  style?: React.CSSProperties;
}

// ── Token references ──────────────────────────────────────────────────────────

const FONT_FAMILY = 'var(--sds-typography-body-font-family, "Inter", sans-serif)';
const FONT_WEIGHT = 'var(--sds-typography-body-font-weight-regular, 400)';
const FONT_SIZE_MD = 'var(--sds-typography-body-size-medium, 16px)';
const FONT_SIZE_SM = 'var(--sds-typography-body-size-small, 14px)';

const COLOR_TEXT_DEFAULT = 'var(--sds-color-text-default-default, #191919)';
const COLOR_TEXT_SECONDARY = 'var(--sds-color-text-default-secondary, #636363)';
const COLOR_TEXT_DISABLED = 'var(--sds-color-text-disabled-default, #b2b2b2)';
const COLOR_TEXT_DISABLED_ON = 'var(--sds-color-text-disabled-on-disabled, #cccccc)';
const COLOR_TEXT_DANGER = 'var(--sds-color-text-danger-default, #c61735)';
const COLOR_TEXT_ACCENT = 'var(--nexus\\/color\\/foreground\\/accent\\/text, #029bd1)';

// Placeholder color as a raw CSS value string (used in injected <style>)
const PLACEHOLDER_COLOR_NORMAL = 'var(--button-default-disabled-text, #b2b2b2)';
const PLACEHOLDER_COLOR_DISABLED = 'var(--sds-color-text-disabled-on-disabled, #cccccc)';

const COLOR_BG_DEFAULT = 'var(--sds-color-background-default-default, #ffffff)';
const COLOR_BG_DISABLED = 'var(--sds-color-background-disabled-default, #f7f7f7)';

const COLOR_BORDER_DEFAULT = 'var(--button-default-enabled-stroke, #b2b2b2)';
const COLOR_BORDER_FOCUSED = 'var(--button-default-active-stroke, #0a76db)';
const COLOR_BORDER_ERROR = 'var(--button-danger-hover-stroke, #c61735)';
const COLOR_BORDER_DISABLED = 'var(--sds-color-border-disabled-default, #b2b2b2)';

const RADIUS = 'var(--sds-size-radius-200, 8px)';
const SPACE_050 = 'var(--sds-size-space-050, 2px)';
const SPACE_200 = 'var(--sds-size-space-200, 8px)';
const SPACE_400 = 'var(--sds-size-space-400, 16px)';

// ── Helpers ───────────────────────────────────────────────────────────────────

// Use box-shadow instead of border so the stroke is drawn outside the layout
// box, matching Figma's inside-stroke behaviour (border doesn't add to height).
function borderShadow(color: string, outlined: boolean): string {
  if (outlined) return `inset 0 0 0 1px ${color}`;
  return `inset 0 -1px 0 0 ${color}`;
}

function inputBoxStyle(
  state: InputFieldState,
  outlined: boolean,
): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    minWidth: 100,
    boxSizing: 'border-box',
    paddingTop: SPACE_200,
    paddingBottom: SPACE_200,
    paddingLeft: outlined ? SPACE_400 : 0,
    paddingRight: outlined ? SPACE_400 : 0,
    overflow: 'visible',
    border: 'none',
  };

  if (state === 'Disabled') {
    return {
      ...base,
      background: outlined ? COLOR_BG_DISABLED : 'transparent',
      borderRadius: outlined ? RADIUS : 0,
      boxShadow: borderShadow(COLOR_BORDER_DISABLED, outlined),
    };
  }

  const borderColor =
    state === 'Focused'
      ? COLOR_BORDER_FOCUSED
      : state === 'Error'
      ? COLOR_BORDER_ERROR
      : COLOR_BORDER_DEFAULT;

  return {
    ...base,
    background: outlined ? COLOR_BG_DEFAULT : 'transparent',
    borderRadius: outlined ? RADIUS : 0,
    boxShadow: borderShadow(borderColor, outlined),
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * InputField
 *
 * Text input with optional label, description, required indicator, and error
 * message. Supports outlined and underline-only (not outlined) appearances.
 * Matches Figma **Input Field** (node `2136-2263` — 4.0 Design System Enterprise).
 *
 * States: Enabled · Focused · Error · Disabled
 */
export const InputField: React.FC<InputFieldProps> = ({
  label = 'Label',
  hasLabel = true,
  isRequired = false,
  description,
  hasDescription = false,
  error,
  hasError = false,
  value,
  placeholder = 'Value',
  outlined = true,
  state: stateProp,
  onChange,
  onFocus,
  onBlur,
  id: idProp,
  name,
  autoComplete,
  type = 'text',
  className = '',
  style,
}) => {
  const reactId = useId();
  const inputId = idProp ?? `input-field-${reactId.replace(/:/g, '')}`;

  const [internalFocused, setInternalFocused] = useState(false);

  // When state is externally controlled use it; otherwise derive from focus
  const effectiveState: InputFieldState =
    stateProp ??
    (internalFocused ? 'Focused' : 'Enabled');

  const isDisabled = effectiveState === 'Disabled';

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!stateProp) setInternalFocused(true);
    onFocus?.(e);
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!stateProp) setInternalFocused(false);
    onBlur?.(e);
  }

  // Scoped class name for ::placeholder targeting (can't be done inline)
  const phClass = `cl-iph-${inputId.replace(/[^a-z0-9]/gi, '')}`;
  const phColor = isDisabled ? PLACEHOLDER_COLOR_DISABLED : PLACEHOLDER_COLOR_NORMAL;

  const labelColor = isDisabled ? COLOR_TEXT_DISABLED : COLOR_TEXT_SECONDARY;
  const descColor = isDisabled ? COLOR_TEXT_DISABLED_ON : COLOR_TEXT_SECONDARY;

  const errorColor =
    effectiveState === 'Error'
      ? COLOR_TEXT_DANGER
      : effectiveState === 'Focused'
      ? COLOR_TEXT_ACCENT
      : COLOR_TEXT_DEFAULT;

  // Input text color applies to typed characters only; placeholder uses ::placeholder
  const inputTextColor = isDisabled ? COLOR_TEXT_DISABLED : COLOR_TEXT_DEFAULT;

  const sharedTextStyle: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    fontWeight: FONT_WEIGHT,
    lineHeight: '22px',
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: SPACE_200,
        paddingBottom: SPACE_200,
        position: 'relative',
        width: '100%',
        ...style,
      }}
    >
      {/* Scoped placeholder color — inline styles can't target ::placeholder */}
      <style>{`.${phClass}::placeholder { color: ${phColor}; opacity: 1; }`}</style>

      {/* Label */}
      {hasLabel && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: SPACE_050,
            ...sharedTextStyle,
          }}
        >
          {isRequired && (
            <span
              aria-hidden
              style={{
                color: COLOR_TEXT_DANGER,
                fontSize: FONT_SIZE_SM,
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              *
            </span>
          )}
          <label
            htmlFor={inputId}
            style={{
              color: labelColor,
              fontSize: FONT_SIZE_MD,
              cursor: isDisabled ? 'not-allowed' : 'default',
              margin: 0,
              ...sharedTextStyle,
            }}
          >
            {label}
          </label>
        </div>
      )}

      {/* Description */}
      {hasDescription && description && (
        <p
          style={{
            margin: 0,
            color: descColor,
            fontSize: FONT_SIZE_SM,
            width: '100%',
            ...sharedTextStyle,
          }}
        >
          {description}
        </p>
      )}

      {/* Input box */}
      <div style={inputBoxStyle(effectiveState, outlined)}>
        <input
          id={inputId}
          name={name}
          autoComplete={autoComplete}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={isDisabled}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={phClass}
          style={{
            flex: '1 0 0',
            minWidth: 0,
            // Remove all browser-native input appearance (inner shadow, border, etc.)
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
            // Force font inheritance — form elements don't inherit by default in all browsers
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHT,
            lineHeight: '22px',
          }}
        />
      </div>

      {/* Supporting / error message */}
      {hasError && error && (
        <p
          style={{
            margin: 0,
            color: errorColor,
            fontSize: FONT_SIZE_MD,
            whiteSpace: 'nowrap',
            ...sharedTextStyle,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
