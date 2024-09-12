import { Container, Graphics, Point, Text } from 'pixi.js';
import { OFFSET_X, OFFSET_Y } from './options';

import type Editor from './editor';

import type { AdsMapData } from './typings';

export class DrawAdsSpace {
  view = new Container({ label: 'marker' });
  ads: AdsMapData = new Map();

  constructor(private editor: Editor) {
    this.view.eventMode = 'static';
    this.view
      .on('pointerover', (event) => {
        const aim = event.target;
        if (aim instanceof Container) {
          aim.scale = 1.2;
          aim.alpha = 1;
        }
      })
      .on('pointerout', (event) => {
        const aim = event.target;
        if (aim instanceof Container) {
          aim.scale = 1;
        }
      })
      .on('pointerup', (event) => {
        const aim = event.target;
        if (aim instanceof Container) {
          const ad = this.ads.get(aim.label)?.[0];

          // TODO: 如果当前坐标范围存在多个广告位，则显示其余广告否则定位到当前广告位列表
          if (ad?.position) {
            this.editor.fn(ad.id);

            this.editor.underlay.setCenter(ad.position[0], ad.position[1]);
            this.updateAlpha(aim);
          }
        }
      });
  }

  draw = async (ads: AdsMapData) => {
    if (ads.size <= 0) return;
    this.ads = ads;
    // 绘制前先清空画布
    this.clear();
    // 正式代码
    const markers = [...ads].map(([k, c]) => {
      // 是否为同一位置多个广告
      const { id, position } = c[0];
      const len = c.length;
      const text = len > 1 ? len : id;

      const [x, y] = position;
      // 以原点平移到第一象限，即在 x、y 上加上偏移值
      // 因 y 轴为翻转后，固而 y 轴的 偏移计算方式为偏移值减 y 坐标
      // 完整推导为 3000 -(y + OFFSET_Y) 最终为  OFFSET_Y - y
      const pos = new Point(x + OFFSET_X, OFFSET_Y - y);

      const box = new Container({ position: pos, label: k });
      const bgc = new Graphics().circle(0, 0, 12).fill(len > 1 ? '#9254de' : '#ff4d4f');
      const num = new Text({ text, style: { fontSize: 12, fill: '#fff' }, anchor: 0.5 });

      box.addChild(bgc, num);

      box.eventMode = 'static';
      box.cursor = 'pointer';

      // box
      //   .on('pointerenter', () => {
      //     console.log(box);
      //     box.scale = 1.2;
      //   })
      //   .on('pointerleave', () => {
      //     box.scale = 1;
      //   })
      //   .on('pointerup', () => {
      //     onClickAds?.(c.id);
      //     underlay.setCenter(c.position[0], c.position[1]);
      //   });

      return box;
    });

    this.view.addChild(...markers);
  };

  // 更新图层样式状态
  updateAlpha(aim: Container) {
    this.view.children.map((c) => {
      c.alpha = c !== aim ? 0.65 : 1;
      c.zIndex = c !== aim ? -1 : 1;
    });
  }
  clear = () => this.view.removeChildren();
}
