import ExamplePopup from '@/popups/ExamplePopup';
import { BaseState } from '@/state/BaseState';
import { AssetMapData, Container, playAudioTrack, Signals } from '@relish-studios/dill-pixel';
import { Point } from 'pixi.js';

export class AudioExample extends BaseState {
  count: number = 0;
  button: Container;
  onClose = () => {
    this.count--;
  };

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
    this.setHeaderText('Audio Example');
    this.setMainText('Click the button to play a sound.');

    // register the popup
    this.app.popups.register(ExamplePopup);
    this.eventMode = 'static';

    this.button = this.add.container({
      alpha: 1,
      position: [this.app.size.x * 0.5 - 130, -this.app.size.y * 0.5 + 200],
    });
    this.button.add.coloredSprite({ color: 0x00ff00, size: [200, 100], shape: 'rounded_rectangle', radius: 10 });
    this.button.add.text({ value: 'Click me', anchor: 0.5 });
    this.button.eventMode = 'static';
    this.button.cursor = 'pointer';

    const track = playAudioTrack('sample-3s', 1, false, 'sfx');

    this.button.on('pointerdown', (e) => {
      playAudioTrack('sample-3s', 1, false, 'sfx');
    });
  }

  onAudioContextSuspendedError() {
    console.log('AudioContext suspended error');
  }
}
