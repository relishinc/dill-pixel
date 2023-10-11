import { Point } from 'pixi.js';
import { FlexContainer } from '../gameobjects';
import { State } from '../state';
import { scaleToWidth } from '../utils';

export type LevelEditorLayer = 'background' | 'collision' | 'foreground';

export class LevelEditor extends State {
  public static NAME: string = 'LevelEditor';
  public static layers: (LevelEditorLayer | string)[] = ['background', 'collision', 'foreground'];
  public static components: any[] = [];

  protected _ui: FlexContainer;
  protected _drawer: FlexContainer;
  protected _layers: (LevelEditorLayer | string)[] = [];
  protected _components: any[] = [];

  constructor() {
    super();

    this._layers = LevelEditor.layers;
    this._components = LevelEditor.components;
  }

  init(size: Point) {
    super.init(size);

    this._ui = this.add.existing<FlexContainer>(
      new FlexContainer({
        bindToAppSize: true,
        flexDirection: 'row',
        gap: 100,
      }),
    );
    this._ui.position.set(-size.x / 2, -size.y / 2);
    this._ui.name = 'UI';
    this._ui.debug = true;

    this._drawer = this._ui.add.existing<FlexContainer>(
      new FlexContainer({ gap: 10, flexDirection: 'column', width: 300 }),
    );
    this._drawer.name = 'drawer';

    let test = this.make.sprite('relish-logo-circle');
    scaleToWidth(test, 200);

    this._ui.add.existing(test);

    test = this.make.sprite('relish-logo-circle');
    scaleToWidth(test, 100);
    this._ui.add.existing(test);
    // add each of the components to the drawer
    for (const component of this._components) {
      let instance: any;
      switch (true) {
        case component?.type === 'sprite':
          instance = this.make.sprite(component?.texture, component?.sheet);
          scaleToWidth(instance, 100);
          break;
        default:
          instance = new component();
      }

      this._drawer.add.existing(instance);
    }
  }

  onResize(size: Point) {
    super.onResize(size);
    if (this._ui) {
      this._ui.position.set(-size.x / 2, -size.y / 2);
    }
  }
}
