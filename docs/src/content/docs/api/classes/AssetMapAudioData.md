---
editUrl: false
next: false
prev: false
title: "AssetMapAudioData"
---

Stores audio specific data used to load and unload assets.

## Extends

- [`AssetMapData`](/api/classes/assetmapdata/)

## Constructors

### new AssetMapAudioData()

> **new AssetMapAudioData**(`pName`, `pAssetType`, `pCategory`): [`AssetMapAudioData`](/api/classes/assetmapaudiodata/)

:::caution[Deprecated]
use Load/Assets/AudioAsset
:::

#### Parameters

• **pName**: `string`

• **pAssetType**: [`AssetType`](/api/enumerations/assettype/)

• **pCategory**: `string`

#### Returns

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/)

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`constructor`](/api/classes/assetmapdata/#constructors)

#### Source

[src/load/AssetMapAudioData.ts:21](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapAudioData.ts#L21)

## Properties

### assetName

> **assetName**: `string`

The name of the asset file.

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetName`](/api/classes/assetmapdata/#assetname)

#### Source

[src/load/AssetMapData.ts:12](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L12)

***

### assetPath

> **assetPath**: `string` = `''`

Path to the asset

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetPath`](/api/classes/assetmapdata/#assetpath)

#### Source

[src/load/AssetMapData.ts:20](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L20)

***

### assetType

> **assetType**: [`AssetType`](/api/enumerations/assettype/)

The type of the asset file.

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetType`](/api/classes/assetmapdata/#assettype)

#### Source

[src/load/AssetMapData.ts:16](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L16)

***

### category

> **category**: `string`

The category to add this audio asset to.

#### Source

[src/load/AssetMapAudioData.ts:13](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapAudioData.ts#L13)

***

### data

> **data**: `any`

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`data`](/api/classes/assetmapdata/#data)

#### Source

[src/load/AssetMapData.ts:26](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L26)

***

### resolutionSuffix

> **resolutionSuffix**: `string` = `''`

If resolution suffix is set the asset is loaded only on devices with the matched asset resolution

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`resolutionSuffix`](/api/classes/assetmapdata/#resolutionsuffix)

#### Source

[src/load/AssetMapData.ts:24](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L24)

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`destroy`](/api/classes/assetmapdata/#destroy)

#### Source

[src/load/AssetMapData.ts:57](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L57)

***

### getLoaderOptions()

> **getLoaderOptions**(): `undefined` \| `Partial`\<`any`\>

#### Returns

`undefined` \| `Partial`\<`any`\>

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`getLoaderOptions`](/api/classes/assetmapdata/#getloaderoptions)

#### Source

[src/load/AssetMapData.ts:46](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L46)

***

### getResource()

> **getResource**(): `any`

#### Returns

`any`

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`getResource`](/api/classes/assetmapdata/#getresource)

#### Source

[src/load/AssetMapData.ts:38](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L38)

***

### isLoaded()

> **isLoaded**(): `boolean`

#### Returns

`boolean`

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`isLoaded`](/api/classes/assetmapdata/#isloaded)

#### Source

[src/load/AssetMapAudioData.ts:26](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapAudioData.ts#L26)
