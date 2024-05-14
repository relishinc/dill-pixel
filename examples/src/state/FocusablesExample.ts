import { BaseState } from '@/state/BaseState';
import {
  addKeyboardLayer,
  AssetMapData,
  AssetType,
  Container,
  registerFocusables,
  Sprite,
  TextureAsset,
  TextureAtlasAsset,
} from '@relish-studios/dill-pixel';
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
    addKeyboardLayer();

    this.setHeaderText('Focusables example');
    this.setMainText('Use the tab key to cycle through the focusable objects');

    // Add a sprite and then make it focusable
    const pickle: Sprite = this.add.sprite({ asset: 'pickle' });
    pickle.focusable = true;
    pickle.position.set(-150, 150);

    // Use the Focusable class to create a focusable container with a sprite inside
    const lab: Focusable = this.add.existing(new Focusable('lab', 'buildings'));
    lab.position.set(150, 150);

    registerFocusables(pickle, lab);
  }
}
