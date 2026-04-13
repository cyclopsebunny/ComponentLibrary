import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface RightNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  alert?: boolean;
  onClick?: () => void;
}

export interface UserMenuItem {
  id: string;
  label: string;
  /** null = non-navigating action (e.g. log out) */
  path: string | null;
  /** Render a divider line above this item */
  dividerBefore?: boolean;
  /** Render the label in a destructive (red) colour */
  destructive?: boolean;
}

export interface RightNavProps {
  items: RightNavItem[];
  /** Element rendered at the top of the panel (e.g. a UserMenu) */
  avatar?: React.ReactNode;
  /** Vertical padding above the first item. Defaults to 36. */
  paddingTop?: number;
  /** Gap between items. Defaults to 24. */
  gap?: number;
}

export interface RightNavMobileStripProps {
  items: RightNavItem[];
  isOpen: boolean;
  /** Element rendered at the top of the strip (e.g. a UserMenu) */
  avatar?: React.ReactNode;
}

export interface UserMenuProps {
  size?: number;
  /** 'left' = popover opens left (desktop/tablet), 'below' = opens below (mobile) */
  placement?: 'left' | 'below';
  /** Highlight the avatar when this prefix matches the current activePath */
  activePath?: string;
  menuItems: UserMenuItem[];
  onItemClick?: (item: UserMenuItem) => void;
}

export interface BellWithBadgeProps {
  size?: number;
  /** Show the red notification dot */
  hasAlert?: boolean;
}

// ── Internal: IconBtn ─────────────────────────────────────────────────────────

interface IconBtnProps {
  children: React.ReactNode;
  label: string;
  alert?: boolean;
  size?: number;
  onClick?: () => void;
}

function IconBtn({ children, label, alert = false, size = 40, onClick }: IconBtnProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width:           size,
        height:          size,
        borderRadius:    '50%',
        border:          'none',
        padding:         4,
        backgroundColor: hovered ? '#f2f5fa' : 'transparent',
        cursor:          'pointer',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        flexShrink:      0,
        transition:      'background-color 0.15s ease',
      }}
    >
      <div
        style={{
          width:           size - 8,
          height:          size - 8,
          borderRadius:    '50%',
          backgroundColor: alert ? '#ffecea' : 'transparent',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          color:           alert ? '#d9210b' : '#191919',
        }}
      >
        {children}
      </div>
    </button>
  );
}

// ── BellWithBadge ─────────────────────────────────────────────────────────────

export function BellWithBadge({ size = 24, hasAlert = true }: BellWithBadgeProps) {
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Bell SVG */}
      <svg width={size - 4} height={size} viewBox="0 0 18.2266 21.7256" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M9.11426 0C9.66714 0.000138731 10.1143 0.447086 10.1143 1V1.80957C10.656 1.89165 11.1748 2.04038 11.6641 2.24414C11.1656 2.71948 10.765 3.29661 10.4961 3.94238C10.2809 3.87562 10.0588 3.82419 9.83105 3.78906C9.69009 3.78306 9.31218 3.76863 9.11914 3.76562H9.1084L9.06445 3.76465C8.9196 3.76465 8.53875 3.78205 8.39941 3.78906C6.13641 4.13706 4.43457 6.11425 4.43457 8.40625V10.6689C4.43457 12.5689 3.59958 14.3647 2.14258 15.5957C2.05363 15.6727 2 15.7892 2 15.9111C2.00007 16.143 2.188 16.332 2.41992 16.332H15.8076C16.0386 16.332 16.2265 16.1431 16.2266 15.9111C16.2266 15.7872 16.1732 15.6719 16.0742 15.5869C14.6304 14.3665 13.7988 12.5794 13.7939 10.6855C14.2146 10.8004 14.6572 10.8633 15.1143 10.8633C15.3463 10.8633 15.5743 10.845 15.7979 10.8145C15.8387 12.0703 16.4053 13.2489 17.3691 14.0635C17.9159 14.5315 18.2266 15.2033 18.2266 15.9111C18.2265 17.2461 17.1416 18.332 15.8076 18.332H12.9824C12.7214 20.2429 11.0961 21.7255 9.11426 21.7256C7.13327 21.7256 5.50709 20.243 5.24707 18.332H2.41992C1.086 18.332 0 17.246 0 15.9111C0 15.2053 0.308875 14.5352 0.845703 14.0742C1.8567 13.2182 2.43457 11.9789 2.43457 10.6689V8.40625C2.43457 5.12725 4.87426 2.30057 8.11426 1.80957V1C8.11426 0.447 8.56126 0 9.11426 0ZM7.27637 18.332C7.50741 19.134 8.2393 19.7256 9.11426 19.7256C9.99014 19.7255 10.7222 19.134 10.9521 18.332H7.27637ZM12.6201 2.73535C14.5333 3.92508 15.7939 6.04874 15.7939 8.40625V9.80469C15.573 9.84253 15.346 9.86327 15.1143 9.86328C14.6515 9.86328 14.2074 9.7832 13.7939 9.63867V8.40625C13.7939 6.69169 12.8418 5.15286 11.4141 4.34082C11.6748 3.70782 12.0929 3.15626 12.6201 2.73535Z" fill="#94A3B8" />
      </svg>
      {hasAlert && (
        <div style={{
          position: 'absolute', top: 1, right: 1,
          width: 7, height: 7, borderRadius: '50%',
          background: '#B35972', border: '1.5px solid #fff',
        }} />
      )}
    </div>
  );
}

