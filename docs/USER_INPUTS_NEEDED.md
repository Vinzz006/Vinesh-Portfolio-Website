# User Inputs Needed (TODO_USER Tracker)

This document tracks all items where factual, technical, or verification data can only be provided by the portfolio owner (**Vinesh Shanmugam**). Per repository guidelines, **no metrics, dates, links, or technical claims are fabricated**.

---

## 1. Projects Proof, Roles & Metrics (`src/data/projects.ts`)

For each project case study at `/projects/:slug`, supply verifiable repository links, live deployment URLs, demo video links, screenshots, role titles, problem statements, and measured results.

### Project 1: TinyML Human Activity & Fall Detection (`/projects/tinyml-human-activity-and-fall-detection`)
- [ ] `githubUrl`: Provide public GitHub repo URL if code is open-sourced, or keep `null` (shows "No public code yet").
- [ ] `liveUrl`: Provide live web dashboard URL if deployed, or keep `null`.
- [ ] `demoVideoUrl`: Provide video demo link (e.g. YouTube, Loom, Google Drive), or keep `null`.
- [ ] `images`: Provide relative screenshot/diagram paths (e.g. `['/projects/tinyml_architecture.png']`).
- [ ] `problem`: Define the specific problem statement (e.g. high-latency cloud fall detection vs. low-power on-device inference).
- [ ] `role`: Specify exact engineering role (e.g., "Embedded Systems & Edge ML Developer").
- [ ] `results`: Provide measured numbers with test dataset, split, and methodology (e.g., "Achieved 96.2% fall detection classification accuracy across 500 test trials on ESP32-WROOM-32 with 12ms inference latency measured via GPIO toggle").

### Project 2: PancreaSense AI (`/projects/pancreasense-ai`)
- [ ] `githubUrl`: Public GitHub repo link.
- [ ] `liveUrl`: Live deployment URL.
- [ ] `demoVideoUrl`: Video recording link.
- [ ] `images`: UI screenshot paths.
- [ ] `problem`: Clinical/screening problem addressed.
- [ ] `role`: Engineering responsibility (e.g., "Full-Stack & Explainable AI Engineer").
- [ ] `results`: Measured performance metrics with validation methodology.

### Project 3: SmartWatts (`/projects/smartwatts`)
- [ ] `githubUrl`: Public GitHub repo link.
- [ ] `liveUrl`: Live deployment URL.
- [ ] `demoVideoUrl`: Video recording link.
- [ ] `images`: Hardware setup or dashboard screenshots.
- [ ] `problem`: Commercial or residential energy monitoring challenges.
- [ ] `role`: Engineering responsibility (e.g., "IoT & Anomaly Detection Developer").
- [ ] `results`: Measured wattage sampling accuracy and anomaly detection precision.

### Project 4: Transit Assist (`/projects/transit-assist`)
- [ ] `githubUrl`: Public GitHub repo link.
- [ ] `liveUrl`: Live deployment URL.
- [ ] `demoVideoUrl`: Video recording link.
- [ ] `images`: Object detection sample frames and UI screenshots.
- [ ] `problem`: Commuter transit navigation barriers.
- [ ] `role`: Engineering responsibility (e.g., "Computer Vision Developer").
- [ ] `results`: Measured inference frames-per-second (FPS) and mAP score with dataset details.

### Project 5: DevOpsGuard (`/projects/devopsguard`)
- [ ] `githubUrl`: Public GitHub repo link.
- [ ] `liveUrl`: Live deployment URL.
- [ ] `demoVideoUrl`: Video recording link.
- [ ] `images`: Architecture diagrams or dashboard screenshots.
- [ ] `problem`: CI/CD pipeline bottleneck and flakiness detection.
- [ ] `role`: Engineering responsibility (e.g., "Backend & DevOps Engineer").
- [ ] `results`: Anomaly detection false-positive rate and log processing latency.

### Project 6: AI Medical Report & Prescription Analyzer (`/projects/ai-medical-report-and-prescription-analyzer`)
- [ ] `githubUrl`: Public GitHub repo link.
- [ ] `liveUrl`: Live deployment URL.
- [ ] `demoVideoUrl`: Video recording link.
- [ ] `images`: Document extraction side-by-side screenshots.
- [ ] `problem`: Unstructured handwritten/printed clinical documentation review.
- [ ] `role`: Engineering responsibility (e.g., "NLP & Backend Developer").
- [ ] `results`: Named entity recognition F1-score across evaluated medical report samples.

