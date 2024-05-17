import { BaseState } from '@/state/BaseState';
import { AssetMapData, getHTMLTextStyle, loadAndAddHTMLTextStyle } from 'dill-pixel';
import { Point } from 'pixi.js';
import { FONT_ARBORIA, FONT_TIMES, FONT_HELVETICA } from '../utils/Constants';

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
    list.add.htmlText({
      value: 'This will <strong>render</strong> in <em>Times</em>', 
      style: { fontFamily: FONT_TIMES, fontSize: 40 }
    });
    list.add.htmlText({ 
      value: 'This will <em>render</em> in <u>Helvetica</u>', 
      style: { fontFamily: FONT_HELVETICA, fill: 'blue', fontSize: 40 }
    });
    
    // load and add the test style using the helper
    await loadAndAddHTMLTextStyle(
      'arboria',
      FONT_ARBORIA,
      { 
        fontFamily: FONT_ARBORIA, 
        fontSize: 40, 
        fill: 'white', 
        fontWeight: 'bold', 
        align: 'center' 
      },
      [
        {
          url: 'assets/fonts/arboria.woff2',
          weight: 'bold',
        }
      ],
    );

    // retrieve the style
    const style = getHTMLTextStyle('arboria');

    // and use it
    list.add.htmlText({ 
      value: 'This will render in Arboria', 
      style 
    });
  }
}
