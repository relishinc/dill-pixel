import { State } from 'dill-pixel';
import { Point, Sprite, Text } from 'pixi.js';
import { Application } from '../Application';

// This screen displays a green background with a white title

export class MyScreen extends State<Application> {
  static NAME: string = 'MyScreen';
  protected _bg!: Sprite;
  protected _title!: Text;

  // Create the background and add the title

  public init(pSize: Point) {
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

  // When the screen resizes, resize the background

  public onResize(pSize: Point) {
    super.onResize(pSize);
    if (this._bg) {
      this._bg.width = this._size.x;
      this._bg.height = this._size.y;
    }
  }
}
