import { PIXIText, Scene } from 'dill-pixel';
import { Actor } from '../V8Application';

export class TestScene extends Scene {
  public readonly id: string = 'TestScene';
  private _focusLayerLabel: PIXIText;

  constructor() {
    super();
  }

  public destroy(): void {}

  public enter(): Promise<void> {
    return Promise.resolve();
  }

  public start() {
    this._focusLayerLabel = this.add.text({
      text: 'Focus layer:',
      style: { fill: 'white' },
      x: 450,
      y: 100,
    });

    this.app.focus.onActivated.connect(this._updateFocusLayerLabel);
    this.app.focus.onDeactivated.connect(this._updateFocusLayerLabel);
    this.app.focus.onFocusLayerChange.connect(this._updateFocusLayerLabel);
    this.app.focus.onFocusChange.connect(({ layer, focusable }) => {
      console.log('focus change', layer, focusable);
    });

    const actor = this.add.existing<Actor>(new Actor(), { x: 500, y: 300 });
    const actor2 = this.add.existing<Actor>(new Actor(0x00fff0), { x: 700, y: 300 });

    this.app.keyboard.onKeyUp('a').connect((detail) => {
      actor.tint = Math.random() * 0xffffff;
    });

    this.app.keyboard.onKeyUp('f').connect((detail) => {
      this.app.focus.setFocusLayer(this.app.focus.currentLayerId === 'one' ? 'two' : 'one');
    });

    this.app.focus.addFocusLayer('one', [actor, actor2]);
    this.app.focus.addFocusLayer('two', actor2);
  }

  private _updateFocusLayerLabel() {
    this._focusLayerLabel.text = `Focus layer: ${this.app.focus.currentLayerId}`;
  }
}
