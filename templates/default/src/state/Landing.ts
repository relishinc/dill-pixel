import { FONT_ARBORIA } from '@/utils/Constants';
import { AssetMapData, AssetType, getHTMLTextStyle, scaleToWidth, State, TextureAsset } from 'dill-pixel';
import { Point } from 'pixi.js';

export class Landing extends State {
  public static get NAME(): string {
    return 'Landing';
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('relish-logo-circle', AssetType.PNG)];
  }

  init(size: Point) {
    super.init(size);
    // retrieve the custom font satyle style
    const style = getHTMLTextStyle(FONT_ARBORIA);
    // and use it
    this.add.htmlText('Welcome!', style, 1, [0, -100], 0.5);

    // add a sprite
    const spr = this.add.sprite('relish-logo-circle', undefined, 1, [0, 50], 0.5);
    scaleToWidth(spr, 200);
  }
}
