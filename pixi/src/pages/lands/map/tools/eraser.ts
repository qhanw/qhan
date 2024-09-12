import { Point } from 'pixi.js';
import type { Container, FederatedPointerEvent } from 'pixi.js';

import { DrawRect, CutRect } from './rect_utils';

import type { ITool } from './typings';
import type Editor from '../editor';

const TYPE = 'eraser';

export class Eraser implements ITool {
  static readonly type = TYPE;
  readonly type = TYPE;

  private readonly view: Container;
  private readonly box: Container;

  constructor(private editor: Editor) {
    this.view = this.editor.areas.view;
    this.box = this.editor.areas.box;

    this.handleDown = this.handleDown.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleUp = this.handleUp.bind(this);
  }

  private tempRect?: CutRect;
  onActive() {
    console.info('tool active: eraser ');

    this.editor.cursor?.setCursor('eraser');
    this.view.eventMode = 'static';

    // 此处用view作为事件命中是因为在box上未配置命区域
    // 且box上的事件命中区域也是其子元素的冒泡，若需要进行box事件处理则需先进行对box配置事件命中区域配置
    this.view.on('pointerdown', this.handleDown);
  }
  onInactive() {
    console.info('tool inactive: eraser ');

    this.view.eventMode = 'passive';
    this.view.off('pointerdown');
  }

  onStart() {}
  onMove() {}
  onEnd() {}

  private handleDown(e: FederatedPointerEvent) {
    const globalPos = this.box.toLocal(e.global);
    this.tempRect = new CutRect(this.view, globalPos);

    // 点击拖动进行框选裁剪删除， 未发生拖动表示点选擦出
    window.addEventListener('pointermove', this.handleMove);
    window.addEventListener('pointerup', this.handleUp);
  }
  private handleMove(e: PointerEvent) {
    const globalPos = this.getGlobalPos(e);
    this.tempRect?.move(globalPos);
  }
  private handleUp() {
    const path = this.tempRect?.getGeometryPositions();

    this.tempRect?.end();
    this.tempRect = undefined;

    if (path) new DrawRect(this.editor).draw(path, 'sub');

    // 回调传回绘制数据
    this.editor.fn?.(this.editor.areas.serializer());

    // 移除相关事件
    window.removeEventListener('pointermove', this.handleMove);
    window.removeEventListener('pointerup', this.handleUp);
  }

  private getGlobalPos(e: PointerEvent) {
    const { x, y } = this.editor.canvas.getBoundingClientRect();
    return this.box.toLocal(new Point(e.clientX - x, e.clientY - y));
  }
}
