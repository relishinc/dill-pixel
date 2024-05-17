import { BaseState } from '@/state/BaseState';
import { DropShadowFilter } from '@pixi/filter-drop-shadow';
import { AssetMapData, delay, FontAsset } from 'dill-pixel';
import { Filter, Point } from 'pixi.js';
import { FONT_OPEN_SANS, FONT_OPEN_SANS_BOLD, FONT_PADALOMA } from '../utils/Constants';

const shadow = new DropShadowFilter({
  blur: 2,
  offset: { x: 1, y: 1 },
  color: 0x000000,
  alpha: 1,
}) as unknown as Filter;

export class BitmapFontsExample extends BaseState {
  public static get NAME(): string {
    return 'BitmapFontsExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new FontAsset(FONT_OPEN_SANS), new FontAsset(FONT_OPEN_SANS_BOLD), new FontAsset(FONT_PADALOMA)];
  }

  async init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('Bitmap fonts example');

    const list = this.add.flexContainer({
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 50,
    });

    // Open Sans
    list.add.bitmapText({ 
      value: 'Open Sans', 
      style: { fontName: FONT_OPEN_SANS, fontSize: 128 } 
    });

    // Open Sans Bold
    list.add.bitmapText({
      value: 'Open Sans Bold',
      style: { fontName: FONT_OPEN_SANS_BOLD, fontSize: 128, letterSpacing: -3.5 },
    });

    // Padaloma
    const padaloma = list.add.bitmapText({ 
      value: 'Padaloma', 
      style: { fontName: FONT_PADALOMA, fontSize: 128, tint: 0xff0000 },
    });
    padaloma.filters = [shadow];

    // Enable cacheAsBitmap to improve performance
    padaloma.cacheAsBitmap = true;
    padaloma.roundPixels = true;

    await delay(2);

    // To update the text you need to remove cacheAsBitmap, then turn it back on
    padaloma.cacheAsBitmap = false;
    padaloma.text = 'With filters!!!';
    padaloma.cacheAsBitmap = true;

    list.layout();
  }
}
