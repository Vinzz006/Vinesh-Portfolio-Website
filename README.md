# Vinesh Shanmugam — Engineering Portfolio

> **ECE Student · Embedded AI & IoT** · Also builds full-stack dashboards.

Live Site: [https://vinesh-portfolio.vercel.app](https://vinesh-portfolio.vercel.app)  
Repository: [https://github.com/Vinzz006/Vinesh-Portfolio-Website](https://github.com/Vinzz006/Vinesh-Portfolio-Website)

---

## Overview

This repository powers the personal engineering portfolio of **Vinesh Shanmugam** (Electronics and Communication Engineering student, 2024–2028, Meenakshi Sundararajan Engineering College).

The site showcases end-to-end engineering projects connecting physical sensors, embedded microcontrollers (ESP32), on-device TinyML inference, communication telemetry (MQTT/HTTP), and full-stack web applications.

---

## Screenshots

<!-- TODO_USER: Replace placeholder image links with actual screenshots captured at 1440px desktop viewport -->
| View | Preview Placeholder |
| :--- | :--- |
| **Hero & Architecture Preview** | `![Hero Preview](docs/screenshots/hero_preview.png)` *(TODO_USER: Capture 1440px hero)* |
| **Projects Archive & Evidence** | `![Projects Grid](docs/screenshots/projects_grid.png)` *(TODO_USER: Capture projects grid)* |
| **Interactive Engineering Lab** | `![Lab Dataflow](docs/screenshots/engineering_lab.png)` *(TODO_USER: Capture lab dataflow)* |

---

## Honest Project & Evidence Status

To maintain transparent engineering integrity, this portfolio features a real-time proof counter and evidence badge system:

- **Verified Proof Counter**: Explicitly displays how many projects have public code repositories, live links, or video demonstrations.
- **Honesty Badges**: Projects without active public repositories display a clear, muted `No public code yet` badge rather than fabricated claims or mock links.
- **Evidence-First Ordering**: Projects with verifiable public code or live demos are automatically sorted first.

For tracking code links, demo videos, and metrics that need user updates, see [docs/USER_INPUTS_NEEDED.md](docs/USER_INPUTS_NEEDED.md) and [docs/CLAIMS_TO_VERIFY.md](docs/CLAIMS_TO_VERIFY.md).

---

## Tech Stack

- **Core Framework**: React 19, TypeScript
- **Bundler & Build Tool**: Vite 8 (Rolldown engine)
- **Styling**: Tailwind CSS, CSS Grid, Vanilla Glassmorphism
- **Graphics & 3D**: Three.js, `@react-three/fiber`, `@react-three/drei` (code-split, on-demand loaded)
- **Motion & Micro-interactions**: Framer Motion, GSAP (ScrollTrigger), Anime.js
- **Scroll Management**: Lenis Smooth Scroll (disabled automatically in low-power/touch mode)
- **Icons**: Lucide React
- **Hosting & Deployment**: Vercel

---

## Architecture & Performance Highlights

- **Dynamic Code-Splitting**: All 3D WebGL scenes (`HeroTechnologicalCore`, `Skills3DUniverse`, `About3DDecorations`, `Vinzz3DScene`, `Cinematic3DIntro`) are code-split using `React.lazy` and `Suspense`.
- **Vendor Chunking**: Separate vendor chunks for `vendor-r3f`, `vendor-three`, `vendor-framer-motion`, and `vendor-gsap`.
- **Low-Power & Reduced Motion Detection**: Shared `useLowPower` hook detects `prefers-reduced-motion`, touch screens (`pointer: coarse`), low CPU cores ($\le 4$), low device memory ($\le 4$ GB), and data saver mode. Heavy canvas animations, 3D scenes, particles, and smooth scroll are bypassed automatically.
- **SEO & Social Sharing**: Pre-rendered static fallback inside `<div id="root">`, Open Graph card generator (`scripts/generate_og_image.cjs`), JSON-LD Person schema, `robots.txt`, and `sitemap.xml`.

---

## Getting Started

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm 9+

### Installation
```bash
# Clone repository
git clone https://github.com/Vinzz006/Vinesh-Portfolio-Website.git
cd Vinesh-Portfolio-Website

# Install dependencies
npm install
```

### Development
```bash
# Start local development server with HMR
npm run dev
```

### Production Build
```bash
# Compile TypeScript and bundle production assets
npm run build

# Preview production bundle locally
npm run preview
```

### Utility Scripts
```bash
# Generate vector resume PDF
node scripts/generate_resume.cjs

# Generate 1200x630 Open Graph social share image
node scripts/generate_og_image.cjs
```

---

## Folder Structure

```
├── docs/                      # Verification and consistency documentation
│   ├── CLAIMS_TO_VERIFY.md    # Checklist of specific technical claims
│   ├── CONSISTENCY_REPORT.md  # Site vs. Resume alignment report
│   ├── USER_INPUTS_NEEDED.md  # TODO_USER tracking for links & metrics
│   └── screenshots/           # Screenshot demonstration assets
├── public/                    # Static public assets (favicons, og-image, robots, sitemap, resume)
├── scripts/                   # Build-time utility generation scripts
│   ├── generate_og_image.cjs  # Sharp/SVG social card generator
│   └── generate_resume.cjs    # PDF resume builder
├── src/
│   ├── animations/            # Anime.js and GSAP animation sequences
│   ├── assets/                # Optimized WebP imagery
│   ├── components/            # Reusable UI, motion, and 3D components
│   │   ├── 3d/                # Three.js / R3F scenes (lazy-loaded)
│   │   ├── intro/             # Cinematic introduction sequence
│   │   ├── motion/            # Magnetic buttons, scroll triggers, tilt cards
│   │   ├── three/             # Background particle clouds and canvases
│   │   └── ui/                # Bento grids, spotlights, number tickers
│   ├── data/                  # Single-source-of-truth project, skill, and profile data
│   │   ├── experience.ts      # Education and timeline entries
│   │   ├── metrics.ts         # Verified hardware measurement metrics
│   │   ├── profile.ts         # Global hero titles, subtitles, and URLs
│   │   ├── projects.ts        # 10 engineering project architectures
│   │   └── skills.ts          # Categorized technical capabilities
│   ├── hooks/                 # Custom React hooks (useReducedMotion, useLowPower, useGitHub)
│   ├── lib/                   # Utility helpers and GitHub API client
│   └── sections/              # Page sections (Hero, About, Projects, Lab, Skills, Contact)
├── index.html                 # HTML shell with meta tags and crawler fallback
├── tailwind.config.js         # Design tokens, palette, and typography
└── vite.config.ts             # Vite configuration with vendor manualChunks
```

---

## License

This project is open-sourced under the [MIT License](LICENSE).
