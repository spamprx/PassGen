#!/bin/bash

# PassGen Deployment Script
echo "🚀 PassGen Deployment Helper"
echo "=============================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local file not found!"
    echo "📝 Creating .env.local template..."
    
    cat > .env.local << EOF
# MongoDB Connection String
# Get this from MongoDB Atlas dashboard
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/passgen?retryWrites=true&w=majority

# JWT Secret for authentication (minimum 32 characters)
# Generate with: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters

# NextAuth URL (change to your production domain)
NEXTAUTH_URL=http://localhost:3000

# NextAuth Secret (minimum 32 characters)
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your-nextauth-secret-here-minimum-32-characters
EOF
    
    echo "✅ Created .env.local template"
    echo "📋 Please edit .env.local with your actual values before deploying"
    echo ""
fi

# Generate secure secrets
echo "🔐 Generating secure secrets..."
JWT_SECRET=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)

echo "Generated JWT_SECRET: $JWT_SECRET"
echo "Generated NEXTAUTH_SECRET: $NEXTAUTH_SECRET"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: PassGen password manager"
    echo "✅ Git repository initialized"
    echo ""
fi

# Check if code is committed
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Uncommitted changes detected. Committing..."
    git add .
    git commit -m "Ready for deployment"
    echo "✅ Changes committed"
    echo ""
fi

echo "🎯 Deployment Options:"
echo "1. Vercel (Recommended for Next.js)"
echo "2. Railway"
echo "3. Netlify"
echo "4. Heroku"
echo ""

echo "📖 See DEPLOYMENT.md for detailed instructions"
echo "🔗 Quick Vercel deploy: npx vercel"
echo "🔗 Quick Railway deploy: npx @railway/cli"
echo ""

echo "✅ Your PassGen app is ready for deployment!"
