import { AssetMapData, AssetType, delay, FlexContainer, Make, TextureAsset, UICanvas } from 'dill-pixel';
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

    this.ui = this.add.uiCanvas({ padding: { x: 100, y: 50 }, debug: true });

    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'top left' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'left' });
    // this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'bottom left' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'top' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'top right' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'right' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'bottom right' });
    this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'bottom' });
    // this.ui.addElement(Make.sprite({ asset: 'pickle' }), { align: 'center' });

    // add prefab
    const fc = Make.flexContainer({ flexDirection: 'row', gap: -20, alignItems: 'center', justifyContent: 'center' });
    fc.add.text({ value: 'Hello World' });
    fc.add.sprite({ asset: 'pickle', anchor: 0 });
    this.ui.addElement(fc, { align: 'center' });

    const fc2 = Make.flexContainer({
      flexDirection: 'row',
      gap: 10,
      alignItems: 'flex-start',
      width: 600,
      height: 100,
      justifyContent: 'space-between',
    });
    fc2.add.text({ value: 'Item 1' });
    fc2.add.text({ value: 'Item 2' });
    fc2.add.text({ value: 'Item 3' });

    const element = this.ui.addElement<FlexContainer>(fc2, { align: 'bottom left' });

    await delay(2);

    this.ui.size = [1000, 500];

    await delay(2);

    this.ui.size = 0;
    this.ui.padding = { x: 0, y: 0 };

    await delay(1);
    this.ui.removeChild(element);
  }
}
