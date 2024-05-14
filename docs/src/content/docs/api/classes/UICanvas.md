---
editUrl: false
next: false
prev: false
title: "UICanvas"
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

### new UICanvas()

> **new UICanvas**(`settings`): [`UICanvas`](/api/classes/uicanvas/)

#### Parameters

• **settings**: `Partial`\<[`UICanvasProps`](/api/type-aliases/uicanvasprops/)\>= `undefined`

#### Returns

[`UICanvas`](/api/classes/uicanvas/)

#### Overrides

[`Container`](/api/classes/container/).[`constructor`](/api/classes/container/#constructors)

#### Source

[src/ui/UICanvas.ts:75](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L75)

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

### bounds

> `get` **bounds**(): `Bounds`

#### Returns

`Bounds`

#### Source

[src/ui/UICanvas.ts:90](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L90)

***

### canvasChildren

> `get` **canvasChildren**(): `DisplayObject`[]

#### Returns

`DisplayObject`[]

#### Source

[src/ui/UICanvas.ts:86](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L86)

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

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/gameobjects/Container.ts:125](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/gameobjects/Container.ts#L125)

***

### padding

> `set` **padding**(`value`): `void`

#### Parameters

• **value**: `number` \| `Partial`\<[`UICanvasPadding`](/api/type-aliases/uicanvaspadding/)\> \| `object`

#### Source

[src/ui/UICanvas.ts:100](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L100)

***

### size

> `set` **size**(`value`): `void`

#### Parameters

• **value**: [`PointLike`](/api/type-aliases/pointlike/)

#### Source

[src/ui/UICanvas.ts:94](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L94)

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

### addChild()

> **addChild**\<`U`\>(...`children`): `U`\[`0`\]

#### Type parameters

• **U** *extends* `DisplayObject`[]

#### Parameters

• ...**children**: `DisplayObject`[]

#### Returns

`U`\[`0`\]

#### Overrides

`Container.addChild`

#### Source

[src/ui/UICanvas.ts:119](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L119)

***

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

[src/ui/UICanvas.ts:174](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L174)

***

### addElement()

> **addElement**\<`U`\>(`child`, `settings`?): `U`

#### Type parameters

• **U** *extends* `Container`\<`DisplayObject`\> = `Container`\<`DisplayObject`\>

#### Parameters

• **child**: `Container`\<`DisplayObject`\>

• **settings?**: `Partial`\<[`UICanvasChildSettings`](/api/interfaces/uicanvaschildsettings/)\>

#### Returns

`U`

#### Source

[src/ui/UICanvas.ts:233](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L233)

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

[src/ui/UICanvas.ts:219](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L219)

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

[src/ui/UICanvas.ts:206](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L206)

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

### layout()

> **layout**(): `void`

#### Returns

`void`

#### Source

[src/ui/UICanvas.ts:223](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L223)

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

> **onResize**(): `void`

#### Returns

`void`

#### Overrides

[`Container`](/api/classes/container/).[`onResize`](/api/classes/container/#onresize)

#### Source

[src/ui/UICanvas.ts:105](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L105)

***

### reAlign()

> **reAlign**(`child`, `settings`): `void`

#### Parameters

• **child**: `Container`\<`DisplayObject`\>

• **settings**: [`UICanvasEdge`](/api/type-aliases/uicanvasedge/) \| `Partial`\<[`UICanvasChildSettings`](/api/interfaces/uicanvaschildsettings/)\>

#### Returns

`void`

#### Source

[src/ui/UICanvas.ts:263](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L263)

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

[src/ui/UICanvas.ts:153](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L153)

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

[src/ui/UICanvas.ts:132](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L132)

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

[src/ui/UICanvas.ts:141](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L141)

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

[src/ui/UICanvas.ts:190](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L190)

***

### update()

> **update**(): `void`

#### Returns

`void`

#### Overrides

[`Container`](/api/classes/container/).[`update`](/api/classes/container/#update)

#### Source

[src/ui/UICanvas.ts:113](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/ui/UICanvas.ts#L113)
