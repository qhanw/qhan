import { Container, Sprite, Point } from 'pixi.js';
import type { FederatedPointerEvent, UpdateTransformOptions, Application } from 'pixi.js';

import { Tween, Easing } from '@tweenjs/tween.js';

import { OFFSET_X, OFFSET_Y, MAX_WIDTH, MAX_HEIGHT } from './options';

const copyPoint = ({ x, y }: Point) => new Point(x, y);

// Calculate the distance between two given points
// function distanceBetweenTwoPoints(p1: Point, p2: Point) {
//   const a = p1.x - p2.x;
//   const b = p1.y - p2.y;

//   return Math.hypot(a, b);
// }

export class Underlay {
  view: Container;
  #bg: Sprite;

  #maxZoom = 20;
  #minZoom = 0.2;

  #app: Application;

  /** 舞台中心点坐标 */
  #stageCenterPos: Point;

  // #movePoint: Point;

  constructor(app: Application) {
    const { width: w, height: h } = app.screen;
    this.#app = app;
    this.view = new Container();
    this.#adapt();

    // 舞台中心点
    const stageCenterPos = new Point(w / 2, h / 2);
    this.#stageCenterPos = stageCenterPos;

    this.#bg = Sprite.from('background');
    this.#bg.width = MAX_WIDTH;
    this.#bg.height = MAX_HEIGHT;

    this.view.addChild(this.#bg);

    this.#actZoom();
    this.#dragging();

    // this.#movePoint = new Point(-1500 + stageCenterPos.x, -1500 + stageCenterPos.y);
    // this.#app.ticker.add((time) => {
    //   // 动画交互
    //   const acceleration = new Point(0);
    //   const centerPoint = this.#movePoint;

    //   const delta = time.deltaTime;

    //   acceleration.set(acceleration.x * 0.99, acceleration.y * 0.99);

    //   const aimCenterPoint = new Point(this.view.x, this.view.y);

    //   const toCenterPointDirection = new Point(
    //     centerPoint.x - aimCenterPoint.x,
    //     centerPoint.y - aimCenterPoint.y,
    //   );

    //   const angleToCenterPoint = Math.atan2(toCenterPointDirection.y, toCenterPointDirection.x);

    //   const distMouseRedSquare = distanceBetweenTwoPoints(centerPoint, aimCenterPoint);

    //   console.log(distMouseRedSquare);

    //   const redSpeed = distMouseRedSquare * 0.05;

    //   acceleration.set(
    //     Math.cos(angleToCenterPoint) * redSpeed,
    //     Math.sin(angleToCenterPoint) * redSpeed,
    //   );

    //   this.view.x += acceleration.x * delta;
    //   this.view.y += acceleration.y * delta;
    // });
  }

  /** 适应画面 */
  #adapt(width = MAX_WIDTH, height = MAX_HEIGHT) {
    const { width: w, height: h } = this.#app.screen;
    const scale = (w < h ? w : h) / width;
    this.view.scale = scale;
    this.view.position.set((w - width * scale) / 2, (h - height * scale) / 2);
  }

  // -- 拖动交互 -----------------------
  #dragging() {
    this.view.eventMode = 'static';
    this.view.cursor = 'move';

