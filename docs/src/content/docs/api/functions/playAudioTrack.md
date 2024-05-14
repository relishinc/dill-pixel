---
editUrl: false
next: false
prev: false
title: "playAudioTrack"
---

> **playAudioTrack**(`trackId`, `volume`?, `loop`?, `category`?, `pitch`?): [`IAudioTrack`](/api/interfaces/iaudiotrack/) \| `undefined`

Plays a track. If the track does not exist, this function will create it.

## Parameters

• **trackId**: `string`

• **volume?**: `number`

• **loop?**: `boolean`

• **category?**: `string`

• **pitch?**: `number`

## Returns

[`IAudioTrack`](/api/interfaces/iaudiotrack/) \| `undefined`

The track playing.

## Source

[src/audio/HowlerManager.ts:87](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/HowlerManager.ts#L87)
