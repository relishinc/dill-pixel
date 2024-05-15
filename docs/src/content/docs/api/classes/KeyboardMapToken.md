---
editUrl: false
next: false
prev: false
title: "KeyboardMapToken"
---

## Constructors

### new KeyboardMapToken()

> **new KeyboardMapToken**(`pFocusable`, `pUp`?, `pDown`?, `pLeft`?, `pRight`?): [`KeyboardMapToken`](/api/classes/keyboardmaptoken/)

#### Parameters

• **pFocusable**: [`IFocusable`](/api/interfaces/ifocusable/)

• **pUp?**: [`IFocusable`](/api/interfaces/ifocusable/)

• **pDown?**: [`IFocusable`](/api/interfaces/ifocusable/)

• **pLeft?**: [`IFocusable`](/api/interfaces/ifocusable/)

• **pRight?**: [`IFocusable`](/api/interfaces/ifocusable/)

#### Returns

[`KeyboardMapToken`](/api/classes/keyboardmaptoken/)

#### Source

[src/input/KeyboardMapToken.ts:10](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/KeyboardMapToken.ts#L10)

## Properties

### neighbours

> `readonly` **neighbours**: `default`\<[`Direction`](/api/enumerations/direction/), `undefined` \| [`IFocusable`](/api/interfaces/ifocusable/)\>

#### Source

[src/input/KeyboardMapToken.ts:8](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/KeyboardMapToken.ts#L8)

***

### target

> `readonly` **target**: [`IFocusable`](/api/interfaces/ifocusable/)

#### Source

[src/input/KeyboardMapToken.ts:7](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/KeyboardMapToken.ts#L7)

## Methods

### getColumn()

> `static` **getColumn**(`pFocusables`, `pUp`?, `pDown`?, `pLeft`?, `pRight`?): [`KeyboardMapToken`](/api/classes/keyboardmaptoken/)[]

#### Parameters

• **pFocusables**: [`IFocusable`](/api/interfaces/ifocusable/)[]

the array of focusables aligned in a column

• **pUp?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on up key

• **pDown?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on down key

• **pLeft?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on left key

• **pRight?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on right key

#### Returns

[`KeyboardMapToken`](/api/classes/keyboardmaptoken/)[]

a set of KeyboardMapToken that makes a column in keyboard navigation

#### Source

[src/input/KeyboardMapToken.ts:49](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/KeyboardMapToken.ts#L49)

***

### getRow()

> `static` **getRow**(`pFocusables`, `pUp`?, `pDown`?, `pLeft`?, `pRight`?): [`KeyboardMapToken`](/api/classes/keyboardmaptoken/)[]

#### Parameters

• **pFocusables**: [`IFocusable`](/api/interfaces/ifocusable/)[]

the array of focusables aligned in a row

• **pUp?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on up key

• **pDown?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on down key

• **pLeft?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on left key

• **pRight?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on right key

#### Returns

[`KeyboardMapToken`](/api/classes/keyboardmaptoken/)[]

a set of KeyboardMapToken that makes a row in keyboard navigation

#### Source

[src/input/KeyboardMapToken.ts:28](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/KeyboardMapToken.ts#L28)

***

### getTable()

> `static` **getTable**(`pFocusables`, `pUp`?, `pDown`?, `pLeft`?, `pRight`?): [`KeyboardMapToken`](/api/classes/keyboardmaptoken/)[]

#### Parameters

• **pFocusables**: [`IFocusable`](/api/interfaces/ifocusable/)[][]

the array of focusables aligned in a table like:
[
 [a,b,c],
 [d,e,f]
]

• **pUp?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on up key

• **pDown?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on down key

• **pLeft?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on left key

• **pRight?**: [`IFocusable`](/api/interfaces/ifocusable/)

the outer focusable to navigate on right key

#### Returns

[`KeyboardMapToken`](/api/classes/keyboardmaptoken/)[]

a set of KeyboardMapToken that makes a table in keyboard navigation

#### Source

[src/input/KeyboardMapToken.ts:74](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/KeyboardMapToken.ts#L74)
