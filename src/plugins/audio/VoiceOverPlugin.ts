import { Signal } from '../../signals';
import { Logger } from '../../utils/console/Logger';
import { IPlugin, Plugin } from '../Plugin';
import { IAudioInstance } from './AudioInstance';

export type PlayMode = 'append' | 'override' | 'new';
export type VoCallback = (didPlay: boolean) => void;
export type VoKey = string | number;

export type Caption = {
  id: string;
  args?: { [key: string]: string };
};

export interface IPlayVoiceOverOptions {
  mode?: PlayMode;
  priority?: number;
  callback?: VoCallback;
  localized?: boolean;
}

interface IQueueItem extends IPlayVoiceOverOptions {
  key: string;
  delay?: number;
  timeout?: gsap.core.Tween;
}

export interface IVoiceOverPlugin extends IPlugin {
  fadeOutDuration: number;
  debug: boolean;
  onVoiceOverStart: Signal<(instance: IAudioInstance) => void>;
  onVoiceOverPaused: Signal<(instance: IAudioInstance) => void>;
  onVoiceOverResumed: Signal<(instance: IAudioInstance) => void>;
  onVoiceOverComplete: Signal<(instance: IAudioInstance) => void>;
  onVoiceOverStopped: Signal<(instance?: IAudioInstance) => void>;
  paused: boolean;

  playVO(key: VoKey | VoKey[], mode?: PlayMode, callback?: VoCallback): Promise<IAudioInstance>;

  playVO(key: VoKey | VoKey[], callback?: VoCallback): Promise<IAudioInstance>;

  playVO(key: VoKey | VoKey[], options?: IPlayVoiceOverOptions): Promise<IAudioInstance>;

  stopVO(): Promise<void>;

  pauseVO(): void;

  resumeVO(): void;
}

export class VoiceOverPlugin extends Plugin implements IVoiceOverPlugin {
  public readonly id = 'voiceover';
  public fadeOutDuration = 0.15;
  public debug = false;
  public onVoiceOverStart: Signal<(instance: IAudioInstance) => void> = new Signal<
    (instance: IAudioInstance) => void
  >();
  public onVoiceOverPaused: Signal<(instance: IAudioInstance) => void> = new Signal<
    (instance: IAudioInstance) => void
  >();
  public onVoiceOverComplete: Signal<(instance: IAudioInstance) => void> = new Signal<
    (instance: IAudioInstance) => void
  >();
  public onVoiceOverResumed: Signal<(instance: IAudioInstance) => void> = new Signal<
    (instance: IAudioInstance) => void
  >();
  public onVoiceOverStopped: Signal<(instance?: IAudioInstance) => void> = new Signal<
    (instance: IAudioInstance) => void
  >();
  private readonly _queue: IQueueItem[] = [];
  private readonly _pausedQueue: IQueueItem[] = [];
  private _paused: boolean = false;

  get paused() {
    return this._paused;
  }

  get activeTimeout(): gsap.core.Tween | undefined {
    return this._queue[0]?.timeout;
  }

  get activeVO(): IAudioInstance | undefined {
    if (this._queue.length > 0 && this._queue[0].key) {
      return this.app.audio.getAudioInstance(this._queue[0].key, 'voiceover') as IAudioInstance | undefined;
    }
    return undefined;
  }

  async initialize() {
    this.app.actions('pause').connect(this.onPause);
    this.app.actions('unpause').connect(this.onResume);
    this.app.scenes.onSceneChangeStart.connect(this.stopVO);
  }

  playVO(key: VoKey | VoKey[], mode?: PlayMode, callback?: VoCallback): Promise<IAudioInstance>;

  playVO(key: VoKey | VoKey[], callback?: VoCallback): Promise<IAudioInstance>;

  playVO(key: VoKey | VoKey[], options?: IPlayVoiceOverOptions): Promise<IAudioInstance>;

