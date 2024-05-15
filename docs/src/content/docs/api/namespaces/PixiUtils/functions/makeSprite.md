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

[src/utils/PixiUtils.ts:138](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/utils/PixiUtils.ts#L138)
