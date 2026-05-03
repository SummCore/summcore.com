# ReelSumm - Complete Project Overview

## 1. Project Definition & Purpose

**ReelSumm** is a professional-grade, internal web application designed to transform uploaded images and videos into polished promotional video reels with AI-generated captions. It's a full-stack video generation MVP that automates content creation for social media marketing.

### Key Capabilities
- Convert multiple images (up to 6-12) into professional promotional videos
- Automatically generate context-aware captions using AI (OpenAI GPT-4o-mini or Anthropic Claude Sonnet 4)
- Support multiple video formats (9:16 vertical, 16:9 widescreen, 1:1 square, 4:5 feed)
- Animation builder for creating custom animated videos
- Handle both image and video assets with seamless composition

---

## 2. Complete Directory Structure

```
ReelSumm/
├── src/
│   ├── app/                           # Next.js App Router pages & API routes
│   │   ├── api/                       # 18 REST API endpoint routes
│   │   │   ├── projects/              # Project CRUD operations
│   │   │   ├── projects/[projectId]/  # Project-specific endpoints
│   │   │   │   ├── images/            # Image upload & management
│   │   │   │   ├── images/[imageId]/  # Individual image ops
│   │   │   │   ├── images/reorder/    # Reorder images in sequence
│   │   │   │   ├── captions/          # Caption generation & management
│   │   │   │   ├── captions/[captionId]/  # Individual caption ops
│   │   │   │   ├── audio/             # Audio track management
│   │   │   │   ├── crawl/             # Web content crawler
│   │   │   │   ├── render/            # Video rendering pipeline
│   │   │   │   ├── render/status/     # Render progress tracking
│   │   │   │   └── render/cancel/     # Cancel active render jobs
│   │   │   ├── animate/               # Animation builder endpoints
│   │   │   ├── audio/presets/         # Audio preset library
│   │   │   ├── assets/upload/         # Asset upload for animations
│   │   │   └── audio/[audioId]/       # Individual audio ops
│   │   ├── projects/                  # Project pages (UI)
│   │   │   ├── new/                   # Create project page
│   │   │   ├── [projectId]/           # Project editor page
│   │   │   │   └── settings/          # Project settings page
│   │   │   └── page.tsx               # Projects list/dashboard
│   │   ├── animate/                   # Animation builder page
│   │   ├── layout.tsx                 # Root layout wrapper
│   │   ├── page.tsx                   # Home/landing page
│   │   └── globals.css                # Global Tailwind styles
│   │
│   ├── components/                    # React components
│   │   ├── ui/                        # shadcn/ui components (primitives)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── index.ts               # UI exports
│   │   ├── layout/
│   │   │   ├── header.tsx             # App header/navbar
│   │   │   └── page-container.tsx     # Page wrapper
│   │   ├── projects/
│   │   │   ├── project-list.tsx       # Projects grid display
│   │   │   ├── project-card.tsx       # Individual project card
│   │   │   └── project-form.tsx       # Create/edit project form
│   │   ├── editor/
│   │   │   ├── image-uploader.tsx     # File upload component
│   │   │   ├── image-grid.tsx         # Uploaded images display
│   │   │   ├── caption-editor.tsx     # Caption editing UI
│   │   │   ├── video-preview.tsx      # Remotion preview player
│   │   │   ├── audio-selector.tsx     # Audio track picker
│   │   │   └── url-import.tsx         # Web scraping UI
│   │   ├── render/
│   │   │   ├── render-button.tsx      # Render start button
│   │   │   ├── render-progress.tsx    # Progress bar UI
│   │   │   └── download-button.tsx    # Video download link
│   │   └── animate/
│   │       ├── animation-preview.tsx
│   │       ├── asset-uploader.tsx
│   │       ├── preset-selector.tsx
│   │       ├── text-overlay-form.tsx
│   │       ├── render-progress.tsx
│   │       ├── export-button.tsx
│   │       └── index.ts
│   │
│   ├── lib/                           # Core business logic
│   │   ├── ai/                        # AI abstraction layer
│   │   │   ├── providers/             # Provider implementations
│   │   │   │   ├── base.ts            # BaseAIProvider abstract class
│   │   │   │   ├── openai.ts          # OpenAI implementation
│   │   │   │   ├── anthropic.ts       # Anthropic implementation
│   │   │   │   ├── ollama.ts          # Local Ollama implementation
│   │   │   │   └── index.ts           # Provider exports
│   │   │   ├── prompts/
│   │   │   │   └── captions.ts        # Caption generation prompts
│   │   │   ├── utils/
│   │   │   │   └── retry.ts           # Exponential backoff retry logic
│   │   │   ├── client.ts              # AI client factory
│   │   │   ├── types.ts               # AI interface definitions
│   │   │   └── index.ts               # AI module exports
│   │   ├── db/                        # Database layer (Drizzle ORM)
│   │   │   ├── queries/               # Database query functions
│   │   │   │   ├── projects.ts        # Project CRUD
│   │   │   │   ├── images.ts          # Image CRUD
│   │   │   │   ├── captions.ts        # Caption CRUD
│   │   │   │   ├── renders.ts         # Render job CRUD
│   │   │   │   ├── audio.ts           # Audio track CRUD
│   │   │   │   └── index.ts           # Query exports
│   │   │   ├── schema.ts              # Database schema definitions
│   │   │   └── index.ts               # Database initialization
│   │   ├── render/                    # Video rendering pipeline
│   │   │   ├── manager.ts             # Render orchestration
│   │   │   ├── progress.ts            # Progress tracking callbacks
│   │   │   ├── animation-manager.ts   # Animation rendering logic
│   │   │   ├── types.ts               # Render type definitions
│   │   │   └── index.ts               # Render exports
│   │   ├── storage/                   # File system operations
│   │   │   ├── local.ts               # Local file storage impl
│   │   │   ├── paths.ts               # Path generation utilities
│   │   │   └── index.ts               # Storage exports
│   │   ├── crawler/                   # Web content crawler
│   │   │   ├── crawler.ts             # Main crawler logic
│   │   │   ├── section-detector.ts    # Content section detection
│   │   │   ├── section-patterns.ts    # Pattern matching
│   │   │   └── index.ts               # Crawler exports
│   │   ├── validation/                # Input validation schemas
│   │   │   ├── project.ts             # Project Zod schemas
│   │   │   ├── image.ts               # Image Zod schemas
│   │   │   └── index.ts               # Validation exports
│   │   └── utils.ts                   # Utility functions
│   │
│   ├── remotion/                      # Remotion video compositions
│   │   ├── compositions/              # Main video templates
│   │   │   ├── promo-reel.tsx         # Primary promotional reel comp
│   │   │   ├── animated-spec.tsx      # Animation builder composition
│   │   │   └── marketing-reel.tsx     # Marketing template variant
│   │   ├── sequences/                 # Reusable video sequences
│   │   │   ├── image-sequence.tsx     # Image rendering with Ken Burns
│   │   │   ├── video-sequence.tsx     # Video clip playback
│   │   │   ├── caption-overlay.tsx    # Caption rendering & animations
│   │   │   ├── transition.tsx         # Transition effects (fade/slide/zoom)
│   │   │   └── audio-track.tsx        # Background audio mixing
│   │   ├── components/                # Reusable Remotion components
│   │   │   ├── animated-text.tsx
│   │   │   ├── animated-background.tsx
│   │   │   ├── feature-box.tsx
│   │   │   ├── scene-templates.tsx
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── timing.ts              # Frame & timing calculations
│   │   └── index.tsx                  # Remotion root & composition registry
│   │
│   ├── hooks/                         # React custom hooks
│   │   ├── use-projects.ts            # Fetch & manage projects list
│   │   ├── use-project.ts             # Single project data hook
│   │   ├── use-upload.ts              # Image upload with progress
│   │   └── use-render-progress.ts     # Render status polling hook
│   │
│   ├── types/                         # TypeScript type definitions
│   │   ├── project.ts                 # Project domain types
│   │   ├── image.ts                   # Image & video media types
│   │   ├── caption.ts                 # Caption styling & generation
│   │   ├── animation-spec.ts          # Animation builder specs
│   │   ├── render.ts                  # Render pipeline types
│   │   ├── api.ts                     # API response shapes
│   │   └── index.ts                   # Type exports
│   │
│   └── config/                        # Configuration
│       ├── constants.ts               # App-wide constants
│       ├── env.ts                     # Environment variables
│       ├── video.ts                   # Video defaults
│       ├── animation-presets.ts       # Animation templates
│       ├── audio-presets.ts           # Audio track library
│       └── audio-presets/ (dir)       # Audio files
│
├── public/                            # Static assets
│   ├── uploads/                       # User-uploaded images/videos
│   ├── renders/                       # Generated video outputs
│   ├── audio-presets/                 # Built-in music library
│   └── presets/                       # Animation preset thumbnails
│
├── drizzle/                           # Database migrations
│   ├── meta/
│   │   ├── 0000_snapshot.json
│   │   └── _journal.json
│
├── .next/                             # Next.js build output
├── node_modules/                      # Dependencies
│
├── tsconfig.json                      # TypeScript configuration
├── next.config.js                     # Next.js configuration
├── remotion.config.ts                 # Remotion rendering config
├── drizzle.config.ts                  # Drizzle ORM config
├── tailwind.config.js                 # Tailwind CSS config
├── postcss.config.mjs                 # PostCSS config
├── components.json                    # shadcn/ui config
├── package.json                       # Dependencies manifest
├── README.md                          # Project documentation
├── Audit.md                           # Launch audit checklist
├── ClaudeWorkFlow.md                  # Development workflow guide
├── engineering-workflow.md            # Technical workflow
├── .env.example                       # Environment variables template
└── docs/                              # Additional documentation
    ├── adding-motion.md               # Guide to add animation types
    └── adding-preset.md               # Guide to add animation presets
```

