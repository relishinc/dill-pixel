export interface ICoreSignals {
  soundStarted: Signal<(detail: SoundDetail) => void>;
  soundEnded: Signal<(detail: SoundDetail) => void>;
  muted: Signal<(muted: boolean) => void>;
  masterVolumeChanged: Signal<(volume: number) => void>;
  channelVolumeChanged: Signal<(detail: ChannelVolumeDetail) => void>;
  focusManagerActivated: Signal<() => void>;
  focusManagerDeactivated: Signal<() => void>;
  focusLayerChange: Signal<(currentLayerId: string | number) => void>;
  focusChange: Signal<(detail: FocusChangeDetail) => void>;
  localeChanged: Signal<(locale: string) => void>;
  gamepadConnected: Signal<(gamepad: Gamepad) => void>;
  gamepadDisconnected: Signal<(gamepad: Gamepad) => void>;
  controllerActivated: Signal<(controller: string) => void>;
  controllerDeactivated: Signal<(controller: string) => void>;
  contextChanged: Signal<(context: string | InputContext) => void>;
  popupShown: Signal<() => void>;
  popupHidden: Signal<() => void>;
  sceneChangeStart: Signal<(detail: { exiting: string | null; entering: string }) => void>;
  sceneChangeComplete: Signal<(detail: { current: string }) => void>;
  resize: Signal<(size: Size) => void>;
  visibilityChanged: Signal<(visible: boolean) => void>;
}
