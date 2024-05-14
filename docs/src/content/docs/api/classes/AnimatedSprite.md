---
editUrl: false
next: false
prev: false
title: "AnimatedSprite"
---

Animated sprite

## Extends

- [`Sprite`](/api/classes/sprite/)

## Constructors

### new AnimatedSprite()

> **new AnimatedSprite**(): [`AnimatedSprite`](/api/classes/animatedsprite/)

Creates an instance of animated sprite.

#### Returns

[`AnimatedSprite`](/api/classes/animatedsprite/)

#### Overrides

[`Sprite`](/api/classes/sprite/).[`constructor`](/api/classes/sprite/#constructors)

#### Source

[src/gameobjects/animation/AnimatedSprite.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/animation/AnimatedSprite.ts#L20)

## Properties

### editable

> **editable**: `boolean` = `true`

#### Inherited from

[`Sprite`](/api/classes/sprite/).[`editable`](/api/classes/sprite/#editable)

#### Source

[src/gameobjects/Sprite.ts:10](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L10)

***

### \_\_dill\_pixel\_top\_level\_class

> `static` **\_\_dill\_pixel\_top\_level\_class**: `boolean` = `true`

#### Inherited from

[`Sprite`](/api/classes/sprite/).[`__dill_pixel_top_level_class`](/api/classes/sprite/#__dill_pixel_top_level_class)

#### Source

[src/gameobjects/Sprite.ts:9](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L9)

## Accessors

### add

> `get` **add**(): [`Add`](/api/classes/add/)

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/gameobjects/Sprite.ts:49](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L49)

***

### app

> `get` **app**(): `T`

#### Returns

`T`

#### Source

[src/gameobjects/Sprite.ts:57](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L57)

***

### currentFrame

> `get` **currentFrame**(): `number`

> `set` **currentFrame**(`frame`): `void`

#### Parameters

• **frame**: `number`

#### Returns

`number`

#### Source

[src/gameobjects/animation/AnimatedSprite.ts:37](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/animation/AnimatedSprite.ts#L37)

***

### focusPosition

> `get` **focusPosition**(): `Point`

> `set` **focusPosition**(`value`): `void`

#### Parameters

• **value**: `Point`

#### Returns

`Point`

#### Source

[src/gameobjects/Sprite.ts:33](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L33)

***

### focusSize

> `get` **focusSize**(): `Point`

> `set` **focusSize**(`value`): `void`

#### Parameters

• **value**: `Point`

#### Returns

`Point`

#### Source

[src/gameobjects/Sprite.ts:41](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L41)

***

### focusable

> `get` **focusable**(): `boolean`

> `set` **focusable**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Sprite.ts:61](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L61)

***

### isPlaying

> `get` **isPlaying**(): `boolean`

Gets whether is playing

#### Returns

`boolean`

#### Source

[src/gameobjects/animation/AnimatedSprite.ts:33](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/animation/AnimatedSprite.ts#L33)

***

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/gameobjects/Sprite.ts:53](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L53)

## Methods

### addAnimation()

> **addAnimation**(`key`, `spriteAnimation`): [`SpriteAnimation`](/api/classes/spriteanimation/)

Adds animation

#### Parameters

• **key**: `string`

• **spriteAnimation**: [`SpriteAnimation`](/api/classes/spriteanimation/)

#### Returns

[`SpriteAnimation`](/api/classes/spriteanimation/)

animation

#### Source

[src/gameobjects/animation/AnimatedSprite.ts:63](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/animation/AnimatedSprite.ts#L63)

***

### getFocusPosition()

> **getFocusPosition**(): `Point`

Gets the position in global coordinate space that the focus should be centred around.

#### Returns

`Point`

The position that the focus should be centred around.

#### Inherited from

[`Sprite`](/api/classes/sprite/).[`getFocusPosition`](/api/classes/sprite/#getfocusposition)

#### Source

[src/gameobjects/Sprite.ts:69](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L69)

***

### getFocusSize()

> **getFocusSize**(): `IPoint`

Gets the size of the area in global coordinate space that the focus should surround.

#### Returns

`IPoint`

The size of the area that the focus should surround.

#### Inherited from

[`Sprite`](/api/classes/sprite/).[`getFocusSize`](/api/classes/sprite/#getfocussize)

#### Source

[src/gameobjects/Sprite.ts:73](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L73)

***

### holdFrame()

> **holdFrame**(`key`, `frame`): `void`

Holds frame

#### Parameters

• **key**: `string`

• **frame**: `number`= `0`

#### Returns

`void`

#### Source

[src/gameobjects/animation/AnimatedSprite.ts:91](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/animation/AnimatedSprite.ts#L91)

***

### isFocusable()

> **isFocusable**(): `boolean`

#### Returns

`boolean`

true if this focusable can be focused
Defaults to this.interactive && this.worldVisible

#### Inherited from

[`Sprite`](/api/classes/sprite/).[`isFocusable`](/api/classes/sprite/#isfocusable)

#### Source

[src/gameobjects/Sprite.ts:77](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L77)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

Called when this Focusable is focussed and then activated.

#### Returns

`void`

#### Inherited from

[`Sprite`](/api/classes/sprite/).[`onFocusActivated`](/api/classes/sprite/#onfocusactivated)

#### Source

[src/gameobjects/Sprite.ts:81](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L81)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

Called when this Focusable is focussed.

#### Returns

`void`

#### Inherited from

[`Sprite`](/api/classes/sprite/).[`onFocusBegin`](/api/classes/sprite/#onfocusbegin)

#### Source

[src/gameobjects/Sprite.ts:83](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L83)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

Called when this Focusable is no longer focussed.

#### Returns

`void`

#### Inherited from

[`Sprite`](/api/classes/sprite/).[`onFocusEnd`](/api/classes/sprite/#onfocusend)

#### Source

[src/gameobjects/Sprite.ts:85](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L85)

***

### play()

> **play**(`key`, `reverse`, `startingFrame`): `void`

Plays animated sprite

#### Parameters

• **key**: `string`

• **reverse**: `boolean`= `false`

• **startingFrame**: `number`= `0`

#### Returns

`void`

#### Source

[src/gameobjects/animation/AnimatedSprite.ts:74](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/animation/AnimatedSprite.ts#L74)

***

### update()

> **update**(`deltaTime`): `void`

Updates animated sprite

#### Parameters

• **deltaTime**: `number`

#### Returns

`void`

#### Source

[src/gameobjects/animation/AnimatedSprite.ts:108](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/animation/AnimatedSprite.ts#L108)
