---
editUrl: false
next: false
prev: false
title: "Add"
---

## Constructors

### new Add()

> **new Add**(`defaultContainer`): [`Add`](/api/classes/add/)

#### Parameters

• **defaultContainer**: `Container`\<`DisplayObject`\>

#### Returns

[`Add`](/api/classes/add/)

#### Source

[src/utils/factory/Add.ts:54](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L54)

## Methods

### animatedSprite()

> **animatedSprite**(`settings`): [`AnimatedSprite`](/api/classes/animatedsprite/)

#### Parameters

• **settings**: `AnimatedSpriteSettings`

#### Returns

[`AnimatedSprite`](/api/classes/animatedsprite/)

#### Source

[src/utils/factory/Add.ts:406](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L406)

***

### bitmapText()

#### bitmapText(settings)

> **bitmapText**(`settings`?): `BitmapText`

##### Parameters

• **settings?**: `BitmapTextSettings`

##### Returns

`BitmapText`

##### Source

[src/utils/factory/Add.ts:232](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L232)

#### bitmapText(value, style, alpha, position, anchor, scale)

> **bitmapText**(`value`?, `style`?, `alpha`?, `position`?, `anchor`?, `scale`?): `BitmapText`

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

[src/utils/factory/Add.ts:233](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L233)

***

### coloredSprite()

#### coloredSprite(settings)

> **coloredSprite**(`settings`): [`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **settings**: `ColoredSpriteSettings`

##### Returns

[`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Add.ts:89](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L89)

#### coloredSprite(color, size, shape, opts, alpha, position, anchor, scale)

