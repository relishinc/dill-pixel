import { AssetsManifest, Application as PIXIPApplication, Point } from 'pixi.js';
import type {
  Action,
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
import type { ICoreFunctions } from './ICoreFunctions';
import { ICoreSignals } from './ICoreSignals';

export interface IApplication<
  D extends DataSchema = DataSchema,
  C extends ActionContext = ActionContext,
  A extends Action = Action,
> extends PIXIPApplication {
  config: Partial<AppConfig<D>>;
  readonly env: Record<string, string>;
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
  actionContext: C;
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

  actions(action: A): ActionSignal;

  action(action: A, data?: any): void;
  sendAction(action: A, data?: any): void;
  isActionActive(action: A): boolean;

  initialize(config: Partial<AppConfig<D>>, el?: HTMLElement): Promise<IApplication<D, C, A>>;

  postInitialize(): Promise<void>;

  getPlugin<T extends IPlugin>(name: string, debug?: boolean): T;

  setContainer(container: HTMLElement): void;
}
