# 🚀 PassGen Deployment Guide

This guide covers multiple deployment options for your PassGen password manager application.

## 📋 Prerequisites

Before deploying, ensure you have:
- [ ] MongoDB Atlas account (free tier available)
- [ ] GitHub repository with your code
- [ ] Environment variables ready
- [ ] Domain name (optional, but recommended)

## 🔧 Environment Variables Setup

### Required Environment Variables

Create a `.env.local` file for development or set these in your hosting platform:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/passgen?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters

# Next.js Configuration
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-nextauth-secret-here-minimum-32-characters
```

### Generating Secure Secrets

```bash
# Generate JWT Secret (32+ characters)
openssl rand -base64 32

# Generate NextAuth Secret (32+ characters)
openssl rand -base64 32
```

## 🌐 Deployment Options

### Option 1: Vercel (Recommended) ⭐

Vercel is the easiest and most optimized platform for Next.js applications.

#### Steps:

1. **Prepare Your Repository**
   ```bash
   # Ensure your code is pushed to GitHub
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure Environment Variables**
   - In Vercel dashboard, go to your project
   - Navigate to Settings → Environment Variables
   - Add all required environment variables:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `NEXTAUTH_URL` (set to your Vercel domain)
     - `NEXTAUTH_SECRET`

4. **Deploy**
   - Click "Deploy" button
   - Vercel will build and deploy automatically
   - Your app will be available at `https://your-project.vercel.app`

#### Vercel Configuration File (Optional)

Create `vercel.json` in your project root:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### Option 2: Railway 🚂

Railway offers excellent MongoDB integration and simple deployment.

#### Steps:

1. **Prepare for Railway**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   ```

2. **Deploy to Railway**
   ```bash
   # Initialize Railway project
   railway init
   
   # Deploy
   railway up
   ```

3. **Configure Environment Variables**
   - In Railway dashboard, go to your project
   - Navigate to Variables tab
   - Add all required environment variables

4. **Add MongoDB Service**
   - In Railway dashboard, click "New"
   - Select "Database" → "MongoDB"
   - Railway will provide the connection string automatically

### Option 3: Netlify 🌐

Netlify is great for static sites, but requires some configuration for Next.js.

#### Steps:

1. **Configure Next.js for Static Export**
   
   Update `next.config.ts`:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   };

   export default nextConfig;
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `out`

3. **Configure Environment Variables**
   - In Netlify dashboard, go to Site settings
   - Navigate to Environment variables
   - Add all required variables

### Option 4: Heroku 🟣

Heroku is a traditional PaaS with good Next.js support.

#### Steps:

1. **Install Heroku CLI**
   ```bash
   # Install Heroku CLI (Linux)
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Prepare for Heroku**
   ```bash
   # Login to Heroku
   heroku login
   
   # Create Heroku app
   heroku create your-passgen-app
   ```

3. **Configure for Heroku**
   
   Create `Procfile` in project root:
   ```
   web: npm start
   ```

   Update `package.json` scripts:
   ```json
   {
     "scripts": {
       "dev": "next dev",
       "build": "next build",
       "start": "next start -p $PORT",
       "lint": "eslint"
     }
   }
   ```

4. **Deploy to Heroku**
   ```bash
   # Add Heroku remote
   git remote add heroku https://git.heroku.com/your-passgen-app.git
   
   # Deploy
   git push heroku main
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-uri"
   heroku config:set JWT_SECRET="your-jwt-secret"
   heroku config:set NEXTAUTH_URL="https://your-app.herokuapp.com"
   heroku config:set NEXTAUTH_SECRET="your-nextauth-secret"
   ```

## 🗄️ MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account
- Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
- Sign up for free account
- Create a new cluster (M0 Sandbox is free)

### 2. Configure Database Access
- Go to Database Access
- Add new database user
- Create username and password
- Set privileges to "Read and write to any database"

### 3. Configure Network Access
- Go to Network Access
- Add IP Address
- For development: Add your current IP
- For production: Add `0.0.0.0/0` (allow all IPs)

### 4. Get Connection String
- Go to Clusters
- Click "Connect"
- Choose "Connect your application"
- Copy the connection string
- Replace `<password>` with your database user password

## 🔒 Security Checklist

### Before Deployment:
- [ ] Use strong, unique secrets (32+ characters)
- [ ] Enable MongoDB Atlas IP whitelist
- [ ] Use HTTPS in production
- [ ] Set secure cookie options
- [ ] Enable MongoDB Atlas encryption at rest
- [ ] Regular security updates

### Production Environment Variables:
```env
# Production MongoDB (use your actual cluster)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/passgen?retryWrites=true&w=majority

# Strong production secrets
JWT_SECRET=your-super-secure-jwt-secret-32-chars-minimum
NEXTAUTH_SECRET=your-super-secure-nextauth-secret-32-chars-minimum

# Production URL
NEXTAUTH_URL=https://your-domain.com
```

## 🚀 Quick Deploy Commands

### Vercel (Fastest)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
```

### Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
railway login
railway init
railway up
```

## 🔧 Troubleshooting

### Common Issues:

1. **Build Failures**
   - Check Node.js version compatibility
   - Ensure all dependencies are in `package.json`
   - Check for TypeScript errors

2. **Database Connection Issues**
   - Verify MongoDB URI format
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

3. **Environment Variables Not Loading**
   - Double-check variable names (case-sensitive)
   - Restart the application after adding variables
   - Check hosting platform documentation

4. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Ensure NEXTAUTH_SECRET is configured

## 📊 Monitoring & Maintenance

### Recommended Tools:
- **Vercel Analytics**: Built-in performance monitoring
- **MongoDB Atlas Monitoring**: Database performance
- **Sentry**: Error tracking and monitoring
- **Uptime Robot**: Website availability monitoring

### Regular Maintenance:
- [ ] Update dependencies monthly
- [ ] Monitor database usage
- [ ] Check security logs
- [ ] Backup database regularly
- [ ] Review access logs

## 🎯 Recommended Deployment Flow

1. **Start with Vercel** (easiest for Next.js)
2. **Set up MongoDB Atlas** (free tier)
3. **Configure environment variables**
4. **Test thoroughly in production**
5. **Set up monitoring**
6. **Configure custom domain** (optional)

## 📞 Support

If you encounter issues:
1. Check the hosting platform documentation
2. Review MongoDB Atlas logs
3. Check application logs in hosting dashboard
4. Verify all environment variables are set correctly

---

**Happy Deploying! 🚀**

Your PassGen application is ready to secure passwords for users worldwide!