---

## 3. Key Technologies & Frameworks

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14+ | App Router framework |
| TypeScript | 5.4+ | Type-safe development |
| React | 18.3.1 | UI library |
| shadcn/ui | - | Radix UI primitives |
| Tailwind CSS | 3.4 | Utility-first styling |
| Lucide React | - | Icon library |

### Video & Media Processing
| Technology | Version | Purpose |
|------------|---------|---------|
| Remotion | 4.0.0 | React-based video rendering |
| Sharp | 0.33 | Image processing & thumbnails |
| FFmpeg | - | Video encoding (H.264) |

### Backend & Runtime
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime |
| SQLite | - | Database |
| Drizzle ORM | 0.30 | Type-safe database queries |

### AI & LLMs
| Provider | Models | SDK Version |
|----------|--------|-------------|
| OpenAI | GPT-4o-mini, GPT-4o | v4.50+ |
| Anthropic | Claude Sonnet 4, Claude 3.5 Sonnet | v0.24+ |
| Ollama | llava, bakllava | Local |

### Utilities
| Library | Purpose |
|---------|---------|
| Zod 3.23 | Runtime schema validation |
| dnd-kit | Drag & drop functionality |
| CUID2 | Unique ID generation |
| date-fns 4.1 | Date formatting |
| clsx + tailwind-merge | Class utilities |

