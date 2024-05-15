import { IPoint, State } from '@relish-studios/dill-pixel';
import { Sprite, Text } from 'pixi.js';
import { Application } from '../Application';

export class MyScreen extends State<Application> {
  public static NAME: string = 'MyScreen';

  protected _bg!: Sprite;
  protected _title!: Text;

  public init(pSize: IPoint) {
    super.init(pSize);

    this._bg = this.add.coloredSprite(0x33aa66);
    this._bg.eventMode = 'static';

    this._title = this.add.text({
      value: 'Hello world!',
      style: {
        fontFamily: 'sans-serif',
        fontSize: 36,
        fill: 'white',
      },
      anchor: 0.5,
    });

    this.onResize(pSize);
  }

  public onResize(pSize: IPoint) {
    super.onResize(pSize);
    if (this._bg) {
      this._bg.width = this._size.x;
      this._bg.height = this._size.y;
    }
  }
}
