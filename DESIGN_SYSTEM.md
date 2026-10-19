# DESIGN_SYSTEM.md — Hardware Debug Console & Workbench Design System
**Project:** Vinesh Shanmugam Portfolio Redesign  
**Target Identity:** ECE Student · Embedded AI & IoT · Full-Stack Dashboards  
**Design Persona:** Senior Creative Front-End Engineer & Hardware Tool Designer  
**Status:** Design Tokens Defined — Ready for Implementation

---

## 1. Design Concept & Philosophy

### 1.1 The Metaphor: An Engineer's Hardware Debug Bench
Rather than a generic SaaS marketing website with pastel gradient blobs, floating cards, and rounded glassmorphism, the portfolio is conceived as a **high-precision hardware debug console and logic analyzer workbench**.

Think:
- **Agilent / Keysight InfiniiVision Oscilloscopes & Logic Analyzers**
- **Saleae Logic Pro interface**
- **Altium / KiCad interactive PCB trace routing environments**
- **DEC VT220 / Sun Microsystems hardware diagnostic monitors**
- **Embedded RTOS kernel debug serial consoles (FreeRTOS / ESP-IDF)**

### 1.2 Core Design Principles
1. **Zero Fluff, 100% Signal Integrity:**
   - Every border, label, status LED, and hex tag serves an architectural purpose.
   - Eliminate generic floating bubbles, meteors, and pastel gradients.
2. **Sharp, Industrial Geometry:**
   - Strict **square corners (`rounded-none`)** across all panels, buttons, chips, and modals.
   - **1px structural borders** representing instrument chassis and PCB isolation channels.
   - **Corner brackets (`┌ ┐ └ ┘`)** and register offset labels (`0x00`–`0xFF`).
3. **High-Density, Tabular Legibility:**
   - Information structured in registers, pinouts, logic lines, and dataflow channels.
4. **Purposeful, Mechanical Motion:**
   - No gratuitous floating or bouncing. Motion consists of oscilloscope waveforms, boot sequences, terminal typewriter decryptions, and subtle signal strobes.
   - Strictly honors `prefers-reduced-motion`.

---

## 2. Signature Color Palette & Accent Justification

### 2.1 Accent Selection: Phosphor Green (`#39FF88`)
- **Primary Signature Accent:** **Phosphor Green (`#39FF88`)**
- **Justification:**
  1. **Historical & Physical Authenticity:**
     Phosphor green (specifically P31 phosphor, ~525nm peak wavelength) is the quintessential color of electron-beam cathode ray tube (CRT) oscilloscopes, logic analyzer probes, vector displays, and green solder-mask PCB traces. As an Electronics & Communication Engineering (ECE) student building TinyML edge pipelines and ESP32 hardware, phosphor green directly reinforces the physical computing reality of the work.
  2. **Uncompromising Contrast:**
     On a near-black substrate (`#060806`), `#39FF88` yields a contrast ratio of **14.5:1**, far exceeding WCAG AAA requirements. It allows ultra-fine 1px lines, 9px micro-labels, and waveform traces to remain razor-sharp without needing heavy diffuse glows.
  3. **Distinct from Generic SaaS:**
     Modern SaaS portfolios default to cyan (`#00D4FF`) and purple/violet (`#7C3AED`). Phosphor green instantly separates the site from marketing software and grounds it in industrial engineering.

### 2.2 Secondary Functional Accent: Diagnostic Amber (`#FFB000`)
- **Secondary Accent:** **Amber Gold (`#FFB000`)**
- **Role:** Reserved exclusively for warnings, live hardware simulation events, test packet dispatchers, interrupt flags, and in-progress states.

### 2.3 Comprehensive Palette Specification

| Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `--bg-base` | `#060806` | Deepest chassis black with 1% green phosphor undertone |
| `--bg-panel` | `#0B0E0B` | Instrument bay / module panel background |
| `--bg-panel-elevated`| `#111611` | Hovered panel or active control surface |
| `--bg-well` | `#040504` | Recessed screen / terminal well / canvas background |
| `--border-subtle` | `#1A231A` | Standard 1px frame division lines |
| `--border-medium` | `#293629` | Active instrument borders, table grid lines |
| `--border-active` | `rgba(57, 255, 136, 0.45)` | Focused, probed, or active instrument channel |
| `--accent-phosphor`| `#39FF88` | **Signature primary accent**: signal traces, LEDs, primary values |
| `--accent-phosphor-dim` | `#1FB85D` | Muted phosphor: inactive telemetry, secondary meters |
| `--accent-amber` | `#FFB000` | **Secondary accent**: alerts, test packets, interrupts, pending |
| `--accent-red` | `#FF4D4D` | Faults, exceptions, offline status |
| `--text-bright` | `#EAF2EA` | High-priority readings, primary headlines, active registers |
| `--text-primary` | `#CCDACC` | Standard body copy, component descriptions |
| `--text-muted` | `#6D7D6D` | Datasheet labels, register addresses (`0x00`), inactive metadata |
| `--text-dim` | `#3D493D` | Background graticule numbers, subtle line numbering |

---

## 3. Typography & Type Scale

### 3.1 Font Families
1. **Display, Code, UI & Datafont:**
   - **`JetBrains Mono`** (Fallbacks: `IBM Plex Mono`, `ui-monospace`, `monospace`)
   - Used for: All headers, section labels, navigation, buttons, registers, status indicators, metrics, tables, and terminal streams.
2. **Body & Prose Font:**
   - **`Inter`** (Fallbacks: `system-ui`, `-apple-system`, `sans-serif`)
   - Used for: Project descriptions, biography narratives, and long-form explanatory text to ensure effortless reading comfort.

### 3.2 Modular Type Scale

| Class | Font Size / Line Height | Font Family | Usage |
| :--- | :--- | :--- | :--- |
| `text-micro` | `9px / 1.1` | JetBrains Mono | Hex register offsets (`0x0F`), bus widths (`3.3V`), pinout tags |
| `text-mono-xs` | `11px / 1.3` | JetBrains Mono | Section prefixes (`[01] //`), status LEDs, datasheet keys |
| `text-mono-sm` | `12px / 1.4` | JetBrains Mono | Code lines, terminal inputs, table headers, buttons |
| `text-body-sm` | `13px / 1.5` | Inter | Compact descriptions, card metadata paragraphs |
| `text-body` | `14px / 1.6` | Inter | Standard body copy, research summaries |
| `text-body-lg` | `16px / 1.6` | Inter | Hero narrative, lead paragraphs |
| `text-heading-sm`| `16px / 1.3` | JetBrains Mono | Card titles, project names, module headers |
| `text-heading-md`| `20px / 1.25` | JetBrains Mono | Sub-section headings, modal titles, simulator meters |
| `text-heading-lg`| `28px / 1.15` | JetBrains Mono | Section titles (`[03] // PROJECTS_CATALOG`) |
| `text-display` | `44px–60px / 0.95` | JetBrains Mono | Main hero display: `VINESH SHANMUGAM` |

---

## 4. Layout, Spacing & Structural Chassis

- **Grid System:** 8px base grid with 4px sub-unit for micro-alignments.
- **Max Width:** `1280px` (`max-w-7xl`) centered with `px-4 sm:px-6 lg:px-8`.
- **Corner Style:** **Strict 0px (`rounded-none`)** across all elements.
- **Section Layout Structure:**
  Each section is presented as an **Instrument Bay Channel**:
  ```
  ┌── [02] // SYSTEM_ARCHITECTURE ──────────────────────────────[STATUS: PROBING]──┐
  │                                                                                │
  │   [Content / Oscilloscope / Registers / Schematics]                            │
  │                                                                                │
  └─────────────────────────────────────────────────────────────[CHANNEL: CH_02]───┘
  ```

---

## 5. Signature Hardware Debug Components

### 5.1 `ConsolePanel` / `BenchChassis`
- Square 1px border (`border-border-subtle`).
- Background: `#0B0E0B`.
- Header bar: 1px bottom border, displaying panel title in `text-mono-xs`, right-aligned address (`ADDR: 0x2A`), and status LED.
- Corner crosshairs: `+` markers in `#3D493D` at the 4 exterior intersections.

