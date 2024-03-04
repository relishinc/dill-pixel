import { Logger, Scene } from 'dill-pixel';
import { Ticker } from 'pixi.js';

export class AudioScene extends Scene {
  constructor() {
    super();
    this.alpha = 0;
    this.app.stage.eventMode = 'static';
  }

  public async initialize() {
    this.add.graphics({ x: 0, y: 0 }).rect(0, 0, this.app.screen.width, this.app.screen.height).fill({
      color: 0x00ff00,
      alpha: 0.5,
    });
  }

  async start() {
    const sound = await this.app.audio.play('horizon.mp3', 'sfx', { loop: true });
    Logger.log(sound);
  }

  update(ticker: Ticker) {}

  resize() {}

  async enter() {
    return this.animate({ alpha: 1, duration: 0.6, ease: 'sine.out' });
  }

  async exit() {
    return this.animate({ alpha: 0, duration: 0.4, ease: 'sine.in' });
  }
}
