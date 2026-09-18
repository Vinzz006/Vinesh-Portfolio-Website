import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate } from 'animejs';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ArchitectureFlowConnectorProps {
  label?: string;
  color?: string;
  isActive?: boolean;
  isStreaming?: boolean;
  packetInTransit?: boolean;
}

export const ArchitectureFlowConnector: React.FC<ArchitectureFlowConnectorProps> = ({
  label = 'data stream',
  color = '#00D4FF',
  isActive = false,
  isStreaming = true,
  packetInTransit = false,
}) => {
  const reduced = useReducedMotion();
  const particleRef = useRef<HTMLDivElement | null>(null);

  // Trigger Anime.js accelerated packet pulse when packetInTransit is true
  useEffect(() => {
    if (reduced || !particleRef.current) return;

    if (packetInTransit) {
      animate(particleRef.current, {
        top: ['0%', '100%'],
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1.6, 1.4, 0.8],
        duration: 450,
        ease: 'easeInOutQuad',
      });
    }
  }, [packetInTransit, reduced]);

  return (
    <div className="relative flex items-center gap-3 my-1.5 ml-6 sm:ml-7 py-1 select-none">
      {/* Animated SVG Stream Line */}
      <div className="relative w-4 h-9 flex items-center justify-center">
        <svg
          width="16"
          height="36"
          viewBox="0 0 16 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Background trace */}
          <line
            x1="8"
            y1="0"
            x2="8"
            y2="36"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />

          {/* Animated flowing stream line */}
          {isStreaming && !reduced && (
            <line
              x1="8"
              y1="0"
              x2="8"
              y2="36"
              stroke={color}
              strokeWidth={isActive || packetInTransit ? '2.5' : '1.5'}
              strokeOpacity={isActive || packetInTransit ? '1' : '0.7'}
              className={packetInTransit ? 'animate-stream-flow-fast' : 'animate-stream-flow'}
              style={{
                filter: isActive || packetInTransit ? `drop-shadow(0 0 6px ${color})` : 'none',
              }}
            />
          )}

          {/* Top terminal point */}
          <circle cx="8" cy="2" r="2" fill={color} fillOpacity="0.8" />

          {/* Bottom terminal point */}
          <circle cx="8" cy="34" r="2" fill={color} fillOpacity="0.8" />
        </svg>

        {/* Continuous ambient glowing packet particle */}
        {isStreaming && !reduced && !packetInTransit && (
          <motion.div
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}, 0 0 14px ${color}`,
              left: 'calc(50% - 4px)',
            }}
            animate={{
              top: ['0%', '85%'],
              opacity: [0, 0.9, 0.9, 0],
              scale: [0.8, 1.2, 1, 0.6],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* High-speed packet pulse traveling during simulation */}
        <div
          ref={particleRef}
          className="absolute w-3 h-3 rounded-full pointer-events-none opacity-0"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: `0 0 12px ${color}, 0 0 20px #FFFFFF`,
            left: 'calc(50% - 6px)',
          }}
        />
      </div>

      {/* Label and stream tag */}
      <div className="flex items-center gap-2">
        <span
          className={`font-mono text-[10px] tracking-wider transition-colors duration-200 ${
            isActive || packetInTransit
              ? 'text-text-bright font-semibold'
              : 'text-text-muted'
          }`}
          style={{ color: isActive || packetInTransit ? color : undefined }}
        >
          {label}
        </span>

        {(isActive || packetInTransit) && (
          <span
            className="font-mono text-[9px] px-1.5 py-0.2 rounded uppercase tracking-widest animate-pulse"
            style={{
              backgroundColor: `${color}20`,
              color: color,
              border: `1px solid ${color}40`,
            }}
          >
            ACTIVE BUS
          </span>
        )}
      </div>
    </div>
  );
};

export default ArchitectureFlowConnector;
