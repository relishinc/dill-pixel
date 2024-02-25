import { Scene } from 'dill-pixel';
import { Actor } from '../V8Application';

export class TestScene extends Scene {
  public readonly id: string = 'TestScene';

  constructor() {
    super();
  }

  public destroy(): void {}

  enter(): Promise<void> {
    return Promise.resolve();
  }

  start() {
    const actor = this.add.existing<Actor>(new Actor()) as Actor;
  }

  public initialize(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