  async playVO(
    key: VoKey | VoKey[],
    modeOrCallbackOrOptions?: PlayMode | VoCallback | IPlayVoiceOverOptions,
    callback?: VoCallback,
  ): Promise<IAudioInstance | void> {
    if (!Array.isArray(key)) {
      key = [key];
    }

    let priority = 0;
    let mode: string | undefined = 'override';
    let locale: string = '';

    if (typeof modeOrCallbackOrOptions === 'function') {
      callback = modeOrCallbackOrOptions;
    } else if (typeof modeOrCallbackOrOptions === 'object') {
      const modeAsOptions = modeOrCallbackOrOptions as IPlayVoiceOverOptions;
      priority = modeAsOptions.priority ?? 0;
      callback = modeAsOptions.callback;
      mode = modeAsOptions.mode ?? 'override';
      if (modeAsOptions.localized) {
        locale = this.app.i18n.locale;
        key = key.map((k) => `${k}_${locale}`);
      }
    }

    if (typeof modeOrCallbackOrOptions === 'string') {
      mode = modeOrCallbackOrOptions;
    }
    this._paused = false;
    if (key.length === 1 && this._queue.length === 1 && this._queue[0].key === key[0]) {
      Logger.warn(`🔇 Skipped VO ${key[0]} because it is already playing`);
      if (callback) {
        callback(false);
      }
    } else if (
      this._queue.length === 0 ||
      (mode === 'override' && priority >= this._queue[0].priority!) ||
      (mode === 'new' && priority > this._queue[0].priority!)
    ) {
      void this.stopVO();
      this.addToQueue(key, callback, priority);
      return this.playNext();
    } else if (mode === 'append') {
      this.addToQueue(key, callback, priority);
    } else if (callback) {
      Logger.warn(`🎟🔇 Firing callback without playing VO(s) ${key.join(', ')}`);
      callback(false);
    } else {
      Logger.warn(`🔇 Skipped VO(s) ${key.join(', ')} because it is lower priority than what was already playing`);
    }
  }

  public async stopVO(): Promise<void> {
    const activeVO: IAudioInstance | undefined = this.activeVO;
    const activeItem: IQueueItem | undefined = this._queue[0];
    this._queue.splice(0, this._queue.length);
    this._pausedQueue.splice(0, this._pausedQueue.length);
    activeItem?.timeout?.kill();
    if (activeVO) {
      if (!activeVO.media) {
        Logger.warn(`🛑 Stopping VO %c%s%c while it is still loading ${activeVO.id}`);
        activeVO.remove();
      } else if (activeVO.isPlaying) {
        Logger.log(`🤫 Fading out VO ${activeVO.id} (duration:${this.fadeOutDuration})`);
        await activeVO.fadeTo(0, this.fadeOutDuration);
        activeVO.stop();
      } else {
        activeVO.stop();
      }
    } else {
      Logger.warn('🛑 No active VO to stop');
      this.activeTimeout?.kill();
    }
    this.clearSignalConnections();
    this._paused = false;
    this.onVoiceOverStopped.emit(activeVO);
  }

  pauseVO() {
    if (this._paused) return;
    if (this._queue.length > 0) {
      this._paused = true;
      this._pausedQueue.push(...this._queue);
      const activeVO = this.activeVO;
      const activeTimeout = this.activeTimeout;
      activeVO?.pause();
      activeTimeout?.pause();
      this._queue.splice(0, this._queue.length);
    }
  }

  resumeVO() {
    if (!this._paused) return;
    this._paused = false;
    if (this._pausedQueue.length > 0) {
      this._queue.push(...this._pausedQueue);
      this._pausedQueue.splice(0, this._pausedQueue.length);
      const activeVO = this.activeVO;
      const activeTimeout = this.activeTimeout;
      activeVO?.resume();
      activeTimeout?.resume();
      if (activeVO) {
        this.onVoiceOverStart.emit(activeVO);
      }
    }
  }

  protected getCoreSignals(): string[] {
    return ['onVoiceOverStart', 'onVoiceOverPaused', 'onVoiceOverComplete', 'onVoiceOverResumed', 'onVoiceOverStopped'];
  }

  private addToQueue(keys: VoKey[], cb?: VoCallback, priority?: number) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (typeof key === 'number') {
        Logger.log(`➕ Queueing delay ${key}`);
      } else {
        Logger.log(`➕ Queueing VO ${key}`);
      }