---

## 4. Main Components & Relationships

### Core Domain Entities

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           PROJECTS                                       │
│  - name, description, status                                            │
│  - aspectRatio, imageDuration, transitionStyle                          │
│  - aiProvider, aiModel                                                  │
│  - backgroundAudioId, audioVolume, audioFadeIn/Out                      │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     IMAGES      │    │   RENDER JOBS   │    │  AUDIO TRACKS   │
│  - path, size   │    │  - status       │    │  - type         │
│  - orderIndex   │    │  - progress     │    │  - path         │
│  - mediaType    │    │  - outputPath   │    │  - duration     │
│  - duration     │    │  - errorMessage │    │                 │
└────────┬────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│    CAPTIONS     │
│  - text         │
│  - generatedBy  │
│  - fontSize     │
│  - fontColor    │
│  - position     │
│  - animation    │
└─────────────────┘
```

### Animation System Entities

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ANIMATION PROJECTS                                  │
│  - name, specJson (complete animation config)                           │
│  - status (draft|rendering|completed|failed)                            │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
          ┌──────────────────────┴──────────────────────┐
          │                                             │
          ▼                                             ▼
┌─────────────────────┐                    ┌─────────────────────┐
│       ASSETS        │                    │ ANIMATION RENDER    │
│  - filename, path   │                    │      JOBS           │
│  - mimeType, size   │                    │  - status, progress │
│  - width, height    │                    │  - outputPath       │
└─────────────────────┘                    └─────────────────────┘
```

### Component Architecture

