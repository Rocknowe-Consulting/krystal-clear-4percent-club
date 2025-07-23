# Assets Directory

This directory contains all images, logos, and media files for The 4% Club landing page.

## Required Files

### Logos
- `krystal-clear-logo.svg` - Krystal Clear Accounting company logo (recommended size: 200x40px)
- `favicon.ico` - Website favicon (16x16, 32x32, 48x48px)

### Hero Section
- `hero-image.jpg` - Main hero section image showing Kim or successful business owners (recommended size: 600x400px)

### Client Logos (Trust Signals)
- `client-logo-1.svg` - Client company logo 1
- `client-logo-2.svg` - Client company logo 2
- `client-logo-3.svg` - Client company logo 3
- `client-logo-4.svg` - Client company logo 4

### Testimonials
- `testimonial-1.jpg` - Sarah Johnson photo (recommended size: 100x100px, square)
- `testimonial-2.jpg` - Michael Chen photo (recommended size: 100x100px, square)
- `testimonial-3.jpg` - Emma Thompson photo (recommended size: 100x100px, square)

### Social Media
- `og-image.jpg` - Open Graph image for social media sharing (recommended size: 1200x630px)

## Image Guidelines

### Format Requirements
- **Logos**: SVG format preferred for scalability
- **Photos**: JPG format for photos, optimized for web
- **Icons**: SVG or PNG format

### Optimization
- Compress all images for web use
- Use appropriate formats (SVG for logos, JPG for photos)
- Keep file sizes under 200KB for optimal loading

### Accessibility
- Include descriptive alt text in HTML for all images
- Ensure sufficient color contrast for logos
- Test with screen readers

## Placeholder Images

Until you add your own images, you can use placeholder services:

```html
<!-- For hero image -->
<img src="https://via.placeholder.com/600x400/2563eb/ffffff?text=Successful+Business+Owners" alt="Successful UK business owners">

<!-- For testimonials -->
<img src="https://via.placeholder.com/100x100/6b7280/ffffff?text=SJ" alt="Sarah Johnson">

<!-- For client logos -->
<img src="https://via.placeholder.com/120x40/e5e7eb/6b7280?text=Client+Logo" alt="Client Company">
```

## File Structure

```
assets/
├── README.md              # This file
├── krystal-clear-logo.svg # Company logo
├── favicon.ico           # Website favicon
├── hero-image.jpg        # Hero section image
├── client-logo-1.svg     # Client logo 1
├── client-logo-2.svg     # Client logo 2
├── client-logo-3.svg     # Client logo 3
├── client-logo-4.svg     # Client logo 4
├── testimonial-1.jpg     # Sarah Johnson photo
├── testimonial-2.jpg     # Michael Chen photo
├── testimonial-3.jpg     # Emma Thompson photo
└── og-image.jpg          # Social media image
```

## Brand Guidelines

### Colors
- Primary Blue: #2563eb (Krystal Clear brand blue)
- Secondary Orange: #f59e0b (accent color)
- Accent Green: #10b981 (success/progress)
- Text Dark: #1f2937
- Text Light: #6b7280

### Typography
- Font Family: Inter
- Weights: 300, 400, 500, 600, 700

### Logo Usage
- Minimum size: 120px width
- Clear space: 1x logo height on all sides
- Background: White or light backgrounds preferred
- Never stretch or distort the logo

## Performance Tips

1. **Optimize images** using tools like TinyPNG or ImageOptim
2. **Use WebP format** with JPG fallbacks for better compression
3. **Implement lazy loading** for images below the fold
4. **Use appropriate sizes** for different screen resolutions
5. **Cache images** with proper headers for faster loading

## Legal Considerations

- Ensure you have rights to use all images
- Include proper attribution if required
- Respect copyright and licensing terms
- Consider GDPR compliance for any personal photos 