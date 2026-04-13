import React, { useState } from 'react';
import { SegmentedControl, SegmentedControlButton } from '@component-library/core';
import {
  InteractivePlaygroundSection,
  ShowcaseHeader,
  ShowcaseIntro,
  ShowcasePage,
  ShowcaseSection,
  StaticShowcaseCell,
  previewColumnNarrow,
  staticGridAutoFill,
} from '../showcase/componentShowcaseTemplate';

const THREE = ['One', 'Two', 'Three'] as const;

/**
 * Visual QA vs Figma SegmentedControl `3430:988` and segment `3446:1193`:
 * - Group border + 8px radius; segment dividers; 32px min height; 14px/22px type.
 * - Unselected: default white, hover #ececec, active #cccccc.
 * - Selected: brand #0a76db, hover #05549e, pressed: #e0eeff fill + #0a76db text (button-brand-pressed).
 */
export const SegmentedControlShowcase: React.FC = () => {
  const [value, setValue] = useState<(typeof THREE)[number]>('Two');

  return (
    <ShowcasePage maxWidth={1100}>
      <ShowcaseHeader title="Segmented control">
        <ShowcaseIntro>
          From Figma <strong>4.0 Design System (Enterprise)</strong>: group{' '}
          <strong>SegmentedControl</strong> node <code style={{ fontSize: 14 }}>3430:988</code>, segment{' '}
          <strong>SegmentedButton</strong> node <code style={{ fontSize: 14 }}>3446:1193</code> — hover,
          selected, and pressed (<code>:active</code>) per cell variants.
        </ShowcaseIntro>
      </ShowcaseHeader>

      <InteractivePlaygroundSection
        previewColumnStyle={previewColumnNarrow}
        controls={
          <p style={{ color: '#666', margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            Compare with Dev Mode: segment labels use medium weight when off, bold when on; pointer down on a
            segment shows the pressed fill without toggling until mouse up.
          </p>
        }
        preview={
          <SegmentedControl label="Demo" options={THREE} value={value} onChange={setValue} />
        }
      />

      <ShowcaseSection title="Disabled group">
        <div style={previewColumnNarrow}>
          <SegmentedControl label="State" options={THREE} value="One" onChange={() => {}} disabled />
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Segment sub-component (SegmentedControlButton)">
        <p style={{ color: '#666', fontSize: 14, marginTop: 0, marginBottom: '1.25rem', maxWidth: 720 }}>
          Use inside <code>sds-segmented__group</code> for custom layouts. Below: static examples (pointer-events
          off) showing unselected vs selected chrome.
        </p>
        <div style={staticGridAutoFill}>
          <StaticShowcaseCell label="Unselected · default (no pointer)">
            <div className="sds-segmented__group" style={{ maxWidth: 120 }}>
              <SegmentedControlButton type="button" selected={false} tabIndex={-1} style={{ pointerEvents: 'none' }}>
                A
              </SegmentedControlButton>
            </div>
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Selected · default (no pointer)">
            <div className="sds-segmented__group" style={{ maxWidth: 120 }}>
              <SegmentedControlButton type="button" selected tabIndex={-1} style={{ pointerEvents: 'none' }}>
                A
              </SegmentedControlButton>
            </div>
          </StaticShowcaseCell>
        </div>
        <p style={{ color: '#666', fontSize: 14, marginBottom: '0.75rem' }}>
          Interactive pair — hover and press each cell to verify hover / pressed fills:
        </p>
        <div className="sds-segmented__group" style={{ display: 'inline-flex', maxWidth: 220 }}>
          <SegmentedControlButton selected={false} type="button" onClick={() => {}}>
            Off
          </SegmentedControlButton>
          <SegmentedControlButton selected type="button" onClick={() => {}}>
            On
          </SegmentedControlButton>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Many segments" marginBottom="0">
        <SegmentedControl
          label="Options"
          options={['Alpha', 'Beta', 'Gamma', 'Delta'] as const}
          value="Gamma"
          onChange={() => {}}
        />
      </ShowcaseSection>
    </ShowcasePage>
  );
};
