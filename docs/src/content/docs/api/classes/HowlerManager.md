---
editUrl: false
next: false
prev: false
title: "HowlerManager"
---

All audio manager implementations need to implement this interface to function with the framework.

## Implements

- [`IAudioManager`](/api/interfaces/iaudiomanager/)

## Constructors

### new HowlerManager()

> **new HowlerManager**(`app`): [`HowlerManager`](/api/classes/howlermanager/)

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`HowlerManager`](/api/classes/howlermanager/)

#### Source

[src/audio/HowlerManager.ts:144](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L144)

## Properties

### autoMuteOnVisibilityChange

> **autoMuteOnVisibilityChange**: `boolean` = `true`

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`autoMuteOnVisibilityChange`](/api/interfaces/iaudiomanager/#automuteonvisibilitychange)

#### Source

[src/audio/HowlerManager.ts:116](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L116)

## Accessors

### debug

> `set` **debug**(`pEnabled`): `void`

Enabling this will print all debug logs.

#### Parameters

• **pEnabled**: `boolean`

#### Source

[src/audio/HowlerManager.ts:161](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L161)

***

### masterVolume

> `get` **masterVolume**(): `number`

The master value that affects all audio.

> `set` **masterVolume**(`pVolume`): `void`

The master value that affects all audio.

#### Parameters

• **pVolume**: `number`

#### Returns

`number`

#### Source

[src/audio/HowlerManager.ts:165](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L165)

## Methods

### createAudioTrack()

> **createAudioTrack**(`trackId`, `category`, `volume`, `loop`): [`IAudioTrack`](/api/interfaces/iaudiotrack/)

Creates an IAudioTrack.

#### Parameters

• **trackId**: `string`

The id of the track.

• **category**: `string`= `AudioCategory.DEFAULT`

The category that the track belongs to.

• **volume**: `number`= `1`

• **loop**: `boolean`= `false`

#### Returns

[`IAudioTrack`](/api/interfaces/iaudiotrack/)

The created IAudioTrack.

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`createAudioTrack`](/api/interfaces/iaudiomanager/#createaudiotrack)

#### Source

[src/audio/HowlerManager.ts:320](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L320)

***

### fadeTo()

> **fadeTo**(`trackId`, `category`, `volume`, `pDuration`): `void`

Fades a track from it's current volume over time.

#### Parameters

• **trackId**: `string`

The id of the track.

• **category**: `string`

The category that the track belongs to.

• **volume**: `number`

The volume to fade to.

• **pDuration**: `number`

The time in milliseconds it should take to fade.

#### Returns

`void`

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`fadeTo`](/api/interfaces/iaudiomanager/#fadeto)

#### Source

[src/audio/HowlerManager.ts:304](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L304)

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

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`getAudioTrack`](/api/interfaces/iaudiomanager/#getaudiotrack)

#### Source

[src/audio/HowlerManager.ts:312](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L312)

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

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`getCategoryVolume`](/api/interfaces/iaudiomanager/#getcategoryvolume)

#### Source

[src/audio/HowlerManager.ts:183](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L183)

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

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`getDuration`](/api/interfaces/iaudiomanager/#getduration)

#### Source

[src/audio/HowlerManager.ts:192](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L192)

***

### init()

> **init**(): `void`

Sets up any listeners that need the entire Application construction to be complete.

#### Returns

`void`

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`init`](/api/interfaces/iaudiomanager/#init)

#### Source

[src/audio/HowlerManager.ts:174](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L174)

***

### load()

> **load**(`ids`, `category`, `onLoadCallback`?): `void`

Loads one or more tracks.

#### Parameters

• **ids**: `string` \| `string`[]

The ids of the tracks to load.

• **category**: `string`

The category that the track belongs to.

• **onLoadCallback?**

The callback to be called when loading is finished.

#### Returns

`void`

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`load`](/api/interfaces/iaudiomanager/#load)

#### Source

[src/audio/HowlerManager.ts:248](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L248)

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

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`pause`](/api/interfaces/iaudiomanager/#pause)

#### Source

[src/audio/HowlerManager.ts:232](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L232)

***

### play()

> **play**(`trackId`, `volume`, `loop`, `category`, `pitch`?): `undefined` \| [`IAudioTrack`](/api/interfaces/iaudiotrack/)

Plays a track. If the track does not exist, this function will create it.

#### Parameters

• **trackId**: `string`

The id of the track to play.

• **volume**: `number`= `1`

The volume to play the track at. If this function creates the track, this will be the base volume.

• **loop**: `boolean`= `false`

Should the track loop or not.

• **category**: `string`= `AudioCategory.DEFAULT`

The category that the track belongs to.

• **pitch?**: `number`

the pitch of the track

#### Returns

`undefined` \| [`IAudioTrack`](/api/interfaces/iaudiotrack/)

The track playing.

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`play`](/api/interfaces/iaudiomanager/#play)

#### Source

[src/audio/HowlerManager.ts:202](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L202)

***

### setCategoryVolume()

> **setCategoryVolume**(`category`, `pVolume`): `void`

Sets the volume of a specific category.

#### Parameters

• **category**: `string`

The category to set.

• **pVolume**: `number`

The volume to set.

#### Returns

`void`

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`setCategoryVolume`](/api/interfaces/iaudiomanager/#setcategoryvolume)

#### Source

[src/audio/HowlerManager.ts:187](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L187)

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

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`stop`](/api/interfaces/iaudiomanager/#stop)

#### Source

[src/audio/HowlerManager.ts:240](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L240)

***

### unload()

> **unload**(`trackId`, `category`, `removeTrack`): `void`

Unloads a track's source from memory.

#### Parameters

• **trackId**: `string`

The id of the track.

• **category**: `string`

The category that the track belongs to.

• **removeTrack**: `boolean`= `false`

Whether the IAudioTrack should be removed and destroyed too.

#### Returns

`void`

#### Implementation of

[`IAudioManager`](/api/interfaces/iaudiomanager/).[`unload`](/api/interfaces/iaudiomanager/#unload)

#### Source

[src/audio/HowlerManager.ts:292](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/audio/HowlerManager.ts#L292)
