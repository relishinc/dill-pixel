import type { ActionSignal, i18nTParams, IFocusable, IFocusLayer, KeySignal, LoadSceneConfig } from '../../plugins';
import { ActionContext, InputController } from '../../plugins';
import type { IScene } from '../../display';
import type { IPopup, PopupConfig, PopupConstructor } from '../../ui';

export interface ICoreFunctions {
  // FocusManager;
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

  // i18nPlugin;
  setLocale(localeId: string): void;

  t(key: string, params?: i18nTParams, locale?: string): string;

  // InputManager;
  isControllerActive(controller: InputController): boolean;

  isGamepadActive(gamepad: Gamepad): boolean;

  actions<T = any>(action: string): ActionSignal<T>;

  sendAction<T = any>(actionId: string | number, data?: T): void;

  setActionContext(context: string | ActionContext): string;

  // KeyboardManager;
  onKeyDown(key?: string): KeySignal;

  onKeyUp(key?: string): KeySignal;

  isKeyDown(key: string): boolean;

  // PopupManager;
  addPopup<T = any>(id: string | number, popup: PopupConstructor<T>): void;

  showPopup<T = any>(id: string | number, config?: Partial<PopupConfig<T>>): Promise<IPopup<T> | undefined>;

  hidePopup<T = any>(id: string | number, data?: T): Promise<IPopup<T> | undefined>;

  removeAllPopups(animate?: boolean): void;

  // SceneManager;
  loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | string): Promise<void>;

  // AssetsPlugin
  loadAssets(assets: string | string[]): Promise<void>;

  loadBundles(bundle: string | string[]): Promise<void>;

  loadSceneAssets(scene: IScene, background?: boolean): Promise<void>;

  unloadSceneAssets(scene: IScene): Promise<void>;

  loadRequired(): Promise<void>;
}
