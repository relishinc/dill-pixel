import { Actor } from '@/entities/Actor';
import { BaseScene } from '@/scenes/BaseScene';
import { Button, Logger, PIXIText } from 'dill-pixel';

export class FocusScene extends BaseScene {
  protected title = 'Focus Management';
  private _focusLayerLabel: PIXIText;
  private actor1: Actor;
  private actor2: Actor;
  private button: Button;

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();

    this._focusLayerLabel = this.add.text({
      text: 'Focus layer:',
      style: { fill: 'white' },
      x: -this.app.center.x + 450,
      y: -this.app.center.y + 100,
    });

    this.actor1 = this.add.existing<Actor>(new Actor(), { x: -this.app.center.x + 500, y: -this.app.center.y + 300 });
    this.actor2 = this.add.existing<Actor>(new Actor(0x00fff0), {
      x: -this.app.center.x + 700,
      y: -this.app.center.y + 300,
    });

    const button = this.add.existing(
      new Button({
        textures: { default: 'jar', hover: 'jar2' },
        sheet: 'sheet.json',
        cursor: 'pointer',
      }),
      {
        x: -this.app.center.x + 1100,
        y: -this.app.center.y + 400,
        scale: 0.5,
      },
    );

    button.onClick.connect(() => {
      console.log('button pressed');
    });

    button.onDown.connect(() => {
      console.log('button down');
    });

    this.button = button;

    this.app.focus.addFocusLayer('one');
    this.app.focus.addFocusable(this.actor1, 'one', true);
    this.app.focus.addFocusable(this.actor2, 'one');
    this.app.focus.addFocusable(button, 'one');
    this.app.focus.addFocusLayer('two', this.actor2);
    this.app.focus.setFocusLayer('one');

    this.addSignalConnection(this.app.focus.onFocusManagerActivated.connect(this._updateFocusLayerLabel));
    this.addSignalConnection(this.app.focus.onFocusManagerDeactivated.connect(this._updateFocusLayerLabel));
    this.addSignalConnection(this.app.focus.onFocusLayerChange.connect(this._updateFocusLayerLabel));
    this.addSignalConnection(
      this.app.keyboard.onKeyUp('a').connect(() => {
        this.actor1.setTint(Math.random() * 0xffffff);
      }),
    );
    this.addSignalConnection(
      this.app.keyboard.onKeyUp('f').connect((detail) => {
        this.app.focus.setFocusLayer(this.app.focus.currentLayerId === 'one' ? 'two' : 'one');
      }),
    );
    this.addSignalConnection(
      this.app.keyboard.onKeyUp('s').connect((detail) => {
        void this.app.scenes.loadScene({ id: 'TestScene2' });
      }),
    );

    this._updateFocusLayerLabel();

    this.actor1.onInteraction('pointerdown').connect(() => {
      Logger.log('actor 1 clicked');
    });

    const spr = this.add.sprite({
      asset: 'required/jar.png',
      x: -this.app.center.x + 200,
      y: -this.app.center.y + 400,
      scale: 0.5,
    });
    const sheetSpr = this.add.sprite({
      asset: 'jar',
      sheet: 'sheet.json',
      x: -this.app.center.x + 500,
      y: -this.app.center.y + 400,
      scale: 0.5,
    });
    const sheetSpr2 = this.add.sprite({
      asset: 'jar2',
      sheet: 'sheet.json',
      x: -this.app.center.x + 800,
      y: -this.app.center.y + 400,
      scale: 0.5,
    });

    this.actor1.bob();
  }

  async enter() {
    return this.app.scenes.isFirstScene
      ? this.animateFromTo(
          { alpha: 0 },
          {
            alpha: 1,
            duration: 1,
            ease: 'sine.out',
          },
        )
      : this.animateFrom({ y: -1000, duration: 2, ease: 'bounce.out' });
  }

  update() {
    if (this.button.isDown) {
      console.log('button is down!');
    }
  }

  private _updateFocusLayerLabel() {
    this._focusLayerLabel.text = `Focus layer: ${this.app.focus.currentLayerId}`;
  }
}
