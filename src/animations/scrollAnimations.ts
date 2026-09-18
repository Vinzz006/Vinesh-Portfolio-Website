import { animateSectionEntrance } from './anime-utils';

export { animateSectionEntrance };

export const SECTION_ACTS: Record<string, { act: string; title: string; subtitle: string }> = {
  home: { act: 'ACT 01', title: 'IDENTITY', subtitle: 'System Architecture Online' },
  about: { act: 'ACT 02', title: 'ENGINEERING', subtitle: 'Hardware + AI + Software' },
  projects: { act: 'ACT 03', title: 'SYSTEMS ARCHIVE', subtitle: 'Production & Research Builds' },
  lab: { act: 'ACT 04', title: 'INTELLIGENCE LAB', subtitle: 'Live Data & Pipeline Execution' },
  skills: { act: 'ACT 05', title: 'CONSTELLATION', subtitle: 'Technology & Stack Matrix' },
  research: { act: 'ACT 05', title: 'RESEARCH', subtitle: 'Advanced Exploration Areas' },
  experience: { act: 'ACT 06', title: 'MILESTONES', subtitle: 'Chronological Engineering Journey' },
  contact: { act: 'ACT 06', title: 'DISPATCH', subtitle: 'Direct Communication Terminal' },
};
