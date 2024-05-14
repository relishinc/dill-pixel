---
editUrl: false
next: false
prev: false
title: "Make"
---

## Constructors

### new Make()

> **new Make**(): [`Make`](/api/classes/make/)

#### Returns

[`Make`](/api/classes/make/)

## Properties

### spine()

> `static` **spine**: (`settings`) => `Spine`

#### Parameters

• **settings**: `SpineSettings`

#### Returns

`Spine`

#### Source

[src/utils/factory/Make.ts:157](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L157)

## Methods

### animatedSprite()

> `static` **animatedSprite**(`settings`): [`AnimatedSprite`](/api/classes/animatedsprite/)

#### Parameters

• **settings**: `AnimatedSpriteSettings`

#### Returns

[`AnimatedSprite`](/api/classes/animatedsprite/)

#### Source

[src/utils/factory/Make.ts:959](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L959)

***

### bitmapText()

#### bitmapText(settings)

> `static` **bitmapText**(`settings`?): `BitmapText`

##### Parameters

• **settings?**: `BitmapTextSettings`

##### Returns

`BitmapText`

##### Source

[src/utils/factory/Make.ts:459](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L459)

#### bitmapText(value, style, alpha, position, anchor, scale)

> `static` **bitmapText**(`value`?, `style`?, `alpha`?, `position`?, `anchor`?, `scale`?): `BitmapText`

##### Parameters

• **value?**: `string`

• **style?**: `Partial`\<`IBitmapTextStyle`\>

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **anchor?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`BitmapText`

##### Source

[src/utils/factory/Make.ts:460](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L460)

***

### coloredSprite()

#### coloredSprite(settings)

> `static` **coloredSprite**(`settings`): [`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **settings**: `ColoredSpriteSettings`

##### Returns

[`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Make.ts:214](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L214)

#### coloredSprite(color, size, shape, opts, alpha, position, anchor, scale)

> `static` **coloredSprite**(`color`?, `size`?, `shape`?, `opts`?, `alpha`?, `position`?, `anchor`?, `scale`?): [`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **color?**: `number`

• **size?**: [`PointLike`](/api/type-aliases/pointlike/)

• **shape?**: `"rectangle"` \| `"circle"` \| `"rounded_rectangle"`

• **opts?**

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **anchor?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

[`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Make.ts:215](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L215)

***

### container()

#### container(settings)

