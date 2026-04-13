import React from 'react';
import figma from '@figma/code-connect';
import { Button } from './Button';

/**
 * Code Connect: maps the Figma Button component (node 4185:3778) to `Button`.
 * Adjust `figma.enum` / `figma.string` keys if your Figma property names differ.
 *
 * Publish from repo root: `npx figma connect publish` (set FIGMA_ACCESS_TOKEN).
 * @see https://developers.figma.com/docs/code-connect/react/
 */
figma.connect(
  Button,
  'https://www.figma.com/design/1pYVDCkei9zOaAaz0GHzWq?node-id=4185-3778',
  {
    props: {
      label: figma.string('Label'),
      // Keys must match Figma variant *option names* exactly (case-sensitive). The file
      // uses lowercase default/brand/frameless and capitalized CTA/Subtle on the canvas.
      variant: figma.enum('Variant', {
        default: 'default',
        CTA: 'CTA',
        brand: 'brand',
        Subtle: 'subtle',
        Danger: 'danger',
        'Danger-subtle': 'danger-subtle',
        frameless: 'frameless',
      }),
      // Figma uses "Default" for the resting state; code uses `state="enabled"`.
      state: figma.enum('State', {
        Default: 'enabled',
        Hover: 'hover',
        Pressed: 'pressed',
        Active: 'active',
        Disabled: 'disabled',
      }),
      size: figma.enum('Size', {
        Small: 'Small',
        Medium: 'Medium',
      }),
      hasIconStart: figma.boolean('Has Icon Start'),
      hasIconEnd: figma.boolean('Has Icon End'),
      iconStart: figma.instance('Icon Start'),
      iconEnd: figma.instance('Icon End'),
    },
    example: ({
      label,
      variant,
      state,
      size,
      hasIconStart,
      hasIconEnd,
      iconStart,
      iconEnd,
    }) => (
      <Button
        label={label}
        variant={variant}
        state={state}
        size={size}
        hasIconStart={hasIconStart}
        hasIconEnd={hasIconEnd}
        iconStart={iconStart}
        iconEnd={iconEnd}
      />
    ),
  }
);

/**
 * "Button Danger" component set (Figma node 185:852). Uses Variant Primary/Subtle →
 * code `danger` / `danger-subtle`; State uses Default (aligned with main Button).
 */
figma.connect(
  Button,
  'https://www.figma.com/design/1pYVDCkei9zOaAaz0GHzWq?node-id=185-852',
  {
    props: {
      label: figma.string('Label'),
      variant: figma.enum('Variant', {
        Primary: 'danger',
        Subtle: 'danger-subtle',
      }),
      state: figma.enum('State', {
        Default: 'enabled',
        Hover: 'hover',
        Pressed: 'pressed',
        Active: 'active',
        Disabled: 'disabled',
      }),
      size: figma.enum('Size', {
        Small: 'Small',
        Medium: 'Medium',
      }),
      hasIconStart: figma.boolean('Has Icon Start'),
      hasIconEnd: figma.boolean('Has Icon End'),
      iconStart: figma.instance('Icon Start'),
      iconEnd: figma.instance('Icon End'),
    },
    example: ({
      label,
      variant,
      state,
      size,
      hasIconStart,
      hasIconEnd,
      iconStart,
      iconEnd,
    }) => (
      <Button
        label={label}
        variant={variant}
        state={state}
        size={size}
        hasIconStart={hasIconStart}
        hasIconEnd={hasIconEnd}
        iconStart={iconStart}
        iconEnd={iconEnd}
      />
    ),
  }
);