### 5.2 Section Labels
Format:
```
[01] // ABOUT_SYSTEM
[02] // SYSTEM_PIPELINE_LAB
[03] // FIRMWARE_PROJECTS
[04] // HARDWARE_REGISTER_SKILLS
[05] // RESEARCH_NODES
[06] // SYSTEM_CHRONOLOGY
[07] // GITHUB_TELEMETRY
[08] // CONTACT_CONSOLE
```

### 5.3 Status LEDs
- 6px × 6px square or circular indicator with crisp borders.
- States:
  - `LED-ONLINE`: Solid `#39FF88` with subtle 2px ring `rgba(57, 255, 136, 0.3)`.
  - `LED-BUSY`: Blinking `#FFB000` (1Hz duty cycle).
  - `LED-FAULT`: Solid `#FF4D4D`.

### 5.4 Datasheet Metadata & Register Tables
- Two-column or multi-column data grid with 1px dotted borders:
  ```
  REGISTER: 0x01 | VALUE: MPU6050_ACCEL | PROTOCOL: I2C_FAST (400kHz)
  REGISTER: 0x02 | VALUE: ESP32_WROOM   | FREQ: 240MHz DUAL-CORE
  REGISTER: 0x03 | VALUE: TINYML_MODEL  | INFERENCE: 7.4ms (INT8)
  ```

### 5.5 Hardware Buttons (`ConsoleButton`)
- Square borders (`rounded-none`).
- Primary:
  - Default: `border border-phosphor bg-phosphor/10 text-phosphor`
  - Hover: `bg-phosphor text-black shadow-[0_0_15px_rgba(57,255,136,0.4)]`
- Secondary:
  - Default: `border border-border-medium bg-transparent text-text-primary`
  - Hover: `border-phosphor text-phosphor bg-phosphor/5`

### 5.6 Background PCB Trace / Graticule Grid
- Subtle CSS linear-gradient grid simulating oscilloscope screen graticule:
  - Primary grid lines every 40px: `rgba(57, 255, 136, 0.03)`
  - Sub-division tick marks every 8px: `rgba(255, 255, 255, 0.02)`
  - Optional subtle PCB trace lines spanning diagonal 45-degree bus connectors.

---

## 6. Motion & Interaction Rules

1. **Purposeful, Non-Intrusive:**
   - No floating bubbles, no continuous sine-wave bobbing, no bouncy elastic physics.
2. **Terminal Typewriter & Decryption:**
   - Key titles decipher into place on scroll entrance (random glyphs settling into final characters in 200–300ms).
3. **Signal Waveform Rendering:**
   - The interactive signal waveform in the Engineering Lab uses an optimized 2D canvas with direct path stroke drawing (zero Three.js overhead).
4. **Interactive Probing:**
   - Clicking a project or architecture node simulates a "logic analyzer channel select" — instantly updating register readouts with a clean scanline flicker.
5. **Respect `prefers-reduced-motion`:**
   - All deciphering, blinking, and waveform sweeps default to static, immediately rendered states.

---

## 7. Implementation Tokens (CSS Variables)

```css
:root {
  /* Surface & Background */
  --bg-base: #060806;
  --bg-panel: #0B0E0B;
  --bg-panel-elevated: #111611;
  --bg-well: #040504;

  /* Borders */
  --border-subtle: #1A231A;
  --border-medium: #293629;
  --border-active: rgba(57, 255, 136, 0.45);

  /* Accents */
  --accent-phosphor: #39FF88;
  --accent-phosphor-dim: #1FB85D;
  --accent-phosphor-glow: rgba(57, 255, 136, 0.15);
  --accent-amber: #FFB000;
  --accent-amber-glow: rgba(255, 176, 0, 0.15);
  --accent-red: #FF4D4D;

  /* Typography Colors */
  --text-bright: #EAF2EA;
  --text-primary: #CCDACC;
  --text-muted: #6D7D6D;
  --text-dim: #3D493D;
}
```
