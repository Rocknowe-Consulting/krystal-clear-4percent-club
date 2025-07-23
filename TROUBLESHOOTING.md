# Vercel Deployment Troubleshooting Guide

## 🚨 Common Vercel Deployment Issues

### 1. 404 NOT_FOUND Error

**Symptoms:**
- Page shows 404 error after deployment
- API endpoints return 404
- Static files not loading

**Solutions:**

#### Option A: Use Simplified Configuration
```bash
# Backup current config
mv vercel.json vercel.json.backup

# Use simplified config
mv vercel-simple.json vercel.json

# Deploy
vercel --prod

# Restore original config
mv vercel.json vercel-simple.json
mv vercel.json.backup vercel.json
```

#### Option B: Deploy Without Custom Config
```bash
# Remove vercel.json temporarily
mv vercel.json vercel.json.backup

# Deploy (Vercel will auto-detect structure)
vercel --prod

# Restore config
mv vercel.json.backup vercel.json
```

#### Option C: Check File Structure
Ensure your project structure matches:
```
project-root/
├── index.html
├── styles.css
├── script.js
├── vercel.json
├── api/
│   ├── subscribe.js
│   └── test.js
└── assets/
    └── README.md
```

### 2. API Endpoint Not Working

**Test your API:**
```bash
# Test the API endpoint
curl -X GET https://your-domain.vercel.app/api/test

# Expected response:
# {"message":"API is working!","timestamp":"...","method":"GET","url":"/api/test"}
```

**If API returns 404:**

1. **Check API file structure:**
   ```bash
   # Ensure api/subscribe.js exists and has correct export
   cat api/subscribe.js | head -5
   ```

2. **Verify export syntax:**
   ```javascript
   // Should be:
   export default async function handler(req, res) {
     // ...
   }
   ```

3. **Check Vercel configuration:**
   ```json
   {
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "/api/$1"
       }
     ]
   }
   ```

### 3. Form Submission Issues

**Debug steps:**

1. **Check browser console for errors**
2. **Test API endpoint directly:**
   ```bash
   curl -X POST https://your-domain.vercel.app/api/subscribe \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "Test",
       "lastName": "User", 
       "email": "test@example.com",
       "company": "Test Co",
       "turnover": "500k-1m",
       "consent": true
     }'
   ```

3. **Check environment variables** (if using email service)

### 4. Static Files Not Loading

**Check file paths:**
- Ensure all files are in the correct directories
- Check for case sensitivity issues
- Verify file permissions

**Test static files:**
```bash
# Test CSS loading
curl -I https://your-domain.vercel.app/styles.css

# Test JS loading  
curl -I https://your-domain.vercel.app/script.js
```

## 🔧 Advanced Troubleshooting

### 1. Vercel CLI Issues

**Reinstall Vercel CLI:**
```bash
npm uninstall -g vercel
npm install -g vercel
```

**Clear Vercel cache:**
```bash
vercel --clear-cache
```

### 2. Environment Variables

**Set environment variables:**
```bash
vercel env add MAILCHIMP_API_KEY
vercel env add MAILCHIMP_LIST_ID
vercel env add MAILCHIMP_SERVER_PREFIX
```

**Check environment variables:**
```bash
vercel env ls
```

### 3. Build Issues

**Check build logs:**
```bash
vercel --debug
```

**Force rebuild:**
```bash
vercel --force
```

## 📋 Deployment Checklist

Before deploying, ensure:

- [ ] All files are committed to git
- [ ] `index.html` is in the root directory
- [ ] API files are in `api/` directory
- [ ] `vercel.json` is properly configured
- [ ] No syntax errors in JavaScript files
- [ ] All file paths are correct

## 🚀 Quick Fix Commands

### For 404 Errors:
```bash
# Use deployment script
./deploy.sh

# Or manually:
mv vercel.json vercel.json.backup
vercel --prod
mv vercel.json.backup vercel.json
```

### For API Issues:
```bash
# Test API
curl https://your-domain.vercel.app/api/test

# Check logs
vercel logs
```

### For Form Issues:
```bash
# Test form submission
curl -X POST https://your-domain.vercel.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","company":"Test","turnover":"500k-1m","consent":true}'
```

## 📞 Getting Help

### Vercel Support:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Status](https://vercel-status.com/)

### Project-Specific Help:
- Check `DEPLOYMENT.md` for detailed instructions
- Review `README.md` for project overview
- Use `./deploy.sh` script for guided deployment

### Common Solutions:

1. **404 Error**: Use simplified config or deploy without custom config
2. **API Not Working**: Check file structure and export syntax
3. **Form Issues**: Test API endpoint directly
4. **Build Failures**: Check for syntax errors and file paths

---

**Need immediate help?** Contact Rocknowe Consulting at hello@rocknowe.com 