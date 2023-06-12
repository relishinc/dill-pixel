"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.Events = void 0;
var Events;
(function (Events) {
    Events["LOAD"] = "load";
    Events["LOAD_ERROR"] = "loaderror";
    Events["PLAY_ERROR"] = "playerror";
    Events["PLAY"] = "play";
    Events["END"] = "end";
    Events["PAUSE"] = "pause";
    Events["STOP"] = "stop";
    Events["MUTE"] = "mute";
    Events["VOLUME"] = "volume";
    Events["RATE"] = "rate";
    Events["SEEK"] = "seek";
    Events["FADE"] = "fade";
    Events["UNLOCK"] = "unlock";
})(Events = exports.Events || (exports.Events = {}));
var State;
(function (State) {
    State["UNLOADED"] = "unloaded";
    State["LOADING"] = "loading";
    State["LOADED"] = "loaded";
})(State = exports.State || (exports.State = {}));
//# sourceMappingURL=HowlerUtils.js.map