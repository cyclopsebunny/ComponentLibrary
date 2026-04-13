import React, { useId } from 'react';

// ── Radio visuals (16px — Figma node 9762:1412, 4.0 Design System) ─────────
// Matches exported SVG: neutral 1px ring (#B2B2B2), white/disabled fill, inner dot r=5 when selected.

function RadioVisual({
  checked,
  disabled,
}: {
  checked: boolean;
  disabled: boolean;
}) {
  const ringStroke = 'var(--sds-color-text-disabled-default, #b2b2b2)';
  const fillOuter = disabled
    ? 'var(--sds-color-background-disabled-default, #f7f7f7)'
    : 'var(--sds-color-background-default-default, #ffffff)';

  const innerFill = disabled
    ? 'var(--sds-color-text-disabled-default, #b2b2b2)'
    : 'var(--sds-color-background-brand-default, #0a76db)';

  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden style={{ display: 'block' }}>
      <circle cx={8} cy={8} r={7} fill={fillOuter} stroke={ringStroke} strokeWidth={1} />
      {checked && <circle cx={8} cy={8} r={5} fill={innerFill} />}
    </svg>
  );
}

/** Horizontal offset so description lines up with label text (16px control + gap). */
const DESCRIPTION_OFFSET = 'calc(16px + var(--sds-size-space-300, 12px))';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RadioFieldProps {
  /** Primary label (16px / body base) */
  label: string;
  /** Secondary line under the label (14px / body small); omit to hide */
  description?: string;
  /** Whether this option is selected */
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Radio group name — required when used in a group */
  name: string;
  /** Value for this option */
  value: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * RadioField
 *
 * Single radio option with label and optional description. Matches Figma **Radio Field**
 * (node `9762:1412` — 4.0 Design System Enterprise).
 */
export const RadioField: React.FC<RadioFieldProps> = ({
  label,
  description,
  checked = false,
  disabled = false,
  onChange,
  name,
  value,
  id: idProp,
  className = '',
  style,
}) => {
  const reactId = useId();
  const id = idProp ?? `radio-field-${value}-${reactId.replace(/:/g, '')}`;

  const hasDescription = Boolean(description);

  const labelColor = disabled
    ? 'var(--sds-color-text-disabled-default, #b2b2b2)'
    : 'var(--sds-color-text-default-default, #191919)';

  const descColor = 'var(--sds-color-text-default-secondary, #636363)';

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
        id={id}
        name={name}
        value={value}
        type="radio"
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
            flexShrink: 0,
          }}
        >
          <RadioVisual checked={checked} disabled={disabled} />
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

export default RadioField;
