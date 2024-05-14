import ExamplePopup from '@/popups/ExamplePopup';
import { BaseState } from '@/state/BaseState';
import { AssetMapData, AssetType, TextureAsset, TextureAtlasAsset } from '@relish-studios/dill-pixel';
import { Point, Texture } from 'pixi.js';

export class SpriteExample extends BaseState {
  public static get NAME(): string {
    return 'SpriteExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('pickle', AssetType.PNG), new TextureAtlasAsset('buildings')];
  }

  init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('Sprite example');
    this.setMainText('Static and texture atlas sprites');

    // register the popup
    this.app.popups.register(ExamplePopup);

    this.eventMode = 'static';

    // settings object
    this.add.sprite({ asset: 'pickle', position: [-150, 150] });
    this.add.sprite({ asset: Texture.WHITE, position: [-300, 150] });

    // settings array
    this.add.sprite({ asset: 'lab', sheet: 'buildings', position: [150, 150] });
    this.add.sprite({ asset: Texture.WHITE, position: [350, 150] });
  }
}
