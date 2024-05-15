---
editUrl: false
next: false
prev: false
title: "VoiceOverManager"
---

Voiceover Manager controls voiceover audio playback and guarantees that only one voiceover will ever be playing at a time

## Implements

- [`IVoiceOverManager`](/api/interfaces/ivoiceovermanager/)

## Constructors

### new VoiceOverManager()

> **new VoiceOverManager**(`app`): [`VoiceOverManager`](/api/classes/voiceovermanager/)

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`VoiceOverManager`](/api/classes/voiceovermanager/)

#### Source

[src/audio/VoiceOverManager.ts:166](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/VoiceOverManager.ts#L166)

## Properties

### FADE\_OUT\_DURATION

> **FADE\_OUT\_DURATION**: `number` = `150`

Duration, in milliseconds, of the fade out when stopping voiceovers. Must be greater than or equal to zero

#### Implementation of

[`IVoiceOverManager`](/api/interfaces/ivoiceovermanager/).[`FADE_OUT_DURATION`](/api/interfaces/ivoiceovermanager/#fade_out_duration)

#### Source

[src/audio/VoiceOverManager.ts:141](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/VoiceOverManager.ts#L141)

***

### debug

> **debug**: `boolean` = `false`

#### Implementation of

[`IVoiceOverManager`](/api/interfaces/ivoiceovermanager/).[`debug`](/api/interfaces/ivoiceovermanager/#debug)

#### Source

[src/audio/VoiceOverManager.ts:143](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/VoiceOverManager.ts#L143)

## Accessors

### activeVO

> `get` **activeVO**(): `undefined` \| [`HowlerTrack`](/api/classes/howlertrack/)

The currently playing voiceover

#### Returns

`undefined` \| [`HowlerTrack`](/api/classes/howlertrack/)

#### Source

[src/audio/VoiceOverManager.ts:175](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/VoiceOverManager.ts#L175)

***

### isPlaying

> `get` **isPlaying**(): `boolean`

Whether a voiceover is currently playing

#### Returns

`boolean`

#### Source

[src/audio/VoiceOverManager.ts:182](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/VoiceOverManager.ts#L182)

***

### numInQueue

> `get` **numInQueue**(): `number`

Number of voiceovers in the queue

#### Returns

`number`

#### Source

[src/audio/VoiceOverManager.ts:186](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/VoiceOverManager.ts#L186)

***

### queueIds

> `get` **queueIds**(): `string`[]

Ids of voiceovers in the queue

#### Returns

`string`[]

#### Source

[src/audio/VoiceOverManager.ts:190](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/VoiceOverManager.ts#L190)

## Methods

### playVO()

> **playVO**(`key`, `mode`?, `callback`?): `void`

Play a Voiceover or sequence of voiceovers

#### Parameters

• **key**: `string` \| (`string` \| `number`)[]

Id or array of voiceover Ids

• **mode?**: [`PlayMode`](/api/enumerations/playmode/) \| `Callback` \| [`IPlayOptions`](/api/interfaces/iplayoptions/)

• **callback?**: `Callback`

#### Returns

`void`

#### Implementation of

[`IVoiceOverManager`](/api/interfaces/ivoiceovermanager/).[`playVO`](/api/interfaces/ivoiceovermanager/#playvo)

#### Source

[src/audio/VoiceOverManager.ts:194](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/VoiceOverManager.ts#L194)

***

### stopVO()

> **stopVO**(): `void`

Stop any currently playing VOs, and cancel any queued VOs.
Any callbacks (from [playVO](../../../../../../api/functions/playvo)) will not be called.

#### Returns

`void`

#### Implementation of

[`IVoiceOverManager`](/api/interfaces/ivoiceovermanager/).[`stopVO`](/api/interfaces/ivoiceovermanager/#stopvo)

#### Source

[src/audio/VoiceOverManager.ts:268](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/VoiceOverManager.ts#L268)
