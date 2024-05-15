---
editUrl: false
next: false
prev: false
title: "AssetFactory"
---

## AssetFactory(assetIndex, factory)

> **AssetFactory**\<`T`\>(`assetIndex`, `factory`): [`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

Asset factory is used to generate list of assets based on pattern

### Type parameters

• **T**

### Parameters

• **assetIndex**: `number`

index of asset: AssetFactory(1, i => new TextureAsset("my-texture-" + i))

• **factory**: [`AssetFactoryFunction`](/api/type-aliases/assetfactoryfunction/)\<`T`\>

function that returns an asset by its id from the pattern and resolution suffix

### Returns

[`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

### Source

[src/load/assets/AssetFactory.ts:13](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/AssetFactory.ts#L13)

## AssetFactory(assetIndex, factory, resolutionSuffix)

> **AssetFactory**\<`T`\>(`assetIndex`, `factory`, `resolutionSuffix`): [`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

Asset factory is used to generate list of assets based on pattern

### Type parameters

• **T**

### Parameters

• **assetIndex**: `number`

index of asset: AssetFactory(1, i => new TextureAsset("my-texture-" + i))

• **factory**: [`AssetFactoryFunction`](/api/type-aliases/assetfactoryfunction/)\<`T`\>

function that returns an asset by it's id from the pattern and resolution suffix

• **resolutionSuffix**: `string`

resolution suffix of assets

### Returns

[`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

### Source

[src/load/assets/AssetFactory.ts:21](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/AssetFactory.ts#L21)

## AssetFactory(assetName, factory)

> **AssetFactory**\<`T`\>(`assetName`, `factory`): [`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

Asset factory is used to generate list of assets based on pattern

### Type parameters

• **T**

### Parameters

• **assetName**: `string`

name of asset: AssetFactory("my-texture", i => new TextureAsset(i))

• **factory**: [`AssetFactoryFunction`](/api/type-aliases/assetfactoryfunction/)\<`T`\>

function that returns an asset by it's id from the pattern and resolution suffix

### Returns

[`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

### Source

[src/load/assets/AssetFactory.ts:28](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/AssetFactory.ts#L28)

## AssetFactory(assetName, factory, resolutionSuffix)

> **AssetFactory**\<`T`\>(`assetName`, `factory`, `resolutionSuffix`): [`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

Asset factory is used to generate list of assets based on pattern

### Type parameters

• **T**

### Parameters

• **assetName**: `string`

name of asset: AssetFactory("my-texture", i => new TextureAsset(i))

• **factory**: [`AssetFactoryFunction`](/api/type-aliases/assetfactoryfunction/)\<`T`\>

function that returns an asset by it's id from the pattern and resolution suffix

• **resolutionSuffix**: `string`

resolution suffix of assets

### Returns

[`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

### Source

[src/load/assets/AssetFactory.ts:36](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/AssetFactory.ts#L36)

## AssetFactory(minMax, factory)

> **AssetFactory**\<`T`\>(`minMax`, `factory`): [`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

Asset factory is used to generate list of assets based on pattern

### Type parameters

• **T**

### Parameters

• **minMax**: [`number`, `number`]

min and max index of asset: AssetFactory([1,3], i => new TextureAsset("my-texture-" + i))

• **factory**: [`AssetFactoryFunction`](/api/type-aliases/assetfactoryfunction/)\<`T`\>

function that returns an asset by it's id from the pattern and resolution suffix

### Returns

[`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

### Source

[src/load/assets/AssetFactory.ts:43](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/AssetFactory.ts#L43)

## AssetFactory(minMax, factory, resolutionSuffix)

> **AssetFactory**\<`T`\>(`minMax`, `factory`, `resolutionSuffix`): [`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

Asset factory is used to generate list of assets based on pattern

### Type parameters

• **T**

### Parameters

• **minMax**: [`number`, `number`]

min and max index of asset: AssetFactory([1,3], i => new TextureAsset("my-texture-" + i))

• **factory**: [`AssetFactoryFunction`](/api/type-aliases/assetfactoryfunction/)\<`T`\>

function that returns an asset by it's id from the pattern and resolution suffix

• **resolutionSuffix**: `string`

resolution suffix of assets

### Returns

[`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

### Source

[src/load/assets/AssetFactory.ts:51](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/AssetFactory.ts#L51)

## AssetFactory(assetNames, factory)

> **AssetFactory**\<`T`\>(`assetNames`, `factory`): [`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

Asset factory is used to generate list of assets based on pattern

### Type parameters

• **T**

### Parameters

• **assetNames**: `string`[]

list of asset names: AssetFactory(["a","b","c"], i => new TextureAsset("my-texture-" + i))

• **factory**: [`AssetFactoryFunction`](/api/type-aliases/assetfactoryfunction/)\<`T`\>

function that returns an asset by it's id from the pattern and resolution suffix

### Returns

[`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

### Source

[src/load/assets/AssetFactory.ts:58](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/AssetFactory.ts#L58)

## AssetFactory(assetNames, factory, resolutionSuffix)

> **AssetFactory**\<`T`\>(`assetNames`, `factory`, `resolutionSuffix`): [`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

Asset factory is used to generate list of assets based on pattern

### Type parameters

• **T**

### Parameters

• **assetNames**: `string`[]

list of asset names: AssetFactory(["a","b","c"], i => new TextureAsset("my-texture-" + i))

• **factory**: [`AssetFactoryFunction`](/api/type-aliases/assetfactoryfunction/)\<`T`\>

function that returns an asset by it's id from the pattern and resolution suffix

• **resolutionSuffix**: `string`

resolution suffix of assets

### Returns

[`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

### Source

[src/load/assets/AssetFactory.ts:66](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/AssetFactory.ts#L66)

## AssetFactory(patternsByResolution, factory)

> **AssetFactory**\<`T`\>(`patternsByResolution`, `factory`): [`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

Asset factory is used to generate list of assets based on pattern

### Type parameters

• **T**

### Parameters

• **patternsByResolution**

asset name patterns grouped by resolution:
     AssetFactory({"@1x": 1, "@2x": [1,2]}, (i,r) => new TextureAsset("my-texture-" + i, `path/to/my-texture-${i}-${r}.png`))

• **factory**: [`AssetFactoryFunction`](/api/type-aliases/assetfactoryfunction/)\<`T`\>

function that returns an asset by it's id from the pattern and resolution suffix

### Returns

[`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

### Source

[src/load/assets/AssetFactory.ts:74](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/AssetFactory.ts#L74)

## AssetFactory(patternsByResolution, factory, resolutionSuffix)

> **AssetFactory**\<`T`\>(`patternsByResolution`, `factory`, `resolutionSuffix`): [`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

Asset factory is used to generate list of assets based on pattern

### Type parameters

• **T**

### Parameters

• **patternsByResolution**

asset name patterns grouped by resolution:
     AssetFactory({"@1x": 1, "@2x": [1,2]}, (i,r) => new TextureAsset("my-texture-" + i, `path/to/my-texture-${i}-${r}.png`))

• **factory**: [`AssetFactoryFunction`](/api/type-aliases/assetfactoryfunction/)\<`T`\>

function that returns an asset by it's id from the pattern and resolution suffix

• **resolutionSuffix**: `string`

resolution suffix of assets

### Returns

[`IAsset`](/api/interfaces/iasset/)\<`T`\>[]

### Source

[src/load/assets/AssetFactory.ts:84](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/load/assets/AssetFactory.ts#L84)
