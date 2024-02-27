import { Application, Container, Focusable, Interactive } from 'dill-pixel';

const _Actor = Focusable(Interactive(Container));

export class Actor extends _Actor {
  _paused: boolean = false;

  constructor(private color: number = 0xffffff) {
    super();
  }

  onAdded() {
    this.eventMode = 'static';
    this.add.graphics().circle(0, 0, 50).fill(this.color);
  }
}

export class V8Application extends Application {
  protected setup(): void {}
}
