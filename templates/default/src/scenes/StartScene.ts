import { Scene } from 'dill-pixel';

export class StartScene extends Scene {
  public readonly id = 'StartScene';

  constructor() {
    super();
    this.alpha = 0;
  }

  initialize() {
    this.add.graphics().rect(0, 0, this.app.screen.width, this.app.screen.height).fill({ color: 0x0 });
    this.add.text({ text: 'Start Scene', x: 100, y: 100, style: { fill: 0xffffff } });
  }

  enter() {
    this.animateTo({ alpha: 1, duration: 1, ease: 'sine.out' });
  }

  exit() {
    this.animateTo({ alpha: 0, duration: 0.5, ease: 'sine.in' });
  }

  start() {}
}
