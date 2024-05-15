---
editUrl: false
next: false
prev: false
title: "IFocusable"
---

## Properties

### name

> `readonly` **name**: `undefined` \| `null` \| `string`

For debugging purposes

#### Source

[src/input/IFocusable.ts:7](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/input/IFocusable.ts#L7)

***

### parent?

> `optional` **parent**: `any`

#### Source

[src/input/IFocusable.ts:4](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/input/IFocusable.ts#L4)

## Methods

### getFocusPosition()

> **getFocusPosition**(): `Point`

Gets the position in global coordinate space that the focus should be centred around.

#### Returns

`Point`

The position that the focus should be centred around.

#### Source

[src/input/IFocusable.ts:28](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/input/IFocusable.ts#L28)

***

### getFocusSize()

> **getFocusSize**(): `IPoint`

Gets the size of the area in global coordinate space that the focus should surround.

#### Returns

`IPoint`

The size of the area that the focus should surround.

#### Source

[src/input/IFocusable.ts:34](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/input/IFocusable.ts#L34)

***

### isFocusable()?

> `optional` **isFocusable**(): `boolean`

#### Returns

`boolean`

true if this focusable can be focused
Defaults to this.interactive && this.worldVisible

#### Source

[src/input/IFocusable.ts:40](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/input/IFocusable.ts#L40)

***

### onFocusActivated()

> **onFocusActivated**(): `void`

Called when this Focusable is focussed and then activated.

#### Returns

`void`

#### Source

[src/input/IFocusable.ts:22](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/input/IFocusable.ts#L22)

***

### onFocusBegin()

> **onFocusBegin**(): `void`

Called when this Focusable is focussed.

#### Returns

`void`

#### Source

[src/input/IFocusable.ts:12](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/input/IFocusable.ts#L12)

***

### onFocusEnd()

> **onFocusEnd**(): `void`

Called when this Focusable is no longer focussed.

#### Returns

`void`

#### Source

[src/input/IFocusable.ts:17](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/input/IFocusable.ts#L17)