**UI Layer**
- **Layout**: Header, PageContainer
- **Projects**: ProjectList, ProjectCard, ProjectForm
- **Editor**: ImageUploader, ImageGrid, CaptionEditor, VideoPreview, AudioSelector
- **Render**: RenderButton, RenderProgress, DownloadButton
- **Animation**: AssetUploader, PresetSelector, TextOverlayForm, AnimationPreview

**Business Logic Layer**
- **AI Module**: Provider abstraction, caption generation
- **Database Module**: Schema, queries, migrations
- **Render Module**: Pipeline orchestration, progress tracking
- **Storage Module**: File system operations

### AI Layer Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         AI CLIENT FACTORY                                │
│            createAIClient() / createProjectClient()                     │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  OpenAIProvider │    │AnthropicProvider│    │  OllamaProvider │
│  - GPT-4o-mini  │    │  - Claude Sonnet│    │  - llava        │
│  - GPT-4o       │    │  - Claude 3.5   │    │  - bakllava     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                                 ▼
                    ┌─────────────────────┐
                    │   LLMClient API     │
                    │  - generateCaption  │
                    │  - analyzeImage     │
                    │  - retry logic      │
                    └─────────────────────┘
```

### Video Rendering Pipeline

```
1. STORYBOARD BUILD
   └── Fetch project + images → construct slide configs

2. BUNDLING
   └── Bundle Remotion composition via webpack

3. RENDERING
   └── Generate frames using Chromium

4. ENCODING
   └── Encode frames to MP4 via FFmpeg (H.264)

5. FINALIZATION
   └── Save output → update database
```

---

## 5. Configuration Files

| File | Purpose |
|------|---------|
| `drizzle.config.ts` | SQLite DB path, migrations output, schema location |
| `remotion.config.ts` | H.264 codec, CRF 20, yuv420p pixel format, concurrency=2 |
| `tsconfig.json` | Path aliases (@/*), strict mode, module resolution |
| `tailwind.config.js` | Theme colors, spacing, typography |
| `postcss.config.mjs` | Tailwind, autoprefixer plugins |
| `components.json` | shadcn/ui component paths and aliases |
| `next.config.js` | Image optimization, middleware, experimental features |
| `.env.example` | AI keys, DB path, upload/render dirs |
| `src/config/constants.ts` | Video aspect ratios, FPS, upload limits |
| `src/config/animation-presets.ts` | Animation template definitions |
| `src/config/audio-presets.ts` | Built-in background audio tracks |

---

## 6. Database Schema

### Projects Table
```sql
id              TEXT PRIMARY KEY
name            TEXT NOT NULL
description     TEXT
status          TEXT (draft|ready|rendering|completed|failed)
aspectRatio     TEXT (9:16|16:9|1:1|4:5) DEFAULT '9:16'
imageDuration   REAL DEFAULT 3.0
transitionStyle TEXT (fade|slide|zoom|none) DEFAULT 'fade'
transitionDuration REAL DEFAULT 0.5
aiProvider      TEXT (openai|anthropic|ollama) DEFAULT 'openai'
aiModel         TEXT DEFAULT 'gpt-4o-mini'
imageFitMode    TEXT (cover|contain|blur-fill|auto) DEFAULT 'auto'
backgroundAudioId TEXT FK → audio_tracks.id
audioVolume     REAL DEFAULT 0.8
audioFadeIn     REAL DEFAULT 1.0
audioFadeOut    REAL DEFAULT 2.0
createdAt       TEXT ISO 8601
updatedAt       TEXT ISO 8601
```

### Images Table
```sql
id              TEXT PRIMARY KEY
projectId       TEXT FK → projects.id CASCADE
originalFilename TEXT NOT NULL
storedFilename  TEXT NOT NULL
path            TEXT NOT NULL
mimeType        TEXT NOT NULL
fileSize        INTEGER NOT NULL
width           INTEGER
height          INTEGER
orderIndex      INTEGER DEFAULT 0
mediaType       TEXT (image|video) DEFAULT 'image'
duration        REAL -- for videos
thumbnailPath   TEXT -- for videos
trimStart       REAL -- for videos
trimEnd         REAL -- for videos
muteAudio       BOOLEAN DEFAULT false
createdAt       TEXT ISO 8601
```

### Captions Table
```sql
id              TEXT PRIMARY KEY
imageId         TEXT FK → images.id CASCADE
text            TEXT NOT NULL
generatedBy     TEXT (openai|anthropic|ollama|user)
isEdited        BOOLEAN DEFAULT false
fontSize        INTEGER DEFAULT 24
fontColor       TEXT DEFAULT '#FFFFFF'
backgroundColor TEXT DEFAULT 'rgba(0,0,0,0.5)'
position        TEXT (top|center|bottom) DEFAULT 'bottom'
animation       TEXT (fade|slide-up|typewriter|none) DEFAULT 'fade'
createdAt       TEXT ISO 8601
updatedAt       TEXT ISO 8601
```

### RenderJobs Table
```sql
id              TEXT PRIMARY KEY
projectId       TEXT FK → projects.id CASCADE
status          TEXT (queued|preparing|rendering|encoding|completed|failed|cancelled)
progress        INTEGER DEFAULT 0
currentStage    TEXT
outputPath      TEXT
outputSize      INTEGER
duration        REAL
errorMessage    TEXT
errorStack      TEXT
retryCount      INTEGER DEFAULT 0
startedAt       TEXT ISO 8601
completedAt     TEXT ISO 8601
createdAt       TEXT ISO 8601
```

### AudioTracks Table
```sql
id              TEXT PRIMARY KEY
projectId       TEXT FK → projects.id CASCADE
type            TEXT (uploaded|preset)
originalFilename TEXT NOT NULL
storedFilename  TEXT NOT NULL
path            TEXT NOT NULL
mimeType        TEXT NOT NULL
fileSize        INTEGER NOT NULL
duration        REAL
createdAt       TEXT ISO 8601
```

### AnimationProjects Table
```sql
id              TEXT PRIMARY KEY
name            TEXT NOT NULL
specJson        TEXT NOT NULL -- AnimationSpec as JSON
status          TEXT (draft|rendering|completed|failed) DEFAULT 'draft'
createdAt       TEXT ISO 8601
updatedAt       TEXT ISO 8601
```

### Assets Table
```sql
id              TEXT PRIMARY KEY
projectId       TEXT FK → animation_projects.id CASCADE
filename        TEXT NOT NULL
path            TEXT NOT NULL
mimeType        TEXT NOT NULL
fileSize        INTEGER NOT NULL
width           INTEGER
height          INTEGER
createdAt       TEXT ISO 8601
```

### AnimationRenderJobs Table
```sql
id              TEXT PRIMARY KEY
projectId       TEXT FK → animation_projects.id CASCADE
status          TEXT (queued|rendering|completed|failed)
progress        INTEGER DEFAULT 0
outputPath      TEXT
outputSize      INTEGER
errorMessage    TEXT
createdAt       TEXT ISO 8601
completedAt     TEXT ISO 8601
```

---

## 7. API Endpoints

### Projects Collection
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create new project |

### Project Resource
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects/[projectId]` | Get project details |
| PUT | `/api/projects/[projectId]` | Update project |
| DELETE | `/api/projects/[projectId]` | Delete project |

