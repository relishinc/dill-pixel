import { CorePlugin } from '../../core/decorators';
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
  skipClosedCaptioning?: boolean;
  caption?: Caption;
  mode?: PlayMode;
  priority?: number;
  callback?: VoCallback;
}

interface IQueueItem extends IPlayVoiceOverOptions {
  key: string;
  delay?: number;
  timeout?: gsap.core.Tween;
}

export interface IVoiceOverManager extends IPlugin {
  fadeOutDuration: number;
  debug: boolean;
}

@CorePlugin
export class VoiceOverManager extends Plugin implements IVoiceOverManager {
  public readonly id = 'VoiceOverManager';
  public fadeOutDuration = 0.15;
  public debug = false;
  public onVoiceOverStart: Signal<(instance: IAudioInstance) => void> = new Signal<
    (instance: IAudioInstance) => void
  >();
  public onVoiceOverComplete: Signal<(instance: IAudioInstance) => void> = new Signal<
    (instance: IAudioInstance) => void
  >();
  private readonly _queue: IQueueItem[] = [];
  private readonly _pausedQueue: IQueueItem[] = [];
  private _paused: boolean = false;

  get activeTimeout(): gsap.core.Tween | undefined {
    return this._queue[0]?.timeout;
  }

  get activeVO(): IAudioInstance | undefined {
    if (this._queue.length > 0 && this._queue[0].key) {
      return this.app.audio.getAudioInstance(this._queue[0].key, 'voiceover') as IAudioInstance | undefined;
    }
    return undefined;
  }

  get paused() {
    return this._paused;
  }

  async initialize() {
    this.app.actions('pause').connect(this.onPause);
    this.app.actions('unpause').connect(this.onResume);
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
    let skipClosedCaptioning = false;
    let priority = 0;
    let caption;
    let mode: string | undefined = 'override';
    if (typeof modeOrCallbackOrOptions === 'function') {
      callback = modeOrCallbackOrOptions;
    } else if (typeof modeOrCallbackOrOptions === 'object') {
      const modeAsOptions = modeOrCallbackOrOptions as IPlayVoiceOverOptions;
      skipClosedCaptioning = modeAsOptions.skipClosedCaptioning === true;
      priority = modeAsOptions.priority || 0;
      callback = modeAsOptions.callback;
      caption = modeAsOptions.caption;
      mode = modeAsOptions.mode;
    }
    if (typeof modeOrCallbackOrOptions === 'string') {
      mode = modeOrCallbackOrOptions;
    }

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
      this.addToQueue(key, callback, skipClosedCaptioning, priority, caption);
      return this.playNext();
    } else if (mode === 'append') {
      this.addToQueue(key, callback, skipClosedCaptioning, priority, caption);
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
    if (this._queue.length > 1) {
      Logger.log(`🗑 Clearing VO queue. Length was: ${this._queue.length}`);
    }
    this._queue.splice(0, this._queue.length);
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
    }
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
      if (activeVO) {
        this.onVoiceOverComplete.emit(activeVO);
      }
    }
  }

  resumeVO() {
    if (!this._paused) return;
    this._paused = false;
    this.stopVO();
    if (this._pausedQueue.length > 0) {
      this._queue.push(...this._pausedQueue);
      this._pausedQueue.splice(0, this._pausedQueue.length);
      const activeVO = this.activeVO;
      const activeTimeout = this.activeTimeout;
      activeVO?.play();
      activeTimeout?.resume();
      if (activeVO) {
        this.onVoiceOverStart.emit(activeVO);
      }
    }
  }

  private addToQueue(
    keys: VoKey[],
    cb?: VoCallback,
    skipClosedCaptioning?: boolean,
    priority?: number,
    caption?: Caption,
  ) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (typeof key === 'number') {
        Logger.log(`➕ Queueing delay ${key}`);
      } else {
        Logger.log(`➕ Queueing VO ${key}`);
      }

      // if calling playVO with captions param set, set skipCC to true for all but the first item in the array
      if (caption !== undefined && i !== 0) {
        skipClosedCaptioning = true;
      }

      this._queue.push({
        key: typeof key === 'string' ? key : '',
        delay: typeof key === 'number' ? key : undefined,
        callback: i === keys.length - 1 ? cb : undefined,
        skipClosedCaptioning,
        priority,
        caption,
      });
    }
    const toLoad = keys.filter((it) => typeof it === 'string') as string[];
    Logger.log(`📂 Loading VO(s) ${toLoad.join(', ')}`);
    this.app.audio.load(toLoad, 'vo');
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
        const instance = this.app.audio.play(item.key, 'voiceover');
        if (this._queue[0] !== item) {
          return;
        }
        Logger.log(`▶️▶️ Playing VO ${item.key}`);
        Logger.log('ℹ️ Queue length:', this._queue.length);

        const onEnd = (pDidPlay: boolean) => {
          Logger.log(`🏁 Completed VO ${item.key}`);
          this.onVoiceOverComplete.emit(this.activeVO!);
          this.activeTimeout?.kill();
          this._queue.shift();
          this.playNext();
          if (item.callback) {
            Logger.log(`'🎟 Firing callback for`, item.key);
            item.callback(pDidPlay);
          }
        };
        if (this.activeVO) {
          this.activeVO.onEnd.connectOnce(() => onEnd(true));
          this.activeVO.onStart.connectOnce(() => {
            this.onVoiceOverStart.emit(this.activeVO!);
          });
        } else {
          Logger.error('⚠️ Vo %c%s%c completed early (did not play?)', item.key);
          onEnd(false);
        }
        return instance;
      }
    } else {
      Logger.log('✅ Nothing left in queue');
    }
  }

  private onPause() {
    if (this.activeVO !== undefined && this.activeVO.media.progress > 0 && this.activeVO.isPlaying) {
      Logger.log('⏸ Pausing VO', this.activeVO.id);
      this.activeVO.pause();
      this.onVoiceOverComplete.emit(this.activeVO);
    }
    this.activeTimeout?.pause();
  }

  private onResume() {
    if (this.activeVO !== undefined && this.activeVO.media.progress > 0 && !this.activeVO.isPlaying) {
      Logger.log('⏯ Resuming VO', this.activeVO.id);
      this.activeVO.play();
      this.onVoiceOverStart.emit(this.activeVO);
    }
    this.activeTimeout?.resume();
  }
}
