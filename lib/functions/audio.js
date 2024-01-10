import { Signals } from '../signals';
export function playAudio(token) {
    Signals.playAudio.emit(token);
}
export function loadAudio(opts) {
    Signals.loadAudio.emit(opts);
}
export function stopAudio(id) {
    Signals.stopAudio.emit(id);
}
export function audioLoadError(opts) {
    Signals.audioLoadError.emit(opts);
}
// convenience methods for caption / voiceover signals
export function playCaption(opts) {
    Signals.playCaption.emit(opts);
}
export function stopCaption(opts) {
    Signals.stopCaption.emit(opts);
}
export function voiceoverStarted(key) {
    Signals.voiceoverStarted.emit(key);
}
export function voiceoverEnded(key) {
    Signals.voiceoverEnded.emit(key);
}
//# sourceMappingURL=audio.js.map