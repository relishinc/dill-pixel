import { AssetsManifest, Application as PIXIPApplication, Point } from 'pixi.js';
import type {
  ActionSignal,
  IAssetsPlugin,
  IAudioManagerPlugin,
  IControls,
  IFocusManagerPlugin,
  Ii18nPlugin,
  IInputPlugin,
  IKeyboardPlugin,
  IPlugin,
  IPopupManagerPlugin,
  IResizerPlugin,
  ISceneManagerPlugin,
  IWebEventsPlugin,
} from '../../plugins';
import { ActionContext } from '../../plugins';
import { Signal } from '../../signals';
import type { DataSchema, IDataAdapter, IStore } from '../../store';
import type { Size } from '../../utils';
import type { AppConfig } from '../types';
import type { IApplicationOptions } from './IApplicationOptions';
import type { ICoreFunctions } from './ICoreFunctions';
import { ICoreSignals } from './ICoreSignals';

export interface IApplication<D extends DataSchema = DataSchema> extends PIXIPApplication {
  config: Partial<IApplicationOptions<D>>;
  readonly size: Size;
  readonly center: Point;
  manifest: AssetsManifest | string | undefined;
  assets: IAssetsPlugin;
  scenes: ISceneManagerPlugin;
  webEvents: IWebEventsPlugin;
  keyboard: IKeyboardPlugin;
  focus: IFocusManagerPlugin;
  popups: IPopupManagerPlugin;
  audio: IAudioManagerPlugin;
  i18n: Ii18nPlugin;
  resizer: IResizerPlugin;
  input: IInputPlugin;
  controls: IControls;
  store: IStore;
  data: IDataAdapter<D>;

  actionContext: string | ActionContext;
  onPause: Signal<() => void>;
  onResume: Signal<() => void>;
  pause(): void;
  resume(): void;
  paused: boolean;

  readonly appName: string;
  readonly appVersion: string | number;
  signal: ICoreSignals;
  func: ICoreFunctions;
  exec: ICoreFunctions;

  actions(action: any): ActionSignal;

  initialize(config: AppConfig<D>): Promise<IApplication<D>>;

  postInitialize(): Promise<void>;

  getPlugin<T extends IPlugin>(name: string, debug?: boolean): T;

  setContainer(container: HTMLElement): void;
}
