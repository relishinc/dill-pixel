---
editUrl: false
next: false
prev: false
title: "FlexContainer"
---

Enhanced PIXI Container that has:
a factory for adding children,
a reference to the Application instance,
a signal connection manager,
and auto update / resize capabilities
 Container

## Extends

- [`Container`](/api/classes/container/)

## Constructors

### new FlexContainer()

> **new FlexContainer**(`settings`): [`FlexContainer`](/api/classes/flexcontainer/)

#### Parameters

• **settings**: `Partial`\<[`FlexContainerSettings`](/api/interfaces/flexcontainersettings/)\>= `{}`

#### Returns

[`FlexContainer`](/api/classes/flexcontainer/)

#### Overrides

[`Container`](/api/classes/container/).[`constructor`](/api/classes/container/#constructors)

#### Source

[src/ui/FlexContainer.ts:32](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L32)

## Properties

### childrenEditable

> **childrenEditable**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`childrenEditable`](/api/classes/container/#childreneditable)

#### Source

[src/gameobjects/Container.ts:23](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L23)

***

### debug

> **debug**: `boolean` = `false`

#### Source

[src/ui/FlexContainer.ts:20](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L20)

***

### editable

> **editable**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`editable`](/api/classes/container/#editable)

#### Source

[src/gameobjects/Container.ts:22](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L22)

***

### onLayoutComplete

> **onLayoutComplete**: `Signal`\<() => `void`\>

#### Source

[src/ui/FlexContainer.ts:19](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L19)

***

### \_\_dill\_pixel\_top\_level\_class

> `static` **\_\_dill\_pixel\_top\_level\_class**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`__dill_pixel_top_level_class`](/api/classes/container/#__dill_pixel_top_level_class)

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

### alignItems

> `get` **alignItems**(): `"center"` \| `"flex-start"` \| `"flex-end"`

> `set` **alignItems**(`value`): `void`

#### Parameters

• **value**: `"center"` \| `"flex-start"` \| `"flex-end"`

#### Returns

`"center"` \| `"flex-start"` \| `"flex-end"`

#### Source

[src/ui/FlexContainer.ts:83](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L83)

***

### app

> `get` **app**(): `T`

#### Returns

`T`

#### Source

[src/gameobjects/Container.ts:129](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L129)

***

### containerHeight

> `get` **containerHeight**(): `number`

> `set` **containerHeight**(`value`): `void`

#### Parameters

• **value**: `number`

#### Returns

`number`

#### Source

[src/ui/FlexContainer.ts:101](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L101)

***

### containerWidth

> `get` **containerWidth**(): `number`

> `set` **containerWidth**(`value`): `void`

#### Parameters

• **value**: `number`

#### Returns

`number`

#### Source

[src/ui/FlexContainer.ts:110](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L110)

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

### flexChildren

> `get` **flexChildren**(): `DisplayObject`[]

#### Returns

`DisplayObject`[]

#### Source

[src/ui/FlexContainer.ts:130](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L130)

***

### flexDirection

> `get` **flexDirection**(): `"row"` \| `"column"`

> `set` **flexDirection**(`value`): `void`

#### Parameters

• **value**: `"row"` \| `"column"`

#### Returns

`"row"` \| `"column"`

#### Source

[src/ui/FlexContainer.ts:74](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L74)

***

### flexWrap

> `get` **flexWrap**(): `"wrap"` \| `"nowrap"`

> `set` **flexWrap**(`value`): `void`

#### Parameters

• **value**: `"wrap"` \| `"nowrap"`

#### Returns

`"wrap"` \| `"nowrap"`

#### Source

[src/ui/FlexContainer.ts:65](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L65)

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

### gap

> `get` **gap**(): `number`

> `set` **gap**(`value`): `void`

#### Parameters

• **value**: `number`

#### Returns

`number`

#### Source

[src/ui/FlexContainer.ts:56](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L56)

***

### justifyContent

> `get` **justifyContent**(): `"center"` \| `"flex-start"` \| `"flex-end"` \| `"space-between"` \| `"space-around"` \| `"space-evenly"`

> `set` **justifyContent**(`value`): `void`

#### Parameters

• **value**: `"center"` \| `"flex-start"` \| `"flex-end"` \| `"space-between"` \| `"space-around"` \| `"space-evenly"`

#### Returns

`"center"` \| `"flex-start"` \| `"flex-end"` \| `"space-between"` \| `"space-around"` \| `"space-evenly"`

#### Source

[src/ui/FlexContainer.ts:92](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L92)

***

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/gameobjects/Container.ts:125](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L125)

***

### size

> `get` **size**(): `object`

> `set` **size**(`size`): `void`

#### Parameters

• **size**: [`PointLike`](/api/type-aliases/pointlike/)

