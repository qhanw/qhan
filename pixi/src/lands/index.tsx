import { useCallback, useEffect, useRef, useState } from 'react';
import { FloatButton, Button, Card, Input } from 'antd';

import type { ICanvas } from 'pixi.js';

import Legend from './compponents/Legend';

import bootstrap, { Map, ToolsType } from './map/bootstrap';
import { AREA, SELECTED } from './data';

export default function Lands() {
  const ref = useRef<ICanvas>(null);

  const [app, setApp] = useState<Map>();

  const init = useCallback(async () => {
    if (ref.current) {
      const res = await bootstrap(ref.current, { area: AREA, selected: SELECTED });
      setApp(res);
    }
  }, [ref]);

  useEffect(() => {
    init();
  }, [init]);

  const onGetLands = () => {
    const poly = app?.getDrawData();

    console.log(poly);
  };

  const onOptions = (type: ToolsType) => {
    app?.updateOptions(type);
  };

  return (
    <Card bordered={false}>
      <div className="mb-4 flex justify-between gap-4 items-center">
        <div className="flex gap-4">
          <span>总地块：9999999</span>
          <span>已销售地块：9999</span>
        </div>
        <Input.Search
          className="w-60"
          onSearch={() => {}}
          placeholder="输入玩家名称、ID、土地名、坐标"
        />
        <Legend />
        <Button type="primary" onClick={onGetLands}>
          保存
        </Button>
      </div>

      <div className="relative" style={{ height: 'calc(100vh - 216px)' }}>
        <canvas ref={ref as any} />
        <FloatButton.Group
          shape="square"
          className="absolute top-4 right-4 opacity-85 bottom-initial"
        >
          <FloatButton
            icon={<span className="i-land:zoom-in" />}
            onClick={() => onOptions('zoomIn')}
          />
          <FloatButton
            icon={<span className="i-land:zoom-out" />}
            onClick={() => onOptions('zoomOut')}
          />
          <FloatButton
            icon={<span className="i-land:select" />}
            onClick={() => onOptions('select')}
          />
          <FloatButton icon={<span className="i-land:move" />} onClick={() => onOptions('move')} />
          {/* <FloatButton
            icon={<span className="i-land:shape" />}
            onClick={() => onOptions('shape')}
          /> */}
        </FloatButton.Group>
      </div>
    </Card>
  );
}
