import {
  ActionMap,
  FocusManagerPluginOptions,
  i18nOptions,
  InputManagerOptions,
  LoadSceneMethod,
  ResizerPluginOptions,
  SplashOptions,
} from '../../plugins';
import type { AssetLoadingOptions, LoggerMode, SceneImportList } from '../../utils';

import type { ApplicationOptions } from 'pixi.js';
import type { IScene, ISceneTransition, SceneTransition } from '../../display';
import type { CaptionsOptions } from '../../plugins/captions';
import type { DataSchema, IDataAdapterOptions } from '../../store';

export interface IApplicationOptions<D extends DataSchema = DataSchema> extends ApplicationOptions {
  id: string;
  resizeToContainer: boolean;
  container: HTMLElement;
  logger: LoggerMode;
  useStore: boolean;
  useSpine: boolean;
  useVoiceover: boolean;
  //storageAdapters: ImportList<IStorageAdapter>;
  storageAdapters: (string | [string, { autoLoad?: boolean; options?: any }])[];
  data: Partial<IDataAdapterOptions<D>>;
  // plugins: ImportList<IPlugin>;
  plugins: (string | [string, { autoLoad?: boolean; options?: any }])[];
  assets: AssetLoadingOptions;
  scenes: SceneImportList<IScene>;
  scenesLocation: string;
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
