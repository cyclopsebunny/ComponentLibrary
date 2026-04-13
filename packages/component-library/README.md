# @component-library/core

React component library with design tokens and components imported from Figma.

## Installation

```bash
npm install @component-library/core
```

## Usage

### Import Components

```tsx
import { Button, Card } from '@component-library/core';
import '@component-library/core/styles';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Card>
        <h2>Card Title</h2>
        <p>Card content</p>
      </Card>
    </div>
  );
}
```

### Import Design Tokens

```tsx
import { colors, spacing, typography } from '@component-library/core/tokens';

function MyComponent() {
  return (
    <div style={{
      backgroundColor: colors.primary,
      padding: spacing.large,
      fontFamily: typography.fontFamily,
    }}>
      Styled with design tokens
    </div>
  );
}
```

### CSS Variables

After importing styles, you can use CSS variables:

```css
.my-component {
  background-color: var(--color-primary);
  padding: var(--spacing-large);
}
```

## API Reference

### Components

Components are generated from Figma. See your Figma design file for available components.

### Tokens

#### Colors

```tsx
import { colors } from '@component-library/core/tokens';

// Access color tokens
colors.primary
colors.secondary
// ... (generated from Figma)
```

#### Spacing

```tsx
import { spacing } from '@component-library/core/tokens';

// Access spacing tokens
spacing.small
spacing.medium
spacing.large
// ... (generated from Figma)
```

#### Typography

```tsx
import { typography } from '@component-library/core/tokens';

// Access typography tokens
typography.fontFamily
typography.fontSize
// ... (generated from Figma)
```

## Development

See the main [README.md](../../README.md) for development setup and Figma integration workflow.

## License

MIT