    this.view
      .on('pointerdown', this.#onDragStart.bind(this))
      .on('pointerup', this.#onDragEnd.bind(this))
      .on('pointerupoutside', this.#onDragEnd.bind(this));
  }

  #dragTarget?: Container;
  #mousedownPoint = new Point(0, 0);
  #dragTargetPoint = new Point(0, 0);

  #onDragMove(event: FederatedPointerEvent) {
    if (this.#dragTarget) {
      const globalPos = event.global;

      const startPoint = this.#app.stage.localTransform.clone().applyInverse(this.#mousedownPoint);
      const currPoint = this.#app.stage.localTransform.clone().applyInverse(globalPos);

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

    this.#app.stage.eventMode = 'static';
    // this.view.alpha = 0.5;
    this.#dragTarget = this.view;
    this.#mousedownPoint = copyPoint(event.global);
    this.#dragTargetPoint = copyPoint(this.view.position);
    this.#app.stage.on('pointermove', this.#onDragMove.bind(this));
  }

  #onDragEnd() {
    if (this.#dragTarget) {
      this.#app.stage.eventMode = 'auto';
      this.#app.stage.off('pointermove', this.#onDragMove);
      this.#dragTarget = undefined;
    }
  }

  /** 判断点是否落在舞台内 */
  private isPointInStage(x: number, y: number, width: number, height: number) {
    return x >= 0 && x <= width && y >= 0 && y <= height;
  }

  private inUnderlay(globalPos: Point) {
    // 将滚动放大限制在背景地图范围内
    const { width, height } = this.view.getLocalBounds();
    const localPos = this.view.toLocal(globalPos);
    return this.isPointInStage(localPos.x, localPos.y, width, height);
  }

  // 输入坐标居中显示
  setCenter(x: number, y: number) {
    const scale = this.view.scale.x;

    const centPos = copyPoint(this.#stageCenterPos);
    const pos = new Point(x + OFFSET_X, OFFSET_Y - y);

    // 设置坐标时需同时乘以缩放比例
    const newPoint = new Point(centPos.x - pos.x * scale, centPos.y - pos.y * scale);

    // this.#movePoint = newPoint;

    // 直接设定
    // // this.view.position.set(newPoint.x, newPoint.y);

    const coords = copyPoint(this.view.position);
    const tween = new Tween(coords) // Create a new tween that modifies 'coords'.
      .to(newPoint, 1000) // Move to (300, 200) in 1 second.
      .easing(Easing.Quartic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(() => {
        // Called after tween.js updates 'coords'.
        // Move 'box' to the position described by 'coords' with a CSS translation.
        // box.style.setProperty('transform', 'translate(' + coords.x + 'px, ' + coords.y + 'px)')

        this.view.position.set(coords.x, coords.y);
      })
      .start(); // Start the tween immediate

    // Setup the animation loop.
    function animate(time: number) {
      tween.update(time);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // -- 缩放 -----------------------

  zoom(type: 'in' | 'out') {
    const globalPos = new Point(this.#app.screen.width / 2, this.#app.screen.height / 2);
    const oldZoom = this.view.scale.x;

    const increase = 0.2;
    let newZoom = oldZoom + (type === 'in' ? increase : -increase);

    if (newZoom > this.#maxZoom) newZoom = this.#maxZoom;
    if (newZoom < this.#minZoom) newZoom = this.#minZoom;

    const matrix = this.#getMatrix(oldZoom, newZoom, globalPos);

    this.view.updateTransform(matrix);
  }

  #actZoom() {
    this.#app.canvas.addEventListener('wheel', (event) => {
      const { x, y } = this.#app.canvas.getBoundingClientRect();
      const globalPos = new Point(event.clientX - x, event.clientY - y);

      if (!this.inUnderlay(globalPos)) return;

      const delta = event.deltaY;
      const oldZoom = this.view.scale.x;

      let newZoom = oldZoom * 0.999 ** delta;
      if (newZoom > this.#maxZoom) newZoom = this.#maxZoom;
      if (newZoom < this.#minZoom) newZoom = this.#minZoom;

      const matrix = this.#getMatrix(oldZoom, newZoom, globalPos);

      this.view.updateTransform(matrix);
    });
  }

  #getMatrix(oldZoom: number, newZoom: number, globalPos: Point): UpdateTransformOptions {
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

  /** 适应画面 */
  adapt(width = MAX_WIDTH, height = MAX_HEIGHT) {
    const { width: w, height: h } = this.#app.screen;
    const scale = (w < h ? w : h) / width;
    this.view.scale = scale;
    this.view.position.set((w - width * scale) / 2, (h - height * scale) / 2);
  }
}
