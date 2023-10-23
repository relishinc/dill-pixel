import { BaseState } from '@/state/BaseState';
import { AssetMapData, getHTMLTextStyle, loadAndAddHTMLTextStyle } from 'dill-pixel';
import { Point } from 'pixi.js';
import { FONT_ARBORIA } from '../utils/Constants';

export class HTMLTextStyleExample extends BaseState {
  public static get NAME(): string {
    return 'HTMLTextStyleExample';
  }

  public static get Assets(): AssetMapData[] {
    return [];
  }

  async init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('HTML Text Example');
    this.setMainText('See how to load HTML Text styles to use later on');

    const text = this.add.htmlText('This will render in times', { fontFamily: FONT_ARBORIA, fontSize: 24 }, 1, [0, 75]);

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

    // manually load and add it
    /* const loadedStyle =await loadHTMLTextStyle(
			FONT_ARBORIA,
			{ fontFamily: FONT_ARBORIA, fontSize: 24, fill: 'white', fontWeight: 'normal' },
			{
				url: 'assets/fonts/arboria.woff2',
				weight: 'normal',
			},
		);

		addHTMLTextStyle('arboria', loadedStyle);
		*/

    // retrieve the style
    const style = getHTMLTextStyle('arboria');

    // and use it
    this.add.htmlText('This will render in arboria', style, 1, [0, 110]);
  }
}
