import type {
  ChannelMutedDetail,
  ChannelVolumeDetail,
  FocusChangeDetail,
  IAudioInstance,
  KeyboardEventDetail,
  PopupSignalDetail,
  SoundDetail,
} from '../../plugins';
import { ActionContext } from '../../plugins';
import { Signal } from '../../signals';
import type { DataChangeSignalDetail } from '../../store/adapters/DataAdapter';
import type { Orientation, Size } from '../../utils';

export interface ICoreSignals {
  // Application;
  onResize: Signal<(size: Size) => void>;
  // AudioManager;
  onSoundStarted: Signal<(detail: SoundDetail) => void>;
  onSoundEnded: Signal<(detail: SoundDetail) => void>;
  onMuted: Signal<(muted: boolean) => void>;
  onMasterVolumeChanged: Signal<(volume: number) => void>;
  onChannelVolumeChanged: Signal<(detail: ChannelVolumeDetail) => void>;
  onChannelMuted: Signal<(detail: ChannelMutedDetail) => void>;
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
  // actionsPlugin;
  onActionContextChanged: Signal<(context: string | ActionContext) => void>;
  // InputManager;
  onGamepadConnected: Signal<(gamepad: Gamepad) => void>;
  onGamepadDisconnected: Signal<(gamepad: Gamepad) => void>;
  onControllerActivated: Signal<(controller: string) => void>;
  onControllerDeactivated: Signal<(controller: string) => void>;
  // KeyboardManager;
  onGlobalKeyDown: Signal<(detail: KeyboardEventDetail) => void>;
  onGlobalKeyUp: Signal<(detail: KeyboardEventDetail) => void>;
  // PopupManager;
  onShowPopup: Signal<(detail: PopupSignalDetail) => void>;
  onHidePopup: Signal<(detail: PopupSignalDetail) => void>;
  onPopupChanged: Signal<(detail: PopupSignalDetail) => void>;
  // SceneManager;
  onSceneChangeStart: Signal<(detail: { exiting: string | null; entering: string }) => void>;
  onSceneChangeComplete: Signal<(detail: { current: string }) => void>;
  // WebEventsManager;
  onOrientationChanged: Signal<
    ({ orientation, screenOrientation }: { orientation: Orientation; screenOrientation: ScreenOrientation }) => void
  >;
  onVisibilityChanged: Signal<(visible: boolean) => void>;
  // AssetPlugin
  onLoadProgress: Signal<(progress: number) => void>;
  onLoadComplete: Signal<() => void>;
  onError: Signal<(error: Error) => void>;

  onBackgroundLoadStart: Signal<() => void>;
  onBackgroundAssetsLoaded: Signal<(assets: string[]) => void>;
  onBackgroundBundlesLoaded: Signal<(bundles: string[]) => void>;

  onLoadRequiredStart: Signal<() => void>;
  onLoadRequiredProgress: Signal<(progress: number) => void>;
  onLoadRequiredComplete: Signal<() => void>;
  // DataAdapter;
  onDataChange: Signal<(detail: DataChangeSignalDetail) => void>;
}
