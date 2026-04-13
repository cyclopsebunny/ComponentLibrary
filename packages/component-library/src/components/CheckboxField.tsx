import React, { useEffect, useId, useRef } from 'react';

// ── Icons (inline SVG — Figma node 9762:1441, 4.0 Design System) ─────────────

function IconCheck({ color }: { color: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden style={{ display: 'block' }}>
      <path
        d="M3.5 8.2L6.5 11.2L12.5 4.2"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMinus({ color }: { color: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden style={{ display: 'block' }}>
      <path
        d="M4 8H12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Horizontal offset so description lines up with label text (16px control + gap). */
const DESCRIPTION_OFFSET = 'calc(16px + var(--sds-size-space-300, 12px))';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CheckboxFieldProps {
  /** Primary label (16px / body base) */
  label: string;
  /** Secondary line under the label (14px / body small); omit to hide */
  description?: string;
  checked?: boolean;
  /** Shows horizontal bar in the box; takes precedence over `checked` for display */
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * CheckboxField
 *
 * Checkbox with label and optional description. Matches Figma **CheckboxField**
 * (node `9762:1441` — 4.0 Design System Enterprise).
 */
export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  description,
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  id: idProp,
  name,
  value,
  className = '',
  style,
}) => {
  const reactId = useId();
  const id = idProp ?? `checkbox-field-${reactId.replace(/:/g, '')}`;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.indeterminate = indeterminate;
  }, [indeterminate, checked]);

  const hasDescription = Boolean(description);

  const labelColor = disabled
    ? 'var(--sds-color-text-disabled-default, #b2b2b2)'
    : 'var(--sds-color-text-default-default, #191919)';

  const descColor = 'var(--sds-color-text-default-secondary, #636363)';

  const boxUnchecked = {
    background: 'var(--sds-color-background-default-default, #ffffff)',
    border: '1px solid var(--sds-color-border-brand-tertiary, #4f95e8)',
  };

  const boxChecked = {
    background: 'var(--sds-color-background-brand-default, #0a76db)',
    border: '1px solid var(--sds-color-background-brand-default, #0a76db)',
  };

  const boxDisabled = {
    background: 'var(--sds-color-background-disabled-default, #f7f7f7)',
    border: '1px solid var(--sds-color-border-neutral-tertiary, #999999)',
  };

  let boxStyle: React.CSSProperties;
  if (disabled) {
    boxStyle = boxDisabled;
  } else if (indeterminate || checked) {
    boxStyle = boxChecked;
  } else {
    boxStyle = boxUnchecked;
  }

  const iconOnBrand = '#ffffff';
  const iconDisabled = '#999999';

  const rowGap = 'var(--sds-size-space-100, 4px)';
  const colGap = 'var(--sds-size-space-300, 12px)';

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: rowGap,
        width: '100%',
        maxWidth: 240,
        ...style,
      }}
    >
      <input
        ref={inputRef}
        id={id}
        name={name}
        value={value}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
          opacity: 0,
        }}
      />

      <label
        htmlFor={id}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: colGap,
          margin: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
          userSelect: 'none',
        }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 16,
            height: 16,
            minWidth: 16,
            minHeight: 16,
            flexShrink: 0,
            borderRadius: 'var(--sds-size-radius-100, 4px)',
            boxSizing: 'border-box',
            overflow: 'hidden',
            ...boxStyle,
          }}
        >
          {checked && !indeterminate && (
            <IconCheck color={disabled ? iconDisabled : iconOnBrand} />
          )}
          {indeterminate && (
            <IconMinus color={disabled ? iconDisabled : iconOnBrand} />
          )}
        </span>
        <span
          style={{
            flex: '1 1 0',
            minWidth: 0,
            margin: 0,
            fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
            fontWeight: 'var(--sds-typography-body-font-weight-regular, 400)',
            fontSize: 'var(--sds-typography-body-size-medium, 16px)',
            lineHeight: '22px',
            color: labelColor,
          }}
        >
          {label}
        </span>
      </label>

      {hasDescription && (
        <p
          style={{
            margin: 0,
            marginLeft: DESCRIPTION_OFFSET,
            fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
            fontWeight: 'var(--sds-typography-body-font-weight-regular, 400)',
            fontSize: 'var(--sds-typography-body-size-small, 14px)',
            lineHeight: '22px',
            color: descColor,
            minWidth: 0,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default CheckboxField;
