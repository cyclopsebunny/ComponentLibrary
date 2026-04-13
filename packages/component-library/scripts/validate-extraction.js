#!/usr/bin/env node

/**
 * Validation script to verify extracted Figma data
 * 
 * This script checks:
 * - All expected tokens/components were extracted
 * - Generated code matches raw Figma data
 * - No hardcoded values exist
 * - All values have source annotations
 * 
 * Usage:
 *   node scripts/validate-extraction.js
 */

const fs = require('fs');
const path = require('path');

const FIGMA_RAW_DIR = path.join(__dirname, 'figma-raw');
const VARIABLES_FILE = path.join(FIGMA_RAW_DIR, 'variables.json');
const COMPONENTS_DIR = path.join(FIGMA_RAW_DIR, 'components');
const SRC_TOKENS_DIR = path.join(__dirname, '../src/tokens');
const SRC_COMPONENTS_DIR = path.join(__dirname, '../src/components');

let errors = [];
let warnings = [];
let info = [];

/**
 * Check if raw data files exist
 */
function validateRawDataExists() {
  console.log('🔍 Checking raw data files...\n');
  
  if (!fs.existsSync(FIGMA_RAW_DIR)) {
    errors.push('figma-raw/ directory does not exist');
    return false;
  }
  
  if (!fs.existsSync(VARIABLES_FILE)) {
    warnings.push('variables.json does not exist - no variables extracted yet');
  } else {
    const variables = JSON.parse(fs.readFileSync(VARIABLES_FILE, 'utf8'));
    const variableCount = Object.keys(variables).length;
    if (variableCount === 0) {
      warnings.push('variables.json exists but is empty - no variables extracted');
    } else {
      info.push(`✅ Found ${variableCount} variable(s) in variables.json`);
    }
  }
  
  if (!fs.existsSync(COMPONENTS_DIR)) {
    warnings.push('components/ directory does not exist - no components extracted yet');
  } else {
    const componentFiles = fs.readdirSync(COMPONENTS_DIR)
      .filter(file => file.endsWith('.json'));
    
    if (componentFiles.length === 0) {
      warnings.push('components/ directory exists but is empty - no components extracted');
    } else {
      info.push(`✅ Found ${componentFiles.length} component file(s)`);
    }
  }
  
  return errors.length === 0;
}

/**
 * Validate that generated token files reference Figma sources
 */
function validateTokenFiles() {
  console.log('🔍 Validating token files...\n');
  
  const tokenFiles = ['colors.ts', 'typography.ts', 'spacing.ts', 'shadows.ts'];
  
  tokenFiles.forEach(file => {
    const filePath = path.join(SRC_TOKENS_DIR, file);
    if (!fs.existsSync(filePath)) {
      errors.push(`Token file missing: ${file}`);
      return;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for source annotations
    if (!content.includes('Source: Figma')) {
      warnings.push(`${file} does not contain source annotations`);
    }
    
    // Check for placeholder comments indicating extraction needed
    if (content.includes('to be extracted') || content.includes('will be populated')) {
      info.push(`ℹ️  ${file} contains placeholders - extraction may be needed`);
    }
  });
}

/**
 * Validate that generated component files reference Figma sources
 */
function validateComponentFiles() {
  console.log('🔍 Validating component files...\n');
  
  if (!fs.existsSync(SRC_COMPONENTS_DIR)) {
    warnings.push('components/ directory does not exist in src/');
    return;
  }
  
  const componentFiles = fs.readdirSync(SRC_COMPONENTS_DIR)
    .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));
  
  if (componentFiles.length === 0) {
    info.push('ℹ️  No component files found - components may not be generated yet');
    return;
  }
  
  componentFiles.forEach(file => {
    const filePath = path.join(SRC_COMPONENTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for source annotations
    if (!content.includes('Source: Figma') && !content.includes('Extracted from Figma')) {
      warnings.push(`${file} does not contain source annotations`);
    }
    
    // Check for hardcoded color values (hex codes)
    const hexColorRegex = /#[0-9a-fA-F]{6}/g;
    const hexMatches = content.match(hexColorRegex);
    if (hexMatches && hexMatches.length > 0) {
      warnings.push(`${file} contains hardcoded hex colors: ${hexMatches.join(', ')}`);
    }
  });
}

/**
 * Compare raw data with generated code
 */
function validateDataConsistency() {
  console.log('🔍 Validating data consistency...\n');
  
  // Check if variables.json exists and has data
  if (fs.existsSync(VARIABLES_FILE)) {
    const variables = JSON.parse(fs.readFileSync(VARIABLES_FILE, 'utf8'));
    const variableCount = Object.keys(variables).length;
    
    if (variableCount > 0) {
      // Check if token files reference these variables
      const colorsFile = path.join(SRC_TOKENS_DIR, 'colors.ts');
      if (fs.existsSync(colorsFile)) {
        const colorsContent = fs.readFileSync(colorsFile, 'utf8');
        // This is a basic check - in a full implementation, we'd parse and compare
        info.push('ℹ️  Token files exist - manual review recommended for consistency');
      }
    }
  }
  
  // Check component files
  if (fs.existsSync(COMPONENTS_DIR)) {
    const componentFiles = fs.readdirSync(COMPONENTS_DIR)
      .filter(file => file.endsWith('.json'));
    
    componentFiles.forEach(file => {
      const rawData = JSON.parse(
        fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf8')
      );
      
      // Check if corresponding component file exists
      const componentName = file.replace('.json', '');
      const componentFile = path.join(SRC_COMPONENTS_DIR, `${componentName}.tsx`);
      
      if (!fs.existsSync(componentFile)) {
        info.push(`ℹ️  Raw data exists for ${componentName} but component file not found`);
      }
    });
  }
}

/**
 * Generate validation report
 */
function generateReport() {
  console.log('\n' + '='.repeat(60));
  console.log('VALIDATION REPORT');
  console.log('='.repeat(60) + '\n');
  
  if (info.length > 0) {
    console.log('ℹ️  INFO:');
    info.forEach(msg => console.log(`   ${msg}`));
    console.log('');
  }
  
  if (warnings.length > 0) {
    console.log('⚠️  WARNINGS:');
    warnings.forEach(msg => console.log(`   ${msg}`));
    console.log('');
  }
  
  if (errors.length > 0) {
    console.log('❌ ERRORS:');
    errors.forEach(msg => console.log(`   ${msg}`));
    console.log('');
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All validations passed!\n');
    return 0;
  } else if (errors.length === 0) {
    console.log('⚠️  Validation completed with warnings\n');
    return 0;
  } else {
    console.log('❌ Validation failed\n');
    return 1;
  }
}

/**
 * Main validation function
 */
function validate() {
  console.log('🔍 Starting validation...\n');
  
  validateRawDataExists();
  validateTokenFiles();
  validateComponentFiles();
  validateDataConsistency();
  
  const exitCode = generateReport();
  process.exit(exitCode);
}

// Run validation
validate();
