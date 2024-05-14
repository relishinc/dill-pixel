---
editUrl: false
next: false
prev: false
title: "AssetMapSpineData"
---

## Extends

- [`AssetMapData`](/api/classes/assetmapdata/)

## Constructors

### new AssetMapSpineData()

> **new AssetMapSpineData**(`pName`, `pAtlasName`, `pAssetType`): [`AssetMapSpineData`](/api/classes/assetmapspinedata/)

:::caution[Deprecated]
use Load/Assets/SpineAsset
:::

#### Parameters

• **pName**: `string`

Spine skeleton filename, without the extension (e.g. `spineboy` if your file is `spineboy.json`)

• **pAtlasName**: `string`= `pName`

Spine atlas filename. Defaults to the same as the skeleton (e.g. `spineboy` if your files are `spineboy@1x.atlas` and `spineboy@2x.atlas`)

• **pAssetType**: [`SPINE_JSON`](/api/enumerations/assettype/#spine_json) \| [`SPINE_SKEL`](/api/enumerations/assettype/#spine_skel)= `AssetType.SPINE_JSON`

Json or binary (*.skel) format of spine skeleton data

#### Returns

[`AssetMapSpineData`](/api/classes/assetmapspinedata/)

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`constructor`](/api/classes/assetmapdata/#constructors)

#### Source

[src/load/AssetMapSpineData.ts:16](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapSpineData.ts#L16)

## Properties

### assetName

> **assetName**: `string`

The name of the asset file.

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetName`](/api/classes/assetmapdata/#assetname)

#### Source

[src/load/AssetMapData.ts:12](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L12)

***

### assetPath

> **assetPath**: `string` = `''`

Path to the asset

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetPath`](/api/classes/assetmapdata/#assetpath)

#### Source

[src/load/AssetMapData.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L20)

***

### assetType

> **assetType**: [`AssetType`](/api/enumerations/assettype/)

The type of the asset file.

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetType`](/api/classes/assetmapdata/#assettype)

#### Source

[src/load/AssetMapData.ts:16](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L16)

***

### atlas

> `readonly` **atlas**: `string`

#### Source

[src/load/AssetMapSpineData.ts:8](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapSpineData.ts#L8)

***

### data

> **data**: `any`

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`data`](/api/classes/assetmapdata/#data)

#### Source

[src/load/AssetMapData.ts:26](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L26)

***

### resolutionSuffix

> **resolutionSuffix**: `string` = `''`

If resolution suffix is set the asset is loaded only on devices with the matched asset resolution

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`resolutionSuffix`](/api/classes/assetmapdata/#resolutionsuffix)

#### Source

[src/load/AssetMapData.ts:24](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L24)

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`destroy`](/api/classes/assetmapdata/#destroy)

#### Source

[src/load/AssetMapData.ts:57](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L57)

***

### getLoaderOptions()

> **getLoaderOptions**(): `undefined` \| `Partial`\<`any`\>

#### Returns

`undefined` \| `Partial`\<`any`\>

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`getLoaderOptions`](/api/classes/assetmapdata/#getloaderoptions)

#### Source

[src/load/AssetMapSpineData.ts:25](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapSpineData.ts#L25)

***

### getResource()

> **getResource**(): `any`

#### Returns

`any`

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`getResource`](/api/classes/assetmapdata/#getresource)

#### Source

[src/load/AssetMapData.ts:38](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L38)

***

### isLoaded()

> **isLoaded**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`isLoaded`](/api/classes/assetmapdata/#isloaded)

#### Source

[src/load/AssetMapData.ts:52](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L52)
