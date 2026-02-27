# Environment Variables Setup Guide

This guide will help you configure all necessary environment variables for both backend and frontend.

## Backend Environment Variables

### Step 1: Create .env file
```bash
cd backend
cp .env.example .env
```

### Step 2: Configure each variable

#### Server Configuration
```env
NODE_ENV=development  # Change to 'production' for production
PORT=5000            # Port number for the backend server
```

#### Database
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/realorganic
```
- Get this from MongoDB Atlas dashboard
- Replace `username` and `password` with your credentials
- Replace `cluster` with your cluster name

#### Razorpay Payment Gateway
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxxx
```
- Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
- Go to Settings → API Keys
- Generate keys (use test keys for development, live keys for production)
- For webhook secret: Settings → Webhooks → Create webhook → Copy secret

#### JWT Secret
```env
JWT_SECRET=your_super_secret_jwt_key_min_32_characters_long
```
- Generate a strong random string
- Use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

#### Email Configuration (Optional)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```
- For Gmail: Enable 2FA and create an App Password
- Go to Google Account → Security → 2-Step Verification → App passwords

#### CORS Configuration
```env
CORS_ORIGIN=http://localhost:5173  # Frontend URL
```
- For production, use your actual frontend domain
- Example: `https://yourdomain.com`

### Step 3: Validate Configuration
```bash
npm run validate-env
```

---

## Frontend Environment Variables

### Step 1: Create .env file
```bash
cd frontend
cp .env.example .env
```

### Step 2: Configure each variable

#### API Configuration
```env
VITE_API_URL=http://localhost:5000
```
- Use your backend server URL
- For production: `http://your-server-ip` or `https://api.yourdomain.com`

#### Razorpay
```env
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
```
- Same as backend RAZORPAY_KEY_ID
- This is the public key (safe to expose in frontend)

#### Firebase Configuration
```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:xxxxxxxxxxxxx
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

To get Firebase credentials:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create new one)
3. Go to Project Settings (gear icon)
4. Scroll to "Your apps" section
5. Click on Web app (</> icon)
6. Copy the configuration values

### Step 3: Production Environment
For production, create `.env.production`:
```bash
cp .env.example .env.production
```
Update with production values (production API URL, live Razorpay key, etc.)

---

## Security Best Practices

### ✅ DO:
- Keep `.env` files in `.gitignore`
- Use different credentials for development and production
- Rotate secrets regularly
- Use strong, random JWT secrets
- Enable HTTPS in production
- Restrict CORS to specific domains in production
- Use environment-specific Firebase projects

### ❌ DON'T:
- Commit `.env` files to Git
- Share credentials in chat/email
- Use production credentials in development
- Hardcode secrets in source code
- Use weak or default passwords
- Expose backend secrets in frontend code

---

## Quick Start Commands

### Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your values
npm install
npm run validate-env
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
# Edit .env with your values
npm install
npm run dev
```

---

## Troubleshooting

### "MONGO_URI is not defined"
- Ensure `.env` file exists in backend folder
- Check that `MONGO_URI` is spelled correctly
- Restart the server after changing `.env`

### "Firebase configuration is incomplete"
- Verify all VITE_FIREBASE_* variables are set
- Check for typos in variable names
- Ensure values are copied correctly from Firebase console

### "Invalid Razorpay key"
- Confirm you're using the correct key for your environment
- Test keys start with `rzp_test_`
- Live keys start with `rzp_live_`

### CORS errors
- Check `CORS_ORIGIN` matches your frontend URL exactly
- Include protocol (http:// or https://)
- Don't include trailing slash

---

## Need Help?

- Backend validation: `npm run validate-env` (in backend folder)
- Check server logs for specific error messages
- Verify all services (MongoDB, Firebase, Razorpay) are accessible
- Ensure firewall/security groups allow necessary connections
