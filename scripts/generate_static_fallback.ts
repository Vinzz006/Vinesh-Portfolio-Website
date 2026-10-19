/**
 * PREBUILD SCRIPT: Generate Static Fallback HTML in index.html
 *
 * Single Source of Truth: src/data/content.ts
 *
 * This ensures zero content drift between React components and the static HTML
 * pre-rendered inside <div id="root"> for No-JS accessibility and SEO crawlers.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  OWNER_NAME,
  HERO_TITLE,
  STATUS_PANEL,
  CONTACT_LINKS,
  BIOGRAPHY,
  PROFILE_IMAGE,
  projectDatasheets,
  skillCategories,
  timelineItems,
} from '../src/data/content';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderOperatorIdPhotoStatic(variant: 'hero' | 'about', aboveFold: boolean): string {
  const isRing = PROFILE_IMAGE.frameStyle === 'ring';
  const isHero = variant === 'hero';
  const imgSet = isHero ? PROFILE_IMAGE.hero : PROFILE_IMAGE.about;
  const imgDimension = isHero ? 400 : 800;
  const sizesAttr = isHero
    ? '(max-width: 640px) 144px, (max-width: 1024px) 176px, 200px'
    : '(max-width: 640px) 260px, (max-width: 1024px) 300px, 320px';

  return `
    <div class="group relative inline-flex flex-col font-mono select-none" style="touch-action: manipulation;">
      <div class="relative overflow-hidden bg-[#060806] ${
        isRing
          ? 'rounded-full border border-phosphor/70 shadow-[0_0_14px_rgba(57,255,136,0.22)]'
          : 'border border-phosphor/40 shadow-[0_0_10px_rgba(57,255,136,0.12)]'
      } ${
        isHero
          ? 'w-36 h-36 sm:w-44 sm:h-44'
          : 'w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80'
      } aspect-square transition-all duration-300">
        <picture class="w-full h-full block">
          <source type="image/webp" srcset="${imgSet.webp400} 400w, ${imgSet.webp800} 800w" sizes="${sizesAttr}" />
          <source type="image/jpeg" srcset="${imgSet.jpg400} 400w, ${imgSet.jpg800} 800w" sizes="${sizesAttr}" />
          <img src="${imgSet.jpg400}" alt="${escapeHtml(PROFILE_IMAGE.alt)}" width="${imgDimension}" height="${imgDimension}" decoding="async" loading="${aboveFold ? 'eager' : 'lazy'}" ${aboveFold ? 'fetchpriority="high"' : ''} class="w-full h-full object-cover block transition-all duration-300 ${isRing ? 'rounded-full' : ''} contrast-[1.08] brightness-[0.96] sepia-[0.32] hue-rotate-[75deg]" />
        </picture>
        <div class="absolute inset-0 bg-[#39FF88]/15 mix-blend-color pointer-events-none ${isRing ? 'rounded-full' : ''}" aria-hidden="true"></div>
        <div class="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay ${isRing ? 'rounded-full' : ''}" style="background-image: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0px, rgba(0, 0, 0, 0.4) 1px, transparent 1px, transparent 2px);" aria-hidden="true"></div>
        ${!isRing ? `
          <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
            <span class="absolute top-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-phosphor"></span>
            <span class="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-phosphor"></span>
            <span class="absolute bottom-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-phosphor"></span>
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-phosphor"></span>
            <span class="absolute top-1.5 right-1.5 text-[8px] text-phosphor/60 font-mono font-bold leading-none">+</span>
          </div>
        ` : ''}
      </div>
      <div class="bg-[#090C09] border border-console-border border-t-0 p-1.5 sm:p-2 text-left font-mono ${isRing ? 'mt-2 border-t rounded-sm text-center' : ''} ${isHero ? 'w-36 sm:w-44' : 'w-64 sm:w-72 lg:w-80'}">
        <div class="flex items-center justify-between gap-1 text-[9px] sm:text-[10px] leading-tight">
          <div class="flex items-center gap-1.5 truncate">
            <span class="w-1.5 h-1.5 rounded-full bg-phosphor inline-block shrink-0 animate-pulse" aria-hidden="true"></span>
            <span class="text-term-bright font-bold truncate">${escapeHtml(PROFILE_IMAGE.operatorId)}</span>
          </div>
          <span class="text-phosphor font-semibold text-[8px] sm:text-[9px] shrink-0">[TAP]</span>
        </div>
        <div class="flex items-center justify-between text-[8px] sm:text-[9px] text-term-dim mt-0.5">
          <span class="text-phosphor truncate">${escapeHtml(PROFILE_IMAGE.statusText)}</span>
          <span class="text-term-dim uppercase hidden sm:inline">CAM_FEED // 01</span>
        </div>
      </div>
    </div>
  `;
}

export function generateStaticFallback(): string {
  const projectsHtml = projectDatasheets
    .map(
      (p) => `
        <article style="border: 1px solid #1A231A; background-color: #0B0E0B; padding: 1.5rem; margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid #1A231A; padding-bottom: 0.75rem; margin-bottom: 1rem;">
            <div>
              <span style="color: #39FF88; font-size: 0.75rem; font-weight: bold; letter-spacing: 0.05em;">[${escapeHtml(p.datasheetId)}]</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #EAF2EA; margin: 0.25rem 0 0 0;">${escapeHtml(p.project.title)}</h3>
            </div>
            <span style="font-size: 0.7rem; color: #39FF88; border: 1px solid rgba(57,255,136,0.3); background-color: rgba(57,255,136,0.08); padding: 0.2rem 0.5rem; font-weight: bold;">
              ${escapeHtml(p.statusTag)}
            </span>
          </div>

          <p style="color: #CCDACC; font-size: 0.85rem; margin: 0 0 1rem 0; font-family: 'Inter', system-ui, sans-serif;">
            ${escapeHtml(p.project.description)}
          </p>

          <table style="width: 100%; border-collapse: collapse; font-size: 0.75rem; margin-bottom: 1rem; border: 1px solid #1A231A;">
            <tbody>
              ${!p.spec.mcu?.trim().toUpperCase().startsWith('TODO') ? `
              <tr style="border-bottom: 1px solid #1A231A; background-color: #060806;">
                <td style="padding: 0.4rem 0.75rem; color: #94A894; width: 25%;">MCU / BOARD:</td>
                <td style="padding: 0.4rem 0.75rem; color: #EAF2EA; font-weight: bold;">${escapeHtml(p.spec.mcu)}</td>
              </tr>` : ''}
              ${!p.spec.sensors?.trim().toUpperCase().startsWith('TODO') ? `
              <tr style="border-bottom: 1px solid #1A231A; background-color: #0B0E0B;">
                <td style="padding: 0.4rem 0.75rem; color: #94A894;">SENSORS:</td>
                <td style="padding: 0.4rem 0.75rem; color: #EAF2EA;">${escapeHtml(p.spec.sensors)}</td>
              </tr>` : ''}
              ${!p.spec.protocol?.trim().toUpperCase().startsWith('TODO') ? `
              <tr style="border-bottom: 1px solid #1A231A; background-color: #060806;">
                <td style="padding: 0.4rem 0.75rem; color: #94A894;">PROTOCOL:</td>
                <td style="padding: 0.4rem 0.75rem; color: #FFB000; font-weight: bold;">${escapeHtml(p.spec.protocol)}</td>
              </tr>` : ''}
              ${!p.spec.mlModel?.trim().toUpperCase().startsWith('TODO') ? `
              <tr style="border-bottom: 1px solid #1A231A; background-color: #0B0E0B;">
                <td style="padding: 0.4rem 0.75rem; color: #94A894;">ML MODEL:</td>
                <td style="padding: 0.4rem 0.75rem; color: #39FF88; font-weight: bold;">${escapeHtml(p.spec.mlModel)}</td>
              </tr>` : ''}
              ${!p.spec.backend?.trim().toUpperCase().startsWith('TODO') ? `
              <tr style="border-bottom: 1px solid #1A231A; background-color: #060806;">
                <td style="padding: 0.4rem 0.75rem; color: #94A894;">BACKEND:</td>
                <td style="padding: 0.4rem 0.75rem; color: #EAF2EA;">${escapeHtml(p.spec.backend)}</td>
              </tr>` : ''}
              ${!p.spec.role?.trim().toUpperCase().startsWith('TODO') ? `
              <tr style="background-color: #0B0E0B;">
                <td style="padding: 0.4rem 0.75rem; color: #94A894;">ENGINEERING ROLE:</td>
                <td style="padding: 0.4rem 0.75rem; color: #CCDACC;">${escapeHtml(p.spec.role)}</td>
              </tr>` : ''}
            </tbody>
          </table>

          <div style="margin-bottom: 1rem;">
            <strong style="color: #39FF88; font-size: 0.75rem; display: block; margin-bottom: 0.25rem;">&gt; PROBLEM STATEMENT:</strong>
            <p style="color: #CCDACC; font-size: 0.8rem; margin: 0; font-family: 'Inter', system-ui, sans-serif;">
              ${escapeHtml(p.problem)}
            </p>
          </div>

          <div style="margin-bottom: 1rem;">
            <strong style="color: #FFB000; font-size: 0.75rem; display: block; margin-bottom: 0.25rem;">&gt; WHAT I BUILT:</strong>
            <ul style="color: #CCDACC; font-size: 0.8rem; margin: 0; padding-left: 1.25rem; font-family: 'Inter', system-ui, sans-serif;">
              ${p.whatIBuilt.map((w) => `<li>${escapeHtml(w)}</li>`).join('')}
            </ul>
          </div>

          <div style="border-top: 1px solid #1A231A; padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
            ${(() => {
              const validResults = (p.results || []).filter(
                (r: string) => !r.trim().toUpperCase().startsWith('TODO')
              );
              if (validResults.length === 0) return '<div></div>';
              return `<span style="font-size: 0.75rem; color: #94A894;">
                METRICS: <strong style="color: #EAF2EA;">${escapeHtml(validResults.join('; '))}</strong>
              </span>`;
            })()}
            <div style="display: flex; gap: 0.75rem;">
              ${
                p.project.githubUrl
                  ? `<a href="${escapeHtml(p.project.githubUrl)}" target="_blank" rel="noopener noreferrer" style="color: #39FF88; text-decoration: none; font-size: 0.75rem; border: 1px solid rgba(57,255,136,0.4); padding: 0.25rem 0.5rem;">$ git source</a>`
                  : ''
              }
              ${
                p.project.liveUrl
                  ? `<a href="${escapeHtml(p.project.liveUrl)}" target="_blank" rel="noopener noreferrer" style="color: #FFB000; text-decoration: none; font-size: 0.75rem; border: 1px solid rgba(255,176,0,0.4); padding: 0.25rem 0.5rem;">$ view live</a>`
                  : ''
              }
            </div>
          </div>
        </article>
      `
    )
    .join('');

  const skillsHtml = skillCategories
    .map(
      (cat) => `
        <div style="border: 1px solid #1A231A; background-color: #0B0E0B; padding: 1.25rem; margin-bottom: 1rem;">
          <div style="font-size: 0.75rem; font-weight: bold; color: ${cat.accent}; border-bottom: 1px solid #1A231A; padding-bottom: 0.5rem; margin-bottom: 0.75rem;">
            PIN_GROUP // ${escapeHtml(cat.label.toUpperCase())}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            ${cat.skills
              .map(
                (s) => `
                  <span style="border: 1px solid #1A231A; background-color: #060806; padding: 0.25rem 0.5rem; font-size: 0.75rem; color: ${
                    s.usedInProjects ? '#39FF88' : '#CCDACC'
                  };">
                    ${escapeHtml(s.name)}
                  </span>
                `
              )
              .join('')}
          </div>
        </div>
      `
    )
    .join('');

  const timelineHtml = timelineItems
    .map(
      (t) => `
        <div style="border: 1px solid #1A231A; background-color: #0B0E0B; padding: 1rem; margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem;">
            <strong style="color: #EAF2EA; font-size: 0.9rem;">${escapeHtml(t.title)}</strong>
            <span style="color: #39FF88; font-size: 0.75rem; font-weight: bold;">${escapeHtml(t.period)}</span>
          </div>
          <p style="color: #94A894; font-size: 0.75rem; margin: 0.25rem 0 0.5rem 0;">${escapeHtml(t.organization)}</p>
          <p style="color: #CCDACC; font-size: 0.8rem; margin: 0; font-family: 'Inter', system-ui, sans-serif;">
            ${escapeHtml(t.description)}
          </p>
        </div>
      `
    )
    .join('');

  return `
    <div class="min-h-screen bg-console-base text-term-text selection:bg-phosphor/20 selection:text-phosphor relative overflow-x-hidden font-sans">
      <div class="fixed inset-0 graticule-grid opacity-25 pointer-events-none" aria-hidden="true"></div>
      <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] px-4 py-2 border border-phosphor bg-console-panel text-phosphor font-mono text-xs font-bold">[Skip to main workbench content]</a>

      <!-- Sticky Navigation Header Mirror (Prevents Hydration Layout Shift) -->
      <header role="banner" class="sticky top-0 left-0 right-0 z-40 bg-[#060806]/95 backdrop-blur-md border-b border-console-border font-mono text-xs select-none">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          <div class="flex items-center gap-2.5 text-term-bright py-1.5">
            <span class="led-phosphor"></span>
            <span class="font-bold tracking-wider uppercase text-sm sm:text-base">VINESH SHANMUGAM</span>
            <span class="hidden md:inline-block text-[10px] text-term-muted border border-console-border px-1.5 py-0.2 bg-[#0B0E0B]">
              [240MHz · SYS_OK]
            </span>
          </div>
          <nav class="hidden md:flex items-center gap-1" aria-label="Workbench sections">
            <a href="#about" class="px-3 py-1.5 min-h-[36px] flex items-center gap-1.5 text-xs text-term-muted border border-transparent">
              <span class="text-phosphor">01</span><span>About</span>
            </a>
            <a href="#projects" class="px-3 py-1.5 min-h-[36px] flex items-center gap-1.5 text-xs text-term-muted border border-transparent">
              <span class="text-phosphor">02</span><span>Projects</span>
            </a>
            <a href="#skills" class="px-3 py-1.5 min-h-[36px] flex items-center gap-1.5 text-xs text-term-muted border border-transparent">
              <span class="text-phosphor">03</span><span>Skills</span>
            </a>
            <a href="#contact" class="px-3 py-1.5 min-h-[36px] flex items-center gap-1.5 text-xs text-term-muted border border-transparent">
              <span class="text-phosphor">04</span><span>Contact</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content" class="relative z-10 font-mono">
        <!-- Hero Section Mirror (Identical DOM Geometry & Styling to HeroSection.tsx) -->
        <section id="home" class="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden font-mono border-b border-console-border bg-[#060806]" aria-labelledby="hero-heading">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <!-- Channel Breadcrumb -->
            <div class="border border-console-border bg-[#0B0E0B] px-3.5 py-1.5 mb-8 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-phosphor font-bold">[CH_01]</span>
                <span class="text-term-dim">//</span>
                <span class="text-term-muted uppercase">HARDWARE_BENCH_INITIALIZE</span>
                <span class="hidden sm:inline text-term-dim">·</span>
                <span class="hidden sm:inline text-term-muted">ADDR: 0x00FF</span>
              </div>
              <div class="flex items-center gap-3 text-[11px]">
                <span class="text-term-dim hidden sm:inline">BAUD: 115200</span>
                <span class="text-term-muted">[SYS_ONLINE]</span>
              </div>
            </div>

            <div class="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              <!-- Left Column: Identity, Status Panel, Bio & Terminal CTAs -->
              <div class="lg:col-span-7 flex flex-col justify-start">
                <h1 id="hero-heading" class="text-4xl sm:text-5xl md:text-6xl font-black text-term-bright tracking-tight leading-[1.0] uppercase mb-3">
                  ${escapeHtml(OWNER_NAME)}
                </h1>

                <div class="text-sm sm:text-base text-phosphor font-bold tracking-wide flex items-center gap-1.5 mb-6 min-h-[28px]">
                  <span class="text-term-dim">&gt;</span>
                  <span>${escapeHtml(HERO_TITLE)}</span>
                  <span class="w-2.5 h-4 sm:h-5 bg-phosphor inline-block" aria-hidden="true"></span>
                </div>

                <!-- Hardware Operator ID & Status Register Bank -->
                <div class="flex flex-col sm:flex-row gap-4 mb-6 items-start">
                  <!-- Operator ID Photo Card -->
                  <div class="shrink-0 self-center sm:self-start">
                    ${renderOperatorIdPhotoStatic('hero', true)}
                  </div>

                  <!-- Live Hardware Status Panel -->
                  <div class="flex-1 w-full min-w-0 console-panel border border-console-border p-3 sm:p-3.5 bg-[#090C09]">
                    <div class="flex items-center justify-between border-b border-console-border pb-2 mb-2.5 text-[10px]">
                      <div class="flex items-center gap-2">
                        <span class="led-phosphor"></span>
                        <span class="text-phosphor font-bold uppercase tracking-wider">
                          BENCH STATUS REGISTER // 0x00
                        </span>
                      </div>
                      <span class="text-term-dim uppercase">REALTIME TELEMETRY</span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      ${!STATUS_PANEL.location.trim().toUpperCase().startsWith('TODO') ? `
                      <div class="p-2 border border-console-border bg-[#040504]">
                        <span class="text-[10px] text-term-dim block uppercase">LOCATION:</span>
                        <span class="text-term-bright font-semibold">${escapeHtml(STATUS_PANEL.location)}</span>
                      </div>` : ''}
                      ${!STATUS_PANEL.status.trim().toUpperCase().startsWith('TODO') ? `
                      <div class="p-2 border border-console-border bg-[#040504]">
                        <span class="text-[10px] text-term-dim block uppercase">OPPORTUNITY STATUS:</span>
                        <span class="text-phosphor font-bold flex items-center gap-1.5">
                          <span class="w-1.5 h-1.5 bg-phosphor inline-block"></span>
                          ${escapeHtml(STATUS_PANEL.status)}
                        </span>
                      </div>` : ''}
                      ${!STATUS_PANEL.stack.trim().toUpperCase().startsWith('TODO') ? `
                      <div class="p-2 border border-console-border bg-[#040504]">
                        <span class="text-[10px] text-term-dim block uppercase">CORE STACK:</span>
                        <span class="text-amber font-semibold truncate block">${escapeHtml(STATUS_PANEL.stack)}</span>
                      </div>` : ''}
                      ${STATUS_PANEL.firmwareVersion && !STATUS_PANEL.firmwareVersion.trim().toUpperCase().startsWith('TODO') ? `
                      <div class="p-2 border border-console-border bg-[#040504]">
                        <span class="text-[10px] text-term-dim block uppercase">FIRMWARE:</span>
                        <span class="text-term-bright font-semibold">${escapeHtml(STATUS_PANEL.firmwareVersion)}</span>
                      </div>` : ''}
                    </div>
                  </div>
                </div>

                <p class="text-base sm:text-lg font-bold text-term-bright mb-3 leading-snug">
                  Building intelligent systems where <span class="text-phosphor border-b border-phosphor/40 pb-0.5">hardware</span>, <span class="text-amber border-b border-amber/40 pb-0.5">software</span> and <span class="text-term-bright border-b border-white/40 pb-0.5">AI</span> meet.
                </p>

                <p class="font-sans text-term-text text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                  ${escapeHtml(BIOGRAPHY.shortBio)}
                </p>

                <div class="border border-console-border bg-[#080B08] p-3 mb-7 max-w-xl">
                  <div class="flex items-center justify-between mb-2 text-[10px] text-term-dim">
                    <span class="text-phosphor uppercase font-semibold">BUS ARCHITECTURE FLOW:</span>
                    <span>6 CHANNELS</span>
                  </div>
                  <div class="grid grid-cols-6 gap-1 text-[9px] text-center font-bold">
                    <div class="p-1 border border-console-border bg-[#040504] text-phosphor">SENSOR</div>
                    <div class="p-1 border border-console-border bg-[#040504] text-phosphor">ESP32</div>
                    <div class="p-1 border border-console-border bg-[#040504] text-amber">EDGE ML</div>
                    <div class="p-1 border border-console-border bg-[#040504] text-term-text">FASTAPI</div>
                    <div class="p-1 border border-console-border bg-[#040504] text-term-text">CLOUD</div>
                    <div class="p-1 border border-console-border bg-[#040504] text-phosphor">REACT</div>
                  </div>
                </div>

                <div class="space-y-2">
                  <div class="text-[10px] text-term-dim uppercase tracking-wider mb-1">&gt; EXECUTE BENCH COMMANDS:</div>
                  <div class="flex flex-wrap gap-2.5 items-center">
                    <a href="${escapeHtml(CONTACT_LINKS.resume)}" download="Vinesh_Shanmugam_Resume.pdf" class="console-btn text-xs py-2 px-3.5 flex items-center gap-2">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                      <span>$ open resume.pdf</span>
                    </a>
                    <a href="#projects" class="console-btn-amber text-xs py-2 px-3.5 flex items-center gap-2">
                      <span>$ view projects</span>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                    <a href="mailto:${escapeHtml(CONTACT_LINKS.email)}" class="console-btn-ghost text-xs py-2 px-3 flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      <span>$ mailto:vinesh</span>
                    </a>
                    <a href="${escapeHtml(CONTACT_LINKS.github)}" target="_blank" rel="noopener noreferrer" class="console-btn-ghost text-xs py-2 px-3 flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                      <span>$ git remote</span>
                    </a>
                    <a href="${escapeHtml(CONTACT_LINKS.linkedin)}" target="_blank" rel="noopener noreferrer" class="console-btn-ghost text-xs py-2 px-3 flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      <span>$ linkedin</span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Right Column Microcontroller Diagnostic Box -->
              <div class="lg:col-span-5 w-full">
                <div class="console-panel border border-console-border p-4 bg-[#080B08] font-mono min-h-[445px]">
                  <div class="flex items-center justify-between border-b border-console-border pb-2.5 mb-3.5 text-[11px]">
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-phosphor inline-block"></span>
                      <span class="text-phosphor font-bold tracking-wider uppercase">[MCU_PINOUT // ESP32-WROOM-32D]</span>
                    </div>
                    <span class="text-[10px] text-term-muted">240MHz · DUAL-CORE</span>
                  </div>
                  <div class="border border-console-border bg-[#050705] p-3 text-center mb-3">
                    <div class="text-[9px] text-term-muted tracking-widest uppercase">ESPRESSIF SYSTEMS</div>
                    <div class="text-xs font-black text-term-bright tracking-tight mt-0.5">ESP32-WROOM-32D</div>
                    <div class="text-[8px] text-phosphor/80 font-mono tracking-wider mt-1 inline-block px-1.5 py-0.5 border border-phosphor/30 bg-phosphor/5">
                      TINYML EDGE AI &middot; 38-PIN GPIO MATRIX
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-2 text-[10px] mb-3">
                    <div class="p-1.5 border border-console-border bg-[#040504]">
                      <span class="text-term-dim block">I2C BUS:</span>
                      <span class="text-phosphor font-bold">GPIO 21/22</span>
                    </div>
                    <div class="p-1.5 border border-console-border bg-[#040504]">
                      <span class="text-term-dim block">SPI BUS:</span>
                      <span class="text-term-bright font-semibold">GPIO 18/19/23</span>
                    </div>
                    <div class="p-1.5 border border-console-border bg-[#040504]">
                      <span class="text-term-dim block">ADC CHANNEL:</span>
                      <span class="text-term-bright font-semibold">12-bit (GPIO 36)</span>
                    </div>
                    <div class="p-1.5 border border-console-border bg-[#040504]">
                      <span class="text-term-dim block">FREQUENCY:</span>
                      <span class="text-amber font-semibold">240 MHz</span>
                    </div>
                  </div>
                  <div class="border border-console-border bg-[#040504] p-2 text-[10px]">
                    <div class="flex items-center justify-between text-[9px] text-term-dim border-b border-console-border/70 pb-1 mb-1">
                      <span class="text-phosphor font-bold">CH_A // 500mV/DIV</span>
                      <span class="text-amber font-semibold">STATUS: PROBING</span>
                    </div>
                    <div class="h-[90px] flex items-center justify-center text-term-dim text-[10px] border border-dashed border-console-border/50">
                      [REAL-TIME 60FPS OSCILLOSCOPE ACTIVE ON MOUNT]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- About Section (System Architecture & Dossier Photo) -->
        <section id="about" class="py-20 relative font-mono text-xs border-b border-console-border bg-[#060806]" aria-labelledby="about-heading">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-console-border pb-3 mb-10">
              <div class="flex items-center gap-2">
                <span class="text-phosphor font-bold">[02]</span>
                <span class="text-term-dim">//</span>
                <span class="text-term-bright font-bold tracking-wider">SYSTEM_ARCHITECTURE · BIOGRAPHY</span>
              </div>
              <div class="flex items-center gap-3 text-[11px] text-term-muted">
                <span>DISCIPLINE: ECE</span>
                <span class="text-term-dim">|</span>
                <span class="text-phosphor">SPEC_READY</span>
              </div>
            </div>

            <div class="grid lg:grid-cols-12 gap-8 items-start mb-12">
              <div class="lg:col-span-8">
                <div class="text-[11px] text-phosphor tracking-widest uppercase mb-2">
                  &gt; CORE_THESIS
                </div>
                <h2 id="about-heading" class="text-2xl sm:text-4xl font-black text-term-bright mb-5 font-mono tracking-tight leading-tight">
                  Where physical hardware becomes <span class="text-phosphor">intelligent</span> through software &amp; machine learning.
                </h2>
                <p class="text-base sm:text-lg text-term-text leading-relaxed font-sans font-normal">
                  ${escapeHtml(BIOGRAPHY.extendedBio)}
                </p>
              </div>

              <div class="lg:col-span-4 flex justify-center lg:justify-end">
                ${renderOperatorIdPhotoStatic('about', false)}
              </div>
            </div>

            <!-- Computed Hardware Metrics Registers -->
            <div class="mb-12">
              <div class="text-[11px] text-term-muted tracking-widest uppercase mb-3 flex items-center justify-between">
                <span>[REGISTER_BANK] COMPUTED REPOSITORY METRICS</span>
                <span class="text-term-dim text-[10px]">SRC: GITHUB_INVENTORY</span>
              </div>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div class="border border-console-border bg-console-panel p-4">
                  <span class="text-[10px] text-term-muted uppercase block tracking-wider mb-1">REG_00: PROJECTS</span>
                  <div class="text-3xl font-black text-term-bright font-mono">10</div>
                  <p class="text-[11px] text-term-muted mt-1 font-sans">Full Systems Documented</p>
                </div>
                <div class="border border-console-border bg-console-panel p-4">
                  <span class="text-[10px] text-term-muted uppercase block tracking-wider mb-1">REG_01: OPEN REPOS</span>
                  <div class="text-3xl font-black text-phosphor font-mono">10</div>
                  <p class="text-[11px] text-term-muted mt-1 font-sans">Public Code Repositories</p>
                </div>
                <div class="border border-console-border bg-console-panel p-4">
                  <span class="text-[10px] text-term-muted uppercase block tracking-wider mb-1">REG_02: TECH STACK</span>
                  <div class="text-3xl font-black text-amber font-mono">48</div>
                  <p class="text-[11px] text-term-muted mt-1 font-sans">Hardware, AI &amp; Web Tools</p>
                </div>
                <div class="border border-console-border bg-console-panel p-4">
                  <span class="text-[10px] text-term-muted uppercase block tracking-wider mb-1">REG_03: ACADEMIC</span>
                  <div class="text-3xl font-black text-term-bright font-mono">B.E.</div>
                  <p class="text-[11px] text-term-muted mt-1 font-sans">ECE (2024–2028)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Technical Datasheets Catalog (All 10 Projects) -->
        <section id="projects" class="py-16 border-b border-console-border bg-[#0B0E0B]">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="border-b border-console-border pb-3 mb-8 flex justify-between items-baseline flex-wrap gap-2">
              <h2 class="text-2xl font-black text-term-bright uppercase">
                [02] TECHNICAL DATASHEETS (ALL 10 PROJECTS)
              </h2>
              <span class="text-xs text-phosphor font-bold">[10 OF 10 PRE-RENDERED &amp; VERIFIED]</span>
            </div>
            ${projectsHtml}
          </div>
        </section>

        <!-- Categorized Hardware Skills & Pin Table -->
        <section id="skills" class="py-16 border-b border-console-border bg-[#060806]">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="border-b border-console-border pb-3 mb-8">
              <h2 class="text-2xl font-black text-term-bright uppercase">
                [03] HARDWARE PIN TABLE &amp; SKILLS (48 TECHNOLOGIES)
              </h2>
            </div>
            ${skillsHtml}
          </div>
        </section>

        <!-- Experience & Education -->
        <section id="experience" class="py-16 border-b border-console-border bg-[#0B0E0B]">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="border-b border-console-border pb-3 mb-8">
              <h2 class="text-2xl font-black text-term-bright uppercase">
                [04] EXPERIENCE &amp; EDUCATION
              </h2>
            </div>
            ${timelineHtml}
          </div>
        </section>

        <!-- Direct Contact Registers -->
        <footer class="py-12 bg-[#040504] border-t border-console-border text-center text-term-muted text-xs">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="mb-2 text-term-bright font-bold">Vinesh Shanmugam · Hardware Debug Console v2.0</p>
            <p>
              Email: <a href="mailto:${escapeHtml(CONTACT_LINKS.email)}" class="text-phosphor underline">${escapeHtml(CONTACT_LINKS.email)}</a> ·
              GitHub: <a href="${escapeHtml(CONTACT_LINKS.github)}" class="text-phosphor underline">${escapeHtml(CONTACT_LINKS.github)}</a> ·
              LinkedIn: <a href="${escapeHtml(CONTACT_LINKS.linkedin)}" class="text-phosphor underline">${escapeHtml(CONTACT_LINKS.linkedin)}</a>
            </p>
          </div>
        </footer>
      </main>
    </div>
  `;
}

export function syncIndexHtml(): void {
  const indexPath = path.resolve(__dirname, '../index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf-8');

  const rootRegex = /<div id="root">[\s\S]*?<\/div>(\s*<script type="module" src="\/src\/main\.tsx"><\/script>)/;
  if (!rootRegex.test(indexContent)) {
    throw new Error('Could not find <div id="root"> and main script in index.html');
  }

  const generatedHtml = generateStaticFallback();
  const updatedIndex = indexContent.replace(rootRegex, `<div id="root">\n${generatedHtml}\n    </div>$1`);

  fs.writeFileSync(indexPath, updatedIndex, 'utf-8');
  console.log('✅ Successfully synchronized index.html static fallback from src/data/content.ts SSOT');
}

syncIndexHtml();
