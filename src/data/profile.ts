/**
 * Global profile identity and positioning constants.
 * Hardware Debug Console & Workbench Configuration.
 */
export const OWNER_NAME = 'Vinesh Shanmugam';
export const HERO_TITLE = 'ECE Student · Embedded AI & IoT';
export const HERO_SUBTITLE = 'Also builds full-stack dashboards';
export const SITE_URL = 'https://vinesh-portfolio-website.vercel.app';

/**
 * Live hardware-style status panel configuration.
 * Edit these values in one place to update hero status displays across the site.
 */
export const STATUS_PANEL = {
  location: 'Tiruchirappalli, IN',
  status: 'Open to internships',
  stack: 'ESP32 / TinyML / React',
  systemStatus: 'ONLINE // NOMINAL',
  clockFrequency: '240 MHz (Dual-Core)',
  telemetryBus: 'I2C / SPI / MQTT',
  firmwareVersion: 'TODO: add firmware version',
} as const;

export const CONTACT_LINKS = {
  email: 'shanmugamvinesh75@gmail.com',
  github: 'https://github.com/Vinzz006',
  linkedin: 'https://www.linkedin.com/in/vinesh-shanmugam-109215363',
  resume: '/resume.pdf',
} as const;

export type PhotoFrameStyle = 'bracket' | 'ring';

export interface ImageSources {
  readonly webp800: string;
  readonly webp400: string;
  readonly jpg800: string;
  readonly jpg400: string;
}

export interface ProfileImageConfig {
  /**
   * Tight head-and-shoulders crop for Hero ID card (55-60% face fill, centered on x=710, small headroom)
   */
  readonly hero: ImageSources;
  /**
   * Wider bust crop for About section (face centered with >15% lateral margins, raised hand & bracelet visible)
   */
  readonly about: ImageSources;
  readonly webp800: string;
  readonly webp400: string;
  readonly jpg800: string;
  readonly jpg400: string;
  readonly alt: string;
  readonly operatorId: string;
  readonly statusText: string;
  /**
   * Switchable frame style:
   * - "bracket" (default): Hardware console operator ID frame with 1px phosphor-green border & corner-bracket markers.
   * - "ring": Thin phosphor-green circular ring (no blue, no glow).
   */
  readonly frameStyle: PhotoFrameStyle;
}

export const PROFILE_IMAGE: ProfileImageConfig = {
  hero: {
    webp800: '/images/profile-hero-800.webp',
    webp400: '/images/profile-hero-400.webp',
    jpg800: '/images/profile-hero-800.jpg',
    jpg400: '/images/profile-hero-400.jpg',
  },
  about: {
    webp800: '/images/profile-800.webp',
    webp400: '/images/profile-400.webp',
    jpg800: '/images/profile-800.jpg',
    jpg400: '/images/profile-400.jpg',
  },
  webp800: '/images/profile-800.webp',
  webp400: '/images/profile-400.webp',
  jpg800: '/images/profile-800.jpg',
  jpg400: '/images/profile-400.jpg',
  alt: 'Portrait of Vinesh Shanmugam',
  operatorId: 'ID: VS-001 // OPERATOR',
  statusText: 'STATUS: ONLINE',
  frameStyle: 'bracket',
} as const;

