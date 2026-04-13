import React, { forwardRef } from 'react';

import './SegmentedControl.css';

export interface SegmentedControlButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * Selected segment — filled brand background (Figma **SegmentedButton** / cell variant
   * `Selected=True`, node `3446:1193` in `1pYVDCkei9zOaAaz0GHzWq`).
   */
  selected?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Single segment for a segmented button group. Compose inside a container with class
 * `sds-segmented__group` (see {@link SegmentedControl}).
 *
 * **Interaction states** (Figma `3446:1193` — Default / Hover / Pressed × Selected on/off):
 * - **Hover** — `:hover` (unselected: neutral secondary hover; selected: brand hover).
 * - **Pressed** — `:active` (unselected: neutral tertiary hover; selected: DS **button brand pressed** — light `#e0eeff` fill, `#0a76db` label).
 * - **Selected** — `selected` prop adds `sds-segmented__btn--selected`.
 */
export const SegmentedControlButton = forwardRef<HTMLButtonElement, SegmentedControlButtonProps>(
  function SegmentedControlButton(
    { selected = false, className = '', disabled, children, type = 'button', ...rest },
    ref,
  ) {
    const variant = selected ? 'sds-segmented__btn--selected' : 'sds-segmented__btn--plain';
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={['sds-segmented__btn', variant, className].filter(Boolean).join(' ')}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

export default SegmentedControlButton;
