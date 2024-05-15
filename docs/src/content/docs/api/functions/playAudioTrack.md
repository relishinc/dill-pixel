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

[src/audio/HowlerManager.ts:87](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L87)
