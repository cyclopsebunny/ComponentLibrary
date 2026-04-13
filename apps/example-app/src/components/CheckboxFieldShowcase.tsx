import React, { useState } from 'react';
import { CheckboxField } from '@component-library/core';
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

const grid = staticGridEqualColumns(3, 220);

export const CheckboxFieldShowcase: React.FC = () => {
  const [playChecked, setPlayChecked] = useState(false);
  const [playIndeterminate, setPlayIndeterminate] = useState(true);

  return (
    <ShowcasePage maxWidth={1100}>
      <ShowcaseHeader title="CheckboxField">
        <ShowcaseIntro>
          From Figma <strong>4.0 Design System (Enterprise)</strong>, node{' '}
          <code style={{ fontSize: 14 }}>9762:1441</code> — label, optional description, checked / unchecked /
          indeterminate, default and disabled.
        </ShowcaseIntro>
      </ShowcaseHeader>

      <InteractivePlaygroundSection
        previewColumnStyle={previewColumnNarrow}
        controls={
          <>
            <p style={{ color: '#666', margin: 0, fontSize: 14 }}>
              Toggle drives <code>checked</code> and <code>indeterminate</code> (indeterminate wins for the icon).
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <button
                type="button"
                onClick={() => {
                  setPlayIndeterminate(false);
                  setPlayChecked((c) => !c);
                }}
                style={showcaseDemoButton}
              >
                Toggle checked
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlayIndeterminate((i) => !i);
                  if (!playIndeterminate) setPlayChecked(false);
                }}
                style={showcaseDemoButton}
              >
                Toggle indeterminate
              </button>
            </div>
          </>
        }
        preview={
          <CheckboxField
            label="Label"
            description="Description"
            checked={playChecked}
            indeterminate={playIndeterminate}
            onChange={(e) => {
              if (playIndeterminate) {
                setPlayIndeterminate(false);
                setPlayChecked(e.target.checked);
              } else {
                setPlayChecked(e.target.checked);
              }
            }}
          />
        }
      />

      <ShowcaseSection title="All states (static)" marginBottom="0">
        <div style={grid}>
          <StaticShowcaseCell label="Default · Checked">
            <CheckboxField label="Label" description="Description" checked onChange={() => {}} />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Default · Unchecked">
            <CheckboxField label="Label" description="Description" checked={false} onChange={() => {}} />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Default · Indeterminate">
            <CheckboxField
              label="Label"
              description="Description"
              checked={false}
              indeterminate
              onChange={() => {}}
            />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Checked">
            <CheckboxField label="Label" description="Description" checked disabled onChange={() => {}} />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Unchecked">
            <CheckboxField
              label="Label"
              description="Description"
              checked={false}
              disabled
              onChange={() => {}}
            />
          </StaticShowcaseCell>
          <StaticShowcaseCell label="Disabled · Indeterminate">
            <CheckboxField
              label="Label"
              description="Description"
              checked={false}
              indeterminate
              disabled
              onChange={() => {}}
            />
          </StaticShowcaseCell>
        </div>
      </ShowcaseSection>
    </ShowcasePage>
  );
};
