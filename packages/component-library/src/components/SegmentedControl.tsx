import React, { useId } from 'react';

import { SegmentedControlButton } from './SegmentedControlButton';

import './SegmentedControl.css';

export interface SegmentedControlProps<T extends string> {
  /** Uppercase label above the control (matches showcase “Controls” panels). */
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  style?: React.CSSProperties;
  /** Disables all segments (non-interactive, muted). */
  disabled?: boolean;
}

/**
 * Horizontal segmented control (exclusive selection).
 *
 * **Figma**
 * - Group: **SegmentedControl** `3430:988` — file `1pYVDCkei9zOaAaz0GHzWq` (4.0 Design System Enterprise).
 * - Each segment uses {@link SegmentedControlButton} (**SegmentedButton** `3446:1193`) with hover,
 *   selected, and pressed (`:active`) styles.
 */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className = '',
  style,
  disabled = false,
}: SegmentedControlProps<T>) {
  const labelId = useId();

  const rootClass = ['sds-segmented', disabled ? 'sds-segmented--disabled' : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass} style={style}>
      <span id={labelId} className="sds-segmented__label">
        {label}
      </span>
      <div
        role="radiogroup"
        aria-labelledby={labelId}
        aria-disabled={disabled || undefined}
        className="sds-segmented__group"
      >
        {options.map((opt) => {
          const selected = value === opt;
          return (
            <SegmentedControlButton
              key={opt}
              role="radio"
              aria-checked={selected}
              selected={selected}
              disabled={disabled}
              onClick={() => onChange(opt)}
            >
              {opt}
            </SegmentedControlButton>
          );
        })}
      </div>
    </div>
  );
}

export default SegmentedControl;
