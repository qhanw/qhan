export type IToolBase = {
  onActive: () => void;
  onInactive: () => void;
  onStart: () => void;
  onMove: () => void;
  onEnd: () => void;
};

export interface ITool extends IToolBase {
  type: string;
}

export interface IToolClassConstructor {
  new (editor: Editor): ITool;
  type: string;
}