// ── UserMenu ──────────────────────────────────────────────────────────────────

export function UserMenu({
  size = 24,
  placement = 'left',
  activePath,
  menuItems,
  onItemClick,
}: UserMenuProps) {
  const [open, setOpen]             = useState(false);
  const [hovered, setHovered]       = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [anchor, setAnchor]         = useState<{ centerY?: number; top?: number; right: number } | null>(null);
  const [dropTop, setDropTop]       = useState(0);
  const [arrowTop, setArrowTop]     = useState(0);
  const [dropVisible, setDropVisible] = useState(false);
  const btnRef  = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const isSelected = activePath ? true : false;

  const openMenu = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      if (placement === 'below') {
        setAnchor({ top: rect.bottom + 12, right: window.innerWidth - rect.right - 4 });
      } else {
        setAnchor({ centerY: rect.top + rect.height / 2, right: window.innerWidth - rect.left + 24 });
      }
    }
    setDropVisible(false);
    setOpen(true);
  };

  useEffect(() => {
    if (!open || !dropRef.current || !anchor) return;
    const margin = 8;
    if (placement === 'below') {
      const h   = dropRef.current.offsetHeight;
      const top = Math.min(anchor.top!, window.innerHeight - h - margin);
      setDropTop(top);
      setArrowTop(0);
    } else {
      const h       = dropRef.current.offsetHeight;
      const ideal   = anchor.centerY! - h / 2;
      const clamped = Math.max(margin, Math.min(window.innerHeight - h - margin, ideal));
      setDropTop(clamped);
      setArrowTop(anchor.centerY! - clamped);
    }
    setDropVisible(true);
  }, [open, anchor, placement]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('scroll', close, true);
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('scroll', close, true);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  const dropdown = anchor && open && createPortal(
    <div
      ref={dropRef}
      role="menu"
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        position:             'fixed',
        top:                  dropTop,
        right:                anchor.right,
        visibility:           dropVisible ? 'visible' : 'hidden',
        background:           'rgba(255,255,255,0.97)',
        backdropFilter:       'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border:               '0.75px solid #d2efff',
        borderRadius:         12,
        boxShadow:            '0px 4px 20px rgba(149,172,188,0.30)',
        minWidth:             164,
        padding:              6,
        zIndex:               9999,
        display:              'flex',
        flexDirection:        'column',
        gap:                  2,
      }}
    >
      {placement === 'left' ? (
        <div style={{
          position: 'absolute', right: -7, top: arrowTop, transform: 'translateY(-50%)',
          width: 0, height: 0,
          borderTop: '7px solid transparent', borderBottom: '7px solid transparent',
          borderLeft: '7px solid rgba(255,255,255,0.97)',
        }} />
      ) : (
        <div style={{
          position: 'absolute', top: -7, right: 12,
          width: 0, height: 0,
          borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
          borderBottom: '7px solid rgba(255,255,255,0.97)',
        }} />
      )}
      {menuItems.map((item) => {
        const isItemFocused = hoveredItem === item.id;
        return (
          <React.Fragment key={item.id}>
            {item.dividerBefore && (
              <div style={{ height: 1, background: '#e2e8f0', margin: '4px 8px' }} />
            )}
            <button
              type="button"
              role="menuitem"
              onClick={() => { setOpen(false); onItemClick?.(item); }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display:      'block',
                width:        '100%',
                textAlign:    'left',
                padding:      '8px 12px',
                border:       'none',
                borderRadius: 8,
                background:   isItemFocused ? '#f1f5f9' : 'transparent',
                color:        item.destructive ? '#d9210b' : '#191919',
                fontFamily:   '"Inter", sans-serif',
                fontSize:     13,
                fontWeight:   400,
                cursor:       'pointer',
                transition:   'background 0.12s ease',
                whiteSpace:   'nowrap',
              }}
            >
              {item.label}
            </button>
          </React.Fragment>
        );
      })}
    </div>,
    document.body,
  );

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-label="User menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={openMenu}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width:          size,
          height:         size,
          borderRadius:   '50%',
          border:         isSelected
            ? 'none'
            : `2px solid var(--sds-color-background-brand-default, #0a76db)`,
          background: isSelected
            ? 'var(--sds-color-background-brand-default, #0a76db)'
            : hovered ? 'rgba(10,118,219,0.06)' : '#ffffff',
          color: isSelected
            ? '#ffffff'
            : 'var(--sds-color-background-brand-default, #0a76db)',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       size * 0.43,
          fontWeight:     700,
          fontFamily:     '"Inter", sans-serif',
          flexShrink:     0,
          cursor:         'pointer',
          transition:     'background 0.15s ease',
          padding:        0,
        }}
      >
        U
      </button>
      {dropdown}
    </>
  );
}

