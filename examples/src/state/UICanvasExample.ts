import {
  AssetMapData,
  AssetType,
  delay,
  FlexContainer,
  Make,
  TextureAsset,
  UICanvas,
} from 'dill-pixel';
import { Point } from 'pixi.js';
import { BaseState } from './BaseState';

export class UICanvasExample extends BaseState {
  protected ui: UICanvas;
  protected extraElement: FlexContainer;

  public static get NAME(): string {
    return 'UICanvasExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('pickle', AssetType.PNG)];
  }

  async init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('UICanvas example');
    this.setMainText('Items are aligned within the UI.\nThe screen size is adjusted and items are removed\nand added to show how the UI behaves.');

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
    const fc = Make.flexContainer({ flexDirection: 'row', gap: -50, alignItems: 'center', justifyContent: 'center' });
    fc.add.text({ value: 'Hello World' });
    fc.add.sprite({ asset: 'pickle', anchor: 0 });


    this.ui.addElement(fc, { align: 'center' });

    this.cycleThroughAlignments();
  }

  async cycleThroughAlignments() {

    const fc2 = Make.flexContainer({
      flexDirection: 'row',
      gap: 30,
    });
    fc2.add.text({ value: 'Item 1' });
    fc2.add.text({ value: 'Item 2' });
    fc2.add.text({ value: 'Item 3' });

    this.extraElement = this.ui.addElement<FlexContainer>(fc2, { align: 'bottom left', padding: 10 });    
    
    await delay(2);

    this.ui.size = [1000, 500];

    await delay(2);

    this.ui.size = 0;
    this.ui.padding = { x: 0, y: 0 };

    await delay(2);
    this.ui.removeChild(this.extraElement);

    await delay(2);

    this.ui.padding = { x: 100, y: 50 };

    // do it again
    this.cycleThroughAlignments();
  }
}
