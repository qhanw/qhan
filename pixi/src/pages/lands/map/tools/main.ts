import type Editor from '../editor';
import type { IToolClassConstructor, ITool } from './typings';

import { Rect } from './rect';
import { Select } from './select';
import { ClickSelect } from './click_select';
import { Eraser } from './eraser';
import { Move } from './move';

export class Tools {
  private toolMap = new Map<string, IToolClassConstructor>();
  private current?: ITool;

  constructor(private editor: Editor) {
    [Select, ClickSelect, Rect, Eraser, Move].forEach((c) => this.register(c));

    this.setActive(Select.type);
  }

  private register(tool: IToolClassConstructor) {
    if (!this.toolMap.has(tool.type)) {
      this.toolMap.set(tool.type, tool);
    }
  }

  //private bindEvent(){}

  getActiveName() {
    return this.current?.type;
  }

  setActive(name: string) {
    if (this.getActiveName() === name) return;

    const prev = this.current;
    const current = this.toolMap.get(name);

    if (!current) throw new Error(`tool "${name}" is not registered`);

    const currentTool = (this.current = new current(this.editor));
    if (prev) prev.onInactive();

    // this.setCursorWhenActive();

    currentTool.onActive();
    //  this.eventEmitter.emit('switchTool', currentTool.type);
  }
}
