# Quick Reference Guide

## Setup Commands

### Initial Setup (Windows)
```cmd
setup.bat
```

### Initial Setup (Linux/Mac)
```bash
chmod +x setup.sh
./setup.sh
```

### Manual Setup
```bash
# Backend
cd backend
cp .env.example .env
npm install
npm run validate-env
npm run dev

# Frontend
cd frontend
cp .env.example .env
npm install
npm run dev
```

---

## Development Commands

### Backend
```bash
cd backend
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm run validate-env # Validate environment variables
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## Environment Files

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://...
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
RAZORPAY_WEBHOOK_SECRET=...
JWT_SECRET=...
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_...
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

---

## Production Deployment

### Backend
```bash
cd backend
# Set NODE_ENV=production in .env
# Update all credentials to production values
npm install --production
npm start
```

### Frontend
```bash
cd frontend
# Create/update .env.production
npm run build
# Deploy dist/ folder to hosting
```

---

## Important URLs

### Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

### Production
- Frontend: [Your domain]
- Backend: [Your API domain]
- Health Check: [Your API domain]/health

---

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/products` - Create product (admin)
- PUT `/api/products/:id` - Update product (admin)
- DELETE `/api/products/:id` - Delete product (admin)

### Orders
- GET `/api/orders` - Get user orders
- GET `/api/orders/:id` - Get single order
- POST `/api/orders` - Create order
- PUT `/api/orders/:id` - Update order

### User
- GET `/api/user/profile` - Get user profile
- PUT `/api/user/profile` - Update user profile

### Wishlist
- GET `/api/wishlist` - Get user wishlist
- POST `/api/wishlist` - Add to wishlist
- DELETE `/api/wishlist/:id` - Remove from wishlist

---

## Common Issues & Solutions

### "Cannot connect to MongoDB"
- Check MONGO_URI in .env
- Verify MongoDB Atlas network access
- Check database user credentials

### "CORS error"
- Verify CORS_ORIGIN in backend .env
- Ensure frontend URL matches exactly
- Include protocol (http:// or https://)

### "Firebase error"
- Check all VITE_FIREBASE_* variables
- Verify Firebase project is active
- Check Firebase console for errors

### "Razorpay payment fails"
- Verify RAZORPAY_KEY_ID matches frontend/backend
- Check Razorpay dashboard for errors
- Ensure webhook is configured

### "Environment variables not loading"
- Restart development server
- Check .env file location
- Verify variable names (VITE_ prefix for frontend)

---

## Useful Commands

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Check Node Version
```bash
node --version
npm --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Check for Security Vulnerabilities
```bash
npm audit
npm audit fix
```

---

## Documentation Files

- `ENV_SETUP.md` - Detailed environment setup guide
- `DEPLOYMENT.md` - Production deployment guide
- `PRODUCTION_CHECKLIST.md` - Pre-deployment checklist
- `QUICK_REFERENCE.md` - This file

---

## Support Resources

- MongoDB Atlas: https://cloud.mongodb.com/
- Razorpay Dashboard: https://dashboard.razorpay.com/
- Firebase Console: https://console.firebase.google.com/
- Vite Documentation: https://vitejs.dev/
- Express Documentation: https://expressjs.com/

---

## Git Commands

### Commit Changes
```bash
git add .
git commit -m "Your message"
git push
```

### Create Production Tag
```bash
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0
```

### Rollback to Previous Version
```bash
git log  # Find commit hash
git checkout <commit-hash>
```

---

**Last Updated:** February 2026
