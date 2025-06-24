import type { Container as PIXIContainer } from 'pixi.js';
import type { IScene } from '../../display';
import type {
  ActionMap,
  ActionSignal,
  i18nTParams,
  IFocusable,
  IFocusLayer,
  KeySignal,
  LoadSceneConfig,
} from '../../plugins';
import { InputController } from '../../plugins';
import type { IPopup, PopupConfig, PopupConstructor } from '../../ui';

import { type AppTypeOverrides } from '../../utils';

type AppContexts = AppTypeOverrides['Contexts'];
type AppActions = AppTypeOverrides['Actions'];
type AppScenes = AppTypeOverrides['Scenes'];

export interface ICoreFunctions {
  // FocusManagerPlugin
  addFocusable(
    focusable: IFocusable | IFocusable[],
    layerId?: string | number | null | undefined,
    isDefault?: boolean,
  ): void;
  removeFocusable(focusable: IFocusable | IFocusable[]): void;
  setLayerOrder(layerIds: (string | number)[]): void;
  addFocusLayer(layerId?: string | number, setAsCurrent?: boolean, focusables?: IFocusable | IFocusable[]): IFocusLayer;
  removeFocusLayer(layerId?: string | number, removeTopLayerIfUndefined?: boolean): void;
  setFocus(focusable: IFocusable): IFocusable;
  setFocusLayer(layerId: string | number): void;
  clearFocus(): void;
  removeAllFocusLayers(): void;

  // i18nPlugin
  setLocale(localeId: string): void;
  t(key: string, params?: i18nTParams, locale?: string): string;
  translate(key: string, params?: i18nTParams, locale?: string): string;
  // InputPlugin
  isControllerActive(controller: InputController): boolean;
  isGamepadActive(gamepad: Gamepad): boolean;

  // ActionsPlugin;
  getAction<T = any>(action: AppActions): ActionSignal<T>;
  getActions(): ActionMap;
  sendAction<T = any>(actionId: AppActions, data?: T): void;
  setActionContext(context: AppContexts): string; // in Application.ts
  actions<T = any>(action: AppActions): ActionSignal<T>; // in Application.ts

  // KeyboardPlugin
  onKeyDown(key?: string): KeySignal;
  onKeyUp(key?: string): KeySignal;
  isKeyDown(key: string): boolean;

  // PopupManagerPlugin
  addPopup<T = any>(id: string | number, popup: PopupConstructor<T>): void;
  showPopup<T = any>(id: string | number, config?: Partial<PopupConfig<T>>): Promise<IPopup<T> | undefined>;
  hidePopup<T = any>(id: string | number, data?: T): Promise<IPopup<T> | undefined>;
  removeAllPopups(animate?: boolean): void;

  // SceneManagerPlugin
  loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | AppScenes): Promise<void>;

  // AssetsPlugin
  loadAssets(assets: string | string[]): Promise<void>;
  loadBundles(bundle: string | string[]): Promise<void>;
  loadSceneAssets(scene: IScene, background?: boolean): Promise<void>;
  unloadSceneAssets(scene: IScene): Promise<void>;
  loadRequired(): Promise<void>;

  // LookupPlugin
  getChildAtPath(path: string): PIXIContainer | undefined;
  getChildrenAtPaths(paths: string[]): PIXIContainer[];
  getPathForChild(container: PIXIContainer): string;
  getPathsForChildren(containers: PIXIContainer[]): string[];
  getAllPaths(): string[];
}
