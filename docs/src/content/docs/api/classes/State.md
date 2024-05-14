---
editUrl: false
next: false
prev: false
title: "State"
---

State

## Extends

- [`Container`](/api/classes/container/)\<`T`\>

## Type parameters

• **T** *extends* [`Application`](/api/classes/application/) = [`Application`](/api/classes/application/)

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

### NAME

> `static` **NAME**: `string` = `'State'`

#### Source

[src/state/State.ts:13](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L13)

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

gets the Add factory

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/state/State.ts:38](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L38)

***

### app

> `get` **app**(): `T`

#### Returns

`T`

#### Source

[src/gameobjects/Container.ts:129](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L129)

***

### data

> `get` **data**(): `any`

> `set` **data**(`value`): `void`

#### Parameters

• **value**: `any`

#### Returns

`any`

#### Source

[src/state/State.ts:57](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L57)

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

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

gets the Make factory

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/state/State.ts:45](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L45)

***

### size

> `get` **size**(): `IPoint`

> `set` **size**(`value`): `void`

#### Parameters

• **value**: `IPoint`

#### Returns

`IPoint`

#### Source

[src/state/State.ts:49](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L49)

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

***

### Assets

> `get` `static` **Assets**(): [`AssetMapData`](/api/classes/assetmapdata/)[]

> `set` `static` **Assets**(`pAssets`): `void`

#### Parameters

• **pAssets**: [`AssetMapData`](/api/classes/assetmapdata/)[]

#### Returns

[`AssetMapData`](/api/classes/assetmapdata/)[]

#### Source

[src/state/State.ts:27](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L27)

***

### ID

> `get` `static` **ID**(): `string`

#### Returns

`string`

#### Source

[src/state/State.ts:23](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L23)

## Methods

### animateIn()

> **animateIn**(`callback`): `void` \| `Promise`\<`void`\>

Animates in

#### Parameters

• **callback**

#### Returns

`void` \| `Promise`\<`void`\>

#### Source

[src/state/State.ts:110](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L110)

***

### animateOut()

> **animateOut**(`callback`): `void` \| `Promise`\<`void`\>

Animates out

#### Parameters

• **callback**

#### Returns

`void` \| `Promise`\<`void`\>

#### Source

[src/state/State.ts:119](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L119)

***

### destroy()

> **destroy**(`destroyOptions`): `void`

Destroys state.

#### Parameters

• **destroyOptions**: `undefined` \| `boolean` \| `IDestroyOptions`= `undefined`

#### Returns

`void`

#### Overrides

[`Container`](/api/classes/container/).[`destroy`](/api/classes/container/#destroy)

#### Source

[src/state/State.ts:85](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L85)

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

#### Inherited from

[`Container`](/api/classes/container/).[`getFocusPosition`](/api/classes/container/#getfocusposition)

#### Source

[src/gameobjects/Container.ts:158](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L158)

***

### getFocusSize()

> **getFocusSize**(): `IPoint`

Gets the size of the area in global coordinate space that the focus should surround.

#### Returns

`IPoint`

The size of the area that the focus should surround.

#### Inherited from

[`Container`](/api/classes/container/).[`getFocusSize`](/api/classes/container/#getfocussize)

#### Source

[src/gameobjects/Container.ts:162](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L162)

***

### init()

> **init**(`size`): `void` \| `Promise`\<`void`\>

Inits state

#### Parameters

• **size**: `IPoint`

#### Returns

`void` \| `Promise`\<`void`\>

#### Source

[src/state/State.ts:97](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L97)

***

### isFocusable()

> **isFocusable**(): `boolean`

#### Returns

`boolean`

true if this focusable can be focused
Defaults to this.interactive && this.worldVisible

#### Inherited from

[`Container`](/api/classes/container/).[`isFocusable`](/api/classes/container/#isfocusable)

#### Source

[src/gameobjects/Container.ts:166](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L166)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

Called when this Focusable is focussed and then activated.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusActivated`](/api/classes/container/#onfocusactivated)

#### Source

[src/gameobjects/Container.ts:156](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L156)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

Called when this Focusable is focussed.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusBegin`](/api/classes/container/#onfocusbegin)

#### Source

[src/gameobjects/Container.ts:144](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L144)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

Called when this Focusable is no longer focussed.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusEnd`](/api/classes/container/#onfocusend)

#### Source

[src/gameobjects/Container.ts:150](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L150)

***

### onResize()

> **onResize**(`size`): `void`

Determines whether resize on

#### Parameters

• **size**: `IPoint`

#### Returns

`void`

#### Overrides

[`Container`](/api/classes/container/).[`onResize`](/api/classes/container/#onresize)

#### Source

[src/state/State.ts:77](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L77)

***

### positionSelfCenter()

> **positionSelfCenter**(`size`): `void`

#### Parameters

• **size**: `Point`

#### Returns

`void`

#### Source

[src/state/State.ts:102](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L102)

***

### update()

> **update**(`deltaTime`): `void`

Updates state

#### Parameters

• **deltaTime**: `number`

#### Returns

`void`

#### Overrides

[`Container`](/api/classes/container/).[`update`](/api/classes/container/#update)

#### Source

[src/state/State.ts:69](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/state/State.ts#L69)
