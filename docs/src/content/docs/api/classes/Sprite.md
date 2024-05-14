---
editUrl: false
next: false
prev: false
title: "Sprite"
---

## Extends

- `Sprite`

## Type parameters

• **T** *extends* [`Application`](/api/classes/application/) = [`Application`](/api/classes/application/)

## Implements

- [`IFocusable`](/api/interfaces/ifocusable/)

## Constructors

### new Sprite()

> **new Sprite**\<`T`\>(`texture`?): [`Sprite`](/api/classes/sprite/)\<`T`\>

#### Parameters

• **texture?**: `Texture`\<`Resource`\>

#### Returns

[`Sprite`](/api/classes/sprite/)\<`T`\>

#### Overrides

`PIXISprite.constructor`

#### Source

[src/gameobjects/Sprite.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L20)

## Properties

### editable

> **editable**: `boolean` = `true`

#### Source

[src/gameobjects/Sprite.ts:10](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L10)

***

### \_\_dill\_pixel\_top\_level\_class

> `static` **\_\_dill\_pixel\_top\_level\_class**: `boolean` = `true`

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

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/gameobjects/Sprite.ts:53](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L53)

## Methods

### getFocusPosition()

> **getFocusPosition**(): `Point`

Gets the position in global coordinate space that the focus should be centred around.

#### Returns

`Point`

The position that the focus should be centred around.

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`getFocusPosition`](/api/interfaces/ifocusable/#getfocusposition)

#### Source

[src/gameobjects/Sprite.ts:69](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L69)

***

### getFocusSize()

> **getFocusSize**(): `IPoint`

Gets the size of the area in global coordinate space that the focus should surround.

#### Returns

`IPoint`

The size of the area that the focus should surround.

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`getFocusSize`](/api/interfaces/ifocusable/#getfocussize)

#### Source

[src/gameobjects/Sprite.ts:73](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L73)

***

### isFocusable()

> **isFocusable**(): `boolean`

#### Returns

`boolean`

true if this focusable can be focused
Defaults to this.interactive && this.worldVisible

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`isFocusable`](/api/interfaces/ifocusable/#isfocusable)

#### Source

[src/gameobjects/Sprite.ts:77](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L77)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

Called when this Focusable is focussed and then activated.

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusActivated`](/api/interfaces/ifocusable/#onfocusactivated)

#### Source

[src/gameobjects/Sprite.ts:81](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L81)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

Called when this Focusable is focussed.

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusBegin`](/api/interfaces/ifocusable/#onfocusbegin)

#### Source

[src/gameobjects/Sprite.ts:83](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L83)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

Called when this Focusable is no longer focussed.

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusEnd`](/api/interfaces/ifocusable/#onfocusend)

#### Source

[src/gameobjects/Sprite.ts:85](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Sprite.ts#L85)
