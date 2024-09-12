import type { Container } from 'pixi.js';
import { Graphics, Point } from 'pixi.js';

export class Rectangle {
  #view: Container;
  #p1: Point;
  #p2: Point;
  #rect: Graphics;

  constructor(layer: Container, startPoint: Point) {
    this.#view = layer;
    this.#p1 = startPoint;
    this.#p2 = startPoint;
    this.#rect = new Graphics();
    this.#view.addChild(this.#rect);
  }

  getRect() {
    const { x: x1, y: y1 } = this.#p1;
    const { x: x2, y: y2 } = this.#p2;

    // const x = [Math.floor(x1), Math.ceil(x2)]
    // const y = [Math.floor(y1), Math.ceil(y2)]

    const x = [x1, x2];
    const y = [y1, y2];

    const minX = Math.min(...x);
    const minY = Math.min(...y);

    const maxX = Math.max(...x);
    const maxY = Math.max(...y);

    return { tl: new Point(minX, minY), br: new Point(maxX, maxY) };
  }

  drawRect() {
    const rect = this.getRect();

    this.#rect.clear();
    this.#rect
      .rect(rect.tl.x, rect.tl.y, rect.br.x - rect.tl.x, rect.br.y - rect.tl.y)
      .fill('#8888ff80');
  }
  move(point: Point) {
    this.#p2 = point;

    this.drawRect();
  }

  getGeometryPositions() {
    const rect = this.getRect();

    const w = Math.floor(rect.br.x - rect.tl.x);
    const h = Math.floor(rect.br.y - rect.tl.y);

    const x = Math.floor(rect.tl.x);
    const y = Math.floor(rect.tl.y);

    return [x, y, x + w, y, x + w, y + h, x, y + h];
  }

  end() {
    this.#view.removeChild(this.#rect);
  }
}
