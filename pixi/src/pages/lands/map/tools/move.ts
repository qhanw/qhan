import { Point } from 'pixi.js';
import type { FederatedPointerEvent, Container } from 'pixi.js';

import type { ITool } from './typings';
import type Editor from '../editor';

const copyPoint = ({ x, y }: Point) => new Point(x, y);

const TYPE = 'move';

export class Move implements ITool {
  static readonly type = TYPE;
  readonly type = TYPE;

  private readonly view: Container;

  constructor(private editor: Editor) {
    this.view = editor.underlay.view;
  }
  onActive() {
    console.info('tool active: move ');

    this.view.eventMode = 'static';
    this.view.cursor = 'move';

    this.view
      .on('pointerdown', this.#onDragStart.bind(this))
      .on('pointerup', this.#onDragEnd.bind(this))
      .on('pointerupoutside', this.#onDragEnd.bind(this));
  }
  onInactive() {
    console.info('tool inactive: move');

    this.view.eventMode = 'passive';
    this.view.cursor = 'auto';

    this.view
      .off('pointerdown', this.#onDragStart)
      .off('pointerup', this.#onDragEnd)
      .off('pointerupoutside', this.#onDragEnd);
  }

  onStart() {}
  onMove() {}
  onEnd() {}

  #dragTarget?: Container;
  #mousedownPoint = new Point(0, 0);
  #dragTargetPoint = new Point(0, 0);

  #onDragMove(event: FederatedPointerEvent) {
    if (this.#dragTarget) {
      const globalPos = event.global;

      const startPoint = this.editor.stage.toLocal(this.#mousedownPoint);
      const currPoint = this.editor.stage.toLocal(globalPos);

      const dx = currPoint.x - startPoint.x;
      const dy = currPoint.y - startPoint.y;

      const { x, y } = this.#dragTargetPoint;

      this.#dragTarget.position.set(x + dx, y + dy);

      // #dragTarget.parent.toLocal(event.global, null, #dragTarget.position);
    }
  }

  #onDragStart(event: FederatedPointerEvent) {
    // Store a reference to the data
    // * The reason for this is because of multitouch *
    // * We want to track the movement of this particular touch *

    this.editor.stage.eventMode = 'static';
    // this.view.alpha = 0.5;
    this.#dragTarget = this.view;
    this.#mousedownPoint = copyPoint(event.global);
    this.#dragTargetPoint = copyPoint(this.view.position);
    this.editor.stage.on('pointermove', this.#onDragMove.bind(this));
  }

  #onDragEnd() {
    if (this.#dragTarget) {
      this.editor.stage.eventMode = 'auto';
      this.editor.stage.off('pointermove', this.#onDragMove);
      this.#dragTarget = undefined;
    }
  }
}
