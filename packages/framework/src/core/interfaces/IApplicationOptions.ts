import {
  ActionMap,
  FocusManagerPluginOptions,
  i18nOptions,
  InputManagerOptions,
  LoadSceneMethod,
  ResizerPluginOptions,
  SplashOptions,
} from '../../plugins';
import type { AssetLoadingOptions, LoggerMode, SceneImportList, SceneImportListItem } from '../../utils';

import type { ApplicationOptions, TextDropShadow, TextStyle } from 'pixi.js';
import type { IScene, ISceneTransition, SceneTransition } from '../../display';
import type { CaptionsOptions } from '../../plugins/captions';
import { GSAPPluginOptions } from '../../plugins/GSAPPlugin';
import type { DataSchema, IDataAdapterOptions } from '../../store';
import type { PluginOrAdapterConfig } from '../config';

export interface IApplicationOptions<D extends DataSchema = DataSchema> extends ApplicationOptions {
  id: string;
  resizeToContainer: boolean;
  container: HTMLElement;
  logger: LoggerMode;
  useStore: boolean;
  useSpine: boolean;
  useLayout: boolean;
  useVoiceover: boolean;
  defaultTextStyle: Partial<TextStyle>;
  defaultDropShadow: TextDropShadow;
  storageAdapters: PluginOrAdapterConfig[];
  gsap: Partial<GSAPPluginOptions>;
  data: Partial<IDataAdapterOptions<D>>;
  plugins: PluginOrAdapterConfig[];
  assets: AssetLoadingOptions;
  sceneImportList: SceneImportListItem<IScene>[];
  scenes: SceneImportList<IScene>;
  sceneGroupOrder: string[];
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
