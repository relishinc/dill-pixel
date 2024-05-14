---
editUrl: false
next: false
prev: false
title: "PixelPerfectHitArea"
---

Pixel perfect hit area

## Implements

- `IHitArea`

## Constructors

### new PixelPerfectHitArea()

> **new PixelPerfectHitArea**(`pRenderer`, `pTarget`, `pThreshhold`): [`PixelPerfectHitArea`](/api/classes/pixelperfecthitarea/)

#### Parameters

• **pRenderer**: `Renderer`

• **pTarget**: `Sprite`

• **pThreshhold**: `number`= `0`

#### Returns

[`PixelPerfectHitArea`](/api/classes/pixelperfecthitarea/)

#### Source

[src/input/PixelPerfectHitArea.ts:13](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/PixelPerfectHitArea.ts#L13)

## Accessors

### height

> `get` **height**(): `number`

Gets height

#### Returns

`number`

#### Source

[src/input/PixelPerfectHitArea.ts:54](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/PixelPerfectHitArea.ts#L54)

***

### scaledHeight

> `get` **scaledHeight**(): `number`

Gets scaled height

#### Returns

`number`

#### Source

[src/input/PixelPerfectHitArea.ts:61](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/PixelPerfectHitArea.ts#L61)

***

### scaledWidth

> `get` **scaledWidth**(): `number`

Gets scaled width

#### Returns

`number`

#### Source

[src/input/PixelPerfectHitArea.ts:47](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/PixelPerfectHitArea.ts#L47)

***

### width

> `get` **width**(): `number`

Gets width

#### Returns

`number`

#### Source

[src/input/PixelPerfectHitArea.ts:40](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/PixelPerfectHitArea.ts#L40)

## Methods

### contains()

> **contains**(`pX`, `pY`): `boolean`

Contains pixel perfect hit area

#### Parameters

• **pX**: `number`

• **pY**: `number`

#### Returns

`boolean`

boolean

#### Implementation of

`IHitArea.contains`

#### Source

[src/input/PixelPerfectHitArea.ts:81](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/PixelPerfectHitArea.ts#L81)

***

### getHitAreaAtPixel()

> **getHitAreaAtPixel**(`pX`, `pY`): `boolean`

Gets hit area at pixel

#### Parameters

• **pX**: `number`

• **pY**: `number`

#### Returns

`boolean`

boolean

#### Source

[src/input/PixelPerfectHitArea.ts:71](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/input/PixelPerfectHitArea.ts#L71)
