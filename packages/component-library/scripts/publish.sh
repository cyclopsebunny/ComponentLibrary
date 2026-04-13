#!/bin/bash

# Publishing script for component library
# This script handles versioning and publishing to private npm registry

set -e

echo "🚀 Publishing component library..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Run this script from the package directory."
  exit 1
fi

# Check if dist exists
if [ ! -d "dist" ]; then
  echo "📦 Building library..."
  npm run build
fi

# Validate extraction
echo "🔍 Validating extraction..."
npm run validate

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📌 Current version: $CURRENT_VERSION"

# Ask for version bump type
echo ""
echo "Select version bump type:"
echo "1) patch (0.1.0 -> 0.1.1)"
echo "2) minor (0.1.0 -> 0.2.0)"
echo "3) major (0.1.0 -> 1.0.0)"
read -p "Enter choice [1-3]: " choice

case $choice in
  1) BUMP="patch" ;;
  2) BUMP="minor" ;;
  3) BUMP="major" ;;
  *) echo "Invalid choice"; exit 1 ;;
esac

# Bump version
echo "📝 Bumping version ($BUMP)..."
npm version $BUMP --no-git-tag-version

NEW_VERSION=$(node -p "require('./package.json').version")
echo "✅ New version: $NEW_VERSION"

# Build
echo "📦 Building..."
npm run build

# Publish
echo "📤 Publishing to registry..."
npm publish --access restricted

echo "✅ Published version $NEW_VERSION successfully!"
