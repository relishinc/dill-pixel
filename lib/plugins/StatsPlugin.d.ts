import { Plugin } from './Plugin';
import { default as Stats } from 'stats.js';

export declare class StatsPlugin extends Plugin {
    readonly id = "StatsPlugin";
    stats: Stats;
    initialize(): Promise<void>;
}
//# sourceMappingURL=StatsPlugin.d.ts.map