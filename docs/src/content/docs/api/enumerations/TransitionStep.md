---
editUrl: false
next: false
prev: false
title: "TransitionStep"
---

The possible steps in a state transition.

## Enumeration Members

### AnimCurrentOut

> **AnimCurrentOut**: `1`

Animates the current state out.

#### Source

[src/state/TransitionStep.ts:12](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L12)

***

### AnimNewIn

> **AnimNewIn**: `0`

Animates the new state in.

#### Source

[src/state/TransitionStep.ts:8](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L8)

***

### AnimSimultaneously

> **AnimSimultaneously**: `2`

Animate in the new state and animate out the old state simultaneously.

#### Source

[src/state/TransitionStep.ts:16](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L16)

***

### AttachNewBehind

> **AttachNewBehind**: `4`

Attach the new state behind all other states.

#### Source

[src/state/TransitionStep.ts:24](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L24)

***

### AttachNewInFront

> **AttachNewInFront**: `3`

Attach the new state in front of all other states.

#### Source

[src/state/TransitionStep.ts:20](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L20)

***

### Halt

> **Halt**: `12`

Halts the transition until further notice.

#### Source

[src/state/TransitionStep.ts:53](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L53)

***

### HideLoadScreen

> **HideLoadScreen**: `10`

Hides the current active load screen.

#### Source

[src/state/TransitionStep.ts:48](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L48)

***

### HideLoadScreenAndAnimnNewIn

> **HideLoadScreenAndAnimnNewIn**: `11`

#### Source

[src/state/TransitionStep.ts:49](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L49)

***

### LoadAssets

> **LoadAssets**: `6`

Loads assets required by the new state.

#### Source

[src/state/TransitionStep.ts:32](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L32)

***

### Pause1Second

> **Pause1Second**: `14`

Pauses transition for 1 second and continues afterward.

#### Source

[src/state/TransitionStep.ts:62](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L62)

***

### Pause5Seconds

> **Pause5Seconds**: `15`

Pauses transition for 5 seconds and continues afterward.

#### Source

[src/state/TransitionStep.ts:66](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L66)

***

### PauseAFrame

> **PauseAFrame**: `13`

Pauses transition for 0.1 seconds and continues afterward.

#### Todo

Relish GM => Figure out how to actually skip only one frame.

#### Source

[src/state/TransitionStep.ts:58](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L58)

***

### RemoveCurrent

> **RemoveCurrent**: `5`

Removes and destroys the current state.

#### Source

[src/state/TransitionStep.ts:28](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L28)

***

### ShowLoadScreen

> **ShowLoadScreen**: `9`

Show the current active load screen.

#### Source

[src/state/TransitionStep.ts:44](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L44)

***

### UnloadAssets

> **UnloadAssets**: `7`

Unloads assets required by the old state and not required by the new state.

#### Source

[src/state/TransitionStep.ts:36](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L36)

***

### UnloadUnusedAssets

> **UnloadUnusedAssets**: `8`

Copied from ULF and isn't currently used.

#### Source

[src/state/TransitionStep.ts:40](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/state/TransitionStep.ts#L40)
