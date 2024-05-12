import { useEffect, useRef } from "react";
import { FloatButton, Button, Card, Input } from "antd";

import type { ICanvas } from "pixi.js";

import Legend from "./components/Legend";

import Editor, { ToolsType } from "./map/editor";
import { AREA, SELECTED } from "./data";

export default function Lands() {
  const ref = useRef<ICanvas>(null);
  const refEditor = useRef<Editor>();

  useEffect(() => {
    if (ref.current && !refEditor.current) {
      refEditor.current = new Editor(ref.current, {
        area: AREA,
        divided: SELECTED,
      });
    }
  }, []);

  const onGetLands = () => {
    const poly = refEditor.current?.getDrawData();

    console.log(poly);
  };

  const onOptions = (type: ToolsType) => {
    console.log(refEditor.current);
    refEditor.current?.updateOptions(type);
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

      <div className="relative" style={{ height: "calc(100vh - 216px)" }}>
        <canvas ref={ref as any} />
        <FloatButton.Group
          shape="square"
          className="absolute top-4 right-4 opacity-85 bottom-initial"
        >
          <FloatButton
            icon={<span className="i-land:zoom-in" />}
            onClick={() => onOptions("zoomIn")}
          />
          <FloatButton
            icon={<span className="i-land:zoom-out" />}
            onClick={() => onOptions("zoomOut")}
          />
          <FloatButton
            icon={<span className="i-land:select" />}
            onClick={() => onOptions("select")}
          />
          <FloatButton
            icon={<span className="i-land:move" />}
            onClick={() => onOptions("move")}
          />
          {/* <FloatButton
            icon={<span className="i-land:shape" />}
            onClick={() => onOptions('shape')}
          /> */}
        </FloatButton.Group>
      </div>
    </Card>
  );
}
