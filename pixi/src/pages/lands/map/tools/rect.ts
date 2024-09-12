import { Mesh, Point, type Container, type FederatedPointerEvent } from 'pixi.js';

import { TempRect, DrawRect } from './rect_utils';

import type { ITool } from './typings';
import type Editor from '../editor';

const TYPE = 'rect';
export class Rect implements ITool {
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

  private target?: Mesh;
  private tempRect?: TempRect;
  onActive() {
    console.info('tool active: rect');

    this.editor.cursor?.setCursor('crosshair');
    this.view.eventMode = 'static';

    // 给子元素添加事件监听，用于判断框选时是否在同一范围内
    this.view.children.forEach((c) => (c.eventMode = 'static'));

    this.view.on('pointerdown', this.handleDown);
  }
  onInactive() {
    console.log('tool inactive: rect');
    this.view.eventMode = 'passive';
    this.view.off('pointerdown', this.handleDown);
  }
  onStart() {}
  onMove() {}
  onEnd() {}

  private handleDown(e: FederatedPointerEvent) {
    const globalPos = this.box.toLocal(e.global);

    if (e.target instanceof Mesh) this.target = e.target;

    this.tempRect = new TempRect(this.editor, this.box, globalPos);

    // 点击拖动进行框选裁剪删除， 未发生拖动表示点选擦出
    window.addEventListener('pointermove', this.handleMove);
    window.addEventListener('pointerup', this.handleUp);
  }

  private handleMove(e: PointerEvent) {
    const globalPos = this.getGlobalPos(e);
    this.tempRect?.move(globalPos);
  }
  private handleUp(e: PointerEvent) {
    const globalPos = this.getGlobalPos(e);

    const sameScope = this.target?.containsPoint(globalPos);
    const path = this.tempRect?.getGeometryPositions();

    this.tempRect?.end();
    this.tempRect = undefined;
    this.target = undefined;

    if (sameScope && path) new DrawRect(this.editor).draw(path);

    // 回调传回绘制数据
    this.editor.fn?.(this.editor.areas.serializer());

    window.removeEventListener('pointermove', this.handleMove);
    window.removeEventListener('pointerup', this.handleUp);
  }

  private getGlobalPos(e: PointerEvent) {
    const { x, y } = this.editor.canvas.getBoundingClientRect();
    return this.box.toLocal(new Point(e.clientX - x, e.clientY - y));
  }
}
