import { Application, Assets } from 'pixi.js';
import type { ICanvas } from 'pixi.js';

import { DrawAdsSpace } from './draw';
import { Underlay } from './underlay';

// import { slider } from './slider';
// import { tools } from './tools';

import mapBg from '@/assets/map.png';

import { findPos } from './utils/findPos';
export { toMap } from './utils/toMap';

type Options = {
  onClickPos: (id: number) => void;
};

export default class Editor extends Application {
  underlay!: Underlay;
  ads = new DrawAdsSpace(this);

  fn: Options['onClickPos'];

  constructor(canvas: ICanvas, { onClickPos }: Options) {
    super();

    this.#init(canvas);
    this.fn = onClickPos;
  }

  async #init(canvas: ICanvas) {
    const resizeTo = canvas.parentNode! as HTMLElement;

    await this.init({ canvas, resizeTo, background: '#85a5ff', antialias: true });

    await Assets.load([{ alias: 'background', src: mapBg }]);

    // 背景底图
    this.underlay = new Underlay(this);
    this.underlay.view.addChild(this.ads.view);

    this.stage.addChild(this.underlay.view);
  }
  adapt() {
    this.underlay.adapt();
  }

  setPosition(x: number, y: number) {
    // 根根坐标找出
    const k = findPos(this.ads.ads, [x, y]);
    if (!k) return;

    const aim = this.ads.view.children.find((c) => c.label === k);

    if (aim) this.ads.updateAlpha(aim);
    this.underlay.setCenter(x, y);
  }
}
