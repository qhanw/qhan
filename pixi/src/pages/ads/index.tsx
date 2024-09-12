import { useEffect, useRef } from 'react';
import { FloatButton, Tooltip } from 'antd';
import type { ICanvas } from 'pixi.js';

import Editor, { toMap } from './map/editor';
import { data } from './data';

import styles from './styles.module.scss';

export default function Ads() {
  const ref = useRef<ICanvas>(null);
  const refEditor = useRef<Editor | null>();

  useEffect(() => {
    if (ref.current && !refEditor.current) {
      refEditor.current = new Editor(ref.current, { onClickPos: console.log });

      refEditor.current?.ads?.draw(toMap(data));
    }
  }, []);


  return (
    <div className={`relative w-vw h-vh ${styles['lands-map']}`}>
      <canvas ref={ref as any} />
      <FloatButton.Group
        shape="square"
        className={`absolute top-4 right-4 opacity-85 bottom-initial ${styles['lands-tools']}`}
      >
        <Tooltip title="复位" placement="left">
          <FloatButton
            icon={<span className="i-land:focus-mode" />}
            onClick={() => refEditor.current?.adapt()}
          />
        </Tooltip>
      </FloatButton.Group>
    </div>
  );
}
