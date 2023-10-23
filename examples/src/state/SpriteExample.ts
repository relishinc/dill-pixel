import ExamplePopup from '@/popups/ExamplePopup';
import { BaseState } from '@/state/BaseState';
import { AssetMapData, AssetType, TextureAsset, TextureAtlasAsset } from 'dill-pixel';
import { Point } from 'pixi.js';

export class SpriteExample extends BaseState {
  public static get NAME(): string {
    return 'SpriteExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('pickle', AssetType.PNG), new TextureAtlasAsset('buildings')];
  }

  init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('Sprite Example');
    this.setMainText('Static and Texture Atlas Sprites');

    // register the popup
    this.app.popups.register(ExamplePopup);

    this.eventMode = 'static';

    this.add.sprite('pickle', undefined, 1, [-150, 150], 0.5);
    this.add.sprite('lab', 'buildings', 1, [150, 150]);
  }
}
