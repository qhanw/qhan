import {
  Graphics,
  Point,
  GraphicsPath,
  Mesh,
  Polygon,
  Texture,
  Text,
  buildGeometryFromPath,
} from 'pixi.js';
import type { Container, MeshOptions, EventMode } from 'pixi.js';

import { union, difference, getArea, orientation } from '../utils/clipper';
import type Editor from '../editor';

/** 绘制矩形图形
 * @description 绘制框选与擦除框选完成后重新绘制新的图形
 */
export class DrawRect {
  private readonly box: Container;
  private readonly divided: Container;
  private readonly sold: Container;

  constructor(
    private readonly editor: Editor,
    readonly options?: MeshOptions,
  ) {
    const { areas, divided, sold } = this.editor;

    this.box = areas.box;
    this.divided = divided.view;
    this.sold = sold.view;
  }

  diff() {}

  draw(path: number[], type: 'add' | 'sub' = 'add', eventMode?: EventMode) {
    let subj: number[][] = [];
    let clip: number[][] = [];

    const current = this.box.children.reduce((prev, curr) => {
      if (curr instanceof Mesh) prev.push([...curr.geometry.positions]);
      return prev;
    }, [] as number[][]);

    // 新增功能图形路径计算
    if (type === 'add') {
      const combine = union(current, [path]);
      // 如果当前编辑的图形合并成环，则取消此次绘制
      const noHole = combine.every((c) => orientation(c));
      if (!noHole) return;

      subj = combine.map((c) => c.map(({ X, Y }) => [X, Y]).flat(1));

      // 与已规划好的图形做减法运算
      clip = [...this.divided.children, ...this.sold.children].reduce((prev, curr) => {
        if (curr instanceof Mesh) prev.push(curr.geometry.positions);
        return prev;
      }, [] as number[][]);
    }

    // 擦除功能图形路径计算
    if (type === 'sub') {
      subj = current;
      clip = [path];
    }

    const diff = difference(subj, clip);

    // 如果当前编辑的图形合并成环，则取消此次绘制
    const diffNoHole = diff.every((c) => orientation(c));
    if (!diffNoHole) return;

    // 清理画布
    this.box.removeChildren();

    // 绘制最终结果
    diff.forEach((c) => {
      const g = new Mesh({
        geometry: buildGeometryFromPath(
          new GraphicsPath().poly(c.map(({ X, Y }) => [X, Y]).flat(1)),
        ),
        tint: 0x4096ff,
        texture: Texture.WHITE,
        hitArea: new Polygon(path),
        alpha: 0.85,
        eventMode: eventMode ?? 'passive',
      });
      this.box.addChild(g);
    });
  }
}

class BaseTempRect {
  view: Container;
  p1: Point;
  p2: Point;
  #rect: Graphics;

  constructor(layer: Container, startPoint: Point) {
    this.view = layer;
    this.p1 = startPoint;
    this.p2 = startPoint;
    this.#rect = new Graphics();

    this.view.addChild(this.#rect);
  }

  getRect() {
    const { x: x1, y: y1 } = this.p1;
    const { x: x2, y: y2 } = this.p2;

    // const x = [Math.floor(x1), Math.ceil(x2)]
    // const y = [Math.floor(y1), Math.ceil(y2)]

    const x = [x1, x2];
    const y = [y1, y2];

    const minX = Math.min(...x);
    const minY = Math.min(...y);

    const maxX = Math.max(...x);
    const maxY = Math.max(...y);

    return { tl: new Point(minX, minY), br: new Point(maxX, maxY) };
  }

  drawRect() {
    const rect = this.getRect();

    this.#rect.clear();
    this.#rect
      .rect(rect.tl.x, rect.tl.y, rect.br.x - rect.tl.x, rect.br.y - rect.tl.y)
      .fill({ color: '#8888ff80' });
  }

  move(point: Point) {
    this.p2 = point;
    this.drawRect();
  }

  getGeometryPositions() {
    const rect = this.getRect();

    // 获取图形坐标，左边向下取整，右边向上取整
    const x = Math.floor(rect.tl.x);
    const y = Math.floor(rect.tl.y);

    const w = Math.ceil(rect.br.x) - x;
    const h = Math.ceil(rect.br.y) - y;

    return [x, y, x + w, y, x + w, y + h, x, y + h];
  }

  end() {
    this.view.removeChild(this.#rect);
  }
}

/** 临时矩形图形
 * @description 用于规划项目与地块时框选土地
 */
export class TempRect extends BaseTempRect {
  #text: Text;

  constructor(
    private editor: Editor,
    layer: Container,
    startPoint: Point,
  ) {
    super(layer, startPoint);

    this.#text = new Text();
    this.editor.stage.addChild(this.#text);
  }

  private drawArea() {
    const positions = this.getGeometryPositions();

    this.#text.text = getArea([positions]);
    this.#text.style = { fill: '#fff', fontSize: 14 };
    this.#text.alpha = 0.85;

    const pos = this.editor.stage.toLocal(this.view.toGlobal(this.p2));

    this.#text.position.set(pos.x + 4, pos.y + 4);
  }
  move(point: Point) {
    super.move(point);
    this.drawArea();
  }

  end() {
    super.end();
    this.editor.stage.removeChild(this.#text);
  }
}

/** 裁剪矩形
 * @description 与 RectTemp 大部分功能相似， 用于擦除框选擦除功能
 */
export class CutRect extends BaseTempRect {}
