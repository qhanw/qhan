import { useEffect, useMemo, useRef } from 'react';
import { FloatButton, Tooltip } from 'antd';

import clsx from 'clsx';

import type { ICanvas } from 'pixi.js';

import { ProviderLands, useLandsContext } from './context';

import type { ToolsType, SceneType } from './map/editor';
import Editor from './map/editor';
import { STAGE_LIMIT } from './map/config';

// import { AREA, SELECTED } from './data';

import { proj, sold as soldList } from './d';

import ToggleFloatButton from './ToggleFloatButton';

import { toMap } from './utils';

import styles from './styles.module.scss';

// NOTE: 已生成项目地图 Polygon 数据集 ，同时过滤掉已结束状态的数据
function LandsBase() {
  const ref = useRef<ICanvas>(null);
  const refEditor = useRef<Editor | null>();

  const { tool, setTool } = useLandsContext();

  const { sold, projects } = useMemo(() => {
    return {
      projects: proj.map((c: any) => ({ ...c, label: c.projectName })) as any,
      sold: soldList.map((c: any) => ({ ...c, label: c.name })) as any,
    };
  }, []);

  useEffect(() => {
    refEditor.current?.drawSold(toMap(sold));
  }, [sold]);

  // 左侧地图交互处理
  useEffect(() => {
    refEditor.current?.draw({ area: new Map([...STAGE_LIMIT]), divided: toMap(projects) });
  }, [projects]);

  // ==============================================================================

  //  地图方面交互
  useEffect(() => {
    if (ref.current && !refEditor.current) {
      refEditor.current = new Editor(ref.current, (v) => {
        console.log(v);
      });
    }
  }, []);

  const onClickTool = (type: ToolsType) => {
    refEditor.current?.clickTools(type);
    setTool(['click-select', 'rect', 'move', 'eraser'].includes(type) ? type : undefined);
  };

  const onClickScene = (type: Record<SceneType, boolean>) => {
    refEditor.current?.clickScene(type);
  };

  // -- TAB Switch and data update------------

  return (
    <div className={`relative w-full h-vh ${styles['lands-map']}`}>
      <canvas ref={ref as any} />
      <FloatButton.Group
        shape="square"
        className={`absolute top-4 right-4 opacity-85 bottom-initial ${styles['lands-tools']}`}
      >
        <Tooltip title="放大" placement="left">
          <FloatButton
            icon={<span className="i-land:zoom-in" />}
            onClick={() => onClickTool('zoomIn')}
          />
        </Tooltip>
        <Tooltip title="缩小" placement="left">
          <FloatButton
            icon={<span className="i-land:zoom-out" />}
            onClick={() => onClickTool('zoomOut')}
          />
        </Tooltip>
        <Tooltip title="点选" placement="left">
          <FloatButton
            icon={<span className="i-land:click-select" />}
            className={clsx({ active: tool === 'click-select' })}
            onClick={() => onClickTool('click-select')}
          />
        </Tooltip>
        <Tooltip title="框选" placement="left">
          <FloatButton
            icon={<span className="i-land:rect" />}
            className={clsx({ active: tool === 'rect' })}
            onClick={() => onClickTool('rect')}
          />
        </Tooltip>
        <Tooltip title="擦除" placement="left">
          <FloatButton
            icon={<span className="i-land:eraser" />}
            className={clsx({ active: tool === 'eraser' })}
            onClick={() => onClickTool('eraser')}
          />
        </Tooltip>
        <Tooltip title="清除" placement="left">
          <FloatButton
            icon={<span className="i-land:refresh" />}
            onClick={() => onClickTool('refresh')}
          />
        </Tooltip>
        <Tooltip title="拖动" placement="left">
          <FloatButton
            icon={<span className="i-land:move" />}
            onClick={() => onClickTool('move')}
            className={clsx({ active: tool === 'move' })}
          />
        </Tooltip>

        <ToggleFloatButton
          icon={<span className="i-land:grid" />}
          // disabled={!!editable}
          onClick={(bool) => onClickScene({ grid: bool })}
          tooltip={{ title: '网格', placement: 'left' }}
        />

        <Tooltip title="复位" placement="left">
          <FloatButton
            icon={<span className="i-land:focus-mode" />}
            onClick={() => onClickTool('focus-mode')}
          />
        </Tooltip>
      </FloatButton.Group>
    </div>
  );
}

export default function Lands() {
  return (
    <ProviderLands>
      <LandsBase />
    </ProviderLands>
  );
}
