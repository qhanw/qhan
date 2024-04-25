import { Application, Container, Graphics } from 'pixi.js';

import type { FederatedPointerEvent } from 'pixi.js';

export async function slider(app: Application) {
  const { width, height } = app.screen;

  const h = 160;
  const w = 2;

  const r = 6;

  const s = new Container();

  const sliderBar = new Graphics().rect(0, 0, w, h).fill({ color: 'rgba(255,255,255, 0.85)' });
  const handle = new Graphics().circle(0, 0, r).fill({ color: 'rgba(255,255,255, 1)' });

  handle.position.set(sliderBar.width / 2, h / 2);
  s.position.set(width - (w + 24), (height - h) / 2);
  s.addChild(sliderBar, handle);
  app.stage.addChild(s);

  handle.eventMode = 'static';
  handle.cursor = 'pointer';

  handle
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd);

  // Listen to pointermove on stage once handle is pressed.
  function onDragStart(event: FederatedPointerEvent) {
    event.stopPropagation();
    app.stage.eventMode = 'static';
    app.stage.on('pointermove', onDrag);
  }

  // Stop dragging feedback once the handle is released.
  function onDragEnd() {
    app.stage.eventMode = 'auto';
    app.stage.off('pointermove', onDrag);
  }

  // Update the handle's position & bunny's scale when the handle is moved.
  function onDrag(e: FederatedPointerEvent) {
    const halfHandleHeight = handle.height / 2;
    // Set handle y-position to match pointer, clamped to (4, screen.height - 4).

    handle.y = Math.max(halfHandleHeight, Math.min(s.toLocal(e.global).y, h - halfHandleHeight));
    // Normalize handle position between -1 and 1.
    // const t = 2 * (handle.x / sliderWidth - 0.5);

    // bunny.scale.set(3 * (1.1 + t));
  }

  return s;
}
