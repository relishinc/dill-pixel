---
editUrl: false
next: false
prev: false
title: "OrientationManager"
---

## Constructors

### new OrientationManager()

> **new OrientationManager**(`app`): [`OrientationManager`](/api/classes/orientationmanager/)

#### Parameters

• **app**: [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`OrientationManager`](/api/classes/orientationmanager/)

#### Source

[src/utils/OrientationManager.ts:11](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/OrientationManager.ts#L11)

## Methods

### init()

> **init**(`pSprite`, `pShowOnLandscape`): `void`

Call this function to initialize the manager and enable it

#### Parameters

• **pSprite**: `string`

String to create the sprite with

• **pShowOnLandscape**: `boolean`= `false`

If the image should be shown on lanscape

#### Returns

`void`

#### NOTE

Normally, this should be called in Application.onLoadRequiredAssetsComplete

#### Source

[src/utils/OrientationManager.ts:19](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/OrientationManager.ts#L19)

***

### onResize()

> **onResize**(): `void`

Called when the screen resizes

#### Returns

`void`

#### Source

[src/utils/OrientationManager.ts:35](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/OrientationManager.ts#L35)
