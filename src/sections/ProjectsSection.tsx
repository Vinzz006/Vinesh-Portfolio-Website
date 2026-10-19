import { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Cpu, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import ProjectArchitectureDiagram from '../components/ProjectArchitectureDiagram';
import { projectDatasheets, type ProjectDatasheet } from '../data/projectsDatasheet';

type FilterCategory = 'ALL' | 'EMBEDDED' | 'EDGE-ML' | 'FULL-STACK';

const FILTER_TABS: { id: FilterCategory; label: string }[] = [
  { id: 'ALL', label: 'ALL SYSTEMS' },
  { id: 'EMBEDDED', label: 'EMBEDDED / IoT' },
  { id: 'EDGE-ML', label: 'EDGE-ML' },
  { id: 'FULL-STACK', label: 'FULL-STACK' },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  // Expanded project IDs set for in-place accordion / detail view
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'DS-001': true, // default first one expanded as an immediate working showcase
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    projectDatasheets.forEach((ds) => {
      allExpanded[ds.datasheetId] = true;
    });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  const filteredDatasheets = useMemo(() => {
    if (activeFilter === 'ALL') return projectDatasheets;
    return projectDatasheets.filter((ds) => ds.filterCategories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <section
      id="projects"
      className="py-20 relative font-mono text-xs border-b border-console-border bg-[#060806]"
      aria-labelledby="projects-heading"
    >
      {/* Background Graticule */}
      <div className="absolute inset-0 graticule-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="border border-console-border bg-[#0B0E0B] p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs mb-1.5">
                <span className="text-phosphor font-bold">[02]</span>
                <span className="text-term-dim">//</span>
                <span className="text-term-muted uppercase">SYSTEM_ARCHIVE // DATASHEET_CATALOG</span>
                <span className="text-term-dim">·</span>
                <span className="text-phosphor font-bold">{projectDatasheets.length} TOTAL NODES</span>
              </div>
              <h2 id="projects-heading" className="text-2xl sm:text-3xl font-black text-term-bright tracking-tight uppercase">
                Engineering Datasheets
              </h2>
              <p className="font-sans text-term-text text-sm mt-1 max-w-2xl">
                Microcontroller firmware, edge TinyML inference pipelines, and full-stack web platforms presented as technical datasheets.
              </p>
            </div>

            {/* Quick Bulk Actions */}
            <div className="flex items-center gap-2 self-start md:self-auto text-[11px]">
              <button
                onClick={expandAll}
                className="px-2.5 py-1 border border-console-border bg-[#040504] text-term-muted hover:border-phosphor/50 hover:text-phosphor transition-colors"
              >
                [+] EXPAND ALL
              </button>
              <button
                onClick={collapseAll}
                className="px-2.5 py-1 border border-console-border bg-[#040504] text-term-muted hover:border-phosphor/50 hover:text-phosphor transition-colors"
              >
                [-] COLLAPSE ALL
              </button>
            </div>
          </div>

          {/* Filter Chips: ALL / EMBEDDED / EDGE-ML / FULL-STACK */}
          <div className="mt-5 pt-3 border-t border-console-border flex flex-wrap items-center gap-2" role="tablist" aria-label="Project filter categories">
            <span className="text-[10px] text-term-dim uppercase mr-1">FILTER BUS:</span>
            {FILTER_TABS.map(({ id, label }) => {
              const isSelected = activeFilter === id;
              const count = id === 'ALL'
                ? projectDatasheets.length
                : projectDatasheets.filter((ds) => ds.filterCategories.includes(id)).length;

              return (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  role="tab"
                  aria-selected={isSelected}
                  className={`px-3 py-1.5 border text-xs transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'border-phosphor bg-phosphor/15 text-phosphor font-bold shadow-[0_0_8px_rgba(57,255,136,0.2)]'
                      : 'border-console-border bg-[#040504] text-term-muted hover:border-phosphor/40 hover:text-term-bright'
                  }`}
                >
                  <span>{label}</span>
                  <span className="text-[10px] opacity-75 font-mono">[{count}]</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Datasheet Entries List (Non-uniform datasheet presentation) */}
        <div className="space-y-6">
          {filteredDatasheets.map((entry) => {
            const isExpanded = Boolean(expandedIds[entry.datasheetId]);
            const p = entry.project;

            // Status Badge configuration
            const statusConfig = {
              DEPLOYED: {
                border: 'border-phosphor/60 bg-phosphor/10 text-phosphor',
                dot: 'bg-phosphor',
              },
              PROTOTYPE: {
                border: 'border-amber/60 bg-amber/10 text-amber',
                dot: 'bg-amber',
              },
              'IN PROGRESS': {
                border: 'border-console-border bg-[#111611] text-term-muted',
                dot: 'bg-term-muted',
              },
            }[entry.statusTag];

            return (
              <article
                key={entry.datasheetId}
                className="console-panel border border-console-border bg-[#090C09] transition-all"
                aria-label={`Datasheet: ${p.title}`}
              >
                {/* Datasheet Header Bar */}
                <div className="border-b border-console-border p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B0E0B]">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      {/* Datasheet ID */}
                      <span className="text-phosphor font-bold tracking-wider text-xs px-2 py-0.5 border border-phosphor/30 bg-phosphor/5">
                        {entry.datasheetId}
                      </span>

                      {/* Status Tag */}
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold border uppercase tracking-widest ${statusConfig.border}`}>
                        <span className={`w-1.5 h-1.5 ${statusConfig.dot}`} />
                        {entry.statusTag}
                      </span>

                      {/* Category highlight */}
                      <span className="text-term-dim text-[11px]">
                        // {p.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-term-bright tracking-tight">
                      {p.title}
                    </h3>

                    {/* One-line summary */}
                    <p className="font-sans text-term-text text-xs sm:text-sm mt-1 leading-relaxed max-w-3xl">
                      {p.description}
                    </p>
                  </div>

                  {/* Top Right Action Controls */}
                  <div className="flex flex-wrap items-center gap-2 self-start md:self-auto flex-shrink-0">
                    {/* Expand/Collapse Toggle Button */}
                    <button
                      onClick={() => toggleExpand(entry.datasheetId)}
                      className={`px-3 py-1.5 border text-xs flex items-center gap-1.5 transition-all ${
                        isExpanded
                          ? 'border-phosphor bg-phosphor text-black font-bold'
                          : 'border-console-border bg-[#040504] text-term-bright hover:border-phosphor/50 hover:text-phosphor'
                      }`}
                      aria-expanded={isExpanded}
                    >
                      <span>{isExpanded ? '[-] COLLAPSE' : '[+] INSPECT SPECS'}</span>
                      {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>
                  </div>
                </div>

                {/* Primary Hardware Specification Table */}
                <div className="p-4 sm:p-5 border-b border-console-border bg-[#070907]">
                  <div className="text-[10px] text-term-dim uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Cpu size={12} className="text-phosphor" />
                    <span>TECHNICAL SPECIFICATION REGISTER</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                    {!entry.spec.mcu?.trim().toUpperCase().startsWith('TODO') && (
                      <div className="p-2 border border-console-border bg-[#040504]">
                        <span className="text-[10px] text-term-dim block uppercase">MCU / BOARD:</span>
                        <span className="text-term-bright font-semibold">{entry.spec.mcu}</span>
                      </div>
                    )}
                    {!entry.spec.sensors?.trim().toUpperCase().startsWith('TODO') && (
                      <div className="p-2 border border-console-border bg-[#040504]">
                        <span className="text-[10px] text-term-dim block uppercase">SENSORS:</span>
                        <span className="text-phosphor font-semibold">{entry.spec.sensors}</span>
                      </div>
                    )}
                    {!entry.spec.protocol?.trim().toUpperCase().startsWith('TODO') && (
                      <div className="p-2 border border-console-border bg-[#040504]">
                        <span className="text-[10px] text-term-dim block uppercase">BUS / PROTOCOL:</span>
                        <span className="text-term-bright font-semibold">{entry.spec.protocol}</span>
                      </div>
                    )}
                    {!entry.spec.mlModel?.trim().toUpperCase().startsWith('TODO') && (
                      <div className="p-2 border border-console-border bg-[#040504]">
                        <span className="text-[10px] text-term-dim block uppercase">ML / AI MODEL:</span>
                        <span className="text-amber font-semibold">{entry.spec.mlModel}</span>
                      </div>
                    )}
                    {!entry.spec.backend?.trim().toUpperCase().startsWith('TODO') && (
                      <div className="p-2 border border-console-border bg-[#040504]">
                        <span className="text-[10px] text-term-dim block uppercase">BACKEND &amp; CLOUD:</span>
                        <span className="text-term-bright font-semibold">{entry.spec.backend}</span>
                      </div>
                    )}
                    {!entry.spec.role?.trim().toUpperCase().startsWith('TODO') && (
                      <div className="p-2 border border-console-border bg-[#040504]">
                        <span className="text-[10px] text-term-dim block uppercase">ENGINEERING ROLE:</span>
                        <span className="text-term-muted font-semibold">{entry.spec.role}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* In-Place Expanded Detail Panel */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 bg-[#040504] border-b border-console-border space-y-6">
                    {/* [01] Problem Statement */}
                    <div>
                      <div className="flex items-center gap-2 text-xs mb-2 text-phosphor">
                        <span>[01]</span>
                        <span className="text-term-dim">//</span>
                        <span className="uppercase font-bold tracking-wider">ENGINEERING PROBLEM &amp; OBJECTIVE</span>
                      </div>
                      <p className="font-sans text-term-text text-sm leading-relaxed pl-3 border-l-2 border-console-border">
                        {entry.problem}
                      </p>
                    </div>

                    {/* [02] Inline SVG Architecture Block Diagram */}
                    <div>
                      <div className="flex items-center gap-2 text-xs mb-1 text-phosphor">
                        <span>[02]</span>
                        <span className="text-term-dim">//</span>
                        <span className="uppercase font-bold tracking-wider">SYSTEM ARCHITECTURE BLOCK DIAGRAM</span>
                      </div>
                      <p className="text-[11px] text-term-dim mb-2">
                        Dataflow trace from physical transducer sensing to realtime telemetry presentation:
                      </p>
                      <ProjectArchitectureDiagram nodes={entry.architectureDiagram} />
                    </div>

                    {/* [03] What I Built (Implementation Breakdown) */}
                    <div>
                      <div className="flex items-center gap-2 text-xs mb-2 text-phosphor">
                        <span>[03]</span>
                        <span className="text-term-dim">//</span>
                        <span className="uppercase font-bold tracking-wider">SUBSYSTEM IMPLEMENTATION DETAILS</span>
                      </div>
                      <ul className="space-y-1.5 pl-3 border-l-2 border-console-border text-xs sm:text-sm font-sans text-term-text">
                        {entry.whatIBuilt.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-phosphor font-mono text-xs flex-shrink-0 mt-0.5">&gt;</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* [04] Results / Metrics (Hidden if starting with TODO) */}
                    {(() => {
                      const validResults = (entry.results || []).filter(
                        (res) => !res.trim().toUpperCase().startsWith('TODO')
                      );
                      if (validResults.length === 0) return null;
                      return (
                        <div>
                          <div className="flex items-center gap-2 text-xs mb-2 text-phosphor">
                            <span>[04]</span>
                            <span className="text-term-dim">//</span>
                            <span className="uppercase font-bold tracking-wider">RESULTS &amp; BENCHMARK METRICS</span>
                          </div>
                          <div className="p-3 border border-console-border bg-[#040504] space-y-1">
                            {validResults.map((res, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-term-text font-mono">
                                <CheckCircle2 size={13} className="text-phosphor flex-shrink-0 mt-0.5" />
                                <span>{res}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Footer Action Links Bar */}
                <div className="px-4 py-3 bg-[#080B08] flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* GitHub Link */}
                    {p.githubUrl ? (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="console-btn-ghost text-[11px] py-1 px-2.5 flex items-center gap-1.5"
                      >
                        <GithubIcon size={12} />
                        <span>$ git remote ({p.githubUrl.split('/').pop()})</span>
                      </a>
                    ) : (
                      <span className="px-2 py-1 text-[10px] text-term-dim border border-console-border bg-[#040504]">
                        [NO PUBLIC REPO YET]
                      </span>
                    )}

                    {/* Live Demo Link if exists */}
                    {p.liveUrl && (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="console-btn text-[11px] py-1 px-2.5 flex items-center gap-1.5"
                      >
                        <ExternalLink size={12} />
                        <span>$ open live-demo</span>
                      </a>
                    )}
                  </div>

                  {/* Highlight Tag */}
                  {p.highlight && (
                    <span className="text-[10px] text-term-muted font-mono uppercase tracking-wider">
                      SPEC // {p.highlight}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
