import { motion } from 'framer-motion';

interface SectionLightSweepProps {
  actLabel?: string;
  actTitle?: string;
  isVisible?: boolean;
}

export default function SectionLightSweep({ actLabel, actTitle, isVisible = true }: SectionLightSweepProps) {
  return (
    <div className="relative w-full overflow-hidden pointer-events-none select-none mb-4" aria-hidden="true">
      {/* Horizontal light beam */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isVisible ? { scaleX: 1, opacity: 0.6 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />

      {/* ACT indicator watermark badge */}
      {actLabel && (
        <div className="flex items-center justify-between pt-2 px-1">
          <span className="font-mono text-[9px] tracking-[0.3em] text-primary/60 uppercase">
            {actLabel} {actTitle ? `// ${actTitle}` : ''}
          </span>
          <span className="font-mono text-[9px] tracking-widest text-text-muted/40">
            SYSTEM_NODE // ONLINE
          </span>
        </div>
      )}
    </div>
  );
}
