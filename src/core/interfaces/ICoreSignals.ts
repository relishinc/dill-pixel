import { Signal } from '../../signals';
import type {
  ChannelVolumeDetail,
  FocusChangeDetail,
  IAudioInstance,
  KeyboardEventDetail,
  PopupSignalDetail,
  SoundDetail,
} from '../../plugins';
import { ActionContext } from '../../plugins';
import type { Size } from '../../utils';

export interface ICoreSignals {
  // AudioManager;
  onSoundStarted: Signal<(detail: SoundDetail) => void>;
  onSoundEnded: Signal<(detail: SoundDetail) => void>;
  onMuted: Signal<(muted: boolean) => void>;
  onMasterVolumeChanged: Signal<(volume: number) => void>;
  onChannelVolumeChanged: Signal<(detail: ChannelVolumeDetail) => void>;
  // VoiceOverPlugin;
  onVoiceOverStart: Signal<(instance: IAudioInstance) => void>;
  onVoiceOverPaused: Signal<(instance: IAudioInstance) => void>;
  onVoiceOverComplete: Signal<(instance: IAudioInstance) => void>;
  onVoiceOverResumed: Signal<(instance: IAudioInstance) => void>;
  onVoiceOverStopped: Signal<(instance?: IAudioInstance) => void>;
  // FocusManager;
  onFocusManagerActivated: Signal<() => void>;
  onFocusManagerDeactivated: Signal<() => void>;
  onFocusLayerChange: Signal<(currentLayerId: string | number) => void>;
  onFocusChange: Signal<(detail: FocusChangeDetail) => void>;
  // i18nPlugin;
  onLocaleChanged: Signal<(locale: string) => void>;
  // InputManager;
  onGamepadConnected: Signal<(gamepad: Gamepad) => void>;
  onGamepadDisconnected: Signal<(gamepad: Gamepad) => void>;
  onControllerActivated: Signal<(controller: string) => void>;
  onControllerDeactivated: Signal<(controller: string) => void>;
  onContextChanged: Signal<(context: string | ActionContext) => void>;
  // KeyboardManager;
  onGlobalKeyDown: Signal<(detail: KeyboardEventDetail) => void>;
  onGlobalKeyUp: Signal<(detail: KeyboardEventDetail) => void>;
  // PopupManager;
  onShowPopup: Signal<(detail: PopupSignalDetail) => void>;
  onHidePopup: Signal<(detail: PopupSignalDetail) => void>;
  // SceneManager;
  onSceneChangeStart: Signal<(detail: { exiting: string | null; entering: string }) => void>;
  onSceneChangeComplete: Signal<(detail: { current: string }) => void>;
  // WebEventsManager;
  onResize: Signal<(size: Size) => void>;
  onVisibilityChanged: Signal<(visible: boolean) => void>;
}
