import type { ITool } from './typings';
import type Editor from '../editor';

const TYPE = 'select';

export class Select implements ITool {
  static readonly type = TYPE;
  readonly type = TYPE;

  constructor(private editor: Editor) {}
  onActive() {
    console.log('select active');
  }
  onInactive() {
    console.log('select inactive');
  }

  onStart() {}
  onMove() {}
  onEnd() {
    console.log(this.editor);
  }
}