// ── RightNav (desktop + tablet vertical sidebar) ──────────────────────────────

export const RightNav: React.FC<RightNavProps> = ({
  items,
  avatar,
  paddingTop = 36,
  gap = 24,
}) => (
  <aside
    aria-label="Quick actions"
    style={{
      width:           64,
      flexShrink:      0,
      backgroundColor: '#ffffff',
      borderLeft:      '1px solid #e2e8f0',
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'center',
      paddingTop,
      gap,
      height:          '100%',
      boxSizing:       'border-box',
      overflowY:       'auto',
    }}
  >
    {avatar && <div style={{ flexShrink: 0 }}>{avatar}</div>}

    {items.map((item) => (
      <IconBtn
        key={item.id}
        label={item.label}
        alert={item.alert}
        onClick={item.onClick}
      >
        {item.icon}
      </IconBtn>
    ))}
  </aside>
);

// ── RightNavMobileStrip (mobile slide-in panel) ───────────────────────────────

export const RightNavMobileStrip: React.FC<RightNavMobileStripProps> = ({
  items,
  isOpen,
  avatar,
}) => (
  <div
    style={{
      position:        'fixed',
      top:             44,
      bottom:          0,
      right:           0,
      zIndex:          199,
      backgroundColor: '#ffffff',
      borderLeft:      '1px solid #e2e8f0',
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'center',
      padding:         '12px 0',
      gap:             24,
      boxShadow:       '-4px 0 16px rgba(0,0,0,0.08)',
      width:           56,
      overflowY:       'auto',
      transform:       isOpen ? 'translateX(0)' : 'translateX(100%)',
      transition:      'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      willChange:      'transform',
    }}
  >
    {avatar && <div style={{ flexShrink: 0 }}>{avatar}</div>}

    {items.map((item) => (
      <IconBtn
        key={item.id}
        label={item.label}
        alert={item.alert}
        size={36}
        onClick={item.onClick}
      >
        {item.icon}
      </IconBtn>
    ))}
  </div>
);

export default RightNav;
