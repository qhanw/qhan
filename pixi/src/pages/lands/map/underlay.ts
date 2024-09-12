import { Container, Sprite, Point } from 'pixi.js';
import type { UpdateTransformOptions } from 'pixi.js';

import { MAX_WIDTH, MAX_HEIGHT } from './config';

import type Editor from './editor';

export class Underlay {
  view: Container;
  #bg: Sprite;

  #maxZoom = 20;
  #minZoom = 0.2;

  constructor(
    private editor: Editor,
    width = 3000,
    height = 3000,
  ) {
    this.view = new Container();
    this.adapt(width, height);

    this.#bg = Sprite.from('background');
    this.#bg.width = MAX_WIDTH;
    this.#bg.height = MAX_HEIGHT;

    this.view.addChild(this.#bg);

    this.#actZoom();
  }

  /** 适应画面 */
  adapt(width = MAX_WIDTH, height = MAX_HEIGHT) {
    const { width: w, height: h } = this.editor.screen;
    const scale = (w < h ? w : h) / width;
    this.view.scale = scale;
    this.view.position.set((w - width * scale) / 2, (h - height * scale) / 2);

    // 显示网格
    this.showGrid(scale);
  }

  /** 缩放 */
  zoom(z: 'in' | 'out' | number) {
    // 设置指定缩放比例
    if (typeof z === 'number') {
      this.view.scale = z;
      return;
    }

    const globalPos = new Point(this.editor.screen.width / 2, this.editor.screen.height / 2);
    const oldZoom = this.view.scale.x;

    const increase = 0.2;
    let newZoom = oldZoom + (z === 'in' ? increase : -increase);

    if (newZoom > this.#maxZoom) newZoom = this.#maxZoom;
    if (newZoom < this.#minZoom) newZoom = this.#minZoom;

    const matrix = this.getMatrix(oldZoom, newZoom, globalPos);

    this.view.updateTransform(matrix);

    // 显示网格
    this.showGrid(newZoom);
  }

  #actZoom() {
    this.editor.canvas.addEventListener('wheel', (event) => {
      const { x, y } = this.editor.canvas.getBoundingClientRect();
      const globalPos = new Point(event.clientX - x, event.clientY - y);

      if (!this.inUnderlay(globalPos)) return;

      const delta = event.deltaY;
      const oldZoom = this.view.scale.x;

      let newZoom = oldZoom * 0.999 ** delta;
      if (newZoom > this.#maxZoom) newZoom = this.#maxZoom;
      if (newZoom < this.#minZoom) newZoom = this.#minZoom;

      const matrix = this.getMatrix(oldZoom, newZoom, globalPos);

      this.view.updateTransform(matrix);

      // 显示网格
      this.showGrid(newZoom);
    });
  }

  private getMatrix(oldZoom: number, newZoom: number, globalPos: Point): UpdateTransformOptions {
    const oldStageMatrix = this.view.localTransform.clone();
    const oldStagePos = oldStageMatrix.applyInverse(globalPos);
    const dx = oldStagePos.x * oldZoom - oldStagePos.x * newZoom;
    const dy = oldStagePos.y * oldZoom - oldStagePos.y * newZoom;

    return {
      x: this.view.position.x + dx,
      y: this.view.position.y + dy,
      scaleX: newZoom,
      scaleY: newZoom,
      rotation: 0,
      skewX: 0,
      skewY: 0,
      pivotX: 0,
      pivotY: 0,
    };
  }

  private showGrid(zoom: number) {
    // 当缩放比例大于4时显示像素网格，当缩放比例小于4时移除像素网格
    if (zoom >= 4) this.editor.grid?.draw();
    if (zoom < 4) this.editor.grid?.clear();
  }

  /** 移动某一点到视窗中心 */
  move(point?: Point) {
    if (!point) return;

    const scale = this.view.scale.x;

    const { width: w, height: h } = this.editor.screen;

    const centPos = new Point(w / 2, h / 2);
    const pos = this.view.toLocal(point);

    this.view.position.set(centPos.x - pos.x * scale, centPos.y - pos.y * scale);
  }

  /** 判断点是否落在舞台内 */
  private isPointInUnderlay(x: number, y: number, width: number, height: number) {
    return x >= 0 && x <= width && y >= 0 && y <= height;
  }

  private inUnderlay(globalPos: Point) {
    // 将滚动放大限制在背景地图范围内
    const { width, height } = this.view.getLocalBounds();
    const localPos = this.view.toLocal(globalPos);
    return this.isPointInUnderlay(localPos.x, localPos.y, width, height);
  }
}
