import { AssetMapData, AssetType, delay, Make, TextureAsset, UICanvas } from 'dill-pixel';
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

  async init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('UICanvas Example');

    this.ui = this.add.uiCanvas({ padding: { x: 100, y: 50 } });

    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'top left' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'left' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'bottom left' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'top' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'top right' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'right' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'bottom right' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'bottom' });
    // this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'center' });

    // add prefab
    const fc = Make.flexContainer({ flexDirection: 'row', gap: -20, alignItems: 'center' });
    fc.add.text({ value: 'Hello World' });
    fc.add.sprite({ asset: 'pickle', anchor: 0 });
    this.ui.addElement(fc, { align: 'center' });

    await delay(2);

    this.ui.size = [1000, 500];

    await delay(2);

    this.ui.size = 0;
    this.ui.padding = { x: 0, y: 0 };
  }
}
