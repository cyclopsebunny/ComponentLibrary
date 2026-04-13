import React, { useEffect, useRef, useState, useId } from 'react';

// ── Resize handle SVG ────────────────────────────────────────────────────────
// Matches Figma "Drag" element: 6.627×6.627 px, bottom: 5.52, right: 4.52
// Three diagonal strokes — standard corner-resize visual

function ResizeHandle({ disabled = false }: { disabled?: boolean }) {
  const stroke = disabled ? '#d0d0d0' : '#b2b2b2';
  return (
    <svg
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <line x1="1"   y1="6.5" x2="6.5" y2="1"   stroke={stroke} strokeWidth="0.8" strokeLinecap="round" />
      <line x1="3.5" y1="6.5" x2="6.5" y2="3.5" stroke={stroke} strokeWidth="0.8" strokeLinecap="round" />
      <line x1="6"   y1="6.5" x2="6.5" y2="6"   stroke={stroke} strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

// ── Types ────────────────────────────────────────────────────────────────────

export type TextareaState = 'default' | 'error' | 'disabled';

export interface TextareaProps {
  /** Field label rendered above the textarea */
  label?: string;
  /** Secondary description rendered below the label */
  description?: string;
  /** Hint / error text rendered below the textarea */
  hint?: string;
  /** Placeholder text shown when the textarea is empty */
  placeholder?: string;
  /** Controlled value */
  value?: string;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Change handler (controlled mode) */
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Visual / interaction state */
  state?: TextareaState;
  /** Initial width in px — component is resizable from this starting point */
  initialWidth?: number;
  /** Minimum resize width in px */
  minWidth?: number;
  /** Minimum resize height in px */
  minHeight?: number;
  /** Whether the resize handle is shown (default: true) */
  resizable?: boolean;
  id?: string;
  name?: string;
  rows?: number;
  className?: string;
  style?: React.CSSProperties;
}

// ── Token map ────────────────────────────────────────────────────────────────

const TOKENS = {
  border: {
    default:  'var(--button-default-enabled-stroke,  #b2b2b2)',
    error:    'var(--button-danger-enabled-stroke,   #c61735)',
    disabled: 'var(--button-default-disabled-stroke, #b2b2b2)',
    focus:    'var(--sds-color-stroke-brand-default,  #0a76db)',
  },
  bg: {
    default:  'var(--button-default-enabled-background,  #ffffff)',
    error:    'var(--button-default-enabled-background,  #ffffff)',
    disabled: 'var(--button-default-disabled-background, #f7f7f7)',
  },
  text: {
    value:       'var(--button-default-enabled-text,     #191919)',
    placeholder: 'var(--sds-color-text-disabled-default, #b2b2b2)',
    disabled:    'var(--button-default-disabled-text,    #b2b2b2)',
    label:       'var(--button-default-enabled-text,     #191919)',
    description: 'var(--sds-color-text-default-secondary, #636363)',
    hint:        'var(--sds-color-text-default-secondary, #636363)',
    hintError:   'var(--sds-color-text-danger-default,    #c61735)',
    hintDisabled:'var(--sds-color-text-disabled-default,  #b2b2b2)',
  },
  focusShadow: '0 0 0 3px rgba(10, 118, 219, 0.18)',
};

// ── Component ────────────────────────────────────────────────────────────────

/**
 * Textarea
 *
 * Multi-line text input. Matches Figma node 9762:3088.
 *
 * States: default · error · disabled
 * Features: label, description, hint/error text, custom drag-to-resize handle
 */
export const Textarea: React.FC<TextareaProps> = ({
  label,
  description,
  hint,
  placeholder,
  value,
  defaultValue,
  onChange,
  state = 'default',
  initialWidth = 240,
  minWidth = 240,
  minHeight = 80,
  resizable = true,
  id: idProp,
  name,
  rows,
  className = '',
  style,
}) => {
  const generatedId = useId();
  const inputId = idProp ?? `textarea-${generatedId}`;

  const [focused, setFocused] = useState(false);

  // ── Resize state ────────────────────────────────────────────────────────
  const [size, setSize] = useState({ width: initialWidth, height: minHeight });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const onHandleMouseDown = (e: React.MouseEvent) => {
    if (state === 'disabled') return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, w: size.width, h: size.height };
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setSize({
        width:  Math.max(minWidth,  dragStart.current.w + dx),
        height: Math.max(minHeight, dragStart.current.h + dy),
      });
    };
    const onUp = () => { isDragging.current = false; };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [minWidth, minHeight]);

  // ── Derived styles ──────────────────────────────────────────────────────
  const isDisabled = state === 'disabled';
  const isError    = state === 'error';

  const borderColor = focused && !isDisabled
    ? TOKENS.border.focus
    : isError
      ? TOKENS.border.error
      : isDisabled
        ? TOKENS.border.disabled
        : TOKENS.border.default;

  const boxShadow = focused && !isDisabled ? TOKENS.focusShadow : 'none';

  const wrapperStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'stretch',
    width: size.width,
    fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
    ...style,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--sds-typography-body-size-medium, 16px)',
    fontWeight: 400,
    lineHeight: '22px',
    color: TOKENS.text.label,
    margin: 0,
  };

  const descStyle: React.CSSProperties = {
    ...labelStyle,
    color: TOKENS.text.description,
  };

  const boxStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 4,
    minHeight: size.height,
    padding: '8px 4px 12px 16px',
    borderRadius: 8,
    border: `1px solid ${borderColor}`,
    background: isDisabled ? TOKENS.bg.disabled : TOKENS.bg.default,
    boxShadow,
    transition: 'border-color 0.12s ease, box-shadow 0.12s ease',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };

  const textareaStyle: React.CSSProperties = {
    flex: '1 0 0',
    width: '100%',
    minHeight: size.height - 20, // subtract vertical padding (8px top + 12px bottom)
    border: 'none',
    outline: 'none',
    background: 'transparent',
    padding: 0,
    margin: 0,
    resize: 'none',
    fontSize: 'var(--sds-typography-body-size-medium, 16px)',
    fontWeight: 400,
    lineHeight: '22px',
    fontFamily: 'inherit',
    color: isDisabled
      ? TOKENS.text.disabled
      : TOKENS.text.value,
    caretColor: 'var(--sds-color-stroke-brand-default, #0a76db)',
  };

  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 5.52,
    right: 4.52,
    width: 6.627,
    height: 6.627,
    cursor: isDisabled ? 'default' : 'se-resize',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const hintColor = isError
    ? TOKENS.text.hintError
    : isDisabled
      ? TOKENS.text.hintDisabled
      : TOKENS.text.hint;

  const hintStyle: React.CSSProperties = {
    ...labelStyle,
    color: hintColor,
    margin: 0,
  };

  return (
    <div className={className} style={wrapperStyle}>
      {label && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}

      {description && (
        <p style={descStyle}>{description}</p>
      )}

      <div style={boxStyle}>
        <textarea
          id={inputId}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          disabled={isDisabled}
          style={textareaStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-invalid={isError ? true : undefined}
          aria-describedby={hint ? `${inputId}-hint` : undefined}
        />

        {resizable && (
          <div
            style={handleStyle}
            onMouseDown={onHandleMouseDown}
            aria-hidden="true"
          >
            <ResizeHandle disabled={isDisabled} />
          </div>
        )}
      </div>

      {hint && (
        <p id={`${inputId}-hint`} style={hintStyle}>
          {hint}
        </p>
      )}
    </div>
  );
};

export default Textarea;
