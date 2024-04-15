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
} from '@relish-studios/dill-pixel';
import { Point } from 'pixi.js';

export class PopupExample extends BaseState {
  count: number = 0;
  button: Container;
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
    this.setHeaderText('Popup Example');
    this.setMainText('Click anywhere to open a popup.');

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

    this.button.on('pointerdown', (e) => {
      this.count++;
      showPopup(new PopupToken(ExamplePopup.NAME, this.onClose, true, false, this.count));
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideAllPopups();
      }
    });

    this.addSignalConnection(
      Signals.hidePopupComplete.connect((p) => {
        console.log('hide popup complete', p);
      }),
    );
  }
}
