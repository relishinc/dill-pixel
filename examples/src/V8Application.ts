import { Application, Container, Interactive } from 'dill-pixel';
import { FederatedEvent } from 'pixi.js';

const _Actor = Interactive(Container, ['pointerdown']);

export class Actor extends _Actor {
  _paused: boolean = false;

  constructor() {
    super();
  }

  onAdded() {
    this.eventMode = 'static';
    this.add.graphics().circle(0, 0, 50).fill('white');
    this.animate({ x: 600, y: 200, angle: 40, yoyo: true, repeat: -1, duration: 2, ease: 'expo.out' });
    this.onPointerDown.connect(this._onPointerDown);
  }

  _onPointerDown(e: FederatedEvent) {
    this._paused = !this._paused;
    if (this._paused) {
      this.pauseAnimations();
    } else {
      this.resumeAnimations();
    }
  }
}

export class V8Application extends Application {
  protected setup(): void {}
}
