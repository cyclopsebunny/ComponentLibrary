import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { createPortal } from 'react-dom';

// ── Vertical three-dot icon ───────────────────────────────────────────────────

function VerticalDotsIcon() {
  return (
    <svg width="4" height="14" viewBox="0 0 4 14" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="2" cy="1.5" r="1.5" />
      <circle cx="2" cy="7" r="1.5" />
      <circle cx="2" cy="12.5" r="1.5" />
    </svg>
  );
}

// ── MoreTabButton ─────────────────────────────────────────────────────────────
// Split control: clicking the label navigates to that tab; clicking the dots
// icon opens the overflow dropdown.

interface MoreTabButtonProps {
  label: string;
  active?: boolean;
  /** Called when the label area is clicked — navigates to that tab */
  onLabelClick?: () => void;
  /** Called when the dots icon is clicked — opens the dropdown */
  onDotsClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  'aria-haspopup'?: React.AriaAttributes['aria-haspopup'];
  'aria-expanded'?: boolean;
}

const MoreTabButton = React.forwardRef<HTMLDivElement, MoreTabButtonProps>(
  ({ label, active = false, onLabelClick, onDotsClick, style, ...ariaProps }, ref) => {
    const [rowHovered, setRowHovered]   = React.useState(false);
    const [dotsHovered, setDotsHovered] = React.useState(false);

    const rowBg = active
      ? 'var(--sds-color-background-brand-default, #0a76db)'
      : rowHovered
        ? 'var(--sds-color-background-default-secondary-hover, #ececec)'
        : 'transparent';

    const dotsBg = active
      ? dotsHovered
        ? 'rgba(255,255,255,0.18)'
        : 'transparent'
      : dotsHovered
        ? 'rgba(0,0,0,0.08)'
        : 'transparent';

    const textColor = active
      ? 'var(--sds-color-text-brand-on-brand, #ffffff)'
      : 'var(--sds-color-text-default-secondary, #636363)';

    return (
      <div
        ref={ref}
        aria-current={active ? 'true' : undefined}
        onMouseEnter={() => setRowHovered(true)}
        onMouseLeave={() => setRowHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: 'var(--nexus-shape-borderradius-xs, 8px)',
          background: rowBg,
          transition: 'background 0.12s ease',
          flexShrink: 0,
          overflow: 'hidden',
          ...style,
        }}
      >
        {/* Label area — navigates to the tab */}
        <button
          type="button"
          onClick={onLabelClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: 'var(--sds-size-space-150, 6px) 6px var(--sds-size-space-150, 6px) var(--sds-size-space-600, 24px)',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
              fontSize: 'var(--sds-typography-body-size-small, 14px)',
              fontWeight: active
                ? ('var(--sds-typography-weight-bold, 700)' as unknown as number)
                : ('var(--sds-typography-weight-medium, 500)' as unknown as number),
              lineHeight: '22px',
              color: textColor,
              pointerEvents: 'none',
            }}
          >
            {label}
          </span>
        </button>

        {/* Dots icon — opens the dropdown */}
        <button
          type="button"
          onClick={onDotsClick}
          onMouseEnter={() => setDotsHovered(true)}
          onMouseLeave={() => setDotsHovered(false)}
          {...ariaProps}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--sds-size-space-150, 6px) var(--sds-size-space-300, 12px)',
            border: 'none',
            background: dotsBg,
            cursor: 'pointer',
            borderRadius: 6,
            transition: 'background 0.12s ease',
            color: textColor,
          }}
        >
          <VerticalDotsIcon />
        </button>
      </div>
    );
  },
);

MoreTabButton.displayName = 'MoreTabButton';

// ── TabButton ─────────────────────────────────────────────────────────────────

export interface TabButtonProps {
  /** Visible label */
  label: string;
  /** Whether this tab is currently selected */
  active?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** Disabled state */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const TabButton = React.forwardRef<HTMLButtonElement, TabButtonProps>(({
  label,
  active = false,
  onClick,
  disabled = false,
  className = '',
  style,
}, ref) => {
  const [hovered, setHovered] = useState(false);

  const bg = active
    ? hovered
      ? 'var(--sds-color-background-brand-hover, #0966c7)'
      : 'var(--sds-color-background-brand-default, #0a76db)'
    : hovered
      ? 'var(--sds-color-background-default-secondary-hover, #ececec)'
      : 'transparent';

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--sds-size-space-150, 6px) var(--sds-size-space-600, 24px)',
    borderRadius: 'var(--nexus-shape-borderradius-xs, 8px)',
    background: bg,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    whiteSpace: 'nowrap',
    transition: 'background 0.12s ease',
    flexShrink: 0,
    ...style,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
    fontSize: 'var(--sds-typography-body-size-small, 14px)',
    fontWeight: active
      ? 'var(--sds-typography-weight-bold, 700)' as unknown as number
      : 'var(--sds-typography-weight-medium, 500)' as unknown as number,
    lineHeight: '22px',
    letterSpacing: 0,
    color: active
      ? 'var(--sds-color-text-brand-on-brand, #ffffff)'
      : 'var(--sds-color-text-default-secondary, #636363)',
    pointerEvents: 'none',
  };

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      style={buttonStyle}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-current={active ? 'true' : undefined}
      aria-disabled={disabled}
    >
      <span style={labelStyle}>{label}</span>
    </button>
  );
});

