import { animateHeroOpening } from './anime-utils';

export { animateHeroOpening };

export function calculateParallax(
  mouseX: number,
  mouseY: number,
  windowWidth: number,
  windowHeight: number,
  factor = 1
) {
  const cx = windowWidth / 2;
  const cy = windowHeight / 2;
  const dx = (mouseX - cx) / cx;
  const dy = (mouseY - cy) / cy;

  return {
    x: dx * 10 * factor,
    y: dy * 10 * factor,
    rotateX: -dy * 4 * factor,
    rotateY: dx * 4 * factor,
  };
}
