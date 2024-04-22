export interface ICoreFunctions {
    addFocusable(focusable: IFocusable | IFocusable[], layerId?: string | number | null | undefined, isDefault: boolean = false): void;
    removeFocusable(focusable: IFocusable | IFocusable[]);
    setLayerOrder(layerIds: (string | number)[]): void;
    addFocusLayer(layerId?: string | number, focusables?: IFocusable | IFocusable[], setAsCurrent: boolean = true): IFocusLayer;
    removeFocusLayer(layerId?: string | number, removeTopLayerIfUndefined = true): void;
    setFocus(focusable: IFocusable);
    setFocusLayer(layerId: string | number): void;
    removeAllFocusLayers(): void;
    setLocale(localeId: string);
    t(key: string, params?: i18nTParams, locale: string = this._locale): string;
    onKeyDown(key?: string): KeySignal;
    onKeyUp(key?: string): KeySignal;
    addPopup(id: string | number, popup: PopupConstructor): void;
    showPopup(id: string | number, config: Partial<PopupConfig> = {});
    hidePopup(id: string | number);
    removeAllPopups(animate: boolean = false): void;
    loadScene(sceneIdOrLoadSceneConfig: LoadSceneConfig | string): Promise<void>;
}
