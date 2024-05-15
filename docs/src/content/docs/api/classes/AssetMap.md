---
editUrl: false
next: false
prev: false
title: "AssetMap"
---

## Constructors

### new AssetMap()

> **new AssetMap**(): [`AssetMap`](/api/classes/assetmap/)

#### Returns

[`AssetMap`](/api/classes/assetmap/)

## Methods

### addAssetGroup()

> `static` **addAssetGroup**(`pGroupId`, `pAssets`): `void`

Add a group of assets under the id passed in.

#### Parameters

• **pGroupId**: `string`

The id of the asset group - usually the id of the state.

• **pAssets**: [`AssetMapData`](/api/classes/assetmapdata/)[]

A list of asset names.

#### Returns

`void`

#### Source

[src/load/AssetMap.ts:14](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/load/AssetMap.ts#L14)

***

### getAssetGroup()

> `static` **getAssetGroup**(`pGroupId`): [`AssetMapData`](/api/classes/assetmapdata/)[]

Retrieves the assets in the specified group.

#### Parameters

• **pGroupId**: `string`

The id of the asset group.

#### Returns

[`AssetMapData`](/api/classes/assetmapdata/)[]

The assets or and empty string array if map is empty or group not found.

#### Source

[src/load/AssetMap.ts:23](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/load/AssetMap.ts#L23)
