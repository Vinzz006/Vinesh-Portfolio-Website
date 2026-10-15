# User Inputs Needed (TODO_USER Tracker)

This document tracks all items where factual, technical, or verification data can only be provided by the portfolio owner (Vinesh Shanmugam). Per repository guidelines, no metrics, dates, links, or technical claims are fabricated.

---

## 1. Projects Proof & Links (`src/data/projects.ts`)

For each project, please provide real repository links, live deployment URLs, demo video links, role titles, and measured results.

### Project 1: TinyML Human Activity & Fall Detection
- `githubUrl`: TODO_USER (Provide public repository URL if published, or leave null)
- `liveUrl`: TODO_USER (Provide live dashboard URL if deployed, or leave null)
- `demoVideoUrl`: TODO_USER (Provide video recording link e.g. YouTube, Loom, or leave null)
- `images`: TODO_USER (Provide paths to screenshots/architecture diagrams if available)
- `role`: TODO_USER (e.g., "Embedded AI Developer", "Firmware & ML Engineer")
- `results`: TODO_USER (Document verified test metrics with test setup, e.g. dataset split, device tested on)

### Project 2: PancreaSense AI
- `githubUrl`: TODO_USER
- `liveUrl`: TODO_USER
- `demoVideoUrl`: TODO_USER
- `images`: TODO_USER
- `role`: TODO_USER
- `results`: TODO_USER

### Project 3: SmartWatts
- `githubUrl`: TODO_USER
- `liveUrl`: TODO_USER
- `demoVideoUrl`: TODO_USER
- `images`: TODO_USER
- `role`: TODO_USER
- `results`: TODO_USER

### Project 4: Transit Assist
- `githubUrl`: TODO_USER
- `liveUrl`: TODO_USER
- `demoVideoUrl`: TODO_USER
- `images`: TODO_USER
- `role`: TODO_USER
- `results`: TODO_USER

### Project 5: DevOpsGuard
- `githubUrl`: TODO_USER
- `liveUrl`: TODO_USER
- `demoVideoUrl`: TODO_USER
- `images`: TODO_USER
- `role`: TODO_USER
- `results`: TODO_USER

### Project 6: AI Medical Report & Prescription Analyzer
- `githubUrl`: TODO_USER
- `liveUrl`: TODO_USER
- `demoVideoUrl`: TODO_USER
- `images`: TODO_USER
- `role`: TODO_USER
- `results`: TODO_USER

### Project 7: AI Farmer Query & Advisory System
- `githubUrl`: TODO_USER
- `liveUrl`: TODO_USER
- `demoVideoUrl`: TODO_USER
- `images`: TODO_USER
- `role`: TODO_USER
- `results`: TODO_USER

### Project 8: Medical Image Processing
- `githubUrl`: TODO_USER
- `liveUrl`: TODO_USER
- `demoVideoUrl`: TODO_USER
- `images`: TODO_USER
- `role`: TODO_USER
- `results`: TODO_USER

### Project 9: RailDesk AI
- `githubUrl`: TODO_USER
- `liveUrl`: TODO_USER
- `demoVideoUrl`: TODO_USER
- `images`: TODO_USER
- `role`: TODO_USER
- `results`: TODO_USER

### Project 10: ESP32 + Firebase Real-Time IoT Dashboard
- `githubUrl`: TODO_USER
- `liveUrl`: TODO_USER
- `demoVideoUrl`: TODO_USER
- `images`: TODO_USER
- `role`: TODO_USER
- `results`: TODO_USER

---

## 2. Experience & Timeline (`src/data/experience.ts`)

### BSNL Internship
- `period`: TODO_USER (Currently set to `'Internship'`. Please specify exact date range, e.g., `'Jun 2024 – Jul 2024'` or month/year)

---

## 3. Measured Results Metric Tiles (`src/data/metrics.ts`)

Per Phase 2, `measuredResults` is empty by default. To display defensible metric cards on the About section:
- For each claim, supply:
  - `label`: Metric name (e.g. "TinyML Fall Detection Accuracy")
  - `value`: Numerical or textual result
  - `unit`: Measurement unit (e.g. "%", "ms", "KB")
  - `method`: Exact measurement methodology (e.g., "10-fold cross-validation on test split", "Hardware oscilloscope GPIO pulse")
  - `datasetOrSourceUrl`: Reference dataset or benchmark code link

---

## 4. Technical Claims Verification (`docs/CLAIMS_TO_VERIFY.md`)
- Review each technical claim listed in `docs/CLAIMS_TO_VERIFY.md` and mark as `[x] implemented`, `[ ] planned`, or `[ ] remove`.

---

## 5. TinyML Research Simulator Real Measurements (`src/sections/ResearchSection.tsx`)
- The TinyML quantization simulator currently displays illustrative constants (148/38/19 KB flash, 42/14/8 KB RAM, 28/7.4/4.1 ms latency, 98.4/97.9/95.8 % accuracy) labeled clearly as `ILLUSTRATIVE SIMULATOR: example values, not measured results`.
- To replace these with real hardware measurements:
  - Document test device (e.g. ESP32-WROOM-32, 240MHz)
  - Document benchmark model framework (e.g. TensorFlow Lite for Microcontrollers / ESP-NN)
  - Document test dataset, split, and sample size
  - Document hardware latency measurement technique (e.g. GPIO toggle + logic analyzer / DWT cycle counter)

