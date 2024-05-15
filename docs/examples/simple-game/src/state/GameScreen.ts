import { IPoint, State, Container, FlexContainer } from 'dill-pixel';
import { Sprite, Text } from 'pixi.js';
import { Application } from '../Application';

export class GameScreen extends State<Application> {
  public static NAME: string = 'GameScreen';

  protected _bg: Sprite;
  protected _layout: FlexContainer;
  protected _title: Text;
  protected _button: Container;

  public constructor() {
    super();
  }

  public init(pSize: IPoint) {
    super.init(pSize);

    this._bg = this.add.coloredSprite(0xaa5566);
    this._bg.eventMode = 'static';

    this._layout = this.add.flexContainer({
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    });    

    this._title = this._layout.add.text({
      value: 'Welcome to the game!',
      style: {
        fontFamily: 'sans-serif',
        fontSize: 36,
        fill: 'white',
      },
      anchor: 0.5
    });

    this._button = this._layout.add.container({
      alpha: 1,
      position: [0,40],
    });

    this._button.add.coloredSprite({ color: 0xffffff, size: [200, 60], shape: 'rounded_rectangle', radius: 10 });
    this._button.add.text({ value: 'Go back', anchor: 0.5 });
    this._button.eventMode = 'static';
    this._button.cursor = 'pointer';

    this._button.on('pointerdown', (e) => {
      this.app.state.transitionTo('IntroScreen');
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
