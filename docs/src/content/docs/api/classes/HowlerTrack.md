---
editUrl: false
next: false
prev: false
title: "HowlerTrack"
---

All audio track implementations need to implement this interface to function with the framework.

## Implements

- [`IAudioTrack`](/api/interfaces/iaudiotrack/)

## Constructors

### new HowlerTrack()

> **new HowlerTrack**(`trackId`, `category`, `audioManager`, `volume`, `loop`): [`HowlerTrack`](/api/classes/howlertrack/)

#### Parameters

• **trackId**: `string`

• **category**: `string`

• **audioManager**: [`IAudioManager`](/api/interfaces/iaudiomanager/)

• **volume**: `number`= `1`

• **loop**: `boolean`= `false`

#### Returns

[`HowlerTrack`](/api/classes/howlertrack/)

#### Source

[src/audio/HowlerTrack.ts:35](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L35)

## Properties

### FILE\_EXTENSIONS

> `static` **FILE\_EXTENSIONS**: `string`[]

Howler will attempt to load audio files with these extensions, in this order.

#### Default

```ts
["webm", "mp3", "ogg", "m4a"]
```

#### Source

[src/audio/HowlerTrack.ts:22](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L22)

## Accessors

### id

> `get` **id**(): `string`

#### Returns

`string`

#### Source

[src/audio/HowlerTrack.ts:58](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L58)

## Methods

### fadeTo()

> **fadeTo**(`volume`, `milliseconds`): `void`

Fades this track from it's current volume over time.

#### Parameters

• **volume**: `number`

The volume to fade to.

• **milliseconds**: `number`

