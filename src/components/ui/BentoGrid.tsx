import React from 'react';
import { cn } from '../../lib/utils';
import { BorderBeam } from './BorderBeam';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  badge,
  hasBeam = false,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  hasBeam?: boolean;
}) => {
  return (
    <div
      className={cn(
        'row-span-1 rounded-2xl group/bento hover:shadow-xl transition duration-300 p-6 bg-bg-secondary/90 border border-border-subtle hover:border-primary/40 justify-between flex flex-col space-y-4 relative overflow-hidden backdrop-blur-md',
        className
      )}
    >
      {/* Aceternity UI radial glow on hover */}
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover/bento:opacity-100 transition duration-500 pointer-events-none bg-[radial-gradient(400px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(0,212,255,0.08),transparent_80%)]" />

      {hasBeam && <BorderBeam size={150} duration={8} colorFrom="#00D4FF" colorTo="#7C3AED" />}

      {header}

      <div className="group-hover/bento:translate-x-1 transition duration-300 relative z-10">
        <div className="flex items-center justify-between mb-2">
          {icon && <div className="text-primary font-mono text-xl">{icon}</div>}
          {badge && (
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-primary/10 border border-primary/30 text-primary font-semibold">
              {badge}
            </span>
          )}
        </div>
        <div className="font-sans font-bold text-text-bright text-base md:text-lg mb-1 group-hover/bento:text-primary transition-colors">
          {title}
        </div>
        <div className="font-sans font-normal text-text-secondary text-xs leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
