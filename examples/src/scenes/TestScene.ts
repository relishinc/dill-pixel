import { PIXIText, Scene } from 'dill-pixel';
import { Ticker } from 'pixi.js';
import { Actor } from '../V8Application';

export class TestScene extends Scene {
  public readonly id: string = 'TestScene';
  private _focusLayerLabel: PIXIText;
  private actor1: Actor;
  private actor2: Actor;

  constructor() {
    super();
  }

  async enter() {
    return this.app.scenes.isFirstScene
      ? this.animateFrom({
          alpha: 0,
          duration: 1,
          ease: 'sine.out',
        })
      : this.animateFrom({ y: -1000, duration: 2, ease: 'bounce.out' });
  }

  async exit() {
    return this.animate({ y: '+=1000', duration: 0.6, ease: 'back.in' });
  }

  public initialize() {
    this.add.graphics().rect(0, 0, this.app.screen.width, this.app.screen.height).fill({ color: 0x222222 });

    this.add.text({
      text: 'Test Scene 1',
      style: { fill: 'white' },
      x: 100,
      y: 50,
    });

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

    this.addSignalConnection(this.app.focus.onActivated.connect(this._updateFocusLayerLabel));
    this.addSignalConnection(this.app.focus.onDeactivated.connect(this._updateFocusLayerLabel));
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
  }

  update(ticker: Ticker) {}

  resize() {}

  private _updateFocusLayerLabel() {
    this._focusLayerLabel.text = `Focus layer: ${this.app.focus.currentLayerId}`;
  }
}
