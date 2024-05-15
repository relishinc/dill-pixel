---
editUrl: false
next: false
prev: false
title: "Signals"
---

## Constructors

### new Signals()

> **new Signals**(): [`Signals`](/api/classes/signals/)

#### Returns

[`Signals`](/api/classes/signals/)

## Properties

### audioContextSuspendedError

> `static` **audioContextSuspendedError**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:68](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L68)

***

### audioLoadError

> `static` **audioLoadError**: `Signal`\<(`opts`) => `void`\>

#### Source

[src/signals/Signals.ts:69](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L69)

***

### changeLanguage

> `static` **changeLanguage**: `Signal`\<(`languageId`) => `void`\>

#### Source

[src/signals/Signals.ts:93](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L93)

***

### clearFocus

> `static` **clearFocus**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:26](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L26)

***

### clearNeighbours

> `static` **clearNeighbours**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:29](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L29)

***

### dragBegin

> `static` **dragBegin**: `Signal`\<(`draggable`) => `void`\>

#### Source

[src/signals/Signals.ts:85](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L85)

***

### dragEnd

> `static` **dragEnd**: `Signal`\<(`draggable`) => `void`\>

#### Source

[src/signals/Signals.ts:86](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L86)

***

### draggableDeselected

> `static` **draggableDeselected**: `Signal`\<(`draggable`) => `void`\>

#### Source

[src/signals/Signals.ts:84](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L84)

***

### draggableSelected

> `static` **draggableSelected**: `Signal`\<(`draggable`) => `void`\>

#### Source

[src/signals/Signals.ts:83](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L83)

***

### forceFocus

> `static` **forceFocus**: `Signal`\<(`focusable`) => `void`\>

#### Source

[src/signals/Signals.ts:27](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L27)

***

### forceNeighbours

> `static` **forceNeighbours**: `Signal`\<(`token`) => `void`\>

#### Source

[src/signals/Signals.ts:28](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L28)

***

### getKeyboardStatus

> `static` **getKeyboardStatus**: `Signal`\<(`handler`) => `void`\>

#### Source

[src/signals/Signals.ts:33](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L33)

***

### hideAllPopups

> `static` **hideAllPopups**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:17](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L17)

***

### hideLoadScreen

> `static` **hideLoadScreen**: `Signal`\<(`data`) => `void`\>

#### Source

[src/signals/Signals.ts:45](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L45)

***

### hidePopup

> `static` **hidePopup**: `Signal`\<(`id`) => `void`\>

#### Source

[src/signals/Signals.ts:15](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L15)

***

### hidePopupComplete

> `static` **hidePopupComplete**: `Signal`\<(`popup`) => `void`\>

#### Source

[src/signals/Signals.ts:18](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L18)

***

### hideTopMostPopup

> `static` **hideTopMostPopup**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:16](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L16)

***

### initState

> `static` **initState**: `Signal`\<(`data`?) => `void`\>

#### Source

[src/signals/Signals.ts:40](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L40)

***

### keyboardFocusBegin

> `static` **keyboardFocusBegin**: `Signal`\<(`focusable`) => `void`\>

#### Source

[src/signals/Signals.ts:35](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L35)

***

### keyboardFocusEnd

> `static` **keyboardFocusEnd**: `Signal`\<(`focusable`) => `void`\>

#### Source

[src/signals/Signals.ts:36](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L36)

***

### keyboardReFocus

> `static` **keyboardReFocus**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:34](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L34)

***

### loadAssets

> `static` **loadAssets**: `Signal`\<(`token`) => `void`\>

#### Source

[src/signals/Signals.ts:52](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L52)

***

### loadAudio

> `static` **loadAudio**: `Signal`\<(`opts`) => `void`\>

#### Source

[src/signals/Signals.ts:66](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L66)

***

### loadAudioFromAssetMap

> `static` **loadAudioFromAssetMap**: `Signal`\<(`opts`) => `void`\>

#### Source

[src/signals/Signals.ts:54](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L54)

***

### loadComplete

> `static` **loadComplete**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:58](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L58)

***

### loadScreenHidden

> `static` **loadScreenHidden**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:57](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L57)

***

### loadState

> `static` **loadState**: `Signal`\<(`token`) => `void`\>

#### Source

