import { BaseState } from '@/state/BaseState';
import { AssetMapData, getHTMLTextStyle, loadAndAddHTMLTextStyle } from '@relish-studios/dill-pixel';
import { Point } from 'pixi.js';
import { FONT_ARBORIA, FONT_TIMES } from '../utils/Constants';

export class HTMLTextStyleExample extends BaseState {
  public static get NAME(): string {
    return 'HTMLTextStyleExample';
  }

  public static get Assets(): AssetMapData[] {
    return [];
  }

  async init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('HTML text example');
    this.setMainText('Load HTML text styles and apply them to text elements');

    // built-in web fonts
    const text = this.add.htmlText('This will render in Times', { fontFamily: FONT_TIMES, fontSize: 24 }, 1, [0, -30], 0.5);

    // load and add the test style using the helper
    await loadAndAddHTMLTextStyle(
      'arboria',
      FONT_ARBORIA,
      { fontFamily: FONT_ARBORIA, fontSize: 24, fill: 'white', fontWeight: 'normal', align: 'center' },
      {
        url: 'assets/fonts/arboria.woff2',
        weight: 'normal',
      },
    );

    // retrieve the style
    const style = getHTMLTextStyle('arboria');

    // and use it
    this.add.htmlText('This will render in Arboria', style, 1, [0, 30], 0.5);
  }
}
