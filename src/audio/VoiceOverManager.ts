import { Application } from '../core';
import { playCaption, stopCaption, voiceoverEnded, voiceoverStarted } from '../functions';
import { Signals } from '../signals';
import { LogUtils } from '../utils';
import * as AudioCategory from './AudioCategory';
import { HowlerTrack } from './HowlerTrack';
import * as HowlerUtils from './HowlerUtils';

const BLACK = LogUtils.STYLE_BLACK;
const RED = LogUtils.STYLE_RED_BOLD;
const BLUE = LogUtils.STYLE_BLUE_BOLD;

type Callback = (pDidPlay: boolean) => void;

export enum PlayMode {
  /** Play immediately if nothing else is playing, otherwise add to end of queue */
  Append = 'append',
  /** Interrupt currently playing and queued VOs. This is the default PlayMode */
  Override = 'override',
  /** Play immediately if nothing else is playing, otherwise don't play */
  New = 'new',
}

export interface IPlayOptions {
  /** If true, do not trigger the {@link Signals.playCaption} signal */
  skipCC?: boolean;
  /** Override the data that is sent to the {@link Signals.playCaption} signal */
  caption?: {
    id: string;
    args: { [key: string]: string };
  };
  /** Audio interruption behaviour */
  mode?: PlayMode;
  /** For fine-grained control, higher priority VOs will interrupt lower-priority ones */
  priority?: number;
  /** Callback when the voiceover completes playing or if the play request is rejected.
   * Not called, however, when the VO is stopped or interrupted by another VO.
   */
  callback?: Callback;
}

interface IQueueItem extends IPlayOptions {
  key: string;
  delay?: number;
}

export function playVO(
  key: string | (string | number)[],
  mode?: PlayMode | Callback | IPlayOptions,
  callback?: Callback,
) {
  Application.instance.voiceover.playVO(key, mode as any, callback as any);
}

export function stopVO(): void {
  Application.instance.voiceover.stopVO();
}

export interface IVoiceOverManager {
  /** Duration, in milliseconds, of the fade out when stopping voiceovers. Must be greater than or equal to zero */
  FADE_OUT_DURATION: number;

  debug: boolean;

  // tslint:disable: unified-signatures
  // 1 param
  /**
   * Play a Voiceover or sequence of voiceovers
   * @param key Id or array of voiceover Ids
   */
  playVO(key: string | (string | number)[]): void;

  // 2 params
  /**
   * Play a Voiceover or sequence of voiceovers
   * @param key Id or array of voiceover Ids
   * @param mode Audio interruption behaviour. Default is {@link PlayMode.Override}
   */
  playVO(key: string | (string | number)[], mode: PlayMode): void;

  /**
   * Play a Voiceover or sequence of voiceovers
   * @param key Id or array of voiceover Ids
   * @param callback Called after the last voiceover finishes playing, or immediately if no playback occurs
   */
  playVO(key: string | (string | number)[], callback: Callback): void;

  /**
   * Play a Voiceover or sequence of voiceovers
   * @param key Id or array of voiceover Ids
   * @param options
   * @param options.mode Audio interruption behaviour. Default is {@link PlayMode.Override}
   * @param options.cb Called after the last voiceover finishes playing, or immediately if no playback occurs
   */
  playVO(key: string | (string | number)[], options: IPlayOptions): void;

  // 3 params
  /**
   * Play a Voiceover or sequence of voiceovers
   * @param key Id or array of voiceover Ids
   * @param mode Audio interruption behaviour. Default is {@link PlayMode.Override}
   * @param callback Called after the last voiceover finishes playing, or immediately if no playback occurs
   */
  playVO(key: string | (string | number)[], mode: PlayMode, callback: Callback): void;

  // tslint:enable: unified-signatures

  /**
   * Stop any currently playing VOs, and cancel any queued VOs.
   * Any callbacks (from {@link playVO}) will not be called.
   */
  stopVO(): void;
}

/**
 * Voiceover Manager controls voiceover audio playback and guarantees that only one voiceover will ever be playing at a time
 */
export class VoiceOverManager implements IVoiceOverManager {
  public FADE_OUT_DURATION: number = 150;

  public debug: boolean = false;

  private readonly _queue: IQueueItem[] = [];

  private _activeTimeout?: any;
  private log = (m: string, ...params: any[]) => {
    if (this.debug) {
      LogUtils.log(m, { className: 'VoiceOverManager', color: 'salmon' }, ...params);
    }
  };
  private warn = (m: string, ...params: any[]) => {
    LogUtils.logWarning(m, { className: 'VoiceOverManager', color: 'salmon' }, ...params);
  };
  private error = (m: string, ...params: any[]) =>
    LogUtils.logError(
      m,
      {
        className: 'VoiceOverManager',
        color: 'salmon',
      },
      ...params,
    );

