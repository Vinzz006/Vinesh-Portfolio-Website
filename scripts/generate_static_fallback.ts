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

                <!-- Live Hardware Status Panel -->
                <div class="console-panel border border-console-border p-3.5 sm:p-4 mb-6 relative bg-[#090C09]">
                  <div class="flex items-center justify-between border-b border-console-border pb-2 mb-2.5 text-[10px]">
                    <div class="flex items-center gap-2">
                      <span class="led-phosphor"></span>
                      <span class="text-phosphor font-bold uppercase tracking-wider">
                        BENCH STATUS REGISTER // 0x00
                      </span>
                    </div>
                    <span class="text-term-dim uppercase">REALTIME TELEMETRY</span>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
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
                      <span>$ open resume.pdf</span>
                    </a>
                    <a href="#projects" class="console-btn-amber text-xs py-2 px-3.5 flex items-center gap-2">
                      <span>$ view projects</span>
                    </a>
                    <a href="mailto:${escapeHtml(CONTACT_LINKS.email)}" class="console-btn-ghost text-xs py-2 px-3 flex items-center gap-1.5">
                      <span>$ mailto:vinesh</span>
                    </a>
                    <a href="${escapeHtml(CONTACT_LINKS.github)}" target="_blank" rel="noopener noreferrer" class="console-btn-ghost text-xs py-2 px-3 flex items-center gap-1.5">
                      <span>$ git remote</span>
                    </a>
                    <a href="${escapeHtml(CONTACT_LINKS.linkedin)}" target="_blank" rel="noopener noreferrer" class="console-btn-ghost text-xs py-2 px-3 flex items-center gap-1.5">
                      <span>$ linkedin</span>
                    </a>
                  </div>
                </div>
              </div>

              <!-- Right Column Microcontroller Diagnostic Box -->
              <div class="lg:col-span-5 w-full">
                <div class="console-panel border border-console-border p-4 bg-[#090C09] font-mono">
                  <div class="flex items-center justify-between border-b border-console-border pb-2.5 mb-3 text-xs">
                    <div class="flex items-center gap-2">
                      <span class="text-phosphor font-bold">[MCU_PINOUT // ESP32-WROOM-32D]</span>
                    </div>
                    <span class="text-[10px] text-term-dim">ACTIVE TELEMETRY</span>
                  </div>
                  <div class="border border-console-border bg-[#060806] p-4 text-center">
                    <div class="text-xs text-phosphor font-bold mb-1">MICROCONTROLLER BENCH</div>
                    <div class="text-[11px] text-term-muted">38-PIN GPIO MATRIX · 240MHz DUAL-CORE XTENSA</div>
                    <div class="my-4 p-3 bg-[#0B0E0B] border border-console-border text-left text-xs space-y-1">
                      <div class="text-term-dim">&gt; I2C: <span class="text-term-bright">SDA (GPIO_21) · SCL (GPIO_22)</span></div>
                      <div class="text-term-dim">&gt; SPI: <span class="text-term-bright">MOSI (GPIO_23) · MISO (GPIO_19)</span></div>
                      <div class="text-term-dim">&gt; ADC: <span class="text-term-bright">ADC1_CH0 (GPIO_36) 12-bit</span></div>
                      <div class="text-term-dim">&gt; UART: <span class="text-term-bright">TX0 (GPIO_1) · RX0 (GPIO_3)</span></div>
                    </div>
                    <div class="text-[10px] text-term-dim">[PRE-RENDERED HARDWARE SCHEMATIC]</div>
                  </div>
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
