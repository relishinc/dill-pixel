import { Application } from '../core';
import { playCaption, stopCaption, voiceoverEnded, voiceoverStarted } from '../functions';
import { Signals } from '../signals';
import { LogUtils } from '../utils';
import * as AudioCategory from './AudioCategory';
import * as HowlerUtils from './HowlerUtils';
const BLACK = LogUtils.STYLE_BLACK;
const RED = LogUtils.STYLE_RED_BOLD;
const BLUE = LogUtils.STYLE_BLUE_BOLD;
export var PlayMode;
(function (PlayMode) {
    /** Play immediately if nothing else is playing, otherwise add to end of queue */
    PlayMode["Append"] = "append";
    /** Interrupt currently playing and queued VOs. This is the default PlayMode */
    PlayMode["Override"] = "override";
    /** Play immediately if nothing else is playing, otherwise don't play */
    PlayMode["New"] = "new";
})(PlayMode || (PlayMode = {}));
export function playVO(key, mode, callback) {
    Application.instance.voiceover.playVO(key, mode, callback);
}
export function stopVO() {
    Application.instance.voiceover.stopVO();
}
/**
 * Voiceover Manager controls voiceover audio playback and guarantees that only one voiceover will ever be playing at a time
 */
export class VoiceOverManager {
    constructor(app) {
        this.app = app;
        this.FADE_OUT_DURATION = 150;
        this.debug = false;
        this._queue = [];
        this.log = (m, ...params) => {
            if (this.debug) {
                LogUtils.log(m, { className: 'VoiceOverManager', color: 'salmon' }, ...params);
            }
        };
        this.warn = (m, ...params) => {
            LogUtils.logWarning(m, { className: 'VoiceOverManager', color: 'salmon' }, ...params);
        };
        this.error = (m, ...params) => LogUtils.logError(m, {
            className: 'VoiceOverManager',
            color: 'salmon',
        }, ...params);
        // TODO: Pause and unpause are not actually part of the framework
        this.onPause = this.onPause.bind(this);
        this.onResume = this.onResume.bind(this);
        Signals.pause.connect(this.onPause);
        Signals.unpause.connect(this.onResume);
    }
    get activeVO() {
        if (this._queue.length > 0 && this._queue[0].key) {
            return Application.instance.audio.getAudioTrack(this._queue[0].key, AudioCategory.VO);
        }
        return undefined;
    }
    playVO(key, mode, callback) {
        if (!Array.isArray(key)) {
            key = [key];
        }
        let skipCC = false;
        let priority = 0;
        let caption;
        let data;
        if (typeof mode === 'function') {
            callback = mode;
        }
        else if (typeof mode === 'object') {
            const modeAsIPlayOptions = mode;
            skipCC = modeAsIPlayOptions?.skipCC === true;
            priority = modeAsIPlayOptions?.priority || 0;
            callback = modeAsIPlayOptions?.callback;
            caption = modeAsIPlayOptions?.caption;
            mode = modeAsIPlayOptions?.mode;
            data = modeAsIPlayOptions?.data;
        }
        if (!(typeof mode === 'string')) {
            mode = PlayMode.Override;
        }
        this.log('🗣 Play VO requested. Key(s): [%c%s%c], Mode: %c%s%c, Priority: %c%s%c', RED, key.join(', '), BLACK, BLUE, mode, BLACK, BLUE, priority, BLACK);
        if (key.length === 1 &&
            this._queue.length === 1 &&
            this._queue[0].key === key[0] &&
            this.app.audio.getAudioTrack(key[0], AudioCategory.VO)?.isPlaying()) {
            this.warn('🔇 Skipped VO [%c%s%c] because it is already playing', RED, key[0], BLACK);
            if (callback) {
                callback(false);
            }
        }
        else if (this._queue.length === 0 ||
            (mode === PlayMode.Override && priority >= this._queue[0].priority) ||
            (mode === PlayMode.New && priority > this._queue[0].priority)) {
            this.stopVO();
            this.addToQueue(key, callback, skipCC, priority, caption, data);
            this.playNext();
        }
        else if (mode === PlayMode.Append) {
            this.addToQueue(key, callback, skipCC, priority, caption, data);
        }
        else if (callback) {
            this.warn('🎟🔇 Firing callback without playing VO(s) %c%s%c', RED, key.join(', '), BLACK);
            callback(false);
        }
        else {
            this.warn('🔇 Skipped VO(s) [%c%s%c] because it is lower priority than what was already playing', RED, key.join(', '), BLACK);
        }
    }
    stopVO() {
        const activeVO = this.activeVO;
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
            }
            else if (activeVO.isPlaying()) {
                this.log('🤫 Fading out VO %c%s%c (duration: %c%s%cms)', RED, activeVO.id, BLACK, BLUE, this.FADE_OUT_DURATION, BLACK);
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
            }
            else {
                activeVO.stop();
            }
            voiceoverEnded(activeVO.id);
        }
        clearTimeout(this._activeTimeout);
        this._activeTimeout = undefined;
    }
    addToQueue(keys, cb, skipCC, priority, caption, data) {
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (typeof key === 'number') {
                this.log('➕ Queueing delay %c%s%c', RED, key, BLACK);
            }
            else {
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
                data,
            });
        }
        const toLoad = keys.filter((it) => typeof it === 'string');
        this.log('📂 Loading VO(s) [%c%s%c]', RED, toLoad.join(', '), BLACK);
        Application.instance.audio.load(toLoad, AudioCategory.VO);
    }
    playNext() {
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
                }
                else {
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
            }
            else {
                const existing = Application.instance.audio.getAudioTrack(item.key, AudioCategory.VO);
                if (existing !== undefined) {
                    existing.off(HowlerUtils.Events.FADE);
                    if (existing.isPlaying()) {
                        this.warn('🛑 Stopping VO %c%s%c (no fade out)', RED, existing.id, BLACK);
                        existing.stop();
                        voiceoverEnded(item.key);
                    }
                }
                else {
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
                            playCaption({ id: item.caption.id, args: item.caption.args, data: item.data });
                        }
                        else {
                            playCaption({ id: item.key, data: item.data });
                        }
                    }
                    const onEnd = (pDidPlay) => {
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
                    }
                    else {
                        this.error('⚠️ Vo %c%s%c completed early (did not play?)', RED, item.key, BLACK);
                        onEnd(false);
                    }
                });
            }
        }
        else {
            this.log('✅ Nothing left in queue');
        }
    }
    onPause() {
        if (this.activeVO !== undefined && this.activeVO.getTimePos() > 0 && this.activeVO.isPlaying()) {
            this.log('⏸ Pausing VO %c%s%c', RED, this.activeVO.id, BLACK);
            this.activeVO.pause();
            voiceoverEnded(this.activeVO.id);
        }
        if (this._activeTimeout) {
            this._activeTimeout.pause();
        }
    }
    onResume() {
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
//# sourceMappingURL=VoiceOverManager.js.map