  constructor(private app: Application) {
    // TODO: Pause and unpause are not actually part of the framework
    this.onPause = this.onPause.bind(this);
    this.onResume = this.onResume.bind(this);

    Signals.pause.connect(this.onPause);
    Signals.unpause.connect(this.onResume);
  }

  private get activeVO(): HowlerTrack | undefined {
    if (this._queue.length > 0 && this._queue[0].key) {
      return Application.instance.audio.getAudioTrack(this._queue[0].key, AudioCategory.VO) as HowlerTrack | undefined;
    }
    return undefined;
  }

  public playVO(key: string | (string | number)[], mode?: PlayMode | Callback | IPlayOptions, callback?: Callback) {
    if (!Array.isArray(key)) {
      key = [key];
    }
    let skipCC = false;
    let priority = 0;
    let caption;
    if (typeof mode === 'function') {
      callback = mode;
    } else if (typeof mode === 'object') {
      skipCC = mode.skipCC === true;
      priority = mode.priority || 0;
      callback = mode.callback;
      caption = mode.caption;
      mode = mode.mode;
    }
    if (!(typeof mode === 'string')) {
      mode = PlayMode.Override;
    }

    this.log(
      '🗣 Play VO requested. Key(s): [%c%s%c], Mode: %c%s%c, Priority: %c%s%c',
      RED,
      key.join(', '),
      BLACK,
      BLUE,
      mode,
      BLACK,
      BLUE,
      priority,
      BLACK,
    );

    if (key.length === 1 && this._queue.length === 1 && this._queue[0].key === key[0]) {
      this.warn('🔇 Skipped VO [%c%s%c] because it is already playing', RED, key[0], BLACK);
      if (callback) {
        callback(false);
      }
    } else if (
      this._queue.length === 0 ||
      (mode === PlayMode.Override && priority >= this._queue[0].priority!) ||
      (mode === PlayMode.New && priority > this._queue[0].priority!)
    ) {
      this.stopVO();
      this.addToQueue(key, callback, skipCC, priority, caption);
      this.playNext();
    } else if (mode === PlayMode.Append) {
      this.addToQueue(key, callback, skipCC, priority, caption);
    } else if (callback) {
      this.warn('🎟🔇 Firing callback without playing VO(s) %c%s%c', RED, key.join(', '), BLACK);
      callback(false);
    } else {
      this.warn(
        '🔇 Skipped VO(s) [%c%s%c] because it is lower priority than what was already playing',
        RED,
        key.join(', '),
        BLACK,
      );
    }
  }

  public stopVO(): void {
    const activeVO: HowlerTrack | undefined = this.activeVO;
    const activeItem = this._queue[0];
    if (this._queue.length > 1) {
      this.log('🗑 Clearing VO queue. Length was: %c%s%c', BLUE, this._queue.length, BLACK);
    }
    this._queue.splice(0, this._queue.length);
    if (activeVO) {
      activeVO.off(HowlerUtils.Events.END);
      if (activeVO.getSource().state() === HowlerUtils.State.LOADING) {
        this.warn('🛑 Stopping VO %c%s%c while it is still loading', RED, activeVO.id, BLACK);
        activeVO.stop();
      } else if (activeVO.isPlaying()) {
        this.log(
          '🤫 Fading out VO %c%s%c (duration: %c%s%cms)',
          RED,
          activeVO.id,
          BLACK,
          BLUE,
          this.FADE_OUT_DURATION,
          BLACK,
        );
        activeVO.fadeTo(0, this.FADE_OUT_DURATION);
        activeVO.off(HowlerUtils.Events.END);
        activeVO.once(HowlerUtils.Events.FADE, () => {
          this.log('😶 Fade out complete %c%s%c', RED, activeVO.id, BLACK);
          activeVO.stop();
        });
        if (activeItem && !activeItem.skipCC) {
          // TODO: Captions are not actually part of the framework
          stopCaption({ id: activeVO.id });
        }
      } else {
        activeVO.stop();
      }
      voiceoverEnded(activeVO.id);
    }
    clearTimeout(this._activeTimeout);
    this._activeTimeout = undefined;
  }

