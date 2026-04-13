import React, { useState } from 'react';
import { CheckboxField, RadioField, SegmentedControl } from '@component-library/core';
import {
  InteractivePlaygroundSection,
  RADIO_PLAYGROUND_CONTROLS_WIDTH_PX,
  ShowcaseHeader,
  ShowcaseIntro,
  ShowcasePage,
  ShowcaseSection,
  StaticShowcaseCell,
  previewColumnNarrow,
  staticGridEqualColumns,
} from '../showcase/componentShowcaseTemplate';

const GROUP = 'preview-radio-group';
const grid = staticGridEqualColumns(2, 220);

const LAYOUT_OPTIONS = ['Vertical', 'Horizontal'] as const;

/** RadioField defaults to width:100% — in a row that forces one item per line; shrink to content for horizontal groups. */
const radioFieldHorizontalStyle: React.CSSProperties = {
  width: 'auto',
  maxWidth: 240,
  flex: '0 0 auto',
};

export const RadioFieldShowcase: React.FC = () => {
  const [value, setValue] = useState('a');
  const [showDescriptions, setShowDescriptions] = useState(true);
  const [layout, setLayout] = useState<'vertical' | 'horizontal'>('vertical');

  const previewColumnStyle =
    layout === 'horizontal'
      ? ({ padding: '1.5rem 0', minWidth: 320, width: 'min(100%, 820px)' } as React.CSSProperties)
      : previewColumnNarrow;

  return (
    <ShowcasePage maxWidth={1100}>
      <ShowcaseHeader title="RadioField">
        <ShowcaseIntro>
          From Figma <strong>4.0 Design System (Enterprise)</strong>, node{' '}
          <code style={{ fontSize: 14 }}>9762:1412</code> — radio with label and optional description; use the same{' '}
          <code>name</code> for a group and distinct <code>value</code> per option.
        </ShowcaseIntro>
      </ShowcaseHeader>

      <InteractivePlaygroundSection
        title="Interactive group"
        controlsColumnWidthPx={RADIO_PLAYGROUND_CONTROLS_WIDTH_PX}
        previewColumnStyle={previewColumnStyle}
        controls={
          <>
            <p style={{ color: '#666', margin: 0, fontSize: 14 }}>
              Use the preview to select an option. All radios share the same <code>name</code> so only one can be
              selected.
            </p>
            <p style={{ color: '#666', margin: 0, fontSize: 14 }}>
              Selected: <code>{value}</code>
            </p>
            <CheckboxField
              label="Show Descriptions"
              checked={showDescriptions}
              onChange={(e) => setShowDescriptions(e.target.checked)}
            />
            <SegmentedControl
              label="Orientation"
              options={LAYOUT_OPTIONS}
              value={layout === 'vertical' ? 'Vertical' : 'Horizontal'}
              onChange={(v) => setLayout(v === 'Vertical' ? 'vertical' : 'horizontal')}
            />
          </>
        }
        preview={
          <div
            style={{
              display: 'flex',
              flexDirection: layout === 'horizontal' ? 'row' : 'column',
              flexWrap: layout === 'horizontal' ? 'wrap' : 'nowrap',
              gap: 16,
              alignItems: layout === 'horizontal' ? 'flex-start' : 'stretch',
            }}
          >
            <RadioField
              name={GROUP}
              value="a"
              label="Option A"
              {...(showDescriptions ? { description: 'Supporting copy for this option.' } : {})}
              checked={value === 'a'}
              onChange={() => setValue('a')}
              style={layout === 'horizontal' ? radioFieldHorizontalStyle : undefined}
            />
            <RadioField
              name={GROUP}
              value="b"
              label="Option B"
              {...(showDescriptions ? { description: 'Another line of description text.' } : {})}
              checked={value === 'b'}
              onChange={() => setValue('b')}
              style={layout === 'horizontal' ? radioFieldHorizontalStyle : undefined}
            />
            <RadioField
              name={GROUP}
              value="c"
              label="Option C"
              {...(showDescriptions ? { description: 'Third option with supporting description.' } : {})}
              checked={value === 'c'}
              onChange={() => setValue('c')}
              style={layout === 'horizontal' ? radioFieldHorizontalStyle : undefined}
            />
          </div>
        }
      />

      <ShowcaseSection title="All states (static)" marginBottom="0">
        <div style={grid}>
          <StaticShowcaseCell label="Default · Selected">
            <RadioField
              name="static-1"
              value="x"
              label="Label"
              description="Description"
              checked
              onChange={() => {}}
            />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Default · Unselected">
            <RadioField
              name="static-2"
              value="x"
              label="Label"
              description="Description"
              checked={false}
              onChange={() => {}}
            />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Selected">
            <RadioField
              name="static-3"
              value="x"
              label="Label"
              description="Description"
              checked
              disabled
              onChange={() => {}}
            />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Unselected">
            <RadioField
              name="static-4"
              value="x"
              label="Label"
              description="Description"
              checked={false}
              disabled
              onChange={() => {}}
            />
          </StaticShowcaseCell>
        </div>
      </ShowcaseSection>
    </ShowcasePage>
  );
};
