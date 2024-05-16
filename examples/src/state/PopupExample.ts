import ExamplePopup from '@/popups/ExamplePopup';
import { BaseState } from '@/state/BaseState';
import {
  AssetMapData,
  Container,
  hideAllPopups,
  PopupToken,
  showPopup,
  Signals,
  TextureAtlasAsset,
} from 'dill-pixel';
import { Point } from 'pixi.js';

export class PopupExample extends BaseState {
  count: number = 0;
  _button: Container;

  onClose = () => {
    this.count--;
  };

  public static get NAME(): string {
    return 'PopupExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAtlasAsset('buildings')];
  }

  destroy() {
    hideAllPopups();
    super.destroy();
  }

  init(pSize: Point) {
    super.init(pSize);
    //
    this.setHeaderText('Popup example');
    this.setMainText('Click the button to open a popup');

    // register the popup
    this.app.popups.register(ExamplePopup);
    this.eventMode = 'static';

    this._button = this.add.container({
      alpha: 1,
      position: [0,250],
    });

    this._button.add.coloredSprite({ color: 0xffffff, size: [200, 60], shape: 'rounded_rectangle', radius: 10 });
    this._button.add.text({ value: 'Click me', anchor: 0.5 });
    this._button.eventMode = 'static';
    this._button.cursor = 'pointer';

    this._button.on('pointerdown', (e) => {
      this.count++;
      showPopup(new PopupToken(ExamplePopup.NAME, this.onClose, true, false, this.count));
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideAllPopups();
      }
    });

    this.addSignalConnection(
      Signals.hidePopupComplete.connect((popup) => {
        console.log('hide popup complete', popup);
      }),
      Signals.showPopup.connect((token) => {
        console.log('show popup', token);
      }),
    );
  }
}
