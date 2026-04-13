#!/usr/bin/env node

/**
 * Generate React components from extracted Figma component data
 * 
 * This script reads raw JSON from figma-raw/components/ and generates:
 * - React component files in src/components/
 * - TypeScript interfaces for props
 * - Style mappings from Figma
 * 
 * CRITICAL: This script only processes data that was previously extracted
 * from Figma. Never generates components without raw Figma data.
 * 
 * Usage:
 *   node scripts/generate-components.js [--component <name>]
 */

const fs = require('fs');
const path = require('path');

const FIGMA_RAW_DIR = path.join(__dirname, 'figma-raw');
const COMPONENTS_DIR = path.join(FIGMA_RAW_DIR, 'components');
const SRC_COMPONENTS_DIR = path.join(__dirname, '../src/components');
const SRC_TOKENS_DIR = path.join(__dirname, '../src/tokens');

/**
 * Load raw component data from Figma extraction
 */
function loadRawComponent(componentName) {
  const componentFile = path.join(COMPONENTS_DIR, `${componentName}.json`);
  
  if (!fs.existsSync(componentFile)) {
    throw new Error(`Component file not found: ${componentName}.json. Please extract component from Figma first.`);
  }
  
  const content = fs.readFileSync(componentFile, 'utf8');
  const componentData = JSON.parse(content);
  
  return componentData;
}

/**
 * Get all component files
 */
function getAllComponentFiles() {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    return [];
  }
  
  return fs.readdirSync(COMPONENTS_DIR)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

/**
 * Extract style properties from Figma component data
 * 
 * This function processes the design context from Figma and extracts
 * all visual properties including colors, spacing, typography, etc.
 */
function extractStyleProperties(componentData) {
  // This is a template - actual implementation will depend on
  // the structure of data returned by get_design_context
  
  const styles = {
    // Colors will be extracted from fills/strokes
    colors: {},
    // Spacing from padding, margins, gaps
    spacing: {},
    // Typography from text properties
    typography: {},
    // Borders from stroke properties
    borders: {},
    // Shadows from effects
    shadows: {},
    // Dimensions
    dimensions: {},
  };
  
  // Process the actual Figma data structure
  // The exact structure depends on what get_design_context returns
  if (componentData.styles) {
    // Process styles from Figma
    if (componentData.styles.fills) {
      componentData.styles.fills.forEach((fill, index) => {
        if (fill.type === 'SOLID') {
          const color = `rgba(${fill.color.r * 255}, ${fill.color.g * 255}, ${fill.color.b * 255}, ${fill.opacity || 1})`;
          styles.colors[`fill${index}`] = color;
        }
      });
    }
  }
  
  return styles;
}

/**
 * Generate React component from Figma data
 */
function generateComponent(componentName, componentData) {
  const componentFile = path.join(SRC_COMPONENTS_DIR, `${componentName}.tsx`);
  
  // Extract style properties
  const styles = extractStyleProperties(componentData);
  
  // Extract node ID for source annotation
  const nodeId = componentData.nodeId || 'unknown';
  
  let content = `// ${componentName} component from Figma\n`;
  content += `// This file is generated from Figma component data\n`;
  content += `// Source: Extracted from Figma node ${nodeId}\n`;
  content += `// Generated at: ${new Date().toISOString()}\n\n`;
  
  content += `import React from 'react';\n`;
  content += `import * as tokens from '../tokens';\n\n`;
  
  // Generate TypeScript interface for props
  content += `export interface ${componentName}Props {\n`;
  
  // Extract component properties from Figma
  if (componentData.properties) {
    Object.entries(componentData.properties).forEach(([key, value]) => {
      const propType = typeof value === 'string' ? 'string' : 
                      typeof value === 'number' ? 'number' :
                      typeof value === 'boolean' ? 'boolean' : 'any';
      content += `  ${key}?: ${propType};\n`;
    });
  }
  
  // Add common props
  content += `  className?: string;\n`;
  content += `  children?: React.ReactNode;\n`;
  content += `}\n\n`;
  
  // Generate component
  content += `export const ${componentName}: React.FC<${componentName}Props> = ({\n`;
  
  if (componentData.properties) {
    Object.keys(componentData.properties).forEach(key => {
      content += `  ${key},\n`;
    });
  }
  
  content += `  className = '',\n`;
  content += `  children,\n`;
  content += `  ...props\n`;
  content += `}) => {\n`;
  content += `  // Styles extracted from Figma\n`;
  content += `  const componentStyles: React.CSSProperties = {\n`;
  
  // Add extracted styles
  if (Object.keys(styles.colors).length > 0) {
    const firstColor = Object.values(styles.colors)[0];
    content += `    // Source: Figma fill color\n`;
    content += `    backgroundColor: '${firstColor}',\n`;
  }
  
  // Add dimensions if available
  if (componentData.width) {
    content += `    // Source: Figma component width\n`;
    content += `    width: ${componentData.width},\n`;
  }
  if (componentData.height) {
    content += `    // Source: Figma component height\n`;
    content += `    height: ${componentData.height},\n`;
  }
  
  content += `  };\n\n`;
  
  content += `  return (\n`;
  content += `    <div\n`;
  content += `      className={\`${componentName.toLowerCase()} \${className}\`}\n`;
  content += `      style={componentStyles}\n`;
  content += `      {...props}\n`;
  content += `    >\n`;
  content += `      {children}\n`;
  content += `    </div>\n`;
  content += `  );\n`;
  content += `};\n\n`;
  
  content += `export default ${componentName};\n`;
  
  fs.writeFileSync(componentFile, content, 'utf8');
  console.log(`✅ Generated ${componentName}.tsx`);
}

/**
 * Main generation function
 */
function generateComponents(componentName) {
  console.log('🚀 Generating components from Figma extraction...\n');
  
  try {
    let componentsToGenerate = [];
    
    if (componentName) {
      componentsToGenerate = [componentName];
    } else {
      componentsToGenerate = getAllComponentFiles();
    }
    
    if (componentsToGenerate.length === 0) {
      console.log('ℹ️  No component files found in figma-raw/components/');
      console.log('💡 Extract components from Figma first using MCP tools');
      return;
    }
    
    console.log(`📦 Found ${componentsToGenerate.length} component(s) to generate\n`);
    
    componentsToGenerate.forEach(name => {
      try {
        const componentData = loadRawComponent(name);
        generateComponent(name, componentData);
      } catch (error) {
        console.error(`❌ Error generating ${name}:`, error.message);
      }
    });
    
    // Update components index
    updateComponentsIndex(componentsToGenerate);
    
    console.log('\n✅ Component generation complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Review generated component files in src/components/');
    console.log('   2. Run: npm run validate');
    console.log('   3. Build: npm run build');
    
  } catch (error) {
    console.error('❌ Error generating components:', error.message);
    process.exit(1);
  }
}

/**
 * Update components index file
 */
function updateComponentsIndex(componentNames) {
  const indexFile = path.join(SRC_COMPONENTS_DIR, 'index.ts');
  
  let content = `// Component exports\n`;
  content += `// This file is generated automatically\n\n`;
  
  componentNames.forEach(name => {
    content += `export { ${name}, type ${name}Props } from './${name}';\n`;
  });
  
  fs.writeFileSync(indexFile, content, 'utf8');
  console.log(`✅ Updated components/index.ts`);
}

// Parse command line arguments
const args = process.argv.slice(2);
let componentName = null;

if (args.includes('--component')) {
  const index = args.indexOf('--component');
  componentName = args[index + 1];
}

// Run generation
generateComponents(componentName);
