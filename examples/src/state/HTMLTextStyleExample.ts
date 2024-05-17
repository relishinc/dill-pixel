import { BaseState } from '@/state/BaseState';
import { AssetMapData, getHTMLTextStyle, loadAndAddHTMLTextStyle } from 'dill-pixel';
import { Point } from 'pixi.js';
import { FONT_ARBORIA, FONT_HELVETICA, FONT_TIMES } from '../utils/Constants';

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

    const list = this.add.flexContainer({
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 50,
    });

    // built-in web fonts
    list.add.htmlText('This will render in Times', { fontFamily: FONT_TIMES, fontSize: 40 });
    list.add.htmlText('This will render in Helvetica', { fontFamily: FONT_HELVETICA, fill: 'blue', fontSize: 40 });

    // load and add the test style using the helper
    await loadAndAddHTMLTextStyle(
      'arboria',
      FONT_ARBORIA,
      { fontFamily: FONT_ARBORIA, fontSize: 40, fill: 'white', fontWeight: 'bold', align: 'left' },
      {
        url: 'assets/fonts/arboria.woff2',
        weight: 'bold',
      },
    );

    // retrieve the style
    const style = getHTMLTextStyle('arboria');

    // and use it
    const text = list.add.htmlText('This will render in Arboria', style);
  }
}
