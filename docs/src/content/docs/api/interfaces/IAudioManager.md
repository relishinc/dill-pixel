---
editUrl: false
next: false
prev: false
title: "IAudioManager"
---

All audio manager implementations need to implement this interface to function with the framework.

## Properties

### autoMuteOnVisibilityChange

> **autoMuteOnVisibilityChange**: `boolean`

#### Source

[src/audio/IAudioManager.ts:7](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L7)

***

### debug

> **debug**: `boolean`

Enabling this will print all debug logs.

#### Source

[src/audio/IAudioManager.ts:11](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L11)

***

### masterVolume

> **masterVolume**: `number`

The master value that affects all audio.

#### Source

[src/audio/IAudioManager.ts:15](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L15)

## Methods

### createAudioTrack()

> **createAudioTrack**(`trackId`, `category`): [`IAudioTrack`](/api/interfaces/iaudiotrack/)

Creates an IAudioTrack.

#### Parameters

• **trackId**: `string`

The id of the track.

• **category**: `string`

The category that the track belongs to.

#### Returns

[`IAudioTrack`](/api/interfaces/iaudiotrack/)

The created IAudioTrack.

#### Source

[src/audio/IAudioManager.ts:100](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L100)

***

### fadeTo()

> **fadeTo**(`trackId`, `category`, `volume`, `milliseconds`): `void`

Fades a track from it's current volume over time.

#### Parameters

• **trackId**: `string`

The id of the track.

• **category**: `string`

The category that the track belongs to.

• **volume**: `number`

The volume to fade to.

• **milliseconds**: `number`

The time in milliseconds it should take to fade.

#### Returns

`void`

#### Source

[src/audio/IAudioManager.ts:92](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L92)

***

### getAudioTrack()

> **getAudioTrack**(`trackId`, `category`): `undefined` \| [`IAudioTrack`](/api/interfaces/iaudiotrack/)

Gets a track.

#### Parameters

• **trackId**: `string`

The id of the track.

• **category**: `string`

The category that the track belongs to.

#### Returns

`undefined` \| [`IAudioTrack`](/api/interfaces/iaudiotrack/)

The IAudioTrack created or undefined if not able to create track.
This could happen if the source file could not be found.

#### Source

[src/audio/IAudioManager.ts:109](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L109)

***

### getCategoryVolume()

> **getCategoryVolume**(`category`): `number`

Gets the volume of a specific category.

#### Parameters

• **category**: `string`

The category to check.

#### Returns

`number`

The volume of the category.

#### Source

[src/audio/IAudioManager.ts:27](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L27)

***

### getDuration()

> **getDuration**(`trackId`, `category`): `undefined` \| `number`

Gets the length of an IAudioTrack.

#### Parameters

• **trackId**: `string`

The id of the track to check.

• **category**: `string`

The category that the track belongs to.

#### Returns

`undefined` \| `number`

The length of the track or `undefined` if the track doesn't exist.

#### Source

[src/audio/IAudioManager.ts:42](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L42)

***

### init()

> **init**(): `void`

Sets up any listeners that need the entire Application construction to be complete.

#### Returns

`void`

#### Source

[src/audio/IAudioManager.ts:20](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L20)

***

### load()

> **load**(`trackIds`, `category`, `onLoadCallback`?): `void`

Loads one or more tracks.

#### Parameters

• **trackIds**: `string` \| `string`[]

The ids of the tracks to load.

• **category**: `string`

The category that the track belongs to.

• **onLoadCallback?**

The callback to be called when loading is finished.

#### Returns

`void`

#### Source

[src/audio/IAudioManager.ts:75](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L75)

***

### pause()

> **pause**(`trackId`, `category`): `undefined` \| [`IAudioTrack`](/api/interfaces/iaudiotrack/)

Pauses a track.

#### Parameters

• **trackId**: `string`

The id of the track.

• **category**: `string`

The category that the track belongs to.

#### Returns

`undefined` \| [`IAudioTrack`](/api/interfaces/iaudiotrack/)

#### Source

[src/audio/IAudioManager.ts:60](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L60)

***

### play()

> **play**(`trackId`, `volume`?, `loop`?, `category`?, `pitch`?): `undefined` \| [`IAudioTrack`](/api/interfaces/iaudiotrack/)

Plays a track. If the track does not exist, this function will create it.

#### Parameters

• **trackId**: `string`

The id of the track to play.

• **volume?**: `number`

The volume to play the track at. If this function creates the track, this will be the base volume.

• **loop?**: `boolean`

Should the track loop or not.

• **category?**: `string`

The category that the track belongs to.

• **pitch?**: `number`

the pitch of the track

#### Returns

`undefined` \| [`IAudioTrack`](/api/interfaces/iaudiotrack/)

The track playing.

#### Source

[src/audio/IAudioManager.ts:53](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L53)

***

### setCategoryVolume()

> **setCategoryVolume**(`category`, `volume`): `void`

Sets the volume of a specific category.

#### Parameters

• **category**: `string`

The category to set.

• **volume**: `number`

The volume to set.

#### Returns

`void`

#### Source

[src/audio/IAudioManager.ts:34](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L34)

***

### stop()

> **stop**(`trackId`, `category`): `undefined` \| [`IAudioTrack`](/api/interfaces/iaudiotrack/)

Stops a track.

#### Parameters

• **trackId**: `string`

The id of the track.

• **category**: `string`

The category that the track belongs to.

#### Returns

`undefined` \| [`IAudioTrack`](/api/interfaces/iaudiotrack/)

#### Source

[src/audio/IAudioManager.ts:67](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L67)

***

### unload()

> **unload**(`trackId`, `category`, `removeTrack`): `void`

Unloads a track's source from memory.

#### Parameters

• **trackId**: `string`

The id of the track.

• **category**: `string`

The category that the track belongs to.

• **removeTrack**: `boolean`

Whether the IAudioTrack should be removed and destroyed too.

#### Returns

`void`

#### Source

[src/audio/IAudioManager.ts:83](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/IAudioManager.ts#L83)
