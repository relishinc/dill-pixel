import ExamplePopup from '@/popups/ExamplePopup';
import { BaseState } from '@/state/BaseState';
import {
  AssetMapData,
  AssetType,
  Container,
  IFocusable,
  pushKeyboardLayer,
  registerFocusables,
  TextureAsset,
  TextureAtlasAsset,
} from 'dill-pixel';
import { IPoint, Point } from 'pixi.js';

class Focusable extends Container implements IFocusable {
  constructor(asset: string, sheet?: string) {
    super();
    this.name = asset;
    this.add.sprite(asset, sheet);
  }

  onFocusBegin(): void {
    console.log(`onFocusBegin for ${this.name}`);
  }

  onFocusEnd(): void {
    console.log(`onFocusEnd for ${this.name}`);
  }

  onFocusActivated(): void {
    console.log(`onFocusActivated for ${this.name}`);
  }

  getFocusPosition(): Point {
    return new Point(-this.width * 0.5, -this.height * 0.5);
  }

  getFocusSize(): IPoint {
    const bounds = this.getBounds();
    return new Point(bounds.width, bounds.height);
  }

  isFocusable?(): boolean {
    return true;
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

    // register the popup
    this.app.popups.register(ExamplePopup);

    this.eventMode = 'static';

    // const pickle = this.add.sprite('pickle', undefined, 1, [-150, 150], 0.5);
    // const lab = this.add.sprite('lab', 'buildings', 1, [150, 150]);

    const pickle: Focusable = this.add.existing(new Focusable('pickle'));
    pickle.position.set(-150, 150);

    const lab: Focusable = this.add.existing(new Focusable('lab', 'buildings'));
    lab.position.set(150, 150);

    registerFocusables([pickle, lab]);
  }
}
