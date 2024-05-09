import { IApplication } from '../core/Application';
import { Plugin } from './Plugin';
export declare class StatsPlugin extends Plugin {
    readonly id = "StatsModule";
    stats: any;
    initialize(app: IApplication): Promise<void>;
}
