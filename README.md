# Password Vault - Secure Password Manager

A modern, secure password generator and encrypted vault built with Next.js, TypeScript, and MongoDB.

## Features

- 🔐 **Strong Password Generator** - Customizable length, character types, and strength indicators
- 🛡️ **Client-Side Encryption** - Your data is encrypted before it reaches the server
- 🔍 **Search & Filter** - Quickly find your saved credentials
- 📋 **Copy to Clipboard** - Auto-clearing clipboard for security
- 🎨 **Clean UI** - Modern, responsive design with Tailwind CSS
- 🔒 **Secure Authentication** - JWT-based auth with bcrypt password hashing

## Tech Stack

- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas (Free Tier)
- **Authentication**: JWT tokens with bcrypt
- **Encryption**: CryptoJS (AES encryption with PBKDF2 key derivation)

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd passgen
npm install
```

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Set up database user and network access
4. Get your connection string

### 3. Configure Environment Variables

Create `.env.local` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/passgen?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Security Features

### Encryption Details
- **Algorithm**: AES-256 encryption
- **Key Derivation**: PBKDF2 with 10,000 iterations
- **Salt**: Random 128-bit salt for each encryption
- **Client-Side**: All sensitive data is encrypted before transmission

### Authentication
- Passwords hashed with bcrypt (12 rounds)
- JWT tokens for session management
- Secure HTTP-only cookie storage

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Sign in

### Vault Management
- `GET /api/vault` - Get all vault items
- `POST /api/vault` - Create new vault item
- `PUT /api/vault/[id]` - Update vault item
- `DELETE /api/vault/[id]` - Delete vault item

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
- **Netlify**: Use `npm run build` and deploy the `out` folder
- **Railway**: Connect your GitHub repo and add environment variables
- **Heroku**: Use the Next.js buildpack

## Environment Variables for Production

```env
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-nextauth-secret
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Security Notes

- Never commit `.env.local` to version control
- Use strong, unique secrets for production
- Regularly rotate JWT secrets
- Consider implementing rate limiting for production
- Monitor for suspicious activity

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.