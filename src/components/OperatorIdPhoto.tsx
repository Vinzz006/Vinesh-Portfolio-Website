import { useState } from 'react';
import { PROFILE_IMAGE, type PhotoFrameStyle } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface OperatorIdPhotoProps {
  /**
   * Sizing preset:
   * - 'hero': Compact ID card optimized for hero section (modest size on mobile, crisp on desktop)
   * - 'about': Larger dossier format for about section
   */
  variant?: 'hero' | 'about';
  /**
   * Optional override for switchable frame style. Defaults to PROFILE_IMAGE.frameStyle ('bracket' | 'ring')
   */
  frameStyle?: PhotoFrameStyle;
  /**
   * Set true if photo is above the fold (Hero) for eager loading and high fetch priority.
   * Below fold (About) uses lazy loading.
   */
  aboveFold?: boolean;
  className?: string;
}

export default function OperatorIdPhoto({
  variant = 'hero',
  frameStyle = PROFILE_IMAGE.frameStyle,
  aboveFold = false,
  className = '',
}: OperatorIdPhotoProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const reduced = useReducedMotion();

  const isRing = frameStyle === 'ring';

  // Dimension presets for reserving space and zero CLS
  const isHero = variant === 'hero';
  const imgSet = isHero ? PROFILE_IMAGE.hero : PROFILE_IMAGE.about;
  const imgDimension = isHero ? 400 : 800;
  const sizesAttr = isHero
    ? '(max-width: 640px) 144px, (max-width: 1024px) 176px, 200px'
    : '(max-width: 640px) 260px, (max-width: 1024px) 300px, 320px';

  return (
    <div
      className={`group relative inline-flex flex-col font-mono select-none ${className}`}
      onClick={() => setIsRevealed((prev) => !prev)}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      onFocus={() => setIsRevealed(true)}
      onBlur={() => setIsRevealed(false)}
      tabIndex={0}
      role="region"
      aria-label="Operator Photo — tap, hover, or focus to reveal full natural color"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Photo Frame Container */}
      <div
        className={`relative overflow-hidden bg-[#060806] ${
          isRing
            ? 'rounded-full border border-phosphor/70 shadow-[0_0_14px_rgba(57,255,136,0.22)]'
            : 'border border-phosphor/40 shadow-[0_0_10px_rgba(57,255,136,0.12)]'
        } ${
          isHero
            ? 'w-36 h-36 sm:w-44 sm:h-44'
            : 'w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80'
        } aspect-square transition-all duration-300`}
      >
        {/* Responsive Picture with explicit dimensions for 0 CLS */}
        <picture className="w-full h-full block">
          <source
            type="image/webp"
            srcSet={`${imgSet.webp400} 400w, ${imgSet.webp800} 800w`}
            sizes={sizesAttr}
          />
          <source
            type="image/jpeg"
            srcSet={`${imgSet.jpg400} 400w, ${imgSet.jpg800} 800w`}
            sizes={sizesAttr}
          />
          <img
            src={imgSet.jpg400}
            alt={PROFILE_IMAGE.alt}
            width={imgDimension}
            height={imgDimension}
            decoding="async"
            loading={aboveFold ? 'eager' : 'lazy'}
            fetchPriority={aboveFold ? 'high' : 'auto'}
            className={`w-full h-full object-cover block transition-all duration-300 ${
              isRing ? 'rounded-full' : ''
            } ${
              isRevealed
                ? 'filter-none'
                : 'contrast-[1.08] brightness-[0.96] sepia-[0.32] hue-rotate-[75deg] group-hover:filter-none group-focus:filter-none group-active:filter-none'
            }`}
          />
        </picture>

        {/* Phosphor-green Tint Overlay (Fades to 0 opacity on hover/focus/tap) */}
        <div
          className={`absolute inset-0 bg-[#39FF88]/15 mix-blend-color pointer-events-none transition-opacity duration-300 ${
            isRing ? 'rounded-full' : ''
          } ${
            isRevealed
              ? 'opacity-0'
              : 'opacity-100 group-hover:opacity-0 group-focus:opacity-0 group-active:opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* Subtle Scanline Overlay (CSS repeating-linear-gradient, static if prefers-reduced-motion) */}
        <div
          className={`absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay ${
            isRing ? 'rounded-full' : ''
          }`}
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0px, rgba(0, 0, 0, 0.4) 1px, transparent 1px, transparent 2px)',
          }}
          aria-hidden="true"
        />

        {/* Hardware Corner Brackets (for "bracket" style only) */}
        {!isRing && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Top-Left Bracket */}
            <span className="absolute top-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-l-2 border-phosphor" />
            {/* Top-Right Bracket */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t-2 border-r-2 border-phosphor" />
            {/* Bottom-Left Bracket */}
            <span className="absolute bottom-0 left-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-l-2 border-phosphor" />
            {/* Bottom-Right Bracket */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b-2 border-r-2 border-phosphor" />

            {/* Subtle reticle cross in corner for authentic military/avionics console feel */}
            <span className="absolute top-1.5 right-1.5 text-[8px] text-phosphor/60 font-mono font-bold leading-none">
              +
            </span>
          </div>
        )}
      </div>

      {/* Operator ID Caption Plate */}
      <div
        className={`bg-[#090C09] border border-console-border border-t-0 p-1.5 sm:p-2 text-left font-mono transition-colors duration-200 ${
          isRing ? 'mt-2 border-t rounded-sm text-center' : ''
        } ${isHero ? 'w-36 sm:w-44' : 'w-64 sm:w-72 lg:w-80'}`}
      >
        <div className="flex items-center justify-between gap-1 text-[9px] sm:text-[10px] leading-tight">
          <div className="flex items-center gap-1.5 truncate">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-phosphor inline-block shrink-0 ${
                reduced ? '' : 'animate-pulse'
              }`}
              aria-hidden="true"
            />
            <span className="text-term-bright font-bold truncate">
              {PROFILE_IMAGE.operatorId}
            </span>
          </div>
          <span className="text-phosphor font-semibold text-[8px] sm:text-[9px] shrink-0">
            [TAP]
          </span>
        </div>
        <div className="flex items-center justify-between text-[8px] sm:text-[9px] text-term-dim mt-0.5">
          <span className="text-phosphor truncate">{PROFILE_IMAGE.statusText}</span>
          <span className="text-term-dim uppercase hidden sm:inline">CAM_FEED // 01</span>
        </div>
      </div>
    </div>
  );
}