### Images Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/[projectId]/images` | Upload images |
| GET | `/api/projects/[projectId]/images` | List project images |
| PUT | `/api/projects/[projectId]/images/[imageId]` | Update image settings |
| DELETE | `/api/projects/[projectId]/images/[imageId]` | Delete image |
| PUT | `/api/projects/[projectId]/images/reorder` | Reorder images |

### Captions Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/[projectId]/captions` | Generate AI captions |
| GET | `/api/projects/[projectId]/captions` | List captions |
| PUT | `/api/projects/[projectId]/captions/[captionId]` | Update caption |
| DELETE | `/api/projects/[projectId]/captions/[captionId]` | Delete caption |

### Audio Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/[projectId]/audio` | Upload audio track |
| DELETE | `/api/projects/[projectId]/audio` | Delete audio track |
| GET | `/api/audio/presets` | Get audio preset library |
| DELETE | `/api/audio/[audioId]` | Delete audio |

### Video Rendering
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/[projectId]/render` | Start render job |
| GET | `/api/projects/[projectId]/render` | Get latest render job |
| GET | `/api/projects/[projectId]/render/status` | Poll render status |
| POST | `/api/projects/[projectId]/render/cancel` | Cancel render |

### Web Crawler
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects/[projectId]/crawl` | Scrape web content |

