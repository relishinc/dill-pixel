export interface ICoreSignals {
    // AudioManager;
    onSoundStarted: Signal<(detail: SoundDetail) => void>;
    onSoundEnded: Signal<(detail: SoundDetail) => void>;
    onMuted: Signal<(muted: boolean) => void>;
    onMasterVolumeChanged: Signal<(volume: number) => void>;
    onChannelVolumeChanged: Signal<(detail: ChannelVolumeDetail) => void>;
    // FocusManager;
    onFocusManagerActivated: Signal<() => void>;
    onFocusManagerDeactivated: Signal<() => void>;
    onFocusLayerChange: Signal<(currentLayerId: string | number) => void>;
    onFocusChange: Signal<(detail: FocusChangeDetail) => void>;
    // i18nModule;
    onLocaleChanged: Signal<(locale: string) => void>;
    // InputManager;
    onGamepadConnected: Signal<(gamepad: Gamepad) => void>;
    onGamepadDisconnected: Signal<(gamepad: Gamepad) => void>;
    onControllerActivated: Signal<(controller: string) => void>;
    onControllerDeactivated: Signal<(controller: string) => void>;
    onContextChanged: Signal<(context: string | InputContext) => void>;
    // KeyboardManager;
    onGlobalKeyDown: Signal<(detail: KeyboardEventDetail) => void>;
    onGlobalKeyUp: Signal<(detail: KeyboardEventDetail) => void>;
    // PopupManager;
    onPopupShown: Signal<() => void>;
    onPopupHidden: Signal<() => void>;
    // SceneManager;
    onSceneChangeStart: Signal<(detail: {    exiting: string | null;    entering: string;}) => void>;
    onSceneChangeComplete: Signal<(detail: {    current: string;}) => void>;
    // WebEventsManager;
    onResize: Signal<(size: Size) => void>;
    onVisibilityChanged: Signal<(visible: boolean) => void>;
}
