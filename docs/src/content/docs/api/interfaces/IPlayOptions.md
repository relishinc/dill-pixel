---
editUrl: false
next: false
prev: false
title: "IPlayOptions"
---

## Properties

### callback?

> `optional` **callback**: `Callback`

Callback when the voiceover completes playing or if the play request is rejected.
Not called, however, when the VO is stopped or interrupted by another VO.

#### Source

[src/audio/VoiceOverManager.ts:39](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/VoiceOverManager.ts#L39)

***

### caption?

> `optional` **caption**: `object`

Override the data that is sent to the [Signals.playCaption](../../../../../../api/classes/signals/#playcaption) signal

#### args

> **args**: `object`

##### Index signature

 \[`key`: `string`\]: `string`

#### id

> **id**: `string`

#### Source

[src/audio/VoiceOverManager.ts:28](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/VoiceOverManager.ts#L28)

***

### data?

> `optional` **data**: `any`

#### Source

[src/audio/VoiceOverManager.ts:41](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/VoiceOverManager.ts#L41)

***

### mode?

> `optional` **mode**: [`PlayMode`](/api/enumerations/playmode/)

Audio interruption behaviour

#### Source

[src/audio/VoiceOverManager.ts:33](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/VoiceOverManager.ts#L33)

***

### priority?

> `optional` **priority**: `number`

For fine-grained control, higher priority VOs will interrupt lower-priority ones

#### Source

[src/audio/VoiceOverManager.ts:35](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/VoiceOverManager.ts#L35)

***

### skipCC?

> `optional` **skipCC**: `boolean`

If true, do not trigger the [Signals.playCaption](../../../../../../api/classes/signals/#playcaption) signal

#### Source

[src/audio/VoiceOverManager.ts:26](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/VoiceOverManager.ts#L26)
