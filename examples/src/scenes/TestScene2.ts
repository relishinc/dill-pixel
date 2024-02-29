import { PIXIText, Scene } from 'dill-pixel';
import { Ticker } from 'pixi.js';
import { Actor } from '../V8Application';

export class TestScene2 extends Scene {
  public readonly id: string = 'TestScene2';

  private _focusLayerLabel: PIXIText;
  private actor1: Actor;
  private actor2: Actor;

  constructor() {
    super();
    this.alpha = 0;
  }

  public initialize() {
    this.add.text({
      text: 'Test Scene 2',
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

    this.addSignalConnection(this.app.focus.onFocusManagerActivated.connect(this._updateFocusLayerLabel));
    this.addSignalConnection(this.app.focus.onFocusManagerDeactivated.connect(this._updateFocusLayerLabel));
    this.addSignalConnection(this.app.focus.onFocusLayerChange.connect(this._updateFocusLayerLabel));
    this.addSignalConnection(this.app.focus.onFocusChange.connect(({ layer, focusable }) => {}));
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
        void this.app.scenes.loadScene({ id: 'TestScene', method: 'enterExit' });
      }),
    );

    this._updateFocusLayerLabel();
  }

  update(ticker: Ticker) {}

  resize() {}

  async enter() {
    return this.animate({ alpha: 1, duration: 0.6, ease: 'sine.out' });
  }

  async exit() {
    return this.animate({ alpha: 0, duration: 0.4, ease: 'sine.in' });
  }

  private _updateFocusLayerLabel() {
    this._focusLayerLabel.text = `Focus layer: ${this.app.focus.currentLayerId}`;
  }
}
