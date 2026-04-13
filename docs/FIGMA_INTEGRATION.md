# Figma Integration Guide

This guide explains how to extract design tokens and components from Figma and ensure all values come directly from your Figma designs.

**First time?** Start with [GETTING_FIGMA_IDS.md](./GETTING_FIGMA_IDS.md) to learn how to find your Figma file key and node IDs.

## Overview

The component library uses the Figma MCP (Model Context Protocol) server to extract real design data. This ensures that:
- All values come directly from Figma (no hardcoded values)
- Design changes in Figma can be synced to code
- Source annotations track where each value came from

## MCP Tools

### 1. `get_variable_defs(nodeId)`

Extracts design variables from Figma.

**Returns:**
```json
{
  "color/primary": "#0066FF",
  "spacing/small": "8px",
  "spacing/medium": "16px",
  "typography/fontFamily": "Inter"
}
```

**Usage:**
1. Open Figma desktop app
2. Select the node containing your design variables
3. Use the MCP tool with the node ID
4. Save the output to `packages/component-library/scripts/figma-raw/variables.json`

### 2. `get_design_context(nodeId)`

Extracts complete component specifications including:
- Dimensions (width, height)
- Colors (fills, strokes)
- Typography (font family, size, weight, line height)
- Spacing (padding, margins, gaps)
- Borders (radius, width, style)
- Shadows (blur, spread, offset, color)
- Opacity, transforms, and all visual properties

**Usage:**
1. Select a component in Figma
2. Use the MCP tool with the component's node ID
3. Save the output to `packages/component-library/scripts/figma-raw/components/{ComponentName}.json`

### 3. `get_metadata(nodeId)`

Gets structure overview (node IDs, types, names, positions, sizes).

**Usage:**
- Understanding component hierarchy
- Finding node IDs for extraction

## Extraction Workflow

### Step 1: Extract Variables

```bash
# 1. Use MCP tool in your IDE to extract variables
# 2. Save output to figma-raw/variables.json
# 3. Generate tokens
npm run generate-tokens
```

### Step 2: Extract Components

```bash
# 1. For each component, use MCP tool to extract
# 2. Save to figma-raw/components/{Name}.json
# 3. Generate components
npm run generate-components
```

### Step 3: Validate

```bash
npm run validate
```

This checks:
- ✅ All expected data was extracted
- ✅ Generated code matches raw Figma data
- ✅ No hardcoded values exist
- ✅ All values have source annotations

## Source Annotations

Every generated value includes a source annotation:

```typescript
// Source: Figma variable 'color/primary'
export const primary = '#0066FF';
```

```typescript
// Extracted from Figma node 123:456
export const Button = ({ ... }) => { ... };
```

## Re-syncing from Figma

When designs change in Figma:

1. Re-extract the changed data using MCP tools
2. Save updated JSON to `figma-raw/`
3. Regenerate tokens/components:
   ```bash
   npm run generate-tokens
   npm run generate-components
   ```
4. Validate:
   ```bash
   npm run validate
   ```
5. Review changes and commit

## Troubleshooting

### "variables.json not found"

Make sure you've extracted variables from Figma and saved them to `figma-raw/variables.json`.

### "Component file not found"

Make sure you've extracted the component from Figma and saved it to `figma-raw/components/{Name}.json`.

### Validation warnings about hardcoded values

Check that:
1. Raw data exists in `figma-raw/`
2. Generated code references the raw data
3. Source annotations are present

### Values don't match Figma

1. Re-extract from Figma using MCP tools
2. Verify the raw JSON matches what you see in Figma
3. Regenerate tokens/components
4. Run validation again

## Code Connect (Dev Mode snippets)

This repo links the `Button` component to the Figma library with [Figma Code Connect](https://developers.figma.com/docs/code-connect/). After publishing, **Dev Mode** shows the real React usage (import from `@component-library/core`) instead of generic generated code.

**Layout**

- `figma.config.json` — workspace root; parser, include globs, and `importPaths` so snippets use `@component-library/core`.
- `packages/component-library/src/components/Button.figma.tsx` — `figma.connect()` mapping from Figma props (`Variant`, `State`, `Size`, `Label`, icons, …) to `Button` props.

**Publish (requires a Figma token)**

1. Create a [personal access token](https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens) with **Code Connect (Write)** and **File content (Read)**.
2. From the workspace root:

   ```bash
   export FIGMA_ACCESS_TOKEN=your_token
   npm run code-connect:publish
   ```

   Or: `npm run code-connect:dry-run` to parse locally without calling the API.

**If Dev Mode shows wrong props**

Figma variant **option labels** must match the keys in `figma.enum('Variant', { … })` exactly (case-sensitive). If your file renames a variant (e.g. `Danger subtle` vs `Danger-subtle`), update `Button.figma.tsx` and publish again.

## Best Practices

1. **Always extract first**: Never generate code without extracting raw data from Figma
2. **Validate regularly**: Run `npm run validate` after each extraction
3. **Commit raw data**: Consider committing `figma-raw/` to track design changes
4. **Document node IDs**: Keep track of which Figma nodes correspond to which components
5. **Version control**: Tag releases when syncing major design updates
