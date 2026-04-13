#!/usr/bin/env node

/**
 * Analyze relationships between primitive and semantic colors
 * 
 * This script compares semantic colors with primitive colors to identify
 * which semantic colors reference which primitives. This helps understand
 * the design system structure.
 * 
 * Usage:
 *   node scripts/analyze-color-relationships.js
 */

const fs = require('fs');
const path = require('path');

const FIGMA_RAW_DIR = path.join(__dirname, 'figma-raw');
const VARIABLES_FILE = path.join(FIGMA_RAW_DIR, 'variables.json');
const SEMANTIC_COLORS_FILE = path.join(FIGMA_RAW_DIR, 'semantic-colors.json');
const RELATIONSHIPS_FILE = path.join(FIGMA_RAW_DIR, 'color-relationships.json');

/**
 * Load color data
 */
function loadColors() {
  const variables = JSON.parse(fs.readFileSync(VARIABLES_FILE, 'utf8'));
  const semanticColors = JSON.parse(fs.readFileSync(SEMANTIC_COLORS_FILE, 'utf8'));
  return { variables, semanticColors };
}

/**
 * Find which primitive color a semantic color references
 */
function findPrimitiveReference(semanticValue, primitives) {
  // Direct match
  for (const [key, value] of Object.entries(primitives)) {
    if (value === semanticValue) {
      return key;
    }
  }
  return null;
}

/**
 * Analyze relationships
 */
function analyzeRelationships() {
  console.log('🔍 Analyzing color relationships...\n');
  
  const { variables, semanticColors } = loadColors();
  
  // Filter to only color values (hex codes)
  const primitives = {};
  Object.entries(variables).forEach(([key, value]) => {
    if (typeof value === 'string' && /^#[0-9a-fA-F]{6}$/.test(value)) {
      primitives[key] = value;
    }
  });
  
  const relationships = {
    mapped: [],      // Semantic colors that reference primitives
    independent: [], // Semantic colors that don't match any primitive
    primitives: Object.keys(primitives).length,
    semantic: Object.keys(semanticColors).length,
  };
  
  console.log(`📦 Found ${relationships.primitives} primitive color(s)`);
  console.log(`📦 Found ${relationships.semantic} semantic color(s)\n`);
  
  // Analyze each semantic color
  Object.entries(semanticColors).forEach(([semanticKey, semanticValue]) => {
    if (typeof semanticValue === 'string' && /^#[0-9a-fA-F]{6}$/.test(semanticValue)) {
      const primitiveKey = findPrimitiveReference(semanticValue, primitives);
      
      if (primitiveKey) {
        relationships.mapped.push({
          semantic: semanticKey,
          primitive: primitiveKey,
          value: semanticValue,
        });
      } else {
        relationships.independent.push({
          semantic: semanticKey,
          value: semanticValue,
        });
      }
    }
  });
  
  console.log(`✅ Found ${relationships.mapped.length} semantic color(s) that reference primitives`);
  console.log(`⚠️  Found ${relationships.independent.length} independent semantic color(s)\n`);
  
  // Save relationships
  fs.writeFileSync(
    RELATIONSHIPS_FILE,
    JSON.stringify(relationships, null, 2),
    'utf8'
  );
  
  console.log(`💾 Saved relationships to ${RELATIONSHIPS_FILE}\n`);
  
  // Show some examples
  if (relationships.mapped.length > 0) {
    console.log('📋 Example mappings:');
    relationships.mapped.slice(0, 5).forEach(({ semantic, primitive, value }) => {
      console.log(`   ${semantic}`);
      console.log(`   → ${primitive}`);
      console.log(`   = ${value}\n`);
    });
  }
  
  if (relationships.independent.length > 0) {
    console.log('📋 Independent semantic colors (no primitive match):');
    relationships.independent.slice(0, 5).forEach(({ semantic, value }) => {
      console.log(`   ${semantic} = ${value}`);
    });
    if (relationships.independent.length > 5) {
      console.log(`   ... and ${relationships.independent.length - 5} more`);
    }
  }
  
  return relationships;
}

// Run analysis
try {
  analyzeRelationships();
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
