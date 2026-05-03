# SummCore Signal - Application Overview

> **Last Updated:** February 2026
> **Version:** 1.0.0
> **Status:** MVP / Development

---

## What Is SummCore Signal?

**SummCore Signal** is a business intelligence web application that helps businesses identify marketing weaknesses and automatically generates professional marketing materials. It combines diagnostic auditing with AI-powered content generation.

### Core Modules

| Module | Description |
|--------|-------------|
| **Marketing Audit** | 14-question diagnostic scoring businesses across 4 categories, generating PDF/PNG marketing assets |
| **AI Compliance** | AI risk & compliance auditing system (GDPR-focused) for businesses using AI tools |

### User Flow

```
Audit → Score → Gap Detection → Auto-Generate Assets → Download/Share
```

1. **Landing Page (`/`)** - Click "Start Audit"
2. **Audit Wizard (`/audit`)** - Answer 14 questions (5-7 minutes)
3. **Results Page (`/results/:auditId`)** - View scores, signals, and recommendations
4. **Generate Assets** - Click "Generate All Assets" with AI provider selection
5. **Assets Page (`/assets/:auditId`)** - Download PDF/PNG files

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14+ (App Router) with TypeScript |
| **Styling** | Tailwind CSS |
| **Database** | SQLite via Prisma ORM |
| **Validation** | Zod |
| **Rendering** | Playwright (headless Chromium) |
| **AI Providers** | OpenAI GPT-4o-mini / Anthropic Claude Sonnet |
| **Monitoring** | Sentry (configured) |

---

## Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── audit/               # Audit CRUD
│   │   ├── results/[auditId]/   # Get results
│   │   ├── generate/            # Start generation
│   │   ├── jobs/[jobId]/        # Job status
│   │   └── download/            # File download
│   ├── audit/                   # Audit wizard page
│   ├── results/[auditId]/       # Results page
│   ├── assets/[auditId]/        # Assets page
│   ├── compliance/              # AI Compliance module
│   ├── faq/                     # FAQ page
│   ├── privacy/                 # Privacy policy
│   └── page.tsx                 # Landing page
├── components/                   # React components
│   ├── ui/                      # Base UI components (Button, Card, Input, etc.)
│   ├── audit/                   # Audit wizard components
│   ├── results/                 # Results components
│   └── assets/                  # Asset components
├── lib/                         # Core libraries
│   ├── db.ts                    # Prisma client
│   ├── utils.ts                 # Utilities
│   ├── validation/              # Zod schemas
│   ├── security/                # Sanitization & rate limiting
│   ├── rules/                   # Scoring engine
│   │   ├── questions.ts         # 14 audit questions
│   │   ├── signals.ts           # Signal definitions
│   │   ├── mappings.ts          # Signal → Asset mapping
│   │   └── engine.ts            # Scoring logic
│   └── llm/                     # LLM abstraction
│       ├── provider.ts          # Provider interface
│       ├── openai.ts            # OpenAI implementation
│       ├── anthropic.ts         # Anthropic implementation
│       └── prompts.ts           # Prompt templates
├── render/                      # Asset rendering
│   ├── templates/               # HTML templates
│   └── render.ts                # Playwright renderer
├── prisma/
│   └── schema.prisma            # Database schema
├── e2e/                         # End-to-end tests
│   └── smoke.spec.ts            # Smoke tests
├── storage/                     # Generated assets (gitignored)
└── Skills/                      # AI skill prompts (WIP)
```

---

## Scoring Categories

| Category | Weight | Description |
|----------|--------|-------------|
| **Credibility** | 25% | Trust signals, social proof, authority indicators |
| **Clarity** | 30% | How clearly you communicate your value proposition |
| **Consistency** | 20% | Brand and messaging alignment across channels |
| **Growth Readiness** | 25% | Infrastructure for capturing and converting leads |

---

## Signal Detection

The system detects up to 6 business issues based on audit answers:

| Code | Description | Severity |
|------|-------------|----------|
| `NO_CLEAR_OFFER` | Unclear value proposition | 9 (Critical) |
| `NO_TRUST_PROOF` | Missing trust signals | 8 (Critical) |
| `WEAK_CTA` | Weak call-to-action | 8 (Critical) |
| `INCONSISTENT_BRAND` | Inconsistent branding | 7 (High) |
| `NO_SOCIAL_PROOF` | Missing social proof | 7 (High) |
| `NO_TARGET_AUDIENCE` | Undefined target audience | 6 (High) |

---

## Generated Assets

| Asset Type | Purpose |
|------------|---------|
| **Company Overview** | One-pager for introductions and partnerships |
| **What We Do** | Explainer for clarity on offerings |
| **Why Choose Us** | Credibility sheet with trust signals |

*Output formats: PDF and PNG*

---

## The Good

### Architecture & Code Quality
- **Modern stack** with Next.js 14 App Router and TypeScript
- **Well-organized structure** with clean separation of concerns
- **Multi-LLM support** via abstracted provider pattern (OpenAI + Anthropic)
- **Type safety** with Zod schemas for runtime validation
- **Clean API routes** with proper error handling and HTTP status codes
- **Professional templates** with proper HTML escaping

### Security Measures
- **Input sanitization** (HTML stripping, URL removal, length limits)
- **Prompt injection detection** (blocks "ignore previous", "jailbreak", "DAN mode", etc.)
- **Path traversal protection** for file downloads
- **Rate limiting** for generation endpoints
- **Cascade deletes** in Prisma schema prevent orphan records

### Business Logic
- **Smart signal detection** based on answer combinations
- **Weighted scoring engine** for nuanced category scores
- **Prioritized recommendations** based on detected signals
- **Graceful degradation** with fallback content if LLM fails

### Testing
- **E2E smoke tests** covering critical user paths
- **Console error checking** in test suite

---

## The Bad

### Testing Gaps
- **No unit tests** for core business logic (engine, scoring, sanitization)
- **No integration tests** for API endpoints
- **No test coverage** for LLM providers or rendering

### Production Readiness Issues
- **SQLite database** not suitable for high-traffic production
- **No authentication** - anyone can create/access audits
- **No CSRF protection** visible on API routes
- **No database migrations** - uses `prisma db push` only
- **No API documentation** (OpenAPI/Swagger)

### Code Smells
- **JSON strings in database** (`answersJson`, `scoresJson`) - loses type safety
- **Hardcoded magic numbers** scattered across files
- **Browser instance reuse** in renderer could cause memory leaks
- **No pagination** on list endpoints

### UX Gaps
- **Landing page promises 7 assets** but only 3 are implemented
- **No progress persistence** if user closes browser during quiz

---

## Neutral Observations

- AWS S3 dependencies present but usage unclear
- Skills folder contains work-in-progress AI prompt files
- Compliance module mixed with marketing module (could be separated)
- Redis dependency exists but caching implementation unclear

---

## Security Features

### Input Sanitization (`lib/security/sanitize.ts`)

```typescript
// Patterns blocked for prompt injection protection
- /ignore\s+(previous|all|above)/i
- /disregard\s+(previous|all|above)/i
- /system\s*prompt/i
- /jailbreak/i
- /DAN\s*mode/i
// ... and more
```

### Path Validation
- Downloads restricted to `/storage` directory
- Only `.pdf` and `.png` extensions allowed
- Path traversal (`..`, `~`) blocked

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/audit` | Create new audit |
| `PATCH` | `/api/audit` | Update audit answers |
| `GET` | `/api/audit?id=:id` | Get audit by ID |
| `GET` | `/api/results/:auditId` | Get scores, signals, assets |
| `POST` | `/api/generate` | Start asset generation |
| `GET` | `/api/jobs/:jobId` | Get job status |
| `GET` | `/api/download?path=:path` | Download file |

