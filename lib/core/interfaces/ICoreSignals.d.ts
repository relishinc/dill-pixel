import { Signal } from '../../signals';
import { ChannelVolumeDetail, FocusChangeDetail, IAudioInstance, KeyboardEventDetail, PopupSignalDetail, SoundDetail, ActionContext } from '../../plugins';
import { Size } from '../../utils';

export interface ICoreSignals {
    onSoundStarted: Signal<(detail: SoundDetail) => void>;
    onSoundEnded: Signal<(detail: SoundDetail) => void>;
    onMuted: Signal<(muted: boolean) => void>;
    onMasterVolumeChanged: Signal<(volume: number) => void>;
    onChannelVolumeChanged: Signal<(detail: ChannelVolumeDetail) => void>;
    onVoiceOverStart: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverPaused: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverComplete: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverResumed: Signal<(instance: IAudioInstance) => void>;
    onVoiceOverStopped: Signal<(instance?: IAudioInstance) => void>;
    onFocusManagerActivated: Signal<() => void>;
    onFocusManagerDeactivated: Signal<() => void>;
    onFocusLayerChange: Signal<(currentLayerId: string | number) => void>;
    onFocusChange: Signal<(detail: FocusChangeDetail) => void>;
    onLocaleChanged: Signal<(locale: string) => void>;
    onGamepadConnected: Signal<(gamepad: Gamepad) => void>;
    onGamepadDisconnected: Signal<(gamepad: Gamepad) => void>;
    onControllerActivated: Signal<(controller: string) => void>;
    onControllerDeactivated: Signal<(controller: string) => void>;
    onContextChanged: Signal<(context: string | ActionContext) => void>;
    onGlobalKeyDown: Signal<(detail: KeyboardEventDetail) => void>;
    onGlobalKeyUp: Signal<(detail: KeyboardEventDetail) => void>;
    onShowPopup: Signal<(detail: PopupSignalDetail) => void>;
    onHidePopup: Signal<(detail: PopupSignalDetail) => void>;
    onSceneChangeStart: Signal<(detail: {
        exiting: string | null;
        entering: string;
    }) => void>;
    onSceneChangeComplete: Signal<(detail: {
        current: string;
    }) => void>;
    onResize: Signal<(size: Size) => void>;
    onVisibilityChanged: Signal<(visible: boolean) => void>;
}
//# sourceMappingURL=ICoreSignals.d.ts.map