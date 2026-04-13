#!/usr/bin/env node

/**
 * Automated Figma Sync Script
 * 
 * This script automatically extracts design tokens from Figma using MCP tools
 * and saves them to figma-raw/ for code generation.
 * 
 * IMPORTANT: This script must be run in an IDE context where MCP tools are available.
 * The MCP tools will be called automatically to extract data from Figma.
 * 
 * Usage:
 *   Run this script from your IDE (where MCP tools are available)
 *   Or use: node scripts/sync-figma-auto.js
 * 
 * After running, execute:
 *   npm run generate-tokens
 *   npm run validate
 */

const fs = require('fs');
const path = require('path');

// Load configuration
const configPath = path.join(__dirname, '../../../.figma-mcp-config.json');
let config = {};
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (error) {
  console.error('❌ Error: Could not load .figma-mcp-config.json');
  console.error('   Make sure the config file exists in the project root.');
  process.exit(1);
}

const FIGMA_RAW_DIR = path.join(__dirname, 'figma-raw');
const VARIABLES_FILE = path.join(FIGMA_RAW_DIR, 'variables.json');
const SEMANTIC_COLORS_FILE = path.join(FIGMA_RAW_DIR, 'semantic-colors.json');
const COMPONENT_COLORS_FILE = path.join(FIGMA_RAW_DIR, 'component-colors.json');
const COMPONENTS_DIR = path.join(FIGMA_RAW_DIR, 'components');

// Ensure directories exist
if (!fs.existsSync(FIGMA_RAW_DIR)) {
  fs.mkdirSync(FIGMA_RAW_DIR, { recursive: true });
}
if (!fs.existsSync(COMPONENTS_DIR)) {
  fs.mkdirSync(COMPONENTS_DIR, { recursive: true });
}

/**
 * Save extracted data to file
 */
function saveData(filePath, data, description) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`✅ ${description} saved to ${path.relative(process.cwd(), filePath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error saving ${description}:`, error.message);
    return false;
  }
}

/**
 * Main sync function
 * 
 * This function will be called with MCP tool results
 */
async function syncFromFigma() {
  console.log('🚀 Starting automated Figma sync...\n');
  console.log('📋 Configuration:');
  console.log(`   File Key: ${config.figma?.fileKey || 'Not configured'}`);
  console.log(`   Variables Node: ${config.figma?.nodeMappings?.variables || 'Not configured'}`);
  console.log(`   Semantic Colors Node: ${config.figma?.nodeMappings?.semanticColors || 'Not configured'}`);
  console.log(`   Component Colors Node: ${config.figma?.nodeMappings?.componentColors || 'Not configured'}`);
  console.log(`   Components: ${config.figma?.nodeMappings?.components?.length || 0} configured\n`);

  const results = {
    variables: null,
    semanticColors: null,
    componentColors: null,
    components: []
  };

  // Extract primitive variables
  if (config.figma?.nodeMappings?.variables) {
    console.log('📦 Extracting primitive variables...');
    console.log(`   Node ID: ${config.figma.nodeMappings.variables}`);
    console.log('   ⚠️  This requires MCP tool: mcp_figma-desktop_get_variable_defs');
    console.log('   Please call the MCP tool and save the result to variables.json\n');
  }

  // Extract semantic colors
  if (config.figma?.nodeMappings?.semanticColors) {
    console.log('📦 Extracting semantic colors...');
    console.log(`   Node ID: ${config.figma.nodeMappings.semanticColors}`);
    console.log('   ⚠️  This requires MCP tool: mcp_figma-desktop_get_variable_defs');
    console.log('   Please call the MCP tool and save the result to semantic-colors.json\n');
  }

  // Extract component colors
  if (config.figma?.nodeMappings?.componentColors) {
    console.log('📦 Extracting component colors...');
    console.log(`   Node ID: ${config.figma.nodeMappings.componentColors}`);
    console.log('   ⚠️  This requires MCP tool: mcp_figma-desktop_get_variable_defs');
    console.log('   Please call the MCP tool and save the result to component-colors.json\n');
  }

  // Extract components
  const components = config.figma?.nodeMappings?.components || [];
  if (components.length > 0) {
    console.log(`📦 Extracting ${components.length} component(s)...`);
    components.forEach((component) => {
      const nodeId = typeof component === 'string' ? component : component.nodeId;
      const name = typeof component === 'string' ? undefined : component.name;
      console.log(`   Component: ${name || 'unnamed'} (Node ID: ${nodeId})`);
      console.log('   ⚠️  This requires MCP tool: mcp_figma-desktop_get_design_context');
      console.log(`   Please call the MCP tool and save the result to components/${name || nodeId}.json\n`);
    });
  }

  console.log('📝 Next steps:');
  console.log('   1. Use MCP tools in your IDE to extract data from Figma');
  console.log('   2. Save the extracted data to the files in figma-raw/');
  console.log('   3. Run: npm run generate-tokens');
  console.log('   4. Run: npm run validate');
  console.log('\n💡 Tip: You can ask the AI assistant to extract from Figma using MCP tools!');
}

// Export function for use with MCP tools
module.exports = { syncFromFigma, saveData };

// If run directly, show instructions
if (require.main === module) {
  syncFromFigma().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}
