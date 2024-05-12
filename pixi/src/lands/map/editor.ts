import { Application, Assets } from "pixi.js";
import type { ICanvas } from "pixi.js";

import type { Options } from "./typings";

import { DrawGraphics, DrawLimit } from "./draw";
import { Underlay } from "./underlay";

// import { slider } from './slider';
// import { tools } from './tools';

import mapBg from "./assets/map.png";

export type ToolsType = "zoomIn" | "zoomOut" | "select" | "move" | "shape";

export default class Editor extends Application {
  #area!: DrawLimit;
  #divided!: DrawGraphics;
  #underlay!: Underlay;

  constructor(canvas: ICanvas, opts: Options) {
    super();
    this.#init(canvas, opts);
  }

  async #init(canvas: ICanvas, opts: Options) {
    if (!canvas) return;

    const resizeTo = canvas.parentNode! as HTMLElement;

    await this.init({
      canvas,
      resizeTo,
      background: "#85a5ff",
      antialias: true,
    });

    await Assets.load([{ alias: "background", src: mapBg }]);

    // 背景底图
    this.#underlay = new Underlay(this);

    // 绘制可划分区域
    this.#area = new DrawLimit({
      points: opts.area,
      style: "#b7eb8ffa",
      underlay: this.#underlay.view,
    });
    // 绘制已划分区域
    this.#divided = new DrawGraphics({
      points: opts.divided,
      style: "#ff9c6e",
    });

    this.#underlay.view.addChild(
      this.#area.view,
      this.#area.box,
      this.#divided.view
    );

    this.stage.addChild(this.#underlay.view);
  }

  getDrawData() {
    return this.#area.serializer();
  }
  updateOptions(type: ToolsType) {
    console.log(type);
    switch (type) {
      case "zoomIn":
        this.#underlay.zoom("in");
        break;
      case "zoomOut":
        this.#underlay.zoom("out");
        break;
      case "select":
        this.#underlay.dragging = false;
        this.#area.clickSelect = true;
        break;
      case "move":
        this.#underlay.dragging = true;
        this.#area.clickSelect = false;
        break;

      case "shape":
      default:
    }
  }
}
