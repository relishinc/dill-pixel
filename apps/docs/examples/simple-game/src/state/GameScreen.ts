import { State, Container, FlexContainer, AssetMapData, TextureAsset, AssetType } from 'dill-pixel';
import { Sprite, Text, Point } from 'pixi.js';
import gsap from 'gsap';
import { Application } from '../Application';

// This screen displays a rose background with a pickle, a title, and a button to go back to the intro screen

export class GameScreen extends State<Application> {
  public static NAME: string = 'GameScreen';

  protected _bg: Sprite;
  protected _layout: FlexContainer;
  protected _pickle: Sprite;
  protected _title: Text;
  protected _message: Text;
  protected _button: Container;
  protected _count: number = 0;

  public constructor() {
    super();
  }

  // Register the assets that are needed for this screen

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('pickle', AssetType.PNG)];
  }

  public init(pSize: Point) {
    super.init(pSize);

    // Create the background

    this._bg = this.add.coloredSprite(0xaa5566);
    this._bg.eventMode = 'static';

    // Use a flex container to layout the elements

    this._layout = this.add.flexContainer({
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
    });  
    
    // Add the pickle image and make it clickable

    this._pickle = this._layout.add.sprite({ asset: 'pickle' });
    this._pickle.eventMode = 'static';
    this._pickle.cursor = 'pointer';

    this._pickle.on('pointerdown', async (e) => {

      // Increment the count and update the message

      this._count++;
      this._message.text = `You clicked the pickle ${this._count} times!`;

      // Animate the pickle

      await gsap.timeline().fromTo(
        this._pickle,
        {
          y: '0',
        },
        {
          y: '-=100',
          duration: 0.5,
          ease: 'power2.out',
        }
      )
      .to(this._pickle, {
        y: '0',
        duration: 0.75,
        ease: 'bounce.out',
      });
    });

    // Add the title

    this._title = this._layout.add.text({
      value: 'Welcome to the game',
      style: {
        fontFamily: 'sans-serif',
        fontSize: 36,
        fill: 'white',
      },
      anchor: 0.5
    });

    // Add the message

    this._message = this._layout.add.text({
      value: 'Click the pickle!',
      style: {
        fontFamily: 'sans-serif',
        fontSize: 24,
        fill: 'black',
      },
      anchor: 0.5
    });

    // Add the button to go back to the intro screen

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

    gsap.killTweensOf(this._pickle);
  }

}
