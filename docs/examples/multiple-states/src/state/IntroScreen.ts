import { IPoint, State, FlexContainer } from '@relish-studios/dill-pixel';
import { Sprite, Text } from 'pixi.js';
import { Application } from '../Application';

export class IntroScreen extends State<Application> {
  public static NAME: string = 'IntroScreen';

  protected _bg: Sprite;
  protected _layout: FlexContainer;
  protected _title: Text;

  public constructor() {
    super();
  }

  public init(pSize: IPoint) {
    super.init(pSize);

    this._bg = this.add.coloredSprite(0x33aa66);
    this._bg.eventMode = 'static';

    this._layout = this.add.flexContainer({
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    });

    this._title = this._layout.add.text({
      value: 'Click me to start',
      style: {
        fontFamily: 'sans-serif',
        fontSize: 36,
        fill: 'white',
      },
      anchor: 0.5,
    });

    this._title.eventMode = 'static';
    this._title.cursor = 'pointer';

    this._title.on('pointerdown', () => {
      this.app.state.transitionTo('GameScreen');
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