---

## Database Schema (Key Models)

### Marketing Module
- `Audit` - Main audit record with answers and scores
- `Signal` - Detected business issues
- `Asset` - Generated marketing materials
- `Job` - Background job tracking

### Compliance Module
- `ComplianceAudit` - AI compliance assessment
- `AITool` - Inventory of AI tools used
- `RiskFinding` - Identified compliance risks
- `RemediationItem` - Fix tracking
- `GeneratedPolicy` - AI-generated policy documents

---

## Recommendations for Production

### Critical (Must Have)
1. **Add authentication** - User accounts and access control
2. **Switch to PostgreSQL** - SQLite not suitable for production
3. **Add unit tests** - Cover scoring engine, sanitization, API routes
4. **Implement proper migrations** - Version control for schema changes
5. **Add rate limiting at infrastructure level** - Beyond application code

### Important (Should Have)
1. **Implement the missing assets** - LinkedIn banner, Instagram post, elevator pitch, email signature
2. **Add error monitoring** - Configure Sentry error boundaries
3. **Add API documentation** - OpenAPI/Swagger spec
4. **Implement progress persistence** - Save wizard state to localStorage or DB
5. **Add audit logging** - Track who did what for compliance

### Nice to Have
1. **Caching layer** - Redis for LLM responses and computed scores
2. **Pagination** - For audit lists and job history
3. **Webhook notifications** - When asset generation completes
4. **Multi-language support** - i18n for global markets

---

## Overall Assessment

| Aspect | Rating | Notes |
|--------|--------|-------|
| **Architecture** | 8/10 | Clean, modern, extensible |
| **Code Quality** | 7/10 | Good patterns, some tech debt |
| **Security** | 7/10 | Good awareness, needs auth |
| **Testing** | 4/10 | Only smoke tests exist |
| **Production Readiness** | 5/10 | Needs hardening |
| **UX/UI** | 7/10 | Professional, minor gaps |
| **Documentation** | 6/10 | Good README, no API docs |

### **Overall: 7/10**

**Verdict:** A well-built MVP with solid foundations. The architecture is clean, security basics are covered, and core functionality works. Requires production hardening (authentication, PostgreSQL, monitoring, comprehensive tests) before handling real traffic and sensitive user data.

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Generate Prisma client
pnpm db:generate

# Push database schema
pnpm db:push

# Install Playwright browser
npx playwright install chromium

# Start development server
pnpm dev
```

### Environment Variables

```env
DATABASE_URL="file:./dev.db"
OPENAI_API_KEY="sk-..."
ANTHROPIC_API_KEY="sk-ant-..."
DEFAULT_LLM_PROVIDER="openai"
```

---

## License

MIT
