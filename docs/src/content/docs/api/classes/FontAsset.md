---
editUrl: false
next: false
prev: false
title: "FontAsset"
---

The interface extends AssetMapData for compatibility

## Extends

- [`AssetMapData`](/api/classes/assetmapdata/)

## Implements

- [`IAsset`](/api/interfaces/iasset/)\<[`IBitmapFontData`](/api/interfaces/ibitmapfontdata/)\>

## Constructors

### new FontAsset()

> **new FontAsset**(`assetName`, `assetPath`?): [`FontAsset`](/api/classes/fontasset/)

#### Parameters

• **assetName**: `string`

• **assetPath?**: `string`

#### Returns

[`FontAsset`](/api/classes/fontasset/)

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`constructor`](/api/classes/assetmapdata/#constructors)

#### Source

[src/load/assets/FontAsset.ts:23](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/FontAsset.ts#L23)

## Properties

### assetName

> **assetName**: `string`

The name of the asset file.

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`assetName`](/api/interfaces/iasset/#assetname)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetName`](/api/classes/assetmapdata/#assetname)

#### Source

[src/load/AssetMapData.ts:12](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L12)

***

### assetPath

> **assetPath**: `string` = `''`

Path to the asset

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`assetPath`](/api/interfaces/iasset/#assetpath)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetPath`](/api/classes/assetmapdata/#assetpath)

#### Source

[src/load/AssetMapData.ts:20](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L20)

***

### assetType

> **assetType**: [`AssetType`](/api/enumerations/assettype/)

The type of the asset file.

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`assetType`](/api/interfaces/iasset/#assettype)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`assetType`](/api/classes/assetmapdata/#assettype)

#### Source

[src/load/AssetMapData.ts:16](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L16)

***

### data

> **data**: `any`

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`data`](/api/interfaces/iasset/#data)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`data`](/api/classes/assetmapdata/#data)

#### Source

[src/load/AssetMapData.ts:26](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L26)

***

### resolutionSuffix

> **resolutionSuffix**: `string` = `''`

If resolution suffix is set the asset is loaded only on devices with the matched asset resolution

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`resolutionSuffix`](/api/interfaces/iasset/#resolutionsuffix)

#### Inherited from

[`AssetMapData`](/api/classes/assetmapdata/).[`resolutionSuffix`](/api/classes/assetmapdata/#resolutionsuffix)

#### Source

[src/load/AssetMapData.ts:24](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L24)

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

[src/load/AssetMapData.ts:57](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L57)

***

### getAsset()

> **getAsset**(): [`IBitmapFontData`](/api/interfaces/ibitmapfontdata/)

#### Returns

[`IBitmapFontData`](/api/interfaces/ibitmapfontdata/)

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`getAsset`](/api/interfaces/iasset/#getasset)

#### Source

[src/load/assets/FontAsset.ts:30](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/FontAsset.ts#L30)

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

[src/load/AssetMapData.ts:46](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L46)

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

[src/load/AssetMapData.ts:38](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/AssetMapData.ts#L38)

***

### isLoaded()

> **isLoaded**(): `boolean`

#### Returns

`boolean`

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`isLoaded`](/api/interfaces/iasset/#isloaded)

#### Overrides

[`AssetMapData`](/api/classes/assetmapdata/).[`isLoaded`](/api/classes/assetmapdata/#isloaded)

#### Source

[src/load/assets/FontAsset.ts:38](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/FontAsset.ts#L38)
