import { FlexContainer } from '../gameobjects';
import { State } from '../state';
import { scaleToWidth } from '../utils';
export class LevelEditor extends State {
    static { this.NAME = 'LevelEditor'; }
    static { this.layers = ['background', 'collision', 'foreground']; }
    static { this.components = []; }
    constructor() {
        super();
        this._layers = [];
        this._components = [];
        this._layers = LevelEditor.layers;
        this._components = LevelEditor.components;
    }
    init(size) {
        super.init(size);
        this._ui = this.add.existing(new FlexContainer({
            bindToAppSize: true,
            flexDirection: 'row',
            gap: 100,
        }));
        this._ui.position.set(-size.x / 2, -size.y / 2);
        this._ui.name = 'UI';
        this._ui.debug = true;
        this._drawer = this._ui.add.existing(new FlexContainer({ gap: 10, flexDirection: 'column', width: 300 }));
        this._drawer.name = 'drawer';
        let test = this.make.sprite('relish-logo-circle');
        scaleToWidth(test, 200);
        this._ui.add.existing(test);
        test = this.make.sprite('relish-logo-circle');
        scaleToWidth(test, 100);
        this._ui.add.existing(test);
        // add each of the components to the drawer
        for (const component of this._components) {
            let instance;
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
    onResize(size) {
        super.onResize(size);
        if (this._ui) {
            this._ui.position.set(-size.x / 2, -size.y / 2);
        }
    }
}
//# sourceMappingURL=LevelEditor.js.map