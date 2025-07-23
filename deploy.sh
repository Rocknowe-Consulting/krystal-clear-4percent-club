#!/bin/bash

# The 4% Club - Vercel Deployment Script
# This script helps deploy the landing page to Vercel

echo "🚀 The 4% Club - Vercel Deployment"
echo "=================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found. Please run this script from the project root."
    exit 1
fi

echo "✅ Project structure verified"

# Check if vercel.json exists
if [ -f "vercel.json" ]; then
    echo "✅ Found vercel.json configuration"
else
    echo "⚠️  No vercel.json found. Vercel will auto-detect the structure."
fi

# Test API endpoint locally if possible
if [ -f "api/subscribe.js" ]; then
    echo "✅ Found API endpoint: api/subscribe.js"
fi

if [ -f "api/test.js" ]; then
    echo "✅ Found test API endpoint: api/test.js"
fi

echo ""
echo "📋 Deployment Options:"
echo "1. Deploy to preview (recommended first)"
echo "2. Deploy to production"
echo "3. Deploy with simplified config (if 404 errors occur)"
echo "4. Deploy without custom config (auto-detect)"

read -p "Choose option (1-4): " choice

case $choice in
    1)
        echo "🚀 Deploying to preview..."
        vercel
        ;;
    2)
        echo "🚀 Deploying to production..."
        vercel --prod
        ;;
    3)
        echo "🔄 Using simplified configuration..."
        if [ -f "vercel-simple.json" ]; then
            mv vercel.json vercel.json.backup 2>/dev/null
            mv vercel-simple.json vercel.json
            echo "✅ Using simplified config"
            vercel --prod
            mv vercel.json vercel-simple.json
            mv vercel.json.backup vercel.json 2>/dev/null
        else
            echo "❌ vercel-simple.json not found"
        fi
        ;;
    4)
        echo "🔄 Deploying without custom config..."
        if [ -f "vercel.json" ]; then
            mv vercel.json vercel.json.backup
            echo "✅ Temporarily removed vercel.json"
        fi
        vercel --prod
        if [ -f "vercel.json.backup" ]; then
            mv vercel.json.backup vercel.json
            echo "✅ Restored vercel.json"
        fi
        ;;
    *)
        echo "❌ Invalid option"
        exit 1
        ;;
esac

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Test the form submission"
echo "2. Check API endpoint: https://your-domain.vercel.app/api/test"
echo "3. Configure email service integration"
echo "4. Add your images to the assets/ directory"
echo ""
echo "🔧 If you encounter issues:"
echo "- Check the deployment logs above"
echo "- Test the API endpoint"
echo "- Review the troubleshooting section in DEPLOYMENT.md" 