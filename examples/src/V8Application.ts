import { Application, Container } from 'dill-pixel';

export class Actor extends Container {
  initialize() {
    this.add.graphics().circle(0, 0, 50).fill('white');
  }
}

export class V8Application extends Application {
  protected setup(): void {}
}
