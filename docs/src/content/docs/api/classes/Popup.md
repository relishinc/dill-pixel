---
editUrl: false
next: false
prev: false
title: "Popup"
---

This is an abstract class from which all Popups should inherit.
However, you can also make your own implementation of [IPopup](../../../../../../api/interfaces/ipopup) if necessary.

## Extends

- [`Container`](/api/classes/container/)\<`T`\>

## Type parameters

• **T** *extends* [`Application`](/api/classes/application/) = [`Application`](/api/classes/application/)

## Implements

- [`IPopup`](/api/interfaces/ipopup/)

## Constructors

### new Popup()

> **new Popup**\<`T`\>(`data`?): [`Popup`](/api/classes/popup/)\<`T`\>

#### Parameters

• **data?**: `any`

#### Returns

[`Popup`](/api/classes/popup/)\<`T`\>

#### Overrides

[`Container`](/api/classes/container/).[`constructor`](/api/classes/container/#constructors)

#### Source

[src/popup/Popup.ts:48](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L48)

## Properties

### blackout?

> `optional` **blackout**: `Sprite` \| `Graphics`

A full-screen overlay that prevents clicks on things behind the Popup
Note that this will not be a child of the Popup

#### Implementation of

[`IPopup`](/api/interfaces/ipopup/).[`blackout`](/api/interfaces/ipopup/#blackout)

#### Source

[src/popup/Popup.ts:32](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L32)

***

### childrenEditable

> **childrenEditable**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`childrenEditable`](/api/classes/container/#childreneditable)

#### Source

[src/gameobjects/Container.ts:23](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L23)

***

### editable

> **editable**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`editable`](/api/classes/container/#editable)

#### Source

[src/gameobjects/Container.ts:22](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L22)

***

### NAME

> `static` `readonly` **NAME**: `string` = `'__Popup'`

#### Source

[src/popup/Popup.ts:33](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L33)

***

### \_\_dill\_pixel\_top\_level\_class

> `static` **\_\_dill\_pixel\_top\_level\_class**: `boolean` = `true`

#### Inherited from

[`Container`](/api/classes/container/).[`__dill_pixel_top_level_class`](/api/classes/container/#__dill_pixel_top_level_class)

#### Source

[src/gameobjects/Container.ts:21](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L21)

## Accessors

### add

> `get` **add**(): [`Add`](/api/classes/add/)

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/gameobjects/Container.ts:121](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L121)

***

### app

> `get` **app**(): `T`

#### Returns

`T`

#### Source

[src/gameobjects/Container.ts:129](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L129)

***

### editMode

> `get` **editMode**(): `boolean`

> `set` **editMode**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:108](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L108)

***

### focusPosition

> `get` **focusPosition**(): `Point`

> `set` **focusPosition**(`value`): `void`

#### Parameters

• **value**: `Point`

#### Returns

`Point`

#### Source

[src/gameobjects/Container.ts:84](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L84)

***

### focusSize

> `get` **focusSize**(): `Point`

> `set` **focusSize**(`value`): `void`

#### Parameters

• **value**: `Point`

#### Returns

`Point`

#### Source

[src/gameobjects/Container.ts:92](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L92)

***

### focusable

> `get` **focusable**(): `boolean`

> `set` **focusable**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:100](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L100)

***

### id

> `get` **id**(): `string`

Note that IDs are, for now, shared among all instances of the same type of popup.
Typescript quirk: a `readonly` Field can be implemented as a read-only Property (i.e. a getter)

#### Returns

`string`

#### Source

[src/popup/Popup.ts:54](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L54)

***

### keyboardToClose

> `get` **keyboardToClose**(): `boolean`

Whether or not to close the popup when the escape key (or Android back button) is pressed

#### Returns

`boolean`

#### Source

[src/popup/Popup.ts:59](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L59)

***

### make

> `get` **make**(): *typeof* [`Make`](/api/classes/make/)

#### Returns

*typeof* [`Make`](/api/classes/make/)

#### Source

[src/gameobjects/Container.ts:125](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L125)

***

### popupData

> `get` **popupData**(): `any`

#### Returns

`any`

#### Source

[src/popup/Popup.ts:68](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L68)

***

### state

> `get` **state**(): [`PopupState`](/api/enumerations/popupstate/)

