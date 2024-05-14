---
editUrl: false
next: false
prev: false
title: "Selectable"
---

Selectable

## Extends

- [`Container`](/api/classes/container/)

## Implements

- [`ISelectable`](/api/interfaces/iselectable/)
- [`IFocusable`](/api/interfaces/ifocusable/)

## Properties

### childrenEditable

> **childrenEditable**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`childrenEditable`](/api/classes/container/#childreneditable)

#### Source

[src/gameobjects/Container.ts:23](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L23)

***

### editable

> **editable**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`editable`](/api/classes/container/#editable)

#### Source

[src/gameobjects/Container.ts:22](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L22)

***

### onDeselected

> `readonly` **onDeselected**: (`p`) => `void`[]

#### Implementation of

[`ISelectable`](/api/interfaces/iselectable/).[`onDeselected`](/api/interfaces/iselectable/#ondeselected)

#### Source

[src/input/Selectable.ts:17](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L17)

***

### onSelected

> `readonly` **onSelected**: (`p`) => `void`[]

#### Implementation of

[`ISelectable`](/api/interfaces/iselectable/).[`onSelected`](/api/interfaces/iselectable/#onselected)

#### Source

[src/input/Selectable.ts:16](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L16)

***

### \_\_dill\_pixel\_top\_level\_class

> `static` **\_\_dill\_pixel\_top\_level\_class**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`__dill_pixel_top_level_class`](/api/classes/container/#__dill_pixel_top_level_class)

#### Source

[src/gameobjects/Container.ts:21](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L21)

## Accessors

### add

> `get` **add**(): [`Add`](/api/classes/add/)

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/gameobjects/Container.ts:121](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L121)

***

### app

> `get` **app**(): `T`

#### Returns

`T`

#### Source

[src/gameobjects/Container.ts:129](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L129)

***

### editMode

> `get` **editMode**(): `boolean`

> `set` **editMode**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:108](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L108)

***

### focusPosition

> `get` **focusPosition**(): `Point`

> `set` **focusPosition**(`value`): `void`

#### Parameters

• **value**: `Point`

#### Returns

`Point`

#### Source

[src/gameobjects/Container.ts:84](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L84)

***

### focusSize

> `get` **focusSize**(): `Point`

> `set` **focusSize**(`value`): `void`

#### Parameters

• **value**: `Point`

#### Returns

`Point`

#### Source

[src/gameobjects/Container.ts:92](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L92)

***

### focusable

> `get` **focusable**(): `boolean`

> `set` **focusable**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:100](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L100)

***

### isSelected

> `get` **isSelected**(): `boolean`

Gets whether is selected

#### Returns

`boolean`

#### Source

[src/input/Selectable.ts:65](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L65)

***

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/gameobjects/Container.ts:125](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L125)

***

### useAsCaptionTarget

> `get` **useAsCaptionTarget**(): `boolean`

> `set` **useAsCaptionTarget**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:62](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L62)

***

### voiceover

> `get` **voiceover**(): `string`

> `set` **voiceover**(`value`): `void`

#### Parameters

• **value**: `string`

#### Returns

`string`

#### Source

[src/gameobjects/Container.ts:70](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L70)

## Methods

### deselect()

> **deselect**(): `void`

Deselects selectable

#### Returns

`void`

#### Implementation of

[`ISelectable`](/api/interfaces/iselectable/).[`deselect`](/api/interfaces/iselectable/#deselect)

#### Source

[src/input/Selectable.ts:83](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L83)

***

### destroy()

> **destroy**(`_options`?): `void`

#### Parameters

• **\_options?**: `boolean` \| `IDestroyOptions`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`destroy`](/api/classes/container/#destroy)

#### Source

[src/gameobjects/Container.ts:133](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L133)

***

### disableEditMode()

> **disableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`disableEditMode`](/api/classes/container/#disableeditmode)

#### Source

[src/gameobjects/Container.ts:174](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L174)

***

### enableEditMode()

> **enableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`enableEditMode`](/api/classes/container/#enableeditmode)

#### Source

[src/gameobjects/Container.ts:170](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L170)

***

### getFocusPosition()

> **getFocusPosition**(): `Point`

Gets focus position

#### Returns

`Point`

PIXI.Point

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`getFocusPosition`](/api/interfaces/ifocusable/#getfocusposition)

#### Overrides

[`Container`](/api/classes/container/).[`getFocusPosition`](/api/classes/container/#getfocusposition)

#### Source

[src/input/Selectable.ts:129](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L129)

***

### getFocusSize()

> **getFocusSize**(): `IPoint`

Gets focus size

#### Returns

`IPoint`

PIXI.Point

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`getFocusSize`](/api/interfaces/ifocusable/#getfocussize)

#### Overrides

[`Container`](/api/classes/container/).[`getFocusSize`](/api/classes/container/#getfocussize)

#### Source

[src/input/Selectable.ts:141](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L141)

***

### isFocusable()

> **isFocusable**(): `boolean`

#### Returns

`boolean`

true if this focusable can be focused
Defaults to this.interactive && this.worldVisible

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`isFocusable`](/api/interfaces/ifocusable/#isfocusable)

#### Inherited from

[`Container`](/api/classes/container/).[`isFocusable`](/api/classes/container/#isfocusable)

#### Source

[src/gameobjects/Container.ts:166](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L166)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

onFocusActivated

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusActivated`](/api/interfaces/ifocusable/#onfocusactivated)

#### Overrides

[`Container`](/api/classes/container/).[`onFocusActivated`](/api/classes/container/#onfocusactivated)

#### Source

[src/input/Selectable.ts:120](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L120)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

onFocusBegin

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusBegin`](/api/interfaces/ifocusable/#onfocusbegin)

#### Overrides

[`Container`](/api/classes/container/).[`onFocusBegin`](/api/classes/container/#onfocusbegin)

#### Source

[src/input/Selectable.ts:106](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L106)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

onFocusEnd

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusEnd`](/api/interfaces/ifocusable/#onfocusend)

#### Overrides

[`Container`](/api/classes/container/).[`onFocusEnd`](/api/classes/container/#onfocusend)

#### Source

[src/input/Selectable.ts:113](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L113)

***

### onResize()

> **onResize**(`_size`): `void`

#### Parameters

• **\_size**: `IPoint`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onResize`](/api/classes/container/#onresize)

#### Source

[src/gameobjects/Container.ts:180](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L180)

***

### select()

> **select**(): `void`

Selects selectable

#### Returns

`void`

#### Implementation of

[`ISelectable`](/api/interfaces/iselectable/).[`select`](/api/interfaces/iselectable/#select)

#### Source

[src/input/Selectable.ts:72](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L72)

***

### toggleSelected()

> **toggleSelected**(): `void`

Toggles selected

#### Returns

`void`

#### Implementation of

[`ISelectable`](/api/interfaces/iselectable/).[`toggleSelected`](/api/interfaces/iselectable/#toggleselected)

#### Source

[src/input/Selectable.ts:95](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L95)

***

### update()

> **update**(`_deltaTime`): `void`

#### Parameters

• **\_deltaTime**: `number`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`update`](/api/classes/container/#update)

#### Source

[src/gameobjects/Container.ts:184](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L184)
