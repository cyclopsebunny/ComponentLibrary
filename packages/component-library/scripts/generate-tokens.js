#!/usr/bin/env node

/**
 * Generate TypeScript and CSS token files from extracted Figma data
 * 
 * This script reads raw JSON from figma-raw/ and generates:
 * - TypeScript token files in src/tokens/
 * - CSS variables in src/styles/index.css
 * 
 * CRITICAL: This script only processes data that was previously extracted
 * from Figma. Never generates tokens without raw Figma data.
 * 
 * Usage:
 *   node scripts/generate-tokens.js
 */

const fs = require('fs');
const path = require('path');

const FIGMA_RAW_DIR = path.join(__dirname, 'figma-raw');
const VARIABLES_FILE = path.join(FIGMA_RAW_DIR, 'variables.json');
const SEMANTIC_COLORS_FILE = path.join(FIGMA_RAW_DIR, 'semantic-colors.json');
const COMPONENT_COLORS_FILE = path.join(FIGMA_RAW_DIR, 'component-colors.json');
const SRC_TOKENS_DIR = path.join(__dirname, '../src/tokens');
const SRC_STYLES_DIR = path.join(__dirname, '../src/styles');

/**
 * Load raw variables from Figma extraction
 */
function loadRawVariables() {
  if (!fs.existsSync(VARIABLES_FILE)) {
    throw new Error('variables.json not found. Please extract variables from Figma first using sync-figma.js');
  }
  
  const content = fs.readFileSync(VARIABLES_FILE, 'utf8');
  const variables = JSON.parse(content);
  
  if (Object.keys(variables).length === 0) {
    throw new Error('variables.json is empty. Please extract variables from Figma first.');
  }
  
  return variables;
}

/**
 * Load semantic colors from Figma extraction (optional)
 */
function loadSemanticColors() {
  if (!fs.existsSync(SEMANTIC_COLORS_FILE)) {
    return {};
  }
  
  const content = fs.readFileSync(SEMANTIC_COLORS_FILE, 'utf8');
  const semanticColors = JSON.parse(content);
  
  return semanticColors;
}

/**
 * Load component colors from Figma extraction (optional)
 */
function loadComponentColors() {
  if (!fs.existsSync(COMPONENT_COLORS_FILE)) {
    return {};
  }
  
  const content = fs.readFileSync(COMPONENT_COLORS_FILE, 'utf8');
  const componentColors = JSON.parse(content);
  
  return componentColors;
}

/**
 * Check if a value is a hex color
 */
function isHexColor(value) {
  if (typeof value !== 'string') return false;
  return /^#[0-9a-fA-F]{6}$/.test(value);
}

/**
 * Categorize variables by type
 */
function categorizeVariables(variables) {
  const colors = {};
  const spacing = {};
  const typography = {};
  const shadows = {};
  const borders = {};
  const other = {};
  
  Object.entries(variables).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();
    const stringValue = String(value);
    
    // Colors: hex values, or keys containing color-related terms, or light/dark color variables
    if (isHexColor(stringValue) || 
        lowerKey.includes('color') || lowerKey.includes('colour') || 
        lowerKey.startsWith('color/') || lowerKey.startsWith('colour/') ||
        lowerKey.startsWith('light/') || lowerKey.startsWith('dark/') ||
        lowerKey.includes('/primary') || lowerKey.includes('/secondary') ||
        lowerKey.includes('/tertiary') || lowerKey.includes('/red') ||
        lowerKey.includes('/green') || lowerKey.includes('/blue') ||
        lowerKey.includes('/slate') || lowerKey.includes('/neutral') ||
        lowerKey.includes('/success') || lowerKey.includes('/warning') ||
        lowerKey.includes('/danger') || lowerKey.includes('/sunrise') ||
        lowerKey.includes('/dayglow') || lowerKey.includes('/midgreen')) {
      colors[key] = value;
    } 
    // Spacing
    else if (lowerKey.includes('spacing') || lowerKey.includes('space') ||
               lowerKey.includes('gap') || lowerKey.includes('padding') ||
               lowerKey.includes('margin') || lowerKey.startsWith('spacing/')) {
      spacing[key] = value;
    } 
    // Typography
    else if (lowerKey.includes('font') || lowerKey.includes('typography') ||
               lowerKey.includes('text') || lowerKey.startsWith('typography/') ||
               lowerKey.includes('font size') || lowerKey.includes('font weight') ||
               lowerKey.includes('font family') || lowerKey.includes('line height') ||
               lowerKey.includes('paragraph spacing') || lowerKey.includes('header/') ||
               lowerKey.includes('body/')) {
      typography[key] = value;
    } 
    // Shadows
    else if (lowerKey.includes('shadow') || lowerKey.includes('elevation') ||
               lowerKey.startsWith('shadow/')) {
      shadows[key] = value;
    }
    // Borders
    else if (lowerKey.includes('border') || lowerKey.includes('corner radius') ||
               lowerKey.includes('radius')) {
      borders[key] = value;
    } 
    // Other
    else {
      other[key] = value;
    }
  });
  
  return { colors, spacing, typography, shadows, borders, other };
}

