# Vinesh Shanmugam — Engineering Portfolio

> **ECE Student · Embedded AI & IoT** · Also builds full-stack dashboards.

- **Live URL**: [https://vinesh-portfolio-website.vercel.app/](https://vinesh-portfolio-website.vercel.app/)
- **Repository**: [https://github.com/Vinzz006/Vinesh-Portfolio-Website](https://github.com/Vinzz006/Vinesh-Portfolio-Website)

---

## Overview

A clean, calm, multi-page portfolio designed for recruiters and engineering managers to scan technical competence in under 30 seconds.

Built with a content-first philosophy: zero fabricated claims, zero pseudo-telemetry or 3D gimmicks, WCAG AA contrast compliance, pre-rendered static routes for crawlers, and an initial JS bundle under 90 kB gzip.

---

## Screenshot Placeholders

| Page / Route | Viewport | Screenshot Placeholder |
| :--- | :--- | :--- |
| **Home (`/`)** | Desktop (1440px) | `![Home Page](docs/screenshots/home_desktop.png)` *(TODO_USER: Capture 1440px)* |
| **Projects Archive (`/projects`)** | Desktop (1440px) | `![Projects List](docs/screenshots/projects_desktop.png)` *(TODO_USER: Capture 1440px)* |
| **Case Study (`/projects/:slug`)** | Desktop (1440px) | `![Project Case Study](docs/screenshots/casestudy_desktop.png)` *(TODO_USER: Capture 1440px)* |
| **Mobile Home (`/`)** | Mobile (375px) | `![Mobile Home](docs/screenshots/home_mobile.png)` *(TODO_USER: Capture 375px)* |

---

## Tech Stack

- **Framework**: React 19, TypeScript
- **Routing**: React Router DOM v7 (Multi-page SPA with prerendered static routes)
- **Styling**: Tailwind CSS v3, Vanilla CSS custom properties (`index.css`)
- **Typography**: Inter (400, 500, 600, 700)
- **Icons**: Custom standalone accessible SVGs (`src/components/Icons.tsx`)
- **Build & Prerender Tooling**: Vite 8, Node.js static route prerenderer (`scripts/prerender.cjs`), Sharp (`scripts/generate_og_image.cjs`), pdf-lib (`scripts/generate_resume.cjs`)
- **Testing**: Playwright (automated viewport tests at 375, 768, and 1440px), WCAG 2.1 programmatic contrast checker (`scripts/verify_contrast.cjs`)
- **Deployment**: Vercel (`vercel.json` SPA catch-all rewrites)

---

## Project Structure

```
├── dist/                      # Production build output with prerendered static HTML routes
├── docs/                      # Verification and user inputs needed
│   ├── USER_INPUTS_NEEDED.md  # Comprehensive TODO_USER checklist for links, dates, & metrics
│   └── screenshots/           # Screenshot placeholders
├── public/                    # Static assets (favicons, og-image.png, robots.txt, sitemap.xml, resume.pdf)
├── scripts/                   # Build-time and QA scripts
│   ├── generate_og_image.cjs  # Sharp 1200x630 social card generator (light design)
│   ├── generate_resume.cjs    # PDF resume builder
│   ├── prerender.cjs          # Static HTML prerenderer for all 15 routes
│   ├── test_responsive.cjs    # Playwright responsiveness and tap target test suite
│   └── verify_contrast.cjs    # Programmatic WCAG AA contrast ratio verification
├── src/
│   ├── assets/                # Profile photography (vinesh_portrait.webp)
│   ├── components/            # Layout, Header, Footer, Icons, ScrollToTop
│   ├── data/                  # Content data layer (Source of Truth)
│   │   ├── experience.ts      # Work history, timeline, and education
│   │   ├── profile.ts         # Name, titles, and site URL constants
│   │   ├── projects.ts        # Project catalog with slugs and architecture data
│   │   └── skills.ts          # Grouped skills with project verification helper
│   ├── hooks/                 # useDocumentMeta hook
│   ├── pages/                 # Multi-page route components
│   │   ├── HomePage.tsx       # / (Hero, Currently, 3 Selected Projects)
│   │   ├── ProjectsPage.tsx   # /projects (2-column grid, category chips, evidence badges)
│   │   ├── ProjectDetailPage.tsx # /projects/:slug (Case study with architecture & disclaimers)
│   │   ├── AboutPage.tsx      # /about (Bio, skills by domain, education)
│   │   ├── ExperiencePage.tsx # /experience (Work history vertical list)
│   │   ├── ContactPage.tsx    # /contact (Email, LinkedIn, GitHub, Resume)
│   │   └── NotFoundPage.tsx   # 404 handler
│   ├── App.tsx                # Route definitions
│   ├── index.css              # Design tokens and base styles
│   └── main.tsx               # Client entry point
├── index.html                 # Shell HTML with meta tags, JSON-LD, and static fallback
├── tailwind.config.js         # Design tokens, restrained color palette, and font scale
├── vercel.json                # Vercel SPA rewrite configuration
└── vite.config.ts             # Vite configuration
```

---

## Getting Started

### Prerequisites
- Node.js 18+ (Node 20+ recommended)
- npm 9+

### Installation
```bash
git clone https://github.com/Vinzz006/Vinesh-Portfolio-Website.git
cd Vinesh-Portfolio-Website
npm install
```

### Development
```bash
npm run dev
```

### Production Build & Static Prerendering
```bash
npm run build
```
This runs TypeScript checking, Vite bundling, and the static HTML prerenderer across all routes (`/`, `/projects`, `/projects/:slug`, `/about`, `/experience`, `/contact`).

### Local Preview
```bash
npm run preview
```

### Verification & Testing Scripts
```bash
# Verify WCAG AA color contrast programmatically
node scripts/verify_contrast.cjs

# Run automated responsiveness & tap target tests across 375px, 768px, and 1440px
node scripts/test_responsive.cjs

# Regenerate resume PDF
node scripts/generate_resume.cjs

# Regenerate social share card (1200x630 PNG)
node scripts/generate_og_image.cjs
```

---

## How to Add or Edit a Project

All project content is statically typed and declared in [`src/data/projects.ts`](src/data/projects.ts). To add a new project:

1. Open `src/data/projects.ts`.
2. Add a new object to the `projects` array:
   ```ts
   {
     id: 11,
     title: 'Your Project Title',
     slug: 'your-project-title', // lowercase, hyphenated URL slug
     category: 'Embedded AI / IoT',
     description: 'A 1-2 sentence plain-language summary for card previews.',
     longDescription: 'Detailed explanation of what you built for the case study.',
     technologies: ['ESP32', 'Python', 'FastAPI'],
     architecture: ['Sensors', 'ESP32', 'Cloud', 'Frontend'],
     architectureDetails: [
       {
         name: 'Sensors',
         role: 'Data Acquisition',
         tech: 'I2C / GPIO',
         type: 'sensor',
         description: 'Collects physical measurements at 50Hz.'
       }
     ],
     status: 'In Progress', // 'Active' | 'In Progress' | 'Research' | 'Complete'
     githubUrl: 'https://github.com/Vinzz006/your-repo', // or null if private/unreleased
     liveUrl: null, // or live deployment URL
     demoVideoUrl: null,
     featured: false, // set true to feature on the homepage
   }
   ```
3. Run `npm run build`. The build script will automatically:
   - Validate TypeScript types.
   - Generate static pre-rendered HTML for `/projects/your-project-title`.
   - Update the site index.
4. Add the new slug to `public/sitemap.xml`.

---

## Deployment (Vercel)

The site is configured for zero-configuration continuous deployment on Vercel:

1. Connect your GitHub repository to [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Rewrites: Handled via `vercel.json` so deep links and client routing work seamlessly with fallback to `index.html`.

---

## License

This project is licensed under the [MIT License](LICENSE).
