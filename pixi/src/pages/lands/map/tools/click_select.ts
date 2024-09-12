import type { Container, FederatedPointerEvent } from 'pixi.js';

import { DrawRect } from './rect_utils';

import type { ITool } from './typings';
import type Editor from '../editor';

const TYPE = 'click-select';

export class ClickSelect implements ITool {
  static readonly type = TYPE;
  readonly type = TYPE;

  private readonly view: Container;
  private readonly box: Container;

  constructor(private editor: Editor) {
    this.view = this.editor.areas.view;
    this.box = this.editor.areas.box;
  }
  onActive() {
    console.info('tool active: click-select ');

    this.editor.cursor?.setCursor('clickSelect');
    this.view.eventMode = 'static';
    this.view.on('pointerdown', this.#create.bind(this));
    // .on('pointermove', this.#updateCursor.bind(this));
  }
  onInactive() {
    console.info('tool inactive: click-select ');

    this.view.eventMode = 'passive';
    this.view.off('pointerdown');
    //.off('pointermove');
  }

  onStart() {}
  onMove() {}
  onEnd() {}

  #create(event: FederatedPointerEvent) {
    event.stopPropagation();

    const globalPos = this.box.toLocal(event.global);

    const x = Math.floor(globalPos.x);
    const y = Math.floor(globalPos.y);

    const path = [x, y, x + 1, y, x + 1, y + 1, x, y + 1];

    if (path) new DrawRect(this.editor).draw(path);

    // 回调传回绘制数据
    this.editor.fn?.(this.editor.areas.serializer());
  }

  // #updateCursor(e: FederatedPointerEvent) {
  //   const size = this.editor.underlay.view?.scale.x;
  //   const defaultIcon = `url("data:image/svg+xml;utf8,%3Csvg width='${size}px' height='${size}' viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg' fill='%23ff0000'%3E%3Crect height='1' width='1'/%3E%3C/svg%3E"),auto`;
  //   e.target.cursor = defaultIcon;
  // }
}
