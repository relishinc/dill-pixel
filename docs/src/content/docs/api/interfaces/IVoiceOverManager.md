---
editUrl: false
next: false
prev: false
title: "IVoiceOverManager"
---

## Properties

### FADE\_OUT\_DURATION

> **FADE\_OUT\_DURATION**: `number`

Duration, in milliseconds, of the fade out when stopping voiceovers. Must be greater than or equal to zero

#### Source

[src/audio/VoiceOverManager.ts:63](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L63)

***

### activeVO

> **activeVO**: `undefined` \| [`HowlerTrack`](/api/classes/howlertrack/)

The currently playing voiceover

#### Source

[src/audio/VoiceOverManager.ts:86](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L86)

***

### debug

> **debug**: `boolean`

#### Source

[src/audio/VoiceOverManager.ts:65](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L65)

***

### isPlaying

> **isPlaying**: `boolean`

Whether a voiceover is currently playing

#### Source

[src/audio/VoiceOverManager.ts:71](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L71)

***

### numInQueue

> **numInQueue**: `number`

Number of voiceovers in the queue

#### Source

[src/audio/VoiceOverManager.ts:76](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L76)

***

### queueIds

> **queueIds**: `string`[]

Ids of voiceovers in the queue

#### Source

[src/audio/VoiceOverManager.ts:81](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L81)

## Methods

### playVO()

#### playVO(key)

> **playVO**(`key`): `void`

Play a Voiceover or sequence of voiceovers

##### Parameters

• **key**: `string` \| (`string` \| `number`)[]

Id or array of voiceover Ids

##### Returns

`void`

##### Source

[src/audio/VoiceOverManager.ts:93](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L93)

#### playVO(key, mode)

> **playVO**(`key`, `mode`): `void`

Play a Voiceover or sequence of voiceovers

##### Parameters

• **key**: `string` \| (`string` \| `number`)[]

Id or array of voiceover Ids

• **mode**: [`PlayMode`](/api/enumerations/playmode/)

Audio interruption behaviour. Default is [PlayMode.Override](../../../../../../api/enumerations/playmode/#override)

##### Returns

`void`

##### Source

[src/audio/VoiceOverManager.ts:103](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L103)

#### playVO(key, callback)

> **playVO**(`key`, `callback`): `void`

Play a Voiceover or sequence of voiceovers

##### Parameters

• **key**: `string` \| (`string` \| `number`)[]

Id or array of voiceover Ids

• **callback**: `Callback`

Called after the last voiceover finishes playing, or immediately if no playback occurs

##### Returns

`void`

##### Source

[src/audio/VoiceOverManager.ts:110](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L110)

#### playVO(key, options)

> **playVO**(`key`, `options`): `void`

Play a Voiceover or sequence of voiceovers

##### Parameters

• **key**: `string` \| (`string` \| `number`)[]

Id or array of voiceover Ids

• **options**: `Partial`\<[`IPlayOptions`](/api/interfaces/iplayoptions/)\>

##### Returns

`void`

##### Source

[src/audio/VoiceOverManager.ts:119](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L119)

#### playVO(key, mode, callback)

> **playVO**(`key`, `mode`, `callback`): `void`

Play a Voiceover or sequence of voiceovers

##### Parameters

• **key**: `string` \| (`string` \| `number`)[]

Id or array of voiceover Ids

• **mode**: [`PlayMode`](/api/enumerations/playmode/)

Audio interruption behaviour. Default is [PlayMode.Override](../../../../../../api/enumerations/playmode/#override)

• **callback**: `Callback`

Called after the last voiceover finishes playing, or immediately if no playback occurs

##### Returns

`void`

##### Source

[src/audio/VoiceOverManager.ts:128](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L128)

***

### stopVO()

> **stopVO**(): `void`

Stop any currently playing VOs, and cancel any queued VOs.
Any callbacks (from [playVO](../../../../../../api/functions/playvo)) will not be called.

#### Returns

`void`

#### Source

[src/audio/VoiceOverManager.ts:134](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/VoiceOverManager.ts#L134)
