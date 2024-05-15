---
editUrl: false
next: false
prev: false
title: "ObjectPool"
---

## Type parameters

• **T** *extends* [`IObjectPoolItem`](/api/interfaces/iobjectpoolitem/)

## Constructors

### new ObjectPool()

> **new ObjectPool**\<`T`\>(`classType`, `initialSize`, `maxSize`): [`ObjectPool`](/api/classes/objectpool/)\<`T`\>

#### Parameters

• **classType**

• **initialSize**: `number`= `0`

• **maxSize**: `number`= `0`

#### Returns

[`ObjectPool`](/api/classes/objectpool/)\<`T`\>

#### Source

[src/gameobjects/ObjectPool.ts:9](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/ObjectPool.ts#L9)

## Properties

### classType()

> **classType**: (...`args`) => `T`

#### Parameters

• ...**args**: `any`[]

#### Returns

`T`

#### Source

[src/gameobjects/ObjectPool.ts:10](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/ObjectPool.ts#L10)

***

### initialSize

> **initialSize**: `number` = `0`

#### Source

[src/gameobjects/ObjectPool.ts:11](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/ObjectPool.ts#L11)

***

### maxSize

> **maxSize**: `number` = `0`

#### Source

[src/gameobjects/ObjectPool.ts:12](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/ObjectPool.ts#L12)

## Methods

### clear()

> **clear**(`destroyItems`): `void`

#### Parameters

• **destroyItems**: `boolean`= `false`

#### Returns

`void`

#### Source

[src/gameobjects/ObjectPool.ts:42](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/ObjectPool.ts#L42)

***

### conditionalRelease()

> **conditionalRelease**(`item`, `condition`): `void`

#### Parameters

• **item**: `T`

• **condition**

#### Returns

`void`

#### Source

[src/gameobjects/ObjectPool.ts:35](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/ObjectPool.ts#L35)

***

### get()

> **get**(): `T`

#### Returns

`T`

#### Source

[src/gameobjects/ObjectPool.ts:19](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/ObjectPool.ts#L19)

***

### release()

> **release**(`item`): `void`

#### Parameters

• **item**: `T`

#### Returns

`void`

#### Source

[src/gameobjects/ObjectPool.ts:27](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/gameobjects/ObjectPool.ts#L27)
