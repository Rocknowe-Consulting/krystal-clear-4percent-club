# Deployment Guide - The 4% Club

This guide covers deploying The 4% Club landing page to various platforms.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended)

**One-Click Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rocknowe/the-4-percent-club)

**Manual Deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

**If you encounter 404 errors:**
1. Try using the simplified configuration:
   ```bash
   # Rename the simplified config
   mv vercel-simple.json vercel.json
   # Then deploy again
   vercel --prod
   ```

2. Or deploy without custom configuration:
   ```bash
   # Remove vercel.json temporarily
   mv vercel.json vercel.json.backup
   # Deploy (Vercel will auto-detect the structure)
   vercel --prod
   # Restore config after successful deployment
   mv vercel.json.backup vercel.json
   ```

### 2. Netlify

**One-Click Deploy:**
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/rocknowe/the-4-percent-club)

**Manual Deploy:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### 3. GitHub Pages

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Save - site will be available at `https://username.github.io/repository-name`

### 4. Traditional Web Hosting

1. Upload all files to your web server
2. Ensure `index.html` is in the root directory
3. Configure your domain to point to the hosting

## 🔧 Environment Setup

### Required Environment Variables

For the newsletter signup functionality, set these environment variables:

#### Mailchimp Integration
```bash
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id
MAILCHIMP_SERVER_PREFIX=us1
```

#### ConvertKit Integration
```bash
CONVERTKIT_API_KEY=your_convertkit_api_key
CONVERTKIT_FORM_ID=your_convertkit_form_id
```

#### SendGrid Integration
```bash
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_LIST_ID=your_sendgrid_list_id
FROM_EMAIL=hello@rocknowe.com
```

### Setting Environment Variables

#### Vercel
```bash
vercel env add MAILCHIMP_API_KEY
vercel env add MAILCHIMP_LIST_ID
vercel env add MAILCHIMP_SERVER_PREFIX
```

#### Netlify
1. Go to Site Settings > Environment Variables
2. Add each variable with its value

#### Traditional Hosting
- Add to `.env` file (if supported)
- Or configure in your hosting control panel

## 📧 Email Service Integration

### 1. Mailchimp Setup

1. **Get API Key:**
   - Log into Mailchimp
   - Go to Account > Extras > API Keys
   - Create new API key

2. **Get List ID:**
   - Go to Audience > Settings > Audience name and defaults
   - Copy the Audience ID

3. **Get Server Prefix:**
   - Check your API key URL: `https://us1.api.mailchimp.com/3.0/`
   - Server prefix is `us1` (or your region)

4. **Update API Code:**
   - Uncomment Mailchimp integration in `api/subscribe.js`
   - Set environment variables

### 2. ConvertKit Setup

1. **Get API Key:**
   - Log into ConvertKit
   - Go to Settings > Advanced > API
   - Copy your API key

2. **Get Form ID:**
   - Go to Landing Pages & Forms
   - Create or select a form
   - Copy the form ID from the URL

3. **Update API Code:**
   - Uncomment ConvertKit integration in `api/subscribe.js`
   - Set environment variables

### 3. SendGrid Setup

1. **Get API Key:**
   - Log into SendGrid
   - Go to Settings > API Keys
   - Create new API key with "Mail Send" permissions

2. **Get List ID:**
   - Go to Marketing > Contacts > Lists
   - Create a new list and copy the ID

3. **Update API Code:**
   - Uncomment SendGrid integration in `api/subscribe.js`
   - Set environment variables

## 🔍 Testing Your Deployment

### 1. Local Testing

```bash
# Start local server
npm start

# Test form submission
curl -X POST http://localhost:8000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "company": "Test Company",
    "turnover": "500k-1m",
    "consent": true
  }'
```

### 2. Production Testing

1. **Form Submission:**
   - Fill out the newsletter signup form
   - Check for success/error messages
   - Verify email received (if welcome email configured)

2. **Performance Testing:**
   - Run Lighthouse audit
   - Check mobile responsiveness
   - Test loading speed

3. **Cross-Browser Testing:**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization Before Deployment

### 1. Branding Updates

- **Logo**: Replace `assets/rocknowe-logo.svg`
- **Colors**: Update CSS variables in `styles.css`
- **Content**: Modify text in `index.html`
- **Images**: Add your own images to `assets/` directory

### 2. Analytics Setup

Add Google Analytics 4 to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 3. Domain Configuration

1. **Custom Domain:**
   - Add domain in your hosting platform
   - Update DNS records
   - Configure SSL certificate

2. **Redirects:**
   - Set up www to non-www redirect (or vice versa)
   - Configure 404 page

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit API keys to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly

### 2. Form Security
- Implement rate limiting
- Add CAPTCHA for spam protection
- Validate all inputs server-side

### 3. HTTPS
- Ensure SSL certificate is active
- Redirect HTTP to HTTPS
- Use secure headers

## 📊 Monitoring & Analytics

### 1. Performance Monitoring
- Set up uptime monitoring
- Monitor page load times
- Track Core Web Vitals

### 2. Conversion Tracking
- Track form submissions
- Monitor email open rates
- Analyze user behavior

### 3. Error Monitoring
- Set up error logging
- Monitor API endpoint health
- Track failed form submissions

## 🚨 Troubleshooting

### Common Issues

1. **Form Not Working:**
   - Check environment variables
   - Verify API endpoint is accessible
   - Check browser console for errors
   - Test API endpoint: `https://your-domain.vercel.app/api/test`

2. **Images Not Loading:**
   - Verify image paths
   - Check file permissions
   - Ensure images are in `assets/` directory

3. **Styling Issues:**
   - Clear browser cache
   - Check CSS file is loading
   - Verify CSS syntax

4. **Deployment Failures:**
   - Check build logs
   - Verify all files are committed
   - Check platform-specific requirements

5. **404 Errors on Vercel:**
   - Ensure `vercel.json` is in root directory
   - Check API routes are properly configured
   - Try using `vercel-simple.json` as alternative
   - Verify file structure matches Vercel requirements

### Getting Help

- **Documentation**: Check platform-specific docs
- **Community**: Stack Overflow, GitHub Issues
- **Support**: Contact platform support teams

## 📈 Post-Deployment Checklist

- [ ] Form submission working
- [ ] Email service integration active
- [ ] Analytics tracking enabled
- [ ] Mobile responsiveness tested
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] SSL certificate active
- [ ] Domain redirects working
- [ ] 404 page configured
- [ ] Monitoring set up

## 🔄 Updates & Maintenance

### Regular Tasks
- Update dependencies
- Monitor performance
- Review analytics
- Backup data
- Test functionality

### Version Control
- Tag releases
- Document changes
- Maintain changelog
- Test before deploying

---

**Need help?** Contact Rocknowe Consulting at hello@rocknowe.com 