---
editUrl: false
next: false
prev: false
title: "IAudioTrack"
---

All audio track implementations need to implement this interface to function with the framework.

## Properties

### id

> `readonly` **id**: `string`

#### Source

[src/audio/IAudioTrack.ts:5](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L5)

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

#### Source

[src/audio/IAudioTrack.ts:27](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L27)

***

### getDuration()

> **getDuration**(): `number`

Gets the length of the track.

#### Returns

`number`

the length of the track.

#### Source

[src/audio/IAudioTrack.ts:103](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L103)

***

### getPitch()

> **getPitch**(): `number`

#### Returns

`number`

#### Source

[src/audio/IAudioTrack.ts:75](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L75)

***

### getTimePos()

> **getTimePos**(): `number`

Gets the current time position within the track timeline.

#### Returns

`number`

the time position

#### Source

[src/audio/IAudioTrack.ts:91](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L91)

***

### getVolume()

> **getVolume**(): `number`

Gets the base volume of this track. This will be used to calculate the appropriate source volume.

#### Returns

`number`

the base volume of this track.

#### Source

[src/audio/IAudioTrack.ts:67](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L67)

***

### isLooped()

> **isLooped**(): `boolean`

Gets whether the track is set to loop.

#### Returns

`boolean`

true if the track is set to loop, false otherwise.

#### Source

[src/audio/IAudioTrack.ts:55](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L55)

***

### isMuted()

> **isMuted**(): `boolean`

Gets whether the track is muted.

#### Returns

`boolean`

true if the track is muted, false otherwise.

#### Source

[src/audio/IAudioTrack.ts:43](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L43)

***

### isPlaying()

> **isPlaying**(): `boolean`

Gets whether the track is currently playing.

#### Returns

`boolean`

true if currently playing, false otherwise.

#### Source

[src/audio/IAudioTrack.ts:109](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L109)

***

### loadSource()

> **loadSource**(): `void`

Loads the source file into memory. Must be called before play() is called.

#### Returns

`void`

#### Source

[src/audio/IAudioTrack.ts:32](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L32)

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

#### Source

[src/audio/IAudioTrack.ts:123](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L123)

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

#### Source

[src/audio/IAudioTrack.ts:116](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L116)

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

#### Source

[src/audio/IAudioTrack.ts:130](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L130)

***

### pause()

> **pause**(): `void`

Pauses the track.

#### Returns

`void`

#### Source

[src/audio/IAudioTrack.ts:15](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L15)

***

### play()

> **play**(): `void`

Plays the track.

#### Returns

`void`

#### Source

[src/audio/IAudioTrack.ts:10](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L10)

***

### setLooped()

> **setLooped**(`pLoop`): `void`

Sets the loop flag for this track.

#### Parameters

• **pLoop**: `boolean`

true to loop and false to play once.

#### Returns

`void`

#### Source

[src/audio/IAudioTrack.ts:61](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L61)

***

### setMuted()

> **setMuted**(`mute`): `void`

Set the muted flag for this track.

#### Parameters

• **mute**: `boolean`

true to mute and false to unmute.

#### Returns

`void`

#### Source

[src/audio/IAudioTrack.ts:49](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L49)

***

### setPitch()

> **setPitch**(`pitch`?): `void`

#### Parameters

• **pitch?**: `number`

#### Returns

`void`

#### Source

[src/audio/IAudioTrack.ts:77](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L77)

***

### setTimePos()

> **setTimePos**(`pos`): `void`

Sets the current time position within the track timeline.

#### Parameters

• **pos**: `number`

The time position to set the track to.

#### Returns

`void`

#### Source

[src/audio/IAudioTrack.ts:97](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L97)

***

### setVolume()

> **setVolume**(`volume`): `void`

Sets the base volume of this track. This will be used to calculate the appropriate source volume.

#### Parameters

• **volume**: `number`

The new volume of this track.

#### Returns

`void`

#### Source

[src/audio/IAudioTrack.ts:73](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L73)

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

#### Source

[src/audio/IAudioTrack.ts:85](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L85)

***

### stop()

> **stop**(): `void`

Stops the track.

#### Returns

`void`

#### Source

[src/audio/IAudioTrack.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L20)

***

### unloadSource()

> **unloadSource**(): `void`

Unloads the source file.

#### Returns

`void`

#### Source

[src/audio/IAudioTrack.ts:37](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/audio/IAudioTrack.ts#L37)
