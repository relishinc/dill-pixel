import { Application as DillPixelApplication, TransitionType } from '@relish-studios/dill-pixel';
import { GameScreen } from './state/GameScreen';
import { IntroScreen } from './state/IntroScreen';
import { LoadScreen } from './state/LoadScreen';

export class Application extends DillPixelApplication {
  public get defaultState() {
    return IntroScreen.NAME;
  }

  protected setup() {
    (globalThis as any).__PIXI_APP__ = this;
    this.registerDefaultLoadScreen(LoadScreen);
    this.state.defaultTransitionType = TransitionType.TRANSITION_SIMPLE_INTERSTITIAL;
  }

  protected registerStates(): void {
    this.state.register(IntroScreen);
    this.state.register(GameScreen);
  }
}
