import { Container, Sprite } from 'pixi.js';
import { Point } from 'pixi.js';

import { OFFSET_X, OFFSET_Y } from './config';

export class DrawTransPoint {
  view = new Container();

  draw(point: number[]) {
    const pos = this.getPoint(point);
    const g = Sprite.from('locationSvg');
    g.position.set(pos.x + OFFSET_X - 32, OFFSET_Y - pos.y - 64);
    g.width = 64;
    g.height = 64;
    this.view.addChild(g);
  }
  clear() {
    this.view.removeChildren();
  }

  getPoint(point: number[]) {
    const [x1, x2, y1, y2] = point;

    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);

    const maxX = Math.min(x1, x2);
    const maxY = Math.min(y1, y2);

    const offsetX = (maxX - minX) / 2;
    const offsetY = (maxY - minY) / 2;

    return new Point(Math.round(minX + offsetX), Math.round(minY + offsetY));
  }
}
