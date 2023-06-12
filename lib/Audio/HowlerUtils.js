export var Events;
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
})(Events || (Events = {}));
export var State;
(function (State) {
    State["UNLOADED"] = "unloaded";
    State["LOADING"] = "loading";
    State["LOADED"] = "loaded";
})(State || (State = {}));
//# sourceMappingURL=HowlerUtils.js.map