import { ActionSignal, i18nTParams, IFocusable, IFocusLayer, KeySignal, LoadSceneConfig, ActionContext, InputController } from '../../plugins';
import { IPopup, IScene, PopupConfig, PopupConstructor } from '../../display';

export interface ICoreFunctions {
    addFocusable(focusable: IFocusable | IFocusable[], layerId?: string | number | null | undefined, isDefault?: boolean): void;
    removeFocusable(focusable: IFocusable | IFocusable[]): void;
    setLayerOrder(layerIds: (string | number)[]): void;
    addFocusLayer(layerId?: string | number, setAsCurrent?: boolean, focusables?: IFocusable | IFocusable[]): IFocusLayer;
    removeFocusLayer(layerId?: string | number, removeTopLayerIfUndefined?: boolean): void;
    setFocus(focusable: IFocusable): IFocusable;
    setFocusLayer(layerId: string | number): void;
    clearFocus(): void;
    removeAllFocusLayers(): void;
    setLocale(localeId: string): void;
    t(key: string, params?: i18nTParams, locale?: string): string;
    isControllerActive(controller: InputController): boolean;
    isGamepadActive(gamepad: Gamepad): boolean;
    actions<T = any>(action: string): ActionSignal<T>;
    sendAction<T = any>(actionId: string | number, data?: T): void;
    setActionContext(context: string | ActionContext): string;
    onKeyDown(key?: string): KeySignal;
    onKeyUp(key?: string): KeySignal;
    isKeyDown(key: string): boolean;
    addPopup<T = any>(id: string | number, popup: PopupConstructor<T>): void;
    showPopup<T = any>(id: string | number, config?: Partial<PopupConfig<T>>): Promise<IPopup<T> | undefined>;
    hidePopup<T = any>(id: string | number, data?: T): Promise<IPopup<T> | undefined>;
    removeAllPopups(animate?: boolean): void;
    loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | string): Promise<void>;
    loadAssets(assets: string | string[]): Promise<void>;
    loadBundles(bundle: string | string[]): Promise<void>;
    loadSceneAssets(scene: IScene, background?: boolean): Promise<void>;
    unloadSceneAssets(scene: IScene): Promise<void>;
    loadRequired(): Promise<void>;
}
//# sourceMappingURL=ICoreFunctions.d.ts.map