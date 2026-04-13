# Component Library

A reusable React component library with design tokens and components imported from Figma using the Figma MCP server.

## Overview

This component library provides a systematic way to:
- Extract design tokens (colors, typography, spacing, shadows) from Figma
- Generate React components from Figma designs
- Ensure all values come directly from Figma (no hardcoded values)
- Distribute as a private npm package for team use

## Architecture

```
Component Library/
├── packages/
│   └── component-library/     # Main library package
│       ├── src/
│       │   ├── components/    # React components (generated from Figma)
│       │   ├── tokens/        # Design tokens (generated from Figma)
│       │   └── styles/        # CSS variables
│       └── scripts/
│           ├── sync-figma.js       # Extract raw data from Figma
│           ├── generate-tokens.js  # Generate tokens from raw data
│           ├── generate-components.js # Generate components from raw data
│           └── validate-extraction.js # Validate extraction
├── apps/
│   └── example-app/           # Example consumer + preview UI
│       └── src/preview/       # Tokens, CSS vars, component demos (not in the npm package)
├── docs/
│   └── LIBRARY_ORGANIZATION.md  # Folder conventions & component priority roadmap
└── .figma-mcp-config.json     # Figma MCP configuration
```

Run `npm run dev -w example-app` and open the local URL to browse **Overview**, **Tokens & global CSS**, and component tabs.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Figma desktop app (for MCP server)
- Access to your Figma design file

### Installation

```bash
# Install dependencies
npm install

# Build the library
cd packages/component-library
npm run build
```

## Workflow: Extracting from Figma

### Step 1: Configure Figma Connection

Edit `.figma-mcp-config.json`:

```json
{
  "figma": {
    "fileKey": "your-figma-file-key",
    "nodeMappings": {
      "variables": "node-id-for-variables",
      "components": [
        { "nodeId": "component-1-id", "name": "Button" },
        { "nodeId": "component-2-id", "name": "Card" }
      ]
    }
  }
}
```

**Need help finding the file key and node IDs?** See [docs/GETTING_FIGMA_IDS.md](docs/GETTING_FIGMA_IDS.md) for detailed instructions.

### Step 2: Extract Variables from Figma

1. Open your Figma file in the desktop app
2. Select the node containing your design variables
3. Use the Figma MCP tool `get_variable_defs` to extract variables
4. Save the output to `packages/component-library/scripts/figma-raw/variables.json`

Example using MCP:
```
Extract variables from Figma node {nodeId} and save to figma-raw/variables.json
```

### Step 3: Extract Component Specs

1. For each component in Figma:
   - Select the component node
   - Use the Figma MCP tool `get_design_context` to extract component data
   - Save the output to `packages/component-library/scripts/figma-raw/components/{ComponentName}.json`

### Step 4: Generate Tokens

```bash
cd packages/component-library
npm run generate-tokens
```

This reads the raw JSON from `figma-raw/variables.json` and generates:
- TypeScript token files in `src/tokens/`
- CSS variables in `src/styles/index.css`

### Step 5: Generate Components

```bash
npm run generate-components
```

This reads the raw JSON from `figma-raw/components/` and generates React components in `src/components/`.

### Step 6: Validate

```bash
npm run validate
```

This validates that:
- All expected data was extracted
- Generated code matches raw Figma data
- No hardcoded values exist
- All values have source annotations

## Using the Library

### Installation in Your App

```bash
npm install @component-library/core
```

### Import Components

```tsx
import { Button, Card } from '@component-library/core';
import '@component-library/core/styles';
```

### Import Tokens

```tsx
import { colors, spacing, typography } from '@component-library/core/tokens';

const MyComponent = () => {
  return (
    <div style={{ 
      color: colors.primary,
      padding: spacing.medium 
    }}>
      Hello World
    </div>
  );
};
```

## Development

### Building

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Development Mode (Watch)

```bash
npm run dev
```

## Publishing

### For GitHub Packages

1. Configure `.npmrc`:
```
@component-library:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

2. Publish:
```bash
npm publish --access restricted
```

### Using the Publish Script

```bash
./scripts/publish.sh
```

This script will:
- Build the library
- Validate extraction
- Bump version (patch/minor/major)
- Publish to registry

## Ensuring Real Values from Figma

This library is designed to **never use hardcoded values**. All values come directly from Figma:

1. **Raw Data Storage**: All Figma data is extracted and stored in `figma-raw/` before any code generation
2. **Source Annotations**: Every generated value includes a comment showing its Figma source
3. **Validation**: The validation script checks that generated code matches raw Figma data
4. **Workflow Enforcement**: Code generation only happens after extraction and validation

### MCP Tools Used

- `get_variable_defs(nodeId)` - Extracts design variables (colors, spacing, etc.)
- `get_design_context(nodeId)` - Extracts complete component specifications
- `get_metadata(nodeId)` - Gets component structure

## Contributing

1. Extract new data from Figma using MCP tools
2. Save raw data to `figma-raw/`
3. Run generation scripts
4. Validate with `npm run validate`
5. Build and test

## License

MIT