TabButton.displayName = 'TabButton';

// ── Tabs ──────────────────────────────────────────────────────────────────────

export interface TabItem {
  /** Unique identifier */
  id: string;
  /** Visible label */
  label: string;
  /** Optionally disable this tab */
  disabled?: boolean;
}

export interface TabsProps {
  /** Tab definitions */
  items: TabItem[];
  /** Id of the currently active tab */
  activeTab?: string;
  /** Called with the id of the newly-selected tab */
  onTabChange?: (id: string) => void;
  /** Gap between tab buttons in px. Defaults to 16. */
  gap?: number;
  /** Horizontal (left/right) padding on each tab button in px. Defaults to 24. */
  buttonPaddingX?: number;
  /** Vertical (top/bottom) padding on each tab button in px. Defaults to 6. */
  buttonPaddingY?: number;
  /** Border radius on each tab button in px. Defaults to 8. */
  buttonBorderRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

const TAB_GAP = 16;

// Shared frosted-glass visual spec (used for both the bar and the dropdown)
const FROSTED: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  borderTop: 'none',
  borderLeft: '0.75px solid #d2efff',
  borderRight: '0.75px solid #d2efff',
  borderBottom: '0.75px solid #d2efff',
  borderRadius: 16,
  boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
  fontFamily: 'var(--sds-typography-body-font-family, "Inter", sans-serif)',
};

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onTabChange,
  gap: gapProp,
  buttonPaddingX,
  buttonPaddingY,
  buttonBorderRadius,
  className = '',
  style,
}) => {
  const gap = gapProp ?? TAB_GAP;
  const btnPadding = buttonPaddingX !== undefined || buttonPaddingY !== undefined
    ? `${buttonPaddingY ?? 6}px ${buttonPaddingX ?? 24}px`
    : undefined;
  const btnStyle: React.CSSProperties | undefined =
    btnPadding !== undefined || buttonBorderRadius !== undefined
      ? {
          ...(btnPadding ? { padding: btnPadding } : {}),
          ...(buttonBorderRadius !== undefined ? { borderRadius: buttonBorderRadius } : {}),
        }
      : undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  // measureRefs[i] = width of TabButton for items[i]
  const measureRefs = useRef<(HTMLButtonElement | null)[]>([]);
  // moreRefs[i] = width of MoreTabButton showing items[i].label
  const moreRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(items.length);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState<{ top: number; right: number } | null>(null);

  // Reset when the item list changes
  const itemKey = items.map((i) => i.id).join('\x00');
  useEffect(() => {
    setVisibleCount(items.length);
    setDropdownOpen(false);
  }, [itemKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Recalculate visible count whenever the container resizes
  useLayoutEffect(() => {
    const calculate = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const cs = getComputedStyle(container);
      const padH = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      const available = container.clientWidth - padH;
      if (available <= 0) return;

      // Tab widths and per-label MoreTabButton widths from the hidden measurement layer
      const tabWidths = items.map((_, i) => measureRefs.current[i]?.offsetWidth ?? 0);
      const moreWidths = items.map((_, i) => moreRefs.current[i]?.offsetWidth ?? 0);

      // Bail out if measurement layer hasn't mounted yet
      if (tabWidths.some((w) => w === 0) || moreWidths.some((w) => w === 0)) return;

      // Check whether all tabs fit without a "more" button
      const totalAll = tabWidths.reduce((sum, w, i) => sum + w + (i > 0 ? gap : 0), 0);
      if (totalAll <= available) {
        setVisibleCount(items.length);
        return;
      }

      // Find the last tab index that fits alongside the "more" button.
      // When count = i+1 tabs are visible, the more button shows items[i+1].label,
      // so its width is moreWidths[i+1].
      let running = 0;
      let count = 0;
      for (let i = 0; i < tabWidths.length; i++) {
        const w = tabWidths[i] + (i > 0 ? gap : 0);
        const moreWidth = i + 1 < items.length ? moreWidths[i + 1] : 0;
        const needMore = i + 1 < items.length;
        if (!needMore || running + w + gap + moreWidth <= available) {
          running += w;
          count = i + 1;
        } else {
          break;
        }
      }
      setVisibleCount(count);
    };

    const obs = new ResizeObserver(calculate);
    if (containerRef.current) obs.observe(containerRef.current);
    calculate();
    return () => obs.disconnect();
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  // Close dropdown on outside click or scroll
  useEffect(() => {
    if (!dropdownOpen) return;

    const closeOnOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !containerRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setDropdownOpen(false);
      }
    };

    const closeOnScroll = () => setDropdownOpen(false);

    document.addEventListener('mousedown', closeOnOutside);
    document.addEventListener('scroll', closeOnScroll, true);
    window.addEventListener('resize', closeOnScroll);
    return () => {
      document.removeEventListener('mousedown', closeOnOutside);
      document.removeEventListener('scroll', closeOnScroll, true);
      window.removeEventListener('resize', closeOnScroll);
    };
  }, [dropdownOpen]);

  const hasOverflow = visibleCount < items.length;
  const hiddenItems = items.slice(visibleCount);
  const hasHiddenActive = hiddenItems.some((item) => item.id === activeTab);

  // Label shown on the "more" button: the active hidden tab, or the first hidden tab
  const moreButtonLabel =
    hiddenItems.find((item) => item.id === activeTab)?.label ??
    hiddenItems[0]?.label ??
    '';

  // The label on the more button represents the first hidden tab (or active hidden tab).
  // Clicking the label navigates directly to that tab.
  const moreButtonTabId =
    hiddenItems.find((item) => item.id === activeTab)?.id ??
    hiddenItems[0]?.id ??
    '';

  const handleMoreLabelClick = () => {
    if (moreButtonTabId) handleTabSelect(moreButtonTabId);
  };

  const handleDotsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownAnchor({ top: rect.bottom + 4, right: window.innerWidth - rect.right });
    setDropdownOpen((o) => !o);
  };

  const handleTabSelect = (id: string) => {
    onTabChange?.(id);
    setDropdownOpen(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Hidden measurement layer (portaled to body, fixed offscreen) ── */}
      {createPortal(
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: -9999,
            left: -9999,
            visibility: 'hidden',
            pointerEvents: 'none',
            display: 'flex',
            gap,
            padding: '8.75px 16.75px 8px 16.75px',
          }}
        >
          {items.map((item, i) => (
            <TabButton
              key={`measure-tab-${item.id}`}
              ref={(el) => { measureRefs.current[i] = el; }}
              label={item.label}
              style={btnStyle}
            />
          ))}
          {/* MoreTabButton measured for each label so the loop uses the exact width */}
          {items.map((item, i) => (
            <MoreTabButton
              key={`measure-more-${item.id}`}
              ref={(el: HTMLDivElement | null) => { moreRefs.current[i] = el; }}
              label={item.label}
            />
          ))}
        </div>,
        document.body,
      )}

      {/* ── Visible tab bar ── */}
      <div
        ref={containerRef}
        className={className}
        role="tablist"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 12,
          paddingRight: 12,
          overflow: 'hidden',
          ...FROSTED,
          ...style,
        }}
      >
        {items.slice(0, visibleCount).map((item) => (
          <TabButton
            key={item.id}
            label={item.label}
            active={item.id === activeTab}
            disabled={item.disabled}
            onClick={() => handleTabSelect(item.id)}
            style={btnStyle}
          />
        ))}

        {/* overflow "more" button */}
        {hasOverflow && (
          <MoreTabButton
            label={moreButtonLabel}
            active={hasHiddenActive}
            onLabelClick={handleMoreLabelClick}
            onDotsClick={handleDotsClick}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          />
        )}
      </div>

      {/* ── Overflow dropdown (portaled to body so overflow:hidden can't clip it) ── */}
      {dropdownOpen && dropdownAnchor && createPortal(
        <div
          ref={dropdownRef}
          role="menu"
          style={{
            position: 'fixed',
            top: dropdownAnchor.top,
            right: dropdownAnchor.right,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            padding: 8,
            zIndex: 9999,
            minWidth: 180,
            ...FROSTED,
            // Slightly more opaque for the dropdown
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0px 4px 16px 0px rgba(149, 172, 188, 0.25)',
          }}
        >
          {hiddenItems.map((item) => (
            <TabButton
              key={item.id}
              label={item.label}
              active={item.id === activeTab}
              disabled={item.disabled}
              onClick={() => handleTabSelect(item.id)}
              style={{ justifyContent: 'flex-start', padding: '6px 16px', width: '100%' }}
            />
          ))}
        </div>,
        document.body,
      )}
    </>
  );
};

export default Tabs;
