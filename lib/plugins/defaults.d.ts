import { ImportList } from '../utils/types';
import { IPlugin } from './Plugin';

export declare const defaultPlugins: ImportList<IPlugin>;
export type DefaultPluginIds = (typeof defaultPlugins)[number]['id'];
export declare const allDefaults: DefaultPluginIds[];
//# sourceMappingURL=defaults.d.ts.map