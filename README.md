# PassGen - Secure Password Manager

A modern, full-stack password manager with client-side encryption built with Next.js, TypeScript, and MongoDB.

## ✨ Features

- 🔐 **Strong Password Generator** - Customizable password generation with strength indicators
- 🛡️ **Client-Side Encryption** - AES-256 encryption before data reaches the server
- 🔍 **Search & Filter** - Quickly find your saved credentials
- 📋 **Smart Clipboard** - Auto-clearing clipboard for enhanced security
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 🔒 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- ⚡ **Real-time Updates** - Instant synchronization across sessions

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Tailwind CSS
- **Authentication**: JWT tokens with bcrypt
- **Encryption**: CryptoJS (AES-256 with PBKDF2 key derivation)

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier available)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/spamprx/PassGen.git
   cd PassGen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 🔒 Security Features

### Encryption
- **AES-256** encryption algorithm
- **PBKDF2** key derivation with 10,000 iterations
- Unique **salt** for each encryption operation
- All sensitive data encrypted **client-side** before transmission

### Authentication
- Password hashing with **bcrypt** (12 rounds)
- **JWT** tokens for secure session management
- Token-based API authentication
- Secure password storage

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Vault Management
- `GET /api/vault` - Retrieve all vault items
- `POST /api/vault` - Create new vault item
- `PUT /api/vault/[id]` - Update vault item
- `DELETE /api/vault/[id]` - Delete vault item

## 🌐 Deployment

This application is optimized for deployment on **Vercel**:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy with one click

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 Project Structure

```
PassGen/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/         # API routes
│   │   ├── dashboard/   # Dashboard page
│   │   └── ...
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   ├── models/          # MongoDB models
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── ...
```

## 🔐 Environment Variables

Required environment variables:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT token signing |
| `NEXTAUTH_URL` | Application URL |
| `NEXTAUTH_SECRET` | Secret key for NextAuth |

> **⚠️ Security Note**: Never commit your `.env.local` file to version control. Use strong, randomly generated secrets for production.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**spamprx**

- GitHub: [@spamprx](https://github.com/spamprx)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB team for the database platform
- All contributors who help improve this project

---

**⭐ If you found this project helpful, please consider giving it a star!**
