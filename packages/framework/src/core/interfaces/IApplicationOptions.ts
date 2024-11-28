import {
  ActionMap,
  FocusManagerPluginOptions,
  i18nOptions,
  InputManagerOptions,
  IPlugin,
  LoadSceneMethod,
  ResizerPluginOptions,
  SplashOptions,
} from '../../plugins';
import type { AssetLoadingOptions, ImportList, LoggerMode, SceneImportList } from '../../utils';

import type { ApplicationOptions } from 'pixi.js';
import type { IScene, ISceneTransition, SceneTransition } from '../../display';
import type { CaptionsOptions } from '../../plugins/captions';
import type { DataSchema, IDataAdapterOptions, IStorageAdapter } from '../../store';

export interface IApplicationOptions<D extends DataSchema = DataSchema> extends ApplicationOptions {
  id: string;
  resizeToContainer: boolean;
  container: HTMLElement;
  logger: LoggerMode;
  useStore: boolean;
  useSpine: boolean;
  useVoiceover: boolean;
  storageAdapters: ImportList<IStorageAdapter>;
  data: Partial<IDataAdapterOptions<D>>;
  plugins: ImportList<IPlugin>;
  assets: AssetLoadingOptions;
  scenes: SceneImportList<IScene>;
  actions: Partial<ActionMap>;
  input: Partial<InputManagerOptions>;
  focus: Partial<FocusManagerPluginOptions>;
  splash: Partial<SplashOptions>;
  defaultScene: string;
  sceneTransition: ISceneTransition | typeof SceneTransition;
  defaultSceneLoadMethod: LoadSceneMethod;
  showSceneDebugMenu: boolean;
  useHash: boolean;
  i18n: Partial<i18nOptions>;
  resizer: Partial<ResizerPluginOptions>;
  captions: Partial<CaptionsOptions>;
  showStats: boolean;
}
