import React, { useState } from 'react';
import { Button, ButtonVariant, ButtonState } from '@component-library/core';
import { ShowcaseHeader, ShowcaseIntro, ShowcasePage } from '../showcase/componentShowcaseTemplate';

export const ButtonShowcase: React.FC = () => {
  const [interactiveState, setInteractiveState] = useState<ButtonState>('enabled');

  const variants: ButtonVariant[] = ['default', 'CTA', 'brand', 'subtle', 'danger', 'danger-subtle', 'frameless'];
  const states: ButtonState[] = ['enabled', 'hover', 'pressed', 'active', 'disabled'];

  return (
    <ShowcasePage maxWidth={1400}>
      <ShowcaseHeader title="Button Component Library">
        <ShowcaseIntro>All button variants, states, and sizes extracted from Figma</ShowcaseIntro>
      </ShowcaseHeader>

      {/* Interactive Playground */}
      <section style={{ marginBottom: '4rem', padding: '2rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Interactive Playground</h2>
        <p style={{ marginBottom: '1.5rem', color: '#666' }}>
          Hover and click the buttons below to see their interactive states. Use the state selector to view specific states.
        </p>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            View Specific State (overrides interactive behavior):
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {states.map((state) => (
              <Button
                key={state}
                label={state}
                variant="default"
                state={interactiveState === state ? 'active' : 'enabled'}
                size="Small"
                onClick={() => setInteractiveState(state)}
              />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {variants.map((variant) => (
            <div key={variant} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>
                {variant}
              </div>
              <Button
                label="Button"
                variant={variant}
                state={interactiveState === 'enabled' ? 'enabled' : interactiveState}
                size="Medium"
              />
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '4px', fontSize: '0.875rem', color: '#666' }}>
          <strong>Note:</strong> When state selector is set to "enabled", buttons are fully interactive (hover/click to see states). 
          Other states show static examples for demonstration.
        </div>
      </section>

      {/* All Variants - Interactive */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>All Variants (Interactive - Hover & Click to Test)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {variants.map((variant) => (
            <div key={variant} style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', textTransform: 'capitalize' }}>
                {variant}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Button label="Button" variant={variant} size="Medium" />
                <Button label="Button" variant={variant} size="Small" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All States - Brand Variant */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>All States (Brand Variant)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
          {states.map((state) => (
            <div key={state} style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', textTransform: 'capitalize' }}>
                {state}
              </h3>
              <Button label="Button" variant="brand" state={state} size="Medium" />
            </div>
          ))}
        </div>
      </section>

      {/* Sizes Comparison */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Size Comparison</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {variants.slice(0, 4).map((variant) => (
            <div key={variant} style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1rem', textTransform: 'capitalize' }}>
                {variant}
              </h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Small</div>
                  <Button label="Button" variant={variant} state="enabled" size="Small" />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#666' }}>Medium</div>
                  <Button label="Button" variant={variant} state="enabled" size="Medium" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* With Icons */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>With Icons</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Start Icon</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button label="Button" variant="brand" hasIconStart iconStart={<span>★</span>} />
              <Button label="Button" variant="CTA" hasIconStart iconStart={<span>★</span>} />
              <Button label="Button" variant="subtle" hasIconStart iconStart={<span>★</span>} />
            </div>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>End Icon</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button label="Button" variant="brand" hasIconEnd iconEnd={<span>×</span>} />
              <Button label="Button" variant="CTA" hasIconEnd iconEnd={<span>×</span>} />
              <Button label="Button" variant="subtle" hasIconEnd iconEnd={<span>×</span>} />
            </div>
          </div>
          <div style={{ padding: '1rem', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Both Icons</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button 
                label="Button" 
                variant="brand" 
                hasIconStart 
                hasIconEnd 
                iconStart={<span>★</span>}
                iconEnd={<span>×</span>}
              />
              <Button 
                label="Button" 
                variant="CTA" 
                hasIconStart 
                hasIconEnd 
                iconStart={<span>★</span>}
                iconEnd={<span>×</span>}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Usage Examples</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Basic Usage:</div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`<Button label="Click me" variant="brand" />`}
            </pre>
          </div>
          <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: '600' }}>With Icons:</div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`<Button 
  label="Save" 
  variant="CTA" 
  size="Medium"
  hasIconStart 
  iconStart={<SaveIcon />}
/>`}
            </pre>
          </div>
          <div style={{ padding: '1rem', background: '#f5f5f5', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.875rem' }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: '600' }}>Different States:</div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`<Button label="Submit" variant="brand" state="hover" />
<Button label="Disabled" variant="default" state="disabled" />`}
            </pre>
          </div>
        </div>
      </section>
    </ShowcasePage>
  );
};
