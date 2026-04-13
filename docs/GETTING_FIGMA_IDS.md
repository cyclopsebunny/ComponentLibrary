# How to Get Figma File Key and Node IDs

This guide explains how to find the Figma file key and node IDs needed for the component library configuration.

## Getting the Figma File Key

The file key is found in your Figma file URL.

### From Figma URL

1. Open your Figma file in the browser
2. Look at the URL - it will look like this:
   ```
   https://www.figma.com/design/FILE_KEY/File-Name
   ```
   or
   ```
   https://www.figma.com/file/FILE_KEY/File-Name
   ```

3. The **FILE_KEY** is the long alphanumeric string between `/design/` (or `/file/`) and the file name

**Example:**
- URL: `https://www.figma.com/design/abc123xyz789/My-Design-System`
- File Key: `abc123xyz789`

### Adding to Configuration

Copy the file key into `.figma-mcp-config.json`:

```json
{
  "figma": {
    "fileKey": "abc123xyz789",
    ...
  }
}
```

## Getting Node IDs

Node IDs identify specific elements (components, frames, variables) in your Figma file. There are several ways to get them:

### Method 1: From Figma URL (When Selected)

1. Select an element in Figma (component, frame, or variable container)
2. Look at the URL - it will have a `node-id` parameter:
   ```
   https://www.figma.com/design/FILE_KEY/File-Name?node-id=123-456
   ```
3. The node ID is `123-456` (or `123:456` - both formats work)

**Note:** The node ID format in URLs uses hyphens (`123-456`), but you can use either hyphens or colons (`123:456`) with the MCP tools.

### Method 2: Using Figma MCP Tools (Recommended)

The easiest way is to use the MCP tools directly:

1. **Open Figma Desktop App** (MCP tools work with the desktop app)
2. **Select the element** you want (component, frame, or variable container)
3. **Use the MCP tool** in your IDE:
   - For variables: Use `get_variable_defs` without a nodeId (it will use the currently selected node)
   - For components: Use `get_design_context` without a nodeId (it will use the currently selected node)
   - For metadata: Use `get_metadata` without a nodeId to see the structure

4. The MCP tool will return the node ID in the response, or you can extract it from the metadata

### Method 3: Using get_metadata to Explore

1. Select a frame or page in Figma
2. Use `get_metadata` MCP tool (without nodeId to use selected, or with a page node ID)
3. The metadata will show all child nodes with their IDs

**Example metadata structure:**
```xml
<node id="123:456" type="COMPONENT" name="Button" ...>
  <node id="123:789" type="FRAME" name="Container" ...>
    ...
  </node>
</node>
```

## Finding the Right Nodes

### For Design Variables

1. In Figma, go to your **Variables** panel (if you have variables set up)
2. Or find the frame/page that contains your design tokens
3. Select that frame/page
4. Use `get_variable_defs` MCP tool to extract variables
5. Note the node ID from the response or URL

### For Components

1. In Figma, find the component you want to extract
2. Select the component instance or the component definition
3. Use `get_design_context` MCP tool to extract component data
4. Note the node ID from the response or URL

### For Multiple Components

If you have many components, you can:

1. **Use get_metadata on a page/frame** that contains all your components
2. The metadata will list all components with their IDs
3. Copy the IDs and add them to your configuration

## Complete Configuration Example

Once you have all the IDs, your `.figma-mcp-config.json` should look like:

```json
{
  "figma": {
    "fileKey": "abc123xyz789",
    "nodeMappings": {
      "variables": "123-456",
      "components": [
        { "nodeId": "123-789", "name": "Button" },
        { "nodeId": "123-101", "name": "Card" },
        { "nodeId": "123-112", "name": "Input" }
      ]
    },
    "extraction": {
      "variablesPath": "packages/component-library/scripts/figma-raw/variables.json",
      "componentsPath": "packages/component-library/scripts/figma-raw/components"
    }
  }
}
```

## Quick Start Workflow

1. **Get File Key:**
   - Open Figma file in browser
   - Copy the file key from URL

2. **Get Variables Node ID:**
   - Open Figma Desktop App
   - Select the frame/page with your variables
   - Use `get_variable_defs` MCP tool (no nodeId = uses selected)
   - Note the node ID from URL or response

3. **Get Component Node IDs:**
   - Select each component in Figma Desktop App
   - Use `get_design_context` MCP tool (no nodeId = uses selected)
   - Note the node ID from URL or response
   - Repeat for each component

4. **Update Configuration:**
   - Add all IDs to `.figma-mcp-config.json`

## Tips

- **Node IDs are stable**: Once you have them, they won't change unless you duplicate/delete elements
- **Use MCP tools without nodeId**: When you select an element in Figma Desktop, you can call MCP tools without specifying nodeId - they'll use the selected element
- **Document your IDs**: Keep a note of which node IDs correspond to which components for easy reference
- **Use get_metadata**: If you're not sure which node to use, `get_metadata` can help you explore the structure

## Troubleshooting

### "Node not found" error

- Make sure you're using the correct file key
- Verify the node ID is correct (check URL when element is selected)
- Ensure the element exists in the Figma file

### Can't find node ID in URL

- Make sure you've selected the element in Figma
- Try using MCP tools without nodeId (they'll use the selected element)
- Use `get_metadata` to explore the structure

### Node ID format confusion

- Both `123-456` and `123:456` formats work
- URLs use hyphens, but MCP tools accept both
- Use whichever format you prefer
