import { Application as DillPixelApplication, TransitionType } from 'dill-pixel';

// Load all of the game states

import { LoadScreen } from './state/LoadScreen';
import { IntroScreen } from './state/IntroScreen';
import { GameScreen } from './state/GameScreen';

export class Application extends DillPixelApplication {

  // Register the load screen and define the transition type between states

  protected setup() {
    (globalThis as any).__PIXI_APP__ = this;
    this.registerDefaultLoadScreen(LoadScreen);
    this.state.defaultTransitionType = TransitionType.TRANSITION_SIMPLE_INTERSTITIAL;    
  }  

  // Register the states

  protected registerStates(): void {
    this.state.register(IntroScreen);
    this.state.register(GameScreen);
  }
}
