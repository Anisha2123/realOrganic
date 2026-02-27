# Production Deployment Checklist

Use this checklist before deploying to production.

## Backend Checklist

### Environment Configuration
- [ ] `.env` file created with all required variables
- [ ] `NODE_ENV=production` set
- [ ] MongoDB production database configured
- [ ] Razorpay LIVE keys configured (rzp_live_...)
- [ ] Strong JWT_SECRET generated (min 32 characters)
- [ ] CORS_ORIGIN set to production frontend URL
- [ ] Email credentials configured (if using email features)
- [ ] Razorpay webhook secret configured
- [ ] Run `npm run validate-env` successfully

### Security
- [ ] `.env` file NOT committed to Git
- [ ] All sensitive data removed from source code
- [ ] MongoDB authentication enabled
- [ ] MongoDB network access restricted to server IP
- [ ] HTTPS enabled on server
- [ ] Rate limiting implemented (recommended)
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (using Mongoose)
- [ ] XSS protection headers configured

### Code Quality
- [ ] All console.logs reviewed (remove sensitive data)
- [ ] Error handling implemented
- [ ] Database indexes created for performance
- [ ] API endpoints tested
- [ ] Payment flow tested with Razorpay test mode
- [ ] Authentication flow tested
- [ ] Order creation and tracking tested

### Infrastructure
- [ ] Server has adequate resources (RAM, CPU)
- [ ] MongoDB backup strategy in place
- [ ] Server monitoring configured
- [ ] Log aggregation setup
- [ ] SSL certificate installed
- [ ] Domain/subdomain configured
- [ ] Firewall rules configured
- [ ] Process manager configured (PM2, systemd)

### Dependencies
- [ ] All npm packages up to date
- [ ] No critical security vulnerabilities (`npm audit`)
- [ ] Production dependencies only (`npm install --production`)

---

## Frontend Checklist

### Environment Configuration
- [ ] `.env.production` file created
- [ ] `VITE_API_URL` points to production backend
- [ ] Razorpay LIVE key configured
- [ ] Firebase production project configured
- [ ] All VITE_FIREBASE_* variables set correctly

### Build & Optimization
- [ ] Production build created (`npm run build`)
- [ ] Build size optimized (check dist/ folder)
- [ ] Images optimized
- [ ] Unused dependencies removed
- [ ] Code splitting implemented
- [ ] Lazy loading for routes (if applicable)

### Security
- [ ] No sensitive data in frontend code
- [ ] API keys are public-safe (Razorpay public key, Firebase config)
- [ ] Content Security Policy configured
- [ ] HTTPS enforced
- [ ] Secure cookies configured

### Testing
- [ ] All pages load correctly
- [ ] Authentication flow works
- [ ] Product browsing works
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Payment integration tested
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing done
- [ ] Performance testing done (Lighthouse)

### SEO & Analytics
- [ ] Meta tags configured
- [ ] Open Graph tags added
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Google Analytics / Firebase Analytics configured
- [ ] Error tracking configured (Sentry, etc.)

### Hosting
- [ ] Static files deployed to hosting platform
- [ ] CDN configured (if applicable)
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Redirects configured (www to non-www, etc.)
- [ ] 404 page configured

---

## Database Checklist

### MongoDB
- [ ] Production cluster created
- [ ] Database user created with appropriate permissions
- [ ] Network access whitelist configured
- [ ] Backup enabled
- [ ] Monitoring enabled
- [ ] Indexes created for frequently queried fields
- [ ] Connection pooling configured

### Data
- [ ] Sample/test data removed
- [ ] Production data seeded (if needed)
- [ ] Data validation rules in place

---

## Payment Gateway Checklist

### Razorpay
- [ ] Account activated for live transactions
- [ ] KYC completed
- [ ] Bank account linked
- [ ] Live API keys generated
- [ ] Webhook URL configured
- [ ] Webhook secret saved in backend .env
- [ ] Test payment in test mode successful
- [ ] Payment flow documented

---

## Firebase Checklist

### Authentication
- [ ] Production Firebase project created
- [ ] Authentication methods enabled
- [ ] Email templates customized
- [ ] Authorized domains configured

### Security Rules
- [ ] Firestore security rules configured
- [ ] Storage security rules configured
- [ ] Rules tested

---

## Monitoring & Maintenance

### Logging
- [ ] Application logs configured
- [ ] Error logs monitored
- [ ] Access logs enabled
- [ ] Log rotation configured

### Monitoring
- [ ] Uptime monitoring configured
- [ ] Performance monitoring enabled
- [ ] Error tracking enabled
- [ ] Alert notifications configured

### Backup
- [ ] Database backup automated
- [ ] Backup restoration tested
- [ ] Code repository backed up
- [ ] Environment variables documented securely

---

## Post-Deployment

### Verification
- [ ] Health check endpoint responding
- [ ] All API endpoints accessible
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Product listing works
- [ ] Order placement works
- [ ] Payment processing works
- [ ] Email notifications work (if configured)

### Documentation
- [ ] API documentation updated
- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Rollback procedure documented
- [ ] Team notified of deployment

### Performance
- [ ] Page load times acceptable
- [ ] API response times acceptable
- [ ] Database query performance optimized
- [ ] CDN caching working

---

## Emergency Contacts

Document these for quick access:
- [ ] Hosting provider support
- [ ] Database provider support
- [ ] Payment gateway support
- [ ] Domain registrar support
- [ ] SSL certificate provider
- [ ] Team contact information

---

## Rollback Plan

- [ ] Previous version tagged in Git
- [ ] Database backup before deployment
- [ ] Rollback steps documented
- [ ] Rollback tested in staging

---

**Date Completed:** _______________

**Deployed By:** _______________

**Version/Tag:** _______________

**Notes:**
