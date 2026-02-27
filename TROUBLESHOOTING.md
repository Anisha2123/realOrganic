# Troubleshooting Guide

Common issues and their solutions.

## Table of Contents
- [Environment Variables](#environment-variables)
- [Database Connection](#database-connection)
- [Firebase Issues](#firebase-issues)
- [Payment Gateway](#payment-gateway)
- [CORS Errors](#cors-errors)
- [Build Issues](#build-issues)
- [Deployment Issues](#deployment-issues)

---

## Environment Variables

### Issue: "Environment variable not defined"

**Symptoms:**
- Error messages about missing environment variables
- Application crashes on startup
- Features not working

**Solutions:**

1. **Check .env file exists**
   ```bash
   # Backend
   ls backend/.env
   
   # Frontend
   ls frontend/.env
   ```

2. **Validate environment variables**
   ```bash
   cd backend
   npm run validate-env
   ```

3. **Restart the server**
   - Environment variables are loaded on startup
   - Changes to .env require restart

4. **Check variable names**
   - Backend: No prefix needed
   - Frontend: Must start with `VITE_`
   - Case-sensitive!

5. **Check for typos**
   ```bash
   # Wrong
   VITE_API_UR=http://localhost:5000
   
   # Correct
   VITE_API_URL=http://localhost:5000
   ```

---

## Database Connection

### Issue: "Cannot connect to MongoDB"

**Symptoms:**
- "MongoDB Connection Error" in console
- Server starts but database operations fail
- Timeout errors

**Solutions:**

1. **Check MongoDB is running (Local)**
   ```bash
   # Windows
   net start MongoDB
   
   # Linux/Mac
   sudo systemctl status mongod
   ```

2. **Verify connection string**
   ```env
   # Local
   MONGO_URI=mongodb://localhost:27017/realorganic
   
   # Atlas
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   ```

3. **Check MongoDB Atlas (Cloud)**
   - Network Access: Add your IP address
   - Database Access: Verify user credentials
   - Connection string: Copy from Atlas dashboard

4. **Test connection**
   ```bash
   # Using mongosh
   mongosh "your_connection_string"
   ```

5. **Check firewall**
   - Local: Port 27017 open
   - Atlas: IP whitelist configured

### Issue: "Authentication failed"

**Solutions:**
1. Check username and password in MONGO_URI
2. Ensure special characters are URL-encoded
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `!` becomes `%21`

---

## Firebase Issues

### Issue: "Firebase configuration is incomplete"

**Symptoms:**
- Firebase authentication not working
- Console errors about Firebase
- Login/signup fails

**Solutions:**

1. **Verify all Firebase variables are set**
   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   VITE_FIREBASE_MEASUREMENT_ID=...
   ```

2. **Get credentials from Firebase Console**
   - Go to Project Settings
   - Scroll to "Your apps"
   - Select Web app
   - Copy configuration

3. **Check authorized domains**
   - Firebase Console → Authentication → Settings
   - Add your domain to authorized domains

4. **Verify Firebase project is active**
   - Check Firebase Console
   - Ensure billing is set up (if required)

### Issue: "Firebase auth domain error"

**Solution:**
- Ensure `VITE_FIREBASE_AUTH_DOMAIN` ends with `.firebaseapp.com`
- No trailing slash
- Exact match from Firebase Console

---

## Payment Gateway

### Issue: "Razorpay payment fails"

**Symptoms:**
- Payment modal doesn't open
- Payment fails immediately
- "Invalid key" error

**Solutions:**

1. **Verify Razorpay keys match**
   ```env
   # Backend
   RAZORPAY_KEY_ID=rzp_test_...
   
   # Frontend
   VITE_RAZORPAY_KEY_ID=rzp_test_...
   ```
   Both should be identical!

2. **Check key type**
   - Development: `rzp_test_...`
   - Production: `rzp_live_...`
   - Don't mix test and live keys

3. **Verify Razorpay account**
   - Login to Razorpay Dashboard
   - Check account is activated
   - Verify KYC status (for live keys)

4. **Test with Razorpay test cards**
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

### Issue: "Webhook not receiving events"

**Solutions:**
1. Configure webhook URL in Razorpay Dashboard
2. Verify `RAZORPAY_WEBHOOK_SECRET` matches
3. Check webhook endpoint is accessible
4. Review webhook logs in Razorpay Dashboard

---

## CORS Errors

### Issue: "CORS policy blocked"

**Symptoms:**
- "Access-Control-Allow-Origin" error in browser console
- API calls fail from frontend
- Network tab shows CORS errors

**Solutions:**

1. **Check CORS_ORIGIN in backend .env**
   ```env
   # Development
   CORS_ORIGIN=http://localhost:5173
   
   # Production
   CORS_ORIGIN=https://yourdomain.com
   ```

2. **Verify exact match**
   - Include protocol (http:// or https://)
   - No trailing slash
   - Port number if needed
   - Case-sensitive

3. **Check frontend is using correct API URL**
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Restart backend server**
   - CORS settings load on startup

5. **For multiple origins (production)**
   ```javascript
   // In server.js
   const allowedOrigins = [
     'https://yourdomain.com',
     'https://www.yourdomain.com'
   ];
   ```

---

## Build Issues

### Issue: "npm install fails"

**Solutions:**

1. **Clear npm cache**
   ```bash
   npm cache clean --force
   ```

2. **Delete node_modules and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check Node.js version**
   ```bash
   node --version
   # Should be v16 or higher
   ```

4. **Check npm version**
   ```bash
   npm --version
   # Should be v8 or higher
   ```

### Issue: "Frontend build fails"

**Solutions:**

1. **Check for environment variables**
   - All VITE_* variables must be set
   - Create .env.production for production builds

2. **Clear Vite cache**
   ```bash
   rm -rf node_modules/.vite
   npm run build
   ```

3. **Check for TypeScript errors**
   ```bash
   npm run lint
   ```

---

## Deployment Issues

### Issue: "Backend not accessible after deployment"

**Solutions:**

1. **Check server is running**
   ```bash
   curl http://your-server-ip:5000/health
   ```

2. **Verify firewall rules**
   - Port 5000 (or your PORT) is open
   - Security groups allow inbound traffic

3. **Check environment variables on server**
   ```bash
   # SSH into server
   cd /path/to/backend
   cat .env
   ```

4. **Check server logs**
   ```bash
   # If using PM2
   pm2 logs
   
   # If using systemd
   journalctl -u your-service-name
   ```

### Issue: "Frontend shows blank page"

**Solutions:**

1. **Check browser console for errors**
   - F12 → Console tab
   - Look for JavaScript errors

2. **Verify API URL**
   - Check .env.production
   - Ensure VITE_API_URL points to deployed backend

3. **Check build output**
   ```bash
   npm run build
   # Check dist/ folder is created
   ```

4. **Test production build locally**
   ```bash
   npm run preview
   ```

### Issue: "Environment variables not working in production"

**Solutions:**

1. **Frontend: Rebuild after changing .env.production**
   ```bash
   npm run build
   ```
   Environment variables are embedded at build time!

2. **Backend: Restart server after changing .env**
   ```bash
   # PM2
   pm2 restart app-name
   
   # systemd
   sudo systemctl restart service-name
   ```

---

## Performance Issues

### Issue: "Slow API responses"

**Solutions:**

1. **Check database indexes**
   ```javascript
   // In models
   schema.index({ field: 1 });
   ```

2. **Monitor database queries**
   ```javascript
   mongoose.set('debug', true);
   ```

3. **Check server resources**
   - CPU usage
   - Memory usage
   - Network bandwidth

4. **Enable compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

### Issue: "Large bundle size"

**Solutions:**

1. **Analyze bundle**
   ```bash
   npm run build -- --analyze
   ```

2. **Implement code splitting**
   ```javascript
   const Component = lazy(() => import('./Component'));
   ```

3. **Optimize images**
   - Use WebP format
   - Compress images
   - Use CDN

---

## Common Error Messages

### "EADDRINUSE: address already in use"
**Solution:** Port is already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### "MODULE_NOT_FOUND"
**Solution:** Missing dependency
```bash
npm install
```

### "Cannot find module '.env'"
**Solution:** .env file missing
```bash
cp .env.example .env
```

### "Invalid token" / "jwt malformed"
**Solution:** JWT_SECRET mismatch or token expired
- Check JWT_SECRET is set
- Clear browser cookies/localStorage
- Login again

---

## Getting Help

If you're still stuck:

1. **Check documentation**
   - [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)
   - [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

2. **Validate setup**
   ```bash
   # Windows
   validate-setup.bat
   
   # Linux/Mac
   ./validate-setup.sh
   ```

3. **Check service status**
   - MongoDB Atlas Dashboard
   - Firebase Console
   - Razorpay Dashboard

4. **Review logs**
   - Backend console output
   - Browser console (F12)
   - Server logs

5. **Test components individually**
   - Test database connection
   - Test API endpoints
   - Test Firebase auth
   - Test payment flow

---

**Last Updated:** February 26, 2026
