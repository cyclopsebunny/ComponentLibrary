import React, { useState } from 'react';
import { SegmentedControl, SelectField, type SelectFieldState } from '@component-library/core';
import {
  InteractivePlaygroundSection,
  ShowcaseHeader,
  ShowcaseIntro,
  ShowcasePage,
  ShowcaseSection,
  StaticShowcaseCell,
  previewColumnInput,
  staticGridEqualColumns,
} from '../showcase/componentShowcaseTemplate';

const SAMPLE_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom', disabled: true },
] as const;

const STATE_OPTIONS = ['Auto', 'Enabled', 'Focused', 'Error', 'Disabled'] as const;

const grid = staticGridEqualColumns(2, 260);

export const SelectFieldShowcase: React.FC = () => {
  const [playValue, setPlayValue] = useState('us');
  const [playState, setPlayState] = useState<(typeof STATE_OPTIONS)[number]>('Auto');
  const [playOutlined, setPlayOutlined] = useState(true);

  const pinnedState: SelectFieldState | undefined =
    playState === 'Auto'
      ? undefined
      : playState === 'Focused'
        ? 'Focused'
        : playState === 'Error'
          ? 'Error'
          : playState === 'Disabled'
            ? 'Disabled'
            : 'Enabled';

  return (
    <ShowcasePage maxWidth={1100}>
      <ShowcaseHeader title="SelectField">
        <ShowcaseIntro>
          Dropdown / select aligned with Figma <strong>4.0 Design System (Enterprise)</strong>: field{' '}
          <code style={{ fontSize: 14 }}>2136:2336</code> (State includes <strong>Focused</strong>), list{' '}
          <code>3116:2618</code>, options <code>3133:5200</code> (Default / Hover / Selected + check), value row{' '}
          <code>3172:4499</code> — file <code>1pYVDCkei9zOaAaz0GHzWq</code>.
        </ShowcaseIntro>
      </ShowcaseHeader>

      <InteractivePlaygroundSection
        previewColumnStyle={previewColumnInput}
        controls={
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <SegmentedControl
                label="State"
                options={[...STATE_OPTIONS]}
                value={playState}
                onChange={(v) => setPlayState(v as (typeof STATE_OPTIONS)[number])}
              />
              <SegmentedControl
                label="Appearance"
                options={['Outlined', 'Underline'] as const}
                value={playOutlined ? 'Outlined' : 'Underline'}
                onChange={(v) => setPlayOutlined(v === 'Outlined')}
              />
            </div>
            {playState === 'Auto' && (
              <p style={{ margin: 0, fontSize: 12, color: '#94a3b8', fontStyle: 'italic' }}>
                Auto: open the menu or focus the trigger to see the focused ring; pick Error / Disabled from State to
                preview those modes.
              </p>
            )}
          </>
        }
        preview={
          <SelectField
            label="Country"
            isRequired
            hasDescription
            description="Choose a shipping region."
            options={[...SAMPLE_OPTIONS]}
            value={playValue}
            onChange={setPlayValue}
            placeholder="Select a country…"
            outlined={playOutlined}
            state={pinnedState}
            hasError={playState === 'Error'}
            error={playState === 'Error' ? 'Please select a valid option.' : undefined}
          />
        }
      />

      <ShowcaseSection title="Static examples" marginBottom="0">
        <div style={grid}>
          <StaticShowcaseCell label="Outlined · default">
            <SelectField
              label="Priority"
              options={[
                { value: 'low', label: 'Low' },
                { value: 'med', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
              defaultValue="med"
            />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Underline">
            <SelectField
              label="Status"
              outlined={false}
              options={[
                { value: '1', label: 'Draft' },
                { value: '2', label: 'Published' },
              ]}
              defaultValue="1"
            />
          </StaticShowcaseCell>
        </div>
      </ShowcaseSection>
    </ShowcasePage>
  );
};
