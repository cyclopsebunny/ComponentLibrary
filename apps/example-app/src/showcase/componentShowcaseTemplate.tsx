import React from 'react';

/**
 * Shared layout and styles for component library doc pages (especially Form Inputs).
 * Use {@link ShowcasePage}, {@link ShowcaseHeader}, {@link InteractivePlaygroundSection},
 * and related helpers so new pages match existing ones.
 */

// ── Page shell ───────────────────────────────────────────────────────────────

export function ShowcasePage({
  maxWidth = 1200,
  children,
}: {
  maxWidth?: number | string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: '2rem', maxWidth, margin: 0 }}>{children}</div>
  );
}

export function ShowcaseHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header style={{ marginBottom: '2.5rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: 8, color: '#17191c' }}>{title}</h1>
      {children}
    </header>
  );
}

/** Intro blurb under the page title (Figma node, behavior summary, etc.) */
export function ShowcaseIntro({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: '#666', fontSize: '1.05rem', maxWidth: 720, margin: 0, lineHeight: 1.5 }}>
      {children}
    </p>
  );
}

// ── Section headings & copy ─────────────────────────────────────────────────

export const sectionHeading: React.CSSProperties = {
  fontSize: '1.25rem',
  marginBottom: '1.25rem',
  color: '#17191c',
};

export const sectionDescription: React.CSSProperties = {
  color: '#666',
  fontSize: 14,
  lineHeight: 1.6,
};

export const playgroundHint: React.CSSProperties = {
  margin: 0,
  fontSize: 12,
  color: '#94a3b8',
  fontStyle: 'italic',
};

// ── Interactive playground (controls left, preview right) ───────────────────

const playgroundGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '2rem',
  alignItems: 'start',
};

export const controlsPanelLabel: React.CSSProperties = {
  margin: 0,
  fontSize: 12,
  fontWeight: 700,
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

export const previewColumnLabel: React.CSSProperties = {
  margin: '0 0 12px',
  fontSize: 12,
  fontWeight: 700,
  color: '#94a3b8',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

export const controlsPanel: React.CSSProperties = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: 12,
  padding: '1.25rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
};

/** Fixed width — SearchField, CheckboxField, etc. */
export const previewColumnNarrow: React.CSSProperties = {
  padding: '1.5rem 0',
  width: 300,
};

/** Wider fields — InputField */
export const previewColumnInput: React.CSSProperties = {
  padding: '1.5rem 0',
  maxWidth: 320,
};

/** Resizable / wide preview — Textarea */
export const previewColumnWide: React.CSSProperties = {
  padding: '1.5rem 0',
  minWidth: 360,
};

/** Match measured controls panel width in RadioField interactive playground (border-box). */
export const RADIO_PLAYGROUND_CONTROLS_WIDTH_PX = 291;

export function InteractivePlaygroundSection({
  title = 'Interactive',
  controls,
  preview,
  previewColumnStyle = previewColumnNarrow,
  /** When set, first grid column is exactly this many px; preview fills the rest. */
  controlsColumnWidthPx,
}: {
  title?: string;
  controls: React.ReactNode;
  preview: React.ReactNode;
  previewColumnStyle?: React.CSSProperties;
  controlsColumnWidthPx?: number;
}) {
  const gridStyle: React.CSSProperties =
    controlsColumnWidthPx != null
      ? {
          display: 'grid',
          gridTemplateColumns: `${controlsColumnWidthPx}px minmax(0, 1fr)`,
          gap: '2rem',
          alignItems: 'start',
        }
      : playgroundGridStyle;

  return (
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={sectionHeading}>{title}</h2>
      <div style={gridStyle}>
        <div style={{ ...controlsPanel, boxSizing: 'border-box', width: '100%', minWidth: 0 }}>
          <p style={controlsPanelLabel}>Controls</p>
          {controls}
        </div>
        <div style={{ ...previewColumnStyle, minWidth: 0 }}>
          <p style={previewColumnLabel}>Preview</p>
          {preview}
        </div>
      </div>
    </section>
  );
}

// ── Playground helpers ───────────────────────────────────────────────────────

export function ShowcaseTextControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '6px 10px',
          fontSize: 13,
          border: '1px solid #e2e8f0',
          borderRadius: 6,
          outline: 'none',
          color: '#17191c',
          background: '#fff',
        }}
      />
    </div>
  );
}

export const showcaseDemoButton: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 8,
  border: '1px solid #cbd5e1',
  cursor: 'pointer',
  background: '#fff',
};

// ── Static example grids ─────────────────────────────────────────────────────

export const staticCellTitle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: '#64748b',
  marginBottom: 12,
};

export const staticGridAutoFill: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '2rem 2.5rem',
  alignItems: 'start',
};

export function staticGridEqualColumns(columns: number, minPx: number): React.CSSProperties {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(${minPx}px, 1fr))`,
    gap: '2rem 2.5rem',
    alignItems: 'start',
  };
}

export function staticGridTemplate(gridTemplateColumns: string): React.CSSProperties {
  return {
    display: 'grid',
    gridTemplateColumns,
    gap: '2rem 2.5rem',
    alignItems: 'start',
  };
}

export function StaticShowcaseCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ pointerEvents: 'none' }}>
      <p style={staticCellTitle}>{label}</p>
      {children}
    </div>
  );
}

export function ShowcaseSection({
  title,
  description,
  children,
  marginBottom = '3rem',
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  marginBottom?: string;
}) {
  return (
    <section style={{ marginBottom }}>
      <h2 style={sectionHeading}>{title}</h2>
      {description != null &&
        (typeof description === 'string' ? (
          <p style={{ ...sectionDescription, marginTop: 0, marginBottom: '1.25rem' }}>{description}</p>
        ) : (
          description
        ))}
      {children}
    </section>
  );
}

// ── Muted panels (secondary sections, e.g. Textarea state matrices) ──────────

export const mutedSection: React.CSSProperties = {
  marginBottom: '3rem',
  padding: '2rem',
  background: '#f9f9f9',
  borderRadius: 8,
};

export const mutedSectionHeading: React.CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
  color: '#17191c',
};

export const mutedSectionDesc: React.CSSProperties = {
  color: '#666',
  marginBottom: '1.5rem',
  fontSize: 14,
  lineHeight: 1.6,
};

export function MutedShowcaseSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section style={mutedSection}>
      <h2 style={mutedSectionHeading}>{title}</h2>
      {description != null &&
        (typeof description === 'string' ? (
          <p style={mutedSectionDesc}>{description}</p>
        ) : (
          description
        ))}
      {children}
    </section>
  );
}

export const showcaseFlexGrid: React.CSSProperties = {
  display: 'flex',
  gap: 32,
  flexWrap: 'wrap',
  alignItems: 'flex-start',
};

/** Labels inside flex/grid variant tiles (e.g. Textarea “Default — placeholder”) */
export const showcaseVariantLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  color: '#888',
  marginBottom: 12,
};
