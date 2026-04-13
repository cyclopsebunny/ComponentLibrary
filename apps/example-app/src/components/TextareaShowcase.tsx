import React, { useState } from 'react';
import { Textarea } from '@component-library/core';
import {
  InteractivePlaygroundSection,
  MutedShowcaseSection,
  ShowcaseHeader,
  ShowcaseIntro,
  ShowcasePage,
  previewColumnWide,
  showcaseFlexGrid,
  showcaseVariantLabel,
} from '../showcase/componentShowcaseTemplate';

function InteractiveDemo() {
  const [value, setValue] = useState(
    'Try typing here — the text wraps automatically as you fill the width.\n\nDrag the handle in the lower-right corner to resize the field.'
  );
  return (
    <Textarea
      placeholder="Type something…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      initialWidth={360}
      minWidth={240}
      minHeight={120}
    />
  );
}

export const TextareaShowcase: React.FC = () => (
  <ShowcasePage maxWidth={1200}>
    <ShowcaseHeader title="Textarea">
      <ShowcaseIntro>
        Multi-line text input — matched to Figma node 9762:3088. All three states, optional
        label / description / hint, and a custom drag-to-resize handle.
      </ShowcaseIntro>
    </ShowcaseHeader>

    <InteractivePlaygroundSection
      previewColumnStyle={previewColumnWide}
      controls={
        <p style={{ color: '#666', margin: 0, fontSize: 14, lineHeight: 1.6 }}>
          Type to fill the field. Drag the <strong>lower-right corner</strong> to change the width
          and height — text reflows automatically. Minimum size is 240 × 120 px.
        </p>
      }
      preview={<InteractiveDemo />}
    />

    <MutedShowcaseSection title="States" description="Default · Error · Disabled — matching the three Figma variants.">
      <div style={showcaseFlexGrid}>
        <div>
          <p style={showcaseVariantLabel}>Default</p>
          <Textarea label="Label" defaultValue="Value" />
        </div>
        <div>
          <p style={showcaseVariantLabel}>Default — placeholder</p>
          <Textarea label="Label" placeholder="Placeholder text" />
        </div>
        <div>
          <p style={showcaseVariantLabel}>Error</p>
          <Textarea label="Label" state="error" defaultValue="Value" hint="This field has an error" />
        </div>
        <div>
          <p style={showcaseVariantLabel}>Error — placeholder</p>
          <Textarea label="Label" state="error" placeholder="Placeholder text" hint="This field has an error" />
        </div>
        <div>
          <p style={showcaseVariantLabel}>Disabled</p>
          <Textarea label="Label" state="disabled" defaultValue="Value" />
        </div>
        <div>
          <p style={showcaseVariantLabel}>Disabled — placeholder</p>
          <Textarea label="Label" state="disabled" placeholder="Placeholder text" />
        </div>
      </div>
    </MutedShowcaseSection>

    <MutedShowcaseSection
      title="With label, description & hint"
      description="All three optional text slots shown together. The hint text colour tracks the current state."
    >
      <div style={showcaseFlexGrid}>
        <div>
          <p style={showcaseVariantLabel}>Default + all slots</p>
          <Textarea
            label="Message"
            description="Tell us more about your request."
            placeholder="Type here…"
            hint="Hint text"
            initialWidth={280}
          />
        </div>
        <div>
          <p style={showcaseVariantLabel}>Error + all slots</p>
          <Textarea
            label="Message"
            description="Tell us more about your request."
            placeholder="Type here…"
            hint="This field is required"
            state="error"
            initialWidth={280}
          />
        </div>
        <div>
          <p style={showcaseVariantLabel}>Disabled + all slots</p>
          <Textarea
            label="Message"
            description="Tell us more about your request."
            defaultValue="You cannot edit this field."
            hint="Hint text"
            state="disabled"
            initialWidth={280}
          />
        </div>
      </div>
    </MutedShowcaseSection>

    <MutedShowcaseSection title="Without label" description="Label and description are optional — omit them for a bare input.">
      <div style={showcaseFlexGrid}>
        <div>
          <p style={showcaseVariantLabel}>Bare input</p>
          <Textarea placeholder="No label or description" />
        </div>
        <div>
          <p style={showcaseVariantLabel}>Bare input — error</p>
          <Textarea placeholder="No label or description" state="error" hint="Required" />
        </div>
      </div>
    </MutedShowcaseSection>

    <MutedShowcaseSection
      title="resizable=false"
      description={
        <>
          Set <code>resizable=&#123;false&#125;</code> to hide the drag handle for contexts where a
          fixed-size textarea is preferred.
        </>
      }
    >
      <div style={showcaseFlexGrid}>
        <div>
          <p style={showcaseVariantLabel}>No resize handle</p>
          <Textarea
            label="Fixed size"
            placeholder="This field cannot be resized"
            resizable={false}
            initialWidth={280}
          />
        </div>
      </div>
    </MutedShowcaseSection>
  </ShowcasePage>
);
