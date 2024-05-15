---
editUrl: false
next: false
prev: false
title: "LoadScreen"
---

Load screen

## Extends

- [`State`](/api/classes/state/)

## Constructors

### new LoadScreen()

> **new LoadScreen**(): [`LoadScreen`](/api/classes/loadscreen/)

#### Returns

[`LoadScreen`](/api/classes/loadscreen/)

#### Overrides

`State.constructor`

#### Source

[src/load/LoadScreen.ts:9](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/LoadScreen.ts#L9)

## Properties

### childrenEditable

> **childrenEditable**: `boolean` = `true`

#### Inherited from

[`State`](/api/classes/state/).[`childrenEditable`](/api/classes/state/#childreneditable)

#### Source

[src/gameobjects/Container.ts:23](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L23)

***

### editable

> **editable**: `boolean` = `true`

#### Inherited from

[`State`](/api/classes/state/).[`editable`](/api/classes/state/#editable)

#### Source

[src/gameobjects/Container.ts:22](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L22)

***

### NAME

> `static` **NAME**: `string` = `'State'`

#### Inherited from

[`State`](/api/classes/state/).[`NAME`](/api/classes/state/#name)

#### Source

[src/state/State.ts:13](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L13)

***

### \_\_dill\_pixel\_top\_level\_class

> `static` **\_\_dill\_pixel\_top\_level\_class**: `boolean` = `true`

#### Inherited from

[`State`](/api/classes/state/).[`__dill_pixel_top_level_class`](/api/classes/state/#__dill_pixel_top_level_class)

#### Source

[src/gameobjects/Container.ts:21](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L21)

## Accessors

### add

> `get` **add**(): [`Add`](/api/classes/add/)

gets the Add factory

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/state/State.ts:38](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L38)

***

### app

> `get` **app**(): `T`

#### Returns

`T`

#### Source

[src/gameobjects/Container.ts:129](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L129)

***

### autoProgress

> `get` **autoProgress**(): `boolean`

autoProgress

#### Returns

`boolean`

#### Source

[src/load/LoadScreen.ts:17](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/LoadScreen.ts#L17)

***

### data

> `get` **data**(): `any`

> `set` **data**(`value`): `void`

#### Parameters

• **value**: `any`

#### Returns

`any`

#### Source

[src/state/State.ts:57](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L57)

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

gets the Make factory

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/state/State.ts:45](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L45)

***

### size

> `get` **size**(): `IPoint`

> `set` **size**(`value`): `void`

#### Parameters

• **value**: `IPoint`

#### Returns

`IPoint`

#### Source

[src/state/State.ts:49](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L49)

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

***

### Assets

> `get` `static` **Assets**(): [`AssetMapData`](/api/classes/assetmapdata/)[]

> `set` `static` **Assets**(`pAssets`): `void`

#### Parameters

• **pAssets**: [`AssetMapData`](/api/classes/assetmapdata/)[]

#### Returns

[`AssetMapData`](/api/classes/assetmapdata/)[]

#### Source

[src/state/State.ts:27](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L27)

***

### ID

> `get` `static` **ID**(): `string`

#### Returns

`string`

#### Source

[src/state/State.ts:23](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L23)

## Methods

### animateIn()

> **animateIn**(`callback`): `void` \| `Promise`\<`void`\>

Animates in

#### Parameters

• **callback**

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`State`](/api/classes/state/).[`animateIn`](/api/classes/state/#animatein)

#### Source

[src/state/State.ts:110](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L110)

***

### animateOut()

> **animateOut**(`callback`): `void` \| `Promise`\<`void`\>

Animates out

#### Parameters

• **callback**

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`State`](/api/classes/state/).[`animateOut`](/api/classes/state/#animateout)

#### Source

[src/state/State.ts:119](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L119)

***

### destroy()

> **destroy**(`destroyOptions`): `void`

Destroys state.

#### Parameters

• **destroyOptions**: `undefined` \| `boolean` \| `IDestroyOptions`= `undefined`

#### Returns

`void`

#### Inherited from

[`State`](/api/classes/state/).[`destroy`](/api/classes/state/#destroy)

#### Source

[src/state/State.ts:85](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L85)

***

### disableEditMode()

> **disableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`State`](/api/classes/state/).[`disableEditMode`](/api/classes/state/#disableeditmode)

#### Source

[src/gameobjects/Container.ts:174](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L174)

***

### enableEditMode()

> **enableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`State`](/api/classes/state/).[`enableEditMode`](/api/classes/state/#enableeditmode)

#### Source

[src/gameobjects/Container.ts:170](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L170)

***

### getFocusPosition()

> **getFocusPosition**(): `Point`

Gets the position in global coordinate space that the focus should be centred around.

#### Returns

`Point`

The position that the focus should be centred around.

#### Inherited from

[`State`](/api/classes/state/).[`getFocusPosition`](/api/classes/state/#getfocusposition)

#### Source

[src/gameobjects/Container.ts:158](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L158)

***

### getFocusSize()

> **getFocusSize**(): `IPoint`

Gets the size of the area in global coordinate space that the focus should surround.

#### Returns

`IPoint`

The size of the area that the focus should surround.

#### Inherited from

[`State`](/api/classes/state/).[`getFocusSize`](/api/classes/state/#getfocussize)

#### Source

[src/gameobjects/Container.ts:162](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L162)

***

### init()

> **init**(`size`): `void` \| `Promise`\<`void`\>

Inits state

#### Parameters

• **size**: `IPoint`

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[`State`](/api/classes/state/).[`init`](/api/classes/state/#init)

#### Source

[src/state/State.ts:97](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L97)

***

### isFocusable()

> **isFocusable**(): `boolean`

#### Returns

`boolean`

true if this focusable can be focused
Defaults to this.interactive && this.worldVisible

#### Inherited from

[`State`](/api/classes/state/).[`isFocusable`](/api/classes/state/#isfocusable)

#### Source

[src/gameobjects/Container.ts:166](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L166)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

Called when this Focusable is focussed and then activated.

#### Returns

`void`

#### Inherited from

[`State`](/api/classes/state/).[`onFocusActivated`](/api/classes/state/#onfocusactivated)

#### Source

[src/gameobjects/Container.ts:156](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L156)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

Called when this Focusable is focussed.

#### Returns

`void`

#### Inherited from

[`State`](/api/classes/state/).[`onFocusBegin`](/api/classes/state/#onfocusbegin)

#### Source

[src/gameobjects/Container.ts:144](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L144)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

Called when this Focusable is no longer focussed.

#### Returns

`void`

#### Inherited from

[`State`](/api/classes/state/).[`onFocusEnd`](/api/classes/state/#onfocusend)

#### Source

[src/gameobjects/Container.ts:150](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L150)

***

### onLoadComplete()

> **onLoadComplete**(`pCallback`): `void`

onLoadComplete

#### Parameters

• **pCallback**

#### Returns

`void`

#### Source

[src/load/LoadScreen.ts:33](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/LoadScreen.ts#L33)

***

### onLoadProgress()

> **onLoadProgress**(`_progress`): `void`

onLoadProgress

#### Parameters

• **\_progress**: `number`

#### Returns

`void`

#### Source

[src/load/LoadScreen.ts:25](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/LoadScreen.ts#L25)

***

### onResize()

> **onResize**(`size`): `void`

Determines whether resize on

#### Parameters

• **size**: `IPoint`

#### Returns

`void`

#### Inherited from

[`State`](/api/classes/state/).[`onResize`](/api/classes/state/#onresize)

#### Source

[src/state/State.ts:77](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L77)

***

### positionSelfCenter()

> **positionSelfCenter**(`size`): `void`

#### Parameters

• **size**: `Point`

#### Returns

`void`

#### Inherited from

[`State`](/api/classes/state/).[`positionSelfCenter`](/api/classes/state/#positionselfcenter)

#### Source

[src/state/State.ts:102](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L102)

***

### update()

> **update**(`deltaTime`): `void`

Updates state

#### Parameters

• **deltaTime**: `number`

#### Returns

`void`

#### Inherited from

[`State`](/api/classes/state/).[`update`](/api/classes/state/#update)

#### Source

[src/state/State.ts:69](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/state/State.ts#L69)
