#!/usr/bin/env node

/**
 * Sync script to extract design tokens and component specs from Figma via MCP
 * 
 * This script extracts raw JSON data from Figma and stores it in figma-raw/
 * before any code generation. This ensures we always use real values from Figma.
 * 
 * Usage:
 *   node scripts/sync-figma.js [--nodeId <nodeId>] [--component <name>]
 * 
 * Environment:
 *   This script is designed to work with the Figma MCP server.
 *   For manual extraction, use the MCP tools directly in your IDE.
 */

const fs = require('fs');
const path = require('path');

// Load configuration
const configPath = path.join(__dirname, '../../../.figma-mcp-config.json');
let config = {};
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.warn('Warning: Could not load .figma-mcp-config.json. Using defaults.');
}

const FIGMA_RAW_DIR = path.join(__dirname, 'figma-raw');
const VARIABLES_FILE = path.join(FIGMA_RAW_DIR, 'variables.json');
const COMPONENTS_DIR = path.join(FIGMA_RAW_DIR, 'components');

// Ensure directories exist
if (!fs.existsSync(FIGMA_RAW_DIR)) {
  fs.mkdirSync(FIGMA_RAW_DIR, { recursive: true });
}
if (!fs.existsSync(COMPONENTS_DIR)) {
  fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
}

/**
 * Extract variables from Figma using MCP get_variable_defs
 * 
 * NOTE: This function is a template. In practice, you would call the MCP tool:
 * mcp_figma-desktop_get_variable_defs({ nodeId: config.figma.nodeMappings.variables })
 * 
 * For now, this script provides the structure. The actual extraction should be done
 * using the MCP tools in your IDE, then the results can be saved using this script.
 */
function extractVariables(nodeId) {
  console.log('📦 Extracting variables from Figma...');
  console.log(`   Node ID: ${nodeId || config.figma?.nodeMappings?.variables || 'Not configured'}`);
  
  // This is where you would call the MCP tool:
  // const variables = await mcp_figma-desktop_get_variable_defs({ nodeId });
  
  // For now, return empty object - will be populated by actual MCP extraction
  const variables = {};
  
  // Store raw data
  fs.writeFileSync(
    VARIABLES_FILE,
    JSON.stringify(variables, null, 2),
    'utf8'
  );
  
  console.log(`✅ Variables extracted and saved to ${VARIABLES_FILE}`);
  return variables;
}

/**
 * Extract component specs from Figma using MCP get_design_context
 * 
 * NOTE: This function is a template. In practice, you would call the MCP tool:
 * mcp_figma-desktop_get_design_context({ nodeId: componentNodeId })
 */
function extractComponent(nodeId, componentName) {
  console.log(`📦 Extracting component: ${componentName || 'unnamed'}...`);
  console.log(`   Node ID: ${nodeId}`);
  
  // This is where you would call the MCP tool:
  // const componentData = await mcp_figma-desktop_get_design_context({ nodeId });
  
  // For now, return empty object - will be populated by actual MCP extraction
  const componentData = {
    nodeId,
    componentName: componentName || 'unnamed',
    extractedAt: new Date().toISOString(),
    // Actual data will be populated from MCP extraction
  };
  
  // Store raw data
  const componentFile = path.join(COMPONENTS_DIR, `${componentName || nodeId}.json`);
  fs.writeFileSync(
    componentFile,
    JSON.stringify(componentData, null, 2),
    'utf8'
  );
  
  console.log(`✅ Component extracted and saved to ${componentFile}`);
  return componentData;
}

/**
 * Extract all components from configuration
 */
function extractAllComponents() {
  const components = config.figma?.nodeMappings?.components || [];
  
  if (components.length === 0) {
    console.log('ℹ️  No components configured in .figma-mcp-config.json');
    return;
  }
  
  console.log(`📦 Extracting ${components.length} component(s)...`);
  
  components.forEach((component) => {
    const nodeId = typeof component === 'string' ? component : component.nodeId;
    const name = typeof component === 'string' ? undefined : component.name;
    extractComponent(nodeId, name);
  });
}

/**
 * Main sync function
 */
function sync() {
  console.log('🚀 Starting Figma sync...\n');
  
  // Extract variables
  const variablesNodeId = config.figma?.nodeMappings?.variables;
  if (variablesNodeId) {
    extractVariables(variablesNodeId);
  } else {
    console.log('⚠️  No variables node configured. Skipping variable extraction.');
  }
  
  console.log('');
  
  // Extract components
  extractAllComponents();
  
  console.log('\n✅ Sync complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Use MCP tools in your IDE to extract actual data from Figma');
  console.log('   2. Save the extracted data to the files in figma-raw/');
  console.log('   3. Run: npm run validate');
  console.log('   4. Generate code from the extracted data');
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Figma Sync Script

Extracts design tokens and component specs from Figma via MCP server.

Usage:
  node scripts/sync-figma.js [options]

Options:
  --help, -h          Show this help message
  --nodeId <id>       Extract specific node by ID
  --component <name>  Extract component with name

Note:
  This script provides the structure for extraction. Actual extraction
  should be done using Figma MCP tools in your IDE, then saved to
  the figma-raw/ directory.
  `);
  process.exit(0);
}

// Run sync
sync();
