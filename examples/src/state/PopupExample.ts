import ExamplePopup from '@/popups/ExamplePopup';
import { BaseState } from '@/state/BaseState';
import { AssetMapData, Container, PopupToken, showPopup, TextureAtlasAsset } from 'dill-pixel';
import { Point } from 'pixi.js';

export class PopupExample extends BaseState {
  count: number = 0;
  button: Container;

  public static get NAME(): string {
    return 'PopupExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAtlasAsset('buildings')];
  }

  init(pSize: Point) {
    super.init(pSize);
    //
    this.setHeaderText('Popup Example');
    this.setMainText('Click anywhere to open a popup.');

    // register the popup
    this.app.popups.register(ExamplePopup);
    this.eventMode = 'static';

    this.button = this.add.container({ position: [this.app.size.x * 0.5 - 130, -this.app.size.y * 0.5 + 200] });
    this.button.add.coloredSprite({ color: 0x00ff00, size: [200, 100], shape: 'rounded_rectangle', radius: 10 });
    this.button.add.text('Click me');
    this.button.eventMode = 'static';
    this.button.cursor = 'pointer';

    this.button.on('pointerdown', (e) => {
      this.count++;
      showPopup(new PopupToken(ExamplePopup.NAME, this.onClose, true, false, this.count));
    });
  }

  onClose = () => {
    this.count--;
  };
}
