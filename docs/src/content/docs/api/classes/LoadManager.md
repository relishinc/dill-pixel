---
editUrl: false
next: false
prev: false
title: "LoadManager"
---

Manages all asset loading.

## Extends

- `Container`

## Constructors

### new LoadManager()

> **new LoadManager**(`app`, `pSplashScreen`): [`LoadManager`](/api/classes/loadmanager/)

Creates an instance of a `LoadManager` and returns it.

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

The parant

• **pSplashScreen**: [`SplashScreen`](/api/classes/splashscreen/)

The splashscreen instance to use.

#### Returns

[`LoadManager`](/api/classes/loadmanager/)

#### Overrides

`Container.constructor`

#### Link

#### Source

[src/load/LoadManager.ts:59](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/LoadManager.ts#L59)

## Accessors

### debug

> `set` **debug**(`pEnabled`): `void`

Enabling this will print all debug logs.

#### Parameters

• **pEnabled**: `boolean`

#### Source

[src/load/LoadManager.ts:98](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/LoadManager.ts#L98)

***

### defaultLoadScreen

> `get` **defaultLoadScreen**(): `undefined` \| [`LoadScreenProvider`](/api/type-aliases/loadscreenprovider/)

#### Returns

`undefined` \| [`LoadScreenProvider`](/api/type-aliases/loadscreenprovider/)

#### Source

[src/load/LoadManager.ts:87](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/LoadManager.ts#L87)

***

### defaultLoadScreenId

> `get` **defaultLoadScreenId**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Source

[src/load/LoadManager.ts:91](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/LoadManager.ts#L91)

## Methods

### onResize()

> **onResize**(`pSize`): `void`

Called when the window is resized.

#### Parameters

• **pSize**: `Point`

The new size.

#### Returns

`void`

#### Source

[src/load/LoadManager.ts:191](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/LoadManager.ts#L191)

***

### registerLoadScreen()

> **registerLoadScreen**(`pIdOrClass`, `pScreen`?, `pDefault`?): `void`

Registers a load screen.

#### Parameters

• **pIdOrClass**: `string` \| *typeof* [`LoadScreen`](/api/classes/loadscreen/)

The id of the new state or the class of the new state.

• **pScreen?**: [`LoadScreenProvider`](/api/type-aliases/loadscreenprovider/)

The load screen.

• **pDefault?**: `boolean`= `false`

Is the new load screen the default one.

#### Returns

`void`

#### Source

[src/load/LoadManager.ts:161](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/LoadManager.ts#L161)

***

### startSplashProcess()

> **startSplashProcess**(`pPersistentAssets`, `pOnComplete`): `void`

Begins the initial splash process.

#### Parameters

• **pPersistentAssets**: [`AssetMapData`](/api/classes/assetmapdata/)[]

The assets that should persist between all state changes.

• **pOnComplete**

The function to call after all persitent assets have been loaded.

#### Returns

`void`

#### Description

1. Splash screen assets loaded.
2. Splash screen is shown.
3. Persistent assets are loaded.
4. Callback passed in is called.

#### Source

[src/load/LoadManager.ts:122](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/LoadManager.ts#L122)

***

### update()

> **update**(`pDeltaTime`): `void`

Updates the current active load screen.

#### Parameters

• **pDeltaTime**: `number`

PIXI.ticker.shared.elapsedMS / 1000.

#### Returns

`void`

#### Source

[src/load/LoadManager.ts:106](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/load/LoadManager.ts#L106)
