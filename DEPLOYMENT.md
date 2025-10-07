# 🚀 PassGen Deployment Guide

Complete guide for deploying your PassGen password manager application to production.

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ GitHub repository with your code
- ✅ MongoDB Atlas account (free tier available)
- ✅ Vercel account (recommended) or alternative hosting platform
- ✅ Environment variables ready

## 🔧 Environment Variables

Your application requires the following environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT tokens (32+ chars) | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your production domain URL | `https://your-app.vercel.app` |
| `NEXTAUTH_SECRET` | Secret key for NextAuth (32+ chars) | Generate with `openssl rand -base64 32` |

### Generating Secure Secrets

Use these commands to generate strong, random secrets:

```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

## 🗄️ MongoDB Atlas Setup

### 1. Create MongoDB Cluster

1. Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Sandbox - Free tier)
4. Wait for cluster to be provisioned

### 2. Configure Database Access

1. Go to **Database Access** in the sidebar
2. Click **Add New Database User**
3. Create a username and strong password
4. Set user privileges to **Read and write to any database**
5. Click **Add User**

### 3. Configure Network Access

1. Go to **Network Access** in the sidebar
2. Click **Add IP Address**
3. For production: Add `0.0.0.0/0` (allow from anywhere)
4. Or add specific IP addresses for better security
5. Click **Confirm**

### 4. Get Connection String

1. Go to **Clusters** and click **Connect**
2. Choose **Connect your application**
3. Copy the connection string
4. Replace `<password>` with your database user's password
5. Replace `<dbname>` with `passgen` or your preferred database name

## 🌐 Deployment Options

### Option 1: Vercel (Recommended) ⭐

Vercel is the easiest and most optimized platform for Next.js applications.

#### Steps:

1. **Push Code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click **New Project**
   - Import your `PassGen` repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   - In project settings, go to **Environment Variables**
   - Add each variable:
     - Name: `MONGODB_URI`, Value: Your MongoDB connection string
     - Name: `JWT_SECRET`, Value: Your generated secret
     - Name: `NEXTAUTH_URL`, Value: Your Vercel domain
     - Name: `NEXTAUTH_SECRET`, Value: Your generated secret
   - Select environments: **Production**, **Preview**, **Development**

4. **Deploy**
   - Click **Deploy**
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

5. **Update NEXTAUTH_URL**
   - After first deployment, copy your Vercel URL
   - Update `NEXTAUTH_URL` environment variable
   - Redeploy if necessary

#### Vercel CLI Deployment

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

### Option 2: Railway 🚂

Railway offers excellent MongoDB integration and simple deployment.

#### Steps:

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Deploy**
   ```bash
   railway init
   railway up
   ```

3. **Add Environment Variables**
   - In Railway dashboard, go to your project
   - Navigate to **Variables** tab
   - Add all required environment variables

### Option 3: Netlify 🌐

Netlify requires some configuration for Next.js API routes.

#### Steps:

1. **Connect Repository**
   - Visit [netlify.com](https://netlify.com)
   - Import your GitHub repository

2. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Set Environment Variables**
   - Go to **Site settings** → **Environment variables**
   - Add all required variables

## 🔒 Security Best Practices

### Production Checklist

- ✅ Use strong, randomly generated secrets (32+ characters)
- ✅ Never commit `.env.local` to version control
- ✅ Enable MongoDB Atlas IP whitelist
- ✅ Use HTTPS in production (automatic with Vercel)
- ✅ Regularly rotate JWT secrets
- ✅ Monitor database access logs
- ✅ Set up MongoDB Atlas encryption at rest
- ✅ Enable two-factor authentication on hosting accounts

### Security Recommendations

1. **Environment Variables**
   - Generate new secrets for production
   - Don't reuse development secrets
   - Store backup of secrets securely

2. **Database Security**
   - Use strong database passwords
   - Limit IP whitelist when possible
   - Enable MongoDB Atlas backup
   - Monitor for unusual activity

3. **Application Security**
   - Keep dependencies updated
   - Review security advisories
   - Implement rate limiting
   - Add logging and monitoring

## 🔍 Troubleshooting

### Common Issues

**Build Failures**
- Verify all environment variables are set
- Check Node.js version compatibility
- Review build logs for specific errors

**Database Connection Issues**
- Verify MongoDB URI format is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions
- Test connection string locally first

**Authentication Problems**
- Verify `JWT_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Ensure `NEXTAUTH_SECRET` is configured
- Clear browser cache and cookies

**Deployment Errors**
- Review hosting platform logs
- Check environment variables are saved
- Verify build command is correct
- Ensure all dependencies are in package.json

## 📊 Post-Deployment

### Monitoring

1. **Vercel Analytics** - Built-in performance monitoring
2. **MongoDB Atlas Monitoring** - Database performance metrics
3. **Error Tracking** - Consider Sentry or similar service
4. **Uptime Monitoring** - Use UptimeRobot or similar

### Maintenance

- 📦 Update dependencies monthly
- 🗄️ Monitor database storage usage
- 🔐 Review security logs regularly
- 💾 Backup database periodically
- 📈 Track application performance

## 🎯 Quick Deploy Checklist

1. ✅ Set up MongoDB Atlas cluster
2. ✅ Create database user
3. ✅ Configure network access
4. ✅ Get connection string
5. ✅ Generate secure secrets
6. ✅ Push code to GitHub
7. ✅ Import to Vercel
8. ✅ Add environment variables
9. ✅ Deploy application
10. ✅ Update NEXTAUTH_URL
11. ✅ Test authentication
12. ✅ Test vault operations

## 📞 Support

If you encounter issues:
1. Check this deployment guide
2. Review hosting platform documentation
3. Check MongoDB Atlas logs
4. Review application logs in hosting dashboard
5. Verify all environment variables are set correctly

---

**🎉 Congratulations on deploying your PassGen application!**

For more information, visit the [main README](./README.md).
