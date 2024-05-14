---
editUrl: false
next: false
prev: false
title: "IAsset"
---

The interface extends AssetMapData for compatibility

## Extends

- [`AssetMapData`](/api/classes/assetmapdata/)

## Type parameters

• **T**

## Properties

### assetName

> `readonly` **assetName**: `string`

The name of the asset file.

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`assetName`](/api/classes/assetmapdata/#assetname)

#### Source

[src/load/assets/IAsset.ts:7](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/IAsset.ts#L7)

***

### assetPath

> `readonly` **assetPath**: `string`

Path to the asset

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`assetPath`](/api/classes/assetmapdata/#assetpath)

#### Source

[src/load/assets/IAsset.ts:8](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/IAsset.ts#L8)

***

### assetType

> **assetType**: [`AssetType`](/api/enumerations/assettype/)

The type of the asset file.

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetType`](/api/classes/assetmapdata/#assettype)

#### Source

[src/load/AssetMapData.ts:16](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L16)

***

### data

> **data**: `any`

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`data`](/api/classes/assetmapdata/#data)

#### Source

[src/load/AssetMapData.ts:26](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L26)

***

### resolutionSuffix

> **resolutionSuffix**: `string`

If resolution suffix is set the asset is loaded only on devices with the matched asset resolution

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`resolutionSuffix`](/api/classes/assetmapdata/#resolutionsuffix)

#### Source

[src/load/assets/IAsset.ts:9](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/IAsset.ts#L9)

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`destroy`](/api/classes/assetmapdata/#destroy)

#### Source

[src/load/assets/IAsset.ts:17](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/IAsset.ts#L17)

***

### getAsset()

> **getAsset**(): `T`

#### Returns

`T`

#### Source

[src/load/assets/IAsset.ts:11](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/IAsset.ts#L11)

***

### getLoaderOptions()

> **getLoaderOptions**(): `undefined` \| `Partial`\<`any`\>

#### Returns

`undefined` \| `Partial`\<`any`\>

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`getLoaderOptions`](/api/classes/assetmapdata/#getloaderoptions)

#### Source

[src/load/assets/IAsset.ts:13](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/IAsset.ts#L13)

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

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`isLoaded`](/api/classes/assetmapdata/#isloaded)

#### Source

[src/load/assets/IAsset.ts:15](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/IAsset.ts#L15)
