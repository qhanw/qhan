import { Container, GraphicsPath, buildGeometryFromPath, Mesh, Polygon, Texture } from 'pixi.js';
import type { FillInput, EventMode, ColorSource } from 'pixi.js';

import { combinedVertices } from './utils/clipper';

import { OFFSET_X, OFFSET_Y } from './config';

import type { GraphCollection, Graph, PointTuple } from './typings';

type DrawOptions = { graphs: GraphCollection; style: FillInput };

export function drawGraph(
  graph: Graph,
  { style, eventMode }: { style?: FillInput; eventMode?: EventMode },
) {
  // 以原点平移到第一象限，即在 x、y 上加上偏移值
  // 因 y 轴为翻转后，固而 y 轴的 偏移计算方式为偏移值减 y 坐标
  // 完整推导为 3000 -(y + OFFSET_Y) 最终为  OFFSET_Y - y
  const p = graph.coordinates.map(([x, y]) => [x + OFFSET_X, OFFSET_Y - y]).flat(1);

  const g = new Mesh({
    geometry: buildGeometryFromPath(new GraphicsPath().poly(p)),
    texture: Texture.WHITE,
    hitArea: new Polygon(p),
    label: graph.id,
    tint: (style as ColorSource) || '#000',
    alpha: style ? 0.85 : 0.45,
  });

  if (eventMode) g.eventMode = eventMode;

  // console.log(graph.label)

  // const tt = new Text({ text: graph.label, style: { fill: '#fff' } });

  // tt.anchor = 0.5;
  // tt.zIndex = 10010;

  // g.addChild(tt);

  return g;
}

class DrawGraphics {
  readonly view = new Container();

  constructor(options?: DrawOptions) {
    if (options) this.draw(options.graphs, options.style);
  }

  draw(graphs: GraphCollection, style?: FillInput) {
    if (!graphs.size) return;
    // 正式代码
    const graphics = [...graphs]?.map(([_, c]) => drawGraph(c, { style }));

    this.view.addChild(...graphics);
  }
}
/** 绘制已规划的地块 */
export class DrawDivided extends DrawGraphics {
  constructor(options?: DrawOptions) {
    super(options);
  }

  drawText() {}

  /** 选中元素 */
  active(id: string) {
    const g = this.view.children.find((c) => c.label === id);

    if (g) g.tint = '#1677ff';
  }
}

/** 绘制可规划土地的范围 */
export class DrawLimit extends DrawGraphics {
  // 绘制图层容器
  readonly box = new Container();

  constructor(options?: DrawOptions) {
    super(options);
  }

  serializer() {
    // init(
    //   [100, 50, 10, 79, 65, 2, 65, 98, 10, 21],
    //   [98, 63, 4, 68, 77, 8, 52, 100, 19, 12],
    //   // [2328, 2249, 2329, 2249, 2329, 2250, 2328, 2250],
    //   // [2329, 2249, 2330, 2249, 2330, 2250, 2329, 2250],
    // );

    const meshGeoList = this.box.children.reduce((prev, curr) => {
      if (curr instanceof Mesh) {
        prev.push([...curr.geometry.positions]);
      }
      return prev;
    }, [] as number[][]);

    if (!meshGeoList?.length) {
      return { vertices: [], area: 0, isFit: false };
    }

    const { vertices: cv, area } = combinedVertices([meshGeoList[0]], meshGeoList.slice(1));

    const vertices = cv.map((c) => c.map(({ X, Y }) => [X - OFFSET_X, OFFSET_Y - Y] as PointTuple));

    // 计算高宽是否满足大于等于8
    const { width, height } = new Mesh({
      geometry: buildGeometryFromPath(new GraphicsPath().poly(vertices.flat(2))),
    }).getBounds();

    return { vertices, area, isFit: width >= 8 && height >= 8 };
  }
}

/** 绘制已售土地 */
export class DrawSold extends DrawGraphics {
  constructor(options?: DrawOptions) {
    super(options);
  }

  clear = () => this.view.removeChildren();
}
