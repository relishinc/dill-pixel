import { FlexContainer } from 'dill-pixel';
import { Point, Sprite, Text } from 'pixi.js';
import { BaseState } from './BaseState';

// The title screen is a green background with a centered title

export class TitleScreen extends BaseState {
  static NAME: string = 'TitleScreen';
  protected _bg: Sprite;
  protected _layout: FlexContainer;
  protected _title: Text;

  public constructor() {
    super();
  } 

  // Create the elements

  public init(pSize: Point) {
    super.init(pSize);

    // Create the green background

    this._bg = this.add.coloredSprite(0x33aa66);
    this._bg.eventMode = 'static';

    // Use a flex container for the layout

    this._layout = this.add.flexContainer({
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    });

    // Add the title text

    this._title = this._layout.add.text({
      value: 'Welcome to my game!',
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

  // Clean up

  public destroy() {
    super.destroy();
  }
}
