# SummCore Studio (ReelForge) - Complete Technical Overview

## Executive Summary

SummCore Studio (internally codenamed "ReelForge") is a Next.js 14-based creative content platform designed for creators, business owners, and marketers to generate professional marketing reels and shorts for social media platforms (TikTok, Instagram Reels, YouTube Shorts).

The platform's flagship feature is the **Smart Website Scanner** - an AI-powered tool that uses headless browser automation to capture actual screenshots of website sections, extract content (headlines, stats, testimonials, CTAs), and automatically generate a ready-to-edit reel sequence.

---

## Table of Contents

1. [Core Features](#core-features)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Module Breakdown](#module-breakdown)
5. [Smart Scanner Deep Dive](#smart-scanner-deep-dive)
6. [Auto-Reel Generation Algorithm](#auto-reel-generation-algorithm)
7. [Reel Editor Capabilities](#reel-editor-capabilities)
8. [UI Component System](#ui-component-system)
9. [File Structure](#file-structure)
10. [API Endpoints](#api-endpoints)
11. [Data Models](#data-models)
12. [Theming System](#theming-system)
13. [Future Roadmap](#future-roadmap)

---

## Core Features

### 1. Smart Website Scanner
- **Headless Browser Capture**: Uses Puppeteer to load websites in a full Chrome browser
- **Section Detection**: Automatically identifies hero, features, pricing, testimonials, CTA sections
- **Screenshot Extraction**: Takes high-resolution screenshots of each detected section
- **Content Extraction**: Pulls headlines, statistics, testimonials, call-to-action text
- **Brand Detection**: Extracts logo, brand colors (up to 6), favicon, brand name
- **Meta Information**: Captures page title, description, Open Graph image

### 2. Auto-Reel Generation
- **Template-Based Sequencing**: Uses proven marketing reel structures (hook → problem → features → proof → CTA)
- **Intelligent Slide Creation**: Automatically creates slides from screenshots, headlines, stats, testimonials
- **Transition Assignment**: Applies appropriate transitions (fade, slide, zoom) based on content type
- **Animation Mapping**: Assigns animations (fade-in, slide-up, zoom-in, bounce) for engagement

### 3. Full Reel Editor
- **Multi-Aspect Ratio Support**: 9:16 (TikTok/Reels), 1:1 (Square), 16:9 (YouTube)
- **Drag-and-Drop Timeline**: Reorder slides with drag-and-drop
- **Slide Properties Panel**: Adjust duration, transitions, animations per slide
- **Asset Panel**: Browse all scanned assets (screenshots, headlines, stats)
- **Playback Controls**: Preview with play/pause, skip, timeline scrubbing
- **Add/Remove/Duplicate Slides**: Full editing control

### 4. Additional Studio Modules
- **Video Studio**: General video editing workspace
- **Audio Lab**: Audio track editing with waveform visualization
- **Art Design**: Multiple creative modes (freehand, pixel art, 3D, logo design)
- **Animation Panel**: Pre-built animation library
- **AI Tools**: Suite of AI-powered creative tools

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Browser Automation** | Puppeteer |
| **State Management** | React useState/useEffect |
| **Theming** | CSS Variables + Tailwind |

### Key Dependencies
```json
{
  "next": "^14.x",
  "react": "^18.x",
  "typescript": "^5.x",
  "tailwindcss": "^3.x",
  "puppeteer": "^21.x",
  "lucide-react": "^0.x"
}
```

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐ │
│  │ SiteScanner │→ │ Smart Scan   │→ │ ReelEditor              │ │
│  │ (URL Input) │  │ (Progress)   │  │ (Preview + Timeline)    │ │
│  └─────────────┘  └──────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↓ POST /api/smart-scan
┌─────────────────────────────────────────────────────────────────┐
│                         SERVER (API Route)                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Puppeteer Browser                        ││
│  │  ┌─────────┐  ┌──────────────┐  ┌─────────────────────────┐ ││
│  │  │ Navigate│→ │ DOM Evaluate │→ │ Screenshot Sections     │ ││
│  │  │ to URL  │  │ (Extract)    │  │ (Base64 PNG)            │ ││
│  │  └─────────┘  └──────────────┘  └─────────────────────────┘ ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                              ↓ ScanResult JSON
┌─────────────────────────────────────────────────────────────────┐
│                    REEL GENERATOR (Client)                      │
├─────────────────────────────────────────────────────────────────┤
│  generateReelFromScan(scanResult) → GeneratedReel               │
│  - Creates optimized slide sequence                             │
│  - Assigns transitions/animations                               │
│  - Sets brand colors                                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## Module Breakdown

### Site Scanner Module (`/components/site-scanner/`)

| File | Purpose |
|------|---------|
| `SiteScanner.tsx` | Main container - URL input, scanning state, progress UI |
| `ReelEditor.tsx` | Full reel editor with preview, timeline, asset panel, properties |
| `UrlInput.tsx` | Standalone URL input component |

### Video Studio Module (`/components/video-studio/`)

| File | Purpose |
|------|---------|
| `VideoStudio.tsx` | Main video editing workspace |
| `VideoPreview.tsx` | Video preview canvas |
| `VideoTimeline.tsx` | Multi-track timeline editor |
| `VideoToolbar.tsx` | Editing tools toolbar |
| `VideoProperties.tsx` | Properties panel for selected element |
| `PlaybackControls.tsx` | Play/pause, scrubbing controls |

### Audio Lab Module (`/components/audio-lab/`)

| File | Purpose |
|------|---------|
| `AudioLab.tsx` | Audio editing workspace |
| `WaveformTrack.tsx` | Audio waveform visualization |
| `AudioToolbar.tsx` | Audio editing tools |

### Art Design Module (`/components/art-design/`)

| File | Purpose |
|------|---------|
| `ArtDesign.tsx` | Main art workspace with mode switching |
| `ArtModeSelector.tsx` | Switch between art modes |
| `FreeCanvas.tsx` | Freehand drawing canvas |
| `PixelGrid.tsx` | Pixel art editor |
| `ThreeDView.tsx` | 3D model viewer/editor |
| `LogoStudio.tsx` | Logo design workspace |
| `ArchPlanner.tsx` | Architecture planning tool |
| `FlowPlanner.tsx` | Flowchart/diagram tool |
| `BgRemover.tsx` | Background removal tool |
| `ToolPalette.tsx` | Drawing tools palette |

### Animation Module (`/components/animate/`)

| File | Purpose |
|------|---------|
| `AnimatePanel.tsx` | Main animation panel |
| `AnimationLibrary.tsx` | Pre-built animation browser |
| `AnimationPreview.tsx` | Animation preview window |

### AI Tools Module (`/components/ai-tools/`)

| File | Purpose |
|------|---------|
| `AITools.tsx` | AI tools dashboard |
| `ToolsList.tsx` | Grid of available AI tools |
| `ToolCard.tsx` | Individual tool card component |

### Reel Maker Module (`/components/reel-maker/`)

| File | Purpose |
|------|---------|
| `ReelMaker.tsx` | Alternative reel creation interface |
| `SlideList.tsx` | Slide list/grid view |
| `PlatformSelector.tsx` | Social platform selector |

---

## Smart Scanner Deep Dive

### Scanning Process Flow

```
1. URL Normalization
   └─→ Add https:// if missing

2. Browser Launch
   └─→ Puppeteer headless Chrome
   └─→ Viewport: 1920x1080
   └─→ Args: --no-sandbox, --disable-setuid-sandbox

3. Page Navigation
   └─→ Wait: networkidle2
   └─→ Timeout: 30 seconds
   └─→ Post-load delay: 2 seconds

4. DOM Evaluation (page.evaluate)
   ├─→ getColors(): Extract 6 prominent colors
   ├─→ getLogo(): Find logo via class/id selectors
   ├─→ getHeadlines(): Extract h1/h2 text (max 10)
   ├─→ getStats(): Find numbers with stat patterns
   ├─→ getTestimonials(): Extract quotes/reviews
   ├─→ getCTAs(): Find button/link text
   ├─→ getMeta(): Title, description, og:image
   ├─→ getBrandName(): From og:site_name or title
   └─→ getSectionBounds(): Detect section rectangles

5. Screenshot Capture
   ├─→ Full viewport (hero)
   └─→ Each detected section (clipped to bounds)
       └─→ Scroll to section
       └─→ Wait 500ms for lazy content
       └─→ Clip with integer bounds (Math.floor)
       └─→ Encode as base64 PNG
```

### Section Detection Selectors

| Section Type | CSS Selectors Tried |
|--------------|---------------------|
| **Hero** | `[class*="hero"]`, `header + section`, `main > section:first-child` |
| **Features** | `[class*="feature"]`, `[class*="benefit"]`, `[class*="service"]` |
| **Pricing** | `[class*="pricing"]`, `[class*="price"]`, `[id*="pricing"]` |
| **Testimonials** | `[class*="testimonial"]`, `[class*="review"]`, `blockquote` |
| **CTA** | `[class*="cta"]`, `[class*="call-to-action"]` |

### Content Extraction Patterns

```javascript
// Stats Pattern (finds numbers like "10K+", "99%", "1,234")
const statPattern = /(\d+[,\d]*\.?\d*[%+KMB]?)/;

// Logo Detection Priority
1. img[class*="logo"]
2. img[id*="logo"]
3. img[alt*="logo"]
4. [class*="logo"] img
5. header img:first-of-type
6. nav img:first-of-type

// Brand Name Detection Priority
1. meta[property="og:site_name"]
2. document.title (split by - or |, take last part)
```

---

## Auto-Reel Generation Algorithm

### Reel Template Structure

The generator uses proven marketing video structures:

```typescript
const MARKETING_TEMPLATE = [
  { type: "hook",    source: "hero",        duration: 2 },  // Grab attention
  { type: "problem", source: "headline",    duration: 2 },  // State the problem
  { type: "feature", source: "features",    duration: 2 },  // Show solution
  { type: "feature", source: "features",    duration: 2 },  // More features
  { type: "proof",   source: "testimonial", duration: 3 },  // Social proof
  { type: "cta",     source: "cta",         duration: 2 },  // Call to action
];
```

### Slide Generation Sequence

```
1. HOOK (Hero Section)
   └─→ Screenshot of hero section
   └─→ Brand name overlay (top)
   └─→ Transition: zoom
   └─→ Animation: zoom-in

2. HEADLINE (Value Proposition)
   └─→ Main headline text
   └─→ Meta description as subheadline
   └─→ Transition: slide
   └─→ Animation: slide-up

3. FEATURES (Feature Section)
   └─→ Screenshot of features section
   └─→ Transition: fade
   └─→ Animation: fade-in

4. STATS (Social Proof Numbers)
   └─→ Up to 2 stats as individual slides
   └─→ Large number display
   └─→ Transition: zoom
   └─→ Animation: bounce

5. TESTIMONIAL (Customer Proof)
   └─→ Quote text with author
   └─→ Transition: fade
   └─→ Animation: fade-in

6. PRICING (If Available)
   └─→ Pricing section screenshot
   └─→ Transition: slide
   └─→ Animation: slide-up

7. CTA (Call to Action)
   └─→ CTA section screenshot OR text slide
   └─→ Website URL in subheadline
   └─→ Transition: zoom
   └─→ Animation: zoom-in/bounce
```

### Duration Calculation

```typescript
const totalDuration = slides.reduce((sum, slide) => sum + slide.duration, 0);
// Typical reel: 15-20 seconds
```

---

## Reel Editor Capabilities

### Preview System

The preview canvas uses CSS background-image technique for proper aspect ratio containment:

```typescript
// Preview dimensions by aspect ratio
const PREVIEW_SIZES = {
  "9:16": { width: 240, height: 426 },  // Portrait (TikTok/Reels)
  "1:1":  { width: 320, height: 320 },  // Square (Instagram)
  "16:9": { width: 480, height: 270 },  // Landscape (YouTube)
};

// Image containment
style={{
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",      // Fill container, crop excess
  backgroundPosition: "center", // Center the crop
}}
```

### Timeline Features

- **Visual Slide Representation**: Thumbnail + duration badge
- **Drag-and-Drop Reordering**: Drag handle on each slide
- **Duration Display**: Shows per-slide and total duration
- **Type Badges**: Screenshot, text, stat, testimonial indicators
- **Active Slide Highlighting**: Green ring for current, purple for selected

### Slide Properties

| Property | Options |
|----------|---------|
| **Duration** | 0.5s - 10s (0.5s increments) |
| **Transition** | fade, slide, zoom, none |
| **Animation** | fade-in, slide-up, zoom-in, bounce, none |

### Playback System

```typescript
// Playback loop (50ms interval = 20fps UI update)
useEffect(() => {
  if (!playing) return;
  const interval = setInterval(() => {
    setCurrentTime(t => {
      // Update active slide based on cumulative duration
      let elapsed = 0;
      for (let i = 0; i < slides.length; i++) {
        elapsed += slides[i].duration;
        if (currentTime < elapsed) {
          setActiveSlide(i);
          break;
        }
      }
      return t + 0.05;
    });
  }, 50);
}, [playing]);
```

---

## UI Component System

### Base Components (`/components/ui/`)

| Component | Purpose |
|-----------|---------|
| `Button.tsx` | Primary, secondary, ghost, danger, success variants |
| `IconButton.tsx` | Icon-only button with hover states |
| `Input.tsx` | Text input with dark/light theme support |
| `Pill.tsx` | Tag/chip component for selections |
| `Slider.tsx` | Range slider input |

### Layout Components (`/components/layout/`)

| Component | Purpose |
|-----------|---------|
| `Header.tsx` | Top navigation bar |
| `Sidebar.tsx` | Left navigation sidebar |
| `ThemeToggle.tsx` | Dark/light mode switch |

### Component Styling Pattern

```typescript
// Example: Button component with Tailwind variants
<button className={cn(
  "px-4 py-2 rounded-lg font-medium transition-colors",
  variant === "primary" && "bg-accent text-white hover:bg-accent-dim",
  variant === "ghost" && "bg-transparent hover:bg-dark-surface-alt",
  variant === "danger" && "bg-error text-white hover:bg-error/80",
)}>
```

---

## File Structure

```
reelforge-studio/
├── app/
│   ├── api/
│   │   └── smart-scan/
│   │       └── route.ts          # Puppeteer scanning API
│   ├── globals.css               # Global styles + CSS variables
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main app entry
│
├── components/
│   ├── ui/                       # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── IconButton.tsx
│   │   ├── Input.tsx
│   │   ├── Pill.tsx
│   │   ├── Slider.tsx
│   │   └── index.ts
│   │
│   ├── layout/                   # App shell components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── index.ts
│   │
│   ├── site-scanner/             # Smart scanner + reel editor
│   │   ├── SiteScanner.tsx
│   │   ├── ReelEditor.tsx
│   │   └── UrlInput.tsx
│   │
│   ├── video-studio/             # Video editing module
│   ├── audio-lab/                # Audio editing module
│   ├── art-design/               # Art/design tools
│   ├── animate/                  # Animation tools
│   ├── reel-maker/               # Alternative reel UI
│   └── ai-tools/                 # AI-powered tools
│
├── lib/
│   ├── reel-generator.ts         # Auto-reel generation logic
│   ├── constants.ts              # App constants
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions (cn, etc.)
│
├── hooks/
│   ├── useTheme.ts               # Theme management hook
│   └── usePlayback.ts            # Playback state hook
│
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

---

## API Endpoints

### POST `/api/smart-scan`

**Purpose**: Scan a website and extract content + screenshots

**Request Body**:
```json
{
  "url": "https://example.com"
}
```

**Response** (ScanResult):
```json
{
  "url": "https://example.com",
  "brand": {
    "name": "Example Inc",
    "logo": "https://example.com/logo.png",
    "colors": ["#6c5ce7", "#00cec9", "#2d3436"],
    "favicon": "https://example.com/favicon.ico"
  },
  "sections": [
    {
      "id": "full-hero",
      "type": "hero",
      "screenshot": "data:image/png;base64,iVBORw0...",
      "headline": "Build Something Amazing",
      "bounds": { "x": 0, "y": 0, "width": 1920, "height": 1080 }
    }
  ],
  "headlines": ["Build Something Amazing", "Trusted by 10,000+ teams"],
  "stats": [{ "value": "10K+", "label": "Active Users" }],
  "testimonials": [{ "quote": "Best tool ever!", "author": "John Doe" }],
  "ctas": ["Get Started", "Try Free", "Contact Sales"],
  "meta": {
    "title": "Example - Build Something Amazing",
    "description": "The best platform for building...",
    "ogImage": "https://example.com/og.png"
  }
}
```

**Error Response**:
```json
{
  "error": "Failed to scan website"
}
```

---

## Data Models

### ScanResult

```typescript
interface ScanResult {
  url: string;
  brand: {
    name: string;
    logo?: string;
    colors: string[];
    favicon?: string;
  };
  sections: ScannedSection[];
  headlines: string[];
  stats: { value: string; label: string }[];
  testimonials: { quote: string; author?: string }[];
  ctas: string[];
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
}
```

### ScannedSection

```typescript
interface ScannedSection {
  id: string;
  type: "hero" | "features" | "pricing" | "testimonial" | "cta" | "about" | "stats" | "gallery" | "generic";
  screenshot: string; // base64 PNG
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  stats?: { value: string; label: string }[];
  bounds: { x: number; y: number; width: number; height: number };
}
```

### GeneratedReel

```typescript
interface GeneratedReel {
  id: string;
  name: string;
  brand: {
    name: string;
    logo?: string;
    primaryColor: string;
    secondaryColor: string;
  };
  slides: ReelSlide[];
  audio?: {
    url: string;
    name: string;
    duration: number;
  };
  settings: {
    aspectRatio: "9:16" | "1:1" | "16:9";
    totalDuration: number;
    fps: number;
  };
}
```

### ReelSlide

```typescript
interface ReelSlide {
  id: string;
  type: "image" | "screenshot" | "text" | "stat" | "testimonial";
  content: {
    image?: string;
    headline?: string;
    subheadline?: string;
    stat?: { value: string; label: string };
    testimonial?: { quote: string; author?: string };
  };
  duration: number;
  transition: "fade" | "slide" | "zoom" | "none";
  animation?: "fade-in" | "slide-up" | "zoom-in" | "bounce" | "none";
  textOverlay?: {
    text: string;
    position: "top" | "center" | "bottom";
    style: "bold" | "normal" | "accent";
  };
}
```

---

## Theming System

### CSS Variables

```css
:root {
  /* Dark Theme (Default) */
  --dark-bg: #0a0a0f;
  --dark-surface: #12121a;
  --dark-surface-alt: #1a1a24;
  --dark-border: #2a2a3a;

  --text: #ffffff;
  --text-dim: #a0a0b0;
  --text-muted: #606070;

  --accent: #6c5ce7;
  --accent-dim: #5b4ccc;

  --success: #00b894;
  --warning: #fdcb6e;
  --error: #ff6b6b;

  /* Light Theme */
  --light-bg: #f5f5f7;
  --light-surface: #ffffff;
  --light-border: #e0e0e5;
  --text-dark: #1a1a2e;
}
```

### Theme Toggle Implementation

```typescript
// useTheme hook
const [theme, setTheme] = useState<"dark" | "light">("dark");

useEffect(() => {
  document.documentElement.classList.toggle("dark", theme === "dark");
}, [theme]);
```

---

## Future Roadmap

### Phase 1: Audio Integration
- [ ] Music library browser (royalty-free tracks)
- [ ] Voiceover recording
- [ ] Audio sync with slides
- [ ] Volume controls per track

### Phase 2: Video Export
- [ ] Remotion integration for server-side rendering
- [ ] Export to MP4 (720p, 1080p)
- [ ] Progress indicator during rendering
- [ ] Download to device

### Phase 3: Enhanced Editing
- [ ] Text overlay editor (fonts, colors, positioning)
- [ ] Ken Burns effect on images
- [ ] Custom transition durations
- [ ] Filters and color grading

### Phase 4: Platform Integration
- [ ] Direct publish to TikTok
- [ ] Direct publish to Instagram
- [ ] Direct publish to YouTube
- [ ] Scheduling system

### Phase 5: AI Enhancement
- [ ] AI-generated captions
- [ ] AI voiceover generation
- [ ] AI script suggestions
- [ ] Auto-optimize for engagement

---

## Development Commands

```bash
# Start development server
cd reelforge-studio
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## Known Issues & Solutions

### Issue: Puppeteer `waitForTimeout` not found
**Solution**: Use `await new Promise(r => setTimeout(r, ms))` instead

### Issue: Set iteration TypeScript error
**Solution**: Use `Array.from(new Set(array))` instead of `[...new Set(array)]`

### Issue: Screenshot clip with non-integer values
**Solution**: Apply `Math.floor()` to all clip coordinates

### Issue: Preview image overflow
**Solution**: Use CSS `background-image` with `background-size: cover` instead of `<img>` tag

---

## Contact & Support

**Project**: SummCore Studio
**Version**: 1.0.0
**Last Updated**: February 2026

---

*This document provides a comprehensive technical reference for the SummCore Studio platform. For implementation details, refer to the source code in the respective module directories.*
