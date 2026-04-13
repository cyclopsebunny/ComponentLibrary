import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PickerLocation {
  id: string;
  name: string;
  /** Secondary line e.g. "Enterprise · Chicago, IL" */
  subtitle?: string;
  icon?: React.ReactNode;
}

export interface LocationPickerProps {
  locations: PickerLocation[];
  selectedId: string;
  offsetLeft?: number;
  mobile?: boolean;
  anchorRect?: DOMRect | null;
  onClose: () => void;
  onSelect?: (id: string) => void;
}

// ── Checkmark ─────────────────────────────────────────────────────────────────

function Checkmark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M3 8L6.5 11.5L13 4.5" stroke="#0a76db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── LocationPicker ────────────────────────────────────────────────────────────

export const LocationPicker: React.FC<LocationPickerProps> = ({
  locations,
  selectedId,
  offsetLeft = 0,
  mobile = false,
  anchorRect,
  onClose,
  onSelect,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) onClose();
    };
    const timerId = setTimeout(() => document.addEventListener('mousedown', handler), 0);
    return () => {
      clearTimeout(timerId);
      document.removeEventListener('mousedown', handler);
    };
  }, [onClose]);

  const handleSelect = (id: string) => {
    onSelect?.(id);
    onClose();
  };

  const top  = mobile ? (anchorRect ? anchorRect.bottom + 8 : 48) : 88;
  const left = mobile ? (anchorRect ? Math.min(anchorRect.left, window.innerWidth - 252) : 12) : offsetLeft + 8;

  const showUpArrow   = mobile && !!anchorRect;
  const showLeftArrow = !mobile;

  return createPortal(
    <div
      ref={ref}
      role="menu"
      aria-label="Select location"
      style={{
        position: 'fixed', top, left, width: 240, zIndex: 1000,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        border: '0.75px solid #d2efff', borderRadius: 12,
        boxShadow: '0px 4px 20px rgba(149,172,188,0.3)',
        padding: 6, display: 'flex', flexDirection: 'column', gap: 2,
      }}
    >
      {showUpArrow && (
        <>
          <div style={{ position:'absolute', top:-9, left:24, width:0, height:0, borderLeft:'8px solid transparent', borderRight:'8px solid transparent', borderBottom:'9px solid #d2efff' }} />
          <div style={{ position:'absolute', top:-7, left:25, width:0, height:0, borderLeft:'7px solid transparent', borderRight:'7px solid transparent', borderBottom:'8px solid rgba(255,255,255,0.95)' }} />
        </>
      )}
      {showLeftArrow && (
        <>
          <div style={{ position:'absolute', top:20, left:-9, width:0, height:0, borderTop:'8px solid transparent', borderBottom:'8px solid transparent', borderRight:'9px solid #d2efff' }} />
          <div style={{ position:'absolute', top:21, left:-7, width:0, height:0, borderTop:'7px solid transparent', borderBottom:'7px solid transparent', borderRight:'8px solid rgba(255,255,255,0.95)' }} />
        </>
      )}

      {locations.map((loc) => {
        const isSelected = loc.id === selectedId;
        return (
          <button
            key={loc.id}
            role="menuitem"
            onClick={() => handleSelect(loc.id)}
            style={{
              display:'flex', alignItems:'center', gap:10, padding:'8px 10px',
              border:'none', borderRadius:8,
              backgroundColor: isSelected ? '#f0f7ff' : 'transparent',
              cursor:'pointer', textAlign:'left', width:'100%',
              transition:'background-color 0.12s ease',
            }}
            onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = '#f8fafc'; }}
            onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
          >
            {loc.icon !== undefined && (
              <div style={{ width:32, height:32, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', color: isSelected ? '#0a76db' : '#64748b' }}>
                {loc.icon}
              </div>
            )}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontFamily:'"Inter",sans-serif', fontWeight: isSelected ? 700 : 500, fontSize:13, color: isSelected ? '#0a76db' : '#191919', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                {loc.name}
              </div>
              {loc.subtitle && (
                <div style={{ fontFamily:'"Inter",sans-serif', fontWeight:400, fontSize:11, color:'#64748b', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', marginTop:1 }}>
                  {loc.subtitle}
                </div>
              )}
            </div>
            {isSelected && <Checkmark />}
          </button>
        );
      })}
    </div>,
    document.body,
  );
};

export default LocationPicker;
