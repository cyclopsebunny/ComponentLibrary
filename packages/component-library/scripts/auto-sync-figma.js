#!/usr/bin/env node

/**
 * Auto-Sync Script for Figma Design Tokens
 * 
 * This script is designed to be run by the AI assistant using MCP tools.
 * It automatically extracts all design tokens from Figma and saves them
 * to figma-raw/ for code generation.
 * 
 * The AI assistant will:
 * 1. Call MCP tools to extract from Figma
 * 2. Save the results using this script's helper functions
 * 3. Generate tokens automatically
 * 
 * Usage (by AI assistant):
 *   The AI will call MCP tools and use saveExtractedData() to save results
 */

const fs = require('fs');
const path = require('path');

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
 * Save extracted variables data
 */
function saveVariables(data) {
  return saveData(VARIABLES_FILE, data, 'Primitive variables');
}

/**
 * Save extracted semantic colors data
 */
function saveSemanticColors(data) {
  return saveData(SEMANTIC_COLORS_FILE, data, 'Semantic colors');
}

/**
 * Save extracted component colors data
 */
function saveComponentColors(data) {
  return saveData(COMPONENT_COLORS_FILE, data, 'Component colors');
}

/**
 * Save extracted component data
 */
function saveComponent(componentName, data) {
  const filePath = path.join(COMPONENTS_DIR, `${componentName}.json`);
  return saveData(filePath, data, `Component: ${componentName}`);
}

/**
 * Generic save function
 */
function saveData(filePath, data, description) {
  try {
    // Add metadata
    const dataWithMetadata = {
      ...data,
      _metadata: {
        extractedAt: new Date().toISOString(),
        source: 'Figma MCP extraction',
        ...(data._metadata || {})
      }
    };
    
    fs.writeFileSync(filePath, JSON.stringify(dataWithMetadata, null, 2), 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);
    console.log(`✅ ${description} saved to ${relativePath}`);
    return { success: true, path: relativePath };
  } catch (error) {
    console.error(`❌ Error saving ${description}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Get file paths for reference
 */
function getFilePaths() {
  return {
    variables: VARIABLES_FILE,
    semanticColors: SEMANTIC_COLORS_FILE,
    componentColors: COMPONENT_COLORS_FILE,
    componentsDir: COMPONENTS_DIR
  };
}

module.exports = {
  saveVariables,
  saveSemanticColors,
  saveComponentColors,
  saveComponent,
  saveData,
  getFilePaths
};
