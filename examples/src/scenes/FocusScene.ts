import { PIXIText } from 'dill-pixel';
import { Actor } from '../V8Application';
import { BaseScene } from './BaseScene.ts';

export class FocusScene extends BaseScene {
  protected title = 'Focus Management';
  private _focusLayerLabel: PIXIText;
  private actor1: Actor;
  private actor2: Actor;

  constructor() {
    super();
  }

  public async initialize() {
    await super.initialize();

    this._focusLayerLabel = this.add.text({
      text: 'Focus layer:',
      style: { fill: 'white' },
      x: 450,
      y: 100,
    });

    this.actor1 = this.add.existing<Actor>(new Actor(), { x: 500, y: 300 });
    this.actor2 = this.add.existing<Actor>(new Actor(0x00fff0), { x: 700, y: 300 });

    this.app.focus.addFocusLayer('one');
    this.app.focus.addFocusable(this.actor1, 'one', true);
    this.app.focus.addFocusable(this.actor2, 'one');
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

    const spr = this.add.sprite({ asset: 'required/jar.png', x: 200, y: 400, scale: 0.5 });
    const sheetSpr = this.add.sprite({ asset: 'jar', sheet: 'game/game.json', x: 500, y: 400, scale: 0.5 });
    const sheetSpr2 = this.add.sprite({ asset: 'jar2', sheet: 'game/game.json', x: 800, y: 400, scale: 0.5 });
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

  private _updateFocusLayerLabel() {
    this._focusLayerLabel.text = `Focus layer: ${this.app.focus.currentLayerId}`;
  }
}
