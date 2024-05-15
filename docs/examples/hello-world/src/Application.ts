import { MyScreen } from './state/MyScreen';
import { LoadScreen } from './state/LoadScreen';
import { Application as DillPixelApplication } from '@relish-studios/dill-pixel';

export class Application extends DillPixelApplication {
  public get defaultState() {
    return MyScreen.NAME;
  }

  protected setup() {
    (globalThis as any).__PIXI_APP__ = this;
    this.registerDefaultLoadScreen(LoadScreen);
  }  

  protected registerStates(): void {
    this.state.register(MyScreen);
  }
}
