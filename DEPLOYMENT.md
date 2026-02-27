# Production Deployment Guide

## Backend Setup

### 1. Environment Variables
Copy `.env.example` to `.env` and fill in all required values:

```bash
cd backend
cp .env.example .env
```

Required variables:
- `NODE_ENV=production`
- `PORT=5000`
- `MONGO_URI` - Your MongoDB connection string
- `RAZORPAY_KEY_ID` - Razorpay production key (rzp_live_...)
- `RAZORPAY_KEY_SECRET` - Razorpay secret key
- `RAZORPAY_WEBHOOK_SECRET` - Webhook secret from Razorpay dashboard
- `JWT_SECRET` - Strong random string for JWT signing
- `CORS_ORIGIN` - Your frontend production URL
- Email configuration (if using nodemailer)

### 2. Install Dependencies
```bash
npm install --production
```

### 3. Start Production Server
```bash
npm start
```

### 4. Health Check
Verify the server is running:
```bash
curl http://localhost:5000/health
```

---

## Frontend Setup

### 1. Environment Variables
Create `.env.production` with production values:

```bash
cd frontend
```

Required variables:
- `VITE_API_URL` - Your backend API URL
- `VITE_RAZORPAY_KEY_ID` - Razorpay production key (rzp_live_...)
- Firebase configuration (all VITE_FIREBASE_* variables)

### 2. Install Dependencies
```bash
npm install
```

### 3. Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 4. Preview Production Build (Optional)
```bash
npm run preview
```

### 5. Deploy
Upload the contents of the `dist/` folder to your web server or hosting platform.

---

## Security Checklist

- [ ] All sensitive data moved to environment variables
- [ ] `.env` files added to `.gitignore`
- [ ] Production MongoDB database secured with authentication
- [ ] CORS configured to allow only your frontend domain
- [ ] Razorpay production keys configured
- [ ] JWT secret is strong and unique
- [ ] HTTPS enabled on production server
- [ ] Firebase security rules configured
- [ ] Rate limiting implemented (recommended)
- [ ] Error messages don't expose sensitive information

---

## Deployment Platforms

### Backend Options:
- AWS EC2 / Elastic Beanstalk
- DigitalOcean Droplets / App Platform
- Heroku
- Railway
- Render

### Frontend Options:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Firebase Hosting
- GitHub Pages (for static sites)

---

## Monitoring

After deployment, monitor:
- Server logs for errors
- Database connection status
- API response times
- Payment gateway webhooks
- User authentication flows

---

## Rollback Plan

Keep previous working versions:
1. Tag releases in Git
2. Keep database backups
3. Document configuration changes
4. Test rollback procedure in staging
