import ExamplePopup from '@/popups/ExamplePopup';
import { BaseState } from '@/state/BaseState';
import { AssetMapData, AudioAsset, Container, playAudioTrack, Signals } from 'dill-pixel';
import { Point } from 'pixi.js';
import { buttonStyle } from '../utils/Constants';

export class AudioExample extends BaseState {
  _button: Container;
  _musicButton: Container;

  public static get NAME(): string {
    return 'AudioExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new AudioAsset('sample-3s', 'sfx')];
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
      position: [0, 0],
    });
    this._button.add.coloredSprite({
      color: 0xffffff,
      size: [200, 60],
      shape: 'rounded_rectangle',
      radius: 10,
    });

    this._button.add.text({
      style: buttonStyle,
      value: 'Play sound',
      anchor: 0.5,
    });
    this._button.eventMode = 'static';
    this._button.cursor = 'pointer';

    this._button.on('pointerdown', (e) => {
      playAudioTrack('sample-3s', 1, false, 'sfx');
    });

    this._musicButton = this.add.container({
      alpha: 1,
      position: [0, 75],
    });
    this._musicButton.add.coloredSprite({
      color: 0xffffff,
      size: [200, 60],
      shape: 'rounded_rectangle',
      radius: 10,
    });

    this._musicButton.add.text({
      style: buttonStyle,
      value: 'Play Music',
      anchor: 0.5,
    });
    this._musicButton.eventMode = 'static';
    this._musicButton.cursor = 'pointer';

    this._musicButton.on('pointerdown', (e) => {
      playAudioTrack('looped-track', 1, true, 'music');
    });
  }

  onAudioContextSuspendedError() {
    console.log('AudioContext suspended error');
  }
}
