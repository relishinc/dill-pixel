---
editUrl: false
next: false
prev: false
title: "PopupToken"
---

This is the data struct that gets passed to the showPopup signal

## Implements

- [`IPopupToken`](/api/interfaces/ipopuptoken/)

## Constructors

### new PopupToken()

> **new PopupToken**(`id`, `callback`?, `backdrop`?, `keyboard`?, `data`?): [`PopupToken`](/api/classes/popuptoken/)

Create a new [PopupToken](../../../../../../api/classes/popuptoken)
Alternatively, specify `"static"` for a backdrop which doesn't close the popup on click.

#### Parameters

• **id**: `string`

• **callback?**

• **backdrop?**: `boolean` \| `"static"`= `true`

• **keyboard?**: `boolean`= `true`

• **data?**: `any`

#### Returns

[`PopupToken`](/api/classes/popuptoken/)

#### Source

[src/popup/PopupToken.ts:25](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/PopupToken.ts#L25)

## Properties

### backdrop

> `readonly` **backdrop**: `boolean` \| `"static"` = `true`

#### Implementation of

[`IPopupToken`](/api/interfaces/ipopuptoken/).[`backdrop`](/api/interfaces/ipopuptoken/#backdrop)

#### Source

[src/popup/PopupToken.ts:28](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/PopupToken.ts#L28)

***

### callback()?

> `optional` `readonly` **callback**: (...`pParams`) => `void`

#### Parameters

• ...**pParams**: `any`[]

#### Returns

`void`

#### Implementation of

[`IPopupToken`](/api/interfaces/ipopuptoken/).[`callback`](/api/interfaces/ipopuptoken/#callback)

#### Source

[src/popup/PopupToken.ts:27](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/PopupToken.ts#L27)

***

### data?

> `optional` `readonly` **data**: `any`

#### Implementation of

[`IPopupToken`](/api/interfaces/ipopuptoken/).[`data`](/api/interfaces/ipopuptoken/#data)

#### Source

[src/popup/PopupToken.ts:30](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/PopupToken.ts#L30)

***

### id

> `readonly` **id**: `string`

#### Implementation of

[`IPopupToken`](/api/interfaces/ipopuptoken/).[`id`](/api/interfaces/ipopuptoken/#id)

#### Source

[src/popup/PopupToken.ts:26](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/PopupToken.ts#L26)

***

### keyboard

> `readonly` **keyboard**: `boolean` = `true`

#### Implementation of

[`IPopupToken`](/api/interfaces/ipopuptoken/).[`keyboard`](/api/interfaces/ipopuptoken/#keyboard)

#### Source

[src/popup/PopupToken.ts:29](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/popup/PopupToken.ts#L29)
