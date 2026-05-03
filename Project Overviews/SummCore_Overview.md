# SummCore - Comprehensive Project Overview

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Value Proposition & Mission](#2-value-proposition--mission)
3. [Technology Stack](#3-technology-stack)
4. [Directory Structure](#4-directory-structure)
5. [Core Modules](#5-core-modules)
6. [Data Structures & Interfaces](#6-data-structures--interfaces)
7. [Architecture Patterns](#7-architecture-patterns)
8. [Component Interaction Flow](#8-component-interaction-flow)
9. [Dependencies & External Libraries](#9-dependencies--external-libraries)
10. [SEO & Technical Metadata](#10-seo--technical-metadata)
11. [Security Implementation](#11-security-implementation)
12. [Performance Considerations](#12-performance-considerations)
13. [Development Guidelines](#13-development-guidelines)
14. [Known Issues & Roadmap](#14-known-issues--roadmap)
15. [Quick Reference](#15-quick-reference)

---

## 1. Project Overview

| Attribute | Value |
|-----------|-------|
| **Project Name** | SummCore |
| **Type** | Web-based SaaS platform for innovation consulting and SME/startup growth |
| **Primary URL** | https://summcore.com |
| **Technology Stack** | HTML5, CSS3, JavaScript (ES6+), React 18, PHP, Tailwind CSS |
| **Architecture** | Static website with embedded interactive tools |

SummCore is an **innovation consulting platform** designed to help SMEs and startups unlock growth through free interactive business tools, expert consultation services, strategic growth frameworks, and professional document generation.

---

## 2. Value Proposition & Mission

### Core Mission
> *"Where imagination meets possibility meets reality"*

### Key Offerings

1. **Free Interactive Business Tools** - Calculators, generators, and assessment tools
2. **Expert Consultation Services** - Free consultancy offered to 5 portfolio clients
3. **Strategic Growth Frameworks** - SWOT, Business Model Canvas, revenue forecasting
4. **Professional Document Generation** - Invoices, quotations, and business plans

### Target Audience
- Small and Medium Enterprises (SMEs)
- Startups seeking growth strategies
- Entrepreneurs needing business planning tools

---

## 3. Technology Stack

### Frontend Technologies

| Layer | Technologies | Usage |
|-------|--------------|-------|
| **HTML** | HTML5 | Semantic markup, forms, structure |
| **Styling** | CSS3, Tailwind CSS, Custom CSS | Responsive design, animations, theming |
| **JavaScript** | ES6+, Vanilla JS, React 18 | Logic, interactivity, state management |
| **Charting** | Chart.js, Canvas API | Revenue forecasting visualizations |
| **Export Libraries** | jsPDF, docx.js, SheetJS, FileSaver.js | PDF, Word, Excel exports |
| **Email** | EmailJS | Client-side email integration |
| **PDF Generation** | html2pdf.js, jsPDF | Export and print functionality |

### Backend Technologies

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Server** | PHP 7.x | Email processing, form handling |
| **Email** | PHP mail() + SMTP headers | Sending consultation requests |
| **Logging** | Text file (email_log.txt) | Debug and track email attempts |

### Frameworks & Libraries

```
React 18 (via CDN)
├── react.development.js
├── react-dom.development.js
└── Babel standalone (JSX compilation)

Tailwind CSS (via CDN)
└── Full utility CSS framework

External Libraries:
├── jsPDF (2.5.1) - PDF generation
├── docx.js (7.1.0/8.3.2) - Word document creation
├── SheetJS (0.18.5-0.19.3) - Excel generation
├── FileSaver.js (2.0.5) - File download support
├── EmailJS (3.x) - Email sending
└── html2pdf.js (0.10.1) - HTML to PDF conversion
```

---

## 4. Directory Structure

```
SummCore/
├── index.html                          # Main homepage (landing page)
├── send.php                            # Email form processor
├── robots.txt                          # SEO: crawler instructions
├── sitemap.xml                         # SEO: site structure
├── thank-you.html                      # Form confirmation page
│
├── Business Health Check & Audit Tool/
│   ├── businesshealthcheck.html        # Comprehensive audit questionnaire
│   ├── send.php                        # Form submission processor
│   ├── thank-you.html                  # Success confirmation
│   └── Logo/                           # Assets folder
│
├── Business Strategy Generator/
│   └── smart-business-strategy-generator.html  # SWOT, BMC, 90-day roadmap
│
├── Customer Journey Mapper/            # Business Plan Template Tool
│   ├── index.html                      # Business plan builder
│   └── README.md                       # Tool documentation
│
├── Free Financial Health Checker/
│   └── financial-calculator.html       # Cash flow, runway, break-even
│
├── Invoicing & Quotation/
│   ├── index.html                      # Main invoicing app
│   ├── script.js                       # Invoice logic (26KB)
│   ├── styles.css                      # Styling
│   ├── send.php                        # Email integration
│   └── assets/                         # Logo/media files
│
├── Revenue Calculator/
│   ├── index.html                      # Forecasting interface (69KB)
│   ├── script.js                       # Revenue models (57KB)
│   ├── styles.css                      # Custom styling
│   └── Logo/                           # Additional assets
│
├── blog/
│   ├── index.html                      # Blog landing page
│   ├── seo-checklist-for-smes.html
│   ├── product-led-growth-for-service-businesses.html
│   └── revenue-forecasting-best-practices.html
│
├── Logo/                               # Branding assets (~833KB)
│   ├── SC23.png                        # Primary logo
│   ├── SC31.png                        # Alternative logo
│   └── Social Media/                   # Social platform icons
│
├── .vscode/                            # VS Code workspace settings
│
└── Documentation/
    ├── SEO-Report.md                   # SEO implementation report
    ├── Audit.md                        # Web app launch audit checklist
    ├── ClaudeWorkFlow.md               # Engineering workflow rules
    ├── engineering-workflow.md         # Professional code standards
    └── Now To Do List.txt              # Project development roadmap
```

---

## 5. Core Modules

### 5.1 Homepage (`index.html`)

**Size:** 35KB | **Technology:** React 18 + JSX + Babel + Tailwind CSS

#### React Components

| Component | Purpose |
|-----------|---------|
| `NavBar()` | Sticky navigation with mobile menu |
| `Hero()` | Hero section with animated tagline |
| `Services()` | 3-column services display |
| `Pitch()` | Value proposition section |
| `Tools()` | 6-tool grid display |
| `Consultation()` | Contact form |
| `Footer()` | Footer with links and social icons |
| `App()` | Main container component |

#### Page Sections

1. **Navigation** - Sticky nav with responsive mobile menu
2. **Hero** - Gradient background with word-switching animation
3. **Services** - Idea Generation, Revenue Strategy, Ongoing Support
4. **Pitch** - Free consultancy offer (limited to 5 clients)
5. **Tools** - 6 interactive business tools
6. **Consultation Form** - Contact form with PHP backend
7. **Footer** - Links, contact info, social media

---

### 5.2 Business Health Check & Audit Tool

**Location:** `Business Health Check & Audit Tool/businesshealthcheck.html`
**Size:** 30KB | **Technology:** Vanilla JS + Tailwind CSS + html2pdf + EmailJS

#### Scoring Categories (120 points total)

| Category | Points | Focus Area |
|----------|--------|------------|
| Foundations | 0-20 | Legal, structure, planning |
| Finance | 0-20 | Cash flow, budgeting, financial health |
| Marketing | 0-20 | Visibility, customer acquisition |
| Operations | 0-20 | Efficiency, systems, processes |
| Customer | 0-20 | Satisfaction, retention, loyalty |
| Innovation | 0-20 | R&D, product development |

#### Features

- 20-question interactive questionnaire
- Real-time score calculation
- Visual dashboard with gauges and charts
- Export: PDF, Email, Print
- Consultation booking integration

---

### 5.3 Business Strategy Generator

**Location:** `Business Strategy Generator/smart-business-strategy-generator.html`
**Size:** 51KB | **Technology:** React + Babel + jsPDF + Tailwind CSS

#### Framework Outputs

1. **SWOT Analysis**
   - Strengths, Weaknesses, Opportunities, Threats
   - AI-generated suggestions based on inputs

2. **Business Model Canvas (9 components)**
   - Customer Segments
   - Value Propositions
   - Channels
   - Customer Relationships
   - Revenue Streams
   - Key Resources
   - Key Activities
   - Key Partnerships
   - Cost Structure

3. **90-Day Growth Roadmap**
   - Phase 1 (Days 1-30): Foundation & Quick Wins
   - Phase 2 (Days 31-60): Building Momentum
   - Phase 3 (Days 61-90): Scaling & Optimization

#### Key Functions

```javascript
generateSWOT(formData)     // Creates SWOT analysis
generateBMC(formData)      // Builds Business Model Canvas
generateRoadmap(formData)  // Creates 90-day phase breakdown
```

---

### 5.4 Free Financial Health Checker

**Location:** `Free Financial Health Checker/financial-calculator.html`
**Size:** 27KB | **Technology:** Vanilla JavaScript + Custom CSS

#### Metrics Calculated

| Category | Metrics |
|----------|---------|
| **Cash Flow** | Monthly inflow/outflow, Net cash flow, Cash runway |
| **Profitability** | Revenue, Costs, Gross/Net profit, Profit margin % |
| **Break-Even** | Fixed costs, Variable cost ratio, Break-even units |
| **Health Score** | Composite 0-100 score |

#### Currency Support
USD, EUR, GBP, JPY

---

### 5.5 Invoicing & Quotation App

**Location:** `Invoicing & Quotation/`
**Files:** `index.html`, `script.js` (26KB), `styles.css`
**Technology:** Vanilla JS + jsPDF + docx.js + SheetJS + FileSaver.js + EmailJS

#### Features

| Feature | Description |
|---------|-------------|
| Document Types | Invoice, Quotation |
| Auto-Numbering | INVOICE-YYYYMMDD-XXX format |
| Logo Support | Upload, positioning (right/left/above/below), sizing |
| Dynamic Items | Add/remove line items with auto-calculations |
| Tax Handling | Per-item tax percentage |
| Live Preview | Real-time document preview |

#### Export Options
- PDF (via jsPDF)
- Word (via docx.js)
- Excel (via SheetJS)
- Email (via EmailJS)
- Print (browser dialog)

#### Key Variables

```javascript
items[]          // Array of line items
logoDataUrl      // Base64-encoded logo image
logoWidthPx      // Logo width (60-220px)
logoPosition     // Logo position relative to company info
itemCounter      // Counter for dynamic item IDs
```

---

### 5.6 Revenue Calculator

**Location:** `Revenue Calculator/`
**Files:** `index.html` (69KB), `script.js` (57KB), `styles.css`
**Technology:** Vanilla JS (OOP) + Chart.js + Tailwind CSS

#### Supported Business Models

| Model | Key Inputs |
|-------|------------|
| Product-Based | Unit price, monthly units, COGS, fixed costs, growth rate |
| SaaS/Subscription | MRR, churn rate, CAC, growth rate |
| Professional Services | Hourly rate, billable hours, utilization, overhead |
| Agency/Consulting | Retainers, project value, team costs |
| Marketplace/Platform | Transactions, transaction value, take rate |
| E-commerce/Retail | AOV, orders/month, margin, CAC, fulfillment costs |
| Subscription Box | Box price, COGS, subscribers, churn, shipping |
| Real Estate/Property | Properties, rent, occupancy, management fees |

#### Scenario Planning

Three forecast scenarios for each model:
- **Expected** - Base case
- **Optimistic** - Best case
- **Pessimistic** - Worst case

#### Class Architecture

```javascript
class RevenueForecastingTool {
  // Properties
  chart: ChartInstance
  currentModel: string
  currentScenario: string
  forecastMonths: number
  currencies: Object
  modelConfigs: Object

  // Methods
  constructor()
  getModelConfigs()
  initializeEventListeners()
  setupBusinessModel()
  calculateForecast()
  updateChart()
  exportToCSV()
  exportToPDF()
}
```

---

### 5.7 Customer Journey Mapper (Business Plan Templates)

**Location:** `Customer Journey Mapper/index.html`
**Size:** 17KB | **Technology:** Vanilla JS + jsPDF + docx.js + Tailwind CSS

> **Note:** Despite the folder name, this tool is a **Business Plan Template Generator**

#### Business Plan Sections

1. Executive Summary
2. Company Overview
3. Products/Services
4. Market Analysis
5. Marketing & Sales Strategy
6. Operations Plan
7. Management & Organisation
8. Financial Plan
9. Appendices

#### Sector-Specific Templates

- General
- Retail
- Service-Based
- Manufacturing
- E-commerce
- Technology/Software
- Hospitality
- Creative/Media
- Health & Wellness
- Education & Training
- Construction & Trades

---

## 6. Data Structures & Interfaces

### Consultation Form Data

```javascript
{
  business_name: string,    // Business name
  website: string,          // Website URL (normalized with https://)
  your_name: string,        // Contact person name
  phone: string,            // Phone (optional)
  email: string,            // Email address
  needs: string             // Description of consulting needs
}
```

### Invoice Item Model

```javascript
{
  id: number,              // Unique item ID
  description: string,     // Item/service description
  quantity: number,        // Units/hours
  unitPrice: number,       // Price per unit
  taxPercent: number,      // Tax percentage (0-100)
  subtotal: number         // quantity × unitPrice × (1 + tax/100)
}
```

### Business Model Configuration

```javascript
{
  id: string,              // Field identifier
  label: string,           // User-friendly label
  type: string,            // 'number', 'text', etc.
  default: {
    expected: number,
    optimistic: number,
    pessimistic: number
  },
  tooltip: string          // Help text
}
```

### SWOT Analysis Output

```javascript
{
  strengths: string[],
  weaknesses: string[],
  opportunities: string[],
  threats: string[]
}
```

---

## 7. Architecture Patterns

### Patterns Used

| Pattern | Implementation |
|---------|----------------|
| **Component-Based UI** | React functional components on homepage |
| **MVC-like Pattern** | Model/View/Controller separation in tools |
| **Event-Driven** | JavaScript event handlers for interactivity |
| **Form State** | Input elements and global variables |

### Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Responsive Design** | Mobile-first with media queries (768px, 480px breakpoints) |
| **Accessibility** | aria-labels, semantic HTML, keyboard navigation |
| **Performance** | CDN delivery, lazy loading |
| **Security** | htmlspecialchars() for PHP input sanitization |
| **Usability** | Clear CTAs, intuitive navigation, live previews |

---

## 8. Component Interaction Flow

```
Homepage
├── Navigation → Links to tools
├── Services → Calls to action
├── Consultation Form
│   └── send.php → Email notification → thank-you.html
├── Tools Section → Links to each tool
└── Footer → Social links, contact info

Business Health Check
├── Questionnaire → Real-time scoring
├── Results Dashboard → Export options
│   ├── PDF export
│   ├── Email results
│   └── Print dialog
└── Consultation form

Business Strategy Generator
├── Form inputs → SWOT generation
├── Form inputs → BMC generation
├── Form inputs → 90-day roadmap
└── Export options (PDF, Print)

Revenue Calculator
├── Model selection → Input form
├── Scenario selection → Calculations
├── Forecast engine → Chart visualization
└── Export/Print

Invoicing & Quotation
├── Company info + Logo
├── Client info
├── Dynamic items → Auto-calculations
└── Export (PDF/Word/Excel/Email)

Business Plan Templates
├── Sector selection → Template prompts
├── Logo + Content → Live preview
└── Export (PDF/Print/Email)
```

### Form Submission Flow

```
User fills form on homepage
        ↓
JavaScript validates URL format (normalizeWebsiteUrlHome)
        ↓
Form submits to send.php via POST
        ↓
PHP script:
  - Sanitizes inputs with htmlspecialchars()
  - Validates required fields
  - Logs attempt to email_log.txt
  - Constructs email with headers
  - Sends via mail() function
  - Logs success/failure
        ↓
Redirects to thank-you.html on success
```

---

## 9. Dependencies & External Libraries

| Library | Version | Purpose | CDN Pattern |
|---------|---------|---------|-------------|
| React | 18.x | UI framework | `unpkg.com/react@18` |
| React DOM | 18.x | DOM binding | `unpkg.com/react-dom@18` |
| Babel Standalone | Latest | JSX compilation | `unpkg.com/@babel/standalone` |
| Tailwind CSS | Latest | Utility CSS | `cdn.tailwindcss.com` |
| jsPDF | 2.5.1 | PDF generation | `cdnjs.cloudflare.com/jspdf` |
| docx.js | 7.1.0/8.3.2 | Word docs | `cdnjs.cloudflare.com/docx` |
| SheetJS | 0.18.5/0.19.3 | Excel export | `cdnjs.cloudflare.com/xlsx` |
| FileSaver.js | 2.0.5 | File saving | `cdnjs.cloudflare.com/FileSaver.js` |
| EmailJS | 3.x | Email API | `cdn.jsdelivr.net/npm/emailjs-com` |
| html2pdf.js | 0.10.1 | HTML to PDF | `cdnjs.cloudflare.com/html2pdf.js` |

---

## 10. SEO & Technical Metadata

### SEO Implementation Status

| Component | Status |
|-----------|--------|
| robots.txt | ✅ Implemented |
| sitemap.xml | ✅ Implemented |
| Meta Tags | ✅ Implemented |
| Open Graph | ✅ Implemented |
| Twitter Cards | ✅ Implemented |
| JSON-LD Schema | ✅ Implemented |
| Canonical URLs | ✅ Implemented |
| Mobile Viewport | ✅ Implemented |
| Heading Hierarchy | ✅ Implemented |
| Image Alt Text | ✅ Implemented |

### Sitemap Structure

| Page | Priority |
|------|----------|
| Homepage | 1.0 |
| Business Health Check | 0.8 |
| Business Strategy Generator | 0.8 |
| Customer Journey Mapper | 0.8 |
| Financial Health Checker | 0.8 |
| Invoicing & Quotation | 0.7 |
| Revenue Calculator | 0.8 |

---

## 11. Security Implementation

### Current Security Measures

| Measure | Implementation |
|---------|----------------|
| Input Sanitization | PHP `htmlspecialchars()` on all inputs |
| URL Validation | JavaScript URL normalization |
| Email Headers | Proper SMTP headers configured |
| Audit Logging | Plain text email_log.txt |
| Form Validation | Client-side required field checks |

### Security Gaps to Address

| Gap | Risk Level | Recommendation |
|-----|------------|----------------|
| No CSRF Protection | Medium | Add token validation |
| No Rate Limiting | Medium | Implement request limiting |
| Plain Text Logging | Low | Consider encrypted logs |
| No HTTPS Enforcement | Medium | Add HTTPS redirect |

---

## 12. Performance Considerations

### Current Issues

| Issue | Impact | Details |
|-------|--------|---------|
| React Dev Builds | High | Using unminified development builds (~130KB overhead) |
| Tailwind CDN | Medium | Full unoptimized CSS, no tree-shaking |
| Image Assets | Medium | Large PNGs, no WebP alternatives |
| No JS Minification | Low-Medium | Custom JS not minified |

### Recommendations

1. **Switch to React production builds** - Critical
2. **Self-host optimized Tailwind CSS** - High priority
3. **Compress and convert images to WebP** - Medium priority
4. **Minify custom JavaScript** - Medium priority
5. **Implement lazy loading** - Low priority
6. **Consider service worker** - Future enhancement

---

## 13. Development Guidelines

### Code Quality Standards

From `engineering-workflow.md` and `ClaudeWorkFlow.md`:

| Standard | Guideline |
|----------|-----------|
| File Size | Keep under 200 lines |
| Function Size | Keep under 40 lines |
| Naming | Descriptive, boring naming conventions |
| Separation | One responsibility per file |
| Quality | Client-ready, professional standards |

### Before Making Changes

1. Think through the problem first
2. Read existing files and confirm assumptions
3. Check in with stakeholders for major changes
4. Plan simplicity-first approach

### Simplicity Principle

> *"Accuracy > speed, simplicity > cleverness, small changes > big refactors"*

### Documentation Requirements

- Maintain updated architecture documentation
- Explain what changed and why
- List affected files
- Note side effects and follow-ups

---

## 14. Known Issues & Roadmap

### Priority 1: Feature Additions

#### Business Health Check
- [ ] Export to PDF, Google Sheets, Word, Excel, CSV
- [ ] Fix PDF export layout (text moved down issue)
- [ ] Auto-email results to info@summcore.com
- [ ] Consultation booking form

#### Revenue Calculator
- [ ] CSV/PDF/Word/Excel/Google Sheets exports
- [ ] Print option
- [ ] Chart improvements

#### Business Strategy Generator
- [ ] Multiple export formats
- [ ] Print functionality

#### Customer Journey Mapper
- [ ] Review purpose and UX
- [ ] Export options
- [ ] Print option

#### Financial Health Checker
- [ ] Only populate results after "Calculate" click
- [ ] Multiple export formats
- [ ] Print functionality

#### Invoicing & Quotation
- [ ] CSV/PDF/Word/Excel exports
- [ ] Google Sheets integration
- [ ] Logo in exports (currently preview only)

### Priority 2: Technical Improvements

- [ ] Use React production builds
- [ ] Implement image optimization
- [ ] Add comprehensive error handling
- [ ] Implement rate limiting
- [ ] Add CSRF token protection
- [ ] Proper EmailJS configuration management

---

## 15. Quick Reference

### File Entry Points

| Tool | Path |
|------|------|
| Homepage | `/index.html` |
| Business Health Check | `/Business Health Check & Audit Tool/businesshealthcheck.html` |
| Strategy Generator | `/Business Strategy Generator/smart-business-strategy-generator.html` |
| Financial Checker | `/Free Financial Health Checker/financial-calculator.html` |
| Invoicing | `/Invoicing & Quotation/index.html` |
| Revenue Calculator | `/Revenue Calculator/index.html` |
| Business Plan | `/Customer Journey Mapper/index.html` |
| Blog | `/blog/index.html` |

### Key Configuration Files

| File | Purpose |
|------|---------|
| `robots.txt` | Search engine crawling rules |
| `sitemap.xml` | Site structure for SEO |
| `send.php` | Email form processor |

### Contact Information

| Channel | Value |
|---------|-------|
| Email | info@summcore.com, support@summcore.com |
| Social | X (Twitter), Instagram, TikTok |
| Domain | summcore.com |

### File Statistics

| Metric | Count |
|--------|-------|
| Total HTML files | 16 |
| Total JavaScript files | 3 (+ inline React) |
| Total CSS files | 3 |
| Total PHP files | 2 |
| Total Markdown docs | 6 |
| Total directory size | ~1.3MB |
| Largest directory | Logo/ (833KB) |

---

## Appendix: Scalability Path

### Current Limitations

- Static site architecture (no database)
- Email-based workflow only
- No user accounts/persistence
- No real-time collaboration

### Future Growth Path

1. Implement backend database (PostgreSQL/MySQL)
2. Add user account system
3. Create dashboard for saved work
4. Implement real-time collaboration
5. Build admin panel for lead management
6. Add analytics and conversion tracking

---

*Document generated: February 2026*
*Last updated: February 4, 2026*
