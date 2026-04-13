import React, { useState } from 'react';
import { SearchField, SegmentedControl, type SearchFieldState } from '@component-library/core';
import {
  InteractivePlaygroundSection,
  ShowcaseHeader,
  ShowcaseIntro,
  ShowcasePage,
  ShowcaseSection,
  ShowcaseTextControl,
  StaticShowcaseCell,
  playgroundHint,
  previewColumnNarrow,
  staticGridAutoFill,
} from '../showcase/componentShowcaseTemplate';

const STATE_OPTIONS = ['Auto', 'Default', 'Focused', 'Disabled'] as const;
type PlayState = 'Auto' | SearchFieldState;

export const SearchFieldShowcase: React.FC = () => {
  const [playValue, setPlayValue] = useState('Search query');
  const [playState, setPlayState] = useState<PlayState>('Auto');
  const [playOutlined, setPlayOutlined] = useState(true);
  const [playPlaceholder, setPlayPlaceholder] = useState('Search');

  const pinnedState: SearchFieldState | undefined =
    playState === 'Auto' ? undefined : playState;

  return (
    <ShowcasePage maxWidth={1100}>
      <ShowcaseHeader title="SearchField">
        <ShowcaseIntro>
          From Figma <strong>4.0 Design System (Enterprise)</strong>, node{' '}
          <code style={{ fontSize: 14 }}>2236:14989</code> — pill and underline variants,
          Default / Focused (added) / Disabled states, with value and placeholder modes.
        </ShowcaseIntro>
      </ShowcaseHeader>

      <InteractivePlaygroundSection
        previewColumnStyle={previewColumnNarrow}
        controls={
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <SegmentedControl
                label="State"
                options={STATE_OPTIONS}
                value={playState}
                onChange={setPlayState}
              />
              <SegmentedControl
                label="Appearance"
                options={['Outlined', 'Underline'] as const}
                value={playOutlined ? 'Outlined' : 'Underline'}
                onChange={(v) => setPlayOutlined(v === 'Outlined')}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
              <ShowcaseTextControl label="Value" value={playValue} onChange={setPlayValue} />
              <ShowcaseTextControl label="Placeholder" value={playPlaceholder} onChange={setPlayPlaceholder} />
            </div>

            {playState === 'Auto' && (
              <p style={playgroundHint}>Auto: click the input below to see focus state naturally.</p>
            )}
          </>
        }
        preview={
          <SearchField
            value={playValue}
            placeholder={playPlaceholder}
            outlined={playOutlined}
            state={pinnedState}
            onChange={setPlayValue}
            onClear={() => setPlayValue('')}
          />
        }
      />

      <ShowcaseSection title="Outlined (pill) — all states">
        <div style={staticGridAutoFill}>
          <StaticShowcaseCell label="Default · Value">
            <SearchField value="Value" outlined state="Default" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Default · Placeholder">
            <SearchField value="" placeholder="Search" outlined state="Default" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Focused · Value">
            <SearchField value="Value" outlined state="Focused" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Focused · Placeholder">
            <SearchField value="" placeholder="Search" outlined state="Focused" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Value">
            <SearchField value="Value" outlined state="Disabled" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Placeholder">
            <SearchField value="" placeholder="Search" outlined state="Disabled" />
          </StaticShowcaseCell>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Underline (not outlined) — all states">
        <div style={staticGridAutoFill}>
          <StaticShowcaseCell label="Default · Value">
            <SearchField value="Value" outlined={false} state="Default" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Default · Placeholder">
            <SearchField value="" placeholder="Search" outlined={false} state="Default" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Focused · Value">
            <SearchField value="Value" outlined={false} state="Focused" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Focused · Placeholder">
            <SearchField value="" placeholder="Search" outlined={false} state="Focused" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Value">
            <SearchField value="Value" outlined={false} state="Disabled" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Placeholder">
            <SearchField value="" placeholder="Search" outlined={false} state="Disabled" />
          </StaticShowcaseCell>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Clear button"
        description="The × button appears only when there is a value. Clicking it clears the field."
        marginBottom="0"
      >
        <div style={staticGridAutoFill}>
          <StaticShowcaseCell label="With value → shows ×">
            <SearchField value="Search query" outlined state="Default" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Empty → no ×">
            <SearchField value="" placeholder="Search" outlined state="Default" />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled with value → × greyed">
            <SearchField value="Search query" outlined state="Disabled" />
          </StaticShowcaseCell>
        </div>
      </ShowcaseSection>
    </ShowcasePage>
  );
};
