---
editUrl: false
next: false
prev: false
title: "AudioAsset"
---

The interface extends AssetMapData for compatibility

## Extends

- [`AssetMapAudioData`](/api/classes/assetmapaudiodata/)

## Implements

- [`IAsset`](/api/interfaces/iasset/)\<[`IAudioTrack`](/api/interfaces/iaudiotrack/)\>

## Constructors

### new AudioAsset()

> **new AudioAsset**(`assetName`, `category`): [`AudioAsset`](/api/classes/audioasset/)

#### Parameters

• **assetName**: `string`

• **category**: `string`

#### Returns

[`AudioAsset`](/api/classes/audioasset/)

#### Overrides

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`constructor`](/api/classes/assetmapaudiodata/#constructors)

#### Source

[src/load/assets/AudioAsset.ts:8](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/AudioAsset.ts#L8)

## Properties

### assetName

> **assetName**: `string`

The name of the asset file.

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`assetName`](/api/interfaces/iasset/#assetname)

#### Inherited from

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`assetName`](/api/classes/assetmapaudiodata/#assetname)

#### Source

[src/load/AssetMapData.ts:12](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L12)

***

### assetPath

> **assetPath**: `string` = `''`

Path to the asset

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`assetPath`](/api/interfaces/iasset/#assetpath)

#### Inherited from

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`assetPath`](/api/classes/assetmapaudiodata/#assetpath)

#### Source

[src/load/AssetMapData.ts:20](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L20)

***

### assetType

> **assetType**: [`AssetType`](/api/enumerations/assettype/)

The type of the asset file.

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`assetType`](/api/interfaces/iasset/#assettype)

#### Inherited from

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`assetType`](/api/classes/assetmapaudiodata/#assettype)

#### Source

[src/load/AssetMapData.ts:16](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L16)

***

### category

> **category**: `string`

The category to add this audio asset to.

#### Inherited from

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`category`](/api/classes/assetmapaudiodata/#category)

#### Source

[src/load/AssetMapAudioData.ts:13](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapAudioData.ts#L13)

***

### data

> **data**: `any`

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`data`](/api/interfaces/iasset/#data)

#### Inherited from

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`data`](/api/classes/assetmapaudiodata/#data)

#### Source

[src/load/AssetMapData.ts:26](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L26)

***

### resolutionSuffix

> **resolutionSuffix**: `string` = `''`

If resolution suffix is set the asset is loaded only on devices with the matched asset resolution

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`resolutionSuffix`](/api/interfaces/iasset/#resolutionsuffix)

#### Inherited from

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`resolutionSuffix`](/api/classes/assetmapaudiodata/#resolutionsuffix)

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

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`destroy`](/api/classes/assetmapaudiodata/#destroy)

#### Source

[src/load/AssetMapData.ts:57](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapData.ts#L57)

***

### getAsset()

> **getAsset**(): [`IAudioTrack`](/api/interfaces/iaudiotrack/)

#### Returns

[`IAudioTrack`](/api/interfaces/iaudiotrack/)

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`getAsset`](/api/interfaces/iasset/#getasset)

#### Source

[src/load/assets/AudioAsset.ts:12](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/assets/AudioAsset.ts#L12)

***

### getLoaderOptions()

> **getLoaderOptions**(): `undefined` \| `Partial`\<`any`\>

#### Returns

`undefined` \| `Partial`\<`any`\>

#### Implementation of

[`IAsset`](/api/interfaces/iasset/).[`getLoaderOptions`](/api/interfaces/iasset/#getloaderoptions)

#### Inherited from

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`getLoaderOptions`](/api/classes/assetmapaudiodata/#getloaderoptions)

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

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`getResource`](/api/classes/assetmapaudiodata/#getresource)

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

[`AssetMapAudioData`](/api/classes/assetmapaudiodata/).[`isLoaded`](/api/classes/assetmapaudiodata/#isloaded)

#### Source

[src/load/AssetMapAudioData.ts:26](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/AssetMapAudioData.ts#L26)
