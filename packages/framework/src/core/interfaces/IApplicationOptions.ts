import {
  ActionMap,
  FocusManagerPluginOptions,
  i18nOptions,
  InputManagerOptions,
  LoadSceneMethod,
  ResizerPluginOptions,
  SplashOptions,
} from '../../plugins';
import type {
  AppTypeOverrides,
  AssetLoadingOptions,
  LoggerMode,
  SceneImportList,
  SceneImportListItem,
} from '../../utils';

import type { ApplicationOptions, TextDropShadow, TextStyle } from 'pixi.js';
import type { IScene, ISceneTransition, SceneTransition } from '../../display';
import type { CaptionsOptions } from '../../plugins/captions';
import { GSAPPluginOptions } from '../../plugins/GSAPPlugin';
import type { IDataAdapterOptions } from '../../store';
import type { PluginConfig, StorageAdapterConfig } from '../config';
import { IApplication } from './IApplication';

export interface IApplicationOptions extends ApplicationOptions {
  id: string;
  application?: new (...args: any[]) => IApplication;
  resizeToContainer: boolean;
  container: HTMLElement;
  logger: LoggerMode;
  useStore: boolean;
  useSpine: boolean;
  useLayout: boolean;
  useVoiceover: boolean;
  defaultTextStyle: Partial<TextStyle>;
  defaultDropShadow: TextDropShadow;
  storageAdapters: StorageAdapterConfig[];
  gsap: Partial<GSAPPluginOptions>;
  data: Partial<IDataAdapterOptions>;
  plugins: PluginConfig[];
  assets: AssetLoadingOptions;
  sceneImportList: SceneImportListItem<IScene>[];
  scenes: SceneImportList<IScene>;
  sceneGroupOrder: string[];
  scenesLocation: string;
  actions: Partial<ActionMap>;
  input: Partial<InputManagerOptions>;
  focus: Partial<FocusManagerPluginOptions>;
  splash: Partial<SplashOptions>;
  defaultScene: AppTypeOverrides['Scenes'];
  sceneTransition: ISceneTransition | typeof SceneTransition;
  defaultSceneLoadMethod: LoadSceneMethod;
  showSceneDebugMenu: boolean;
  useHash: boolean;
  i18n: Partial<i18nOptions>;
  resizer: Partial<ResizerPluginOptions>;
  captions: Partial<CaptionsOptions>;
  showStats: boolean;
}
