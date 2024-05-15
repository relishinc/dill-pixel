---
editUrl: false
next: false
prev: false
title: "DefaultKeyboardFocusManagerSprite"
---

## Extends

- `Sprite`

## Implements

- [`IKeyboardFocus`](/api/interfaces/ikeyboardfocus/)

## Constructors

### new DefaultKeyboardFocusManagerSprite()

> **new DefaultKeyboardFocusManagerSprite**(`padding`, `outlineOptions`): [`DefaultKeyboardFocusManagerSprite`](/api/classes/defaultkeyboardfocusmanagersprite/)

#### Parameters

• **padding**: `number`= `DefaultKeyboardFocusManagerSprite.PADDING`

• **outlineOptions**: `ILineStyleOptions`= `undefined`

#### Returns

[`DefaultKeyboardFocusManagerSprite`](/api/classes/defaultkeyboardfocusmanagersprite/)

#### Overrides

`Sprite.constructor`

#### Source

[src/input/DefaultKeyboardFocusManagerSprite.ts:15](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/DefaultKeyboardFocusManagerSprite.ts#L15)

## Properties

### COLOR

> `static` **COLOR**: `number` = `0xff0000`

#### Source

[src/input/DefaultKeyboardFocusManagerSprite.ts:8](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/DefaultKeyboardFocusManagerSprite.ts#L8)

***

### LINE\_WIDTH

> `static` **LINE\_WIDTH**: `number` = `2`

#### Source

[src/input/DefaultKeyboardFocusManagerSprite.ts:10](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/DefaultKeyboardFocusManagerSprite.ts#L10)

***

### PADDING

> `static` **PADDING**: `number` = `4`

#### Source

[src/input/DefaultKeyboardFocusManagerSprite.ts:9](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/DefaultKeyboardFocusManagerSprite.ts#L9)

## Accessors

### target

> `get` **target**(): `undefined` \| [`IFocusable`](/api/interfaces/ifocusable/)

#### Returns

`undefined` \| [`IFocusable`](/api/interfaces/ifocusable/)

#### Source

[src/input/DefaultKeyboardFocusManagerSprite.ts:26](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/DefaultKeyboardFocusManagerSprite.ts#L26)

## Methods

### hide()

> **hide**(`pOnComplete`?): `void`

#### Parameters

• **pOnComplete?**

#### Returns

`void`

#### Implementation of

[`IKeyboardFocus`](/api/interfaces/ikeyboardfocus/).[`hide`](/api/interfaces/ikeyboardfocus/#hide)

#### Source

[src/input/DefaultKeyboardFocusManagerSprite.ts:35](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/DefaultKeyboardFocusManagerSprite.ts#L35)

***

### redraw()

> **redraw**(): `void`

#### Returns

`void`

#### Implementation of

[`IKeyboardFocus`](/api/interfaces/ikeyboardfocus/).[`redraw`](/api/interfaces/ikeyboardfocus/#redraw)

#### Source

[src/input/DefaultKeyboardFocusManagerSprite.ts:47](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/DefaultKeyboardFocusManagerSprite.ts#L47)

***

### show()

> **show**(`pFocusable`): `void`

#### Parameters

• **pFocusable**: [`IFocusable`](/api/interfaces/ifocusable/)

#### Returns

`void`

#### Implementation of

[`IKeyboardFocus`](/api/interfaces/ikeyboardfocus/).[`show`](/api/interfaces/ikeyboardfocus/#show)

#### Source

[src/input/DefaultKeyboardFocusManagerSprite.ts:30](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/DefaultKeyboardFocusManagerSprite.ts#L30)