> **coloredSprite**(`color`, `size`?, `shape`?, `opts`?, `alpha`?, `position`?, `anchor`?, `scale`?): [`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **color**: `number`

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

[src/utils/factory/Add.ts:90](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L90)

***

### container()

#### container(settings)

> **container**(`settings`?): [`Container`](/api/classes/container/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **settings?**: `ContainerSettings`

##### Returns

[`Container`](/api/classes/container/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Add.ts:257](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L257)

#### container(alpha, position, scale)

> **container**(`alpha`?, `position`?, `scale`?): [`Container`](/api/classes/container/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

[`Container`](/api/classes/container/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Add.ts:258](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L258)

***

### existing()

#### existing(pObject, settings)

> **existing**\<`T`\>(`pObject`, `settings`): `T`

##### Type parameters

• **T**

##### Parameters

• **pObject**: `T`

• **settings**: `ExistingSettings`

##### Returns

`T`

##### Source

[src/utils/factory/Add.ts:56](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L56)

#### existing(pObject, position, anchor, scale)

> **existing**\<`T`\>(`pObject`, `position`?, `anchor`?, `scale`?): `T`

##### Type parameters

• **T**

##### Parameters

• **pObject**: `T`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **anchor?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`T`

##### Source

[src/utils/factory/Add.ts:57](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L57)

***

### flexContainer()

#### flexContainer(settings)

> **flexContainer**(`settings`): [`FlexContainer`](/api/classes/flexcontainer/)

##### Parameters

• **settings**: `Partial`\<`FlexContainerCreationSettings`\>

##### Returns

[`FlexContainer`](/api/classes/flexcontainer/)

##### Source

[src/utils/factory/Add.ts:270](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L270)

#### flexContainer(alpha, position, settings, scale)

> **flexContainer**(`alpha`?, `position`?, `settings`?, `scale`?): [`FlexContainer`](/api/classes/flexcontainer/)

##### Parameters

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **settings?**: `Partial`\<[`FlexContainerSettings`](/api/interfaces/flexcontainersettings/)\>

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

[`FlexContainer`](/api/classes/flexcontainer/)

##### Source

[src/utils/factory/Add.ts:271](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L271)

***

### graphics()

#### graphics(settings)

> **graphics**(`settings`): `Graphics`

##### Parameters

• **settings**: `GraphicsSettings`

##### Returns

`Graphics`

##### Source

[src/utils/factory/Add.ts:292](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L292)

#### graphics(alpha, position, scale)

> **graphics**(`alpha`?, `position`?, `scale`?): `Graphics`

##### Parameters

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

`Graphics`

##### Source

[src/utils/factory/Add.ts:293](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L293)

***

### htmlText()

#### htmlText(settings)

> **htmlText**(`settings`?): `HTMLText`

##### Parameters

• **settings?**: `HTMLTextSettings`

##### Returns

`HTMLText`

##### Source

[src/utils/factory/Add.ts:207](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L207)

#### htmlText(value, style, alpha, position, anchor, scale)

> **htmlText**(`value`?, `style`?, `alpha`?, `position`?, `anchor`?, `scale`?): `HTMLText`

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

[src/utils/factory/Add.ts:208](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L208)

***

### mesh()

#### mesh(settings)

> **mesh**(`settings`): `Mesh`\<`Shader`\>

##### Parameters

• **settings**: `MeshSettings`

##### Returns

`Mesh`\<`Shader`\>

##### Source

[src/utils/factory/Add.ts:334](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L334)

#### mesh(geometry, shader, state, drawMode)

> **mesh**(`geometry`, `shader`, `state`?, `drawMode`?): `Mesh`\<`Shader`\>

##### Parameters

• **geometry**: `Geometry`

• **shader**: `Shader`

• **state?**: `State`

• **drawMode?**: `DRAW_MODES`

##### Returns

`Mesh`\<`Shader`\>

##### Source

[src/utils/factory/Add.ts:335](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L335)

***

### nineSlice()

#### nineSlice(settings)

> **nineSlice**(`settings`): `NineSlicePlane`

##### Parameters

• **settings**: `NineSliceSettings`

##### Returns

`NineSlicePlane`

##### Source

[src/utils/factory/Add.ts:303](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L303)

#### nineSlice(asset, sheet, leftWidth, topHeight, rightWidth, bottomHeight, alpha, position, scale)

> **nineSlice**(`asset`, `sheet`?, `leftWidth`?, `topHeight`?, `rightWidth`?, `bottomHeight`?, `alpha`?, `position`?, `scale`?): `NineSlicePlane`

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

[src/utils/factory/Add.ts:304](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L304)

***

### simplePlane()

#### simplePlane(settings)

> **simplePlane**(`settings`): `SimplePlane`

##### Parameters

• **settings**: `SimplePlaneSettings`

##### Returns

`SimplePlane`

##### Source

[src/utils/factory/Add.ts:378](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L378)

#### simplePlane(asset, sheet, vertsWidth, vertsHeight, alpha, position, scale)

> **simplePlane**(`asset`?, `sheet`?, `vertsWidth`?, `vertsHeight`?, `alpha`?, `position`?, `scale`?): `SimplePlane`

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

[src/utils/factory/Add.ts:379](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L379)

***

### simpleRope()

#### simpleRope(settings)

> **simpleRope**(`settings`): `object`

##### Parameters

• **settings**: `SimpleRopeSettings`

##### Returns

`object`

###### points

> **points**: `Point`[]

###### rope

> **rope**: `SimpleRope`

##### Source

[src/utils/factory/Add.ts:349](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L349)

#### simpleRope(asset, sheet, numPoints, segmentLength, autoUpdate, alpha, position, scale)

> **simpleRope**(`asset`, `sheet`?, `numPoints`?, `segmentLength`?, `autoUpdate`?, `alpha`?, `position`?, `scale`?): `object`

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

[src/utils/factory/Add.ts:350](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L350)

***

### spine()

> **spine**(`settings`): `Spine`

#### Parameters

• **settings**: `SpineSettings`

#### Returns

`Spine`

#### Source

[src/utils/factory/Add.ts:412](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L412)

***

### sprite()

#### sprite(settings)

> **sprite**(`settings`): [`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **settings**: `SpriteSettings`

##### Returns

[`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Add.ts:127](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L127)

#### sprite(pTexture, pSheet, alpha, position, anchor, scale)

> **sprite**(`pTexture`, `pSheet`?, `alpha`?, `position`?, `anchor`?, `scale`?): [`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Parameters

• **pTexture**: `string` \| `Texture`\<`Resource`\>

• **pSheet?**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **alpha?**: `number`

• **position?**: [`PointLike`](/api/type-aliases/pointlike/)

• **anchor?**: [`PointLike`](/api/type-aliases/pointlike/)

• **scale?**: [`PointLike`](/api/type-aliases/pointlike/)

##### Returns

[`Sprite`](/api/classes/sprite/)\<[`Application`](/api/classes/application/)\<`any`\>\>

##### Source

[src/utils/factory/Add.ts:128](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L128)

***

### text()

#### text(value, style, alpha, position, anchor, scale)

> **text**(`value`?, `style`?, `alpha`?, `position`?, `anchor`?, `scale`?): `Text`

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

[src/utils/factory/Add.ts:183](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L183)

#### text(settings)

> **text**(`settings`): `Text`

##### Parameters

• **settings**: `TextSettings`

##### Returns

`Text`

##### Source

[src/utils/factory/Add.ts:191](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L191)

***

### tilingSprite()

#### tilingSprite(settings)

> **tilingSprite**(`settings`): `TilingSprite`

##### Parameters

• **settings**: `TilingSpriteSettings`

##### Returns

`TilingSprite`

##### Source

[src/utils/factory/Add.ts:152](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L152)

#### tilingSprite(asset, sheet, width, height, tilePosition, alpha, position, anchor, scale)

> **tilingSprite**(`asset`, `sheet`, `width`, `height`, `tilePosition`?, `alpha`?, `position`?, `anchor`?, `scale`?): `TilingSprite`

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

[src/utils/factory/Add.ts:153](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L153)

***

### uiCanvas()

> **uiCanvas**(`settings`): [`UICanvas`](/api/classes/uicanvas/)

#### Parameters

• **settings**: `UICanvasMakeSettings`

#### Returns

[`UICanvas`](/api/classes/uicanvas/)

#### Source

[src/utils/factory/Add.ts:418](https://github.com/relishinc/dill-pixel/blob/543438455c9a47928084300159416186c2aa1095/src/utils/factory/Add.ts#L418)
