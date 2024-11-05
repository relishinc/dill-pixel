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
import type { IStore } from '../../store';
import type { Size } from '../../utils';
import type { AppConfig } from '../types';
import type { IApplicationOptions } from './IApplicationOptions';
import type { ICoreFunctions } from './ICoreFunctions';
import { ICoreSignals } from './ICoreSignals';

export interface IApplication extends PIXIPApplication {
  config: Partial<IApplicationOptions>;
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

  actionContext: string | ActionContext;
  onPause: Signal<() => void>;
  onResume: Signal<() => void>;

  readonly appName: string;
  readonly appVersion: string | number;
  signal: ICoreSignals;
  func: ICoreFunctions;
  exec: ICoreFunctions;

  actions(action: any): ActionSignal;

  initialize(config: AppConfig): Promise<IApplication>;

  postInitialize(): Promise<void>;

  getPlugin<T extends IPlugin>(name: string, debug?: boolean): T;

  setContainer(container: HTMLElement): void;
}
