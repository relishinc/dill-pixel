import { BaseState } from '@/state/BaseState';
import {
  AssetMapData,
  AssetType,
  Container,
  pushKeyboardLayer,
  registerFocusables,
  TextureAsset,
  TextureAtlasAsset,
} from 'dill-pixel';
import { Point } from 'pixi.js';

class Focusable extends Container {
  constructor(asset: string, sheet?: string) {
    super();
    this.name = asset;
    this.add.sprite(asset, sheet);
    this.focusable = true;
  }
}

export class FocusablesExample extends BaseState {
  public static get NAME(): string {
    return 'FocusablesExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('pickle', AssetType.PNG), new TextureAtlasAsset('buildings')];
  }

  init(pSize: Point) {
    super.init(pSize);
    pushKeyboardLayer();

    this.setHeaderText('Sprite Example');
    this.setMainText('Static and Texture Atlas Sprites');

    const pickle: Focusable = this.add.existing(new Focusable('pickle'));
    pickle.position.set(-150, 150);

    const lab: Focusable = this.add.existing(new Focusable('lab', 'buildings'));
    lab.position.set(150, 150);

    registerFocusables([pickle, lab]);
  }
}
