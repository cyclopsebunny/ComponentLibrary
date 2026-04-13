import type { ReactNode } from 'react';
import {
  colors,
  spacing,
  typography,
  shadows,
  semanticcolors,
  componentcolors,
} from '@component-library/core/tokens';
import { flattenTokens, isLikelyHexColor, spacingToPx } from './tokenUtils';

/** Representative CSS variables from the design system (full set lives in `@component-library/core/styles`). */
const SAMPLE_CSS_VARS: { name: string; label: string }[] = [
  { name: '--light-primary-default', label: 'Primary default' },
  { name: '--light-primary-100', label: 'Primary 100' },
  { name: '--text-heading', label: 'Text heading' },
  { name: '--text-subheading', label: 'Text subheading' },
  { name: '--border-inverse-divider', label: 'Divider' },
  { name: '--spacing-md', label: 'Spacing md' },
  { name: '--spacing-lg', label: 'Spacing lg' },
  { name: '--corner-radius-none', label: 'Radius (token sample)' },
];

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontSize: '1.35rem',
        margin: '0 0 1rem',
        color: 'var(--text-heading, #17191c)',
      }}
    >
      {children}
    </h2>
  );
}

function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h3 style={{ fontSize: '1rem', margin: '1.5rem 0 0.75rem', fontWeight: 600 }}>{children}</h3>
  );
}

function TokenTable({ rows }: { rows: { key: string; value: string }[] }) {
  return (
    <div style={{ overflowX: 'auto', border: '1px solid #e8e8e8', borderRadius: 8 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
            <th style={{ padding: '8px 12px', fontWeight: 600 }}>Token</th>
            <th style={{ padding: '8px 12px', fontWeight: 600 }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ key, value }) => (
            <tr key={key} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: '8px 12px', fontFamily: 'ui-monospace, monospace', verticalAlign: 'top' }}>
                {key}
              </td>
              <td style={{ padding: '8px 12px', wordBreak: 'break-word' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ColorGrid({ rows }: { rows: { key: string; value: string }[] }) {
  const colorRows = rows.filter((r) => isLikelyHexColor(r.value));
  const maxShow = 48;
  const shown = colorRows.slice(0, maxShow);
  return (
    <>
      <p style={{ color: '#666', marginBottom: 12, fontSize: 14 }}>
        Showing first {shown.length} of {colorRows.length} hex color entries. Full list in the table below or in
        tokens source.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: 12,
          marginBottom: 24,
        }}
      >
        {shown.map(({ key, value }) => (
          <div
            key={key}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              overflow: 'hidden',
              background: '#fff',
            }}
          >
            <div style={{ height: 56, background: value }} title={value} />
            <div style={{ padding: 8, fontSize: 11, fontFamily: 'ui-monospace, monospace', wordBreak: 'break-word' }}>
              {key}
            </div>
            <div style={{ padding: '0 8px 8px', fontSize: 11, color: '#666' }}>{value}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export function TokensAndStylesShowcase() {
  const colorRows = flattenTokens(colors as Record<string, unknown>);
  const semanticRows = flattenTokens(semanticcolors as Record<string, unknown>);
  const componentColorRows = flattenTokens(componentcolors as Record<string, unknown>);
  const spacingRows = flattenTokens(spacing as Record<string, unknown>);
  const typoRows = flattenTokens(typography as Record<string, unknown>);
  const shadowRows = flattenTokens(shadows as Record<string, unknown>);

  return (
    <div style={{ padding: '2rem', maxWidth: 1200, margin: 0 }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>Tokens & global styles</h1>
        <p style={{ color: '#666', fontSize: '1.05rem', maxWidth: 720 }}>
          TypeScript tokens from <code>@component-library/core/tokens</code> and CSS variables from{' '}
          <code>@component-library/core/styles</code> (already imported at the app root).
        </p>
      </header>

      <section style={{ marginBottom: '3rem' }}>
        <SectionTitle>Global CSS variables (sample)</SectionTitle>
        <p style={{ color: '#666', marginBottom: 16, fontSize: 14 }}>
          Use <code style={{ fontSize: 13 }}>var(--token-name)</code> anywhere after importing the library styles.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {SAMPLE_CSS_VARS.map(({ name, label }) => (
            <div
              key={name}
              style={{
                border: '1px solid #e8e8e8',
                borderRadius: 8,
                padding: 16,
                background: 'var(--theme-surface, #fff)',
              }}
            >
              <div
                style={{
                  height: 48,
                  borderRadius: 6,
                  marginBottom: 12,
                  background:
                    name.includes('text') || name.includes('border')
                      ? `linear-gradient(90deg, var(${name}) 50%, #f0f0f0 50%)`
                      : `var(${name})`,
                  border: name.includes('spacing') ? '2px dashed #ccc' : undefined,
                }}
              />
              <div style={{ fontWeight: 600, fontSize: 14 }}>{label}</div>
              <code style={{ fontSize: 12, color: '#444', display: 'block', marginTop: 6 }}>{name}</code>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <SectionTitle>Colors (TypeScript)</SectionTitle>
        <ColorGrid rows={colorRows} />
        <TokenTable rows={colorRows} />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <SectionTitle>Semantic colors</SectionTitle>
        <ColorGrid rows={semanticRows} />
        <TokenTable rows={semanticRows} />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <SectionTitle>Component colors</SectionTitle>
        <p style={{ color: '#666', fontSize: 14, marginBottom: 12 }}>
          Mapped from Figma component variables (e.g. button states).
        </p>
        <ColorGrid rows={componentColorRows} />
        <TokenTable rows={componentColorRows} />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <SectionTitle>Spacing</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', marginBottom: 16 }}>
          {spacingRows.map(({ key, value }) => {
            const px = spacingToPx(value);
            const w = px ?? 4;
            return (
              <div key={key} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    height: 32,
                    width: Math.min(w, 120),
                    minWidth: 4,
                    background: 'var(--light-primary-default, #172dbd)',
                    borderRadius: 4,
                    margin: '0 auto 8px',
                  }}
                />
                <div style={{ fontSize: 11, fontFamily: 'ui-monospace, monospace', maxWidth: 120 }}>{key}</div>
                <div style={{ fontSize: 11, color: '#666' }}>{value}px</div>
              </div>
            );
          })}
        </div>
        <TokenTable rows={spacingRows} />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <SectionTitle>Typography</SectionTitle>
        <SubTitle>Samples</SubTitle>
        <div
          style={{
            padding: 20,
            border: '1px solid #e8e8e8',
            borderRadius: 8,
            marginBottom: 16,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <p style={{ fontSize: Number(typography.fontsizeHeadlineHl2), fontWeight: 600, lineHeight: 1.2, marginBottom: 12 }}>
            Headline sample (HL2 size token)
          </p>
          <p style={{ fontSize: Number(typography.fontsizeBodyLg), fontWeight: 500, lineHeight: 1.4, marginBottom: 8 }}>
            Body large sample using body/lg size token values.
          </p>
          <p style={{ fontSize: Number(typography.fontsizeHeaderH2), fontWeight: 600, lineHeight: 1.25 }}>
            Header H2 sample
          </p>
        </div>
        <TokenTable rows={typoRows} />
      </section>

      <section>
        <SectionTitle>Shadows</SectionTitle>
        {shadowRows.length === 0 ? (
          <p style={{ color: '#666' }}>No shadow tokens in the current extraction.</p>
        ) : (
          <TokenTable rows={shadowRows} />
        )}
      </section>
    </div>
  );
}
