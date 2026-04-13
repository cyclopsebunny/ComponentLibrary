import React, { useId } from 'react';

// ── Switch graphics from Figma exports (node 9762:1902) — 1:1 viewBox px (not dev-frame scaled) ─

/** Figma track size (34×14) — layout box excludes drop-shadow bleed. SVG is centered here with absolute positioning so shadows paint outside without shifting the description. */
const SWITCH_LAYOUT_W = 34;
const SWITCH_LAYOUT_H = 14;

const svgInline: React.CSSProperties = {
  display: 'block',
  flexShrink: 0,
  overflow: 'visible',
};

function SwitchSvgEnabledOn({ filterId }: { filterId: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40.5 28"
      width={40.5}
      height={28}
      aria-hidden
      style={svgInline}
    >
      <g>
        <path
          d="M0 10.5C0 6.63401 3.13401 3.5 7 3.5H27C30.866 3.5 34 6.63401 34 10.5V10.5C34 14.366 30.866 17.5 27 17.5H7C3.13401 17.5 0 14.366 0 10.5V10.5Z"
          fill="var(--sds-color-background-brand-default, #0A76DB)"
        />
        <g filter={`url(#${filterId})`}>
          <path
            d="M37 10.5C37 16.0228 32.5228 20.5 27 20.5C21.4772 20.5 17 16.0228 17 10.5C17 4.97715 21.4772 0.5 27 0.5C32.5228 0.5 37 4.97715 37 10.5Z"
            fill="var(--sds-color-background-default-default, #ffffff)"
          />
          <path
            d="M37 10.5C37 16.0228 32.5228 20.5 27 20.5C21.4772 20.5 17 16.0228 17 10.5C17 4.97715 21.4772 0.5 27 0.5C32.5228 0.5 37 4.97715 37 10.5Z"
            stroke="var(--sds-color-background-brand-default, #0A76DB)"
          />
        </g>
      </g>
      <defs>
        <filter
          id={filterId}
          x="13.5"
          y="0"
          width="27"
          height="28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0743502 0 0 0 0 0.0743502 0 0 0 0 0.0743502 0 0 0 0.1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_dropShadow" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0743502 0 0 0 0 0.0743502 0 0 0 0 0.0743502 0 0 0 0.2 0"
          />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

function SwitchSvgEnabledOff({ filterId }: { filterId: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 40 27"
      width={40}
      height={27}
      aria-hidden
      style={svgInline}
    >
      <g>
        <path
          d="M13 3.5H33C36.5899 3.5 39.5 6.41015 39.5 10C39.5 13.5899 36.5899 16.5 33 16.5H13C9.41015 16.5 6.5 13.5899 6.5 10C6.5 6.41015 9.41015 3.5 13 3.5Z"
          fill="var(--sds-color-background-default-default, #ffffff)"
        />
        <path
          d="M13 3.5H33C36.5899 3.5 39.5 6.41015 39.5 10C39.5 13.5899 36.5899 16.5 33 16.5H13C9.41015 16.5 6.5 13.5899 6.5 10C6.5 6.41015 9.41015 3.5 13 3.5Z"
          stroke="var(--sds-color-text-disabled-default, #B2B2B2)"
        />
        <g filter={`url(#${filterId})`}>
          <path
            d="M23 10C23 15.5228 18.5228 20 13 20C7.47715 20 3 15.5228 3 10C3 4.47715 7.47715 0 13 0C18.5228 0 23 4.47715 23 10Z"
            fill="var(--sds-color-background-default-default, #ffffff)"
          />
          <path
            d="M13 0.5C18.2467 0.5 22.5 4.75329 22.5 10C22.5 15.2467 18.2467 19.5 13 19.5C7.75329 19.5 3.5 15.2467 3.5 10C3.5 4.75329 7.75329 0.5 13 0.5Z"
            stroke="var(--sds-color-text-disabled-default, #B2B2B2)"
          />
        </g>
      </g>
      <defs>
        <filter
          id={filterId}
          x="0"
          y="0"
          width="26"
          height="27"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0743502 0 0 0 0 0.0743502 0 0 0 0 0.0743502 0 0 0 0.1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_dropShadow" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0743502 0 0 0 0 0.0743502 0 0 0 0 0.0743502 0 0 0 0.2 0"
          />
          <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

function SwitchSvgDisabledOn({ maskId }: { maskId: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 37 20"
      width={37}
      height={20}
      aria-hidden
      style={svgInline}
    >
      <g>
        <mask id={maskId} fill="white">
          <path d="M0 10C0 6.13401 3.13401 3 7 3H27C30.866 3 34 6.13401 34 10V10C34 13.866 30.866 17 27 17H7C3.13401 17 0 13.866 0 10V10Z" />
        </mask>
        <path
          d="M0 10C0 6.13401 3.13401 3 7 3H27C30.866 3 34 6.13401 34 10V10C34 13.866 30.866 17 27 17H7C3.13401 17 0 13.866 0 10V10Z"
          fill="var(--sds-color-text-disabled-default, #B2B2B2)"
        />
        <path
          d="M7 3V4H27V3V2H7V3ZM27 17V16H7V17V18H27V17ZM7 17V16C3.68629 16 1 13.3137 1 10H0H-1C-1 14.4183 2.58172 18 7 18V17ZM34 10H33C33 13.3137 30.3137 16 27 16V17V18C31.4183 18 35 14.4183 35 10H34ZM27 3V4C30.3137 4 33 6.68629 33 10H34H35C35 5.58172 31.4183 2 27 2V3ZM7 3V2C2.58172 2 -1 5.58172 -1 10H0H1C1 6.68629 3.68629 4 7 4V3Z"
          fill="var(--sds-color-text-disabled-default, #B2B2B2)"
          mask={`url(#${maskId})`}
        />
        <path
          d="M27 0.5C32.2467 0.5 36.5 4.75329 36.5 10C36.5 15.2467 32.2467 19.5 27 19.5C21.7533 19.5 17.5 15.2467 17.5 10C17.5 4.75329 21.7533 0.5 27 0.5Z"
          fill="var(--sds-color-background-disabled-default, #F7F7F7)"
          stroke="var(--sds-color-text-disabled-default, #B2B2B2)"
        />
      </g>
    </svg>
  );
}

function SwitchSvgDisabledOff({ maskId }: { maskId: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 37 20"
      width={37}
      height={20}
      aria-hidden
      style={svgInline}
    >
      <g>
        <mask id={maskId} fill="white">
          <path d="M3 10C3 6.13401 6.13401 3 10 3H30C33.866 3 37 6.13401 37 10V10C37 13.866 33.866 17 30 17H10C6.13401 17 3 13.866 3 10V10Z" />
        </mask>
        <path
          d="M3 10C3 6.13401 6.13401 3 10 3H30C33.866 3 37 6.13401 37 10V10C37 13.866 33.866 17 30 17H10C6.13401 17 3 13.866 3 10V10Z"
          fill="var(--sds-color-background-disabled-default, #F7F7F7)"
        />
        <path
          d="M10 3V4H30V3V2H10V3ZM30 17V16H10V17V18H30V17ZM10 17V16C6.68629 16 4 13.3137 4 10H3H2C2 14.4183 5.58172 18 10 18V17ZM37 10H36C36 13.3137 33.3137 16 30 16V17V18C34.4183 18 38 14.4183 38 10H37ZM30 3V4C33.3137 4 36 6.68629 36 10H37H38C38 5.58172 34.4183 2 30 2V3ZM10 3V2C5.58172 2 2 5.58172 2 10H3H4C4 6.68629 6.68629 4 10 4V3Z"
          fill="var(--sds-color-text-disabled-default, #B2B2B2)"
          mask={`url(#${maskId})`}
        />
        <path
          d="M10 0.5C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.5 15.2467 0.5 10C0.5 4.75329 4.75329 0.5 10 0.5Z"
          fill="var(--sds-color-background-disabled-default, #F7F7F7)"
          stroke="var(--sds-color-text-disabled-default, #B2B2B2)"
        />
      </g>
    </svg>
  );
}

function SwitchVisual({ checked, disabled }: { checked: boolean; disabled: boolean }) {
  const reactId = useId().replace(/:/g, '');
  const filterEnabled = `sw-f-${reactId}`;
  const maskDisabledOn = `sw-m-on-${reactId}`;
  const maskDisabledOff = `sw-m-off-${reactId}`;

  if (disabled) {
    return checked ? (
      <SwitchSvgDisabledOn maskId={maskDisabledOn} />
    ) : (
      <SwitchSvgDisabledOff maskId={maskDisabledOff} />
    );
  }
  return checked ? (
    <SwitchSvgEnabledOn filterId={filterEnabled} />
  ) : (
    <SwitchSvgEnabledOff filterId={`${filterEnabled}-off`} />
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SwitchFieldProps {
  /** Primary label (16px / body base) */
  label: string;
  /** Secondary line under the label row (14px / body small); omit to hide */
  description?: string;
  /** Controlled on state */
  checked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * SwitchField
 *
 * Toggle with label on the left, switch on the right, optional description below.
 * Matches Figma **Switch Field** (node `9762:1902`). Switch art is drawn at exported SVG size (1:1 viewBox), not the Dev Mode frame size.
 */
export const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  description,
  checked = false,
  disabled = false,
  onChange,
  id: idProp,
  name,
  value,
  className = '',
  style,
}) => {
  const reactId = useId();
  const id = idProp ?? `switch-field-${reactId.replace(/:/g, '')}`;

  const hasDescription = Boolean(description);

  const labelColor = disabled
    ? 'var(--sds-color-text-disabled-default, #b2b2b2)'
    : 'var(--sds-color-text-default-default, #191919)';

  const descColor = disabled
    ? 'var(--sds-color-text-disabled-on-disabled, #cccccc)'
    : 'var(--sds-color-text-default-secondary, #636363)';

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
        maxWidth: 340,
        paddingTop: 'var(--sds-size-space-100, 4px)',
        paddingBottom: 'var(--sds-size-space-100, 4px)',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <input
        id={id}
        name={name}
        value={value}
        type="checkbox"
        role="switch"
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
          width: '100%',
        }}
      >
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
        <span
          style={{
            position: 'relative',
            width: SWITCH_LAYOUT_W,
            height: SWITCH_LAYOUT_H,
            flexShrink: 0,
            overflow: 'visible',
          }}
        >
          <span
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              overflow: 'visible',
              lineHeight: 0,
            }}
          >
            <SwitchVisual checked={checked} disabled={disabled} />
          </span>
        </span>
      </label>

      {hasDescription && (
        <p
          style={{
            margin: 0,
            width: '100%',
            fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
            fontWeight: 'var(--sds-typography-body-font-weight-regular, 400)',
            fontSize: 'var(--sds-typography-body-size-small, 14px)',
            lineHeight: '22px',
            color: descColor,
            minWidth: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SwitchField;
