---
editUrl: false
next: false
prev: false
title: "AssetUtils"
---

Asset Utilities

## Constructors

### new AssetUtils()

> **new AssetUtils**(): [`AssetUtils`](/api/classes/assetutils/)

#### Returns

[`AssetUtils`](/api/classes/assetutils/)

## Properties

### FILEPATH\_AUDIO

> `static` `readonly` **FILEPATH\_AUDIO**: `string` = `'assets/audio/'`

Filepath for audio files

#### Source

[src/utils/AssetUtils.ts:30](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L30)

***

### FILEPATH\_FONT

> `static` `readonly` **FILEPATH\_FONT**: `string` = `'assets/fonts/'`

Filepath for fonts

#### Source

[src/utils/AssetUtils.ts:32](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L32)

***

### FILEPATH\_IMAGE

> `static` `readonly` **FILEPATH\_IMAGE**: `string` = `'assets/images/static/'`

Filepath to static images

#### Source

[src/utils/AssetUtils.ts:26](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L26)

***

### FILEPATH\_JSON

> `static` `readonly` **FILEPATH\_JSON**: `string` = `'assets/json/'`

Filepath for json

#### Source

[src/utils/AssetUtils.ts:36](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L36)

***

### FILEPATH\_SPINE

> `static` `readonly` **FILEPATH\_SPINE**: `string` = `'assets/spine/'`

Filepath for spine

#### Source

[src/utils/AssetUtils.ts:34](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L34)

***

### FILEPATH\_SPRITESHEET

> `static` `readonly` **FILEPATH\_SPRITESHEET**: `string` = `'assets/images/spritesheets/'`

Filepath for spritesheets

#### Source

[src/utils/AssetUtils.ts:28](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L28)

***

### FILE\_EXTENSION\_FONT

> `static` `readonly` **FILE\_EXTENSION\_FONT**: `string` = `'.fnt'`

#### Source

[src/utils/AssetUtils.ts:41](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L41)

***

### FILE\_EXTENSION\_JPG

> `static` `readonly` **FILE\_EXTENSION\_JPG**: `string` = `'.jpg'`

#### Source

[src/utils/AssetUtils.ts:40](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L40)

***

### FILE\_EXTENSION\_JSON

> `static` `readonly` **FILE\_EXTENSION\_JSON**: `string` = `'.json'`

#### Source

[src/utils/AssetUtils.ts:38](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L38)

***

### FILE\_EXTENSION\_PNG

> `static` `readonly` **FILE\_EXTENSION\_PNG**: `string` = `'.png'`

#### Source

[src/utils/AssetUtils.ts:39](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L39)

***

### FILE\_EXTENSION\_SPINE\_ATLAS

> `static` `readonly` **FILE\_EXTENSION\_SPINE\_ATLAS**: `string` = `'.atlas'`

#### Source

[src/utils/AssetUtils.ts:42](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L42)

***

### FILE\_EXTENSION\_SPINE\_SKEL

> `static` `readonly` **FILE\_EXTENSION\_SPINE\_SKEL**: `string` = `'.skel'`

#### Source

[src/utils/AssetUtils.ts:43](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L43)

## Accessors

### resolutionSuffix

> `get` `static` **resolutionSuffix**(): `string`

Gets resolution suffix

> `set` `static` **resolutionSuffix**(`pValue`): `void`

Sets resolution suffix

#### Parameters

• **pValue**: `string`

#### Returns

`string`

#### Source

[src/utils/AssetUtils.ts:51](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L51)

## Methods

### getPathToAsset()

#### getPathToAsset(pAssetName, pAssetType)

> `static` **getPathToAsset**(`pAssetName`, `pAssetType`): `string`

Return an asset's path based on it's file extension.

##### Parameters

• **pAssetName**: `string`

• **pAssetType**: [`AssetType`](/api/enumerations/assettype/)

##### Returns

`string`

The asset filepath, empty if no resolution

##### Source

[src/utils/AssetUtils.ts:69](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L69)

#### getPathToAsset(pAssetData)

> `static` **getPathToAsset**(`pAssetData`): `string`

##### Parameters

• **pAssetData**: [`AssetMapData`](/api/classes/assetmapdata/)

##### Returns

`string`

##### Source

[src/utils/AssetUtils.ts:70](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L70)

***

### replaceResolutionToken()

> `static` **replaceResolutionToken**(`url`, `token`): `string`

#### Parameters

• **url**: `string`

• **token**: `string` \| `RegExp`= `'@x'`

#### Returns

`string`

#### Source

[src/utils/AssetUtils.ts:103](https://github.com/relishinc/dill-pixel/blob/c79d8e8552aaa0f13a29535c819ae67d025b4669/src/utils/AssetUtils.ts#L103)