[src/signals/Signals.ts:39](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L39)

***

### onAudioCategoryVolumeChanged

> `static` **onAudioCategoryVolumeChanged**: `Signal`\<(`detail`) => `void`\>

#### Source

[src/signals/Signals.ts:72](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L72)

***

### onLanguageChanged

> `static` **onLanguageChanged**: `Signal`\<(`languageId`) => `void`\>

#### Source

[src/signals/Signals.ts:94](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L94)

***

### onResize

> `static` **onResize**: `Signal`\<(`size`) => `void`\>

#### Source

[src/signals/Signals.ts:11](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L11)

***

### orientationLandscape

> `static` **orientationLandscape**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:62](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L62)

***

### orientationPortrait

> `static` **orientationPortrait**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:61](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L61)

***

### pause

> `static` **pause**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:89](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L89)

***

### playAudio

> `static` **playAudio**: `Signal`\<(`token`) => `void`\>

#### Source

[src/signals/Signals.ts:65](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L65)

***

### playCaption

> `static` **playCaption**: `Signal`\<(`opts`) => `void`\>

#### Source

[src/signals/Signals.ts:77](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L77)

***

### popKeyboardLayer

> `static` **popKeyboardLayer**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:31](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L31)

***

### pushKeyboardLayer

> `static` **pushKeyboardLayer**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:30](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L30)

***

### registerFocusable

> `static` **registerFocusable**: `Signal`\<(`focusable`) => `void`\>

#### Source

[src/signals/Signals.ts:21](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L21)

***

### registerFocusables

> `static` **registerFocusables**: `Signal`\<(`focusables`) => `void`\>

#### Source

[src/signals/Signals.ts:22](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L22)

***

### setKeyboardEnabled

> `static` **setKeyboardEnabled**: `Signal`\<(`enabled`) => `void`\>

#### Source

[src/signals/Signals.ts:32](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L32)

***

### showLoadScreen

> `static` **showLoadScreen**: `Signal`\<(`opts`) => `void`\>

#### Source

[src/signals/Signals.ts:41](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L41)

***

### showPopup

> `static` **showPopup**: `Signal`\<(`token`) => `void`\>

#### Source

[src/signals/Signals.ts:14](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L14)

***

### stateTransitionComplete

> `static` **stateTransitionComplete**: `Signal`\<(`id`) => `void`\>

#### Source

[src/signals/Signals.ts:49](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L49)

***

### stateTransitionHalted

> `static` **stateTransitionHalted**: `Signal`\<(`token`) => `void`\>

#### Source

[src/signals/Signals.ts:47](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L47)

***

### stateTransitionStart

> `static` **stateTransitionStart**: `Signal`\<(`id`) => `void`\>

#### Source

[src/signals/Signals.ts:48](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L48)

***

### stopAudio

> `static` **stopAudio**: `Signal`\<(`id`) => `void`\>

#### Source

[src/signals/Signals.ts:67](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L67)

***

### stopCaption

> `static` **stopCaption**: `Signal`\<(`opts`) => `void`\>

#### Source

[src/signals/Signals.ts:78](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L78)

***

### unloadAssets

> `static` **unloadAssets**: `Signal`\<(`token`) => `void`\>

#### Source

[src/signals/Signals.ts:53](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L53)

***

### unpause

> `static` **unpause**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:90](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L90)

***

### unregisterAllFocusables

> `static` **unregisterAllFocusables**: `Signal`\<() => `void`\>

#### Source

[src/signals/Signals.ts:25](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L25)

***

### unregisterFocusable

> `static` **unregisterFocusable**: `Signal`\<(`focusable`) => `void`\>

#### Source

[src/signals/Signals.ts:23](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L23)

***

### unregisterFocusables

> `static` **unregisterFocusables**: `Signal`\<(`focusables`) => `void`\>

#### Source

[src/signals/Signals.ts:24](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L24)

***

### voiceoverEnded

> `static` **voiceoverEnded**: `Signal`\<(`key`) => `void`\>

#### Source

[src/signals/Signals.ts:80](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L80)

***

### voiceoverStarted

> `static` **voiceoverStarted**: `Signal`\<(`key`) => `void`\>

#### Source

[src/signals/Signals.ts:79](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/signals/Signals.ts#L79)
