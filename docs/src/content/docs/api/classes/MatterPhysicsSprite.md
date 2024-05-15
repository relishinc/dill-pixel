---
editUrl: false
next: false
prev: false
title: "MatterPhysicsSprite"
---

## Extends

- `Container`

## Implements

- [`IPhysicsObject`](/api/interfaces/iphysicsobject/)

## Constructors

### new MatterPhysicsSprite()

> **new MatterPhysicsSprite**(`pTexture`, `pSheet`?, `pSize`?, `pBodyType`?): [`MatterPhysicsSprite`](/api/classes/matterphysicssprite/)

#### Parameters

• **pTexture**: `string` \| `Texture`\<`Resource`\>

• **pSheet?**: [`SpritesheetLike`](/api/type-aliases/spritesheetlike/)

• **pSize?**: `number` \| [`number`, `number?`] \| `object`

• **pBodyType?**: [`PhysicsBodyType`](/api/enumerations/physicsbodytype/)= `PhysicsBodyType.RECTANGLE`

#### Returns

[`MatterPhysicsSprite`](/api/classes/matterphysicssprite/)

#### Overrides

`Container.constructor`

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:15](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L15)

## Properties

### \_bodyType

> **\_bodyType**: [`PhysicsBodyType`](/api/enumerations/physicsbodytype/)

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:13](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L13)

***

### \_size

> **\_size**: `object`

#### x

> **x**: `number`

#### y

> **y**: `number`

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:12](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L12)

***

### body

> **body**: `Body`

#### Implementation of

[`IPhysicsObject`](/api/interfaces/iphysicsobject/).[`body`](/api/interfaces/iphysicsobject/#body)

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:11](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L11)

***

### visual

> **visual**: `Sprite`

#### Implementation of

[`IPhysicsObject`](/api/interfaces/iphysicsobject/).[`visual`](/api/interfaces/iphysicsobject/#visual)

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:10](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L10)

***

### DEFAULT\_DEBUG\_COLOR

> `static` `readonly` **DEFAULT\_DEBUG\_COLOR**: `number` = `0x29c5f6`

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:9](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L9)

## Accessors

### app

> `get` **app**(): [`Application`](/api/classes/application/)\<`any`\>

#### Returns

[`Application`](/api/classes/application/)\<`any`\>

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:55](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L55)

***

### debugColor

> `get` **debugColor**(): `number`

#### Returns

`number`

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:51](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L51)

***

### physics

> `get` **physics**(): [`MatterPhysics`](/api/classes/matterphysics/)

#### Returns

[`MatterPhysics`](/api/classes/matterphysics/)

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:47](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L47)

## Methods

### createBody()

> **createBody**(): `void`

#### Returns

`void`

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:68](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L68)

***

### onAdded()

> **onAdded**(): `void`

#### Returns

`void`

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:59](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L59)

***

### onRemoved()

> **onRemoved**(): `void`

#### Returns

`void`

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:64](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L64)

***

### update()

> **update**(): `void`

#### Returns

`void`

#### Source

[src/physics/matter/gameobjects/MatterPhysicsSprite.ts:85](https://github.com/relishinc/dill-pixel/blob/10f512f7f577ca5e74162827f11215b28df5ca97/src/physics/matter/gameobjects/MatterPhysicsSprite.ts#L85)
