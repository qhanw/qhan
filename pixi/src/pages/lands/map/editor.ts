import { Application, Assets } from 'pixi.js';
import type { ICanvas } from 'pixi.js';

import type { GraphCollection, Options, PointTuple } from './typings';
import type { PlanStatus } from '../components/Plan';

import { COLOR } from './config';
import { DrawTransPoint } from './drawTransPoint';
import { DrawDivided, DrawLimit, DrawSold, drawGraph } from './draw';
import { Underlay } from './underlay';
import { Tools } from './tools';
import { Cursor } from './cursor';
import { Grid } from './scene/grid';

import mapBg from '@/assets/map.png';
import locationSvg from './assets/location.svg';

import { getCenter } from './utils/graphicsCenter';

export type ToolsType =
  | 'zoomIn'
  | 'zoomOut'
  | 'move'
  | 'refresh'
  | 'select'
  | 'rect'
  | 'click-select'
  | 'eraser'
  | 'focus-mode';

export type SceneType = 'grid';

type Fn = (v?: { vertices: PointTuple[][]; area: number }) => void;

export default class Editor extends Application {
  underlay!: Underlay;
  divided = new DrawDivided();
  areas = new DrawLimit();
  sold = new DrawSold();
  transPoint?: DrawTransPoint;

  #limit?: GraphCollection;
  #divided?: GraphCollection;

  grid?: Grid;

  /** 回调函数，用于处理向外传递数据 */
  fn?: Fn;

  tools?: Tools;
  cursor?: Cursor;

  constructor(canvas: ICanvas, fn?: Fn) {
    super();
    this.fn = fn;
    this.#init(canvas);
  }

  async #init(canvas: ICanvas) {
    const resizeTo = canvas.parentNode! as HTMLElement;
    await this.init({
      canvas,
      resizeTo,
      background: '#85a5ff',
      resolution: window.devicePixelRatio || 1,
      antialias: true,
      autoDensity: true,
    });
    await Assets.load([
      { alias: 'background', src: mapBg },
      { alias: 'locationSvg', src: locationSvg },
    ]);

    this.grid = new Grid(this);
    this.cursor = new Cursor(this);
    this.underlay = new Underlay(this);
    this.transPoint = new DrawTransPoint();

    // 背景底图
    this.underlay.view.addChild(
      this.areas.view,
      this.divided.view,

      this.areas.box,
      this.sold.view,
      this.transPoint.view,
    );
    this.stage.addChild(this.underlay.view);

    // 创建工具实例
    this.tools = new Tools(this);
  }

  /** 点击工具条 */
  clickTools(type: ToolsType) {
    switch (type) {
      case 'zoomIn':
        this.underlay?.zoom('in');
        break;
      case 'zoomOut':
        this.underlay?.zoom('out');
        break;
      case 'click-select':
      case 'rect':
      case 'eraser':
      case 'move':
        this.tools?.setActive(type);
        break;

      case 'focus-mode':
        this.underlay.adapt();
        break;
      case 'refresh':
      default:
        this.areas.box.removeChildren();
        this.fn?.(this.areas.serializer());
    }
  }

  /** 控制显示场景配置 */
  clickScene(type: Record<SceneType, boolean>) {
    const [key, value] = Object.entries(type)[0];

    switch (key) {
      case 'grid':
        this.showPixelGrid(value);
        break;

      default:
    }
  }

  /** 开启并显示网格 */
  private showPixelGrid(show: boolean) {
    // 如果显示网格，调整缩放及显示位置
    if (show) {
      // 放大地图到4倍
      const currZoom = this.underlay.view.scale.x;
      if (currZoom < 4) {
        this.underlay.zoom(4);
        // 移动到选中模块到窗口正中间
        this.underlay.move(getCenter(this.areas.view));
      }
    }
    // 显示网格
    this.grid?.showAble(show);
  }

  private checked?: PlanStatus['checked'];

  /** 准备画布初始数据 */
  draw({ area, divided }: Options) {
    this.clear();

    this.areas.draw(area);
    this.divided.draw(divided, COLOR.divided);

    this.#limit = area;
    this.#divided = divided;

    if (this.checked) this.divided.active(this.checked.id);
  }

  /** 绘制已出售土地 */
  drawSold(graph: GraphCollection) {
    this.sold.clear();
    this.sold.draw(graph, '#f5222d');
  }

  /** 恢复画布操作 */
  restore() {
    this.tools?.setActive('select');
  }

  /** 适应画布 */
  adapt() {
    this.underlay.adapt();
  }

  /** 清空画布 */
  clear() {
    this.areas.box.removeChildren();
    this.areas.view.removeChildren();
    this.divided.view.removeChildren();
    this.transPoint?.clear();
  }

  /** 切换 Tab 及项目、地块更新地图展示与操作 */
  implement(opt: PlanStatus) {
    const { editable, checked, selected } = opt;

    // 清空
    this.clear();

    // 绘制地图中可划分的区域
    this.areas.draw(this.#limit!);

    if (editable) {
      if (selected?.coordinates) {
        // 编辑时先绘制出之前已经划分的地区
        const { id, coordinates, label } = selected;

        // 绘制其它已经划分的项目区域
        const divided = new Map([...this.#divided!]);
        divided.delete(id);
        // 绘制其它已划分项目选择的区域
        this.divided.draw(divided, COLOR.divided);

        // 绘制当前已经划分的地区
        const g = drawGraph(
          { id, coordinates, label },
          { style: COLOR.current, eventMode: 'static' },
        );
        this.areas?.box.addChild(g);
      } else {
        // 新增直接全部渲染
        this.divided.draw(this.#divided!, COLOR.divided);
      }

      if (selected?.transPoint) this.transPoint?.draw(selected.transPoint);
    } else {
      this.divided.draw(this.#divided!, COLOR.divided);

      // 如果有选中项则高亮选中项
      if (checked) {
        this.checked = checked;
        this.divided.active(checked.id);

        if (checked.transPoint) this.transPoint?.draw(checked.transPoint);
      }
    }
  }
}