> `static` **container**(`settings`?): [`Container`](/api/classes/container/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **settings?**: `ContainerSettings`

##### Returns

[`Container`](/api/classes/container/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Make.ts:508](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L508)

#### container(alpha, position, scale)

> `static` **container**(`alpha`?, `position`?, `scale`?): [`Container`](/api/classes/container/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

[`Container`](/api/classes/container/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Make.ts:509](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L509)

***

### flexContainer()

#### flexContainer(settings)

> `static` **flexContainer**(`settings`): [`FlexContainer`](/api/classes/flexcontainer/)

##### Parameters

• **settings**: `Partial`\<`FlexContainerCreationSettings`\>

##### Returns

[`FlexContainer`](/api/classes/flexcontainer/)

##### Source

[src/utils/factory/Make.ts:540](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L540)

#### flexContainer(alpha, position, settings, scale)

> `static` **flexContainer**(`alpha`?, `position`?, `settings`?, `scale`?): [`FlexContainer`](/api/classes/flexcontainer/)

##### Parameters

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **settings?**: `Partial`\<[`FlexContainerSettings`](/api/interfaces/flexcontainersettings/)\>

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

[`FlexContainer`](/api/classes/flexcontainer/)

##### Source

[src/utils/factory/Make.ts:541](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L541)

***

### graphics()

#### graphics(settings)

> `static` **graphics**(`settings`): `Graphics`

##### Parameters

• **settings**: `GraphicsSettings`

##### Returns

`Graphics`

##### Source

[src/utils/factory/Make.ts:585](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L585)

#### graphics(alpha, position, scale)

> `static` **graphics**(`alpha`?, `position`?, `scale`?): `Graphics`

##### Parameters

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`Graphics`

##### Source

[src/utils/factory/Make.ts:586](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L586)

***

### htmlText()

#### htmlText(settings)

> `static` **htmlText**(`settings`?): `HTMLText`

##### Parameters

• **settings?**: `HTMLTextSettings`

##### Returns

`HTMLText`

##### Source

[src/utils/factory/Make.ts:410](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L410)

#### htmlText(value, style, alpha, position, anchor, scale)

> `static` **htmlText**(`value`?, `style`?, `alpha`?, `position`?, `anchor`?, `scale`?): `HTMLText`

##### Parameters

• **value?**: `string`

• **style?**: `Partial`\<`HTMLTextStyle` \| `TextStyle` \| `ITextStyle`\>

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **anchor?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`HTMLText`

##### Source

[src/utils/factory/Make.ts:411](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L411)

***

### mesh()

#### mesh(settings)

> `static` **mesh**(`settings`): `Mesh`\<`Shader`\>

##### Parameters

• **settings**: `MeshSettings`

##### Returns

`Mesh`\<`Shader`\>

##### Source

[src/utils/factory/Make.ts:689](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L689)

#### mesh(geometry, shader, state, drawMode)

> `static` **mesh**(`geometry`, `shader`, `state`?, `drawMode`?): `Mesh`\<`Shader`\>

##### Parameters

• **geometry**: `Geometry`

• **shader**: `Shader`

• **state?**: `State`

• **drawMode?**: `DRAW_MODES`

##### Returns

`Mesh`\<`Shader`\>

##### Source

[src/utils/factory/Make.ts:690](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L690)

***

### nineSlice()

#### nineSlice(settings)

> `static` **nineSlice**(`settings`): `NineSlicePlane`

##### Parameters

• **settings**: `NineSliceSettings`

##### Returns

`NineSlicePlane`

##### Source

[src/utils/factory/Make.ts:889](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L889)

#### nineSlice(asset, sheet, leftWidth, topHeight, rightWidth, bottomHeight, alpha, position, scale)

> `static` **nineSlice**(`asset`, `sheet`?, `leftWidth`?, `topHeight`?, `rightWidth`?, `bottomHeight`?, `alpha`?, `position`?, `scale`?): `NineSlicePlane`

##### Parameters

• **asset**: `string` \| `Texture`\<`Resource`\>

• **sheet?**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **leftWidth?**: `number`

• **topHeight?**: `number`

• **rightWidth?**: `number`

• **bottomHeight?**: `number`

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`NineSlicePlane`

##### Source

[src/utils/factory/Make.ts:890](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L890)

***

### simpleMesh()

#### simpleMesh(settings)

> `static` **simpleMesh**(`settings`): `SimpleMesh`

##### Parameters

• **settings**: `SimpleMeshSettings`

##### Returns

`SimpleMesh`

##### Source

[src/utils/factory/Make.ts:825](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L825)

#### simpleMesh(asset, sheet, vertices, uvs, indices, drawMode, alpha, position, scale)

> `static` **simpleMesh**(`asset`, `sheet`, `vertices`?, `uvs`?, `indices`?, `drawMode`?, `alpha`?, `position`?, `scale`?): `SimpleMesh`

##### Parameters

• **asset**: `string` \| `Texture`\<`Resource`\>

• **sheet**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **vertices?**: `Float32Array`

• **uvs?**: `Float32Array`

• **indices?**: `Uint16Array`

• **drawMode?**: `number`

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`SimpleMesh`

##### Source

[src/utils/factory/Make.ts:826](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L826)

***

### simplePlane()

#### simplePlane(settings)

> `static` **simplePlane**(`settings`): `SimplePlane`

##### Parameters

• **settings**: `SimplePlaneSettings`

##### Returns

`SimplePlane`

##### Source

[src/utils/factory/Make.ts:769](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L769)

#### simplePlane(asset, sheet, vertsWidth, vertsHeight, alpha, position, scale)

> `static` **simplePlane**(`asset`?, `sheet`?, `vertsWidth`?, `vertsHeight`?, `alpha`?, `position`?, `scale`?): `SimplePlane`

##### Parameters

• **asset?**: `string` \| `Texture`\<`Resource`\>

• **sheet?**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **vertsWidth?**: `number`

• **vertsHeight?**: `number`

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`SimplePlane`

##### Source

[src/utils/factory/Make.ts:770](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L770)

***

### simpleRope()

#### simpleRope(settings)

> `static` **simpleRope**(`settings`): `object`

##### Parameters

• **settings**: `SimpleRopeSettings`

##### Returns

`object`

###### points

> **points**: `Point`[]

###### rope

> **rope**: `SimpleRope`

##### Source

[src/utils/factory/Make.ts:708](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L708)

#### simpleRope(asset, sheet, numPoints, segmentLength, autoUpdate, alpha, position, scale)

> `static` **simpleRope**(`asset`, `sheet`?, `numPoints`?, `segmentLength`?, `autoUpdate`?, `alpha`?, `position`?, `scale`?): `object`

##### Parameters

• **asset**: `string` \| `Texture`\<`Resource`\>

• **sheet?**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **numPoints?**: `number`

• **segmentLength?**: `number`

• **autoUpdate?**: `boolean`

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`object`

###### points

> **points**: `Point`[]

###### rope

> **rope**: `SimpleRope`

##### Source

[src/utils/factory/Make.ts:709](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L709)

***

### sprite()

#### sprite(settings)

> `static` **sprite**(`settings`): [`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **settings**: `SpriteSettings`

##### Returns

[`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Make.ts:302](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L302)

#### sprite(asset, sheet, alpha, position, anchor, scale)

> `static` **sprite**(`asset`, `sheet`?, `alpha`?, `position`?, `anchor`?, `scale`?): [`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **asset**: `string` \| `Texture`\<`Resource`\>

• **sheet?**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **anchor?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

[`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Make.ts:303](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L303)

***

### spriteAnimation()

> `static` **spriteAnimation**(`props`): [`SpriteAnimation`](/api/classes/spriteanimation/)

#### Parameters

• **props**: `SpriteAnimationProps`

#### Returns

[`SpriteAnimation`](/api/classes/spriteanimation/)

#### Source

[src/utils/factory/Make.ts:954](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L954)

***

### text()

#### text(value, style, alpha, position, anchor, scale)

> `static` **text**(`value`?, `style`?, `alpha`?, `position`?, `anchor`?, `scale`?): `Text`

##### Parameters

• **value?**: `string`

• **style?**: `Partial`\<`TextStyle` \| `ITextStyle`\>

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **anchor?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`Text`

##### Source

[src/utils/factory/Make.ts:360](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L360)

#### text(settings)

> `static` **text**(`settings`): `Text`

##### Parameters

• **settings**: `TextSettings`

##### Returns

`Text`

##### Source

[src/utils/factory/Make.ts:368](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L368)

***

### texture()

#### texture(settings)

> `static` **texture**(`settings`): `Texture`\<`Resource`\>

##### Parameters

• **settings**: `TextureSettings`

##### Returns

`Texture`\<`Resource`\>

##### Source

[src/utils/factory/Make.ts:159](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L159)

#### texture(asset, sheet)

> `static` **texture**(`asset`, `sheet`?): `Texture`\<`Resource`\>

##### Parameters

• **asset**: `string`

• **sheet?**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

##### Returns

`Texture`\<`Resource`\>

##### Source

[src/utils/factory/Make.ts:160](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L160)

***

### tilingSprite()

#### tilingSprite(settings)

> `static` **tilingSprite**(`settings`): `TilingSprite`

##### Parameters

• **settings**: `TilingSpriteSettings`

##### Returns

`TilingSprite`

##### Source

[src/utils/factory/Make.ts:613](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L613)

#### tilingSprite(asset, sheet, width, height, tilePosition, alpha, position, anchor, scale)

> `static` **tilingSprite**(`asset`, `sheet`, `width`, `height`, `tilePosition`?, `alpha`?, `position`?, `anchor`?, `scale`?): `TilingSprite`

##### Parameters

• **asset**: `string` \| `Texture`\<`Resource`\>

• **sheet**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **width**: `number`

• **height**: `number`

• **tilePosition?**: [`PointLike`](/api/type-aliases/pointlike/)

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **anchor?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`TilingSprite`

##### Source

[src/utils/factory/Make.ts:614](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L614)

***

### uiCanvas()

> `static` **uiCanvas**(`settings`): [`UICanvas`](/api/classes/uicanvas/)

#### Parameters

• **settings**: `UICanvasMakeSettings`

#### Returns

[`UICanvas`](/api/classes/uicanvas/)

#### Source

[src/utils/factory/Make.ts:998](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Make.ts#L998)
