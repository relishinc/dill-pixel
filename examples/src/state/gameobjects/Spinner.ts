import { Container, Application } from 'dill-pixel';
import { Graphics } from 'pixi.js';

export class Spinner extends Container {

  protected _app: Application;
  public _mask: Graphics;
  protected _phase: number = 0;
  
  constructor(app: Application, { size, thickness, color } = { size: 40, thickness: 6, color: 'white' }) {
    super();
    this._app = app;;

    this._mask = this.add.graphics().beginFill(0xff0000).arc(0, 0, size/2, 0, Math.PI).endFill();
    const circle = this.add.graphics().lineStyle(thickness, color).drawCircle(-0, 0, size/2);

    circle.mask = this._mask;
  }

  // This is the update function that will be called every frame

  protected _update(delta: number) {
    this._phase += delta / 5;
    this._phase %= Math.PI * 2;

    this._mask.rotation = this._phase;
  }

  // Start the spinner

  public start() {
    this.visible = true;
    this._app.ticker.add(this._update);
  }

  // Stop the spinner

  public stop() {
    this._app.ticker.remove(this._update);
    this.visible = false;
  }

}
