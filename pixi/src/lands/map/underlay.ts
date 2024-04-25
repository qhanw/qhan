import { Application, Container, Sprite, Point } from "pixi.js";
import type { FederatedPointerEvent, UpdateTransformOptions } from "pixi.js";

const copyPoint = ({ x, y }: Point) => new Point(x, y);

export class Underlay {
  view: Container;
  #bg: Sprite;

  #maxZoom = 20;
  #minZoom = 0.2;

  #app: Application;

  constructor(app: Application, width = 3000, height = 3000) {
    this.view = new Container();

    this.#bg = Sprite.from("background");
    this.#bg.width = width;
    this.#bg.height = height;

    this.view.position.set(-1500, -1950);
    this.view.scale = 1;

    this.view.addChild(this.#bg);

    this.#app = app;

    this.#actZoom();
  }

  // -- 拖动交互 -----------------------
  set dragging(bool: boolean) {
    if (bool) {
      this.view.eventMode = "static";
      this.view.cursor = "move";

      this.view
        .on("pointerdown", this.#onDragStart.bind(this))
        .on("pointerup", this.#onDragEnd.bind(this))
        .on("pointerupoutside", this.#onDragEnd.bind(this));
    } else {
      this.view.eventMode = "auto";
      this.view.cursor = "auto";

      this.view
        .off("pointerdown", this.#onDragStart)
        .off("pointerup", this.#onDragEnd)
        .off("pointerupoutside", this.#onDragEnd);
    }
  }

  #dragTarget?: Container;
  #mousedownPoint = new Point(0, 0);
  #dragTargetPoint = new Point(0, 0);

  #onDragMove(event: FederatedPointerEvent) {
    if (this.#dragTarget) {
      const globalPos = event.global;

      const startPoint = this.#app.stage.localTransform
        .clone()
        .applyInverse(this.#mousedownPoint);
      const currPoint = this.#app.stage.localTransform
        .clone()
        .applyInverse(globalPos);

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

    this.#app.stage.eventMode = "static";
    // this.view.alpha = 0.5;
    this.#dragTarget = this.view;
    this.#mousedownPoint = copyPoint(event.global);
    this.#dragTargetPoint = copyPoint(this.view.position);
    this.#app.stage.on("pointermove", this.#onDragMove.bind(this));
  }

  #onDragEnd() {
    if (this.#dragTarget) {
      this.#app.stage.eventMode = "auto";
      this.#app.stage.off("pointermove", this.#onDragMove);
      this.#dragTarget = undefined;
    }
  }

  // -- 缩放 -----------------------

  zoom(type: "in" | "out") {
    const globalPos = new Point(
      this.#app.screen.width / 2,
      this.#app.screen.height / 2
    );
    const oldZoom = this.view.scale.x;

    const increase = 0.2;
    let newZoom = oldZoom + (type === "in" ? increase : -increase);

    if (newZoom > this.#maxZoom) newZoom = this.#maxZoom;
    if (newZoom < this.#minZoom) newZoom = this.#minZoom;

    const matrix = this.#getMatrix(oldZoom, newZoom, globalPos);

    this.view.updateTransform(matrix);
  }

  #actZoom() {
    this.#app.canvas.addEventListener("wheel", (event) => {
      const { x, y } = this.#app.canvas.getBoundingClientRect();

      const globalPos = new Point(event.clientX - x, event.clientY - y);
      const delta = event.deltaY;
      const oldZoom = this.view.scale.x;

      let newZoom = oldZoom * 0.999 ** delta;
      if (newZoom > this.#maxZoom) newZoom = this.#maxZoom;
      if (newZoom < this.#minZoom) newZoom = this.#minZoom;

      const matrix = this.#getMatrix(oldZoom, newZoom, globalPos);

      this.view.updateTransform(matrix);
    });
  }

  #getMatrix(
    oldZoom: number,
    newZoom: number,
    globalPos: Point
  ): UpdateTransformOptions {
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
}
