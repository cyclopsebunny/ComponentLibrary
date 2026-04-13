# Example App

This is an example application demonstrating how to use the component library in your projects.

The dev server opens a **tabbed preview**: overview & roadmap, **tokens + global CSS variables**, and per-component showcases (`src/preview/`). See repo `docs/LIBRARY_ORGANIZATION.md` for where to add new components in the package.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Using the Component Library

### 1. Import Styles

Always import the library styles first:

```tsx
import '@component-library/core/styles';
```

### 2. Import Components

```tsx
import { Button, Card } from '@component-library/core';
```

### 3. Import Tokens

```tsx
import { colors, spacing, typography } from '@component-library/core/tokens';
```

## Example Usage

See `src/App.tsx` for examples of:
- Importing and using components
- Using design tokens in JavaScript/TypeScript
- Using CSS variables in stylesheets

## Notes

- Make sure the component library is built before using it
- Run `npm run build` in `packages/component-library` first
- Components and tokens are generated from Figma - see main README for extraction workflow