#### Returns

`object`

##### height

> **height**: `number`

##### width

> **width**: `number`

#### Source

[src/ui/FlexContainer.ts:119](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L119)

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

### addChildAt()

> **addChildAt**\<`U`\>(`child`, `index`): `U`

Adds a child to the container at the specified index
Override because we need to ensure it sets the child index properly

#### Type parameters

• **U** *extends* `DisplayObject` = `DisplayObject`

#### Parameters

• **child**: `DisplayObject`

• **index**: `number`

#### Returns

`U`

#### Overrides

`Container.addChildAt`

#### Source

[src/ui/FlexContainer.ts:193](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L193)

***

### destroy()

> **destroy**(`_options`?): `void`

#### Parameters

• **\_options?**: `boolean` \| `IDestroyOptions`

#### Returns

`void`

#### Overrides

[`Container`](/api/classes/container/).[`destroy`](/api/classes/container/#destroy)

#### Source

[src/ui/FlexContainer.ts:134](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L134)

***

### disableEditMode()

> **disableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`disableEditMode`](/api/classes/container/#disableeditmode)

#### Source

[src/gameobjects/Container.ts:174](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L174)

***

### enableEditMode()

> **enableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`enableEditMode`](/api/classes/container/#enableeditmode)

#### Source

[src/gameobjects/Container.ts:170](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L170)

***

### getChildAt()

> **getChildAt**(`index`): `DisplayObject`

Gets the child at the specified index
Override due to re-parenting

#### Parameters

• **index**: `number`

#### Returns

`DisplayObject`

#### Overrides

`Container.getChildAt`

#### Source

[src/ui/FlexContainer.ts:235](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L235)

***

### getChildIndex()

> **getChildIndex**(`child`): `number`

Gets the index of a child in the container
Override because we need to ensure it targets the parent container that we added

#### Parameters

• **child**: `DisplayObject`

#### Returns

`number`

#### Overrides

`Container.getChildIndex`

#### Source

[src/ui/FlexContainer.ts:222](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L222)

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

[src/gameobjects/Container.ts:158](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L158)

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

[src/gameobjects/Container.ts:162](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L162)

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

[src/gameobjects/Container.ts:166](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L166)

***

### layout()

> **layout**(): `void`

Public method to manually trigger a layout

#### Returns

`void`

#### Source

[src/ui/FlexContainer.ts:242](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L242)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

Called when this Focusable is focussed and then activated.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusActivated`](/api/classes/container/#onfocusactivated)

#### Source

[src/gameobjects/Container.ts:156](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L156)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

Called when this Focusable is focussed.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusBegin`](/api/classes/container/#onfocusbegin)

#### Source

[src/gameobjects/Container.ts:144](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L144)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

Called when this Focusable is no longer focussed.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusEnd`](/api/classes/container/#onfocusend)

#### Source

[src/gameobjects/Container.ts:150](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L150)

***

### onResize()

> **onResize**(`_size`): `void`

#### Parameters

• **\_size**: `IPoint`

#### Returns

`void`

#### Overrides

[`Container`](/api/classes/container/).[`onResize`](/api/classes/container/#onresize)

#### Source

[src/ui/FlexContainer.ts:141](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L141)

***

### removeChild()

> **removeChild**(...`children`): `DisplayObject`

Removes one or more children from the container
Override because we need to ensure it returns the proper re-parented children

#### Parameters

• ...**children**: `DisplayObject`[]

#### Returns

`DisplayObject`

#### Overrides

`Container.removeChild`

#### Source

[src/ui/FlexContainer.ts:172](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L172)

***

### removeChildAt()

> **removeChildAt**(`index`): `DisplayObject`

Removes a child from the container at the specified index
Override because we need to remove from the inner container

#### Parameters

• **index**: `number`

#### Returns

`DisplayObject`

#### Overrides

`Container.removeChildAt`

#### Source

[src/ui/FlexContainer.ts:151](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L151)

***

### removeChildren()

> **removeChildren**(): `DisplayObject`[]

Removes all the children from the container
Override because we need to ensure it returns the proper re-parented children

#### Returns

`DisplayObject`[]

#### Overrides

`Container.removeChildren`

#### Source

[src/ui/FlexContainer.ts:160](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L160)

***

### setChildIndex()

> **setChildIndex**(`child`, `index`): `void`

Sets the index of the child in the container
Override because we need to ensure it targets the parent container that we added

#### Parameters

• **child**: `DisplayObject`

• **index**: `number`

#### Returns

`void`

#### Overrides

`Container.setChildIndex`

#### Source

[src/ui/FlexContainer.ts:206](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/ui/FlexContainer.ts#L206)

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

[src/gameobjects/Container.ts:184](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/gameobjects/Container.ts#L184)
