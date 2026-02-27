# Real Organic - E-commerce Platform

A full-stack e-commerce platform for organic products with React frontend and Node.js backend.

## 🚀 Quick Start

### Windows
```cmd
setup.bat
```

### Linux/Mac
```bash
chmod +x setup.sh
./setup.sh
```

Then edit the `.env` files in both `backend/` and `frontend/` folders with your credentials.

## 📁 Project Structure

```
.
├── backend/              # Node.js + Express API
│   ├── controllers/      # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── .env.example     # Environment template
│   └── server.js        # Entry point
│
├── frontend/            # React + Vite application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Context providers
│   │   └── firebaseConfig.js
│   ├── public/          # Static assets
│   └── .env.example     # Environment template
│
└── Documentation files
```

## 🛠️ Technology Stack

### Backend
- Node.js & Express
- MongoDB with Mongoose
- JWT Authentication
- Razorpay Payment Integration
- Firebase Admin (optional)

### Frontend
- React 19
- Vite
- Tailwind CSS
- React Router
- Firebase Authentication
- Axios

## 📚 Documentation

**New to the project?** Start with [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) for a complete guide to all documentation.

### Quick Links
- **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - Complete documentation guide
- **[ENV_SETUP.md](ENV_SETUP.md)** - Complete environment setup guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production deployment instructions
- **[PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)** - Pre-deployment checklist
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick command reference
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Troubleshooting guide
- **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** - Setup summary

## 🔧 Development

### Backend
```bash
cd backend
npm run dev          # Start with auto-reload
npm run validate-env # Validate configuration
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server
```

## 🚢 Production Build

### Backend
```bash
cd backend
# Update .env with production values
npm install --production
npm start
```

### Frontend
```bash
cd frontend
# Update .env.production
npm run build
# Deploy dist/ folder
```

## 🔐 Environment Variables

### Backend Required
- `MONGO_URI` - MongoDB connection string
- `RAZORPAY_KEY_ID` - Razorpay API key
- `RAZORPAY_KEY_SECRET` - Razorpay secret
- `RAZORPAY_WEBHOOK_SECRET` - Webhook secret
- `JWT_SECRET` - JWT signing key

### Frontend Required
- `VITE_API_URL` - Backend API URL
- `VITE_RAZORPAY_KEY_ID` - Razorpay public key
- `VITE_FIREBASE_*` - Firebase configuration

See [ENV_SETUP.md](ENV_SETUP.md) for detailed instructions.

## 🔒 Security Features

- Environment-based configuration
- JWT authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Secure payment processing
- Firebase authentication

## 📦 Features

- User authentication (Firebase)
- Product browsing and search
- Shopping cart
- Wishlist
- Order management
- Payment integration (Razorpay)
- Responsive design
- Admin capabilities

## 🧪 Testing

### Validate Environment
```bash
# Backend
cd backend && npm run validate-env

# Check health endpoint
curl http://localhost:5000/health
```

## 📝 API Endpoints

- `GET /health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products` - List products
- `POST /api/orders` - Create order
- `GET /api/wishlist` - Get wishlist

See [QUICK_REFERENCE.md](QUICK_REFERENCE.md) for complete API documentation.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

ISC

## 🆘 Support

For issues and questions:
1. Check documentation files
2. Review [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
3. Verify environment variables
4. Check service dashboards (MongoDB, Firebase, Razorpay)

---

**Version:** 1.0.0  
**Last Updated:** February 2026
