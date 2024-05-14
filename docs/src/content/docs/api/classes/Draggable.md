---
editUrl: false
next: false
prev: false
title: "Draggable"
---

Draggable

## Todo

SH: Strip the Chef Leo logic from this class and make it generic and customizable

## Extends

- [`Selectable`](/api/classes/selectable/)

## Constructors

### new Draggable()

> **new Draggable**(): [`Draggable`](/api/classes/draggable/)

#### Returns

[`Draggable`](/api/classes/draggable/)

#### Overrides

`Selectable.constructor`

#### Source

[src/input/Draggable.ts:19](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Draggable.ts#L19)

## Properties

### childrenEditable

> **childrenEditable**: `boolean` = `true`

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`childrenEditable`](/api/classes/selectable/#childreneditable)

#### Source

[src/gameobjects/Container.ts:23](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L23)

***

### editable

> **editable**: `boolean` = `true`

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`editable`](/api/classes/selectable/#editable)

#### Source

[src/gameobjects/Container.ts:22](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L22)

***

### onDeselected

> `readonly` **onDeselected**: (`p`) => `void`[]

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`onDeselected`](/api/classes/selectable/#ondeselected)

#### Source

[src/input/Selectable.ts:17](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L17)

***

### onSelected

> `readonly` **onSelected**: (`p`) => `void`[]

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`onSelected`](/api/classes/selectable/#onselected)

#### Source

[src/input/Selectable.ts:16](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L16)

***

### \_\_dill\_pixel\_top\_level\_class

> `static` **\_\_dill\_pixel\_top\_level\_class**: `boolean` = `true`

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`__dill_pixel_top_level_class`](/api/classes/selectable/#__dill_pixel_top_level_class)

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

### dragThreshold

> `set` **dragThreshold**(`pValue`): `void`

Sets drag threshold

#### Parameters

• **pValue**: `number`

#### Source

[src/input/Draggable.ts:48](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Draggable.ts#L48)

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

### isDragging

> `get` **isDragging**(): `boolean`

Gets whether is dragging

#### Returns

`boolean`

#### Source

[src/input/Draggable.ts:33](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Draggable.ts#L33)

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

### visuals

> `get` **visuals**(): `Container`\<`DisplayObject`\>

Gets visuals

#### Returns

`Container`\<`DisplayObject`\>

#### Source

[src/input/Draggable.ts:40](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Draggable.ts#L40)

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

### addVisual()

> **addVisual**(`pVisual`): `void`

#### Parameters

• **pVisual**: `Container`\<`DisplayObject`\>

#### Returns

`void`

#### Source

[src/input/Draggable.ts:152](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Draggable.ts#L152)

***

### attachVisuals()

> **attachVisuals**(): `void`

Attaches visuals

#### Returns

`void`

#### Source

[src/input/Draggable.ts:125](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Draggable.ts#L125)

***

### deselect()

> **deselect**(): `void`

Deselects draggable

#### Returns

`void`

#### Overrides

[`Selectable`](/api/classes/selectable/).[`deselect`](/api/classes/selectable/#deselect)

#### Source

[src/input/Draggable.ts:69](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Draggable.ts#L69)

***

### destroy()

> **destroy**(`_options`?): `void`

#### Parameters

• **\_options?**: `boolean` \| `IDestroyOptions`

#### Returns

`void`

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`destroy`](/api/classes/selectable/#destroy)

#### Source

[src/gameobjects/Container.ts:133](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L133)

***

### disableEditMode()

> **disableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`disableEditMode`](/api/classes/selectable/#disableeditmode)

#### Source

[src/gameobjects/Container.ts:174](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L174)

***

### drop()

> **drop**(): `void`

Drops draggable

#### Returns

`void`

#### Source

[src/input/Draggable.ts:132](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Draggable.ts#L132)

***

### enableEditMode()

> **enableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`enableEditMode`](/api/classes/selectable/#enableeditmode)

#### Source

[src/gameobjects/Container.ts:170](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L170)

***

### getFocusPosition()

> **getFocusPosition**(): `Point`

Gets focus position

#### Returns

`Point`

PIXI.Point

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`getFocusPosition`](/api/classes/selectable/#getfocusposition)

#### Source

[src/input/Selectable.ts:129](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L129)

***

### getFocusSize()

> **getFocusSize**(): `IPoint`

Gets focus size

#### Returns

`IPoint`

PIXI.Point

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`getFocusSize`](/api/classes/selectable/#getfocussize)

#### Source

[src/input/Selectable.ts:141](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L141)

***

### isFocusable()

> **isFocusable**(): `boolean`

#### Returns

`boolean`

true if this focusable can be focused
Defaults to this.interactive && this.worldVisible

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`isFocusable`](/api/classes/selectable/#isfocusable)

#### Source

[src/gameobjects/Container.ts:166](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L166)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

onFocusActivated

#### Returns

`void`

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`onFocusActivated`](/api/classes/selectable/#onfocusactivated)

#### Source

[src/input/Selectable.ts:120](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L120)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

onFocusBegin

#### Returns

`void`

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`onFocusBegin`](/api/classes/selectable/#onfocusbegin)

#### Source

[src/input/Selectable.ts:106](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Selectable.ts#L106)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

onFocusEnd

#### Returns

`void`

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`onFocusEnd`](/api/classes/selectable/#onfocusend)

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

[`Selectable`](/api/classes/selectable/).[`onResize`](/api/classes/selectable/#onresize)

#### Source

[src/gameobjects/Container.ts:180](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L180)

***

### removeAppListeners()

> **removeAppListeners**(): `void`

#### Returns

`void`

#### Source

[src/input/Draggable.ts:136](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Draggable.ts#L136)

***

### select()

> **select**(): `void`

Selects draggable

#### Returns

`void`

#### Overrides

[`Selectable`](/api/classes/selectable/).[`select`](/api/classes/selectable/#select)

#### Source

[src/input/Draggable.ts:61](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/Draggable.ts#L61)

***

### toggleSelected()

> **toggleSelected**(): `void`

Toggles selected

#### Returns

`void`

#### Inherited from

[`Selectable`](/api/classes/selectable/).[`toggleSelected`](/api/classes/selectable/#toggleselected)

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

[`Selectable`](/api/classes/selectable/).[`update`](/api/classes/selectable/#update)

#### Source

[src/gameobjects/Container.ts:184](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L184)
