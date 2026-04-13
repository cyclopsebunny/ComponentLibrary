import React, { useState } from 'react';
import { SwitchField } from '@component-library/core';
import {
  InteractivePlaygroundSection,
  ShowcaseHeader,
  ShowcaseIntro,
  ShowcasePage,
  ShowcaseSection,
  StaticShowcaseCell,
  previewColumnNarrow,
  showcaseDemoButton,
  staticGridEqualColumns,
} from '../showcase/componentShowcaseTemplate';

const grid = staticGridEqualColumns(2, 260);

export const SwitchFieldShowcase: React.FC = () => {
  const [on, setOn] = useState(false);

  return (
    <ShowcasePage maxWidth={1100}>
      <ShowcaseHeader title="SwitchField">
        <ShowcaseIntro>
          From Figma <strong>4.0 Design System (Enterprise)</strong>, node{' '}
          <code style={{ fontSize: 14 }}>9762:1902</code> — label and switch on one row, optional description
          below; matches Code Connect keywords: toggle.
        </ShowcaseIntro>
      </ShowcaseHeader>

      <InteractivePlaygroundSection
        previewColumnStyle={previewColumnNarrow}
        controls={
          <>
            <p style={{ color: '#666', margin: 0, fontSize: 14 }}>
              State: <code>{on ? 'on' : 'off'}</code>
            </p>
            <button type="button" onClick={() => setOn((v) => !v)} style={showcaseDemoButton}>
              Flip from outside (demo)
            </button>
          </>
        }
        preview={
          <SwitchField label="Label" description="Description" checked={on} onChange={(e) => setOn(e.target.checked)} />
        }
      />

      <ShowcaseSection title="All states (static)" marginBottom="0">
        <div style={grid}>
          <StaticShowcaseCell label="Default · On">
            <SwitchField label="Label" description="Description" checked onChange={() => {}} />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Default · Off">
            <SwitchField label="Label" description="Description" checked={false} onChange={() => {}} />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · On">
            <SwitchField label="Label" description="Description" checked disabled onChange={() => {}} />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Off">
            <SwitchField label="Label" description="Description" checked={false} disabled onChange={() => {}} />
          </StaticShowcaseCell>
        </div>
      </ShowcaseSection>
    </ShowcasePage>
  );
};
