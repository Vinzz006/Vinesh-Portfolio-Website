# Technical Claims to Verify

> **Note**: As specified in Phase 2, no technical claims have been modified or deleted. Review each claim below and select whether it is currently implemented in hardware/code, planned for future development, or should be removed from the portfolio.

---

## Project 1: TinyML Human Activity & Fall Detection

- **Claim**: IMU sensor captures 3-axis acceleration and angular velocity at 50Hz sample rate via MPU6050 / I2C.
  - **Location**: `src/data/projects.ts:55-57`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Microcontroller runs FreeRTOS / C++, buffers raw IMU data, handles timing synchronization, and prepares packets.
  - **Location**: `src/data/projects.ts:62-64`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Digital filtering (Low-Pass Filter / FFT) eliminates gravity bias and high-frequency noise.
  - **Location**: `src/data/projects.ts:69-71`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Computes statistical and frequency-domain features (RMS / Variance / Peak Count) across sliding windows.
  - **Location**: `src/data/projects.ts:76-78`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: On-device / ML inference classifies movement patterns (walking, sitting, sudden fall impact) using Scikit-learn / TensorFlow.
  - **Location**: `src/data/projects.ts:83-85`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Transmits categorized events and telemetry data via Firebase RTDB / REST with "millisecond latency".
  - **Location**: `src/data/projects.ts:90-92`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: React / Recharts dashboard displays live motion graphs, fall alerts, and historical activity logs.
  - **Location**: `src/data/projects.ts:97-99`
  - [ ] implemented  [ ] planned  [ ] remove

---

## Project 2: PancreaSense AI

- **Claim**: Gathers non-invasive physiological readings and ambient metrics via biometric/environmental sensors.
  - **Location**: `src/data/projects.ts:132-134`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: ESP32 runs ESP-IDF / Wi-Fi, performs on-device calibration, and "securely transmits encrypted sensor readings".
  - **Location**: `src/data/projects.ts:139-141`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: FastAPI backend with Python / Pydantic validates incoming payloads, manages patient sessions, and dispatches inference tasks.
  - **Location**: `src/data/projects.ts:146-148`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Scikit-Learn / SHAP model computes predictive risk scores with explainable feature importance values.
  - **Location**: `src/data/projects.ts:153-155`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: PostgreSQL / SQLAlchemy maintains "encrypted historical records and audit logs".
  - **Location**: `src/data/projects.ts:160-162`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: React / TypeScript / Tailwind dashboard visualizes risk factors, SHAP summary plots, and temporal trends.
  - **Location**: `src/data/projects.ts:167-169`
  - [ ] implemented  [ ] planned  [ ] remove

---

## Project 3: SmartWatts

- **Claim**: Current & voltage sensing via CT Sensor / PZEM-004T measures AC voltage, RMS current, active power, and cumulative kWh.
  - **Location**: `src/data/projects.ts:202-204`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: ESP32 running C++ / PubSubClient samples power measurements every second and aggregates hourly metrics.
  - **Location**: `src/data/projects.ts:209-211`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: MQTT Broker with QoS 1 guarantees low-bandwidth transmission of telemetry payloads.
  - **Location**: `src/data/projects.ts:216-218`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Firebase RTDB stores live state and broadcasts updates to connected clients.
  - **Location**: `src/data/projects.ts:223-225`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Analytics engine uses Isolation Forest / Python to detect unexpected spikes, phantom power draws, and irregular usage.
  - **Location**: `src/data/projects.ts:230-232`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: React / Recharts / Tailwind dashboard provides real-time wattage meters, tariff calculators, and efficiency tips.
  - **Location**: `src/data/projects.ts:237-239`
  - [ ] implemented  [ ] planned  [ ] remove

---

## Project 4: Transit Assist

- **Claim**: Live camera / video stream captures forward-facing live video feed in transit stations and vehicles.
  - **Location**: `src/data/projects.ts:272-274`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: YOLO / OpenCV vision AI identifies transit signage, platform edges, obstacles, and accessibility ramps.
  - **Location**: `src/data/projects.ts:279-281`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Route planner uses Python / Graph Algorithms to calculate optimal barrier-free transfer paths and platform navigation.
  - **Location**: `src/data/projects.ts:286-288`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Integrates real-time timetable updates, GPS coordinates, and arrival predictions via Transit Feeds / Maps REST.
  - **Location**: `src/data/projects.ts:293-295`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: React / Web Speech Audio UI delivers high-contrast visuals and auditory guidance cues for commuters.
  - **Location**: `src/data/projects.ts:300-302`
  - [ ] implemented  [ ] planned  [ ] remove

---

## Project 5: DevOpsGuard

