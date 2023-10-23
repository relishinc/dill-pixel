import { BaseState } from '@/state/BaseState';
import { AssetMapData, AssetType, TextureAsset } from 'dill-pixel';
import { Point, Sprite } from 'pixi.js';

export class SpriteDebugExample extends BaseState {
  static NAME: string = 'SpriteDebugExample';

  private sprite: Sprite;

  public constructor() {
    super();
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('relish-logo-circle', AssetType.PNG)];
  }

  public async init(pSize: Point) {
    super.init(pSize);
    this.setHeaderText('Sprite Debugging Example');
    this.setMainText('Click anywhere to add a sprite.\nClick the sprite to enable/disable debug mode.');

    // init debugger
    await this.app.addDebugger();

    this.sprite = this.add.sprite('relish-logo-circle', undefined, 1, [0, -100]);
    this.sprite.width = this.sprite.height = this.getObjectSize();
  }

  protected getObjectSize() {
    return 100;
  }
}
