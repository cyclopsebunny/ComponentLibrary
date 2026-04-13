import React, { useState } from 'react';
import {
  CheckboxField,
  InputField,
  SegmentedControl,
  type InputFieldState,
} from '@component-library/core';
import {
  InteractivePlaygroundSection,
  ShowcaseHeader,
  ShowcaseIntro,
  ShowcasePage,
  ShowcaseSection,
  ShowcaseTextControl,
  StaticShowcaseCell,
  playgroundHint,
  previewColumnInput,
  staticGridEqualColumns,
  staticGridTemplate,
} from '../showcase/componentShowcaseTemplate';

const grid4 = staticGridEqualColumns(4, 180);

export const InputFieldShowcase: React.FC = () => {
  const [playValue, setPlayValue] = useState('Value');
  const [playState, setPlayState] = useState<InputFieldState | 'Auto'>('Auto');
  const [playOutlined, setPlayOutlined] = useState(true);
  const [playHasLabel, setPlayHasLabel] = useState(true);
  const [playLabel, setPlayLabel] = useState('Label');
  const [playRequired, setPlayRequired] = useState(false);
  const [playHasDesc, setPlayHasDesc] = useState(false);
  const [playDesc, setPlayDesc] = useState('Supporting description text');
  const [playHasError, setPlayHasError] = useState(false);
  const [playError, setPlayError] = useState('Error message');
  const [playPlaceholder, setPlayPlaceholder] = useState('Placeholder');

  const pinnedState = playState === 'Auto' ? undefined : playState;

  return (
    <ShowcasePage maxWidth={1200}>
      <ShowcaseHeader title="InputField">
        <ShowcaseIntro>
          From Figma <strong>4.0 Design System (Enterprise)</strong>, node{' '}
          <code style={{ fontSize: 14 }}>2136:2263</code> — label, description,
          required indicator, error message, outlined and underline variants,
          with Enabled / Focused / Error / Disabled states.
        </ShowcaseIntro>
      </ShowcaseHeader>

      <InteractivePlaygroundSection
        previewColumnStyle={previewColumnInput}
        controls={
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <SegmentedControl
                label="State"
                options={['Auto', 'Enabled', 'Focused', 'Error', 'Disabled'] as const}
                value={playState}
                onChange={(v) => setPlayState(v as InputFieldState | 'Auto')}
              />
              <SegmentedControl
                label="Appearance"
                options={['Outlined', 'Underline'] as const}
                value={playOutlined ? 'Outlined' : 'Underline'}
                onChange={(v) => setPlayOutlined(v === 'Outlined')}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <CheckboxField
                label="Has label"
                checked={playHasLabel}
                onChange={(e) => setPlayHasLabel(e.target.checked)}
              />
              <CheckboxField
                label="Required (*)"
                checked={playRequired}
                onChange={(e) => setPlayRequired(e.target.checked)}
              />
              <CheckboxField
                label="Has description"
                checked={playHasDesc}
                onChange={(e) => setPlayHasDesc(e.target.checked)}
              />
              <CheckboxField
                label="Has error msg"
                checked={playHasError}
                onChange={(e) => setPlayHasError(e.target.checked)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              {playHasLabel && (
                <ShowcaseTextControl label="Label text" value={playLabel} onChange={setPlayLabel} />
              )}
              <ShowcaseTextControl label="Value" value={playValue} onChange={setPlayValue} />
              <ShowcaseTextControl label="Placeholder" value={playPlaceholder} onChange={setPlayPlaceholder} />
              {playHasDesc && (
                <ShowcaseTextControl label="Description text" value={playDesc} onChange={setPlayDesc} />
              )}
              {playHasError && (
                <ShowcaseTextControl label="Error text" value={playError} onChange={setPlayError} />
              )}
            </div>

            {playState === 'Auto' && (
              <p style={playgroundHint}>Auto: click the input below to see focus state naturally.</p>
            )}
          </>
        }
        preview={
          <InputField
            state={pinnedState}
            outlined={playOutlined}
            hasLabel={playHasLabel}
            label={playLabel}
            isRequired={playRequired}
            hasDescription={playHasDesc}
            description={playDesc}
            hasError={playHasError}
            error={playError}
            value={playValue}
            placeholder={playPlaceholder}
            onChange={(e) => setPlayValue(e.target.value)}
          />
        }
      />

      <ShowcaseSection title="Outlined — all states">
        <div style={grid4}>
          <StaticShowcaseCell label="Enabled · Value">
            <InputField label="Label" value="Value" outlined state="Enabled" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Enabled · Placeholder">
            <InputField label="Label" placeholder="Placeholder" outlined state="Enabled" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Focused · Value">
            <InputField label="Label" value="Value" outlined state="Focused" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Focused · Placeholder">
            <InputField label="Label" placeholder="Placeholder" outlined state="Focused" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Error · Value">
            <InputField label="Label" value="Value" outlined state="Error" hasError error="Error message" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Error · Placeholder">
            <InputField label="Label" placeholder="Placeholder" outlined state="Error" hasError error="Error message" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Value">
            <InputField label="Label" value="Value" outlined state="Disabled" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Placeholder">
            <InputField label="Label" placeholder="Placeholder" outlined state="Disabled" />
          </StaticShowcaseCell>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Underline (not outlined) — all states">
        <div style={grid4}>
          <StaticShowcaseCell label="Enabled · Value">
            <InputField label="Label" value="Value" outlined={false} state="Enabled" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Enabled · Placeholder">
            <InputField label="Label" placeholder="Placeholder" outlined={false} state="Enabled" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Focused · Value">
            <InputField label="Label" value="Value" outlined={false} state="Focused" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Focused · Placeholder">
            <InputField label="Label" placeholder="Placeholder" outlined={false} state="Focused" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Error · Value">
            <InputField label="Label" value="Value" outlined={false} state="Error" hasError error="Error message" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Error · Placeholder">
            <InputField label="Label" placeholder="Placeholder" outlined={false} state="Error" hasError error="Error message" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Value">
            <InputField label="Label" value="Value" outlined={false} state="Disabled" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Placeholder">
            <InputField label="Label" placeholder="Placeholder" outlined={false} state="Disabled" />
          </StaticShowcaseCell>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Options" marginBottom="0">
        <div style={staticGridTemplate('repeat(3, minmax(200px, 1fr))')}>
          <StaticShowcaseCell label="Required">
            <InputField label="Label" value="Value" isRequired state="Enabled" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="With description">
            <InputField
              label="Label"
              value="Value"
              description="Helper text goes here"
              hasDescription
              state="Enabled"
            />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="With error message">
            <InputField
              label="Label"
              value="Value"
              error="Something went wrong"
              hasError
              state="Error"
            />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="No label">
            <InputField value="Value" hasLabel={false} state="Enabled" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Required + description + error">
            <InputField
              label="Label"
              value="Value"
              isRequired
              description="Helper text goes here"
              hasDescription
              error="This field is required"
              hasError
              state="Error"
            />
          </StaticShowcaseCell>
        </div>
      </ShowcaseSection>
    </ShowcasePage>
  );
};
