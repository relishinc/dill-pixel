---
editUrl: false
next: false
prev: false
title: "makeSprite"
---

> **makeSprite**(`pAsset`, `pSheet`?): `Sprite`

Creates and returns a `Sprite` object.
This uses [getTexture](../../../../../../../../api/namespaces/pixiutils/functions/gettexture) internally

## Parameters

• **pAsset**: `string`

The asset of the sprite to create.

• **pSheet?**: `string` \| `string`[]

(optional) The spritesheet(s) that the texture is in. You can leave this out unless you have two textures with the same name in different spritesheets

## Returns

`Sprite`

## Source

[src/utils/PixiUtils.ts:138](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/PixiUtils.ts#L138)
