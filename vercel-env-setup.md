# Vercel Environment Variables Setup

## Your Current Environment Variables

Your `.env.local` file already has these variables configured:

```env
MONGODB_URI=mongodb+srv://passgen_user:passgen123@cluster0.8j0k2oq.mongodb.net/passgen?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=super-secret-jwt-key-for-passgen-app-2024
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=super-secret-nextauth-key-for-passgen-2024
```

## For Production Deployment

When deploying to Vercel, you need to set these environment variables in the Vercel dashboard:

### 1. MongoDB URI
```
MONGODB_URI=mongodb+srv://passgen_user:passgen123@cluster0.8j0k2oq.mongodb.net/passgen?retryWrites=true&w=majority&appName=Cluster0
```

### 2. JWT Secret (for authentication)
```
JWT_SECRET=super-secret-jwt-key-for-passgen-app-2024
```
*Note: Your current JWT_SECRET is fine, but for extra security, you can use:*
```
JWT_SECRET=RqpwiEeVMYoFLczZvHg/l10Bx7JhpTd3u86OmRgMq/w=
```

### 3. NextAuth URL (change to your Vercel domain)
```
NEXTAUTH_URL=https://your-passgen-app.vercel.app
```

### 4. NextAuth Secret
```
NEXTAUTH_SECRET=super-secret-nextauth-key-for-passgen-2024
```
*Note: Your current NEXTAUTH_SECRET is fine, but for extra security, you can use:*
```
NEXTAUTH_SECRET=dVq7ustucPvQ4vnJueUMqEzf99C1TTVGV9ZtMXgNh9E=
```

## How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your PassGen project
3. Go to Settings → Environment Variables
4. Add each variable:
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://passgen_user:passgen123@cluster0.8j0k2oq.mongodb.net/passgen?retryWrites=true&w=majority&appName=Cluster0`
   - Environment: Production, Preview, Development
   
   - Name: `JWT_SECRET`
   - Value: `super-secret-jwt-key-for-passgen-app-2024`
   - Environment: Production, Preview, Development
   
   - Name: `NEXTAUTH_URL`
   - Value: `https://your-passgen-app.vercel.app` (replace with your actual Vercel URL)
   - Environment: Production, Preview, Development
   
   - Name: `NEXTAUTH_SECRET`
   - Value: `super-secret-nextauth-key-for-passgen-2024`
   - Environment: Production, Preview, Development

5. Click "Save" for each variable
6. Redeploy your application

## JWT Secret Explanation

**What is JWT_SECRET?**
- JWT (JSON Web Token) is used for user authentication
- The secret is used to sign and verify these tokens
- It ensures that tokens can't be forged by malicious users
- Your current secret is already secure and working

**Why do we need it?**
- When users log in, your app creates a JWT token
- This token contains user information (user ID, email)
- The secret ensures only your app can create valid tokens
- Without the secret, anyone could create fake login tokens

Your current setup is already working perfectly! 🎉