### Animation Builder
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/animate` | List animation projects |
| POST | `/api/animate` | Create animation project |
| GET | `/api/animate/[projectId]` | Get animation project |
| PUT | `/api/animate/[projectId]` | Update animation project |
| DELETE | `/api/animate/[projectId]` | Delete animation project |
| POST | `/api/animate/[projectId]/render` | Render animation |

### Asset Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/assets/upload` | Upload animation assets |

---

## 8. Frontend/UI Structure

### Page Hierarchy

```
/ (Home/Landing)
├── Hero section with CTAs
├── Features showcase
└── Navigation to projects/create

/projects (Dashboard)
├── List of all projects
├── Project cards with status
└── "New Project" button

/projects/new (Create Project)
├── Project name input
├── Description textarea
├── AI provider selector
├── Video settings
└── Create button

/projects/[projectId] (Project Editor)
├── Tabs: Upload, Captions, Render
│   ├── Upload Tab
│   │   ├── Drag-drop upload area
│   │   ├── Image grid with reordering
│   │   └── Delete buttons
│   ├── Captions Tab
│   │   ├── Image selector
│   │   ├── Caption text editor
│   │   ├── Style controls
│   │   └── AI generation buttons
│   └── Render Tab
│       ├── Render button
│       ├── Progress bar
│       └── Download button
└── Settings panel

/projects/[projectId]/settings (Settings Page)
├── Project info
├── Video settings
├── AI provider selection
├── Image fit mode
└── Audio settings

/animate (Animation Builder)
├── Preset selector
├── Asset uploader
├── Text overlay form
├── Animation preview
└── Export controls
```

### Key UI Components

| Component | Purpose |
|-----------|---------|
| ProjectCard | Project metadata, status, actions |
| ImageUploader | Drag-drop file upload |
| ImageGrid | Sortable gallery with dnd-kit |
| CaptionEditor | Rich text editing with styles |
| RenderProgress | Progress bar with stage info |
| VideoPreview | Remotion player preview |
| AudioSelector | Track picker + upload |
| PresetSelector | Animation template grid |
| AnimationPreview | Real-time animation player |

---

## 9. Entry Points

### Application Entry Points
| Path | File | Purpose |
|------|------|---------|
| `/` | `src/app/page.tsx` | Landing page |
| `/projects` | `src/app/projects/page.tsx` | Dashboard |
| `/projects/new` | `src/app/projects/new/page.tsx` | Create project |
| `/projects/[id]` | `src/app/projects/[projectId]/page.tsx` | Project editor |
| `/animate` | `src/app/animate/page.tsx` | Animation builder |

### Core Module Entry Points
| Module | File | Purpose |
|--------|------|---------|
| Remotion | `src/remotion/index.tsx` | Composition registry |
| Database | `src/lib/db/index.ts` | DB client init |
| AI | `src/lib/ai/client.ts` | Provider factory |
| Render | `src/lib/render/manager.ts` | Pipeline orchestration |

---

## 10. Existing Documentation

| File | Purpose |
|------|---------|
| `README.md` | Project guide, setup, API reference |
| `Audit.md` | Pre-launch QA checklist |
| `ClaudeWorkFlow.md` | Development workflow |
| `engineering-workflow.md` | Technical workflow |
| `docs/adding-motion.md` | Animation type guide |
| `docs/adding-preset.md` | Preset creation guide |

---

## 11. Environment Variables

```env
# AI Providers
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
OLLAMA_BASE_URL=http://localhost:11434

# Database
DATABASE_PATH=./data/reelsumm.db

# Storage
UPLOAD_DIR=./public/uploads
RENDER_DIR=./public/renders

# Defaults
DEFAULT_AI_PROVIDER=openai
DEFAULT_AI_MODEL=gpt-4o-mini
```

---

## 12. Summary

**ReelSumm** is a sophisticated, full-stack video generation platform built with modern TypeScript/React technologies. It combines:

- **AI-powered caption generation** via pluggable providers (OpenAI, Anthropic, Ollama)
- **Professional video composition** via Remotion with Ken Burns effects, transitions, and audio mixing
- **User-friendly web interface** with drag-drop uploads, real-time preview, and progress tracking

The architecture emphasizes:
- **Type safety** (TypeScript + Zod validation)
- **Modularity** (clear separation of concerns)
- **Extensibility** (pluggable AI providers, animation presets)

The application serves as an internal tool for rapidly creating promotional content with minimal manual effort, leveraging AI to generate contextual captions and Remotion to produce publication-ready videos.
