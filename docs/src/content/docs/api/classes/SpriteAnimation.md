---
editUrl: false
next: false
prev: false
title: "SpriteAnimation"
---

SpriteAnimation

## Constructors

### new SpriteAnimation()

> **new SpriteAnimation**(`props`): [`SpriteAnimation`](/api/classes/spriteanimation/)

Creates an instance of sprite animation.

#### Parameters

• **props**: `SpriteAnimationProps`

#### Returns

[`SpriteAnimation`](/api/classes/spriteanimation/)

#### Source

[src/gameobjects/animation/SpriteAnimation.ts:44](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/animation/SpriteAnimation.ts#L44)

## Accessors

### duration

> `get` **duration**(): `number`

Gets duration (automatically calculated based on framerate)

#### Returns

`number`

#### Source

[src/gameobjects/animation/SpriteAnimation.ts:91](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/animation/SpriteAnimation.ts#L91)

***

### framerate

> `get` **framerate**(): `number`

Gets framerate

> `set` **framerate**(`value`): `void`

Sets framerate

#### Parameters

• **value**: `number`

#### Returns

`number`

#### Source

[src/gameobjects/animation/SpriteAnimation.ts:77](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/animation/SpriteAnimation.ts#L77)

***

### frames

> `get` **frames**(): `number`

Gets number of frames

#### Returns

`number`

#### Source

[src/gameobjects/animation/SpriteAnimation.ts:70](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/animation/SpriteAnimation.ts#L70)

***

### isLooping

> `get` **isLooping**(): `boolean`

Gets whether is looping

#### Returns

`boolean`

#### Source

[src/gameobjects/animation/SpriteAnimation.ts:98](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/animation/SpriteAnimation.ts#L98)

## Methods

### fireOnComplete()

> **fireOnComplete**(`reversed`?): `void`

Fires on complete

#### Parameters

• **reversed?**: `boolean`

#### Returns

`void`

#### Source

[src/gameobjects/animation/SpriteAnimation.ts:133](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/animation/SpriteAnimation.ts#L133)

***

### fireOnLoop()

> **fireOnLoop**(): `void`

Fires on loop

#### Returns

`void`

#### Source

[src/gameobjects/animation/SpriteAnimation.ts:142](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/animation/SpriteAnimation.ts#L142)

***

### getFrame()

> **getFrame**(`frame`): `Texture`\<`Resource`\>

Gets a specific frame

#### Parameters

• **frame**: `number`

#### Returns

`Texture`\<`Resource`\>

frame

#### Source

[src/gameobjects/animation/SpriteAnimation.ts:107](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/animation/SpriteAnimation.ts#L107)

***

### onComplete()

> **onComplete**(`callback`): `void`

onComplete

#### Parameters

• **callback**

#### Returns

`void`

#### Todo

SH: Optimize the adding of onComplete callbacks (constructor?)

#### Source

[src/gameobjects/animation/SpriteAnimation.ts:117](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/animation/SpriteAnimation.ts#L117)

***

### onLoop()

> **onLoop**(`callback`): `void`

onLoop

#### Parameters

• **callback**

#### Returns

`void`

#### Source

[src/gameobjects/animation/SpriteAnimation.ts:125](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/animation/SpriteAnimation.ts#L125)
