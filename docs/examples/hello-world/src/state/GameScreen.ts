import { IPoint, State } from '@relish-studios/dill-pixel';
import { Sprite, Text } from 'pixi.js';
import { Application } from '../Application';

export class GameScreen extends State<Application> {
  static NAME: string = 'GameScreen';
  protected _bg: Sprite;
  protected _title: Text;

  public constructor() {
    super();
  }

  public init(pSize: IPoint) {
    super.init(pSize);

    this._bg = this.add.coloredSprite(0xaa5566);
    this._bg.eventMode = 'static';

    this._title = this.add.text({
      value: 'Welcome to the game!',
      style: {
        fontFamily: 'sans-serif',
        fontSize: 36,
        fill: 'white',
      },
      anchor: 0.5,
    });

    this.onResize(pSize);
  }

  public async animateIn(pOnComplete: () => void): Promise<void> {
    pOnComplete();
  }

  public async animateOut(pOnComplete: () => void): Promise<void> {
    pOnComplete();
  }

  public onResize(pSize: IPoint) {
    super.onResize(pSize);
    if (this._bg) {
      this._bg.width = this._size.x;
      this._bg.height = this._size.y;
    }
  }

  public destroy() {
    super.destroy();
  }
}