This is used to prevent duplicate calls to e.g. [hide](../../../../../../api/classes/popup/#hide)

#### Returns

[`PopupState`](/api/enumerations/popupstate/)

#### Source

[src/popup/Popup.ts:64](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L64)

***

### useAsCaptionTarget

> `get` **useAsCaptionTarget**(): `boolean`

> `set` **useAsCaptionTarget**(`value`): `void`

#### Parameters

• **value**: `boolean`

#### Returns

`boolean`

#### Source

[src/gameobjects/Container.ts:62](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L62)

***

### voiceover

> `get` **voiceover**(): `string`

> `set` **voiceover**(`value`): `void`

#### Parameters

• **value**: `string`

#### Returns

`string`

#### Source

[src/gameobjects/Container.ts:70](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L70)

## Methods

### destroy()

> **destroy**(`options`?): `void`

#### Parameters

• **options?**: `boolean` \| `IDestroyOptions`

#### Returns

`void`

#### Implementation of

`IPopup.destroy`

#### Overrides

[`Container`](/api/classes/container/).[`destroy`](/api/classes/container/#destroy)

#### Source

[src/popup/Popup.ts:124](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L124)

***

### disableEditMode()

> **disableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`disableEditMode`](/api/classes/container/#disableeditmode)

#### Source

[src/gameobjects/Container.ts:174](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L174)

***

### enableEditMode()

> **enableEditMode**(): `void`

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`enableEditMode`](/api/classes/container/#enableeditmode)

#### Source

[src/gameobjects/Container.ts:170](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L170)

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

[src/gameobjects/Container.ts:158](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L158)

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

[src/gameobjects/Container.ts:162](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L162)

***

### hide()

> **hide**(): `void`

Hide the popup, but only if it's open

#### Returns

`void`

#### Implementation of

[`IPopup`](/api/interfaces/ipopup/).[`hide`](/api/interfaces/ipopup/#hide)

#### Source

[src/popup/Popup.ts:73](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L73)

***

### init()

> **init**(`size`): `void`

"Delayed constructor", this is called before [()](../../../../../../api/interfaces/ipopup/#show)

#### Parameters

• **size**: `Point`

Screen size, in pixels(?)

#### Returns

`void`

#### Implementation of

[`IPopup`](/api/interfaces/ipopup/).[`init`](/api/interfaces/ipopup/#init)

#### Source

[src/popup/Popup.ts:80](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L80)

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

[src/gameobjects/Container.ts:166](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L166)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

Called when this Focusable is focussed and then activated.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusActivated`](/api/classes/container/#onfocusactivated)

#### Source

[src/gameobjects/Container.ts:156](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L156)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

Called when this Focusable is focussed.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusBegin`](/api/classes/container/#onfocusbegin)

#### Source

[src/gameobjects/Container.ts:144](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L144)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

Called when this Focusable is no longer focussed.

#### Returns

`void`

#### Inherited from

[`Container`](/api/classes/container/).[`onFocusEnd`](/api/classes/container/#onfocusend)

#### Source

[src/gameobjects/Container.ts:150](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/Container.ts#L150)

***

### onResize()

> **onResize**(`size`): `void`

Window resize handler

#### Parameters

• **size**: `Point`

Screen size, in pixels(?)

#### Returns

`void`

#### Implementation of

[`IPopup`](/api/interfaces/ipopup/).[`onResize`](/api/interfaces/ipopup/#onresize)

#### Overrides

[`Container`](/api/classes/container/).[`onResize`](/api/classes/container/#onresize)

#### Description

This should be called by [PopupManager.onResize](../../../../../../api/classes/popupmanager/#onresize)

#### Source

[src/popup/Popup.ts:89](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L89)

***

### show()

> **show**(`token`): `void`

Show the popup, and set the close callback
You probably want to override animateIn, not [show](../../../../../../api/classes/popup/#show)

#### Parameters

• **token**: [`IPopupToken`](/api/interfaces/ipopuptoken/)

#### Returns

`void`

#### Implementation of

[`IPopup`](/api/interfaces/ipopup/).[`show`](/api/interfaces/ipopup/#show)

#### Source

[src/popup/Popup.ts:113](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L113)

***

### update()

> **update**(`_deltaTime`): `void`

Update tick. Needed for some animations.
Override this

#### Parameters

• **\_deltaTime**: `number`

Seconds elapsed since last call to [update](../../../../../../api/classes/popup/#update)

#### Returns

`void`

#### Implementation of

[`IPopup`](/api/interfaces/ipopup/).[`update`](/api/interfaces/ipopup/#update)

#### Overrides

[`Container`](/api/classes/container/).[`update`](/api/classes/container/#update)

#### Source

[src/popup/Popup.ts:104](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/Popup.ts#L104)
