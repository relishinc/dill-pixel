import { Spine } from 'pixi-spine';
import { PositionSettings, ScaleSettings, VisibilitySettings } from '../utils/factory/Make';
export interface SpineSettings extends VisibilitySettings, PositionSettings, ScaleSettings {
    name: string;
    autoUpdate?: boolean;
}
export declare class Make {
    static spine(settings: SpineSettings): Spine;
}
//# sourceMappingURL=Make.d.ts.map