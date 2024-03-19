import { BaseState } from '@/state/BaseState';
import { AssetMapData, FontAsset } from 'dill-pixel';
import { Point } from 'pixi.js';
import { FONT_OPEN_SANS, FONT_OPEN_SANS_BOLD, FONT_PADALOMA } from '../utils/Constants';

export class BitmapFontsExample extends BaseState {
  public static get NAME(): string {
    return 'BitmapFontsExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new FontAsset(FONT_OPEN_SANS), new FontAsset(FONT_OPEN_SANS_BOLD), new FontAsset(FONT_PADALOMA)];
  }

  async init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('Bitmap Fonts Example');

    const list = this.add.flexContainer({
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    });

    const openSans = list.add.bitmapText('Open Sans', { fontName: FONT_OPEN_SANS, fontSize: 128 }, 1, [0, 0]);

    const openSansBold = list.add.bitmapText(
      'Open Sans Bold',
      { fontName: FONT_OPEN_SANS_BOLD, fontSize: 128 },
      1,
      [0, 0],
    );

    const padaloma = list.add.bitmapText(
      'Padaloma',
      { fontName: FONT_PADALOMA, fontSize: 128, tint: 0xff0000 },
      1,
      [0, 0],
    );
  }
}
