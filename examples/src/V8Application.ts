import { Application, Container } from 'dill-pixel';

export class Actor extends Container {
  initialize() {
    this.add.graphics().circle(0, 0, 50).fill('white');
  }
}

export class V8Application extends Application {
  protected setup(): void {
    const actor = this.stage.addChild(new Actor()) as Actor;
    actor.animate({ x: 600, y: 200, angle: 40, yoyo: true, repeat: -1, duration: 2, ease: 'bounce' });
  }
}
