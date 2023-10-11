import { Point } from 'pixi.js';
import { FlexContainer } from '../gameobjects';
import { State } from '../state';
export type LevelEditorLayer = 'background' | 'collision' | 'foreground';
export declare class LevelEditor extends State {
    static NAME: string;
    static layers: (LevelEditorLayer | string)[];
    static components: any[];
    protected _ui: FlexContainer;
    protected _drawer: FlexContainer;
    protected _layers: (LevelEditorLayer | string)[];
    protected _components: any[];
    constructor();
    init(size: Point): void;
    onResize(size: Point): void;
}
//# sourceMappingURL=LevelEditor.d.ts.map