### Project 7: AI Farmer Query & Advisory System (`/projects/ai-farmer-query-and-advisory-system`)
- [ ] `githubUrl`: Public GitHub repo link.
- [ ] `liveUrl`: Live deployment URL.
- [ ] `demoVideoUrl`: Video recording link.
- [ ] `images`: Mobile UI and advisory screenshots.
- [ ] `problem`: Multilingual agricultural query resolution in rural areas.
- [ ] `role`: Engineering responsibility (e.g., "NLP & Full-Stack Developer").
- [ ] `results`: Query response latency and domain intent classification accuracy.

### Project 8: Medical Image Processing (`/projects/medical-image-processing`)
- [ ] `githubUrl`: Public GitHub repo link.
- [ ] `liveUrl`: Live deployment URL.
- [ ] `demoVideoUrl`: Video recording link.
- [ ] `images`: MRI segmentation mask overlays.
- [ ] `problem`: Automated brain tumor segmentation and chest radiograph triage.
- [ ] `role`: Engineering responsibility (e.g., "Deep Learning & Vision Researcher").
- [ ] `results`: Dice similarity coefficient (DSC) or IoU score on benchmark dataset (e.g. BraTS).

### Project 9: RailDesk AI (`/projects/raildesk-ai`)
- [ ] `githubUrl`: Public GitHub repo link.
- [ ] `liveUrl`: Live deployment URL.
- [ ] `demoVideoUrl`: Video recording link.
- [ ] `images`: Support portal and ticket routing screenshots.
- [ ] `problem`: Railway complaint classification and SLA routing backlog.
- [ ] `role`: Engineering responsibility (e.g., "Full-Stack SaaS Developer").
- [ ] `results`: Automatic routing accuracy and ticket dispatch speedup.

### Project 10: ESP32 + Firebase Real-Time IoT Dashboard (`/projects/esp32-firebase-real-time-iot-dashboard`)
- [ ] `githubUrl`: Public GitHub repo link.
- [ ] `liveUrl`: Live deployment URL.
- [ ] `demoVideoUrl`: Video recording link.
- [ ] `images`: Sensor wiring and telemetry chart screenshots.
- [ ] `problem`: Low-latency real-time telemetry streaming from embedded nodes to cloud web clients.
- [ ] `role`: Engineering responsibility (e.g., "Embedded Systems Engineer").
- [ ] `results`: Measured telemetry packet sync latency and packet delivery reliability.

---

## 2. Experience & Timeline Verification (`src/pages/ExperiencePage.tsx`)

### BSNL Internship
- [ ] `dates`: Provide exact verified date range (e.g., `Jun 2024 – Jul 2024` or `May 2024 – Jun 2024`). *(Omitted on `/experience` until verified to maintain accuracy)*.

### Certifications
- [ ] Certifications: If you hold verified industry or academic certifications (e.g. AWS, Cisco, IEEE, NPTEL, Coursera), list them here with:
  - Name of certification
  - Issuing organization
  - Date earned
  - Credential ID / URL link

---

## 3. Measured Benchmark Numbers (`src/data/projects.ts` Results)

To display defensible technical metrics in any case study:
- For each claim, document:
  1. **Claimed Value**: (e.g., "4.1 ms inference latency", "96.4% test accuracy")
  2. **Test Hardware / Environment**: (e.g., ESP32-WROOM-32 @ 240MHz, 520 KB SRAM)
  3. **Dataset & Split**: (e.g., 80/20 train/test split on collected accelerometer dataset of 1,200 samples)
  4. **Measurement Method**: (e.g., GPIO pin high/low pulse measured on digital storage oscilloscope)

---

## 4. Custom Production Domain

- [ ] If you configure a custom root domain (e.g., `https://vineshshanmugam.com` or `https://vinzz.dev`):
  - Update `SITE_URL` in `src/data/profile.ts`.
  - Update canonical and Open Graph URLs in `index.html`.
  - Update URLs in `public/robots.txt` and `public/sitemap.xml`.
  - Re-run `npm run build`.
