---
editUrl: false
next: false
prev: false
title: "ResizeManager"
---

## Implements

- `IResizeManager`

## Constructors

### new ResizeManager()

> **new ResizeManager**(`app`, `pSizeMin`?, `pSizeMax`?): [`ResizeManager`](/api/classes/resizemanager/)

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

• **pSizeMin?**: `Point`

• **pSizeMax?**: `Point`

#### Returns

[`ResizeManager`](/api/classes/resizemanager/)

#### Source

[src/utils/ResizeManager.ts:24](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L24)

## Accessors

### options

> `get` **options**(): `ResizeManagerOptions`

> `set` **options**(`value`): `void`

#### Parameters

• **value**: `ResizeManagerOptions`

#### Returns

`ResizeManagerOptions`

#### Source

[src/utils/ResizeManager.ts:46](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L46)

***

### scale

> `get` **scale**(): `number`

#### Returns

`number`

#### Source

[src/utils/ResizeManager.ts:68](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L68)

***

### screenSize

> `get` **screenSize**(): `Point`

#### Returns

`Point`

#### Source

[src/utils/ResizeManager.ts:64](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L64)

***

### size

> `get` **size**(): `Point`

#### Returns

`Point`

#### Source

[src/utils/ResizeManager.ts:60](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L60)

***

### sizeMax

> `set` **sizeMax**(`pSize`): `void`

#### Parameters

• **pSize**: `Point`

#### Source

[src/utils/ResizeManager.ts:84](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L84)

***

### sizeMin

> `set` **sizeMin**(`pSize`): `void`

#### Parameters

• **pSize**: `Point`

#### Source

[src/utils/ResizeManager.ts:79](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L79)

***

### useAspectRatio

> `get` **useAspectRatio**(): `boolean`

#### Returns

`boolean`

#### Source

[src/utils/ResizeManager.ts:75](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L75)

## Methods

### getScaleRatio()

> **getScaleRatio**(`size`): `number`

#### Parameters

• **size**: `Point`= `undefined`

#### Returns

`number`

#### Source

[src/utils/ResizeManager.ts:121](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L121)

***

### getSize()

> **getSize**(): `Point`

#### Returns

`Point`

#### Implementation of

`IResizeManager.getSize`

#### Source

[src/utils/ResizeManager.ts:101](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L101)

***

### getStageScale()

> **getStageScale**(): `number`

#### Returns

`number`

#### Source

[src/utils/ResizeManager.ts:141](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L141)

***

### initialize()

> **initialize**(): `void`

#### Returns

`void`

#### Implementation of

`IResizeManager.initialize`

#### Source

[src/utils/ResizeManager.ts:97](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L97)

***

### resize()

> **resize**(): `void`

#### Returns

`void`

#### Implementation of

`IResizeManager.resize`

#### Source

[src/utils/ResizeManager.ts:99](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L99)

***

### setDesiredSize()

> **setDesiredSize**(`desiredSize`, `maxFactor`): `void`

#### Parameters

• **desiredSize**: `Point`

• **maxFactor**: `number`= `4`

#### Returns

`void`

#### Source

[src/utils/ResizeManager.ts:108](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/ResizeManager.ts#L108)
