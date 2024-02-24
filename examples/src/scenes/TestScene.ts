import { Scene } from 'dill-pixel';
import { Actor } from '../V8Application';

export class TestScene extends Scene {
  public readonly id: string = 'TestScene';

  constructor() {
    super();
  }

  public destroy(): void {}

  public initialize(): Promise<void> {
    return Promise.resolve(undefined);
  }

  enter(): Promise<void> {
    return Promise.resolve();
  }

  start() {
    const actor = this.addChild(new Actor()) as Actor;
    actor.animate({ x: 600, y: 200, angle: 40, yoyo: true, repeat: -1, duration: 2, ease: 'expo.out' });
  }
}
