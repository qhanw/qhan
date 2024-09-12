import type { Application } from 'pixi.js';
import { Assets, Container, Graphics } from 'pixi.js';

import tZoomIn from '../assets/tool-zoom-in.svg';
import tZoomOut from '../assets/tool-zoom-out.svg';
import tDragDrop from '../assets/tools-drag-drop.svg';
import tDragMove from '../assets/tools-drag-move.svg';
import tShape from '../assets/tools-shape.svg';

export async function tools(app: Application) {
  const assets = [
    {
      alias: 'zoomIn',
      src: tZoomIn,
      data: {
        parseAsGraphicsContext: true,
      },
    },
    { alias: 'zoomOut', src: tZoomOut },
    { alias: 'dragDrop', src: tDragDrop },
    { alias: 'dragMove', src: tDragMove },
    { alias: 'shape', src: tShape },
  ];

  // await Assets.load(assets);

  const zoomIn = await Assets.load({
    src: tZoomIn,
    // data: {
    //   parseAsGraphicsContext: true,
    // },
  });

  const bgW = 36;
  const iW = 20;

  const t = ['zoomIn', 'zoomOut', 'dragDrop', 'dragMove', 'shape'].map((_, i) => {
    //  const ss =  new Texture.from(c)
    const s = new Graphics(zoomIn);

    s.x = (bgW - iW) / 2;
    s.y = 36 * i + (36 - iW) / 2;
    s.width = iW;
    s.height = iW;
    //s.scale = 0.2;

    return s;
  });

  const toolsBox = new Container();
  toolsBox.position.set(100, 100);
  toolsBox.alpha = 0.85;

  const bg = new Graphics().rect(0, 0, bgW, assets.length * bgW).fill('#fff');

  toolsBox.addChild(bg, ...t);

  app.stage.addChild(toolsBox);
}
