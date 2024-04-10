import { IApplication } from '../core/Application';
import { Module } from './Module';
export declare class PixiStatsModule extends Module {
    readonly id = "PixiStatsModule";
    stats: import('pixi-stats').StatsJSAdapter;
    initialize(app: IApplication): Promise<void>;
}
//# sourceMappingURL=PixiStatsModule.d.ts.map