import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import './SelectField.css';

// ── Types ─────────────────────────────────────────────────────────────────────

export type SelectFieldState = 'Enabled' | 'Disabled' | 'Error' | 'Focused';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps {
  label?: string;
  hasLabel?: boolean;
  isRequired?: boolean;
  description?: string;
  hasDescription?: boolean;
  error?: string;
  hasError?: boolean;
  /** Options shown in the list (`3133:5200`). */
  options: readonly SelectOption[];
  /** Selected value (controlled). */
  value?: string;
  /** Initial value (uncontrolled). */
  defaultValue?: string;
  /** Shown when no value is selected. */
  placeholder?: string;
  outlined?: boolean;
  state?: SelectFieldState;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ── Tokens (label shell aligned with InputField `2136:2263`) ───────────────────

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

const SPACE_050 = 'var(--sds-size-space-050, 2px)';
const SPACE_200 = 'var(--sds-size-space-200, 8px)';

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="sds-select-field__check" width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.2L6.5 11.2L12.5 4.2"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * SelectField — single-select dropdown aligned with Figma **Dropdown** `2136:2336`
 * (list shell `3116:2618`, rows `3133:5200`, trigger / value `3172:4499`).
 */
export const SelectField: React.FC<SelectFieldProps> = ({
  label = 'Label',
  hasLabel = true,
  isRequired = false,
  description,
  hasDescription = false,
  error,
  hasError = false,
  options,
  value: valueProp,
  defaultValue = '',
  placeholder = 'Select…',
  outlined = true,
  state: stateProp,
  onChange,
  id: idProp,
  name,
  className = '',
  style,
}) => {
  const reactId = useId();
  const baseId = idProp ?? `select-field-${reactId.replace(/:/g, '')}`;
  const labelId = `${baseId}-label`;
  const listId = `${baseId}-listbox`;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = valueProp !== undefined ? valueProp : internalValue;

  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [listBox, setListBox] = useState({ top: 0, left: 0, width: 0 });

  const [internalFocused, setInternalFocused] = useState(false);
  const effectiveState: SelectFieldState =
    stateProp ?? (internalFocused || open ? 'Focused' : 'Enabled');
  const isDisabled = effectiveState === 'Disabled';
  const isError = effectiveState === 'Error' || hasError;

  const setValue = useCallback(
    (v: string) => {
      if (valueProp === undefined) setInternalValue(v);
      onChange?.(v);
    },
    [onChange, valueProp],
  );

  const enabledIndices = options
    .map((o, i) => (o.disabled ? -1 : i))
    .filter((i) => i >= 0);

  const selectedLabel = options.find((o) => o.value === selected)?.label;
  const showPlaceholder = selectedLabel === undefined || selected === '';

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setListBox({
      top: rect.bottom + 4,
      left: rect.left,
      width: Math.max(rect.width, 160),
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onReposition = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setListBox({
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.max(rect.width, 160),
      });
    };
    window.addEventListener('resize', onReposition);
    return () => window.removeEventListener('resize', onReposition);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t)) return;
      if (listRef.current?.contains(t)) return;
      setOpen(false);
      setHighlightedIndex(-1);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        setHighlightedIndex(-1);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const moveHighlight = (delta: number) => {
    if (enabledIndices.length === 0) return;
    const currentPos = enabledIndices.indexOf(highlightedIndex);
    const nextPos =
      currentPos < 0
        ? delta > 0
          ? 0
          : enabledIndices.length - 1
        : (currentPos + delta + enabledIndices.length) % enabledIndices.length;
    setHighlightedIndex(enabledIndices[nextPos]!);
  };

  const selectIndex = (index: number) => {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    setValue(opt.value);
    setOpen(false);
    setHighlightedIndex(-1);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlightedIndex(enabledIndices[0] ?? -1);
      } else {
        moveHighlight(1);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setHighlightedIndex(enabledIndices[enabledIndices.length - 1] ?? -1);
      } else {
        moveHighlight(-1);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) {
        if (highlightedIndex >= 0) selectIndex(highlightedIndex);
        else setOpen(false);
      } else {
        const idx = options.findIndex((x) => x.value === selected && !x.disabled);
        setHighlightedIndex(idx >= 0 ? idx : enabledIndices[0] ?? -1);
        setOpen(true);
      }
    } else if (e.key === 'Tab') {
      setOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const triggerClasses = [
    'sds-select-field__trigger',
    outlined ? '' : 'sds-select-field__trigger--underline',
    open && !isDisabled ? 'sds-select-field__trigger--open' : '',
    effectiveState === 'Focused' && !isDisabled && !open ? 'sds-select-field__trigger--focused' : '',
    isError && !isDisabled ? 'sds-select-field__trigger--error' : '',
    isDisabled ? 'sds-select-field__trigger--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const supportingColor =
    isError && error
      ? COLOR_TEXT_DANGER
      : effectiveState === 'Focused' || open
        ? COLOR_TEXT_ACCENT
        : COLOR_TEXT_DEFAULT;

  const listPortal =
    open &&
    !isDisabled &&
    createPortal(
      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        className="sds-select-field__list"
        style={{
          top: listBox.top,
          left: listBox.left,
          width: listBox.width,
        }}
        aria-labelledby={hasLabel ? labelId : undefined}
      >
        {options.map((opt, i) => {
          const isSelected = opt.value === selected;
          const isHi = i === highlightedIndex;
          const optClass = [
            'sds-select-field__option',
            isSelected ? 'sds-select-field__option--selected' : '',
            isHi ? 'sds-select-field__option--highlighted' : '',
            opt.disabled ? 'sds-select-field__option--disabled' : '',
          ]
            .filter(Boolean)
            .join(' ');
          return (
            <li key={opt.value} role="presentation" style={{ listStyle: 'none', margin: 0 }}>
              <button
                id={`${baseId}-opt-${i}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={opt.disabled}
                className={optClass}
                onMouseEnter={() => !opt.disabled && setHighlightedIndex(i)}
                onClick={() => selectIndex(i)}
              >
                <CheckIcon />
                <span className="sds-select-field__option-label">{opt.label}</span>
              </button>
            </li>
          );
        })}
      </ul>,
      document.body,
    );

  return (
    <div className={`sds-select-field ${className}`.trim()} style={style}>
      {name != null && name !== '' && <input type="hidden" name={name} value={selected} readOnly aria-hidden />}

      {hasLabel && (
        <label
          id={labelId}
          htmlFor={baseId}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: SPACE_050,
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHT,
            lineHeight: '22px',
            marginBottom: SPACE_200,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
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
          <span
            style={{
              color: isDisabled ? COLOR_TEXT_DISABLED : COLOR_TEXT_SECONDARY,
              fontSize: FONT_SIZE_MD,
              margin: 0,
            }}
          >
            {label}
          </span>
        </label>
      )}

      {hasDescription && description && (
        <p
          style={{
            margin: `0 0 ${SPACE_200}`,
            color: isDisabled ? COLOR_TEXT_DISABLED_ON : COLOR_TEXT_SECONDARY,
            fontSize: FONT_SIZE_SM,
            width: '100%',
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHT,
            lineHeight: '22px',
          }}
        >
          {description}
        </p>
      )}

      <button
        ref={triggerRef}
        type="button"
        id={baseId}
        role="combobox"
        className={triggerClasses}
        disabled={isDisabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={hasLabel ? labelId : undefined}
        aria-activedescendant={
          open && highlightedIndex >= 0 ? `${baseId}-opt-${highlightedIndex}` : undefined
        }
        aria-invalid={isError || undefined}
        onClick={() => {
          if (isDisabled) return;
          if (open) {
            setOpen(false);
            setHighlightedIndex(-1);
          } else {
            const idx = options.findIndex((x) => x.value === selected && !x.disabled);
            setHighlightedIndex(idx >= 0 ? idx : enabledIndices[0] ?? -1);
            setOpen(true);
          }
        }}
        onKeyDown={onTriggerKeyDown}
        onFocus={() => {
          if (!stateProp) setInternalFocused(true);
        }}
        onBlur={(e) => {
          if (!stateProp) setInternalFocused(false);
          const rel = e.relatedTarget as Node | null;
          if (rel && listRef.current?.contains(rel)) return;
          setOpen(false);
          setHighlightedIndex(-1);
        }}
      >
        <span
          className={`sds-select-field__value${showPlaceholder ? ' sds-select-field__placeholder' : ''}`}
        >
          {showPlaceholder ? placeholder : selectedLabel}
        </span>
        <ChevronIcon className="sds-select-field__chevron" />
      </button>

      {listPortal}

      {hasError && error && (
        <p
          style={{
            margin: `${SPACE_200} 0 0`,
            color: supportingColor,
            fontSize: FONT_SIZE_MD,
            fontFamily: FONT_FAMILY,
            fontWeight: FONT_WEIGHT,
            lineHeight: '22px',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectField;
