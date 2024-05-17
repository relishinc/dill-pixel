import { Plugin } from './Plugin';
export declare class StatsPlugin extends Plugin {
    readonly id = "StatsPlugin";
    stats: any;
    initialize(): Promise<void>;
}
