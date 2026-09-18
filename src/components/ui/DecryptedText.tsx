import { useEffect, useState } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  characters?: string;
}

export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  className = '',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&*',
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / maxIterations;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, characters, isHovered]);

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovered((v) => !v)}
    >
      {displayText}
    </span>
  );
}