      this._queue.push({
        key: typeof key === 'string' ? key : '',
        delay: typeof key === 'number' ? key : undefined,
        callback: i === keys.length - 1 ? cb : undefined,
        priority,
      });
    }
    const toLoad = keys.filter((it) => typeof it === 'string') as string[];
    Logger.log(`📂 Loading VO(s) ${toLoad.join(', ')}`);
    this.app.audio.load(toLoad, 'voiceover');
  }

  private async playNext(): Promise<IAudioInstance | void> {
    if (this._queue.length > 0) {
      const item = this._queue[0];
      if (item.delay !== undefined) {
        this.activeTimeout?.kill();
        if (this._queue.length === 1) {
          // skip delay if last item in queue
          Logger.log('⌛ Skipping delay because there are no more items in queue');
          this._queue.shift();
          if (item.callback) {
            item.callback(true);
          }
          return this.playNext();
        } else {
          Logger.log('⏳ Waiting %s seconds before next VO', item.delay);
          item.timeout = gsap.delayedCall(item.delay, () => {
            this._queue.shift();
            if (item.callback) {
              item.callback(true);
            }
            return this.playNext();
          });
        }
      } else {
        const existing = this.app.audio.getAudioInstance(item.key, 'voiceover');
        if (existing) {
          if (existing.isPlaying) {
            Logger.warn('🛑 Stopping VO %c%s%c (no fade out)', existing.id);
            existing.stop();
            this.onVoiceOverComplete.emit(existing);
          }
        } else {
          Logger.log('📂 Loading VO %c%s%c', item.key);
        }
        const instance = await this.app.audio.play(item.key, 'voiceover');
        if (this.activeVO) {
          this.onVoiceOverStart.emit(this.activeVO);
        }
        if (this._queue[0] !== item) {
          return;
        }
        Logger.log(`▶️▶️ Playing VO ${item.key}`);
        Logger.log('ℹ️ Queue length:', this._queue.length);

        if (this.activeVO) {
          this.addSignalConnection(
            this.activeVO.onEnd.connectOnce(this._handleActiveVOEnded),
            this.activeVO.onPaused.connectOnce(this._handleActiveVOPaused),
            this.activeVO.onResumed.connectOnce(this._handleActiveVOResumed),
            this.activeVO.onStart.connectOnce(this._handleActiveVOStarted),
          );
        } else {
          Logger.error('⚠️ Vo %c%s%c completed early (did not play?)', item.key);
          this._handleActiveVOEndedWithoutPlaying(instance);
        }
        return instance;
      }
    } else {
      Logger.log('✅ Nothing left in queue');
    }
  }

  private _handleActiveVOStarted(instance: IAudioInstance) {
    this.onVoiceOverStart.emit(this.activeVO || instance);
  }

  private _handleActiveVOPaused(instance: IAudioInstance) {
    this.onVoiceOverPaused.emit(this.activeVO || instance);
  }

  private _handleActiveVOResumed(instance: IAudioInstance) {
    this.onVoiceOverResumed.emit(this.activeVO || instance);
  }

  private _handleActiveVOEndedWithoutPlaying(instance: IAudioInstance) {
    this.onVoiceOverComplete.emit(this.activeVO || instance);
    this.activeTimeout?.kill();
    this._currentItemCallback(false);
    this._queue.shift();
    this.playNext();
  }

  private _handleActiveVOEnded(instance: IAudioInstance) {
    this.onVoiceOverComplete.emit(this.activeVO || instance);
    this.activeTimeout?.kill();
    this._currentItemCallback();
    this._queue.shift();
    this.playNext();
  }

  private _currentItemCallback(didPlay: boolean = true) {
    const item = this._queue[0];
    if (!item) {
      return;
    }
    Logger.log(`🏁 Completed VO ${item.key}`);
    if (item.callback) {
      Logger.log(`'🎟 Firing callback for`, item.key);
      item.callback(didPlay);
    }
  }

  private onPause() {
    if (this.activeVO !== undefined && this.activeVO.isPlaying) {
      Logger.log('⏸ Pausing VO', this.activeVO.id);
      this.activeVO.pause();
      this.onVoiceOverComplete.emit(this.activeVO);
    }
    this.activeTimeout?.pause();
  }

  private onResume() {
    if (this.activeVO !== undefined && !this.activeVO.isPlaying) {
      Logger.log('⏯ Resuming VO', this.activeVO.id);
      this.activeVO.resume();
      this.onVoiceOverStart.emit(this.activeVO);
    }
    this.activeTimeout?.resume();
  }
}
