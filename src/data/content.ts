/**
 * SINGLE SOURCE OF TRUTH (SSOT) FOR CONTENT
 *
 * All personal biography, status registers, projects, skills, and timeline items
 * are consolidated here.
 *
 * Used by:
 * 1. React components (HeroSection, ProjectsSection, SkillsSection, ContactSection, etc.)
 * 2. scripts/generate_static_fallback.ts (generates index.html fallback at build time)
 */

import {
  OWNER_NAME,
  HERO_TITLE,
  HERO_SUBTITLE,
  SITE_URL,
  STATUS_PANEL,
  CONTACT_LINKS,
  PROFILE_IMAGE,
  type PhotoFrameStyle,
  type ProfileImageConfig,
  type ImageSources,
} from './profile';
import { projectDatasheets, type ProjectDatasheet } from './projectsDatasheet';
import { skillCategories, type SkillCategory } from './skills';
import { timelineItems, type TimelineItem } from './experience';

export {
  OWNER_NAME,
  HERO_TITLE,
  HERO_SUBTITLE,
  SITE_URL,
  STATUS_PANEL,
  CONTACT_LINKS,
  PROFILE_IMAGE,
  type PhotoFrameStyle,
  type ProfileImageConfig,
  type ImageSources,
};
export { projectDatasheets, type ProjectDatasheet };
export { skillCategories, type SkillCategory };
export { timelineItems, type TimelineItem };

export const BIOGRAPHY = {
  headline: 'Where physical hardware becomes intelligent through software & machine learning.',
  shortBio:
    'Building intelligent systems where hardware, software and AI meet. Pursuing B.E. in Electronics & Communication Engineering (2024–2028) at Meenakshi Sundararajan Engineering College. Prototyping end-to-end systems from physical transducers to edge TinyML inference and full-stack web platforms.',
  extendedBio:
    'I build systems where physical hardware becomes intelligent through software and machine learning. My work spans the full stack from reading a physical sensor on microcontrollers to serving model predictions and rendering real-time dashboards.',
  disciplines: ['Embedded Systems & IoT', 'TinyML & Edge AI', 'Full-Stack Web Architecture'],
  academicInstitution: 'Meenakshi Sundararajan Engineering College, Chennai',
  academicDegree: 'B.E. in Electronics & Communication Engineering',
  academicPeriod: '2024 – 2028',
} as const;

export const CONTENT_MANIFEST = {
  owner: OWNER_NAME,
  title: HERO_TITLE,
  subtitle: HERO_SUBTITLE,
  url: SITE_URL,
  status: STATUS_PANEL,
  links: CONTACT_LINKS,
  bio: BIOGRAPHY,
  projects: projectDatasheets,
  skills: skillCategories,
  timeline: timelineItems,
};

export default CONTENT_MANIFEST;
