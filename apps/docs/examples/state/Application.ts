import { Application as DillPixelApplication, TransitionType } from 'dill-pixel';

// Load all of the game states

import { TitleScreen } from './state/LoadScreen';
import { GameScreen } from './state/GameScreen';
import { GameOverScreen } from './state/GameOverScreen';

export class Application extends DillPixelApplication {

  ...

  // Register the states

  protected registerStates(): void {
    this.state.register(TitleScreen);
    this.state.register(GameScreen);
    this.state.register(GameOverScreen);
  }
}