The time in milliseconds the fade should take finish.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`fadeTo`](/api/interfaces/iaudiotrack/#fadeto)

#### Source

[src/audio/HowlerTrack.ts:78](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L78)

***

### getDuration()

> **getDuration**(): `number`

Gets the length of the track.

#### Returns

`number`

the length of the track.

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`getDuration`](/api/interfaces/iaudiotrack/#getduration)

#### Source

[src/audio/HowlerTrack.ts:163](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L163)

***

### getPitch()

> **getPitch**(): `number`

#### Returns

`number`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`getPitch`](/api/interfaces/iaudiotrack/#getpitch)

#### Source

[src/audio/HowlerTrack.ts:151](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L151)

***

### getSource()

> **getSource**(): `Howl`

#### Returns

`Howl`

#### Source

[src/audio/HowlerTrack.ts:183](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L183)

***

### getTimePos()

> **getTimePos**(): `number`

Gets the current time position within the track timeline.

#### Returns

`number`

the time position

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`getTimePos`](/api/interfaces/iaudiotrack/#gettimepos)

#### Source

[src/audio/HowlerTrack.ts:155](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L155)

***

### getVolume()

> **getVolume**(): `number`

Gets the base volume of this track. This will be used to calculate the appropriate source volume.

#### Returns

`number`

the base volume of this track.

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`getVolume`](/api/interfaces/iaudiotrack/#getvolume)

#### Source

[src/audio/HowlerTrack.ts:126](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L126)

***

### isLooped()

> **isLooped**(): `boolean`

Gets whether the track is set to loop.

#### Returns

`boolean`

true if the track is set to loop, false otherwise.

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`isLooped`](/api/interfaces/iaudiotrack/#islooped)

#### Source

[src/audio/HowlerTrack.ts:112](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L112)

***

### isMuted()

> **isMuted**(): `boolean`

Gets whether the track is muted.

#### Returns

`boolean`

true if the track is muted, false otherwise.

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`isMuted`](/api/interfaces/iaudiotrack/#ismuted)

#### Source

[src/audio/HowlerTrack.ts:104](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L104)

***

### isPlaying()

> **isPlaying**(): `boolean`

Gets whether the track is currently playing.

#### Returns

`boolean`

true if currently playing, false otherwise.

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`isPlaying`](/api/interfaces/iaudiotrack/#isplaying)

#### Source

[src/audio/HowlerTrack.ts:167](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L167)

***

### loadSource()

> **loadSource**(): `void`

Loads the source file into memory. Must be called before play() is called.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`loadSource`](/api/interfaces/iaudiotrack/#loadsource)

#### Source

[src/audio/HowlerTrack.ts:88](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L88)

***

### off()

> **off**(`eventName`, `callback`?): `void`

Unregister a callback from an event.

#### Parameters

• **eventName**: `string`

The event that was listened for.

• **callback?**

The callback to call when the event occured. Omit this to remove all events of type.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`off`](/api/interfaces/iaudiotrack/#off)

#### Source

[src/audio/HowlerTrack.ts:175](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L175)

***

### on()

> **on**(`eventName`, `callback`): `void`

Register a callback to an event.

#### Parameters

• **eventName**: `string`

The event to listen for.

• **callback**

The callback to call when the event occurs.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`on`](/api/interfaces/iaudiotrack/#on)

#### Source

[src/audio/HowlerTrack.ts:171](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L171)

***

### once()

> **once**(`eventName`, `callback`): `void`

Shortcut to register a callback to an event and have it only be called once.

#### Parameters

• **eventName**: `string`

The event to listen for.

• **callback**

The callback to call when the event occurs.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`once`](/api/interfaces/iaudiotrack/#once)

#### Source

[src/audio/HowlerTrack.ts:179](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L179)

***

### pause()

> **pause**(): `void`

Pauses the track.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`pause`](/api/interfaces/iaudiotrack/#pause)

#### Source

[src/audio/HowlerTrack.ts:70](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L70)

***

### play()

> **play**(): `void`

Plays the track.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`play`](/api/interfaces/iaudiotrack/#play)

#### Source

[src/audio/HowlerTrack.ts:62](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L62)

***

### setLooped()

> **setLooped**(`pLoop`): `void`

Sets the loop flag for this track.

#### Parameters

• **pLoop**: `boolean`

true to loop and false to play once.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`setLooped`](/api/interfaces/iaudiotrack/#setlooped)

#### Source

[src/audio/HowlerTrack.ts:122](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L122)

***

### setMuted()

> **setMuted**(`value`): `void`

Set the muted flag for this track.

#### Parameters

• **value**: `boolean`

true to mute and false to unmute.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`setMuted`](/api/interfaces/iaudiotrack/#setmuted)

#### Source

[src/audio/HowlerTrack.ts:108](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L108)

***

### setPitch()

> **setPitch**(`pitch`?): `void`

#### Parameters

• **pitch?**: `number`

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`setPitch`](/api/interfaces/iaudiotrack/#setpitch)

#### Source

[src/audio/HowlerTrack.ts:145](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L145)

***

### setTimePos()

> **setTimePos**(`pPos`): `void`

Sets the current time position within the track timeline.

#### Parameters

• **pPos**: `number`

The time position to set the track to.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`setTimePos`](/api/interfaces/iaudiotrack/#settimepos)

#### Source

[src/audio/HowlerTrack.ts:159](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L159)

***

### setVolume()

> **setVolume**(`volume`): `void`

Sets the base volume of this track. This will be used to calculate the appropriate source volume.

#### Parameters

• **volume**: `number`

The new volume of this track.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`setVolume`](/api/interfaces/iaudiotrack/#setvolume)

#### Source

[src/audio/HowlerTrack.ts:130](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L130)

***

### setVolumeWithModifiers()

> **setVolumeWithModifiers**(`volume`, `masterVolume`, `categoryVolume`): `void`

Sets the base volume of this track and then applies modifiers to get the final output volume.

#### Parameters

• **volume**: `number`

The new volume of this track.

• **masterVolume**: `number`

The current master volume level.

• **categoryVolume**: `number`

The current volume of this track's category.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`setVolumeWithModifiers`](/api/interfaces/iaudiotrack/#setvolumewithmodifiers)

#### Source

[src/audio/HowlerTrack.ts:138](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L138)

***

### stop()

> **stop**(): `void`

Stops the track.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`stop`](/api/interfaces/iaudiotrack/#stop)

#### Source

[src/audio/HowlerTrack.ts:74](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L74)

***

### unloadSource()

> **unloadSource**(): `void`

Unloads the source file.

#### Returns

`void`

#### Implementation of

[`IAudioTrack`](/api/interfaces/iaudiotrack/).[`unloadSource`](/api/interfaces/iaudiotrack/#unloadsource)

#### Source

[src/audio/HowlerTrack.ts:84](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/audio/HowlerTrack.ts#L84)
