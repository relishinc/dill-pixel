import { Application } from 'dill-pixel';
import { Assets } from 'pixi.js';

export class V8Application extends Application {
  protected async setup() {
    await Assets.loadBundle(['required', 'game']);
  }

  public customFunction(): void {
    console.log('V8App custom function');
  }
}
