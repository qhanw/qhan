import { Graphics } from 'pixi.js';
import type Editor from '../editor';

/**
 * Canvas 中绘制，必须为 x.5 才能绘制一列单独像素，
 * 否则会因为抗锯齿，绘制两列像素，且一个为半透明，导致一种模糊的效果
 *
 * 这个方法会得到值最接近的 x.5 值。
 */
export const nearestPixelVal = (n: number) => n + 0.5;

export class Grid {
  line = new Graphics({ zIndex: 10 });

  /** 是否存在网格 */
  private isExist = false;

  /** 是否显示网格 */
  private able = false;

  constructor(private editor: Editor) {}

  draw() {
    // 如果未开启网格，则不绘制
    if (!this.able) return;

    this.clear();

    const layer = this.editor.underlay.view;

    const zoom = layer.scale.x;

    const stepX = 1;
    const stepY = 1;

    // 如果当前缩放比例小于4则不显示网格
    if (zoom < 4) return;

    const { width, height } = layer.getBounds();

    // 保持线的缩放比例为 1:1
    this.line.scale = 1 / zoom;

    let startX = 0;
    let startY = 0;
    const endX = width / zoom;
    const endY = height / zoom;

    while (startX <= endX) {
      const x = nearestPixelVal(startX * zoom);
      this.line.moveTo(x, 0);
      this.line.lineTo(x, height);

      startX += stepX;
    }

    while (startY <= endY) {
      const y = nearestPixelVal(startY * zoom);
      this.line.moveTo(0, y);
      this.line.lineTo(width, y);

      startY += stepY;
    }

    this.line.stroke({ alpha: 0.15 });
    layer.addChild(this.line);

    if (!this.isExist) this.isExist = true;
  }

  clear() {
    if (this.isExist) {
      this.line.clear();
      this.editor.underlay.view.removeChild(this.line);
      this.isExist = false;
    }
  }

  /** 网格是否可用 */
  showAble(bool: boolean) {
    this.able = bool;
    if (bool) {
      this.draw();
    } else {
      this.clear();
    }
  }
}
