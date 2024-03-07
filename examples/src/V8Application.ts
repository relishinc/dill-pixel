import { Application } from 'dill-pixel';
import { Assets } from 'pixi.js';

export class V8Application extends Application {
  setup() {
    return Assets.loadBundle(['required', 'game']);
  }

  customFunction() {
    console.log('V8App custom function');
  }
}
