---
editUrl: false
next: false
prev: false
title: "CompoundHitArea"
---

Compound hit area

## Implements

- `IHitArea`

## Constructors

### new CompoundHitArea()

> **new CompoundHitArea**(`pComponents`): [`CompoundHitArea`](/api/classes/compoundhitarea/)

#### Parameters

• **pComponents**: [`PixiShape`](/api/namespaces/pixiutils/type-aliases/pixishape/)[]

#### Returns

[`CompoundHitArea`](/api/classes/compoundhitarea/)

#### Source

[src/input/CompoundHitArea.ts:10](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/CompoundHitArea.ts#L10)

## Accessors

### components

> `get` **components**(): [`PixiShape`](/api/namespaces/pixiutils/type-aliases/pixishape/)[]

Gets components

#### Returns

[`PixiShape`](/api/namespaces/pixiutils/type-aliases/pixishape/)[]

#### Source

[src/input/CompoundHitArea.ts:17](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/CompoundHitArea.ts#L17)

## Methods

### contains()

> **contains**(`pX`, `pY`): `boolean`

contains

#### Parameters

• **pX**: `number`

• **pY**: `number`

#### Returns

`boolean`

boolean

#### Implementation of

`IHitArea.contains`

#### Source

[src/input/CompoundHitArea.ts:27](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/input/CompoundHitArea.ts#L27)