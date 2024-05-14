---
editUrl: false
next: false
prev: false
title: "AssetMapData"
---

Stores data used to load and unload assets.

## Extended by

- [`AssetMapAudioData`](/api/classes/assetmapaudiodata/)
- [`AssetMapSpineData`](/api/classes/assetmapspinedata/)
- [`FontAsset`](/api/classes/fontasset/)
- [`IAsset`](/api/interfaces/iasset/)
- [`JsonAsset`](/api/classes/jsonasset/)
- [`SpineAsset`](/api/classes/spineasset/)
- [`TextureAsset`](/api/classes/textureasset/)
- [`TextureAtlasAsset`](/api/classes/textureatlasasset/)
- [`WebFontAsset`](/api/classes/webfontasset/)

## Constructors

### new AssetMapData()

> **new AssetMapData**(`pAssetName`, `pAssetType`): [`AssetMapData`](/api/classes/assetmapdata/)

:::caution[Deprecated]
use asset classes from Load/Assets package
:::

#### Parameters

• **pAssetName**: `string`

• **pAssetType**: [`AssetType`](/api/enumerations/assettype/)

#### Returns

[`AssetMapData`](/api/classes/assetmapdata/)

#### Source

[src/load/AssetMapData.ts:33](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L33)

## Properties

### assetName

> **assetName**: `string`

The name of the asset file.

#### Source

[src/load/AssetMapData.ts:12](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L12)

***

### assetPath

> **assetPath**: `string` = `''`

Path to the asset

#### Source

[src/load/AssetMapData.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L20)

***

### assetType

> **assetType**: [`AssetType`](/api/enumerations/assettype/)

The type of the asset file.

#### Source

[src/load/AssetMapData.ts:16](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L16)

***

### data

> **data**: `any`

#### Source

[src/load/AssetMapData.ts:26](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L26)

***

### resolutionSuffix

> **resolutionSuffix**: `string` = `''`

If resolution suffix is set the asset is loaded only on devices with the matched asset resolution

#### Source

[src/load/AssetMapData.ts:24](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L24)

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Source

[src/load/AssetMapData.ts:57](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L57)

***

### getLoaderOptions()

> **getLoaderOptions**(): `undefined` \| `Partial`\<`any`\>

#### Returns

`undefined` \| `Partial`\<`any`\>

#### Source

[src/load/AssetMapData.ts:46](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L46)

***

### getResource()

> **getResource**(): `any`

#### Returns

`any`

#### Source

[src/load/AssetMapData.ts:38](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L38)

***

### isLoaded()

> **isLoaded**(): `boolean`

#### Returns

`boolean`

#### Source

[src/load/AssetMapData.ts:52](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L52)