- **Claim**: GitHub Webhooks / REST receiver listens for commit pushes, pull requests, workflow runs, and deployment triggers.
  - **Location**: `src/data/projects.ts:335-337`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: CI/CD telemetry monitor captures Docker runner build duration, step exit codes, and dependency cache statuses.
  - **Location**: `src/data/projects.ts:342-344`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: FastAPI / Async Workers parse logs, aggregate timing statistics, and orchestrate remediation alerts.
  - **Location**: `src/data/projects.ts:349-351`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Python / Time-series anomaly detector identifies slow build regressions, flaky test runs, and configuration drifts.
  - **Location**: `src/data/projects.ts:356-358`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: React / Tailwind CSS dashboard summarizes workflow health, failure frequencies, and pipeline bottlenecks.
  - **Location**: `src/data/projects.ts:363-365`
  - [ ] implemented  [ ] planned  [ ] remove

---

## Project 6: AI Medical Report & Prescription Analyzer

- **Claim**: Document upload interface for clinical reports and prescription scans.
  - **Location**: `src/data/projects.ts:398-400`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: OCR via Tesseract / Vision Parser extracts printed and handwritten alphanumeric tokens from scanned files.
  - **Location**: `src/data/projects.ts:405-407`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: NLP model using BioBERT / Named Entity Recognition identifies medication dosages, test biomarkers, and reference ranges.
  - **Location**: `src/data/projects.ts:412-414`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: FastAPI / Python structures extracted findings into JSON summaries.
  - **Location**: `src/data/projects.ts:419-421`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: React / Tailwind dashboard highlights critical values with side-by-side document comparison.
  - **Location**: `src/data/projects.ts:426-428`
  - [ ] implemented  [ ] planned  [ ] remove

---

## Project 7: AI Farmer Query & Advisory System

- **Claim**: Multilingual voice/text form receives queries on crop diseases, weather impact, and pest management.
  - **Location**: `src/data/projects.ts:461-463`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Transformers / Sentence Embeddings engine classifies intent, botanical terms, and regional crop nomenclature.
  - **Location**: `src/data/projects.ts:468-470`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Vector DB / Agronomy Dataset stores vetted agricultural guidelines, seasonal advisories, and remedies.
  - **Location**: `src/data/projects.ts:475-477`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: FastAPI / Python backend synthesizes concise, actionable advice tailored to soil and season.
  - **Location**: `src/data/projects.ts:482-484`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: React / Responsive PWA delivers clear visual guides and step-by-step crop care action items.
  - **Location**: `src/data/projects.ts:489-491`
  - [ ] implemented  [ ] planned  [ ] remove

---

## Project 8: Medical Image Processing

- **Claim**: DICOM / NIfTI / PNG loader handles MRI brain slices and chest radiograph imaging arrays.
  - **Location**: `src/data/projects.ts:524-526`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: OpenCV / NumPy preprocessing resizes, normalizes pixel intensities, and applies contrast enhancement.
  - **Location**: `src/data/projects.ts:531-533`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: TensorFlow / Keras CNN / U-Net executes encoder-decoder semantic segmentation and classification.
  - **Location**: `src/data/projects.ts:538-540`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Softmax / Binary Mask prediction outputs tumor region contour masks and pathology probability scores.
  - **Location**: `src/data/projects.ts:545-547`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Matplotlib / React Viewer renders color-coded lesion segmentation masks superimposed on original scans.
  - **Location**: `src/data/projects.ts:552-554`
  - [ ] implemented  [ ] planned  [ ] remove

---

## Project 9: RailDesk AI

- **Claim**: React / TypeScript passenger support portal submits complaints, PNR inquiries, lost-and-found reports, and feedback.
  - **Location**: `src/data/projects.ts:587-589`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: FastAPI / Async core backend manages ticket lifecycles, authentication, and SLA timers.
  - **Location**: `src/data/projects.ts:594-596`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: NLP Classification / Scikit AI router categorizes ticket urgency and assigns issues to railway divisions.
  - **Location**: `src/data/projects.ts:601-603`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: PostgreSQL / SQLAlchemy database maintains ticket histories, department logs, and resolution tracking.
  - **Location**: `src/data/projects.ts:608-610`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: WebSockets / Email / SMS notification service sends real-time resolution updates and SMS alerts to passengers.
  - **Location**: `src/data/projects.ts:615-617`
  - [ ] implemented  [ ] planned  [ ] remove

---

## Project 10: ESP32 + Firebase Real-Time IoT Dashboard

- **Claim**: ESP32 / C++ / Wi-Fi microcontroller controls hardware sensors, runs background tasks, and handles Wi-Fi reconnection.
  - **Location**: `src/data/projects.ts:650-652`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: DHT22 / ADC / GPIO sensor interface gathers ambient environmental telemetry.
  - **Location**: `src/data/projects.ts:657-659`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Firebase WebSocket API / RTDB low-latency NoSQL database broadcasts real-time value changes.
  - **Location**: `src/data/projects.ts:664-666`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: React / TypeScript dashboard subscribes to live WebSocket data streams and updates gauges instantly.
  - **Location**: `src/data/projects.ts:671-673`
  - [ ] implemented  [ ] planned  [ ] remove
- **Claim**: Recharts / Smooth Curves telemetry plotting renders live rolling time-series data with threshold alert styling.
  - **Location**: `src/data/projects.ts:678-680`
  - [ ] implemented  [ ] planned  [ ] remove
