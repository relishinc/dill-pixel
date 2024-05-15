---
editUrl: false
next: false
prev: false
title: "Container"
---

Enhanced PIXI Container that has:
a factory for adding children,
a reference to the Application instance,
a signal connection manager,
and auto update / resize capabilities
 Container

## Extends

- `Container`

## Type parameters

• **T** *extends* [`Application`](/api/classes/application/) = [`Application`](/api/classes/application/)

## Implements

- [`IFocusable`](/api/interfaces/ifocusable/)

## Constructors

### new Container()

> **new Container**\<`T`\>(`autoResize`, `autoUpdate`, `autoBindMethods`): [`Container`](/api/classes/container/)\<`T`\>

#### Parameters

• **autoResize**: `boolean`= `true`

• **autoUpdate**: `boolean`= `false`

• **autoBindMethods**: `boolean`= `true`

#### Returns

[`Container`](/api/classes/container/)\<`T`\>

#### Overrides

`PIXIContainer.constructor`

#### Source

[src/gameobjects/Container.ts:36](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L36)

## Properties

### childrenEditable

> **childrenEditable**: `boolean` = `true`

#### Source

[src/gameobjects/Container.ts:23](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L23)

***

### editable

> **editable**: `boolean` = `true`

#### Source

[src/gameobjects/Container.ts:22](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L22)

***

### \_\_dill\_pixel\_top\_level\_class

> `static` **\_\_dill\_pixel\_top\_level\_class**: `boolean` = `true`

#### Source

[src/gameobjects/Container.ts:21](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L21)

## Accessors

### add

> `get` **add**(): [`Add`](/api/classes/add/)

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/gameobjects/Container.ts:121](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L121)

***

### app

> `get` **app**(): `T`

#### Returns

`T`

#### Source

[src/gameobjects/Container.ts:129](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L129)

***

### editMode

> `get` **editMode**(): `boolean`

> `set` **editMode**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:108](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L108)

***

### focusPosition

> `get` **focusPosition**(): `Point`

> `set` **focusPosition**(`value`): `void`

#### Parameters

• **value**: `Point`

#### Returns

`Point`

#### Source

[src/gameobjects/Container.ts:84](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L84)

***

### focusSize

> `get` **focusSize**(): `Point`

> `set` **focusSize**(`value`): `void`

#### Parameters

• **value**: `Point`

#### Returns

`Point`

#### Source

[src/gameobjects/Container.ts:92](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L92)

***

### focusable

> `get` **focusable**(): `boolean`

> `set` **focusable**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:100](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L100)

***

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/gameobjects/Container.ts:125](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L125)

***

### useAsCaptionTarget

> `get` **useAsCaptionTarget**(): `boolean`

> `set` **useAsCaptionTarget**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:62](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L62)

***

### voiceover

> `get` **voiceover**(): `string`

> `set` **voiceover**(`value`): `void`

#### Parameters

• **value**: `string`

#### Returns

`string`

#### Source

[src/gameobjects/Container.ts:70](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L70)

## Methods

### destroy()

> **destroy**(`_options`?): `void`

#### Parameters

• **\_options?**: `boolean` \| `IDestroyOptions`

#### Returns

`void`

#### Overrides

`PIXIContainer.destroy`

#### Source

[src/gameobjects/Container.ts:133](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L133)

***

### disableEditMode()

> **disableEditMode**(): `void`

#### Returns

`void`

#### Source

[src/gameobjects/Container.ts:174](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L174)

***

### enableEditMode()

> **enableEditMode**(): `void`

#### Returns

`void`

#### Source

[src/gameobjects/Container.ts:170](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L170)

***

### getFocusPosition()

> **getFocusPosition**(): `Point`

Gets the position in global coordinate space that the focus should be centred around.

#### Returns

`Point`

The position that the focus should be centred around.

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`getFocusPosition`](/api/interfaces/ifocusable/#getfocusposition)

#### Source

[src/gameobjects/Container.ts:158](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L158)

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

[src/gameobjects/Container.ts:162](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L162)

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

[src/gameobjects/Container.ts:166](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L166)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

Called when this Focusable is focussed and then activated.

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusActivated`](/api/interfaces/ifocusable/#onfocusactivated)

#### Source

[src/gameobjects/Container.ts:156](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L156)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

Called when this Focusable is focussed.

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusBegin`](/api/interfaces/ifocusable/#onfocusbegin)

#### Source

[src/gameobjects/Container.ts:144](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L144)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

Called when this Focusable is no longer focussed.

#### Returns

`void`

#### Implementation of

[`IFocusable`](/api/interfaces/ifocusable/).[`onFocusEnd`](/api/interfaces/ifocusable/#onfocusend)

#### Source

[src/gameobjects/Container.ts:150](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L150)

***

### onResize()

> **onResize**(`_size`): `void`

#### Parameters

• **\_size**: `IPoint`

#### Returns

`void`

#### Source

[src/gameobjects/Container.ts:180](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L180)

***

### update()

> **update**(`_deltaTime`): `void`

#### Parameters

• **\_deltaTime**: `number`

#### Returns

`void`

#### Source

[src/gameobjects/Container.ts:184](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L184)