  private addToQueue(
    keys: (string | number)[],
    cb?: Callback,
    skipCC?: boolean,
    priority?: number,
    caption?: {
      id: string;
      args: { [key: string]: string };
    },
  ) {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (typeof key === 'number') {
        this.log('➕ Queueing delay %c%s%c', RED, key, BLACK);
      } else {
        this.log('➕ Queueing VO %c%s%c', RED, key, BLACK);
      }

      // if calling playVO with captions param set, set skipCC to true for all but the first item in the array
      if (caption !== undefined && i !== 0) {
        skipCC = true;
      }

      this._queue.push({
        key: typeof key === 'string' ? key : '',
        delay: typeof key === 'number' ? key : undefined,
        callback: i === keys.length - 1 ? cb : undefined,
        skipCC,
        priority,
        caption,
      });
    }
    const toLoad = keys.filter((it) => typeof it === 'string') as string[];
    this.log('📂 Loading VO(s) [%c%s%c]', RED, toLoad.join(', '), BLACK);
    Application.instance.audio.load(toLoad, AudioCategory.VO);
  }

  private playNext() {
    if (this._queue.length > 0) {
      const item = this._queue[0];

      if (item.delay !== undefined) {
        clearTimeout(this._activeTimeout);
        if (this._queue.length === 1) {
          // skip delay if last item in queue
          this.log('⌛ Skipping delay because there are no more items in queue');
          this._activeTimeout = undefined;
          this._queue.shift();
          if (item.callback) {
            item.callback(true);
          }
          this.playNext();
        } else {
          this.log('⏳ Waiting %s seconds before next VO', item.delay);
          this._activeTimeout = setTimeout(() => {
            this._activeTimeout = undefined;
            this._queue.shift();
            if (item.callback) {
              item.callback(true);
            }
            this.playNext();
          }, item.delay * 1000);
        }
      } else {
        const existing = Application.instance.audio.getAudioTrack(item.key, AudioCategory.VO);
        if (existing !== undefined) {
          existing.off(HowlerUtils.Events.FADE);
          if (existing.isPlaying()) {
            this.warn('🛑 Stopping VO %c%s%c (no fade out)', RED, existing.id, BLACK);
            existing.stop();
            voiceoverEnded(item.key);
          }
        } else {
          this.log('📂 Loading VO %c%s%c', RED, item.key, BLACK);
        }
        Application.instance.audio.load(item.key, AudioCategory.VO, () => {
          if (this._queue[0] !== item) {
            return;
          }
          this.log('▶️▶️ Playing VO %c%s%c', RED, item.key, BLACK);
          this.log('ℹ️ Queue length: %c%s%c', BLUE, this._queue.length, BLACK);
          Application.instance.audio.play(item.key, undefined, false, AudioCategory.VO);
          if (!item.skipCC) {
            // TODO: Captions are not actually part of the framework
            if (item.caption) {
              playCaption({ id: item.caption.id, args: item.caption.args });
            } else {
              playCaption({ id: item.key });
            }
          }
          const onEnd = (pDidPlay: boolean) => {
            this.log('🏁 Completed VO %c%s%c', RED, item.key, BLACK);
            voiceoverEnded(item.key);
            this._queue.shift();
            if (this._activeTimeout) {
              this._activeTimeout.kill();
              this._activeTimeout = undefined;
            }
            this.playNext();
            if (item.callback) {
              this.log('🎟 Firing callback for %c%s%c', RED, item.key, BLACK);
              item.callback(pDidPlay);
            }
          };
          if (this.activeVO) {
            // TODO: can we keep this decoupled from Howler and only use IAudioTrack?
            // TODO: Some devices cannot recognize VO duration, the END event is not reliable
            this.activeVO.once(HowlerUtils.Events.END, () => onEnd(true));
            this.activeVO.once(HowlerUtils.Events.PLAY, () => {
              voiceoverStarted(item.key);
            });
          } else {
            this.error('⚠️ Vo %c%s%c completed early (did not play?)', RED, item.key, BLACK);
            onEnd(false);
          }
        });
      }
    } else {
      this.log('✅ Nothing left in queue');
    }
  }

  private onPause() {
    if (this.activeVO !== undefined && this.activeVO.getTimePos() > 0 && this.activeVO.isPlaying()) {
      this.log('⏸ Pausing VO %c%s%c', RED, this.activeVO.id, BLACK);
      this.activeVO.pause();
      voiceoverEnded(this.activeVO.id);
    }
    if (this._activeTimeout) {
      this._activeTimeout.pause();
    }
  }

  private onResume() {
    if (this.activeVO !== undefined && this.activeVO.getTimePos() > 0 && !this.activeVO.isPlaying()) {
      this.log('⏯ Resuming VO %c%s%c', RED, this.activeVO.id, BLACK);
      this.activeVO.play();
      voiceoverStarted(this.activeVO.id);
    }
    if (this._activeTimeout) {
      this._activeTimeout.resume();
    }
  }
}
