import ExamplePopup from '@/popups/ExamplePopup';
import { BaseState } from '@/state';
import { AssetMapData, AssetType, TextureAsset, TextureAtlasAsset } from 'dill-pixel';
import { Point } from 'pixi.js';

export class ContainerEditModeExample extends BaseState {
  public static get NAME(): string {
    return 'ContainerEditModeExample';
  }

  public static get Assets(): AssetMapData[] {
    return [new TextureAsset('pickle', AssetType.PNG), new TextureAtlasAsset('buildings')];
  }

  init(pSize: Point) {
    super.init(pSize);

    this.setHeaderText('Container edit mode example');
    this.setMainText(
      'The state is in edit mode.\nHover over a sprite to see its bounds and coordinates.\nClick and drag it to move it.\nWhen moved, the editor will log the positions\nof all moved sprites to the developer console.',
    );

    // register the popup
    this.app.popups.register(ExamplePopup);

    this.eventMode = 'static';

    this.add.sprite({ asset: 'pickle', position: [-150, 50] });
    this.add.sprite({ asset: 'lab', sheet: 'buildings', position: [150, 50] });

    this.editMode = true;
    this.editor.remove(this._bg);
  }
}
