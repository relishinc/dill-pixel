---
editUrl: false
next: false
prev: false
title: "TextureAsset"
---

The interface extends AssetMapData for compatibility

## Extends

- [`AssetMapData`](/api/classes/assetmapdata/)

## Implements

- [`IAsset`](/api/interfaces/iasset/)\<`Texture`\>

## Constructors

### new TextureAsset()

> **new TextureAsset**(`assetName`, `assetPathOrType`?): [`TextureAsset`](/api/classes/textureasset/)

#### Parameters

• **assetName**: `string`

• **assetPathOrType?**: `string` \| [`PNG`](/api/enumerations/assettype/#png) \| [`JPG`](/api/enumerations/assettype/#jpg)

#### Returns

[`TextureAsset`](/api/classes/textureasset/)

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`constructor`](/api/classes/assetmapdata/#constructors)

#### Source

[src/load/assets/TextureAsset.ts:7](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/TextureAsset.ts#L7)

## Properties

### assetName

> **assetName**: `string`

The name of the asset file.

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`assetName`](/api/interfaces/iasset/#assetname)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetName`](/api/classes/assetmapdata/#assetname)

#### Source

[src/load/AssetMapData.ts:12](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L12)

***

### assetPath

> **assetPath**: `string` = `''`

Path to the asset

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`assetPath`](/api/interfaces/iasset/#assetpath)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetPath`](/api/classes/assetmapdata/#assetpath)

#### Source

[src/load/AssetMapData.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L20)

***

### assetType

> **assetType**: [`AssetType`](/api/enumerations/assettype/)

The type of the asset file.

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`assetType`](/api/interfaces/iasset/#assettype)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetType`](/api/classes/assetmapdata/#assettype)

#### Source

[src/load/AssetMapData.ts:16](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L16)

***

### data

> **data**: `any`

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`data`](/api/interfaces/iasset/#data)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`data`](/api/classes/assetmapdata/#data)

#### Source

[src/load/AssetMapData.ts:26](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L26)

***

### resolutionSuffix

> **resolutionSuffix**: `string` = `''`

If resolution suffix is set the asset is loaded only on devices with the matched asset resolution

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`resolutionSuffix`](/api/interfaces/iasset/#resolutionsuffix)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`resolutionSuffix`](/api/classes/assetmapdata/#resolutionsuffix)

#### Source

[src/load/AssetMapData.ts:24](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L24)

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`destroy`](/api/interfaces/iasset/#destroy)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`destroy`](/api/classes/assetmapdata/#destroy)

#### Source

[src/load/AssetMapData.ts:57](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L57)

***

### getAsset()

> **getAsset**(): `Texture`\<`Resource`\>

#### Returns

`Texture`\<`Resource`\>

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`getAsset`](/api/interfaces/iasset/#getasset)

#### Source

[src/load/assets/TextureAsset.ts:14](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/TextureAsset.ts#L14)

***

### getLoaderOptions()

> **getLoaderOptions**(): `undefined` \| `Partial`\<`any`\>

#### Returns

`undefined` \| `Partial`\<`any`\>

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`getLoaderOptions`](/api/interfaces/iasset/#getloaderoptions)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`getLoaderOptions`](/api/classes/assetmapdata/#getloaderoptions)

#### Source

[src/load/AssetMapData.ts:46](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L46)

***

### getResource()

> **getResource**(): `any`

#### Returns

`any`

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`getResource`](/api/interfaces/iasset/#getresource)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`getResource`](/api/classes/assetmapdata/#getresource)

#### Source

[src/load/AssetMapData.ts:38](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L38)

***

### isLoaded()

> **isLoaded**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`isLoaded`](/api/interfaces/iasset/#isloaded)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`isLoaded`](/api/classes/assetmapdata/#isloaded)

#### Source

[src/load/AssetMapData.ts:52](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L52)
