import { Scene } from 'dill-pixel';
import { Actor } from '../V8Application';

export class TestScene extends Scene {
  public readonly id: string = 'TestScene';

  constructor() {
    super();
  }

  public destroy(): void {}

  public enter(): Promise<void> {
    return Promise.resolve();
  }

  public start() {
    const actor = this.add.existing<Actor>(new Actor()) as Actor;
    this.app.keyboard.onKeyUp('a').connect((detail) => {
      actor.tint = Math.random() * 0xffffff;
    });
  }
}
