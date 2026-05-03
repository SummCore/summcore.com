# SummCore Boost - Project Overview

## What It Is

SummCore Boost is a Business Health Assessment web application that helps business owners evaluate their company's operational health across five key pillars. Users complete a 26-question quiz and receive a comprehensive health score with actionable insights.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Laravel 11 (PHP 8.2+) |
| Frontend | Blade Templates, Tailwind CSS, Alpine.js |
| Database | SQLite (local) / MySQL (production) |
| Payments | Stripe |
| AI Provider | Anthropic Claude / OpenAI (configurable) |

---

## The Five Pillars

1. **Revenue & Profitability** - Financial health and cash flow
2. **Marketing & Lead Generation** - Customer acquisition effectiveness
3. **Operations & Efficiency** - Process optimization and productivity
4. **Systems & Automation** - Technology adoption and workflows
5. **AI Readiness** - Preparedness for AI integration

---

## Pricing Tiers

| Tier | Price | Features |
|------|-------|----------|
| **Free** | $0 | Basic score, pillar breakdown, top 3 recommendations |
| **Premium** | $29 | Full AI-generated report, priority recommendations |
| **Pro** | $49 | Everything in Premium + AI chat assistant |

---

## User Flow

```
Landing Page → Start Assessment → 26 Questions → Results Page
                                                      ↓
                                              Free: Basic Score
                                              Paid: Full Report + Chat (Pro)
```

1. User lands on homepage, clicks "Start Assessment"
2. Progresses through 26 questions (5-6 per pillar)
3. Answers saved via API to database
4. Results calculated with weighted scoring algorithm
5. Free tier shows score + top recommendations
6. Paid tiers unlock full report and AI chat

---

## Key Files & Structure

```
summcore-boost-laravel/
├── app/
│   ├── Http/Controllers/
│   │   ├── Api/
│   │   │   ├── SessionController.php    # Session management
│   │   │   ├── AnswerController.php     # Save quiz answers
│   │   │   ├── ResultController.php     # Calculate scores
│   │   │   ├── CheckoutController.php   # Stripe payments
│   │   │   ├── ChatController.php       # AI chat endpoint
│   │   │   └── PremiumReportController.php  # AI report generation
│   │   └── PageController.php           # View routes
│   ├── Models/
│   │   ├── Session.php                  # Quiz session
│   │   ├── Answer.php                   # User answers
│   │   └── Payment.php                  # Payment records
│   └── Services/
│       ├── Signal/SessionManager.php    # Session logic
│       └── Ai/AiServiceFactory.php      # AI provider abstraction
├── resources/views/
│   ├── layouts/app.blade.php            # Base layout
│   └── pages/
│       ├── home.blade.php               # Landing page
│       ├── boost.blade.php              # Quiz interface
│       └── results.blade.php            # Results dashboard
├── routes/
│   ├── web.php                          # Page routes
│   └── api.php                          # API endpoints
└── .env                                 # Configuration
```

---

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/boost/sessions` | Create new session |
| POST | `/api/boost/sessions/{id}/answers` | Save answer |
| GET | `/api/boost/sessions/{id}/results` | Get calculated results |
| POST | `/api/boost/checkout/{id}/intent` | Create Stripe payment intent |
| POST | `/api/boost/checkout/{id}` | Process payment |
| POST | `/api/boost/sessions/{id}/premium-report` | Generate AI report |
| POST | `/api/boost/sessions/{id}/chat` | AI chat message |

---

## Environment Variables

```env
# Required
APP_KEY=                          # Laravel encryption key
AI_PROVIDER=anthropic             # "anthropic" or "openai"
ANTHROPIC_API_KEY=sk-ant-...      # If using Anthropic
OPENAI_API_KEY=sk-proj-...        # If using OpenAI

# Stripe (Production)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Database (Production)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=summcore_boost
DB_USERNAME=your_user
DB_PASSWORD=your_password
```

---

## Deployment Target

- **Domain**: boost.summcore.com (subdomain of main SummCore site)
- **Host**: Hostinger
- **Database**: MySQL on Hostinger
- **PHP**: 8.2+ required

---

## Deployment Checklist

- [x] Pricing decided ($29/$49)
- [ ] Stripe account created
- [ ] Stripe API keys obtained
- [ ] Subdomain boost.summcore.com created on Hostinger
- [ ] Laravel files uploaded to Hostinger
- [ ] MySQL database created
- [ ] .env configured on server
- [ ] Migrations run (`php artisan migrate`)
- [ ] APP_KEY generated (`php artisan key:generate`)
- [ ] Live site tested

---

## Features Implemented

- Mobile-responsive design (works on all screen sizes)
- Progress saving (answers persist if user leaves)
- Loading states and error handling
- Toast notifications for user feedback
- Stripe payment integration with test mode fallback
- AI-powered report generation
- AI chat assistant (Pro tier)
- Accessibility (ARIA labels, keyboard navigation)

---

## Current Status

**Development Complete** - Ready for deployment

The application is fully functional in local development. All features are implemented including:
- Quiz flow with 26 questions
- Score calculation algorithm
- Payment processing (test mode active)
- AI report generation
- AI chat functionality

**Next Steps**: Configure Stripe with live keys and deploy to Hostinger.

---

## Contact & Support

Part of the SummCore product family.
