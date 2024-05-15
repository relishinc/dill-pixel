---
editUrl: false
next: false
prev: false
title: "IPopup"
---

## Extends

- `DisplayObject`

## Properties

### blackout?

> `optional` **blackout**: `Sprite` \| `Graphics`

A full-screen overlay that prevents clicks on things behind the Popup
Note that this will not be a child of the Popup

#### Source

[src/popup/IPopup.ts:15](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/IPopup.ts#L15)

***

### id

> `readonly` **id**: `string`

Note that IDs are, for now, shared among all instances of the same type of popup.
Typescript quirk: a `readonly` Field can be implemented as a read-only Property (i.e. a getter)

#### Source

[src/popup/IPopup.ts:9](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/IPopup.ts#L9)

***

### keyboardToClose

> `readonly` **keyboardToClose**: `boolean`

Whether or not to close the popup when the escape key (or Android back button) is pressed

#### Source

[src/popup/IPopup.ts:17](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/IPopup.ts#L17)

## Methods

### hide()

> **hide**(): `void`

Hide the popup.
When implementing, make sure to call `hidePopupComplete(this)` afterwards

#### Returns

`void`

#### Source

[src/popup/IPopup.ts:46](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/IPopup.ts#L46)

***

### init()

> **init**(`size`): `void`

"Delayed constructor", this is called before [()](../../../../../../api/interfaces/ipopup/#show)

#### Parameters

• **size**: `Point`

Screen size, in pixels(?)

#### Returns

`void`

#### Source

[src/popup/IPopup.ts:52](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/IPopup.ts#L52)

***

### onResize()

> **onResize**(`size`): `void`

Window resize handler

#### Parameters

• **size**: `Point`

Screen size, in pixels(?)

#### Returns

`void`

#### Description

This should be called by [PopupManager.onResize](../../../../../../api/classes/popupmanager/#onresize)

#### Source

[src/popup/IPopup.ts:31](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/IPopup.ts#L31)

***

### show()

> **show**(`token`): `void`

Show the popup, and set the close callback

#### Parameters

• **token**: [`IPopupToken`](/api/interfaces/ipopuptoken/)

#### Returns

`void`

#### Source

[src/popup/IPopup.ts:40](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/IPopup.ts#L40)

***

### update()

> **update**(`deltaTime`): `void`

Update tick. Needed for some animations.

#### Parameters

• **deltaTime**: `number`

Seconds elapsed since last call to update()

#### Returns

`void`

#### Description

This should be called by [PopupManager.update](../../../../../../api/classes/popupmanager/#update)

#### Source

[src/popup/IPopup.ts:24](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/IPopup.ts#L24)