/**
 * Generate TypeScript token file
 */
function generateTokenFile(category, tokens, fileName, sourceFile = 'variables.json') {
  const filePath = path.join(SRC_TOKENS_DIR, fileName);
  
  let content = `// ${category} tokens from Figma\n`;
  content += `// This file is generated from Figma variables\n`;
  content += `// Source: Figma variables extracted from figma-raw/${sourceFile}\n`;
  content += `// Generated at: ${new Date().toISOString()}\n\n`;
  
  if (Object.keys(tokens).length === 0) {
    content += `export const ${category.toLowerCase()} = {\n`;
    content += `  // No ${category} tokens found in Figma extraction\n`;
    content += `} as const;\n\n`;
    content += `export type ${category.charAt(0).toUpperCase() + category.slice(1)} = typeof ${category.toLowerCase()};\n`;
  } else {
    content += `export const ${category.toLowerCase()} = {\n`;
    
    Object.entries(tokens).forEach(([key, value]) => {
      // Convert key to camelCase for TypeScript
      const camelKey = key.split('/').map((part, i) => 
        i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      ).join('').replace(/[^a-zA-Z0-9]/g, '');
      
      // Add source annotation as comment
      content += `  // Source: Figma variable '${key}'\n`;
      content += `  ${camelKey}: '${value}',\n`;
    });
    
    content += `} as const;\n\n`;
    content += `export type ${category.charAt(0).toUpperCase() + category.slice(1)} = typeof ${category.toLowerCase()};\n`;
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Generated ${fileName}`);
}

/**
 * Generate CSS variables file
 */
function generateCSSVariables(variables) {
  const filePath = path.join(SRC_STYLES_DIR, 'index.css');
  
  let content = `/* CSS variables from Figma design tokens */\n`;
  content += `/* This file is generated from Figma variables */\n`;
  content += `/* Source: Figma variables extracted from figma-raw/variables.json */\n`;
  content += `/* Generated at: ${new Date().toISOString()} */\n\n`;
  content += `:root {\n`;
  
  Object.entries(variables).forEach(([key, value]) => {
    // Convert key to CSS custom property format
    const cssKey = `--${key.replace(/\//g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '-')}`;
    content += `  ${cssKey}: ${value};\n`;
  });
  
  content += `}\n`;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Generated CSS variables in index.css`);
}

/**
 * Main generation function
 */
function generateTokens() {
  console.log('🚀 Generating tokens from Figma extraction...\n');
  
  try {
    // Load raw variables
    const variables = loadRawVariables();
    console.log(`📦 Loaded ${Object.keys(variables).length} variable(s) from Figma`);
    
    // Load semantic colors (optional)
    const semanticColors = loadSemanticColors();
    if (Object.keys(semanticColors).length > 0) {
      console.log(`📦 Loaded ${Object.keys(semanticColors).length} semantic color token(s) from Figma`);
    }
    
    // Load component colors (optional)
    const componentColors = loadComponentColors();
    if (Object.keys(componentColors).length > 0) {
      console.log(`📦 Loaded ${Object.keys(componentColors).length} component color token(s) from Figma`);
    }
    console.log('');
    
    // Categorize variables
    const { colors, spacing, typography, shadows, borders, other } = categorizeVariables(variables);
    
    // Merge borders into colors (corner radius, etc. are often used with colors)
    if (Object.keys(borders).length > 0) {
      Object.assign(colors, borders);
    }
    
    // Generate TypeScript files
    generateTokenFile('colors', colors, 'colors.ts');
    
    // Generate semantic colors file if they exist
    if (Object.keys(semanticColors).length > 0) {
      generateTokenFile('semanticColors', semanticColors, 'semantic-colors.ts', 'semantic-colors.json');
    }
    
    // Generate component colors file if they exist
    if (Object.keys(componentColors).length > 0) {
      generateTokenFile('componentColors', componentColors, 'component-colors.ts', 'component-colors.json');
    }
    
    generateTokenFile('spacing', spacing, 'spacing.ts');
    generateTokenFile('typography', typography, 'typography.ts');
    generateTokenFile('shadows', shadows, 'shadows.ts');
    
    if (Object.keys(other).length > 0) {
      console.log(`⚠️  Found ${Object.keys(other).length} uncategorized variable(s): ${Object.keys(other).slice(0, 10).join(', ')}${Object.keys(other).length > 10 ? '...' : ''}`);
    }
    
    // Generate CSS variables (merge all color types with variables)
    const allVariables = { ...variables, ...semanticColors, ...componentColors };
    generateCSSVariables(allVariables);
    
    console.log('\n✅ Token generation complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Review generated token files in src/tokens/');
    console.log('   2. Run: npm run validate');
    console.log('   3. Build: npm run build');
    
  } catch (error) {
    console.error('❌ Error generating tokens:', error.message);
    console.error('\n💡 Make sure you have:');
    console.error('   1. Extracted variables from Figma using MCP tools');
    console.error('   2. Saved the extraction to figma-raw/variables.json');
    process.exit(1);
  }
}

// Run generation
generateTokens();
