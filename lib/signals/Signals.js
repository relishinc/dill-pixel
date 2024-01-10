import { Signal } from 'typed-signals';
export class Signals {
    // resize signal
    static { this.onResize = new Signal(); }
    // popup signals
    static { this.showPopup = new Signal(); }
    static { this.hidePopup = new Signal(); }
    static { this.hideTopMostPopup = new Signal(); }
    static { this.hideAllPopups = new Signal(); }
    static { this.hidePopupComplete = new Signal(); }
    // keyboard signals
    static { this.registerFocusable = new Signal(); }
    static { this.registerFocusables = new Signal(); }
    static { this.unregisterFocusable = new Signal(); }
    static { this.unregisterFocusables = new Signal(); }
    static { this.unregisterAllFocusables = new Signal(); }
    static { this.clearFocus = new Signal(); }
    static { this.forceFocus = new Signal(); }
    static { this.forceNeighbours = new Signal(); }
    static { this.clearNeighbours = new Signal(); }
    static { this.pushKeyboardLayer = new Signal(); }
    static { this.popKeyboardLayer = new Signal(); }
    static { this.setKeyboardEnabled = new Signal(); }
    static { this.getKeyboardStatus = new Signal(); }
    static { this.keyboardReFocus = new Signal(); }
    static { this.keyboardFocusBegin = new Signal(); }
    static { this.keyboardFocusEnd = new Signal(); }
    // state manager signals
    static { this.loadState = new Signal(); }
    static { this.initState = new Signal(); }
    static { this.showLoadScreen = new Signal(); }
    static { this.hideLoadScreen = new Signal(); }
    static { this.stateTransitionHalted = new Signal(); }
    // load manager signals
    static { this.loadAssets = new Signal(); }
    static { this.unloadAssets = new Signal(); }
    static { this.loadAudioFromAssetMap = new Signal(); }
    static { this.loadScreenHidden = new Signal(); }
    static { this.loadComplete = new Signal(); }
    // orientation manager signals
    static { this.orientationPortrait = new Signal(); }
    static { this.orientationLandscape = new Signal(); }
    // audio manager signals
    static { this.playAudio = new Signal(); }
    static { this.loadAudio = new Signal(); }
    static { this.stopAudio = new Signal(); }
    static { this.audioLoadError = new Signal(); }
    // caption / voiceover signals
    static { this.playCaption = new Signal(); }
    static { this.stopCaption = new Signal(); }
    static { this.voiceoverStarted = new Signal(); }
    static { this.voiceoverEnded = new Signal(); }
    // draggable signals
    static { this.draggableSelected = new Signal(); }
    static { this.draggableDeselected = new Signal(); }
    static { this.dragBegin = new Signal(); }
    static { this.dragEnd = new Signal(); }
    // pause / unpause
    static { this.pause = new Signal(); }
    static { this.unpause = new Signal(); }
    // language signals
    static { this.changeLanguage = new Signal(); }
    static { this.onLanguageChanged = new Signal(); }
}
//# sourceMappingURL=Signals.js.map