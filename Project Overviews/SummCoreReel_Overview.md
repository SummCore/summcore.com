# SummCore Reel - Comprehensive Overview

## Project Summary

| Property | Value |
|----------|-------|
| **Name** | SummCore Reel (codebase: ClipForge) |
| **Type** | AI-powered marketing video generator |
| **Purpose** | Automatically transforms any website into engaging short-form videos (TikTok, Instagram Reels, YouTube Shorts) |
| **Version** | 0.1.0 (MVP - Initial Release) |
| **Status** | Active development |

---

## Table of Contents

1. [Overall Project Structure & Architecture](#1-overall-project-structure--architecture)
2. [App-Specific Purpose & Responsibilities](#2-app-specific-purpose--responsibilities)
3. [Key Technologies & Frameworks](#3-key-technologies--frameworks)
4. [Database Schema & Data Models](#4-database-schema--data-models)
5. [API Routes & Purposes](#5-api-routes--purposes)
6. [Core Business Logic & Workflows](#6-core-business-logic--workflows)
7. [Remotion Video Generation Setup](#7-remotion-video-generation-setup)
8. [Queue System & Job Processing](#8-queue-system--job-processing)
9. [Configuration Files](#9-configuration-files)
10. [Environment Variables & Configuration](#10-environment-variables--configuration)
11. [Documentation & README](#11-documentation--readme)
12. [Development Setup & Commands](#12-development-setup--commands)
13. [Security & Deployment Notes](#13-security--deployment-notes)
14. [Key Files & Paths](#14-key-files--paths)
15. [Technology Stack Summary](#15-technology-stack-summary)
16. [Workflow Diagram](#16-workflow-diagram)
17. [Notable Technical Decisions](#17-notable-technical-decisions)
18. [Known Constraints & Limitations](#18-known-constraints--limitations)

---

## 1. Overall Project Structure & Architecture

### Monorepo Setup

Turborepo-based pnpm workspace with three main divisions:

```
SummCore Reel/
├── apps/
│   ├── web/          # Next.js 14 frontend (port 3000)
│   └── worker/       # BullMQ background job processors
├── packages/
│   └── shared/       # Shared code: Prisma ORM, Zod schemas, AI providers
├── storage/          # Local file storage for assets (gitignored)
├── scripts/          # Setup and deployment scripts
└── Skills/           # Claude-related functionality
```

### Architecture Pattern

Microservices-inspired with clear separation of concerns:

- **Frontend:** Next.js with App Router (TypeScript, Tailwind CSS)
- **Backend:** Node.js BullMQ workers for async job processing
- **Database:** PostgreSQL with Prisma ORM
- **Queue System:** Redis + BullMQ for job orchestration
- **Web Crawling:** Playwright with Chrome/Chromium
- **Video Rendering:** Remotion (React-based video composition framework)
- **AI:** OpenAI GPT-4o with provider abstraction pattern

---

## 2. App-Specific Purpose & Responsibilities

### apps/web - Frontend Application

**Framework:** Next.js 14 (App Router)

**Primary Functions:**
- User interface for project creation and management
- Project dashboard with crawl/generation/render status
- Video editor with scene reordering, text editing, duration adjustment
- Asset browsing and video export/download
- Marketing analysis visualization

**Key Pages:**

| Route | Purpose |
|-------|---------|
| `/` | Landing page with features and CTA |
| `/projects` | Project listing |
| `/projects/new` | URL input form for new projects |
| `/projects/[id]` | Project overview/dashboard |
| `/projects/[id]/analysis` | Crawled sections & analysis |
| `/projects/[id]/editor` | Scene editor interface |
| `/projects/[id]/export` | Video player & captions |

**API Routes (Next.js Route Handlers):**

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/projects` | Create project + enqueue crawl |
| GET | `/api/projects` | List all projects |
| GET | `/api/projects/[id]` | Get project with all relations |
| PATCH | `/api/projects/[id]` | Update project (name, videoFormat) |
| DELETE | `/api/projects/[id]` | Delete project |
| POST | `/api/projects/[id]/generate` | Enqueue AI generation |
| POST | `/api/projects/[id]/render` | Enqueue video render |
| POST | `/api/projects/[id]/crawl` | Enqueue website crawl |
| PATCH | `/api/projects/[id]/scenes/[sceneId]` | Update scene |
| GET | `/api/assets/[assetId]` | Serve asset file |

### apps/worker - Background Job Processor

**Framework:** Node.js with BullMQ, Playwright, Remotion

**Primary Functions:**
- Crawl websites using Playwright
- Detect marketing sections (hero, features, testimonials, pricing, CTA, etc.)
- Capture high-quality screenshots of sections
- Generate AI marketing content and storyboards
- Render final MP4 videos with Remotion

**Three BullMQ Workers:**

| Worker | File | Concurrency | Purpose |
|--------|------|-------------|---------|
| Crawl Worker | `crawl-single-url.processor.ts` | 2 | Navigate URL, detect sections, capture screenshots |
| AI Worker | `ai-generate-marketing.processor.ts` | 3 | Generate marketing angles, hooks, overlays, CTAs, storyboards |
| Render Worker | `render-draft-video.processor.ts` | 1 | Bundle Remotion, render video, export MP4 |

### packages/shared - Shared Code Library

**Exports:**
- Prisma client and schema
- Zod validation schemas (projects, crawls, AI output, scenes)
- AI provider interface and implementations
- AI prompts for marketing analysis and storyboarding
- Constants (section types, video formats, job names)
- Type definitions

---

## 3. Key Technologies & Frameworks

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Frontend Framework** | Next.js | 14.2.0 | Web app with App Router |
| **Runtime** | Node.js | 20+ | Server-side execution |
| **Package Manager** | pnpm | 9.0.0 | Fast monorepo management |
| **Build Orchestration** | Turborepo | 2.3.0 | Multi-package build system |
| **Database** | PostgreSQL | 16 (Docker) | Primary data store |
| **ORM** | Prisma | 5.22.0 | Database access + migrations |
| **Queue System** | Redis | 7 (Docker) | Job queue backend |
| **Job Queue** | BullMQ | 5.20.0 | Job orchestration |
| **Web Crawling** | Playwright | 1.48.0 | Browser automation |
| **Video Rendering** | Remotion | 4.0.200 | React-based video engine |
| **Image Processing** | Sharp | 0.33.0 | Image cropping/resizing |
| **AI API** | OpenAI SDK | 4.70.0 | GPT-4o integration |
| **Validation** | Zod | 3.23.0 | Schema validation & type inference |
| **UI Framework** | Tailwind CSS | 3.4.0 | Utility-first styling |
| **UI Components** | Radix UI | Various | Accessible component library |
| **Drag & Drop** | @dnd-kit | 6.1.0 | Drag-and-drop for scene ordering |
| **Icons** | Lucide React | 0.454.0 | Consistent icon set |
| **Language** | TypeScript | 5.6.0 | Type-safe development |
| **Linting** | ESLint | 8.57.0 | Code quality |
| **CSS Processing** | Tailwind/PostCSS | Latest | CSS transformation |

---

## 4. Database Schema & Data Models

**Database Type:** PostgreSQL with Prisma ORM

### Core Entity Relationship Model

```
Project (main container)
├── InputSource (1:1) - URL source
│   └── PageSnapshot (1:1) - Crawled page data
│       └── SectionCandidates (1:N) - Detected sections
├── CrawlJobs (1:N) - Crawl job tracking
├── MarketingAngles (1:N) - AI-generated angles
├── Suggestions (1:N) - Hooks, overlays, CTAs, captions
├── Storyboards (1:N) - Video storyboards
│   └── Scenes (1:N) - Individual video scenes
└── RenderJobs (1:N) - Render job tracking
```

### Key Enums

**ProjectStatus:**
```
CREATED → CRAWLING → CRAWL_COMPLETE → GENERATING →
GENERATION_COMPLETE → RENDERING → RENDER_COMPLETE → FAILED
```

**JobStatus:**
```
PENDING → ACTIVE → COMPLETED / FAILED / STALLED
```

**SectionType:**
```
HERO | FEATURES | TESTIMONIALS | PRICING | CTA | ABOUT | STATS | GALLERY | UNKNOWN
```

**VideoFormat:**
```
LANDSCAPE_16_9 | PORTRAIT_9_16 | SQUARE_1_1
```

### Key Models

| Model | Purpose | Key Fields |
|-------|---------|-----------|
| **Project** | Video project container | id, status, videoFormat, createdAt, updatedAt |
| **InputSource** | Source website URL | url, type, settingsJson |
| **PageSnapshot** | Crawled page metadata | title, extractedText, domMetadata, fullPageScreenshot |
| **SectionCandidate** | Detected section | sectionType, score, rank, selector, boundingBox, screenshot |
| **Asset** | Stored file | type (screenshot/video), mimeType, filename, storageUrl, width, height, duration |
| **MarketingAngle** | AI-generated angle | name, summary, targetAudience, offer, confidence |
| **Suggestion** | AI-generated text | type (hook/overlay/cta/caption/hashtag), text, variant, confidence |
| **Storyboard** | Video plan | version, format, totalDuration, aiMetadataJson |
| **Scene** | Single video scene | order, durationSec, overlayText, overlayPosition, voiceoverText, transition, layoutPreset |
| **CrawlJob** | Crawl tracking | status, progress, bullJobId, error, startedAt, completedAt |
| **RenderJob** | Render tracking | status, progress, bullJobId, outputAsset, error, startedAt, completedAt |

---

## 5. API Routes & Purposes

All API routes are Next.js App Router route handlers with TypeScript.

### Project Management

| Endpoint | Method | Purpose | Response |
|----------|--------|---------|----------|
| `/api/projects` | POST | Create project with URL + enqueue crawl job | Project with inputSource |
| `/api/projects` | GET | List all projects (last 50, ordered by creation) | Project[] with inputSource |
| `/api/projects/[id]` | GET | Get full project with all nested data | Full project with relations |
| `/api/projects/[id]` | PATCH | Update project metadata (name, videoFormat) | Updated project |
| `/api/projects/[id]` | DELETE | Delete project and cascade relations | Success status |

### Generation Pipeline

| Endpoint | Method | Purpose | Actions |
|----------|--------|---------|---------|
| `/api/projects/[id]/generate` | POST | Start AI generation | Validates pageSnapshot, updates status to GENERATING, enqueues AI job |
| `/api/projects/[id]/render` | POST | Start video rendering | Validates storyboard, updates status to RENDERING, enqueues render job |
| `/api/projects/[id]/crawl` | POST | Start website crawling | Creates crawl job, enqueues to crawlQueue |

### Scene Management

| Endpoint | Method | Purpose | Fields |
|----------|--------|---------|--------|
| `/api/projects/[id]/scenes/[sceneId]` | PATCH | Update individual scene | overlayText, durationSec, order |

### Asset Serving

| Endpoint | Method | Purpose | Features |
|----------|--------|---------|----------|
| `/api/assets/[assetId]` | GET | Stream asset file | Content-Type headers, download parameter |

---

## 6. Core Business Logic & Workflows

### User Flow 1: Project Creation

```
User enters URL → POST /api/projects
→ Create Project (status: CRAWLING) + InputSource
→ Create CrawlJob (status: PENDING)
→ Enqueue crawl job to BullMQ crawlQueue
→ Redirect to /projects/[id]
```

### User Flow 2: Crawl Process (Background)

```
Crawl Worker picks job:
1. Launch Chromium browser
2. Navigate to URL (with networkidle + fallback)
3. Extract page title, description, meta tags
4. Evaluate and extract text content (first 100 text nodes)
5. Detect marketing sections using heuristics:
   - CSS class matching (hero, feature, testimonial, etc.)
   - Keyword matching in text
   - Position hints (top for hero, bottom for CTA)
   - Size bonuses (large elements = higher score)
6. Take full-page screenshot (PNG)
7. Screenshot top 10 sections:
   - Try element.screenshot() first
   - Fallback to crop from full page if fails
   - Crop to video format aspect ratio using sharp
   - Save as Asset
8. Create SectionCandidate records with scores/ranks
9. Update Project status to CRAWL_COMPLETE
10. Return: {pageSnapshotId, sectionsFound}
```

### User Flow 3: AI Generation (Background)

```
AI Worker picks job:
1. Load PageSnapshot with top 10 SectionCandidates
2. Initialize OpenAI provider (GPT-4o)
3. Build marketing angles prompt
   - Pass: page title, extracted text, format
   - AI returns: 3-5 marketing angles
4. Extract primary angle from response
5. Build storyboard prompt
   - Include: title, sections, primary angle, format
   - Request: 6-8 scenes, hooks, overlays, CTAs, captions, hashtags
6. Call OpenAI with structured output (Zod schema)
   - Validate with AIMarketingOutputSchema
7. Save to database:
   - MarketingAngle records (1-5)
   - Storyboard (1 version)
   - Scene records (6-8 scenes, linked to sections)
   - Suggestion records (hooks, overlays, CTAs, captions, hashtags)
8. Update Project status to GENERATION_COMPLETE
9. Return: {storyboardId, sceneCount}
```

### User Flow 4: Video Rendering (Background)

```
Render Worker picks job:
1. Load Storyboard with Scenes and linked Assets
2. Convert scene images to base64 data URLs
   - Avoids file:// protocol issues in Remotion bundler
3. Bundle Remotion composition
   - Entry point: src/remotion/index.ts
   - Calls @remotion/bundler with progress tracking
4. Select composition 'MarketingVideo'
   - Pass: scenes data, width, height, fps
5. Render video to MP4
   - Codec: h264
   - Format: specified dimensions (1080×1920 for 9:16, etc.)
   - FPS: 30 (standard)
   - Transitions: 0.5 second fade between scenes
6. Create Asset record (type: video)
7. Update Storyboard with assetId
8. Update RenderJob (status: COMPLETED, outputAssetId)
9. Update Project status to RENDER_COMPLETE
10. Return: {outputAssetId, outputPath}
```

### User Flow 5: Scene Editor

```
User in /projects/[id]/editor:
1. Load scenes from latest storyboard
2. Allow editing:
   - Reorder scenes (drag-and-drop with @dnd-kit)
   - Edit overlay text
   - Adjust duration
3. PATCH /api/projects/[id]/scenes/[sceneId]
   - Update overlayText, durationSec, order
4. User clicks "Render" → New render job created
5. Render worker processes new video with updated scenes
```

---

## 7. Remotion Video Generation Setup

**Location:** `apps/worker/src/remotion/`

### Key Components

| Component | File | Purpose |
|-----------|------|---------|
| Root | `Root.tsx` | Remotion entry point, exports MarketingVideo composition |
| MarketingVideo | `compositions/MarketingVideo.tsx` | Main composition - maps scenes to sequences |
| Scene | `components/Scene.tsx` | Individual scene renderer with image and overlay |
| Transition | `components/Transition.tsx` | Transition effects between scenes |

### MarketingVideo Composition

**Inputs:** scenes[], width, height, fps

**Logic:**
- Maps scenes to Remotion Sequences
- Each sequence contains 0.5s transition + scene
- AbsoluteFill with black background

**Output:** Rendered video

### Scene Component

- Displays image (base64 data URL)
- Overlays text (top, center, bottom positions)
- Handles opacity/animation transitions

### Transition Component

- **Types:** fade, slide, zoom, none
- **Duration:** 0.5 seconds per transition
- Applied between scenes

### Video Format Presets

```javascript
PORTRAIT_9_16:  { width: 1080, height: 1920, fps: 30 }
SQUARE_1_1:     { width: 1080, height: 1080, fps: 30 }
LANDSCAPE_16_9: { width: 1920, height: 1080, fps: 30 }
```

### Rendering Process

1. Bundle with `@remotion/bundler`
2. Compose with `@remotion/renderer/selectComposition`
3. Render with `@remotion/renderer/renderMedia`
4. **Output:** MP4 (h264 codec)

---

## 8. Queue System & Job Processing

**Queue Infrastructure:** Redis + BullMQ

### Three Queues

| Queue | Worker | Concurrency | Job Type | Purpose |
|-------|--------|-------------|----------|---------|
| `crawl` | crawl-single-url.processor | 2 | crawlSingleUrl | Extract website content |
| `ai` | ai-generate-marketing.processor | 3 | aiGenerateMarketing | Generate marketing content |
| `render` | render-draft-video.processor | 1 | renderDraftVideo | Render final video |

### Job Data Structures

```typescript
// Crawl Job
interface CrawlJobData {
  projectId: string;
  url: string;
  inputSourceId: string;
  crawlJobId: string;
}

// AI Job
interface AIJobData {
  projectId: string;
  pageSnapshotId: string;
  videoFormat: VideoFormatKey;
}

// Render Job
interface RenderJobData {
  projectId: string;
  storyboardId: string;
  renderJobId: string;
  videoFormat: VideoFormatKey;
}
```

### Job Lifecycle

```
Created in database (status: PENDING)
    ↓
Enqueued to BullMQ
    ↓
Worker picks up (status: ACTIVE)
    ↓
Progress updates via job.updateProgress()
    ↓
On complete (status: COMPLETED) - database updated
    ↓
On failure (status: FAILED) - error recorded
```

### Connection Setup

- **Web app:** `apps/web/src/lib/queue-client.ts` creates client queues
- **Worker:** `apps/worker/src/index.ts` creates worker instances
- Both use IORedis with TLS support for Upstash Redis (rediss://)

---

## 9. Configuration Files

### Root package.json

- Defines workspace scripts (dev, build, lint, db operations)
- Sets pnpm as package manager (v9.0.0)
- Root dependencies: turbo, typescript

### turbo.json

- Turborepo configuration
- Task definitions with caching
- Dependencies: build depends on ^build
- Includes dev and database tasks

### pnpm-workspace.yaml

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### docker-compose.yml

**Services:**

| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| postgres | postgres:16-alpine | 5432 | Primary database |
| redis | redis:7-alpine | 6379 | Queue backend |
| web | clipforge-web | 3000 | Frontend (production) |
| worker | clipforge-worker | - | Background jobs (production) |

**Volumes:** postgres_data, redis_data, storage_data

**Healthchecks:** All services have healthchecks configured

### Dockerfile

Multi-stage build (deps → builder → web/worker)

**Web stage:**
- Node 20 slim
- Copies Next.js standalone + static + public
- Exposes port 3000

**Worker stage:**
- Node 20 slim
- Installs Playwright dependencies (libnss3, libdbus, etc.)
- Installs Chromium
- Creates storage directory
- Works from apps/worker directory

---

## 10. Environment Variables & Configuration

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Redis/Queue
REDIS_URL=redis://host:6379
# Or: rediss://user:pass@host.upstash.redis.com (Upstash)

# Storage
STORAGE_PATH=./storage
# Or absolute path for consistency

# AI Provider
OPENAI_API_KEY=sk-...
AI_MODEL=gpt-4o              # Default
AI_PROVIDER=openai           # Default

# Next.js Auth (optional)
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# Deployment
NODE_ENV=development|production
```

### Variable Usage

| File | Purpose |
|------|---------|
| `.env` | Local development (git-ignored) |
| `.env.example` | Template for new developers |
| `.env.production.example` | Production template |
| Docker Compose | Environment section overrides |

---

## 11. Documentation & README

### Key Documents

| Document | Size | Purpose |
|----------|------|---------|
| `README.md` | ~5KB | Project description, features, quick start |
| `ARCHITECTURE.md` | ~15KB | Comprehensive architecture documentation |
| `ClaudeWorkFlow.md` | ~2KB | Development workflow documentation |

### README.md Contents

- Project description
- Features list
- Tech stack summary
- Quick start instructions (Windows/macOS/Linux)
- Project structure overview
- Available commands
- API routes reference
- Setup prerequisites

### ARCHITECTURE.md Contents

- Detailed folder structure
- Data model relationships
- Job data structures
- Third-party services
- Build & deployment instructions
- Security notes
- Known constraints & trade-offs
- Debugging guide
- File quick reference

---

## 12. Development Setup & Commands

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker & Docker Compose
- Playwright browsers

### Quick Start

```bash
# Option A: Automated (Windows)
scripts\start.bat

# Option B: Manual
cp .env.example .env
# Edit .env with OPENAI_API_KEY
docker-compose up -d
pnpm install
pnpm --filter @clipforge/shared db:generate
pnpm --filter @clipforge/shared db:push
npx playwright install chromium

# Terminal 1: Web app
pnpm --filter @clipforge/web dev

# Terminal 2: Worker (from apps/worker)
cd apps/worker && pnpm dev
```

### Key Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start all apps |
| `pnpm build` | Build all packages |
| `pnpm lint` | Lint all |
| `pnpm typecheck` | Type-check all |
| `pnpm --filter @clipforge/shared db:generate` | Generate Prisma client |
| `pnpm --filter @clipforge/shared db:push` | Push schema to database |
| `pnpm --filter @clipforge/shared db:studio` | Open Prisma Studio |
| `cd apps/worker && pnpm dev` | Start worker |
| `cd apps/worker && pnpm render:demo` | Render demo video |
| `cd apps/worker && pnpm studio` | Remotion Studio |

### Development Ports

| Service | URL |
|---------|-----|
| Web app | http://localhost:3000 |
| Postgres | localhost:5432 |
| Redis | localhost:6379 |

---

## 13. Security & Deployment Notes

### Security Considerations

| Concern | Current State | Production Recommendation |
|---------|---------------|---------------------------|
| Authentication | None (MVP) | Add NextAuth before production |
| API Protection | Unprotected | Add authentication middleware |
| File Storage | Local | Use S3/Cloud Storage |
| API Keys | Environment vars | Use secrets management |
| Playwright | Headless Chrome | Secure container needed |

### Production Deployment

```bash
# Docker Compose with production profile
docker-compose --profile production up -d --build
```

**Production Infrastructure:**

| Component | Options |
|-----------|---------|
| Docker Images | clipforge-web, clipforge-worker |
| Redis | Upstash (managed Redis) |
| Postgres | AWS RDS, Railway, Render |
| Storage | AWS S3, Cloudflare R2 |
| Video Rendering | Consider Remotion Lambda API for scale |

### Scaling Considerations

1. Worker concurrency limited by CPU (crawl: 2, ai: 3, render: 1)
2. Storage path needs env refactoring for distributed deployment
3. Local Chromium installation required
4. Single-page crawl only (no multi-page crawling)
5. Synchronous AI calls with long timeouts

---

## 14. Key Files & Paths

| Purpose | File | Location |
|---------|------|----------|
| Database Schema | schema.prisma | `packages/shared/prisma/schema.prisma` |
| Crawl Logic | crawl-single-url.processor.ts | `apps/worker/src/processors/` |
| Section Detection | section-detector.ts | `apps/worker/src/services/crawler/` |
| AI Integration | openai.provider.ts | `packages/shared/src/ai/providers/` |
| AI Prompts | storyboard.prompt.ts | `packages/shared/src/ai/prompts/` |
| Video Composition | MarketingVideo.tsx | `apps/worker/src/remotion/compositions/` |
| Render Logic | render-draft-video.processor.ts | `apps/worker/src/processors/` |
| Queue Client | queue-client.ts | `apps/web/src/lib/` |
| Storage Utilities | storage.ts | `apps/worker/src/lib/` |
| Validation Schemas | ai-output.schema.ts | `packages/shared/src/schemas/` |
| Section Types | section-types.ts | `packages/shared/src/constants/` |
| Video Formats | video-formats.ts | `packages/shared/src/constants/` |

---

## 15. Technology Stack Summary

| Layer | Technology | Role |
|-------|-----------|------|
| **Frontend** | Next.js 14, React 18, TypeScript | Web UI & API routes |
| **Backend** | Node.js 20, BullMQ, Prisma | Job processing & data |
| **Database** | PostgreSQL 16 | Data persistence |
| **Queue** | Redis 7 | Job queue backend |
| **Crawling** | Playwright 1.48 | Web automation |
| **Video** | Remotion 4.0 | Video rendering |
| **AI** | OpenAI GPT-4o | Content generation |
| **Validation** | Zod 3.23 | Schema validation |
| **Styling** | Tailwind CSS 3.4 | UI styling |
| **Build** | Turborepo 2.3, tsup | Monorepo management |
| **Deployment** | Docker, Docker Compose | Containerization |

---

## 16. Workflow Diagram

```
USER INTERFACE (Next.js Web App on :3000)
        │
        ▼
    POST /api/projects (URL input)
        │
        ▼
Create Project + InputSource + CrawlJob
        │
        ▼
    Enqueue crawlQueue
        │
        ▼
┌─────────────────────────────────────────────┐
│ CRAWL WORKER (concurrency: 2)               │
│ → Launch Chromium                           │
│ → Navigate URL                              │
│ → Detect sections (hero, features, etc.)    │
│ → Take screenshots (full page + sections)   │
│ → Save PageSnapshot + SectionCandidates     │
│ → Update Project: CRAWL_COMPLETE            │
└─────────────────────────────────────────────┘
        │
        ▼
User sees analysis page with section thumbnails
        │
        ▼
    POST /api/projects/[id]/generate
        │
        ▼
    Enqueue aiQueue
        │
        ▼
┌─────────────────────────────────────────────┐
│ AI WORKER (concurrency: 3)                  │
│ → Load sections from database               │
│ → Call OpenAI GPT-4o                        │
│ → Generate marketing angles                 │
│ → Generate storyboard (6-8 scenes)          │
│ → Save MarketingAngles + Suggestions        │
│ → Save Storyboard + Scenes                  │
│ → Update Project: GENERATION_COMPLETE       │
└─────────────────────────────────────────────┘
        │
        ▼
User sees generated scenes in editor
        │
        ▼
User can edit scenes (reorder, text, duration)
        │
        ▼
    POST /api/projects/[id]/render
        │
        ▼
    Enqueue renderQueue
        │
        ▼
┌─────────────────────────────────────────────┐
│ RENDER WORKER (concurrency: 1)              │
│ → Load scenes + images                      │
│ → Bundle Remotion composition               │
│ → Convert images to base64 data URLs        │
│ → Render MP4 video with h264 codec          │
│ → Save Asset (video file)                   │
│ → Update Project: RENDER_COMPLETE           │
└─────────────────────────────────────────────┘
        │
        ▼
User can download/preview final MP4 video
    GET /api/assets/[assetId]
        │
        ▼
Video file streamed with correct MIME type
```

---

## 17. Notable Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **BullMQ for Job Processing** | Enables reliable async task execution with retries and concurrency control |
| **Turborepo Monorepo** | Shared code between web and worker, single TypeScript configuration |
| **Prisma ORM** | Type-safe database access with auto-generated types from schema |
| **Remotion for Video** | React-based composition framework - declarative video creation |
| **Base64 Image URLs** | In render process to avoid file:// protocol issues in browser-based bundler |
| **Heuristic Section Detection** | No ML model - uses CSS class names, keywords, position hints, size |
| **OpenAI Structured Output** | Uses Zod schemas with GPT-4o for reliable JSON responses |
| **Provider Abstraction** | AI provider interface allows swapping OpenAI for Anthropic later |
| **Local File Storage** | Simplicity trade-off - production needs cloud storage (S3) |
| **Worker from apps/worker** | Remotion bundler needs source files relative to cwd() |

---

## 18. Known Constraints & Limitations

| Constraint | Impact | Mitigation |
|------------|--------|------------|
| Single-page crawls only | No link following or multi-page crawling | Future enhancement |
| Local file storage | Not suitable for serverless/distributed deployment | Use S3 in production |
| Synchronous AI calls | Long timeouts possible on complex pages | Consider streaming |
| No user authentication | MVP is single-tenant | Add NextAuth for production |
| CPU-intensive rendering | Local Remotion rendering is slow | Consider Remotion Lambda API |
| Heuristic section detection | May miss unconventional layouts | Train ML model in future |
| Hardcoded paths | Storage path hardcoded in some files | Refactor to use env vars |
| Chromium required | Worker needs Playwright browsers installed | Part of Docker setup |

---

## Appendix: File Structure Reference

```
SummCore Reel/
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── api/
│   │   │   │   │   ├── projects/
│   │   │   │   │   │   ├── route.ts
│   │   │   │   │   │   └── [id]/
│   │   │   │   │   │       ├── route.ts
│   │   │   │   │   │       ├── generate/route.ts
│   │   │   │   │   │       ├── render/route.ts
│   │   │   │   │   │       ├── crawl/route.ts
│   │   │   │   │   │       └── scenes/[sceneId]/route.ts
│   │   │   │   │   └── assets/[assetId]/route.ts
│   │   │   │   ├── projects/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── new/page.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       ├── analysis/page.tsx
│   │   │   │   │       ├── editor/page.tsx
│   │   │   │   │       └── export/page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── globals.css
│   │   │   ├── components/
│   │   │   │   └── ui/
│   │   │   └── lib/
│   │   │       └── queue-client.ts
│   │   ├── public/
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   └── worker/
│       ├── src/
│       │   ├── processors/
│       │   │   ├── crawl-single-url.processor.ts
│       │   │   ├── ai-generate-marketing.processor.ts
│       │   │   └── render-draft-video.processor.ts
│       │   ├── services/
│       │   │   └── crawler/
│       │   │       └── section-detector.ts
│       │   ├── remotion/
│       │   │   ├── Root.tsx
│       │   │   ├── index.ts
│       │   │   ├── compositions/
│       │   │   │   └── MarketingVideo.tsx
│       │   │   └── components/
│       │   │       ├── Scene.tsx
│       │   │       └── Transition.tsx
│       │   ├── lib/
│       │   │   └── storage.ts
│       │   └── index.ts
│       └── package.json
├── packages/
│   └── shared/
│       ├── prisma/
│       │   └── schema.prisma
│       └── src/
│           ├── ai/
│           │   ├── providers/
│           │   │   └── openai.provider.ts
│           │   └── prompts/
│           │       └── storyboard.prompt.ts
│           ├── schemas/
│           │   └── ai-output.schema.ts
│           └── constants/
│               ├── section-types.ts
│               └── video-formats.ts
├── storage/                    # Local asset storage (gitignored)
├── scripts/
│   └── start.bat
├── docker-compose.yml
├── Dockerfile
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── .env.example
├── README.md
└── ARCHITECTURE.md
```

---

*Document generated: February 2026*
*Version: 1.0*
