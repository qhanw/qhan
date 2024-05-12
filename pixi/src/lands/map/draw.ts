import { Container, Graphics } from "pixi.js";
import type { FillStyleInputs, FederatedPointerEvent } from "pixi.js";
import { OFFSET_X, OFFSET_Y } from "./options";

export class DrawGraphics {
  view: Container;

  constructor(options: { points: number[][][]; style: FillStyleInputs }) {
    this.view = new Container();

    // TODO: 用遮罩方式解决事件在不可操作层获取可交互事件问题
    this.view.eventMode = "static";

    this.#draw(options.points, options.style);
  }

  #draw = async (points: number[][][], style: FillStyleInputs) => {
    // 正式代码
    const graphics = points.map((c) => {
      // 以原点平移到第一象限，即在 x、y 上加上偏移值
      // 因 y 轴为翻转后，固而 y 轴的 偏移计算方式为偏移值减 y 坐标
      // 完整推导为 3000 -(y + OFFSET_Y) 最终为  OFFSET_Y - y
      const p = c.map(([x, y]) => [x + OFFSET_X, OFFSET_Y - y]).flat(1);

      return new Graphics().poly(p).fill(style);
    });

    this.view.addChild(...graphics);
  };
}

export class DrawLimit extends DrawGraphics {
  // 绘制图层容器
  box: Container;
  #underlay: Container;
  constructor(options: {
    points: number[][][];
    style: FillStyleInputs;
    underlay: Container;
  }) {
    super(options);
    this.box = new Container();
    this.#underlay = options.underlay;
  }

  set clickSelect(bool: boolean) {
    if (bool) {
      this.view.eventMode = "static";
      this.view
        .on("pointerdown", this.#create.bind(this))
        .on("pointermove", this.#updateCursor.bind(this));

      // 添加绘制图形区域图形操作
      this.box.eventMode = "static";
      this.box
        .on("pointerdown", this.#remove.bind(this))
        .on("pointermove", this.#updateCursor.bind(this));
    } else {
      this.view.eventMode = "auto";
      this.view
        .off("pointerdown", this.#create)
        .off("pointermove", this.#updateCursor);

      this.box.eventMode = "auto";
      this.box
        .off("pointerdown", this.#remove)
        .off("pointermove", this.#updateCursor);
    }
  }

  #create(event: FederatedPointerEvent) {
    event.stopPropagation();

    const { x, y } = this.box.toLocal(event.global);

    const g = new Graphics().rect(0, 0, 1, 1).fill("#4096ff");
    g.position.set(Math.round(x), Math.round(y));
    g.eventMode = "static";

    // 添加到可选择区域
    // 先判断当前区域相同位置是否存在已选择数据，如果的则不加入
    const isExist = this.box.children.some(
      (c) => c.position.x === Math.round(x) && c.position.y === Math.round(y)
    );

    if (!isExist) this.box.addChild(g);
  }

  #updateCursor(e: FederatedPointerEvent) {
    const size = this.#underlay.scale.x;
    const defaultIcon = `url("data:image/svg+xml;utf8,%3Csvg width='${size}px' height='${size}' viewBox='0 0 1 1' xmlns='http://www.w3.org/2000/svg' fill='%23ff0000'%3E%3Crect height='1' width='1'/%3E%3C/svg%3E"),auto`;
    e.target.cursor = defaultIcon;
  }

  #remove(event: FederatedPointerEvent) {
    event.stopPropagation();
    if (event.target instanceof Graphics) {
      this.box.removeChild(event.target);
    }
  }

  serializer() {
    // {
    //   x,
    //   y,
    //   width,
    //   height,
    //   rotation,
    //   localColor,
    //   scaleX: scale.x,
    //   scaleY: scale.y,
    //   // xx: rest.
    // }
    return this.box.children.map(({ x, y, width, height }) => {
      return [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height],
      ].map(([m, n]) => [m - OFFSET_X, OFFSET_Y - n]);
    });
  }

  deserializer(data: any[]) {
    this.box.removeChildren();

    data.map((c) => {
      const rect = new Graphics();

      rect.width = c.width;
      rect.height = c.height;
      rect.rotation = c.rotation;
      rect.scale.set(c.scaleX, c.scaleY);
      this.box.addChild(rect);

      return rect;
    });
  }
}
