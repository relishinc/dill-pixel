import { ApplicationOptions, AssetsManifest } from 'pixi.js';
import { ImportList, LoggerMode, SceneImportList } from '../../utils';
import { IStorageAdapter } from '../../store';
import { FocusManagerPluginOptions, i18nOptions, IPlugin, LoadSceneMethod, ResizerPluginOptions } from '../../plugins';
import { IScene } from '../../display';
import { CaptionsOptions } from '../../plugins/captions';

export interface IApplicationOptions extends ApplicationOptions {
    id: string;
    resizeToContainer: boolean;
    container: HTMLElement;
    logger: LoggerMode;
    useStore: boolean;
    useSpine: boolean;
    useVoiceover: boolean;
    storageAdapters: ImportList<IStorageAdapter>;
    plugins: ImportList<IPlugin>;
    scenes: SceneImportList<IScene>;
    focusOptions: Partial<FocusManagerPluginOptions>;
    defaultScene: string;
    defaultSceneLoadMethod: LoadSceneMethod;
    showSceneDebugMenu: boolean;
    manifest: AssetsManifest | Promise<AssetsManifest> | string;
    i18n: Partial<i18nOptions>;
    resizer: Partial<ResizerPluginOptions>;
    captions: Partial<CaptionsOptions>;
    showStats: boolean;
}
//# sourceMappingURL=IApplicationOptions.d.ts.map