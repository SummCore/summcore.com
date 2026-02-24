# Web App Launch Audit Checklist

> **Purpose:** Use this checklist to audit any web application before launch to ensure it meets quality, performance, SEO, accessibility, and security standards.
>
> **How to Use:** Go through each section and check off items as you verify them. Items marked with 🔴 are critical and must be fixed before launch.

---

## Table of Contents

1. [SEO (Search Engine Optimization)](#1-seo-search-engine-optimization)
2. [AEO (Answer Engine Optimization)](#2-aeo-answer-engine-optimization)
3. [Performance](#3-performance)
4. [Accessibility (A11y)](#4-accessibility-a11y)
5. [Security](#5-security)
6. [Links & Navigation](#6-links--navigation)
7. [Forms & Inputs](#7-forms--inputs)
8. [Images & Media](#8-images--media)
9. [Mobile & Responsive](#9-mobile--responsive)
10. [Browser Compatibility](#10-browser-compatibility)
11. [Analytics & Tracking](#11-analytics--tracking)
12. [Legal & Compliance](#12-legal--compliance)
13. [Social Media Integration](#13-social-media-integration)
14. [Content Quality](#14-content-quality)
15. [Technical Cleanup](#15-technical-cleanup)
16. [Pre-Launch Final Checks](#16-pre-launch-final-checks)

---

## 1. SEO (Search Engine Optimization)

### Meta Tags
- [ ] 🔴 **Title tag** - Unique, descriptive, 50-60 characters, includes primary keyword
- [ ] 🔴 **Meta description** - Compelling, 150-160 characters, includes call-to-action
- [ ] **Meta keywords** - Relevant keywords (less important now but still good practice)
- [ ] **Meta author** - Company/author name
- [ ] **Meta robots** - `index, follow` for public pages, `noindex, nofollow` for private/app pages
- [ ] 🔴 **Canonical URL** - `<link rel="canonical" href="...">` to prevent duplicate content
- [ ] **Language** - `<html lang="en">` attribute set correctly

### Open Graph (Facebook/LinkedIn)
- [ ] `og:type` - website, article, product, etc.
- [ ] `og:url` - Full canonical URL
- [ ] `og:title` - Title for social sharing
- [ ] `og:description` - Description for social sharing
- [ ] `og:image` - Social preview image (1200x630px recommended)
- [ ] `og:site_name` - Website name

### Twitter Cards
- [ ] `twitter:card` - summary, summary_large_image, etc.
- [ ] `twitter:title` - Title for Twitter
- [ ] `twitter:description` - Description for Twitter
- [ ] `twitter:image` - Twitter preview image

### Technical SEO
- [ ] 🔴 **robots.txt** - Exists and properly configured
- [ ] 🔴 **sitemap.xml** - Exists and submitted to search engines
- [ ] **Favicon** - Multiple sizes (16x16, 32x32, apple-touch-icon)
- [ ] **Heading hierarchy** - Only ONE `<h1>` per page, proper H2-H6 structure
- [ ] **URL structure** - Clean, readable URLs (no `?id=123` where avoidable)

### Search Commands to Audit SEO:
```bash
# Check for missing meta descriptions
grep -L 'meta name="description"' *.html

# Check for missing titles
grep -L '<title>' *.html

# Check for multiple H1 tags
grep -c '<h1' *.html

# Check for canonical URLs
grep -L 'rel="canonical"' *.html
```

---

## 2. AEO (Answer Engine Optimization)

> AEO optimizes your content for AI assistants (ChatGPT, Google SGE, Bing Chat, etc.)

### Structured Data (JSON-LD)
- [ ] 🔴 **Organization schema** - Company info, logo, social links
- [ ] 🔴 **WebApplication schema** - For web apps (name, description, features)
- [ ] **FAQPage schema** - Common questions and answers (great for AI snippets)
- [ ] **HowTo schema** - Step-by-step instructions
- [ ] **Product schema** - If selling products/services
- [ ] **Review/Rating schema** - If you have reviews

### Content Structure for AI
- [ ] **Clear headings** - Questions as H2/H3 headings (e.g., "What is...?", "How do I...?")
- [ ] **Direct answers** - First sentence answers the question directly
- [ ] **Bullet points** - Lists for features, steps, benefits
- [ ] **Tables** - For comparisons and structured data

### Validation
- [ ] Test structured data: https://validator.schema.org/
- [ ] Test rich results: https://search.google.com/test/rich-results

---

## 3. Performance

### Critical Performance Issues
- [ ] 🔴 **Production builds** - NO development/debug versions of libraries
  ```
  ❌ react.development.js
  ✅ react.production.min.js
  ```
- [ ] 🔴 **Minified CSS/JS** - All CSS and JS files minified for production
- [ ] 🔴 **No blocking scripts** - Use `async` or `defer` on non-critical scripts

### Image Optimization
- [ ] **Compressed images** - Use TinyPNG, ImageOptim, or similar
- [ ] **Modern formats** - WebP or AVIF where possible
- [ ] **Lazy loading** - `loading="lazy"` on below-fold images
- [ ] **Responsive images** - `srcset` for different screen sizes
- [ ] **Specified dimensions** - `width` and `height` attributes to prevent layout shift

### Loading Performance
- [ ] **Critical CSS inlined** - Above-fold styles in `<head>`
- [ ] **Preconnect hints** - `<link rel="preconnect">` for external domains
- [ ] **Preload critical resources** - Fonts, hero images
- [ ] **Gzip/Brotli compression** - Server-side compression enabled

### Performance Metrics (Target Scores)
- [ ] **Lighthouse Performance:** 90+
- [ ] **First Contentful Paint (FCP):** < 1.8s
- [ ] **Largest Contentful Paint (LCP):** < 2.5s
- [ ] **Cumulative Layout Shift (CLS):** < 0.1
- [ ] **Time to Interactive (TTI):** < 3.8s

### Testing Tools
- Google Lighthouse: DevTools > Lighthouse
- PageSpeed Insights: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/
- GTmetrix: https://gtmetrix.com/

---

## 4. Accessibility (A11y)

### Basic Accessibility
- [ ] 🔴 **Alt text on images** - Descriptive alt text, empty `alt=""` only for decorative images
- [ ] 🔴 **Form labels** - Every input has an associated `<label>` or `aria-label`
- [ ] 🔴 **Keyboard navigation** - All interactive elements reachable via Tab key
- [ ] 🔴 **Focus indicators** - Visible focus states on buttons, links, inputs
- [ ] **Skip link** - "Skip to main content" link for screen readers

### ARIA & Semantic HTML
- [ ] **Semantic elements** - Use `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>`
- [ ] **ARIA labels** - `aria-label` on icon-only buttons
- [ ] **ARIA landmarks** - `role="main"`, `role="navigation"`, etc.
- [ ] **ARIA live regions** - For dynamic content updates

### Visual Accessibility
- [ ] 🔴 **Color contrast** - 4.5:1 minimum for normal text, 3:1 for large text
- [ ] **Don't rely on color alone** - Use icons, text, patterns too
- [ ] **Readable fonts** - Minimum 16px body text
- [ ] **Resizable text** - Page works at 200% zoom

### Testing Tools
- WAVE: https://wave.webaim.org/
- axe DevTools: Browser extension
- Color contrast checker: https://webaim.org/resources/contrastchecker/

### Search Commands:
```bash
# Find images without alt text
grep -E '<img[^>]*(?!alt=)[^>]*>' *.html

# Find empty alt attributes
grep 'alt=""' *.html

# Count aria-label usage
grep -c 'aria-label' *.html
```

---

## 5. Security

### HTTPS & Headers
- [ ] 🔴 **HTTPS everywhere** - All pages served over HTTPS
- [ ] 🔴 **HTTP to HTTPS redirect** - Automatic redirect
- [ ] **HSTS header** - `Strict-Transport-Security`
- [ ] **Content Security Policy** - CSP header configured
- [ ] **X-Frame-Options** - Prevent clickjacking
- [ ] **X-Content-Type-Options** - `nosniff`

### Authentication & Data
- [ ] 🔴 **Secure cookies** - `HttpOnly`, `Secure`, `SameSite` flags
- [ ] 🔴 **No secrets in code** - API keys, passwords not in frontend code
- [ ] **Input validation** - Server-side validation on all inputs
- [ ] **SQL injection prevention** - Parameterized queries
- [ ] **XSS prevention** - Sanitize user input, escape output

### API Security
- [ ] **Rate limiting** - Prevent abuse
- [ ] **CORS configured** - Only allow necessary origins
- [ ] **Authentication required** - Protected endpoints secured

### Search Commands:
```bash
# Find hardcoded API keys (check manually!)
grep -rE '(api[_-]?key|apikey|secret|password)\s*[:=]' *.js *.html

# Find console.log statements (may leak data)
grep -c 'console\.' *.html *.js
```

---

## 6. Links & Navigation

### Internal Links
- [ ] 🔴 **No broken links** - All internal links work
- [ ] 🔴 **No placeholder links** - No `href="#"` or `href="javascript:void(0)"`
- [ ] **Consistent navigation** - Same nav structure across pages
- [ ] **Breadcrumbs** - For deep page structures
- [ ] **404 page** - Custom, helpful 404 page exists

### External Links
- [ ] **Open in new tab** - `target="_blank"` for external links
- [ ] **Security** - `rel="noopener noreferrer"` on external links
- [ ] **Check external links** - Verify they still work

### Search Commands:
```bash
# Find placeholder links
grep 'href="#"' *.html

# Find javascript void links
grep 'javascript:void' *.html

# Count external links
grep -E 'href="https?://' *.html | wc -l
```

---

## 7. Forms & Inputs

### Form Accessibility
- [ ] 🔴 **Labels** - Every input has a `<label>` with matching `for` attribute
- [ ] **Placeholders** - NOT used as replacement for labels
- [ ] **Required fields** - Marked with `required` attribute and visual indicator
- [ ] **Error messages** - Clear, specific error messages
- [ ] **Success feedback** - Confirmation after successful submission

### Form Validation
- [ ] **Client-side validation** - HTML5 validation attributes (`required`, `type`, `pattern`)
- [ ] 🔴 **Server-side validation** - Never trust client-side only
- [ ] **Input types** - Correct types (`email`, `tel`, `url`, `number`)
- [ ] **Autocomplete** - `autocomplete` attributes for common fields

### Form Security
- [ ] 🔴 **CSRF protection** - Token validation
- [ ] **Honeypot fields** - For spam prevention
- [ ] **Rate limiting** - Prevent form spam

---

## 8. Images & Media

### Image Checklist
- [ ] 🔴 **Alt text** - Descriptive alt text on all meaningful images
- [ ] **Decorative images** - Use `alt=""` or CSS background
- [ ] **File size** - Images under 200KB where possible
- [ ] **Dimensions** - `width` and `height` attributes specified
- [ ] **Lazy loading** - `loading="lazy"` on below-fold images
- [ ] **Responsive** - Different sizes for different screens

### Favicon
- [ ] `favicon.ico` - 16x16, 32x32
- [ ] `apple-touch-icon.png` - 180x180
- [ ] `favicon-192.png` - For Android
- [ ] `favicon-512.png` - For PWA

### Social Preview Images
- [ ] **OG image** - 1200x630px
- [ ] **Twitter image** - 1200x600px minimum

---

## 9. Mobile & Responsive

### Viewport & Meta
- [ ] 🔴 **Viewport meta** - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- [ ] **No horizontal scroll** - Content fits viewport
- [ ] **Touch targets** - Buttons/links at least 44x44px

### Responsive Design
- [ ] **Mobile layout** - Works on 320px width
- [ ] **Tablet layout** - Works on 768px width
- [ ] **Desktop layout** - Works on 1024px+ width
- [ ] **Text readable** - No zooming required to read

### Testing
- [ ] Chrome DevTools mobile emulation
- [ ] Real device testing (iOS Safari, Android Chrome)
- [ ] BrowserStack or similar for cross-device testing

---

## 10. Browser Compatibility

### Minimum Browser Support
- [ ] Chrome (last 2 versions)
- [ ] Firefox (last 2 versions)
- [ ] Safari (last 2 versions)
- [ ] Edge (last 2 versions)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Compatibility Checks
- [ ] **CSS prefixes** - Use Autoprefixer
- [ ] **JS polyfills** - For older browsers if needed
- [ ] **Feature detection** - Modernizr or similar
- [ ] **Graceful degradation** - Works without JS (basic functionality)

---

## 11. Analytics & Tracking

### Analytics Setup
- [ ] **Google Analytics 4** - Installed and verified
- [ ] **Google Search Console** - Site verified, sitemap submitted
- [ ] **Bing Webmaster Tools** - Site verified (optional)

### Event Tracking
- [ ] **Button clicks** - Track important CTAs
- [ ] **Form submissions** - Track conversions
- [ ] **Error tracking** - Log JavaScript errors
- [ ] **Page views** - Track navigation

### Privacy Compliance
- [ ] **Cookie consent** - Banner for GDPR/CCPA
- [ ] **Analytics opt-out** - Option to disable tracking
- [ ] **Anonymize IP** - If required by region

---

## 12. Legal & Compliance

### Required Pages
- [ ] 🔴 **Privacy Policy** - How you handle user data
- [ ] 🔴 **Terms of Service** - Usage terms and conditions
- [ ] **Cookie Policy** - If using cookies
- [ ] **Refund Policy** - If selling products/services
- [ ] **Contact page** - Way to reach you

### Compliance
- [ ] **GDPR** (EU) - Cookie consent, data access, deletion rights
- [ ] **CCPA** (California) - Do Not Sell My Info option
- [ ] **ADA/WCAG** - Accessibility compliance
- [ ] **Copyright notice** - © Year Company Name

---

## 13. Social Media Integration

### Social Links
- [ ] **Social icons** - Links to active profiles only
- [ ] **Working links** - All social links verified
- [ ] **Consistent branding** - Same handle across platforms

### Share Functionality
- [ ] **Share buttons** - If applicable
- [ ] **Preview testing** - Test how links appear when shared
  - Facebook: https://developers.facebook.com/tools/debug/
  - Twitter: https://cards-dev.twitter.com/validator
  - LinkedIn: https://www.linkedin.com/post-inspector/

---

## 14. Content Quality

### Text Content
- [ ] **Spell check** - No typos
- [ ] **Grammar check** - Proper grammar
- [ ] **Placeholder text** - No "Lorem ipsum" in production
- [ ] **Consistent voice** - Same tone throughout
- [ ] **Clear CTAs** - Action-oriented button text

### Visual Content
- [ ] **High quality images** - No pixelated/stretched images
- [ ] **Consistent style** - Same visual language
- [ ] **No placeholder images** - All images are final

---

## 15. Technical Cleanup

### Code Cleanup
- [ ] 🔴 **Remove console.log** - No debugging statements in production
- [ ] 🔴 **Remove commented code** - Clean up old code
- [ ] **Remove unused CSS** - PurgeCSS or similar
- [ ] **Remove unused JS** - Tree shaking
- [ ] **Consistent formatting** - Prettier or similar

### Search Commands:
```bash
# Count console statements
grep -r 'console\.' *.html *.js | wc -l

# Find TODO comments
grep -rn 'TODO\|FIXME\|HACK' *.html *.js

# Find commented code blocks
grep -n '// ' *.js | head -50
```

### Error Handling
- [ ] **Custom error pages** - 404, 500 pages
- [ ] **JS error handling** - Try/catch for critical operations
- [ ] **Offline handling** - Graceful degradation

---

## 16. Pre-Launch Final Checks

### Domain & Hosting
- [ ] **Domain configured** - DNS pointing correctly
- [ ] **SSL certificate** - Valid and not expiring soon
- [ ] **WWW redirect** - www → non-www or vice versa
- [ ] **Trailing slash** - Consistent URL structure

### Backups & Recovery
- [ ] **Database backup** - Recent backup exists
- [ ] **Code backup** - In version control (Git)
- [ ] **Rollback plan** - Know how to revert if issues

### Monitoring
- [ ] **Uptime monitoring** - Pingdom, UptimeRobot, etc.
- [ ] **Error monitoring** - Sentry, LogRocket, etc.
- [ ] **Performance monitoring** - Core Web Vitals tracking

### Final Testing
- [ ] **Full user journey** - Test complete flows
- [ ] **Payment testing** - If applicable, test with real cards
- [ ] **Email testing** - Verify all emails send correctly
- [ ] **Load testing** - Ensure server can handle traffic

---

## Audit Summary Template

```markdown
## Audit Results for [App Name]
**Date:** YYYY-MM-DD
**Auditor:** [Name]

### Critical Issues (Must Fix) 🔴
- [ ] Issue 1
- [ ] Issue 2

### High Priority Issues
- [ ] Issue 1
- [ ] Issue 2

### Medium Priority Issues
- [ ] Issue 1
- [ ] Issue 2

### Low Priority / Nice to Have
- [ ] Issue 1
- [ ] Issue 2

### Passed Checks ✅
- Item 1
- Item 2

### Notes
- Additional observations
```

---

## Quick Reference Commands

```bash
# === SEO Checks ===
grep -L 'meta name="description"' *.html    # Missing meta descriptions
grep -c '<h1' *.html                        # H1 count per file
grep -L 'rel="canonical"' *.html            # Missing canonical

# === Accessibility Checks ===
grep 'alt=""' *.html                        # Empty alt attributes
grep -c 'aria-label' *.html                 # ARIA usage

# === Performance Checks ===
grep 'development.js' *.html                # Dev builds in prod
grep -c 'console\.' *.html *.js             # Console statements

# === Link Checks ===
grep 'href="#"' *.html                      # Placeholder links
grep -E 'href="https?://' *.html            # External links

# === Security Checks ===
grep -rE '(api[_-]?key|secret)' *.js        # Potential exposed secrets
```

---

## Resources

- **SEO:** [Google Search Central](https://developers.google.com/search)
- **Accessibility:** [WebAIM](https://webaim.org/)
- **Performance:** [web.dev](https://web.dev/)
- **Security:** [OWASP](https://owasp.org/)
- **Schema:** [Schema.org](https://schema.org/)
- **Validation:** [W3C Validator](https://validator.w3.org/)

---

*Last Updated: January 2025*
