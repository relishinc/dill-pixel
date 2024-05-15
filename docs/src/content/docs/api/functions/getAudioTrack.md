---
editUrl: false
next: false
prev: false
title: "getAudioTrack"
---

> **getAudioTrack**(`trackId`, `category`?): [`IAudioTrack`](/api/interfaces/iaudiotrack/) \| `undefined`

Gets a track.

## Parameters

• **trackId**: `string`

• **category?**: `string`

## Returns

[`IAudioTrack`](/api/interfaces/iaudiotrack/) \| `undefined`

The IAudioTrack created or undefined if not able to create track.
This could happen if the source file could not be found.

## Source

[src/audio/HowlerManager.ts:46](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L46)
