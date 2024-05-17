import ExamplePopup from '@/popups/ExamplePopup';
import { BaseState } from '@/state/BaseState';
import {
  addKeyboardLayer,
  AssetMapData,
  Container,
  hideAllPopups,
  registerFocusables,
  removeKeyboardLayer,
  showPopup,
  Signals,
  TextureAtlasAsset,
} from 'dill-pixel';
import { Point } from 'pixi.js';
import { buttonStyle } from '../utils/Constants';

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
    removeKeyboardLayer();
    hideAllPopups();
    super.destroy();
  }

  init(pSize: Point) {
    super.init(pSize);
    addKeyboardLayer();
    //
    this.setHeaderText('Popup example');
    this.setMainText('Click the button to open a popup');

    // register the popup
    this.app.popups.register(ExamplePopup);
    this.eventMode = 'static';

    this._button = this.add.container({
      alpha: 1,
      position: [0, 250],
    });

    this._button.add.coloredSprite({ color: 0xffffff, size: [200, 60], shape: 'rounded_rectangle', radius: 10 });
    this._button.add.text({ value: 'Click me', anchor: 0.5, style: buttonStyle });
    this._button.eventMode = 'static';
    this._button.cursor = 'pointer';
    this._button.focusable = true;
    registerFocusables(this._button);

    this._button.on('pointerdown', this._showPopup);
    this._button.onFocusActivated = this._showPopup;

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

  _showPopup() {
    this.count++;
    // showPopup(new PopupToken(ExamplePopup.NAME, this.onClose, true, false, this.count));
    showPopup({ id: ExamplePopup.NAME, callback: this.onClose, backdrop: true, keyboard: true, data: this.count });
  }
}
