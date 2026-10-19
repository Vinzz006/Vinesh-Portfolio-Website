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
