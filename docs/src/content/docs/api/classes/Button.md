---
editUrl: false
next: false
prev: false
title: "Button"
---

## Implements

## Description

A class representing a button.

## Extends

- [`Container`](/api/classes/container/)

## Implements

- [`IFocusable`](/api/interfaces/ifocusable/)

## Constructors

### new Button()

> **new Button**(`config`): [`Button`](/api/classes/button/)

#### Parameters

• **config**: `Partial`\<`ButtonConfig`\>

The configuration for the button.

#### Returns

[`Button`](/api/classes/button/)

#### Overrides

[`Container`](/api/classes/container/).[`constructor`](/api/classes/container/#constructors)

#### Source

[src/gameobjects/Button.ts:49](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L49)

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

### isDown

> **isDown**: `boolean`

#### Source

[src/gameobjects/Button.ts:37](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L37)

***

### onDown

> **onDown**: [`Signal`](/api/classes/signal/)\<() => `void`\>

#### Source

[src/gameobjects/Button.ts:27](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L27)

***

### onOut

> **onOut**: [`Signal`](/api/classes/signal/)\<() => `void`\>

#### Source

[src/gameobjects/Button.ts:29](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L29)

***

### onOver

> **onOver**: [`Signal`](/api/classes/signal/)\<() => `void`\>

#### Source

[src/gameobjects/Button.ts:30](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L30)

***

### onPress

> **onPress**: [`Signal`](/api/classes/signal/)\<() => `void`\>

#### Source

[src/gameobjects/Button.ts:31](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L31)

***

### onUp

> **onUp**: [`Signal`](/api/classes/signal/)\<() => `void`\>

#### Source

[src/gameobjects/Button.ts:28](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L28)

***

### view

> **view**: `Sprite`

#### Source

[src/gameobjects/Button.ts:34](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L34)

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

### enabled

> `set` **enabled**(`enabled`): `void`

#### Description

Sets the enabled state of the button.

#### Parameters

• **enabled**: `boolean`

Whether the button is enabled.

#### Source

[src/gameobjects/Button.ts:68](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L68)

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

Gets the position in global coordinate space that the focus should be centred around.

#### Returns

`Point`

The position that the focus should be centred around.

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`getFocusPosition`](/api/interfaces/ifocusable/#getfocusposition)

#### Inherited from

[`Container`](/api/classes/container/).[`getFocusPosition`](/api/classes/container/#getfocusposition)

#### Source

[src/gameobjects/Container.ts:158](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L158)

***

### getFocusSize()

> **getFocusSize**(): `Point`

#### Returns

`Point`

The focus size.

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`getFocusSize`](/api/interfaces/ifocusable/#getfocussize)

#### Overrides

[`Container`](/api/classes/container/).[`getFocusSize`](/api/classes/container/#getfocussize)

#### Description

Gets the focus size of the button.

#### Source

[src/gameobjects/Button.ts:115](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L115)

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

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusActivated`](/api/interfaces/ifocusable/#onfocusactivated)

#### Overrides

[`Container`](/api/classes/container/).[`onFocusActivated`](/api/classes/container/#onfocusactivated)

#### Description

Handles the focus activated event.

#### Source

[src/gameobjects/Button.ts:99](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L99)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusBegin`](/api/interfaces/ifocusable/#onfocusbegin)

#### Overrides

[`Container`](/api/classes/container/).[`onFocusBegin`](/api/classes/container/#onfocusbegin)

#### Description

Handles the focus begin event.

#### Source

[src/gameobjects/Button.ts:92](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L92)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusEnd`](/api/interfaces/ifocusable/#onfocusend)

#### Overrides

[`Container`](/api/classes/container/).[`onFocusEnd`](/api/classes/container/#onfocusend)

#### Description

Handles the focus end event.

#### Source

[src/gameobjects/Button.ts:107](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Button.ts#L107)

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
