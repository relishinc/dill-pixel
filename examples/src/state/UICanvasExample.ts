import { AssetMapData, AssetType, Make, TextureAsset, UICanvas } from 'dill-pixel';
import { Point } from 'pixi.js';
import { BaseState } from './BaseState';

export class UICanvasExample extends BaseState {
  protected ui: UICanvas;

  public static get NAME(): string {
    return 'UICanvasExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('pickle', AssetType.PNG)];
  }

  init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('UICanvas Example');

    this.ui = this.add.uiCanvas({ padding: { top: 100, bottom: 100 } });

    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { edge: 'top left' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { edge: 'top right' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { edge: 'bottom left' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { edge: 'bottom right' });

    const fc = Make.flexContainer({ flexDirection: 'row', gap: -20, alignItems: 'center' });
    fc.add.text({ value: 'Hello World' });
    fc.add.sprite({ asset: 'pickle', anchor: 0 });

    this.ui.addElement(fc, { edge: 'center' });
  }
}
