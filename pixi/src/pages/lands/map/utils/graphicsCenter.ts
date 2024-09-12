import type { Container } from 'pixi.js';
import { Point } from 'pixi.js';

export function getCenter(view?: Container) {
  if (!view) return;

  const { x, y, width, height } = view.getBounds();

  // 图形中心点
  return new Point(width / 2 + x, height / 2 + y);
}
