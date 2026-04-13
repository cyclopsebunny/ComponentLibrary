# Button Component Showcase

This showcase demonstrates all button variants, states, and sizes from the Figma design system.

## Running the Showcase

1. **Build the component library first:**
   ```bash
   cd packages/component-library
   npm run build
   ```

2. **Start the example app:**
   ```bash
   cd apps/example-app
   npm install
   npm run dev
   ```

3. **View in browser:**
   Open http://localhost:5173 (or the port shown in terminal)

## What's Included

The showcase includes:

- **Interactive Playground**: Change button states and see all variants update
- **All Variants**: See all 7 button variants (default, CTA, brand, subtle, danger, danger-subtle, frameless)
- **All States**: See all 5 states (enabled, hover, pressed, active, disabled)
- **Size Comparison**: Compare Small vs Medium sizes
- **Icon Examples**: See buttons with start icons, end icons, and both
- **Code Examples**: Copy-paste ready code snippets

## Button Variants

- **default**: White background with border
- **CTA**: Dark background (primary call-to-action)
- **brand**: Blue background (brand color)
- **subtle**: Light background with colored text
- **danger**: Red background (destructive actions)
- **danger-subtle**: Light red background with red text
- **frameless**: No background or border (text-only)

## Button States

- **enabled**: Default interactive state
- **hover**: Mouse hover state
- **pressed**: Click/press state
- **active**: Selected/active state
- **disabled**: Non-interactive state

## Button Sizes

- **Small**: Compact size (12px padding, 14px font)
- **Medium**: Standard size (16px padding, 16px font)

All colors and styles come directly from Figma design tokens!
