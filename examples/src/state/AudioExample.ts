import ExamplePopup from '@/popups/ExamplePopup';
import { BaseState } from '@/state/BaseState';
import { AssetMapData, Container, playAudioTrack, Signals } from 'dill-pixel';
import { Point } from 'pixi.js';

export class AudioExample extends BaseState {
  _button: Container;

  public static get NAME(): string {
    return 'AudioExample';
  }

  public static get Assets(): AssetMapData[] {
    return [];
  }

  destroy() {
    super.destroy();
  }

  init(pSize: Point) {
    super.init(pSize);
    Signals.audioContextSuspendedError.connect(this.onAudioContextSuspendedError);

    //
    this.setHeaderText('Audio example');
    this.setMainText('Click the button to play a short sound');

    // register the popup
    this.app.popups.register(ExamplePopup);
    this.eventMode = 'static';

    this._button = this.add.container({
      alpha: 1,
      position: [0,0],
    });
    this._button.add.coloredSprite({ color: 0xffffff, size: [200, 60], shape: 'rounded_rectangle', radius: 10 });
    this._button.add.text({ value: 'Play sound', anchor: 0.5 });
    this._button.eventMode = 'static';
    this._button.cursor = 'pointer';

    this._button.on('pointerdown', (e) => {
      playAudioTrack('sample-3s', 1, false, 'sfx');
    });
  }

  onAudioContextSuspendedError() {
    console.log('AudioContext suspended error');
  }
}
