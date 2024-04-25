import { Application, Assets } from "pixi.js";
import type { ICanvas } from "pixi.js";

import type { Options } from "./typings";

import { DrawGraphics, DrawLimit } from "./draw";
import { Underlay } from "./underlay";

// import { slider } from './slider';
// import { tools } from './tools';

import mapBg from "./assets/map.png";

export type ToolsType = "zoomIn" | "zoomOut" | "select" | "move" | "shape";

export type Map = {
  instance: Application;
  getDrawData: () => void;
  updateOptions: (type: ToolsType) => void;
};

export default async function bootstrap(
  canvas: ICanvas,
  opts: Options
): Promise<Map | undefined> {
  if (!canvas) return;

  const resizeTo = canvas.parentNode! as HTMLElement;
  const app = new Application();
  await app.init({ canvas, resizeTo, background: "#85a5ff", antialias: true });

  await Assets.load([{ alias: "background", src: mapBg }]);

  // 背景底图
  const underlay = new Underlay(app);

  // 绘制可划分区域
  const areas = new DrawLimit({
    points: opts.area,
    style: "#b7eb8ffa",
    underlay: underlay.view,
  });
  // 绘制已划分区域
  const selected = new DrawGraphics({
    points: opts.selected,
    style: "#ff9c6e",
  });

  underlay.view.addChild(areas.view, areas.box, selected.view);

  app.stage.addChild(underlay.view);

  // Make the slider
  // await slider(app);

  // TODO: Make the tools
  // await tools(app);

  return {
    instance: app,
    getDrawData: () => areas.serializer(),
    updateOptions: (type) => {
      switch (type) {
        case "zoomIn":
          underlay.zoom("in");
          break;
        case "zoomOut":
          underlay.zoom("out");
          break;
        case "select":
          underlay.dragging = false;
          areas.clickSelect = true;
          break;
        case "move":
          underlay.dragging = true;
          areas.clickSelect = false;
          break;

        case "shape":
        default:
      }
    },
  };
}
