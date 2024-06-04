import type { ApplicationOptions } from 'pixi.js';
import type { AssetLoadingOptions, ImportList, LoggerMode, SceneImportList } from '../../utils';
import type { IStorageAdapter } from '../../store';
import type {
  FocusManagerPluginOptions,
  i18nOptions,
  IPlugin,
  LoadSceneMethod,
  ResizerPluginOptions,
} from '../../plugins';
import type { IScene } from '../../display';
import type { CaptionsOptions } from '../../plugins/captions';

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
  assets: AssetLoadingOptions;
  scenes: SceneImportList<IScene>;
  focusOptions: Partial<FocusManagerPluginOptions>;
  defaultScene: string;
  defaultSceneLoadMethod: LoadSceneMethod;
  showSceneDebugMenu: boolean;
  i18n: Partial<i18nOptions>;
  resizer: Partial<ResizerPluginOptions>;
  captions: Partial<CaptionsOptions>;
  showStats: boolean;
}
